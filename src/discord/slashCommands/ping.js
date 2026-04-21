const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Responde com Pong! Só pra testar se o bot está vivo."),
  async execute(interaction) {
    await interaction.reply("🏓 Pong! Estou vivo e orando em background. 😄");
  }
};
