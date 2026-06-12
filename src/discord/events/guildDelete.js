const { sendDiscordLog } = require("../../services/discordLogService");
const logger = require("../../utils/logger");

module.exports = {
  name: "guildDelete",
  async execute(guild, client) {
    logger.info(`Saiu de um servidor: ${guild.name} (${guild.id})`);

    await sendDiscordLog(client, "Bot Removido", `O bot foi removido de um servidor.`, {
      name: guild.name,
      id: guild.id
    });
  }
};
