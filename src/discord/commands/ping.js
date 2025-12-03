module.exports = {
  data: {
    name: "ping",
    description: "Responde com Pong! Só pra testar se o bot está vivo."
  },
  async execute(message) {
    await message.reply("🏓 Pong! Estou vivo e orando em background. 😄");
  }
};
