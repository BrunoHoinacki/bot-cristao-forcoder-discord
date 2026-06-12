const { sendDiscordLog } = require("../../services/discordLogService");
const logger = require("../../utils/logger");

module.exports = {
  name: "guildCreate",
  async execute(guild, client) {
    logger.info(`Entrou em um novo servidor: ${guild.name} (${guild.id})`);

    await sendDiscordLog(client, "Novo Servidor", `O bot foi adicionado a um novo servidor.`, {
      name: guild.name,
      id: guild.id,
      memberCount: guild.memberCount,
      ownerId: guild.ownerId
    });
  }
};
