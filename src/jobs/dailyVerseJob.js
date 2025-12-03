const cron = require("node-cron");
const { getRandomVerseWithReflection } = require("../services/bibleService");
const logger = require("../utils/logger");

function scheduleDailyVerseJob(client) {
  // pega do .env ou usa um padrão caso falhe
  const cronExpression = process.env.CRON_SCHEDULE || "0 8 * * *";

  // valida expressão cron
  if (!cron.validate(cronExpression)) {
    logger.error(
      `Expressão CRON inválida no .env: "${cronExpression}". Usando padrão "0 8 * * *".`
    );
  }

  const expression = cron.validate(cronExpression)
    ? cronExpression
    : "0 8 * * *";

  cron.schedule(expression, async () => {
    try {
      const channelId = process.env.DAILY_VERSE_CHANNEL_ID;
      const channel = await client.channels.fetch(channelId);

      const { verse, reference, reflection } = getRandomVerseWithReflection();

      await channel.send(
        `🌅 **Devocional de hoje**\n\n` +
        `📖 **${reference}**\n` +
        `> ${verse}\n\n` +
        `💬 ${reflection}`
      );

      logger.info("Versículo diário enviado com sucesso.");
    } catch (err) {
      logger.error("Erro ao enviar versículo diário:", err);
    }
  });

  logger.info(
    `Job diário de versículo agendado com CRON: "${expression}".`
  );
}

module.exports = { scheduleDailyVerseJob };
