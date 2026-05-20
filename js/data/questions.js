// Banco completo de questões — 10 por fase + extras para revisão adaptativa

const rawQuestions = [

  // ==================== FASE 1 — Ponte dos Nomes ====================
  // Substantivo próprio e comum
  {
    id: 'q101', levelId: 1, type: 'drag-category',
    category: 'substantivo_proprio_comum',
    instruction: 'Arraste cada palavra para o baú correto!',
    items: [
      { text: 'Ana', answer: 'proprio' },
      { text: 'cidade', answer: 'comum' },
      { text: 'Brasil', answer: 'proprio' },
      { text: 'cachorro', answer: 'comum' },
      { text: 'Amazonas', answer: 'proprio' },
      { text: 'menino', answer: 'comum' }
    ],
    targets: [
      { id: 'proprio', label: '📛 Substantivo Próprio', icon: '👑' },
      { id: 'comum', label: '📦 Substantivo Comum', icon: '📦' }
    ],
    explanation: 'Substantivo próprio é o nome específico (começa com letra maiúscula). Substantivo comum é o nome geral.'
  },
  {
    id: 'q102', levelId: 1, type: 'drag-category',
    category: 'substantivo_proprio_comum',
    instruction: 'Arraste cada palavra para o baú correto!',
    items: [
      { text: 'Pedro', answer: 'proprio' },
      { text: 'escola', answer: 'comum' },
      { text: 'Maria', answer: 'proprio' },
      { text: 'livro', answer: 'comum' },
      { text: 'Lisboa', answer: 'proprio' },
      { text: 'professora', answer: 'comum' }
    ],
    targets: [
      { id: 'proprio', label: '📛 Substantivo Próprio', icon: '👑' },
      { id: 'comum', label: '📦 Substantivo Comum', icon: '📦' }
    ],
    explanation: '"Pedro" e "Maria" são nomes próprios — identificam pessoas específicas. "Escola" e "livro" são nomes comuns.'
  },
  {
    id: 'q103', levelId: 1, type: 'drag-category',
    category: 'substantivo_proprio_comum',
    instruction: 'Arraste cada palavra para o baú correto!',
    items: [
      { text: 'Rio de Janeiro', answer: 'proprio' },
      { text: 'professor', answer: 'comum' },
      { text: 'Rex', answer: 'proprio' },
      { text: 'gato', answer: 'comum' },
      { text: 'Argentina', answer: 'proprio' },
      { text: 'rua', answer: 'comum' }
    ],
    targets: [
      { id: 'proprio', label: '📛 Substantivo Próprio', icon: '👑' },
      { id: 'comum', label: '📦 Substantivo Comum', icon: '📦' }
    ],
    explanation: '"Rio de Janeiro" é o nome de um lugar específico. "Rex" é o nome de um animal específico.'
  },
  {
    id: 'q104', levelId: 1, type: 'drag-category',
    category: 'substantivo_proprio_comum',
    instruction: 'Arraste cada palavra para o baú correto!',
    items: [
      { text: 'Mariana', answer: 'proprio' },
      { text: 'menina', answer: 'comum' },
      { text: 'São Paulo', answer: 'proprio' },
      { text: 'país', answer: 'comum' },
      { text: 'Atlântico', answer: 'proprio' },
      { text: 'oceano', answer: 'comum' }
    ],
    targets: [
      { id: 'proprio', label: '📛 Substantivo Próprio', icon: '👑' },
      { id: 'comum', label: '📦 Substantivo Comum', icon: '📦' }
    ],
    explanation: '"Mariana" é um nome específico de uma pessoa. "São Paulo" é o nome específico de uma cidade.'
  },
  {
    id: 'q105', levelId: 1, type: 'drag-category',
    category: 'substantivo_proprio_comum',
    instruction: 'Arraste cada palavra para o baú correto!',
    items: [
      { text: 'Florianópolis', answer: 'proprio' },
      { text: 'praia', answer: 'comum' },
      { text: 'Lucas', answer: 'proprio' },
      { text: 'amigo', answer: 'comum' },
      { text: 'Nárnia', answer: 'proprio' },
      { text: 'reino', answer: 'comum' }
    ],
    targets: [
      { id: 'proprio', label: '📛 Substantivo Próprio', icon: '👑' },
      { id: 'comum', label: '📦 Substantivo Comum', icon: '📦' }
    ],
    explanation: 'Nomes de cidades e de pessoas são sempre substantivos próprios.'
  },
  {
    id: 'q106', levelId: 1, type: 'drag-category',
    category: 'substantivo_proprio_comum',
    instruction: 'Arraste cada palavra para o baú correto!',
    items: [
      { text: 'Amazônia', answer: 'proprio' },
      { text: 'rio', answer: 'comum' },
      { text: 'Joana', answer: 'proprio' },
      { text: 'flor', answer: 'comum' },
      { text: 'Amazonas', answer: 'proprio' },
      { text: 'estado', answer: 'comum' }
    ],
    targets: [
      { id: 'proprio', label: '📛 Substantivo Próprio', icon: '👑' },
      { id: 'comum', label: '📦 Substantivo Comum', icon: '📦' }
    ],
    explanation: '"Amazônia" é o nome de uma região específica. "Rio" sem nome específico é substantivo comum.'
  },
  {
    id: 'q107', levelId: 1, type: 'drag-category',
    category: 'substantivo_proprio_comum',
    instruction: 'Arraste cada palavra para o baú correto!',
    items: [
      { text: 'Carlos', answer: 'proprio' },
      { text: 'bola', answer: 'comum' },
      { text: 'Portugal', answer: 'proprio' },
      { text: 'país', answer: 'comum' },
      { text: 'Marta', answer: 'proprio' },
      { text: 'jogadora', answer: 'comum' }
    ],
    targets: [
      { id: 'proprio', label: '📛 Substantivo Próprio', icon: '👑' },
      { id: 'comum', label: '📦 Substantivo Comum', icon: '📦' }
    ],
    explanation: 'Países como "Portugal" e nomes de pessoas como "Carlos" são sempre próprios.'
  },
  {
    id: 'q108', levelId: 1, type: 'drag-category',
    category: 'substantivo_proprio_comum',
    instruction: 'Arraste cada palavra para o baú correto!',
    items: [
      { text: 'Júpiter', answer: 'proprio' },
      { text: 'planeta', answer: 'comum' },
      { text: 'Sofia', answer: 'proprio' },
      { text: 'criança', answer: 'comum' },
      { text: 'Europa', answer: 'proprio' },
      { text: 'satélite', answer: 'comum' }
    ],
    targets: [
      { id: 'proprio', label: '📛 Substantivo Próprio', icon: '👑' },
      { id: 'comum', label: '📦 Substantivo Comum', icon: '📦' }
    ],
    explanation: '"Júpiter" é o nome específico de um planeta. "Planeta" é o nome geral de todos eles.'
  },
  {
    id: 'q109', levelId: 1, type: 'drag-category',
    category: 'substantivo_proprio_comum',
    instruction: 'Arraste cada palavra para o baú correto!',
    items: [
      { text: 'Nile', answer: 'proprio' },
      { text: 'rio', answer: 'comum' },
      { text: 'Belo Horizonte', answer: 'proprio' },
      { text: 'cidade', answer: 'comum' },
      { text: 'Copacabana', answer: 'proprio' },
      { text: 'bairro', answer: 'comum' }
    ],
    targets: [
      { id: 'proprio', label: '📛 Substantivo Próprio', icon: '👑' },
      { id: 'comum', label: '📦 Substantivo Comum', icon: '📦' }
    ],
    explanation: 'Nomes específicos de rios e cidades são substantivos próprios.'
  },
  {
    id: 'q110', levelId: 1, type: 'drag-category',
    category: 'substantivo_proprio_comum',
    instruction: 'Arraste cada palavra para o baú correto!',
    items: [
      { text: 'Bolívar', answer: 'proprio' },
      { text: 'herói', answer: 'comum' },
      { text: 'Curitiba', answer: 'proprio' },
      { text: 'rua', answer: 'comum' },
      { text: 'Tejo', answer: 'proprio' },
      { text: 'ponte', answer: 'comum' }
    ],
    targets: [
      { id: 'proprio', label: '📛 Substantivo Próprio', icon: '👑' },
      { id: 'comum', label: '📦 Substantivo Comum', icon: '📦' }
    ],
    explanation: 'Nomes históricos e geográficos específicos são sempre substantivos próprios.'
  },
  {
    id: 'q111', levelId: 1, type: 'drag-category',
    category: 'substantivo_proprio_comum',
    instruction: 'Arraste cada palavra para o baú correto!',
    items: [
      { text: 'Recife', answer: 'proprio' },
      { text: 'cidade', answer: 'comum' },
      { text: 'Helena', answer: 'proprio' },
      { text: 'aluna', answer: 'comum' },
      { text: 'Londres', answer: 'proprio' },
      { text: 'capital', answer: 'comum' }
    ],
    targets: [
      { id: 'proprio', label: '📛 Substantivo Próprio', icon: '👑' },
      { id: 'comum', label: '📦 Substantivo Comum', icon: '📦' }
    ],
    explanation: '"Recife" e "Helena" são nomes específicos. "Cidade" e "aluna" são nomes gerais.'
  },

  // ==================== FASE 2 — Floresta dos Coletivos ====================
  {
    id: 'q201', levelId: 2, type: 'match-pairs',
    category: 'substantivo_coletivo',
    instruction: 'Ligue o coletivo ao grupo correto!',
    pairs: [
      { left: 'cardume', right: 'peixes' },
      { left: 'enxame', right: 'abelhas' },
      { left: 'rebanho', right: 'ovelhas' },
      { left: 'matilha', right: 'lobos' }
    ],
    explanation: '"Cardume" é o coletivo de peixes. "Enxame" é o coletivo de abelhas.'
  },
  {
    id: 'q202', levelId: 2, type: 'match-pairs',
    category: 'substantivo_coletivo',
    instruction: 'Ligue o coletivo ao grupo correto!',
    pairs: [
      { left: 'alcateia', right: 'lobos' },
      { left: 'bando', right: 'pássaros' },
      { left: 'cardume', right: 'sardinhas' },
      { left: 'nuvem', right: 'gafanhotos' }
    ],
    explanation: '"Alcateia" é o coletivo de lobos. "Bando" é o coletivo de pássaros.'
  },
  {
    id: 'q203', levelId: 2, type: 'match-pairs',
    category: 'substantivo_coletivo',
    instruction: 'Ligue o coletivo ao grupo correto!',
    pairs: [
      { left: 'turma', right: 'alunos' },
      { left: 'frota', right: 'veículos' },
      { left: 'elenco', right: 'atores' },
      { left: 'time', right: 'jogadores' }
    ],
    explanation: '"Turma" é o coletivo de alunos. "Frota" é o coletivo de veículos.'
  },
  {
    id: 'q204', levelId: 2, type: 'match-pairs',
    category: 'substantivo_coletivo',
    instruction: 'Ligue o coletivo ao grupo correto!',
    pairs: [
      { left: 'biblioteca', right: 'livros' },
      { left: 'manada', right: 'elefantes' },
      { left: 'arquipélago', right: 'ilhas' },
      { left: 'constelação', right: 'astros' }
    ],
    explanation: '"Biblioteca" é o coletivo de livros. "Manada" é o coletivo de elefantes.'
  },
  {
    id: 'q205', levelId: 2, type: 'match-pairs',
    category: 'substantivo_coletivo',
    instruction: 'Ligue o coletivo ao grupo correto!',
    pairs: [
      { left: 'colmeia', right: 'abelhas' },
      { left: 'matilha', right: 'cães' },
      { left: 'buquê', right: 'flores' },
      { left: 'álbum', right: 'fotografias' }
    ],
    explanation: '"Colmeia" é onde vivem as abelhas (coletivo). "Matilha" é o coletivo de cães.'
  },
  {
    id: 'q206', levelId: 2, type: 'match-pairs',
    category: 'substantivo_coletivo',
    instruction: 'Ligue o coletivo ao grupo correto!',
    pairs: [
      { left: 'constelação', right: 'estrelas' },
      { left: 'arquipélago', right: 'ilhas' },
      { left: 'ninhada', right: 'filhotes' },
      { left: 'flora', right: 'plantas' }
    ],
    explanation: '"Constelação" é o coletivo de estrelas. "Arquipélago" é o coletivo de ilhas.'
  },
  {
    id: 'q207', levelId: 2, type: 'match-pairs',
    category: 'substantivo_coletivo',
    instruction: 'Ligue o coletivo ao grupo correto!',
    pairs: [
      { left: 'bouquet', right: 'flores' },
      { left: 'tribo', right: 'pessoas' },
      { left: 'frota', right: 'navios' },
      { left: 'cacho', right: 'uvas' }
    ],
    explanation: '"Bouquet" é o coletivo de flores. "Tribo" é o coletivo de pessoas de mesma cultura.'
  },
  {
    id: 'q208', levelId: 2, type: 'match-pairs',
    category: 'substantivo_coletivo',
    instruction: 'Ligue o coletivo ao grupo correto!',
    pairs: [
      { left: 'vara', right: 'porcos' },
      { left: 'piada', right: 'palavras' },
      { left: 'multidão', right: 'torcedores' },
      { left: 'caravana', right: 'viajantes' }
    ],
    explanation: '"Vara" é o coletivo de porcos. Use o contexto para identificar coletivos!'
  },
  {
    id: 'q209', levelId: 2, type: 'match-pairs',
    category: 'substantivo_coletivo',
    instruction: 'Ligue o coletivo ao grupo correto!',
    pairs: [
      { left: 'horda', right: 'bárbaros' },
      { left: 'ninhada', right: 'filhotes' },
      { left: 'esquadrilha', right: 'aviões' },
      { left: 'junta', right: 'bois' }
    ],
    explanation: '"Ninhada" é o coletivo de filhotes nascidos juntos.'
  },
  {
    id: 'q210', levelId: 2, type: 'match-pairs',
    category: 'substantivo_coletivo',
    instruction: 'Ligue o coletivo ao grupo correto!',
    pairs: [
      { left: 'acervo', right: 'obras de arte' },
      { left: 'elenco', right: 'atores' },
      { left: 'quadrilha', right: 'ladrões' },
      { left: 'discoteca', right: 'discos' }
    ],
    explanation: '"Acervo" é o coletivo de obras. "Elenco" é o coletivo de atores.'
  },
  {
    id: 'q211', levelId: 2, type: 'match-pairs',
    category: 'substantivo_coletivo',
    instruction: 'Ligue o coletivo ao grupo correto!',
    pairs: [
      { left: 'pinacoteca', right: 'quadros' },
      { left: 'multidão', right: 'pessoas' },
      { left: 'pomar', right: 'árvores frutíferas' },
      { left: 'cardápio', right: 'pratos' }
    ],
    explanation: '"Pinacoteca" é coletivo de quadros. "Multidão" é coletivo de pessoas.'
  },

  // ==================== FASE 3 — Caverna das Ideias ====================
  {
    id: 'q301', levelId: 3, type: 'drag-category',
    category: 'substantivo_concreto_abstrato',
    instruction: 'Arraste cada palavra para o portal correto!',
    items: [
      { text: 'mesa', answer: 'concreto' },
      { text: 'amor', answer: 'abstrato' },
      { text: 'dragão', answer: 'concreto' },
      { text: 'medo', answer: 'abstrato' }
    ],
    targets: [
      { id: 'concreto', label: '🪨 Concreto (existe)', icon: '🏠' },
      { id: 'abstrato', label: '💭 Abstrato (sentimento/ideia)', icon: '💜' }
    ],
    explanation: 'Concreto é o que podemos imaginar como coisa real (mesmo que fantástico). Abstrato é sentimento ou ideia.'
  },
  {
    id: 'q302', levelId: 3, type: 'drag-category',
    category: 'substantivo_concreto_abstrato',
    instruction: 'Arraste cada palavra para o portal correto!',
    items: [
      { text: 'boneca', answer: 'concreto' },
      { text: 'alegria', answer: 'abstrato' },
      { text: 'pedra', answer: 'concreto' },
      { text: 'tristeza', answer: 'abstrato' }
    ],
    targets: [
      { id: 'concreto', label: '🪨 Concreto (existe)', icon: '🏠' },
      { id: 'abstrato', label: '💭 Abstrato (sentimento/ideia)', icon: '💜' }
    ],
    explanation: '"Boneca" e "pedra" são coisas que existem. "Alegria" e "tristeza" são sentimentos.'
  },
  {
    id: 'q303', levelId: 3, type: 'drag-category',
    category: 'substantivo_concreto_abstrato',
    instruction: 'Arraste cada palavra para o portal correto!',
    items: [
      { text: 'fada', answer: 'concreto' },
      { text: 'coragem', answer: 'abstrato' },
      { text: 'árvore', answer: 'concreto' },
      { text: 'saudade', answer: 'abstrato' }
    ],
    targets: [
      { id: 'concreto', label: '🪨 Concreto (existe)', icon: '🏠' },
      { id: 'abstrato', label: '💭 Abstrato (sentimento/ideia)', icon: '💜' }
    ],
    explanation: '"Fada" é concreta (mesmo sendo imaginária). "Coragem" e "saudade" são sentimentos — abstratos.'
  },
  {
    id: 'q304', levelId: 3, type: 'drag-category',
    category: 'substantivo_concreto_abstrato',
    instruction: 'Arraste cada palavra para o portal correto!',
    items: [
      { text: 'cachorro', answer: 'concreto' },
      { text: 'liberdade', answer: 'abstrato' },
      { text: 'sol', answer: 'concreto' },
      { text: 'felicidade', answer: 'abstrato' }
    ],
    targets: [
      { id: 'concreto', label: '🪨 Concreto (existe)', icon: '🏠' },
      { id: 'abstrato', label: '💭 Abstrato (sentimento/ideia)', icon: '💜' }
    ],
    explanation: '"Cachorro" e "sol" existem como seres. "Liberdade" e "felicidade" são ideias/sentimentos.'
  },
  {
    id: 'q305', levelId: 3, type: 'drag-category',
    category: 'substantivo_concreto_abstrato',
    instruction: 'Arraste cada palavra para o portal correto!',
    items: [
      { text: 'unicórnio', answer: 'concreto' },
      { text: 'paz', answer: 'abstrato' },
      { text: 'livro', answer: 'concreto' },
      { text: 'esperança', answer: 'abstrato' }
    ],
    targets: [
      { id: 'concreto', label: '🪨 Concreto (existe)', icon: '🏠' },
      { id: 'abstrato', label: '💭 Abstrato (sentimento/ideia)', icon: '💜' }
    ],
    explanation: '"Unicórnio" é concreto (ser imaginário). "Paz" e "esperança" são sentimentos/ideias.'
  },
  {
    id: 'q306', levelId: 3, type: 'drag-category',
    category: 'substantivo_concreto_abstrato',
    instruction: 'Arraste cada palavra para o portal correto!',
    items: [
      { text: 'flor', answer: 'concreto' },
      { text: 'beleza', answer: 'abstrato' },
      { text: 'nuvem', answer: 'concreto' },
      { text: 'sonho', answer: 'abstrato' }
    ],
    targets: [
      { id: 'concreto', label: '🪨 Concreto (existe)', icon: '🏠' },
      { id: 'abstrato', label: '💭 Abstrato (sentimento/ideia)', icon: '💜' }
    ],
    explanation: '"Flor" e "nuvem" são coisas concretas. "Beleza" e "sonho" são abstratos.'
  },
  {
    id: 'q307', levelId: 3, type: 'drag-category',
    category: 'substantivo_concreto_abstrato',
    instruction: 'Arraste cada palavra para o portal correto!',
    items: [
      { text: 'casa', answer: 'concreto' },
      { text: 'amizade', answer: 'abstrato' },
      { text: 'chuva', answer: 'concreto' },
      { text: 'justiça', answer: 'abstrato' }
    ],
    targets: [
      { id: 'concreto', label: '🪨 Concreto (existe)', icon: '🏠' },
      { id: 'abstrato', label: '💭 Abstrato (sentimento/ideia)', icon: '💜' }
    ],
    explanation: '"Casa" e "chuva" são coisas reais. "Amizade" e "justiça" são conceitos abstratos.'
  },
  {
    id: 'q308', levelId: 3, type: 'drag-category',
    category: 'substantivo_concreto_abstrato',
    instruction: 'Arraste cada palavra para o portal correto!',
    items: [
      { text: 'lápis', answer: 'concreto' },
      { text: 'dúvida', answer: 'abstrato' },
      { text: 'sapato', answer: 'concreto' },
      { text: 'raiva', answer: 'abstrato' }
    ],
    targets: [
      { id: 'concreto', label: '🪨 Concreto (existe)', icon: '🏠' },
      { id: 'abstrato', label: '💭 Abstrato (sentimento/ideia)', icon: '💜' }
    ],
    explanation: '"Lápis" e "sapato" são objetos concretos. "Dúvida" e "raiva" são estados internos.'
  },
  {
    id: 'q309', levelId: 3, type: 'drag-category',
    category: 'substantivo_concreto_abstrato',
    instruction: 'Arraste cada palavra para o portal correto!',
    items: [
      { text: 'peixe', answer: 'concreto' },
      { text: 'inteligência', answer: 'abstrato' },
      { text: 'montanha', answer: 'concreto' },
      { text: 'bondade', answer: 'abstrato' }
    ],
    targets: [
      { id: 'concreto', label: '🪨 Concreto (existe)', icon: '🏠' },
      { id: 'abstrato', label: '💭 Abstrato (sentimento/ideia)', icon: '💜' }
    ],
    explanation: '"Peixe" e "montanha" existem de forma concreta. "Inteligência" e "bondade" são qualidades abstratas.'
  },
  {
    id: 'q310', levelId: 3, type: 'drag-category',
    category: 'substantivo_concreto_abstrato',
    instruction: 'Arraste cada palavra para o portal correto!',
    items: [
      { text: 'robô', answer: 'concreto' },
      { text: 'criatividade', answer: 'abstrato' },
      { text: 'chapéu', answer: 'concreto' },
      { text: 'imaginação', answer: 'abstrato' }
    ],
    targets: [
      { id: 'concreto', label: '🪨 Concreto (existe)', icon: '🏠' },
      { id: 'abstrato', label: '💭 Abstrato (sentimento/ideia)', icon: '💜' }
    ],
    explanation: '"Robô" e "chapéu" são objetos concretos. "Criatividade" e "imaginação" são capacidades abstratas.'
  },
  {
    id: 'q311', levelId: 3, type: 'drag-category',
    category: 'substantivo_concreto_abstrato',
    instruction: 'Arraste cada palavra para o portal correto!',
    items: [
      { text: 'microscópio', answer: 'concreto' },
      { text: 'solidariedade', answer: 'abstrato' },
      { text: 'foguete', answer: 'concreto' },
      { text: 'curiosidade', answer: 'abstrato' }
    ],
    targets: [
      { id: 'concreto', label: '🪨 Concreto (existe)', icon: '🏠' },
      { id: 'abstrato', label: '💭 Abstrato (sentimento/ideia)', icon: '💜' }
    ],
    explanation: 'Objetos e seres são concretos. Ideias e qualidades, como "solidariedade", são abstratas.'
  },

  // ==================== FASE 4 — Jardim das Qualidades ====================
  {
    id: 'q401', levelId: 4, type: 'select-word',
    category: 'adjetivo',
    instruction: 'Toque no adjetivo da frase!',
    sentence: 'O gato preto dormiu.',
    words: ['O', 'gato', 'preto', 'dormiu'],
    correct: 'preto',
    explanation: '"Preto" descreve como é o gato. Palavras que descrevem são adjetivos!'
  },
  {
    id: 'q402', levelId: 4, type: 'select-word',
    category: 'adjetivo',
    instruction: 'Toque no adjetivo da frase!',
    sentence: 'A menina inteligente estudou.',
    words: ['A', 'menina', 'inteligente', 'estudou'],
    correct: 'inteligente',
    explanation: '"Inteligente" é uma qualidade da menina — é um adjetivo!'
  },
  {
    id: 'q403', levelId: 4, type: 'select-word',
    category: 'adjetivo',
    instruction: 'Toque no adjetivo da frase!',
    sentence: 'O sorvete gelado caiu.',
    words: ['O', 'sorvete', 'gelado', 'caiu'],
    correct: 'gelado',
    explanation: '"Gelado" é uma característica do sorvete — é um adjetivo!'
  },
  {
    id: 'q404', levelId: 4, type: 'select-word',
    category: 'adjetivo',
    instruction: 'Toque no adjetivo da frase!',
    sentence: 'O cachorro pequeno correu.',
    words: ['O', 'cachorro', 'pequeno', 'correu'],
    correct: 'pequeno',
    explanation: '"Pequeno" descreve o tamanho do cachorro — é um adjetivo!'
  },
  {
    id: 'q405', levelId: 4, type: 'select-word',
    category: 'adjetivo',
    instruction: 'Toque no adjetivo da frase!',
    sentence: 'A flor amarela nasceu.',
    words: ['A', 'flor', 'amarela', 'nasceu'],
    correct: 'amarela',
    explanation: '"Amarela" indica a cor da flor — é um adjetivo!'
  },
  {
    id: 'q406', levelId: 4, type: 'select-word',
    category: 'adjetivo',
    instruction: 'Toque no adjetivo da frase!',
    sentence: 'O menino corajoso venceu.',
    words: ['O', 'menino', 'corajoso', 'venceu'],
    correct: 'corajoso',
    explanation: '"Corajoso" descreve o menino — é um adjetivo!'
  },
  {
    id: 'q407', levelId: 4, type: 'select-word',
    category: 'adjetivo',
    instruction: 'Toque no adjetivo da frase!',
    sentence: 'A casa azul brilhou.',
    words: ['A', 'casa', 'azul', 'brilhou'],
    correct: 'azul',
    explanation: '"Azul" descreve a cor da casa — é um adjetivo!'
  },
  {
    id: 'q408', levelId: 4, type: 'select-word',
    category: 'adjetivo',
    instruction: 'Toque no adjetivo da frase!',
    sentence: 'O livro grosso caiu.',
    words: ['O', 'livro', 'grosso', 'caiu'],
    correct: 'grosso',
    explanation: '"Grosso" indica a espessura do livro — é um adjetivo!'
  },
  {
    id: 'q409', levelId: 4, type: 'select-word',
    category: 'adjetivo',
    instruction: 'Toque no adjetivo da frase!',
    sentence: 'A tartaruga lenta chegou.',
    words: ['A', 'tartaruga', 'lenta', 'chegou'],
    correct: 'lenta',
    explanation: '"Lenta" descreve a velocidade da tartaruga — é um adjetivo!'
  },
  {
    id: 'q410', levelId: 4, type: 'select-word',
    category: 'adjetivo',
    instruction: 'Toque no adjetivo da frase!',
    sentence: 'O pássaro colorido cantou.',
    words: ['O', 'pássaro', 'colorido', 'cantou'],
    correct: 'colorido',
    explanation: '"Colorido" descreve como é o pássaro — é um adjetivo!'
  },
  {
    id: 'q411', levelId: 4, type: 'select-word',
    category: 'adjetivo',
    instruction: 'Toque no adjetivo da frase!',
    sentence: 'A pesquisadora curiosa fez perguntas.',
    words: ['A', 'pesquisadora', 'curiosa', 'fez', 'perguntas'],
    correct: 'curiosa',
    explanation: '"Curiosa" caracteriza a pesquisadora. Palavra que caracteriza é adjetivo.'
  },

  // ==================== FASE 5 — Montanha das Ações ====================
  {
    id: 'q501', levelId: 5, type: 'select-word',
    category: 'verbo',
    instruction: 'Toque no verbo da frase!',
    sentence: 'Pedro pulou o muro.',
    words: ['Pedro', 'pulou', 'o', 'muro'],
    correct: 'pulou',
    explanation: '"Pulou" indica a ação de Pedro — é um verbo!'
  },
  {
    id: 'q502', levelId: 5, type: 'select-word',
    category: 'verbo',
    instruction: 'Toque no verbo da frase!',
    sentence: 'Maria cantou uma música.',
    words: ['Maria', 'cantou', 'uma', 'música'],
    correct: 'cantou',
    explanation: '"Cantou" é a ação de Maria — é um verbo!'
  },
  {
    id: 'q503', levelId: 5, type: 'select-word',
    category: 'verbo',
    instruction: 'Toque no verbo da frase!',
    sentence: 'O pássaro voou alto.',
    words: ['O', 'pássaro', 'voou', 'alto'],
    correct: 'voou',
    explanation: '"Voou" é a ação do pássaro — é um verbo!'
  },
  {
    id: 'q504', levelId: 5, type: 'select-word',
    category: 'verbo',
    instruction: 'Toque no verbo da frase!',
    sentence: 'Nós estudamos português.',
    words: ['Nós', 'estudamos', 'português'],
    correct: 'estudamos',
    explanation: '"Estudamos" é a ação do grupo — é um verbo!'
  },
  {
    id: 'q505', levelId: 5, type: 'select-word',
    category: 'verbo',
    instruction: 'Toque no verbo da frase!',
    sentence: 'O bebê dormiu cedo.',
    words: ['O', 'bebê', 'dormiu', 'cedo'],
    correct: 'dormiu',
    explanation: '"Dormiu" é a ação do bebê — é um verbo!'
  },
  {
    id: 'q506', levelId: 5, type: 'select-word',
    category: 'verbo',
    instruction: 'Toque no verbo da frase!',
    sentence: 'A menina correu no parque.',
    words: ['A', 'menina', 'correu', 'no', 'parque'],
    correct: 'correu',
    explanation: '"Correu" é a ação da menina — é um verbo!'
  },
  {
    id: 'q507', levelId: 5, type: 'select-word',
    category: 'verbo',
    instruction: 'Toque no verbo da frase!',
    sentence: 'O gato bebeu leite.',
    words: ['O', 'gato', 'bebeu', 'leite'],
    correct: 'bebeu',
    explanation: '"Bebeu" é a ação do gato — é um verbo!'
  },
  {
    id: 'q508', levelId: 5, type: 'select-word',
    category: 'verbo',
    instruction: 'Toque no verbo da frase!',
    sentence: 'As crianças brincaram na escola.',
    words: ['As', 'crianças', 'brincaram', 'na', 'escola'],
    correct: 'brincaram',
    explanation: '"Brincaram" é a ação das crianças — é um verbo!'
  },
  {
    id: 'q509', levelId: 5, type: 'select-word',
    category: 'verbo',
    instruction: 'Toque no verbo da frase!',
    sentence: 'O sol brilhou o dia todo.',
    words: ['O', 'sol', 'brilhou', 'o', 'dia', 'todo'],
    correct: 'brilhou',
    explanation: '"Brilhou" é a ação do sol — é um verbo!'
  },
  {
    id: 'q510', levelId: 5, type: 'select-word',
    category: 'verbo',
    instruction: 'Toque no verbo da frase!',
    sentence: 'A borboleta pousou na flor.',
    words: ['A', 'borboleta', 'pousou', 'na', 'flor'],
    correct: 'pousou',
    explanation: '"Pousou" é a ação da borboleta — é um verbo!'
  },
  {
    id: 'q511', levelId: 5, type: 'select-word',
    category: 'verbo',
    instruction: 'Toque no verbo da frase!',
    sentence: 'Os atletas treinaram com disciplina.',
    words: ['Os', 'atletas', 'treinaram', 'com', 'disciplina'],
    correct: 'treinaram',
    explanation: '"Treinaram" mostra a ação dos atletas. Toda ação na frase é verbo.'
  },

  // ==================== FASE 6 — Praia do C, S e Ç ====================
  {
    id: 'q601', levelId: 6, type: 'complete-word',
    category: 'ortografia_c_s_cedilha',
    instruction: 'Arraste a letra certa para completar a palavra!',
    wordTemplate: 'cora__ão',
    correct: 'ç',
    options: ['c', 's', 'ç'],
    finalWord: 'coração',
    explanation: 'A letra Ç (cedilha) faz o som /s/ antes de A, O e U. "Coração" usa ç!'
  },
  {
    id: 'q602', levelId: 6, type: 'complete-word',
    category: 'ortografia_c_s_cedilha',
    instruction: 'Arraste a letra certa para completar a palavra!',
    wordTemplate: 'ma__ã',
    correct: 'ç',
    options: ['c', 's', 'ç'],
    finalWord: 'maçã',
    explanation: 'Em "maçã", o som /s/ antes do A é feito com Ç (cedilha)!'
  },
  {
    id: 'q603', levelId: 6, type: 'complete-word',
    category: 'ortografia_c_s_cedilha',
    instruction: 'Arraste a letra certa para completar a palavra!',
    wordTemplate: 'do__e',
    correct: 'c',
    options: ['c', 's', 'ç'],
    finalWord: 'doce',
    explanation: 'Em "doce", o C antes de E faz o som /s/. Não precisa de cedilha!'
  },
  {
    id: 'q604', levelId: 6, type: 'complete-word',
    category: 'ortografia_c_s_cedilha',
    instruction: 'Arraste a letra certa para completar a palavra!',
    wordTemplate: 'pa__arinho',
    correct: 's',
    options: ['c', 's', 'ç'],
    finalWord: 'passarinho',
    explanation: 'Em "passarinho", o SS faz o som /s/ entre vogais. Apenas um S é fraco!'
  },
  {
    id: 'q605', levelId: 6, type: 'complete-word',
    category: 'ortografia_c_s_cedilha',
    instruction: 'Arraste a letra certa para completar a palavra!',
    wordTemplate: 'a__úcar',
    correct: 'ç',
    options: ['c', 's', 'ç'],
    finalWord: 'açúcar',
    explanation: 'Em "açúcar", o som /s/ antes de U pede Ç (cedilha)!'
  },
  {
    id: 'q606', levelId: 6, type: 'complete-word',
    category: 'ortografia_c_s_cedilha',
    instruction: 'Arraste a letra certa para completar a palavra!',
    wordTemplate: '__idade',
    correct: 'c',
    options: ['c', 's', 'ç'],
    finalWord: 'cidade',
    explanation: 'Em "cidade", o C antes de I faz o som /s/. Não precisa de cedilha!'
  },
  {
    id: 'q607', levelId: 6, type: 'complete-word',
    category: 'ortografia_c_s_cedilha',
    instruction: 'Arraste a letra certa para completar a palavra!',
    wordTemplate: 'vo__ê',
    correct: 'c',
    options: ['c', 's', 'ç'],
    finalWord: 'você',
    explanation: 'Em "você", o C antes de Ê faz o som /s/. Antes de E e I não precisa de cedilha!'
  },
  {
    id: 'q608', levelId: 6, type: 'complete-word',
    category: 'ortografia_c_s_cedilha',
    instruction: 'Arraste a letra certa para completar a palavra!',
    wordTemplate: 'prin__esa',
    correct: 'c',
    options: ['c', 's', 'ç'],
    finalWord: 'princesa',
    explanation: 'Em "princesa", o C antes de E faz o som /s/!'
  },
  {
    id: 'q609', levelId: 6, type: 'complete-word',
    category: 'ortografia_c_s_cedilha',
    instruction: 'Arraste a letra certa para completar a palavra!',
    wordTemplate: 'lan__a',
    correct: 'ç',
    options: ['c', 's', 'ç'],
    finalWord: 'lança',
    explanation: 'Em "lança", o som /s/ antes de A usa Ç (cedilha)!'
  },
  {
    id: 'q610', levelId: 6, type: 'complete-word',
    category: 'ortografia_c_s_cedilha',
    instruction: 'Arraste a letra certa para completar a palavra!',
    wordTemplate: 'ca__a',
    correct: 'ç',
    options: ['c', 's', 'ç'],
    finalWord: 'caça',
    explanation: 'Em "caça", o som /s/ antes de A usa Ç (cedilha)!'
  },
  {
    id: 'q611', levelId: 6, type: 'complete-word',
    category: 'ortografia_c_s_cedilha',
    instruction: 'Arraste a letra certa para completar a palavra!',
    wordTemplate: 'pa__oca',
    correct: 'ç',
    options: ['c', 's', 'ç'],
    finalWord: 'paçoca',
    explanation: 'Em "paçoca", o som /s/ antes de O usa Ç (cedilha).'
  },

  // ==================== FASE 7 — Castelo da Revisão (mix) ====================
  {
    id: 'q701', levelId: 7, type: 'drag-category',
    category: 'substantivo_proprio_comum',
    instruction: 'Arraste cada palavra para o baú correto!',
    items: [
      { text: 'Luna', answer: 'proprio' },
      { text: 'estrela', answer: 'comum' },
      { text: 'Netuno', answer: 'proprio' },
      { text: 'planeta', answer: 'comum' }
    ],
    targets: [
      { id: 'proprio', label: '📛 Substantivo Próprio', icon: '👑' },
      { id: 'comum', label: '📦 Substantivo Comum', icon: '📦' }
    ],
    explanation: '"Luna" e "Netuno" são nomes específicos — próprios. "Estrela" e "planeta" são nomes gerais — comuns.'
  },
  {
    id: 'q702', levelId: 7, type: 'select-word',
    category: 'verbo',
    instruction: 'Toque no verbo da frase!',
    sentence: 'O dragão cuspiu fogo.',
    words: ['O', 'dragão', 'cuspiu', 'fogo'],
    correct: 'cuspiu',
    explanation: '"Cuspiu" é a ação do dragão — é um verbo!'
  },
  {
    id: 'q703', levelId: 7, type: 'select-word',
    category: 'adjetivo',
    instruction: 'Toque no adjetivo da frase!',
    sentence: 'O castelo antigo brilhou.',
    words: ['O', 'castelo', 'antigo', 'brilhou'],
    correct: 'antigo',
    explanation: '"Antigo" descreve o castelo — é um adjetivo!'
  },
  {
    id: 'q704', levelId: 7, type: 'complete-word',
    category: 'ortografia_c_s_cedilha',
    instruction: 'Arraste a letra certa para completar a palavra!',
    wordTemplate: 'dan__a',
    correct: 'ç',
    options: ['c', 's', 'ç'],
    finalWord: 'dança',
    explanation: 'Em "dança", o som /s/ antes de A usa Ç (cedilha)!'
  },
  {
    id: 'q705', levelId: 7, type: 'match-pairs',
    category: 'substantivo_coletivo',
    instruction: 'Ligue o coletivo ao grupo correto!',
    pairs: [
      { left: 'rebanho', right: 'ovelhas' },
      { left: 'banco', right: 'peixes' }
    ],
    explanation: '"Rebanho" é o coletivo de ovelhas. "Banco" também pode ser coletivo de peixes!'
  },
  {
    id: 'q706', levelId: 7, type: 'drag-category',
    category: 'substantivo_concreto_abstrato',
    instruction: 'Arraste cada palavra para o portal correto!',
    items: [
      { text: 'espada', answer: 'concreto' },
      { text: 'honra', answer: 'abstrato' },
      { text: 'torre', answer: 'concreto' },
      { text: 'poder', answer: 'abstrato' }
    ],
    targets: [
      { id: 'concreto', label: '🪨 Concreto (existe)', icon: '🏠' },
      { id: 'abstrato', label: '💭 Abstrato (sentimento/ideia)', icon: '💜' }
    ],
    explanation: '"Espada" e "torre" são objetos concretos. "Honra" e "poder" são conceitos abstratos.'
  },
  {
    id: 'q707', levelId: 7, type: 'select-word',
    category: 'adjetivo',
    instruction: 'Toque no adjetivo da frase!',
    sentence: 'A feiticeira poderosa sorriu.',
    words: ['A', 'feiticeira', 'poderosa', 'sorriu'],
    correct: 'poderosa',
    explanation: '"Poderosa" é uma qualidade da feiticeira — é um adjetivo!'
  },
  {
    id: 'q708', levelId: 7, type: 'select-word',
    category: 'verbo',
    instruction: 'Toque no verbo da frase!',
    sentence: 'O cavaleiro venceu o torneio.',
    words: ['O', 'cavaleiro', 'venceu', 'o', 'torneio'],
    correct: 'venceu',
    explanation: '"Venceu" é a ação do cavaleiro — é um verbo!'
  },
  {
    id: 'q709', levelId: 7, type: 'complete-word',
    category: 'ortografia_c_s_cedilha',
    instruction: 'Arraste a letra certa para completar a palavra!',
    wordTemplate: 'for__a',
    correct: 'ç',
    options: ['c', 's', 'ç'],
    finalWord: 'força',
    explanation: 'Em "força", o som /s/ antes de A usa Ç (cedilha)!'
  },
  {
    id: 'q710', levelId: 7, type: 'drag-category',
    category: 'substantivo_proprio_comum',
    instruction: 'Arraste cada palavra para o baú correto!',
    items: [
      { text: 'Merlin', answer: 'proprio' },
      { text: 'mago', answer: 'comum' },
      { text: 'Camelot', answer: 'proprio' },
      { text: 'castelo', answer: 'comum' }
    ],
    targets: [
      { id: 'proprio', label: '📛 Substantivo Próprio', icon: '👑' },
      { id: 'comum', label: '📦 Substantivo Comum', icon: '📦' }
    ],
    explanation: '"Merlin" e "Camelot" são nomes específicos — próprios!'
  },
  {
    id: 'q711', levelId: 7, type: 'build-sentence',
    category: 'sintaxe_frase',
    instruction: 'Monte a frase na ordem correta!',
    words: ['A', 'aventura', 'ficou', 'emocionante'],
    correctSentence: 'A aventura ficou emocionante',
    explanation: 'A frase correta respeita a ordem sujeito + verbo + complemento.'
  }
]

