require("dotenv").config();

const { initDiscordClient } = require("./discord/client");
const { startServer } = require("./server");
const { scheduleDailyVerseJob } = require("./jobs/dailyVerseJob");
const logger = require("./utils/logger");

async function main() {
  try {
    const client = await initDiscordClient();
    startServer(client);
    scheduleDailyVerseJob(client);

    logger.info("Aplicação iniciada com sucesso. 🙌");
  } catch (err) {
    logger.error("Erro ao iniciar aplicação:", err);
    process.exit(1);
  }
}

main();
