# Plano de Desenvolvimento — A Ilha Mágica das Palavras

## 1. Visão Geral do Projeto

Jogo educativo de Português para crianças de 9 anos (4ª série), rodando 100% no navegador (HTML5 + CSS3 + JavaScript puro), sem servidor, com persistência em localStorage.

---

## 2. Arquitetura

### Padrão arquitetural

```
┌─────────────────────────────────────────────────────────┐
│                        App.js                           │
│              (entry point, inicialização)                │
└──────────────┬──────────────────────────────────────────┘
               │
       ┌───────▼────────┐
       │   Router.js    │  ← máquina de estados de tela
       │ home|map|level │    (home → map → level → result)
       │ result|progress│
       └───────┬────────┘
               │ publica eventos via EventBus
               │
       ┌───────▼────────┐       ┌──────────────────┐
       │  GameState.js  │◄──────│   Storage.js     │
       │ estado global  │       │  localStorage     │
       │ (único source  │       │  wrapper          │
       │  of truth)     │       └──────────────────┘
       └───┬────────────┘
           │
    ┌──────┼───────────────────────┐
    │      │                       │
┌───▼───┐ ┌▼──────────┐ ┌─────────▼──────┐
│Score  │ │Adaptive   │ │Progression     │
│Engine │ │Engine     │ │Engine          │
│(pontos│ │(repetição │ │(desbloqueio    │
│combos │ │inteligente│ │ de fases)      │
│estrela│ │por erros) │ │                │
└───────┘ └───────────┘ └────────────────┘
           │
    ┌──────┼────────────────────────────┐
    │      │                            │
┌───▼───┐ ┌▼──────────┐ ┌─────────────▼──┐
│Screens│ │Mechanics  │ │UI Layer         │
│(telas)│ │(mecânicas │ │(FeedbackUI,     │
│       │ │ de jogo)  │ │ AudioCtrl,      │
│       │ │           │ │ AnimationCtrl)  │
└───────┘ └───────────┘ └────────────────┘
```

### Princípios adotados
- **State Machine** para navegação entre telas (sem URLs)
- **EventBus** (pub/sub) para desacoplamento entre módulos
- **ES Modules** nativos (`import/export`) para modularidade sem bundler
- **Strategy pattern** para mecânicas de questão (cada tipo é um módulo)
- **Repository pattern** para dados (levels, questions, rewards)

---

## 3. Estrutura de Arquivos

