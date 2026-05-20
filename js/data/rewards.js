export const rewards = [
  {
    id: 'chapeu',
    name: 'Chapéu de Explorador',
    description: 'Um chapéu mágico para grandes aventureiros!',
    img: 'imgens/recompensas/chapeu.png',
    levelId: 1
  },
  {
    id: 'papagaio',
    name: 'Papagaio Professor',
    description: 'Um papagaio sábio que conhece todas as palavras!',
    img: 'imgens/recompensas/papagaio.png',
    levelId: 2
  },
  {
    id: 'bussola',
    name: 'Bússola Mágica',
    description: 'Uma bússola que aponta para as melhores palavras!',
    img: 'imgens/recompensas/bussola.png',
    levelId: 3
  },
  {
    id: 'macaco',
    name: 'Macaco das Palavras',
    description: 'Um macaco inteligente que adora livros!',
    img: 'imgens/recompensas/macaco.png',
    levelId: 4
  },
  {
    id: 'estrela',
    name: 'Estrela Dourada',
    description: 'Uma estrela mágica que brilha no céu da ilha!',
    img: 'imgens/recompensas/estrela.png',
    levelId: 5
  },
  {
    id: 'medalha',
    name: 'Medalha da Ilha',
    description: 'A medalha dos verdadeiros guardiões das palavras!',
    img: 'imgens/recompensas/medalha.png',
    levelId: 6
  },
  {
    id: 'coroa',
    name: 'Coroa da Sabedoria',
    description: 'Você é o(a) mestre das palavras da Ilha Mágica!',
    img: 'imgens/recompensas/estrela.png',
    levelId: 7
  }
]

export function getRewardByLevelId(levelId) {
  return rewards.find(r => r.levelId === levelId) || null
}
