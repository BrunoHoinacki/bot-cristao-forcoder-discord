// /home/bruno/Code/bot-cristao-forcoder-discord/src/services/bibleService.js
const reflections = require("./reflectionService");

const VERSES = [
  // VERDADE / PALAVRA
  { reference: "João 8:32", verse: "E conhecereis a verdade, e a verdade vos libertará.", tag: "verdade" },
  { reference: "João 17:17", verse: "Santifica-os na verdade; a tua palavra é a verdade.", tag: "verdade" },
  { reference: "Salmos 119:105", verse: "Lâmpada para os meus pés é a tua palavra e luz para o meu caminho.", tag: "luz" },
  { reference: "Hebreus 4:12", verse: "A palavra de Deus é viva e eficaz, e mais cortante do que qualquer espada de dois gumes.", tag: "palavra" },

  // PROVISÃO
  { reference: "Salmos 23:1", verse: "O Senhor é o meu pastor; nada me faltará.", tag: "provisao" },
  { reference: "Mateus 6:31-33", verse: "Não andeis ansiosos... buscai primeiro o Reino de Deus... e todas estas coisas vos serão acrescentadas.", tag: "prioridade" },
  { reference: "Filipenses 4:19", verse: "O meu Deus suprirá todas as vossas necessidades segundo as suas riquezas em glória.", tag: "provisao" },

  // ANSIEDADE / PAZ
  { reference: "Filipenses 4:6", verse: "Não andeis ansiosos por coisa alguma; antes, em tudo, sejam os vossos pedidos conhecidos diante de Deus.", tag: "ansiedade" },
  { reference: "Filipenses 4:7", verse: "E a paz de Deus, que excede todo entendimento, guardará o vosso coração e a vossa mente.", tag: "paz" },
  { reference: "1 Pedro 5:7", verse: "Lançando sobre Ele toda a vossa ansiedade, porque Ele cuida de vós.", tag: "ansiedade" },
  { reference: "João 14:27", verse: "Deixo-vos a paz, a minha paz vos dou; não se turbe o vosso coração.", tag: "paz" },

  // CORAGEM / MEDO
  { reference: "Isaías 41:10", verse: "Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus.", tag: "coragem" },
  { reference: "Josué 1:9", verse: "Sê forte e corajoso; não temas, nem te espantes, porque o Senhor teu Deus é contigo.", tag: "coragem" },
  { reference: "Salmos 27:1", verse: "O Senhor é a minha luz e a minha salvação; a quem temerei?", tag: "coragem" },
  { reference: "2 Timóteo 1:7", verse: "Deus não nos deu espírito de medo, mas de poder, amor e moderação.", tag: "coragem" },

  // PROPÓSITO / DIREÇÃO
  { reference: "Romanos 8:28", verse: "Todas as coisas cooperam para o bem daqueles que amam a Deus.", tag: "proposito" },
  { reference: "Jeremias 29:11", verse: "Eu sei os planos que tenho para vós... planos de paz e não de mal.", tag: "proposito" },
  { reference: "Provérbios 16:3", verse: "Entrega ao Senhor as tuas obras, e teus planos serão estabelecidos.", tag: "proposito" },
  { reference: "Provérbios 3:6", verse: "Reconhece-o em todos os teus caminhos, e Ele endireitará as tuas veredas.", tag: "direcao" },

  // MENTE / TRANSFORMAÇÃO
  { reference: "Romanos 12:2", verse: "Não vos conformeis com este mundo, mas transformai-vos pela renovação da mente.", tag: "mente" },
  { reference: "Filipenses 4:8", verse: "Tudo o que é verdadeiro... justo... puro... nisso pensai.", tag: "mente" },

  // REFÚGIO / SOCORRO
  { reference: "Salmos 46:1", verse: "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.", tag: "refugio" },
  { reference: "Salmos 121:1-2", verse: "O meu socorro vem do Senhor, que fez o céu e a terra.", tag: "socorro" },
  { reference: "Salmos 34:18", verse: "Perto está o Senhor dos que têm o coração quebrantado.", tag: "cura" },

  // CONFIANÇA / ENTREGA
  { reference: "Salmos 37:5", verse: "Entrega o teu caminho ao Senhor; confia nele, e Ele tudo fará.", tag: "confianca" },
  { reference: "Provérbios 3:5", verse: "Confia no Senhor de todo o teu coração e não te apoies no teu próprio entendimento.", tag: "confianca" },
  { reference: "Salmos 56:3", verse: "Em me vindo o temor, hei de confiar em ti.", tag: "confianca" },

  // DESCANSO
  { reference: "Mateus 11:28", verse: "Vinde a mim todos os que estais cansados e oprimidos, e eu vos aliviarei.", tag: "descanso" },
  { reference: "Salmos 91:1", verse: "Aquele que habita no esconderijo do Altíssimo descansará à sombra do Onipotente.", tag: "protecao" },

  // FORÇA
  { reference: "Isaías 40:31", verse: "Os que esperam no Senhor renovarão as suas forças.", tag: "forca" },
  { reference: "Filipenses 4:13", verse: "Tudo posso naquele que me fortalece.", tag: "forca" },
  { reference: "2 Coríntios 12:9", verse: "A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza.", tag: "graca" },

  // PRIORIDADE / REINO
  { reference: "Mateus 6:33", verse: "Buscai primeiro o reino de Deus e a sua justiça.", tag: "prioridade" },

  // GUERRA ESPIRITUAL
  { reference: "Efésios 6:11", verse: "Revesti-vos de toda a armadura de Deus, para que possais resistir no dia mau.", tag: "guerra" },
  { reference: "2 Coríntios 10:4", verse: "As armas da nossa milícia não são carnais, mas poderosas em Deus.", tag: "guerra" },
  { reference: "Tiago 4:7", verse: "Sujeitai-vos a Deus; resisti ao diabo, e ele fugirá de vós.", tag: "guerra" },

  // ALEGRIA / GRATIDÃO
  { reference: "Salmos 118:24", verse: "Este é o dia que o Senhor fez; regozijemo-nos e alegremo-nos nele.", tag: "alegria" },
  { reference: "1 Tessalonicenses 5:16-18", verse: "Regozijai-vos sempre... em tudo dai graças.", tag: "gratidao" },

  // INTIMIDADE / ORAÇÃO
  { reference: "Tiago 4:8", verse: "Chegai-vos a Deus, e Ele se chegará a vós.", tag: "intimidade" },
  { reference: "Jeremias 33:3", verse: "Clama a mim, e responder-te-ei.", tag: "oracao" },
  { reference: "1 Tessalonicenses 5:17", verse: "Orai sem cessar.", tag: "oracao" },

  // LUZ / TESTEMUNHO
  { reference: "Mateus 5:16", verse: "Assim resplandeça a vossa luz diante dos homens.", tag: "luz" },
  { reference: "Efésios 5:8", verse: "Agora sois luz no Senhor; andai como filhos da luz.", tag: "luz" },

  // ÂNIMO / AFLIÇÕES
  { reference: "João 16:33", verse: "No mundo tereis aflições, mas tende bom ânimo; eu venci o mundo.", tag: "animo" },
  { reference: "Salmos 34:19", verse: "Muitas são as aflições do justo, mas o Senhor de todas o livra.", tag: "animo" },

  // ESPÍRITO / FRUTO
  { reference: "Gálatas 5:22", verse: "O fruto do Espírito é amor, alegria, paz, longanimidade...", tag: "espirito" },
  { reference: "Romanos 8:14", verse: "Todos os que são guiados pelo Espírito de Deus são filhos de Deus.", tag: "espirito" },

  // AMOR / PERDÃO
  { reference: "1 João 4:18", verse: "No amor não há medo; o perfeito amor lança fora o medo.", tag: "amor" },
  { reference: "João 13:35", verse: "Nisto conhecerão todos que sois meus discípulos: se tiverdes amor uns aos outros.", tag: "amor" },
  { reference: "Colossenses 3:13", verse: "Assim como Cristo vos perdoou, assim fazei vós também.", tag: "perdao" },

  // FÉ
  { reference: "Hebreus 11:1", verse: "A fé é a certeza daquilo que esperamos e a prova das coisas que não vemos.", tag: "fe" },
  { reference: "Marcos 9:23", verse: "Tudo é possível ao que crê.", tag: "fe" },
  { reference: "Provérbios 3:5-6", verse: "Confia no Senhor... reconhece-o... e Ele endireitará as tuas veredas.", tag: "fe" },

  // OBEDIÊNCIA / SANTIDADE
  { reference: "Deuteronômio 28:1", verse: "Se ouvires atentamente a voz do Senhor teu Deus...", tag: "obediencia" },
  { reference: "1 Pedro 1:16", verse: "Sede santos, porque Eu sou santo.", tag: "santidade" },

  // SABEDORIA
  { reference: "Tiago 1:5", verse: "Se algum de vós tem falta de sabedoria, peça-a a Deus.", tag: "sabedoria" },
  { reference: "Provérbios 9:10", verse: "O temor do Senhor é o princípio da sabedoria.", tag: "sabedoria" },

  // HUMILDADE
  { reference: "Tiago 4:10", verse: "Humilhai-vos perante o Senhor, e Ele vos exaltará.", tag: "humildade" },
  { reference: "Provérbios 22:4", verse: "A recompensa da humildade e do temor do Senhor é riqueza, honra e vida.", tag: "humildade" },

  // PERSEVERANÇA
  { reference: "Gálatas 6:9", verse: "Não nos cansemos de fazer o bem, porque a seu tempo ceifaremos.", tag: "perseveranca" },
  { reference: "Tiago 1:12", verse: "Bem-aventurado o homem que suporta a tentação.", tag: "perseveranca" },

  // ESPERANÇA
  { reference: "Romanos 15:13", verse: "O Deus da esperança vos encha de todo gozo e paz no crer.", tag: "esperanca" },
  { reference: "Lamentações 3:22-23", verse: "As misericórdias do Senhor... renovam-se cada manhã.", tag: "esperanca" },

  // IDENTIDADE / NOVA VIDA
  { reference: "2 Coríntios 5:17", verse: "Se alguém está em Cristo, nova criatura é.", tag: "identidade" },
  { reference: "Gálatas 2:20", verse: "Já não sou eu quem vive, mas Cristo vive em mim.", tag: "identidade" },

  // DIREÇÃO / DECISÕES
  { reference: "Salmos 32:8", verse: "Instruir-te-ei e ensinar-te-ei o caminho que deves seguir.", tag: "direcao" },
  { reference: "Provérbios 16:9", verse: "O coração do homem planeja o seu caminho, mas o Senhor lhe dirige os passos.", tag: "direcao" },

  // FAMÍLIA / CASA
  { reference: "Josué 24:15", verse: "Eu e a minha casa serviremos ao Senhor.", tag: "familia" },
  { reference: "Provérbios 14:1", verse: "A mulher sábia edifica a sua casa.", tag: "familia" },

  // TRABALHO / DILIGÊNCIA
  { reference: "Colossenses 3:23", verse: "Tudo quanto fizerdes, fazei-o de todo o coração, como para o Senhor.", tag: "trabalho" },
  { reference: "Provérbios 16:3", verse: "Entrega ao Senhor as tuas obras, e teus planos serão estabelecidos.", tag: "trabalho" },

  // GENEROSIDADE
  { reference: "Atos 20:35", verse: "Mais bem-aventurada coisa é dar do que receber.", tag: "generosidade" },
  { reference: "2 Coríntios 9:7", verse: "Deus ama ao que dá com alegria.", tag: "generosidade" },

  // DISCIPULADO / CHAMADO
  { reference: "Lucas 9:23", verse: "Se alguém quer vir após mim, negue-se a si mesmo, tome cada dia a sua cruz e siga-me.", tag: "discipulado" },
  { reference: "Mateus 28:19", verse: "Ide e fazei discípulos de todas as nações.", tag: "discipulado" }
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