```
ilha-das-palavras/
│
├── index.html                    ← único HTML, carrega todos os módulos
│
├── package.json                  ← apenas para rodar Vitest (testes)
├── vitest.config.js
│
├── css/
│   ├── variables.css             ← tokens de design: cores, fontes, espaçamentos
│   ├── reset.css                 ← normalização básica
│   ├── layout.css                ← estrutura de telas (grid, flex containers)
│   ├── components.css            ← botões, cards, stars, hearts, baús
│   └── animations.css            ← bounce, shake, spin, fade, slide
│
├── js/
│   │
│   ├── core/
│   │   ├── App.js                ← inicializa jogo, carrega save, chama Router
│   │   ├── Router.js             ← máquina de estados de tela
│   │   ├── EventBus.js           ← pub/sub: on(event, cb), emit(event, data)
│   │   └── GameState.js          ← estado global: score, lives, combo, stars...
│   │
│   ├── data/
│   │   ├── levels.js             ← definição das 7 fases (id, title, icon, reward...)
│   │   ├── questions.js          ← 70+ questões organizadas por fase e tipo
│   │   └── rewards.js            ← catálogo de recompensas com descrição
│   │
│   ├── engine/
│   │   ├── AdaptiveEngine.js     ← seleciona questões priorizando categorias com erro
│   │   ├── ScoreEngine.js        ← calcula pontos, combo, estrelas
│   │   └── ProgressionEngine.js  ← desbloqueia fases, salva conclusão
│   │
│   ├── screens/
│   │   ├── HomeScreen.js         ← tela inicial com mascote e botões
│   │   ├── MapScreen.js          ← mapa da ilha com fases e status
│   │   ├── LevelScreen.js        ← tela de fase: questão + vidas + barra
│   │   ├── ResultScreen.js       ← resultado: pontos, estrelas, recompensa
│   │   └── ProgressScreen.js     ← progresso geral: todas as fases e erros
│   │
│   ├── mechanics/
│   │   ├── DragDrop.js           ← arrastar palavras para categorias (baús/portais)
│   │   ├── SelectWord.js         ← clicar na palavra certa dentro de uma frase
│   │   ├── CompleteWord.js       ← arrastar letra para lacuna (c, s, ç)
│   │   ├── MatchPairs.js         ← ligar coletivo ao grupo correto
│   │   └── BuildSentence.js      ← montar frase com palavras embaralhadas
│   │
│   ├── ui/
│   │   ├── FeedbackUI.js         ← toast de acerto/erro com explicação pedagógica
│   │   ├── AnimationCtrl.js      ← adiciona/remove classes CSS de animação
│   │   ├── AudioCtrl.js          ← toca sons, toggle mute, fila de áudio
│   │   └── ComponentFactory.js   ← cria elementos: stars, hearts, progress bar
│   │
│   └── storage/
│       └── Storage.js            ← wrapper localStorage: save/load/reset/validate
│
├── assets/
│   ├── img/
│   │   ├── character/            ← mascote explorador (poses)
│   │   ├── map/                  ← mapa da ilha e ícones de região
│   │   ├── backgrounds/          ← fundos das 7 fases + tela inicial
│   │   ├── rewards/              ← figurinhas de recompensa
│   │   └── ui/                   ← baús, estrelas, corações, ícones
│   ├── audio/
│   │   ├── correct.mp3
│   │   ├── wrong.mp3
│   │   ├── star.mp3
│   │   ├── reward.mp3
│   │   └── bg-music.mp3
│   └── fonts/
│
└── tests/
    ├── unit/
    │   ├── EventBus.test.js
    │   ├── GameState.test.js
    │   ├── Router.test.js
    │   ├── Storage.test.js
    │   ├── AdaptiveEngine.test.js
    │   ├── ScoreEngine.test.js
    │   ├── ProgressionEngine.test.js
    │   └── questions.test.js
    │
    └── integration/
        ├── levelFlow.test.js          ← fluxo completo de uma fase
        ├── saveLoad.test.js           ← salvar estado e recuperar após reload
        ├── adaptiveFlow.test.js       ← erros geram mais questões da categoria
        ├── progressionFlow.test.js    ← concluir fase 1 desbloqueia fase 2
        └── rewardFlow.test.js         ← ganhar recompensa e persistir
```

---

## 4. Contratos das Interfaces Principais

### GameState
```js
GameState {
  currentScreen: 'home' | 'map' | 'level' | 'result' | 'progress',
  currentLevelId: number | null,
  currentQuestionIndex: number,
  score: number,
  lives: number,          // 0-3
  combo: number,          // acertos consecutivos
  stars: { [levelId]: 0|1|2|3 },
  errors: { [category]: number },
  rewards: string[],
  completedLevels: number[]
}
```

### Questão (contrato unificado)
```js
Question {
  id: string,             // "q001"
  levelId: number,
  type: 'drag-category' | 'complete-word' | 'select-word'
       | 'match-pairs' | 'build-sentence',
  category: string,       // "substantivo_proprio", "verbo", etc.
  instruction: string,    // texto exibido para a criança
  data: object,           // dados específicos do tipo
  explanation: string     // explicação pedagógica exibida após erro
}
```

### Fase (Level)
```js
Level {
  id: number,
  title: string,
  icon: string,           // emoji
  description: string,
  unlocksAfter: number | null,
  categories: string[],
  reward: string,
  backgroundImg: string
}
```

### Storage (estrutura salva)
```js
SaveData {
  version: number,        // controle de migração
  currentLevel: number,
  totalPoints: number,
  stars: { [levelId]: number },
  errors: { [category]: number },
  rewards: string[],
  completedLevels: number[],
  lastSaved: string       // ISO date
}
```

---

## 5. Plano de Sprints

### Sprint 1 — Fundação (Semana 1)
**Meta:** infraestrutura funcional, persistência e navegação entre telas vazias.

