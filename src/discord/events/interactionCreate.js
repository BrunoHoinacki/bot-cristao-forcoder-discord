const { getRandomVerseWithReflection } = require("../../services/bibleService");
const { sendDiscordErrorLog, sendDiscordLog } = require("../../services/discordLogService");
const { createVerseEmbed, createVerseButtons } = require("../../utils/messageHelper");
const logger = require("../../utils/logger");

function getInteractionContext(interaction) {
  return {
    guildId: interaction.guildId,
    channelId: interaction.channelId,
    user: interaction.user?.tag || interaction.user?.id,
    command: interaction.commandName,
    customId: interaction.customId
  };
}

async function replyWithInteractionError(interaction) {
  const payload = {
    content: "⚠️ Ocorreu um erro ao executar essa interação.",
    ephemeral: true
  };

  if (interaction.deferred || interaction.replied) {
    await interaction.followUp(payload);
    return;
  }

  await interaction.reply(payload);
}

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
          await sendDiscordLog(
            client,
            "DM enviada",
            "Versículo salvo enviado por DM.",
            getInteractionContext(interaction)
          );
        } catch (err) {
          logger.error("Erro ao enviar versículo por DM:", err);
          await interaction.reply({
            content: "❌ Não consegui enviar para sua DM. Verifique se suas mensagens privadas estão abertas.",
            ephemeral: true
          });
          await sendDiscordErrorLog(client, "Erro ao enviar DM", err, getInteractionContext(interaction));
        }
        return;
      }

      if (interaction.customId === "share_random") {
        try {
          const data = getRandomVerseWithReflection();
          const embed = createVerseEmbed(data);
          const buttons = createVerseButtons();
          await interaction.reply({
            embeds: [embed],
            components: [buttons],
            ephemeral: true
          });
        } catch (err) {
          logger.error("Erro ao executar botão share_random:", err);
          await replyWithInteractionError(interaction);
          await sendDiscordErrorLog(client, "Erro em botão do Discord", err, getInteractionContext(interaction));
        }
      }
      return;
    }

    if (!interaction.isChatInputCommand()) return;

    const command = client.slashCommands.get(interaction.commandName);
    if (!command) {
      logger.warn(`Slash command não encontrado: ${interaction.commandName}`);
      await replyWithInteractionError(interaction);
      await sendDiscordLog(
        client,
        "Slash command não encontrado",
        "O comando existe no Discord, mas não foi carregado pelo bot.",
        getInteractionContext(interaction)
      );
      return;
    }

    try {
      await command.execute(interaction);
    } catch (err) {
      logger.error(`Erro ao executar slash command ${interaction.commandName}:`, err);
      await replyWithInteractionError(interaction);
      await sendDiscordErrorLog(client, "Erro em slash command", err, getInteractionContext(interaction));
    }
  }
};
