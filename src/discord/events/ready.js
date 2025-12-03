const logger = require("../../utils/logger");

module.exports = {
  name: "ClientReady",
  once: true,
  execute(client) {
    logger.info(`Bot logado como ${client.user.tag}. 🙏`);
  }
};