| Tarefa | Arquivo | Estimativa |
|--------|---------|-----------|
| Estrutura de pastas e index.html base | `index.html` | 2h |
| EventBus (on, emit, off) | `js/core/EventBus.js` | 1h |
| GameState (get, set, reset, subscribe) | `js/core/GameState.js` | 2h |
| Storage (save, load, reset, validate) | `js/storage/Storage.js` | 2h |
| Router (máquina de estados) | `js/core/Router.js` | 3h |
| App.js (inicialização, carrega save) | `js/core/App.js` | 1h |
| CSS base: variables, reset, layout | `css/` | 2h |
| Configurar Vitest + testes de EventBus, GameState, Storage, Router | `tests/unit/` | 3h |

**Critério de aceite:** navegar entre telas vazias (home → map → level → result), estado salvo e recuperado corretamente.

---

### Sprint 2 — Dados e Motores (Semana 2)
**Meta:** banco de questões completo e motores de lógica testados.

| Tarefa | Arquivo | Estimativa |
|--------|---------|-----------|
| levels.js: 7 fases definidas | `js/data/levels.js` | 1h |
| questions.js: 70+ questões (10/fase, todos os tipos) | `js/data/questions.js` | 6h |
| rewards.js: catálogo de recompensas | `js/data/rewards.js` | 1h |
| ScoreEngine: pontos, combo, cálculo de estrelas | `js/engine/ScoreEngine.js` | 2h |
| AdaptiveEngine: seleção ponderada por erros | `js/engine/AdaptiveEngine.js` | 3h |
| ProgressionEngine: desbloqueio, salvar conclusão | `js/engine/ProgressionEngine.js` | 2h |
| Testes unitários dos 3 engines | `tests/unit/` | 3h |
| Teste de integridade do banco de questões | `tests/unit/questions.test.js` | 1h |

**Critério de aceite:** 70+ questões válidas, engines com cobertura > 80%, motor adaptativo prioriza categoria com mais erros.

---

### Sprint 3 — Telas (Semana 3)
**Meta:** todas as telas renderizando com dados reais.

| Tarefa | Arquivo | Estimativa |
|--------|---------|-----------|
| HomeScreen: mascote, botões, animação de entrada | `js/screens/HomeScreen.js` | 3h |
| MapScreen: mapa com status por fase (bloq/disp/concluída) | `js/screens/MapScreen.js` | 4h |
| ResultScreen: pontos, estrelas, recompensa | `js/screens/ResultScreen.js` | 2h |
| ProgressScreen: visão geral, categorias com mais erros | `js/screens/ProgressScreen.js` | 2h |
| LevelScreen (scaffolding): header, barra progresso, área de questão | `js/screens/LevelScreen.js` | 2h |
| ComponentFactory: stars, hearts, progress bar | `js/ui/ComponentFactory.js` | 2h |
| CSS: components, animações de tela | `css/` | 3h |

**Critério de aceite:** todas as telas renderizam, navegação completa funcional com dados reais.

---

### Sprint 4 — Mecânicas de Jogo (Semana 4)
**Meta:** todos os 5 tipos de questão implementados e integrados ao LevelScreen.

| Tarefa | Arquivo | Estimativa |
|--------|---------|-----------|
| DragDrop: drag de palavras para baús/portais | `js/mechanics/DragDrop.js` | 5h |
| SelectWord: clicar palavra em frase | `js/mechanics/SelectWord.js` | 2h |
| CompleteWord: arrastar letra para lacuna | `js/mechanics/CompleteWord.js` | 3h |
| MatchPairs: ligar coletivo ao grupo | `js/mechanics/MatchPairs.js` | 3h |
| BuildSentence: montar frase embaralhada | `js/mechanics/BuildSentence.js` | 3h |
| LevelScreen: integra mecânicas via Strategy | `js/screens/LevelScreen.js` | 4h |
| CSS animações: bounce, shake, glow para feedback | `css/animations.css` | 2h |

**Critério de aceite:** jogar fase 1 (drag-category), fase 4 (select-word), fase 6 (complete-word) e fase 2 (match-pairs) sem erros de JS.

---

### Sprint 5 — UI, Feedback e Áudio (Semana 5)
**Meta:** experiência polida com feedback pedagógico, animações e sons.

