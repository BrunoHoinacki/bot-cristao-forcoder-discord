const {
  SlashCommandBuilder,
  ChannelType,
  PermissionFlagsBits
} = require("discord.js");
const { setGuildChannel } = require("../../services/guildConfigService");
const { sendDiscordLog } = require("../../services/discordLogService");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("configurar_canal")
    .setDescription("Define o canal para envio automático dos devocionais.")
    .setDMPermission(false)
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild)
    .addChannelOption(option =>
      option
        .setName("canal")
        .setDescription("Canal onde o bot vai enviar os devocionais.")
        .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
        .setRequired(true)
    ),
  async execute(interaction) {
    const channel = interaction.options.getChannel("canal", true);
    const client = interaction.client;

    await setGuildChannel(interaction.guildId, channel.id, {
      guildName: interaction.guild?.name,
      channelName: channel.name
    });

    await interaction.reply({
      content: `✅ Canal configurado com sucesso: ${channel}.`,
      ephemeral: true
    });

    await sendDiscordLog(client, "Canal Configurado", `Um administrador configurou o canal de devocionais.`, {
      guild: interaction.guild?.name,
      guildId: interaction.guildId,
      channel: channel.name,
      channelId: channel.id,
      user: interaction.user.tag
    });
  }
};
