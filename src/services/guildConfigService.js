const fs = require("fs");
const path = require("path");
const logger = require("../utils/logger");

const STORE_PATH =
  process.env.GUILD_CONFIG_PATH ||
  path.join(process.cwd(), "data", "guild-config.json");

const SUPABASE_TABLE = process.env.SUPABASE_GUILD_CONFIG_TABLE || "guild_configs";

function getPrimaryGuildId() {
  return process.env.PRIMARY_GUILD_ID || process.env.DISCORD_GUILD_ID || null;
}

function isSupabaseEnabled() {
  return Boolean(
    process.env.SUPABASE_URL &&
      (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY)
  );
}

function getSupabaseHeaders(extra = {}) {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    ...extra
  };
}

function getSupabaseUrl(pathname, params = {}) {
  const url = new URL(`/rest/v1/${pathname}`, process.env.SUPABASE_URL);

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, value);
    }
  }

  return url;
}

async function requestSupabase(pathname, options = {}, params = {}) {
  const response = await fetch(getSupabaseUrl(pathname, params), {
    ...options,
    headers: getSupabaseHeaders(options.headers)
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase ${response.status}: ${body}`);
  }

  const body = await response.text();
  if (!body) return null;

  return JSON.parse(body);
}

function ensureStore() {
  const dir = path.dirname(STORE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  if (!fs.existsSync(STORE_PATH)) {
    fs.writeFileSync(STORE_PATH, "{}", "utf8");
  }
}

function readStore() {
  ensureStore();

  try {
    const raw = fs.readFileSync(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (err) {
    logger.error("Falha ao ler config de servidores. Recriando store.", err);
    fs.writeFileSync(STORE_PATH, "{}", "utf8");
    return {};
  }
}

function writeStore(data) {
  ensureStore();
  const tmpPath = `${STORE_PATH}.tmp`;
  fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), "utf8");
  fs.renameSync(tmpPath, STORE_PATH);
}

function normalizeLocalConfig(value) {
  if (typeof value === "string") {
    return {
      channelId: value,
      isActive: true,
      isPrimary: false
    };
  }

  return {
    channelId: value?.channelId || value?.channel_id || null,
    guildName: value?.guildName || value?.guild_name || null,
    channelName: value?.channelName || value?.channel_name || null,
    isActive: value?.isActive ?? value?.is_active ?? true,
    isPrimary: value?.isPrimary ?? value?.is_primary ?? false
  };
}

function toChannelMap(records) {
  return records.reduce((acc, record) => {
    const channelId = record.channelId || record.channel_id;
    const guildId = record.guildId || record.guild_id;

    if (guildId && channelId && (record.isActive ?? record.is_active ?? true)) {
      acc[guildId] = channelId;
    }

    return acc;
  }, {});
}

async function getAllGuildConfigs() {
  if (isSupabaseEnabled()) {
    const rows = await requestSupabase(SUPABASE_TABLE, {}, {
      select: "guild_id,channel_id,is_active",
      is_active: "eq.true"
    });

    return toChannelMap(rows);
  }

  const store = readStore();
  return Object.entries(store).reduce((acc, [guildId, value]) => {
    const config = normalizeLocalConfig(value);
    if (config.channelId && config.isActive) {
      acc[guildId] = config.channelId;
    }
    return acc;
  }, {});
}

async function getGuildConfig(guildId) {
  if (isSupabaseEnabled()) {
    const rows = await requestSupabase(SUPABASE_TABLE, {}, {
      select: "*",
      guild_id: `eq.${guildId}`,
      limit: "1"
    });

    const row = rows[0];
    if (!row || !row.is_active) return null;

    return {
      guildId: row.guild_id,
      channelId: row.channel_id,
      guildName: row.guild_name,
      channelName: row.channel_name,
      isPrimary: row.is_primary
    };
  }

  const config = normalizeLocalConfig(readStore()[guildId]);
  if (!config.channelId || !config.isActive) return null;

  return {
    guildId,
    ...config,
    isPrimary: guildId === getPrimaryGuildId() || config.isPrimary
  };
}

async function getGuildChannelId(guildId) {
  const config = await getGuildConfig(guildId);
  return config?.channelId || null;
}

async function setGuildChannel(guildId, channelId, metadata = {}) {
  const primaryGuildId = getPrimaryGuildId();
  const isPrimary = guildId === primaryGuildId;

  if (isSupabaseEnabled()) {
    await requestSupabase(
      SUPABASE_TABLE,
      {
        method: "POST",
        headers: {
          Prefer: "resolution=merge-duplicates,return=minimal"
        },
        body: JSON.stringify({
          guild_id: guildId,
          channel_id: channelId,
          guild_name: metadata.guildName || null,
          channel_name: metadata.channelName || null,
          is_primary: isPrimary,
          is_active: true,
          updated_at: new Date().toISOString()
        })
      },
      {
        on_conflict: "guild_id"
      }
    );
    return;
  }

  const store = readStore();
  store[guildId] = {
    channelId,
    guildName: metadata.guildName || null,
    channelName: metadata.channelName || null,
    isPrimary,
    isActive: true,
    updatedAt: new Date().toISOString()
  };
  writeStore(store);
}

async function removeGuildChannel(guildId) {
  if (isSupabaseEnabled()) {
    const current = await getGuildConfig(guildId);
    if (!current) return false;

    await requestSupabase(
      SUPABASE_TABLE,
      {
        method: "PATCH",
        headers: {
          Prefer: "return=minimal"
        },
        body: JSON.stringify({
          is_active: false,
          updated_at: new Date().toISOString()
        })
      },
      {
        guild_id: `eq.${guildId}`
      }
    );
    return true;
  }

  const store = readStore();
  const config = normalizeLocalConfig(store[guildId]);
  if (!config.channelId || !config.isActive) return false;

  store[guildId] = {
    ...config,
    isActive: false,
    updatedAt: new Date().toISOString()
  };
  writeStore(store);
  return true;
}

module.exports = {
  getAllGuildConfigs,
  getGuildConfig,
  getGuildChannelId,
  setGuildChannel,
  removeGuildChannel
};