| Tarefa | Arquivo | Estimativa |
|--------|---------|-----------|
| FeedbackUI: toast de acerto/erro + explicação | `js/ui/FeedbackUI.js` | 3h |
| AnimationCtrl: orchestrar animações por evento | `js/ui/AnimationCtrl.js` | 2h |
| AudioCtrl: sons de acerto/erro/estrela/recompensa | `js/ui/AudioCtrl.js` | 2h |
| Sistema visual de recompensas (modal animado) | `js/screens/ResultScreen.js` | 2h |
| Animações de fase: ponte aparece, flor nasce, etc. | `css/animations.css` | 3h |
| Refinamento CSS: fonte arredondada, cores, responsivo tablet | `css/` | 3h |
| Botão mute/unmute áudio | `js/ui/AudioCtrl.js` | 1h |

**Critério de aceite:** jogar uma fase completa com feedback visual e sonoro em todos os eventos (acerto, erro, estrela, recompensa).

---

### Sprint 6 — Testes de Integração e Polimento (Semana 6)
**Meta:** cobertura de testes, zero bugs críticos, pronto para uso.

| Tarefa | Arquivo | Estimativa |
|--------|---------|-----------|
| Teste integração: fluxo completo fase 1 | `tests/integration/levelFlow.test.js` | 3h |
| Teste integração: save/load após 2 fases | `tests/integration/saveLoad.test.js` | 2h |
| Teste integração: motor adaptativo ponta a ponta | `tests/integration/adaptiveFlow.test.js` | 2h |
| Teste integração: progressão e desbloqueio | `tests/integration/progressionFlow.test.js` | 2h |
| Teste integração: recompensa salva e exibida | `tests/integration/rewardFlow.test.js` | 1h |
| Teste cross-browser: Chrome, Firefox, Safari (mobile) | manual | 3h |
| Bug fixes e ajustes de acessibilidade | — | 4h |
| Revisão de contraste, tamanho de fonte e botões | — | 1h |

---

## 6. Estratégia de Testes

### Ferramenta: Vitest
Vitest suporta ES Modules nativamente, roda com Node.js sem bundler, tem jsdom para simular DOM.

```json
// package.json (apenas para testes — não é dependência do jogo)
{
  "type": "module",
  "devDependencies": {
    "vitest": "^2.0.0",
    "@vitest/coverage-v8": "^2.0.0",
    "jsdom": "^25.0.0"
  },
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest --coverage"
  }
}
```

```js
// vitest.config.js
import { defineConfig } from 'vitest/config'
export default defineConfig({
  test: {
    environment: 'jsdom',
    coverage: { provider: 'v8', thresholds: { lines: 80 } }
  }
})
```

### Testes Unitários — O que testar

#### EventBus.test.js
- `on` registra listener corretamente
- `emit` chama todos os listeners do evento
- `off` remove listener registrado
- múltiplos listeners no mesmo evento
- emit sem listeners não lança erro

#### GameState.test.js
- estado inicial correto
- `set` atualiza campo e notifica subscribers
- `reset` volta ao estado inicial
- `subscribe` recebe notificação ao mudar estado
- campos numéricos não aceitam valores negativos

#### Storage.test.js
- `save` serializa e persiste em localStorage
- `load` retorna null quando não há save
- `load` desserializa e valida estrutura
- `reset` remove chave do localStorage
- `load` de dado corrompido retorna null (não quebra)
- versão incompatível dispara migração

#### ScoreEngine.test.js
- acerto de primeira: +100 pontos
- acerto após dica: +50 pontos
- erro: 0 pontos
- combo de 3 acertos seguidos: +50 pontos extras
- combo de 5 acertos seguidos: +100 pontos extras
- `calculateStars`: 9-10 acertos → 3 estrelas
- `calculateStars`: 7-8 acertos → 2 estrelas
- `calculateStars`: 5-6 acertos → 1 estrela
- `calculateStars`: < 5 → 0 estrelas
- combo reseta após erro

#### AdaptiveEngine.test.js
- sem erros: retorna questões em ordem normal
- com muitos erros em categoria X: questões de X aparecem mais
- não repete a mesma questão duas vezes seguidas
- fase 7 prioriza top-3 categorias com mais erros
- retorna exatamente N questões quando solicitado

#### ProgressionEngine.test.js
- fase 1 começa desbloqueada
- fase 2 bloqueada até fase 1 ser concluída
- `completeLevel` marca fase como concluída
- `isUnlocked` retorna false para fase bloqueada
- `isUnlocked` retorna true para fase desbloqueada
- concluir fase dispara desbloqueio da próxima

