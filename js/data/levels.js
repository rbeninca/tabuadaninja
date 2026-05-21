export const levels = [
  {
    id: 1,
    title: 'Ponte dos Nomes',
    icon: '🌉',
    description: 'Ajude a construir a ponte separando nomes próprios e comuns!',
    unlocksAfter: null,
    categories: ['substantivo_proprio', 'substantivo_comum'],
    reward: 'Chapéu de Explorador',
    backgroundImg: 'imgens/backgrounds/fase-1.png',
    backgroundColor: '#87CEEB',
    instruction: 'Substantivo próprio nomeia um ser específico, como Ana ou Brasil. Substantivo comum nomeia seres em geral, como cidade e cachorro.'
  },
  {
    id: 2,
    title: 'Floresta dos Coletivos',
    icon: '🌳',
    description: 'Ligue cada coletivo ao grupo correto e faça a floresta florescer!',
    unlocksAfter: 1,
    categories: ['substantivo_coletivo'],
    reward: 'Papagaio Professor',
    backgroundImg: 'imgens/backgrounds/fase-2.png',
    backgroundColor: '#228B22',
    instruction: 'Substantivo coletivo é uma palavra no singular que indica um conjunto de seres da mesma espécie, como cardume de peixes e enxame de abelhas.'
  },
  {
    id: 3,
    title: 'Caverna das Ideias',
    icon: '🕳️',
    description: 'Separe as palavras concretas das abstratas pelos portais mágicos!',
    unlocksAfter: 2,
    categories: ['substantivo_concreto', 'substantivo_abstrato'],
    reward: 'Bússola Mágica',
    backgroundImg: 'imgens/backgrounds/fase-3.png',
    backgroundColor: '#4B0082',
    instruction: 'Substantivo concreto nomeia seres que existem por si, reais ou imaginários. Substantivo abstrato nomeia sentimentos, qualidades, estados e ideias.'
  },
  {
    id: 4,
    title: 'Jardim das Qualidades',
    icon: '🌸',
    description: 'Encontre o adjetivo em cada frase e faça as flores nascerem!',
    unlocksAfter: 3,
    categories: ['adjetivo'],
    reward: 'Macaco das Palavras',
    backgroundImg: 'imgens/backgrounds/fase-4.png',
    backgroundColor: '#FF69B4',
    instruction: 'Adjetivo é a palavra que caracteriza o substantivo, indicando qualidade, aparência, estado ou modo de ser.'
  },
  {
    id: 5,
    title: 'Montanha das Ações',
    icon: '⛰️',
    description: 'Descubra o verbo em cada frase e suba a montanha!',
    unlocksAfter: 4,
    categories: ['verbo'],
    reward: 'Estrela Dourada',
    backgroundImg: 'imgens/backgrounds/fase-5.png',
    backgroundColor: '#8B4513',
    instruction: 'Verbo é a palavra que indica ação, estado ou fenômeno e se relaciona ao tempo da frase.'
  },
  {
    id: 6,
    title: 'Praia do C, S e Ç',
    icon: '🏖️',
    description: 'Complete as palavras com c, s ou ç e encha a praia de estrelas-do-mar!',
    unlocksAfter: 5,
    categories: ['ortografia_c_s_cedilha'],
    reward: 'Medalha da Ilha',
    backgroundImg: 'imgens/backgrounds/fase-6.png',
    backgroundColor: '#00CED1',
    instruction: 'Na ortografia, usamos c, s ou ç conforme o som e a posição na palavra. O ç representa som de s antes de a, o e u.'
  },
  {
    id: 7,
    title: 'Castelo da Revisão',
    icon: '🏰',
    description: 'O desafio final! Usa tudo que aprendeu para restaurar o Castelo Mágico!',
    unlocksAfter: 6,
    categories: [
      'substantivo_proprio', 'substantivo_comum', 'substantivo_coletivo',
      'substantivo_concreto', 'substantivo_abstrato', 'adjetivo',
      'verbo', 'ortografia_c_s_cedilha'
    ],
    reward: 'Coroa da Sabedoria',
    backgroundImg: 'imgens/backgrounds/fase-7.png',
    backgroundColor: '#8B0000',
    instruction: 'Revisão geral: aplique substantivos, coletivos, concreto e abstrato, adjetivos, verbos e ortografia com c, s e ç para resolver os desafios.'
  }
]

export function getLevelById(id) {
  return levels.find(l => l.id === id) || null
}
