const express = require("express");
const logger = require("./utils/logger");
const { getRandomVerseWithReflection } = require("./services/bibleService");

function startServer(client) {
  const app = express();
  const port = process.env.PORT || 3000;

  app.get("/health", (req, res) => {
    res.json({ status: "ok", bot: client?.user?.tag || null });
  });

  // Endpoint para disparar versículo manualmente (ex: webhook, teste)
  app.post("/trigger/daily-verse", async (req, res) => {
    try {
      const channelId = process.env.DAILY_VERSE_CHANNEL_ID;
      const channel = await client.channels.fetch(channelId);

      const { verse, reference, reflection } = getRandomVerseWithReflection();

      await channel.send(
        `📖 **${reference}**\n` +
        `> ${verse}\n\n` +
        `💡 ${reflection}`
      );

      res.json({ ok: true });
    } catch (err) {
      logger.error("Erro ao disparar versículo via HTTP:", err);
      res.status(500).json({ ok: false });
    }
  });

  app.listen(port, () => {
    logger.info(`Servidor Express ouvindo na porta ${port}`);
  });
}

module.exports = { startServer };