#### questions.test.js (integridade de dados)
- todas as questões têm campos obrigatórios (id, type, levelId, etc.)
- ids são únicos
- cada fase tem pelo menos 10 questões
- tipos de questão são válidos (`drag-category`, etc.)
- questões com `type: 'drag-category'` têm campo `items` e `targets`
- questões com `type: 'complete-word'` têm campo `wordTemplate` e `correct`

### Testes de Integração — O que testar

#### levelFlow.test.js
```
Cenário: Jogar fase 1 completa com 10 acertos
1. Iniciar jogo → carregar fase 1
2. Responder 10 questões corretamente
3. Verificar: score = 1000+ pontos, 3 estrelas, recompensa desbloqueada
4. Verificar: estado salvo no localStorage
5. Verificar: fase 2 desbloqueada
```

#### saveLoad.test.js
```
Cenário: Progresso persiste após simular reload
1. Completar fase 1 com 2 estrelas
2. Simular reload (resetar módulos, recarregar save)
3. Verificar: fase 1 mostra 2 estrelas no mapa
4. Verificar: fase 2 está desbloqueada
5. Verificar: pontos totais corretos
```

#### adaptiveFlow.test.js
```
Cenário: Motor adaptativo prioriza categoria com erros
1. Simular 8 erros em "substantivo_coletivo"
2. Entrar na fase 7 (Castelo da Revisão)
3. Verificar: > 40% das questões são de "substantivo_coletivo"
4. Verificar: nenhuma questão repetida em sequência
```

#### progressionFlow.test.js
```
Cenário: Desbloqueio progressivo das fases
1. Estado inicial: apenas fase 1 desbloqueada
2. Concluir fase 1 → fase 2 desbloqueia
3. Concluir fase 2 → fase 3 desbloqueia
4. Fase 4 ainda bloqueada (só fase 3 foi concluída)
```

#### rewardFlow.test.js
```
Cenário: Recompensa salva e exibida corretamente
1. Concluir fase 1 → ganhar "Chapéu de Explorador"
2. Verificar: recompensa na tela de resultado
3. Simular reload
4. Verificar: "Chapéu de Explorador" na tela de progresso
5. Concluir fase 1 novamente → recompensa não duplica
```

---

## 7. Imagens Necessárias (Descrições para Geração por IA)

> Estilo geral de todas as imagens: cartoon 2D infantil, traços arredondados, cores vibrantes e saturadas, aspecto aconchegante e amigável para criança de 9 anos. Fundo transparente (PNG) quando indicado.

---

### 7.1 Personagem Mascote

**Arquivo:** `assets/img/character/mascote-normal.png`
**Prompt:**
> Criança cartoon de aproximadamente 9 anos, gênero neutro, vestindo chapéu de explorador bege/marrom com aba larga, camiseta laranja, calça cáqui com bolsos, mochila verde nas costas. Expressão animada e sorridente. Pose em pé, olhando para frente. Traços arredondados, estilo cartoon colorido infantil. Fundo transparente.

**Arquivo:** `assets/img/character/mascote-comemorando.png`
**Prompt:**
> Mesma criança (mascote do jogo), pose de comemoração: braços levantados para cima, sorriso enorme, estrelinhas e confetes ao redor. Estilo cartoon colorido infantil. Fundo transparente.

**Arquivo:** `assets/img/character/mascote-pensando.png`
**Prompt:**
> Mesma criança (mascote do jogo), pose de pensamento: mão no queixo, olhar para cima, expressão concentrada e curiosa (não triste). Estilo cartoon colorido infantil. Fundo transparente.

---

### 7.2 Mapa da Ilha

**Arquivo:** `assets/img/map/mapa-ilha.png`
**Prompt:**
> Visão aérea de uma ilha tropical mágica, estilo cartoon colorido. A ilha tem 7 regiões claramente distintas e visíveis: (1) uma ponte de pedra antiga sobre um rio no sul; (2) uma floresta densa e mágica com árvores gigantes no sudoeste; (3) uma caverna com cristais brilhantes no oeste; (4) um jardim florido exuberante no nordeste; (5) uma montanha verde com pico nevado no norte; (6) uma praia de areia branca com conchas coloridas no leste; (7) um castelo mágico imponente no centro. Cada região conectada por caminhos de terra. Oceano azul ao redor. Estilo cartoon aventura infantil, colorido e alegre.

---

### 7.3 Backgrounds de Fase

