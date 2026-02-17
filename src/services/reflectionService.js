// /home/bruno/Code/bot-cristao-forcoder-discord/src/services/reflectionService.js
const REFLECTIONS = {
  verdade:
    "A verdade de Cristo não apenas informa transforma. Quando a verdade entra, as mentiras perdem força.",

  palavra:
    "A Palavra não é só leitura é alimento. Quando você se expõe à Escritura, Deus ajusta o coração e fortalece a fé.",

  provisao:
    "Deus não promete luxo; promete cuidado. Quem confia no Pastor aprende a descansar na provisão diária.",

  ansiedade:
    "Ansiedade é tentar controlar o que pertence a Deus. Entregar é um ato de fé e fé traz paz.",

  coragem:
    "Coragem cristã não é imprudência; é confiança na presença de Deus mesmo no desconhecido.",

  proposito:
    "Deus escreve histórias eternas com capítulos que você ainda não entende.",

  direcao:
    "Deus guia passo a passo. Você não precisa enxergar o caminho inteiro só obedecer a luz que já recebeu hoje.",

  mente:
    "A renovação da mente começa quando a Palavra passa a ter mais autoridade que suas emoções.",

  refugio:
    "Em Deus você não se esconde do mundo você se fortalece para enfrentá-lo.",

  confianca:
    "Confiança é obedecer mesmo quando o resultado ainda não é visível.",

  descanso:
    "Descansar em Cristo é confiar que Ele já venceu o que você ainda teme.",

  socorro:
    "O socorro do Senhor é firme. Ele não se atrasa Ele prepara.",

  paz:
    "A paz de Deus é estabilidade interior em meio ao caos exterior.",

  forca:
    "Força espiritual nasce da dependência, não da autossuficiência.",

  cura:
    "Deus não ignora feridas Ele transforma cicatrizes em testemunho.",

  prioridade:
    "Quando Deus ocupa o primeiro lugar, todo o resto encontra equilíbrio.",

  guerra:
    "A batalha espiritual não se vence na força humana, mas na rendição diária a Deus.",

  graca:
    "A graça é Deus fazendo por você o que você jamais conseguiria fazer sozinho.",

  protecao:
    "A presença de Deus é escudo invisível e direção segura.",

  alegria:
    "Alegria bíblica não é emoção passageira é convicção de que Deus governa.",

  gratidao:
    "Gratidão muda a perspectiva antes mesmo de mudar a circunstância.",

  intimidade:
    "Intimidade com Deus cresce na constância, não na intensidade momentânea.",

  oracao:
    "Oração não é performance; é dependência. Mesmo poucas palavras sinceras abrem espaço para Deus trabalhar em você.",

  luz:
    "Ser luz não é chamar atenção para si, mas refletir Cristo em atitudes.",

  animo:
    "Ânimo cristão nasce da certeza de que Cristo venceu o mundo.",

  espirito:
    "O fruto do Espírito é evidência de permanência em Deus, não de esforço humano.",

  amor:
    "O amor de Deus não depende do seu desempenho depende do caráter dEle.",

  perdao:
    "Perdão não é dizer que não doeu; é entregar a justiça nas mãos de Deus e escolher não viver preso ao passado.",

  fe:
    "Fé não é negar a realidade é confiar que Deus está acima dela.",

  obediencia:
    "Obediência pode parecer pequena, mas carrega consequências eternas.",

  santidade:
    "Santidade não é perfeição; é separação intencional para viver o propósito de Deus.",

  perseveranca:
    "Perseverar é continuar caminhando quando seria mais fácil desistir.",

  sabedoria:
    "Sabedoria bíblica é aplicar a verdade no cotidiano, mesmo quando ninguém está olhando.",

  humildade:
    "Humildade é reconhecer que tudo o que você é e tem vem de Deus.",

  esperanca:
    "Esperança cristã não é otimismo; é certeza de que Deus continua bom, mesmo quando o cenário não parece.",

  identidade:
    "Sua identidade não está no que você fez ou falhou está em quem Cristo diz que você é: amado, perdoado e refeito.",

  familia:
    "Família é campo de discipulado. Amar, servir e perdoar em casa é uma forma forte de viver o Evangelho.",

  trabalho:
    "Trabalho também é altar. Quando você serve com excelência e integridade, você adora a Deus no ordinário do dia.",

  generosidade:
    "Generosidade quebra o poder do ego. Dar com alegria é declarar: Deus é minha fonte, não o que eu acumulo.",

  discipulado:
    "Seguir Jesus é mais que admirar é praticar. Discipulado é escolher a cruz diariamente e caminhar com Ele."
};

function getReflectionByTag(tag) {
  return (
    REFLECTIONS[tag] ||
    "Confie no Senhor hoje. Ele já está à frente do que você ainda está enfrentando."
  );
}

module.exports = { getReflectionByTag };
