const fs = require("fs");
const path = require("path");
const logger = require("../utils/logger");

const STORE_PATH =
  process.env.GUILD_CONFIG_PATH ||
  path.join(process.cwd(), "data", "guild-config.json");

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

function getAllGuildConfigs() {
  return readStore();
}

function getGuildChannelId(guildId) {
  const store = readStore();
  return store[guildId] || null;
}

function setGuildChannel(guildId, channelId) {
  const store = readStore();
  store[guildId] = channelId;
  writeStore(store);
}

function removeGuildChannel(guildId) {
  const store = readStore();
  if (!store[guildId]) return false;
  delete store[guildId];
  writeStore(store);
  return true;
}

module.exports = {
  getAllGuildConfigs,
  getGuildChannelId,
  setGuildChannel,
  removeGuildChannel
};
