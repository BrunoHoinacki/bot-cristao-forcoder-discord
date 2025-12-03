module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    // Ignora mensagens do próprio bot
    if (message.author.bot) return;

    const content = message.content.trim();

    // Comando simples com prefixo, ex: !versiculo
    if (!content.startsWith("!")) return;

    const [commandName, ...args] = content.slice(1).split(/\s+/);

    const command = client.commands.get(commandName);
    if (!command) return;

    try {
      await command.execute(message, args);
    } catch (err) {
      console.error(err);
      await message.reply("⚠️ Ocorreu um erro ao executar o comando. Tenta de novo, por favor.");
    }
  }
};
