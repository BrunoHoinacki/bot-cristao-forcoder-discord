const cron = require("node-cron");
const { getRandomVerseWithReflection } = require("../services/bibleService");
const logger = require("../utils/logger");

function scheduleDailyVerseJob(client) {
  // Todos os dias às 08:00 no horário do container (ajusta TZ no .env)
  cron.schedule("0 * * * *", async () => {
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

  logger.info("Job diário de versículo agendado (08:00).");
}

module.exports = { scheduleDailyVerseJob };
