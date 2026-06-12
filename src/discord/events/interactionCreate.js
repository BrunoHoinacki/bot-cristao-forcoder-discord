const { getRandomVerseWithReflection } = require("../../services/bibleService");
const { createVerseEmbed, createVerseButtons } = require("../../utils/messageHelper");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isButton()) {
      if (interaction.customId === "save_to_dm") {
        try {
          const embed = interaction.message.embeds[0];
          await interaction.user.send({
            content: "Aqui está o versículo que você guardou:",
            embeds: [embed]
          });
          await interaction.reply({
            content: "✅ Versículo enviado para sua DM!",
            ephemeral: true
          });
        } catch (err) {
          await interaction.reply({
            content: "❌ Não consegui enviar para sua DM. Verifique se suas mensagens privadas estão abertas.",
            ephemeral: true
          });
        }
      }

      if (interaction.customId === "share_random") {
        const data = getRandomVerseWithReflection();
        const embed = createVerseEmbed(data);
        const buttons = createVerseButtons();
        await interaction.reply({
          embeds: [embed],
          components: [buttons],
          ephemeral: true
        });
      }
      return;
    }

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
