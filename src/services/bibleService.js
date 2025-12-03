const reflections = require("./reflectionService");

// Aqui você pode trocar depois para uma API externa ou banco de dados
const VERSES = [
  {
    reference: "João 8:32",
    verse: "E conhecereis a verdade, e a verdade vos libertará.",
    tag: "verdade"
  },
  {
    reference: "Salmos 23:1",
    verse: "O Senhor é o meu pastor; nada me faltará.",
    tag: "provisao"
  },
  {
    reference: "Filipenses 4:6",
    verse: "Não andeis ansiosos por coisa alguma...",
    tag: "ansiedade"
  }
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