**Arquivo:** `assets/img/backgrounds/bg-home.jpg`
**Prompt:**
> Tela inicial de jogo infantil: vista panorâmica de uma ilha tropical ao entardecer, pôr do sol laranja e dourado refletindo no mar azul, palmeiras na silhueta, nuvens suaves cor-de-rosa. Estilo cartoon aquarela infantil, cores vibrantes e aconchegantes. Horizontal, proporção 16:9.

**Arquivo:** `assets/img/backgrounds/bg-fase1-ponte.jpg`
**Prompt:**
> Background de jogo infantil: ponte de pedra antiga atravessando um rio de água cristalina, floresta verde ao redor, dia ensolarado, nuvens brancas fofas no céu azul. Perspectiva levemente isométrica. Estilo cartoon colorido infantil. Horizontal, proporção 16:9.

**Arquivo:** `assets/img/backgrounds/bg-fase2-floresta.jpg`
**Prompt:**
> Background de jogo infantil: floresta mágica encantada com árvores gigantes de troncos coloridos, cogumelos enormes, raios de luz dourada entre as folhas, flores mágicas. Tons de verde, amarelo e dourado. Estilo cartoon fantasia infantil. Horizontal, proporção 16:9.

**Arquivo:** `assets/img/backgrounds/bg-fase3-caverna.jpg`
**Prompt:**
> Background de jogo infantil: interior de caverna mágica iluminada por cristais roxos e azuis brilhantes, estalactites no teto, dois portais de luz (um azul, um roxo) ao fundo, chão de pedra polida. Estilo cartoon fantasia infantil. Horizontal, proporção 16:9.

**Arquivo:** `assets/img/backgrounds/bg-fase4-jardim.jpg`
**Prompt:**
> Background de jogo infantil: jardim florido exuberante com flores gigantes de todas as cores, borboletas coloridas voando, sol brilhante com raios dourados, grama verde intensa, céu azul com nuvens brancas. Estilo cartoon primavera infantil. Horizontal, proporção 16:9.

**Arquivo:** `assets/img/backgrounds/bg-fase5-montanha.jpg`
**Prompt:**
> Background de jogo infantil: trilha sinuosa subindo uma montanha verde, céu azul com nuvens fofas, pico levemente nevado ao fundo, bandeirinhas coloridas ao longo do caminho, passarinhos voando. Estilo cartoon aventura infantil. Horizontal, proporção 16:9.

**Arquivo:** `assets/img/backgrounds/bg-fase6-praia.jpg`
**Prompt:**
> Background de jogo infantil: praia tropical ensolarada, areia branca com conchas coloridas espalhadas, estrelas-do-mar, mar azul cristalino com ondas suaves, palmeiras, guarda-sóis coloridos. Estilo cartoon verão infantil. Horizontal, proporção 16:9.

**Arquivo:** `assets/img/backgrounds/bg-fase7-castelo.jpg`
**Prompt:**
> Background de jogo infantil: castelo mágico imponente no topo de colina verde, torres coloridas com bandeiras, portão principal aberto irradiando luz dourada, estrelas e faíscas mágicas ao redor. Estilo cartoon fantasia infantil. Horizontal, proporção 16:9.

---

### 7.4 Elementos de UI

**Arquivo:** `assets/img/ui/bau-fechado.png`
**Prompt:**
> Baú do tesouro fechado, estilo cartoon infantil. Madeira marrom escura com tiras e fechadura dourada brilhante. Levemente 3D isométrico. Fundo transparente.

**Arquivo:** `assets/img/ui/bau-aberto.png`
**Prompt:**
> Baú do tesouro aberto com tampa levantada, moedas douradas e faíscas saindo, luz dourada irradiando de dentro. Estilo cartoon infantil. Fundo transparente.

**Arquivo:** `assets/img/ui/coracao-cheio.png`
**Prompt:**
> Coração vermelho brilhante com pequenos reflexos brancos, estilo cartoon infantil. Simples e expressivo. Fundo transparente.

**Arquivo:** `assets/img/ui/coracao-vazio.png`
**Prompt:**
> Contorno de coração cinza claro/transparente, mesmo formato do coração cheio, estilo cartoon infantil. Indica vida perdida. Fundo transparente.

**Arquivo:** `assets/img/ui/estrela-cheia.png`
**Prompt:**
> Estrela dourada de 5 pontas, brilhante, com reflexo e brilhinhos ao redor, estilo cartoon infantil mágico. Fundo transparente.

