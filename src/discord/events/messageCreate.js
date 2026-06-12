const { sendDiscordErrorLog, sendDiscordLog } = require("../../services/discordLogService");
const logger = require("../../utils/logger");

function formatMessageLog(message) {
  const attachments = message.attachments?.size
    ? message.attachments.map(attachment => attachment.url).join("\n")
    : null;

  return [
    message.content ? `Mensagem:\n${message.content}` : "Mensagem sem texto.",
    attachments ? `Anexos:\n${attachments}` : ""
  ]
    .filter(Boolean)
    .join("\n\n");
}

function getMessageContext(message) {
  return {
    author: message.author?.tag || message.author?.id,
    authorId: message.author?.id,
    channelId: message.channelId,
    messageId: message.id
  };
}

module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    // Ignora mensagens do próprio bot
    if (message.author.bot) return;

    const content = message.content.trim();
    const isDm = !message.guildId;

    if (isDm) {
      await sendDiscordLog(client, "DM recebida", formatMessageLog(message), getMessageContext(message));
    }

    // Comando simples com prefixo, ex: !versiculo
    if (!content.startsWith("!")) return;

    const [commandName, ...args] = content.slice(1).split(/\s+/);

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      await command.execute(message, args);
    } catch (err) {
      logger.error(`Erro ao executar comando ${commandName}:`, err);
      await message.reply("⚠️ Ocorreu um erro ao executar o comando. Tenta de novo, por favor.");
      await sendDiscordErrorLog(client, "Erro em comando por mensagem", err, {
        ...getMessageContext(message),
        command: commandName,
        isDm
      });
    }
  }
};
