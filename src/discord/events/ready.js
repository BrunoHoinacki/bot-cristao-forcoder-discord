const logger = require("../../utils/logger");
const { sendDiscordLog, sendDiscordErrorLog } = require("../../services/discordLogService");
const { getAllGuildConfigs } = require("../../services/guildConfigService");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    // 1. Sincronizar Slash Commands
    if (client.slashCommands?.size) {
      const payload = client.slashCommands.map(command =>
        typeof command.data.toJSON === "function"
          ? command.data.toJSON()
          : command.data
      );

      await client.application.commands.set(payload);
      logger.info(`Slash commands sincronizados: ${payload.length}.`);
    }

    // 2. Testar conexão com o banco (Supabase)
    let dbStatus = "Não configurado";
    try {
      if (process.env.SUPABASE_URL) {
        await getAllGuildConfigs();
        dbStatus = "Conectado (Supabase REST)";
      } else {
        dbStatus = "Local (JSON)";
      }
      logger.info(`Status do banco: ${dbStatus}`);
    } catch (err) {
      dbStatus = "Erro na conexão";
      logger.error("Erro ao testar conexão com Supabase:", err);
      await sendDiscordErrorLog(client, "Erro de conexão com Banco de Dados", err);
    }

    logger.info(`Bot logado como ${client.user.tag}. 🙏`);

    // 3. Enviar log de inicialização
    await sendDiscordLog(client, "Bot Iniciado", `O sistema foi carregado com sucesso.`, {
      tag: client.user.tag,
      dbStatus: dbStatus,
      env: process.env.NODE_ENV || "development",
      logChannelId: process.env.DISCORD_LOG_CHANNEL_ID,
      primaryGuild: process.env.PRIMARY_GUILD_ID || "N/A"
    });
  }
};
