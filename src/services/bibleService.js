const reflections = require("./reflectionService");

const VERSES = [
  { reference: "João 8:32", verse: "E conhecereis a verdade, e a verdade vos libertará.", tag: "verdade" },
  
  { reference: "Salmos 23:1", verse: "O Senhor é o meu pastor; nada me faltará.", tag: "provisao" },

  { reference: "Filipenses 4:6", verse: "Não andeis ansiosos por coisa alguma; antes, em tudo sejam os vossos pedidos conhecidos diante de Deus.", tag: "ansiedade" },

  { reference: "Isaías 41:10", verse: "Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus.", tag: "coragem" },

  { reference: "Josué 1:9", verse: "Sê forte e corajoso; não temas, nem te espantes, porque o Senhor teu Deus é contigo.", tag: "coragem" },

  { reference: "Romanos 8:28", verse: "Todas as coisas cooperam para o bem daqueles que amam a Deus.", tag: "proposito" },

  { reference: "Romanos 12:2", verse: "Não vos conformeis com este mundo, mas transformai-vos pela renovação da mente.", tag: "mente" },

  { reference: "Salmos 46:1", verse: "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.", tag: "refugio" },

  { reference: "1 Pedro 5:7", verse: "Lançando sobre Ele toda a vossa ansiedade, porque Ele cuida de vós.", tag: "ansiedade" },

  { reference: "Salmos 37:5", verse: "Entrega o teu caminho ao Senhor; confia nele, e Ele tudo fará.", tag: "confianca" },

  { reference: "Mateus 11:28", verse: "Vinde a mim todos os que estais cansados e oprimidos, e eu vos aliviarei.", tag: "descanso" },

  { reference: "Provérbios 3:5", verse: "Confia no Senhor de todo o teu coração e não te apoies no teu próprio entendimento.", tag: "confianca" },

  { reference: "Jeremias 29:11", verse: "Eu sei os planos que tenho para vós, diz o Senhor; planos de paz e não de mal.", tag: "proposito" },

  { reference: "Salmos 121:1-2", verse: "Elevo os meus olhos para os montes; de onde me virá o socorro? O meu socorro vem do Senhor.", tag: "socorro" },

  { reference: "João 14:27", verse: "Deixo-vos a paz, a minha paz vos dou; não se turbe o vosso coração.", tag: "paz" },

  { reference: "Isaías 40:31", verse: "Os que esperam no Senhor renovarão as suas forças; subirão com asas como águias.", tag: "forca" },

  { reference: "Salmos 34:18", verse: "Perto está o Senhor dos que têm o coração quebrantado.", tag: "cura" },

  { reference: "Mateus 6:33", verse: "Buscai primeiro o reino de Deus e a sua justiça, e todas estas coisas vos serão acrescentadas.", tag: "prioridade" },

  { reference: "Efésios 6:11", verse: "Revesti-vos de toda a armadura de Deus, para que possais resistir no dia mau.", tag: "guerra" },

  { reference: "2 Coríntios 12:9", verse: "A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza.", tag: "graca" },

  { reference: "Salmos 91:1", verse: "Aquele que habita no esconderijo do Altíssimo descansará à sombra do Onipotente.", tag: "protecao" },

  { reference: "Salmos 118:24", verse: "Este é o dia que o Senhor fez; regozijemo-nos e alegremo-nos nele.", tag: "alegria" },

  { reference: "Tiago 4:8", verse: "Chegai-vos a Deus, e Ele se chegará a vós.", tag: "intimidade" },

  { reference: "Mateus 5:16", verse: "Assim resplandeça a vossa luz diante dos homens.", tag: "luz" },

  { reference: "João 16:33", verse: "No mundo tereis aflições, mas tende bom ânimo; eu venci o mundo.", tag: "animo" },

  { reference: "Salmos 27:1", verse: "O Senhor é a minha luz e a minha salvação; a quem temerei?", tag: "coragem" },

  { reference: "Gálatas 5:22", verse: "O fruto do Espírito é amor, alegria, paz, longanimidade...", tag: "espirito" },

  { reference: "1 João 4:18", verse: "No amor não há medo; o perfeito amor lança fora o medo.", tag: "amor" },

  { reference: "Filipenses 4:13", verse: "Tudo posso naquele que me fortalece.", tag: "forca" }
];

function getRandomVerseWithReflection() {
  const random = VERSES[Math.floor(Math.random() * VERSES.length)];
  const reflection = reflections.getReflectionByTag(random.tag);

  return {
    verse: random.verse,
    reference: random.reference,
    reflection
  };
}

module.exports = { getRandomVerseWithReflection };
