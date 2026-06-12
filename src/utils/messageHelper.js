const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const TAG_COLORS = {
  verdade: 0x3498db, // Azul
  luz: 0xf1c40f, // Amarelo
  provisao: 0x2ecc71, // Verde
  ansiedade: 0x9b59b6, // Roxo
  paz: 0x1abc9c, // Turquesa
  coragem: 0xe67e22, // Laranja
  proposito: 0x34495e, // Cinza Azulado
  direcao: 0x27ae60, // Esmeralda
  mente: 0x95a5a6, // Cinza
  refugio: 0xe74c3c, // Vermelho
  socorro: 0xc0392b, // Vermelho Escuro
  confianca: 0x2980b9, // Belize Hole
  descanso: 0x7f8c8d, // Asbestos
  forca: 0x16a085, // Verde Mar
  graca: 0xf39c12, // Laranja Sol
  prioridade: 0x8e44ad, // Ametista
  guerra: 0x2c3e50, // Meia Noite
  alegria: 0xffcb05, // Amarelo Ouro
  gratidao: 0xffa500, // Laranja
  intimidade: 0xff69b4, // Rosa
  oracao: 0x00ffff, // Aqua
  animo: 0x00ff00, // Lima
  espirito: 0xffffff, // Branco
  amor: 0xff0000, // Vermelho
  perdao: 0x0000ff, // Azul Royal
  fe: 0xffd700, // Ouro
  obediencia: 0x8b4513, // Marrom
  santidade: 0xf0f8ff, // Alice Blue
  sabedoria: 0x008080, // Teal
  humildade: 0x808080, // Cinza
  perseveranca: 0x4b0082, // Indigo
  esperanca: 0xadd8e6, // Azul Claro
  identidade: 0xff00ff, // Magenta
  familia: 0xdeb887, // Burly Wood
  trabalho: 0x556b2f, // Verde Oliva Escuro
  generosidade: 0xff7f50, // Coral
  discipulado: 0x4682b4 // Steel Blue
};

const IMAGE_KEYWORDS = {
  luz: "light,sun,nature",
  paz: "calm,ocean,mountain",
  coragem: "mountain,climb,brave",
  provisao: "wheat,nature,abundance",
  amor: "heart,love,kindness",
  fe: "path,light,steps",
  oracao: "prayer,peace,quiet",
  descanso: "sleep,rest,calm",
  forca: "climb,mountain,rock",
  espirito: "dove,sky,clouds",
  esperanca: "dawn,sunrise,morning"
};

/**
 * Gera um Embed formatado para o versículo
 */
function createVerseEmbed({ verse, reference, reflection, tag }) {
  const color = TAG_COLORS[tag] || 0x7289da; // Blurple padrão do Discord
  const keyword = IMAGE_KEYWORDS[tag] || "bible,nature,worship,cross,spirituality";
  
  // URL do Unsplash estável
  const imageUrl = `https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=800&auto=format&fit=crop&sig=${Math.floor(Math.random() * 1000)}`;

  const embed = new EmbedBuilder()
    .setColor(color)
    .setTitle(`📖 ${reference}`)
    .setDescription(`\n*"${verse}"*\n\n**Reflexão:**\n${reflection}`)
    .setThumbnail("https://cdn-icons-png.flaticon.com/512/2881/2881142.png") // Ícone de Bíblia
    .setImage(imageUrl)
    .setFooter({ 
      text: "Bot Cristão • Desenvolvido por Forcoder", 
      iconURL: "https://cdn-icons-png.flaticon.com/512/2906/2906231.png" 
    })
    .setTimestamp();

  return embed;
}

/**
 * Gera a linha de botões para interação
 */
function createVerseButtons() {
  const row = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId("save_to_dm")
      .setLabel("Guardar na DM")
      .setStyle(ButtonStyle.Secondary)
      .setEmoji("📥"),
    new ButtonBuilder()
      .setCustomId("share_random")
      .setLabel("Novo Versículo")
      .setStyle(ButtonStyle.Primary)
      .setEmoji("🔄")
  );

  return row;
}

