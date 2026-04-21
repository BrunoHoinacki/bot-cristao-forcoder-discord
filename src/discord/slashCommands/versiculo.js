const { SlashCommandBuilder } = require("discord.js");
const { getRandomVerseWithReflection } = require("../../services/bibleService");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("versiculo")
    .setDescription("Envia um versículo bíblico com uma breve reflexão."),
  async execute(interaction) {
    const { verse, reference, reflection } = getRandomVerseWithReflection();

    await interaction.reply(
      `📖 **${reference}**\n` +
        `> ${verse}\n\n` +
        `💡 ${reflection}`
    );
  }
};
