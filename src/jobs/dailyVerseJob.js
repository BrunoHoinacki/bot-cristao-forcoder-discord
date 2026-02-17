const cron = require("node-cron");
const { getRandomVerseWithReflection } = require("../services/bibleService");
const { sendWhatsViaN8n } = require("../services/n8nWhatsService");
const logger = require("../utils/logger");

function formatDiscord({ verse, reference, reflection }) {
  return (
    `🌅 **Devocional do momento**\n\n` +
    `📖 **${reference}**\n` +
    `> ${verse}\n\n` +
    `💬 ${reflection}`
  );
}

function formatWhats({ verse, reference, reflection }) {
  return (
    `🌿 *Cristo Vive*\n\n` +
    `📖 *${reference}*\n` +
    `${verse}\n\n` +
    `💬 ${reflection}`
  );
}

function scheduleDailyVerseJob(client) {
  const cronExpression = process.env.CRON_SCHEDULE || "0 8,12,18 * * *";

  if (!cron.validate(cronExpression)) {
    logger.error(
      `Expressão CRON inválida no .env: "${cronExpression}". Usando padrão "0 8,12,18 * * *".`
    );
  }

  const expression = cron.validate(cronExpression)
    ? cronExpression
    : "0 8,12,18 * * *";

  cron.schedule(expression, async () => {
    try {
      const channelId = process.env.DAILY_VERSE_CHANNEL_ID;
      const channel = await client.channels.fetch(channelId);

      const data = getRandomVerseWithReflection();

      // 1) Discord
      await channel.send(formatDiscord(data));

      // 2) WhatsApp via n8n
      const to = process.env.WHATS_GROUP_JID;
      if (!to) {
        logger.warn("WHATS_GROUP_JID não definido. Pulando envio WhatsApp.");
      } else {
        const text = formatWhats(data);
        await sendWhatsViaN8n({ to, text });
      }

      logger.info("Devocional enviado (Discord + WhatsApp).");
    } catch (err) {
      logger.error("Erro ao enviar devocional:", err);
    }
  });

  logger.info(`Job agendado com CRON: "${expression}".`);
}

module.exports = { scheduleDailyVerseJob };