/**
 * Embed para a Benção Aleatória
 */
function createBlessingEmbed(member) {
  const embed = new EmbedBuilder()
    .setColor(0xffd700)
    .setTitle("✨ Uma Benção para Você!")
    .setDescription(`Olá ${member}, Deus colocou você em meu "coração" agora!\n\nQue o Senhor te abençoe e te guarde; o Senhor faça resplandecer o seu rosto sobre ti e te conceda a paz. (Números 6:24-26)`)
    .setFooter({ text: "Sinta-se amado(a) por Deus hoje." });

  return embed;
}

/**
 * Embed para divulgação do bot
 */
function createPromoEmbed() {
  const embed = new EmbedBuilder()
    .setColor(0x00ff00)
    .setTitle("📢 Compartilhe a Palavra!")
    .setDescription(
      "Você sabia que o **Bot Cristão** é 100% gratuito?\n\n" +
      "Ajude-nos a levar mensagens de fé, esperança e amor para mais pessoas. " +
      "Compartilhe o bot com um servidor que você faz parte!\n\n" +
      "**Instalação com 1 click:**\n" +
      "🔗 [Clique aqui para adicionar](https://bot-cristao-discord.forcoder.com.br/)"
    )
    .setThumbnail("https://cdn-icons-png.flaticon.com/512/2111/2111370.png")
    .setFooter({ text: "Emanando a mensagem de Deus em todo lugar." });

  return embed;
}

/**
 * Embed explicativo sobre as funções do bot
 */
function createFeaturesEmbed() {
  const embed = new EmbedBuilder()
    .setColor(0x3498db)
    .setTitle("🛠️ Conheça as minhas funções!")
    .setDescription(
      "Estou aqui para edificar o seu dia. Confira o que eu posso fazer:\n\n" +
      "📖 **Versículos Diários:** Envio palavras automáticas todos os dias em horários programados.\n\n" +
      "📥 **Guardar na DM:** Viu um versículo que gostou? Clique no botão e eu mando ele no seu privado para você não perder.\n\n" +
      "✨ **Bençãos Aleatórias:** Durante o dia, posso escolher alguém online para receber uma palavra especial de ânimo.\n\n" +
      "⌨️ **Comandos:** Use `/versiculo` a qualquer momento para ler uma nova reflexão."
    )
    .setThumbnail("https://cdn-icons-png.flaticon.com/512/1043/1043431.png")
    .setFooter({ text: "Bot Cristão • Transformando tecnologia em benção." });

  return embed;
}

/**
 * Embed para divulgação da Forcoder
 */
function createForCoderEmbed() {
  const embed = new EmbedBuilder()
    .setColor(0x5865F2) // Cor Blurple do Discord
    .setTitle("🚀 Potencialize seu Servidor com a Forcoder!")
    .setDescription(
      "Precisa de um bot personalizado, integrações avançadas ou automações inteligentes para o seu Discord?\n\n" +
      "A **Forcoder** é especialista em transformar ideias em soluções tecnológicas de alto impacto.\n\n" +
      "✅ Bots sob medida\n" +
      "✅ Integrações com APIs e Sistemas\n" +
      "✅ Automação de Processos\n" +
      "✅ Consultoria Técnica\n\n" +
      "**Fale conosco e peça seu orçamento:**\n" +
      "🔗 [Acesse forcoder.com.br](https://forcoder.com.br/)"
    )
    .setThumbnail("https://cdn-icons-png.flaticon.com/512/1006/1006363.png") // Ícone de engrenagem/tech
    .setFooter({ text: "Forcoder • Tecnologia que conecta e automatiza." });

  return embed;
}

module.exports = {
  createVerseEmbed,
  createVerseButtons,
  createBlessingEmbed,
  createPromoEmbed,
  createFeaturesEmbed,
  createForCoderEmbed
};
