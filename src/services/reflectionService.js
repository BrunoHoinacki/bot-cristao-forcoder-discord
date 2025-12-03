const REFLECTIONS = {
  verdade:
    "A verdade de Cristo não é um conceito: é um encontro. E encontros mudam destinos.",

  provisao:
    "Quando Deus é o pastor, a provisão não é apenas material — é emocional, espiritual e eterna.",

  ansiedade:
    "A ansiedade perde força quando lembramos que Deus já está no amanhã que tememos.",

  coragem:
    "Coragem não é ausência de medo; é saber que Deus caminha no vale junto contigo.",

  proposito:
    "Os planos de Deus não falham porque Ele não improvisa — Ele guia.",

  mente:
    "A mente renovada não pensa menos no mundo, mas pensa mais como Cristo.",

  refugio:
    "Deus não é fuga: é abrigo. É onde tua alma aprende a respirar novamente.",

  confianca:
    "Confiar é descansar no que Deus pode fazer, não no que você consegue controlar.",

  descanso:
    "Jesus não oferece mais tarefas, Ele oferece descanso para a alma cansada.",

  socorro:
    "O socorro de Deus não atrasa — ele chega no tempo perfeito.",

  paz:
    "A paz de Cristo não depende de circunstâncias, mas de presença.",

  forca:
    "Deus não renova apenas forças: Ele renova perspectivas.",

  cura:
    "Coração quebrado para Deus não é problema; é matéria-prima.",

  prioridade:
    "Buscar o Reino primeiro não tira nada de você — organiza tudo dentro de você.",

  guerra:
    "A guerra espiritual é real, mas a armadura também é. Você não está desarmado.",

  graca:
    "A graça não é recompensa por força; é resposta para fraqueza.",

  protecao:
    "A sombra do Onipotente não escurece a vida — refresca a alma.",

  alegria:
    "A alegria do Senhor não ignora a dor, mas a ilumina.",

  intimidade:
    "Quem dá um passo em direção a Deus descobre que Ele já tinha caminhado mil em sua direção.",

  amor:
    "O amor de Deus não afasta o medo por força, mas por presença."
};

function getReflectionByTag(tag) {
  return (
    REFLECTIONS[tag] ||
    "Deus conhece o teu coração melhor do que qualquer algoritmo. Confia nEle hoje."
  );
}

module.exports = { getReflectionByTag };
