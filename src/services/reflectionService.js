const REFLECTIONS = {
  verdade:
    "A verdade de Cristo não é só uma ideia, é uma pessoa. Quando você se aproxima dEle, cadeias internas começam a cair.",
  provisao:
    "Deus não promete luxo, mas cuidado. O pastor conhece cada necessidade da ovelha — e a tua história não passou despercebida por Ele.",
  ansiedade:
    "Ansiedade é tentar controlar o amanhã sozinho. Entregar ao Senhor é um ato de confiança: Ele já está no futuro que te preocupa hoje."
};

function getReflectionByTag(tag) {
  return REFLECTIONS[tag] || "Deus conhece o teu coração melhor do que qualquer algoritmo. Confia nEle hoje.";
}

module.exports = { getReflectionByTag };
