const cron = require("node-cron");
const { getRandomVerseWithReflection } = require("../services/bibleService");
const { sendWhatsViaN8n } = require("../services/n8nWhatsService");
const { getAllGuildConfigs } = require("../services/guildConfigService");
const { createVerseEmbed, createVerseButtons, createBlessingEmbed, createPromoEmbed, createFeaturesEmbed, createForCoderEmbed } = require("../utils/messageHelper");
const logger = require("../utils/logger");

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

  // Job de Divulgação Forcoder (Todo dia às 17:00)
  cron.schedule("0 17 * * *", async () => {
    logger.info("Iniciando Job de Divulgação Forcoder...");
    const guildConfigs = await getAllGuildConfigs();
    const entries = Object.entries(guildConfigs);

    for (const [guildId, channelId] of entries) {
      try {
        const channel = await client.channels.fetch(channelId);
        if (channel && channel.isTextBased()) {
          const forCoderEmbed = createForCoderEmbed();
          await channel.send({ embeds: [forCoderEmbed] });
          logger.info(`Divulgação Forcoder enviada para servidor ${guildId}`);
        }
      } catch (err) {
        logger.error(`Erro no job Forcoder para guild ${guildId}:`, err);
      }
    }
  });

  // Job de Explicação de Funções (Todo dia às 15:00)
  cron.schedule("0 15 * * *", async () => {
    logger.info("Iniciando Job de Explicação de Funções...");
    const guildConfigs = await getAllGuildConfigs();
    const entries = Object.entries(guildConfigs);

    for (const [guildId, channelId] of entries) {
      try {
        const channel = await client.channels.fetch(channelId);
        if (channel && channel.isTextBased()) {
          const featuresEmbed = createFeaturesEmbed();
          await channel.send({ embeds: [featuresEmbed] });
          logger.info(`Explicação de funções enviada para servidor ${guildId}`);
        }
      } catch (err) {
        logger.error(`Erro no job de funções para guild ${guildId}:`, err);
      }
    }
  });

  // Job de Divulgação (Todo dia às 10:00)
  cron.schedule("0 10 * * *", async () => {
    logger.info("Iniciando Job de Divulgação...");
    const guildConfigs = await getAllGuildConfigs();
    const entries = Object.entries(guildConfigs);

    for (const [guildId, channelId] of entries) {
      try {
        const channel = await client.channels.fetch(channelId);
        if (channel && channel.isTextBased()) {
          const promoEmbed = createPromoEmbed();
          await channel.send({ embeds: [promoEmbed] });
          logger.info(`Divulgação enviada para servidor ${guildId}`);
        }
      } catch (err) {
        logger.error(`Erro no job de divulgação para guild ${guildId}:`, err);
      }
    }
  });

  // Job de Benção Aleatória (ex: a cada 4 horas no minuto 30)
  cron.schedule("30 */4 * * *", async () => {
    logger.info("Iniciando Job de Benção Aleatória...");
    const guildConfigs = await getAllGuildConfigs();
    const entries = Object.entries(guildConfigs);

    for (const [guildId, channelId] of entries) {
      try {
        const guild = await client.guilds.fetch(guildId);
        const channel = await client.channels.fetch(channelId);
        
        if (!channel || !channel.isTextBased()) continue;

        // Tenta pegar membros online
        const members = await guild.members.fetch({ withPresences: true });
        const onlineMembers = members.filter(m => !m.user.bot && (m.presence?.status === 'online' || m.presence?.status === 'dnd'));
        
        if (onlineMembers.size > 0) {
          const randomMember = onlineMembers.random();
          const blessingEmbed = createBlessingEmbed(randomMember);
          await channel.send({ embeds: [blessingEmbed] });
          logger.info(`Benção enviada para ${randomMember.user.tag} no servidor ${guild.name}`);
        }
      } catch (err) {
        logger.error(`Erro no job de benção para guild ${guildId}:`, err);
      }
    }
  });

  cron.schedule(cronExpression, async () => {
    try {
      const guildConfigs = await getAllGuildConfigs();
      const entries = Object.entries(guildConfigs);

      if (!entries.length) {
        logger.warn("Nenhum servidor configurado para envio automático.");
        return;
      }

      const data = getRandomVerseWithReflection();
      const embed = createVerseEmbed(data);
      const buttons = createVerseButtons();
      let sentCount = 0;

      // 1) Discord (todos os servidores configurados)
      for (const [guildId, channelId] of entries) {
        try {
          const channel = await client.channels.fetch(channelId);
          if (!channel || !channel.isTextBased()) {
            logger.warn(`Canal inválido para guild ${guildId}: ${channelId}`);
            continue;
          }

          await channel.send({
            embeds: [embed],
            components: [buttons]
          });
          sentCount += 1;
        } catch (err) {
          logger.error(
            `Erro ao enviar devocional para guild ${guildId} (canal ${channelId}):`,
            err
          );
        }
      }

      // 2) WhatsApp via n8n
      const to = process.env.WHATS_GROUP_JID;
      if (!to) {
        logger.warn("WHATS_GROUP_JID não definido. Pulando envio WhatsApp.");
      } else {
        const text = formatWhats(data);
        await sendWhatsViaN8n({ to, text });
      }

      logger.info(`Devocional enviado em ${sentCount} servidor(es) (Discord + WhatsApp).`);
    } catch (err) {
      logger.error("Erro ao enviar devocional:", err);
    }
  });

  logger.info(`Job agendado com CRON: "${cronExpression}".`);
}

module.exports = { scheduleDailyVerseJob };
