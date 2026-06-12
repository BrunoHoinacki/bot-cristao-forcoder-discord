const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { getGuildConfig } = require("../../services/guildConfigService");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status_canal")
    .setDescription("Mostra qual canal está configurado para envio automático.")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async execute(interaction) {
    const config = await getGuildConfig(interaction.guildId);

    if (!config?.channelId) {
      await interaction.reply({
        content: "ℹ️ Nenhum canal configurado ainda. Use /configurar_canal.",
        ephemeral: true
      });
      return;
    }

    await interaction.reply({
      content: [
        `📌 Canal configurado atualmente: <#${config.channelId}>.`,
        config.isPrimary ? "⭐ Este é o servidor principal." : null
      ]
        .filter(Boolean)
        .join("\n"),
      ephemeral: true
    });
  }
};
