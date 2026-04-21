module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;

    const command = client.slashCommands.get(interaction.commandName);
    if (!command) return;

    try {
      await command.execute(interaction);
    } catch (err) {
      console.error(err);

      if (interaction.deferred || interaction.replied) {
        await interaction.followUp({
          content: "⚠️ Ocorreu um erro ao executar esse comando.",
          ephemeral: true
        });
      } else {
        await interaction.reply({
          content: "⚠️ Ocorreu um erro ao executar esse comando.",
          ephemeral: true
        });
      }
    }
  }
};
