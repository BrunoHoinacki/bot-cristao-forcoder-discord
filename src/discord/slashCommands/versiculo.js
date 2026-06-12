const { SlashCommandBuilder } = require("discord.js");
const { getRandomVerseWithReflection } = require("../../services/bibleService");
const { createVerseEmbed, createVerseButtons } = require("../../utils/messageHelper");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("versiculo")
    .setDescription("Envia um versículo bíblico com uma breve reflexão."),
  async execute(interaction) {
    const data = getRandomVerseWithReflection();
    const embed = createVerseEmbed(data);
    const buttons = createVerseButtons();

    await interaction.reply({
      embeds: [embed],
      components: [buttons]
    });
  }
};
