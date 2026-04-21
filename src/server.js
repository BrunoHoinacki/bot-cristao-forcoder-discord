const express = require("express");
const logger = require("./utils/logger");
const { getRandomVerseWithReflection } = require("./services/bibleService");
const { sendWhatsViaN8n } = require("./services/n8nWhatsService");
const { getAllGuildConfigs } = require("./services/guildConfigService");


function startServer(client) {
  const app = express();
  const port = process.env.PORT || 3000;

  app.get("/health", (req, res) => {
    res.json({ status: "ok", bot: client?.user?.tag || null });
  });

  // Endpoint para disparar versículo manualmente (ex: webhook, teste)
  app.post("/trigger/daily-verse", async (req, res) => {
    try {
      const guildConfigs = getAllGuildConfigs();
      const entries = Object.entries(guildConfigs);

      if (!entries.length) {
        res.status(400).json({
          ok: false,
          error: "Nenhum servidor configurado. Use /configurar_canal."
        });
        return;
      }

      const { verse, reference, reflection } = getRandomVerseWithReflection();
      let sentCount = 0;

      for (const [guildId, channelId] of entries) {
        try {
          const channel = await client.channels.fetch(channelId);
          if (!channel || !channel.isTextBased()) {
            logger.warn(`Canal inválido para guild ${guildId}: ${channelId}`);
            continue;
          }

          await channel.send(
            `📖 **${reference}**\n` +
              `> ${verse}\n\n` +
              `💡 ${reflection}`
          );
          sentCount += 1;
        } catch (err) {
          logger.error(
            `Erro ao disparar versículo para guild ${guildId} (canal ${channelId}):`,
            err
          );
        }
      }

      const to = process.env.WHATS_GROUP_JID;
      if (to) {
        const text =
          `🌿 *Cristo Vive*\n\n` +
          `📖 *${reference}*\n` +
          `${verse}\n\n` +
          `💬 ${reflection}`;

        await sendWhatsViaN8n({ to, text });
      }

      res.json({ ok: true, sentCount });
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
