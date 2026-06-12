const logger = require("../../utils/logger");
const { sendDiscordLog } = require("../../services/discordLogService");

module.exports = {
  name: "clientReady",
  once: true,
  async execute(client) {
    if (client.slashCommands?.size) {
      const payload = client.slashCommands.map(command =>
        typeof command.data.toJSON === "function"
          ? command.data.toJSON()
          : command.data
      );

      await client.application.commands.set(payload);
      logger.info(`Slash commands sincronizados: ${payload.length}.`);
    }

    logger.info(`Bot logado como ${client.user.tag}. 🙏`);
    await sendDiscordLog(client, "Bot iniciado", `Bot logado como ${client.user.tag}.`, {
      primaryGuildId: process.env.PRIMARY_GUILD_ID || process.env.DISCORD_GUILD_ID,
      logChannelId: process.env.DISCORD_LOG_CHANNEL_ID
    });
  }
};
