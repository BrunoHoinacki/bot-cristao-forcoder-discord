const { getRandomVerseWithReflection } = require("../../services/bibleService");

module.exports = {
  data: {
    name: "versiculo",
    description: "Envia um versículo bíblico com uma breve reflexão."
  },
  async execute(message) {
    const { verse, reference, reflection } = getRandomVerseWithReflection();

    await message.reply(
      `📖 **${reference}**\n` +
      `> ${verse}\n\n` +
      `💡 ${reflection}`
    );
  }
};