**Arquivo:** `assets/img/ui/estrela-vazia.png`
**Prompt:**
> Contorno de estrela de 5 pontas, cinza claro, mesmo formato da estrela dourada. Indica estrela não conquistada. Fundo transparente.

**Arquivo:** `assets/img/ui/portal-concreto.png`
**Prompt:**
> Portal mágico azul/ciano, arco redondo com borda brilhante, interior com névoa azul, estilo cartoon fantasia infantil. Representa "mundo concreto/real". Fundo transparente.

**Arquivo:** `assets/img/ui/portal-abstrato.png`
**Prompt:**
> Portal mágico roxo/violeta, arco redondo com borda brilhante e estrelinhas, interior com névoa roxa e símbolos de sentimento (corações, notas musicais), estilo cartoon fantasia infantil. Representa "mundo abstrato/sentimentos". Fundo transparente.

---

### 7.5 Recompensas

**Arquivo:** `assets/img/rewards/papagaio-professor.png`
**Prompt:**
> Papagaio cartoon colorido (verde, vermelho e azul) usando óculos redondos dourados, expressão inteligente e sorridente, postura ereta como um professor. Fundo transparente.

**Arquivo:** `assets/img/rewards/macaco-palavras.png`
**Prompt:**
> Macaco cartoon marrom simpático, segurando um livro aberto com as duas mãos, expressão curiosa e animada, sorrindo. Estilo cartoon infantil colorido. Fundo transparente.

**Arquivo:** `assets/img/rewards/chapeu-explorador.png`
**Prompt:**
> Chapéu de explorador/aventureiro, aba larga, cor bege/marrom, com fita e medalha pequena na frente, brilho e sombra que dão volume. Estilo cartoon infantil. Fundo transparente.

**Arquivo:** `assets/img/rewards/bussola-magica.png`
**Prompt:**
> Bússola circular dourada ornamentada, ponteiro brilhando com luz azul mágica, detalhes de engrenagem e runas ao redor, estilo cartoon fantasia infantil. Fundo transparente.

**Arquivo:** `assets/img/rewards/estrela-dourada.png`
**Prompt:**
> Estrela dourada grande de 5 pontas com rosto sorridente e olhos expressivos, brilhos e faíscas ao redor, estilo cartoon mágico infantil. Fundo transparente.

**Arquivo:** `assets/img/rewards/medalha.png`
**Prompt:**
> Medalha redonda dourada pendurada em fita azul e verde, com gravura de livro aberto no centro, brilhante, estilo cartoon infantil. Fundo transparente.

---

## 8. Ordem de Implementação Recomendada

```
Sprint 1 → Sprint 2 → Sprint 3 → Sprint 4 → Sprint 5 → Sprint 6
(infra)   (dados)    (telas)    (jogo)    (UI/UX)   (testes+polish)
```

Paralelamente ao desenvolvimento:
- Gerar imagens ao final da Sprint 1 (saber o visual antes de implementar telas)
- Gravar/obter áudios ao final da Sprint 4

---

## 9. Métricas de Qualidade

| Métrica | Meta |
|---------|------|
| Cobertura de testes unitários | ≥ 80% dos módulos `core/` e `engine/` |
| Questões no banco | ≥ 70 (10 por fase) |
| Tipos de mecânica | 5 (todos implementados) |
| Tempo de carregamento | < 2s em conexão local |
| Compatibilidade | Chrome 100+, Firefox 100+, Safari 15+ |
| Funciona sem internet | Sim (apenas arquivos locais) |
| Funciona sem áudio | Sim (áudio é opcional) |

---

## 10. Riscos e Mitigações

| Risco | Mitigação |
|-------|-----------|
| Drag and drop em tablet com touch | Implementar eventos `touchstart/touchmove/touchend` além dos mouse events |
| LocalStorage cheio | Comprimir dados salvos; alertar usuário |
| Performance de animações CSS | Usar `transform` e `opacity` (GPU-accelerated), evitar `width`/`height` |
| Questões insuficientes no Castelo da Revisão | AdaptiveEngine usa questões de todas as fases, garantindo variedade |
| Módulos ES não suportados em file:// no Chrome | Documentar uso via servidor local simples (`python -m http.server`) |
