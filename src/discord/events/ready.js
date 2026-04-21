const logger = require("../../utils/logger");

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
  }
};
