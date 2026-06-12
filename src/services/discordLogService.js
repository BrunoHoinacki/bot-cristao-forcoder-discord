const logger = require("../utils/logger");

const MAX_MESSAGE_LENGTH = 1900;

function truncate(text, maxLength = MAX_MESSAGE_LENGTH) {
  if (!text) return "";
  const value = String(text);
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 20)}\n... [truncado]`;
}

function formatError(err) {
  if (!err) return "Erro desconhecido.";
  return err.stack || err.message || String(err);
}

function formatContext(context = {}) {
  const entries = Object.entries(context).filter(([, value]) => value !== undefined && value !== null);
  if (!entries.length) return "";

  return entries
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

async function sendDiscordLog(client, title, details, context = {}) {
  const channelId = process.env.DISCORD_LOG_CHANNEL_ID;
  if (!channelId || !client?.channels) return;

  try {
    const channel = await client.channels.fetch(channelId);
    if (!channel?.isTextBased()) {
      logger.warn(`Canal de log inválido: ${channelId}`);
      return;
    }

    const contextText = formatContext(context);
    const content = truncate(
      [
        `🚨 **${title}**`,
        contextText ? `\`\`\`\n${contextText}\n\`\`\`` : "",
        `\`\`\`\n${details}\n\`\`\``
      ]
        .filter(Boolean)
        .join("\n")
    );

    await channel.send({ content });
  } catch (logErr) {
    if (logErr.code === 50001) {
      logger.error(`ERRO DE PERMISSÃO: O bot não tem acesso ao canal de log ${channelId}. Verifique se o bot está no servidor e se tem permissão de "Ver Canal" e "Enviar Mensagens".`);
    } else {
      logger.error("Erro ao enviar log para o Discord:", logErr);
    }
  }
}

async function sendDiscordErrorLog(client, title, err, context = {}) {
  await sendDiscordLog(client, title, formatError(err), context);
}

module.exports = {
  sendDiscordLog,
  sendDiscordErrorLog
};
