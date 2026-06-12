const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { removeGuildChannel } = require("../../services/guildConfigService");
const { sendDiscordLog } = require("../../services/discordLogService");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("desativar_canal")
    .setDescription("Desativa o envio automático de devocionais neste servidor.")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
  async execute(interaction) {
    const removed = await removeGuildChannel(interaction.guildId);
    const client = interaction.client;

    await interaction.reply({
      content: removed
        ? "✅ Envio automático desativado para este servidor."
        : "ℹ️ Este servidor ainda não tinha canal configurado.",
      ephemeral: true
    });

    if (removed) {
      await sendDiscordLog(client, "Canal Desativado", `Um administrador desativou o envio de devocionais.`, {
        guild: interaction.guild?.name,
        guildId: interaction.guildId,
        user: interaction.user.tag
      });
    }
  }
};
