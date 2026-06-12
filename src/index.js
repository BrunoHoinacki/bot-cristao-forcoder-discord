require("dotenv").config();

const { initDiscordClient } = require("./discord/client");
const { startServer } = require("./server");
const { scheduleDailyVerseJob } = require("./jobs/dailyVerseJob");
const { sendDiscordErrorLog } = require("./services/discordLogService");
const logger = require("./utils/logger");

async function main() {
  try {
    const client = await initDiscordClient();

    process.on("unhandledRejection", async err => {
      logger.error("Unhandled rejection:", err);
      await sendDiscordErrorLog(client, "Unhandled rejection", err);
    });

    process.on("uncaughtException", async err => {
      logger.error("Uncaught exception:", err);
      await sendDiscordErrorLog(client, "Uncaught exception", err);
    });

    startServer(client);
    scheduleDailyVerseJob(client);

    logger.info("Aplicação iniciada com sucesso. 🙌");
  } catch (err) {
    logger.error("Erro ao iniciar aplicação:", err);
    process.exit(1);
  }
}

main();
