const {
  SlashCommandBuilder,
  ChannelType,
  PermissionFlagsBits
} = require("discord.js");
const { setGuildChannel } = require("../../services/guildConfigService");

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

    await setGuildChannel(interaction.guildId, channel.id, {
      guildName: interaction.guild?.name,
      channelName: channel.name
    });

    await interaction.reply({
      content: `✅ Canal configurado com sucesso: ${channel}.`,
      ephemeral: true
    });
  }
};
