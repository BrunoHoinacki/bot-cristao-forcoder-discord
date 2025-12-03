const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const path = require("path");
const fs = require("fs");
const logger = require("../utils/logger");

async function initDiscordClient() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent
    ],
    partials: [Partials.Channel]
  });

  client.commands = new Collection();

  // Carrega comandos
  const commandsPath = path.join(__dirname, "commands");
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

  for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if (command.data && command.execute) {
      client.commands.set(command.data.name, command);
      logger.info(`Comando carregado: ${command.data.name}`);
    }
  }

  // Carrega eventos
  const eventsPath = path.join(__dirname, "events");
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(path.join(eventsPath, file));
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args, client));
    } else {
      client.on(event.name, (...args) => event.execute(...args, client));
    }
    logger.info(`Evento carregado: ${event.name}`);
  }

  await client.login(process.env.DISCORD_TOKEN);
  return client;
}

module.exports = { initDiscordClient };