const DIFFICULTY_ORDER = ['facil', 'medio', 'dificil']

function buildDifficultyByLevel(items) {
  const byLevel = new Map()

  items.forEach((q) => {
    if (!byLevel.has(q.levelId)) byLevel.set(q.levelId, [])
    byLevel.get(q.levelId).push(q)
  })

  const difficultyById = new Map()

  byLevel.forEach((levelQuestions) => {
    const ordered = [...levelQuestions].sort((a, b) => a.id.localeCompare(b.id))
    const total = ordered.length

    ordered.forEach((q, idx) => {
      const ratio = (idx + 1) / total
      let difficulty = 'facil'

      if (ratio > 0.66) {
        difficulty = 'dificil'
      } else if (ratio > 0.33) {
        difficulty = 'medio'
      }

      difficultyById.set(q.id, difficulty)
    })
  })

  return difficultyById
}

const difficultyById = buildDifficultyByLevel(rawQuestions)

export const questions = rawQuestions.map((q) => ({
  ...q,
  difficulty: q.difficulty || difficultyById.get(q.id) || 'medio'
}))

export function getQuestionsByLevel(levelId) {
  const rank = DIFFICULTY_ORDER.reduce((acc, item, idx) => {
    acc[item] = idx
    return acc
  }, {})

  return questions
    .filter(q => q.levelId === levelId)
    .sort((a, b) => {
      const diff = (rank[a.difficulty] ?? 1) - (rank[b.difficulty] ?? 1)
      if (diff !== 0) return diff
      return a.id.localeCompare(b.id)
    })
}

export function getQuestionById(id) {
  return questions.find(q => q.id === id) || null
}

export function getQuestionsByCategory(category) {
  return questions.filter(q => q.category === category || (q.category && q.category.includes(category)))
}
