# Especificacao do Jogo Educativo de Portugues (4a serie)

## 1. Visao Geral

### Nome provisório
**Ilha das Palavras: Missao da Quarta Serie**

### Objetivo
Criar um jogo educativo em navegador (HTML + JavaScript) para revisar:
- Substantivo proprio
- Substantivo comum
- Substantivo coletivo
- Substantivo concreto
- Substantivo abstrato
- Adjetivo
- Verbo
- Identificar palavras com c , s, ç 
-

O jogo deve ser divertido para uma crianca de 9 anos, incorporando elementos que ela gosta:
- Desafios com logica parecida com matematica (Contas + - multiplicacao, divisao simples e tabuada, mas agora forandoem de portugues)
- Quebra-cabecas visuais, que exija ação ativa além de apenas escolher resposta (ex.: arrastar palavra para categoria).
- Sistema de pontos, estrelas e recompensas para motivar progresso.


### Plataforma
- Execucao local no navegador desktop/tablet
- Sem necessidade de servidor
- Armazenamento local em banco no navegador

---

## 2. Objetivos Pedagogicos

1. Identificar corretamente classes gramaticais em frases curtas.
2. Diferenciar substantivo simples e composto.
3. Reconhecer adjetivos e verbos em contexto.
4. Forçar ação prática ativa de racionio, não apenas leitura passiva.
4. Fixar conteudo por repeticao inteligente (mais questoes onde houver erro).




Especificação do Jogo Educativo
A Ilha Mágica das Palavras
1. Objetivo geral

Desenvolver um jogo educativo infantil em navegador, usando HTML, CSS e JavaScript puro, para uma criança de aproximadamente 9 anos, estudante da 4ª série / 4º ano, revisar conteúdos de Língua Portuguesa de forma lúdica, visual, interativa e progressiva.

O jogo deve funcionar localmente, sem servidor, podendo ser aberto diretamente pelo navegador.

2. Nome do jogo
A Ilha Mágica das Palavras
Ideia narrativa

A criança é uma exploradora que chega a uma ilha mágica onde as palavras perderam seus lugares. Para restaurar a ilha, ela precisa resolver desafios de português.

Cada região da ilha representa um conteúdo:

Região	Conteúdo
Ponte dos Nomes	Substantivo comum e próprio
Floresta dos Coletivos	Substantivo coletivo
Caverna das Ideias	Substantivo concreto e abstrato
Jardim das Qualidades	Adjetivo
Montanha das Ações	Verbo
Praia do C, S e Ç	Ortografia com c, s e ç
Castelo da Revisão	Mistura de todos os conteúdos
3. Público-alvo

Crianças de 9 anos, com interface colorida, personagens amigáveis, frases curtas, feedback imediato e desafios que exijam interação ativa.

O jogo não deve parecer uma prova. Deve parecer uma aventura com fases, recompensas, estrelas, animações e pequenos quebra-cabeças.

4. Tecnologias obrigatórias

O jogo deve ser desenvolvido com:

HTML5
CSS3
JavaScript puro
LocalStorage ou IndexedDB

Não usar servidor.

Não depender de bibliotecas externas obrigatórias.

Pode usar emojis, SVG simples ou desenhos em CSS para criar uma estética infantil.

5. Estrutura sugerida de arquivos
ilha-das-palavras/
│
├── index.html
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   ├── gameState.js
│   ├── levels.js
│   ├── questions.js
│   ├── storage.js
│   ├── dragDrop.js
│   ├── feedback.js
│   └── adaptiveEngine.js
│
└── assets/
    ├── img/
    ├── audio/
    └── icons/

Caso a IA vá gerar tudo em um único arquivo, ela pode criar inicialmente:

index.html

contendo HTML, CSS e JavaScript juntos.

Depois o código pode ser separado.

6. Telas principais
6.1 Tela inicial

Deve conter:

Nome do jogo
Personagem ou mascote
Botão “Começar aventura”
Botão “Continuar”
Botão “Ver progresso”
Botão “Apagar progresso”

Exemplo visual:

A Ilha Mágica das Palavras

[ personagem animado ]

[ Começar aventura ]
[ Continuar ]
[ Ver progresso ]
6.2 Tela do mapa

A tela do mapa mostra as regiões da ilha.

Cada fase aparece como uma área desbloqueável:

1. Ponte dos Nomes
2. Floresta dos Coletivos
3. Caverna das Ideias
4. Jardim das Qualidades
5. Montanha das Ações
6. Praia do C, S e Ç
7. Castelo da Revisão

Cada região deve exibir:

Nome
Ícone
Estrelas conquistadas
Status: bloqueada, disponível ou concluída

Exemplo:

🌉 Ponte dos Nomes       ★★★
🌳 Floresta dos Coletivos ★★☆
🕳️ Caverna das Ideias    🔒
6.3 Tela de fase

Cada fase deve apresentar:

Nome da fase
Pequena explicação infantil
Desafio interativo
Pontuação atual
Número de vidas ou tentativas
Barra de progresso
Botão de voltar ao mapa
6.4 Tela de resultado

Ao final da fase, exibir:

Pontuação
Estrelas recebidas
Quantidade de acertos
Quantidade de erros
Conteúdos que precisam de revisão
Recompensa desbloqueada

Exemplo:

Muito bem!

Você completou a Ponte dos Nomes.

Acertos: 8 de 10
Estrelas: ★★☆
Recompensa: Chapéu de Explorador
7. Mecânicas principais
7.1 Arrastar e soltar palavras

A mecânica principal será drag and drop.

A criança deve arrastar palavras para categorias corretas.

Exemplo:

Palavras:
Ana, cachorro, alegria, cardume, bonito, correu

Categorias:
Substantivo próprio
Substantivo comum
Substantivo abstrato
Substantivo coletivo
Adjetivo
Verbo

Resultado esperado:

Ana → Substantivo próprio
cachorro → Substantivo comum
alegria → Substantivo abstrato
cardume → Substantivo coletivo
bonito → Adjetivo
correu → Verbo
7.2 Completar palavras

Usado na fase do c, s e ç.

A criança deve arrastar a letra correta para completar a palavra.

Exemplo:

cora__ão

Opções:
c
s
ç

Resposta:

coração
7.3 Montar frases

A criança recebe palavras embaralhadas e deve montar uma frase correta.

Exemplo:

Palavras:
menina / A / bonita / correu

Resposta:
A menina bonita correu.

Depois o jogo pergunta:

Qual é o verbo?
Qual é o adjetivo?
Qual é o substantivo?
7.4 Máquina das palavras

A criança resolve desafios parecidos com lógica matemática.

Exemplo:

SUBSTANTIVO + ADJETIVO = EXPRESSÃO CORRETA

Opções:

gato + preto
gato + correr
gato + cardume
gato + felicidade

Resposta correta:

gato preto

Outro exemplo:

COLETIVO DE + PEIXES = ?

Resposta:

cardume
8. Sistema de pontuação

Cada fase deve ter 10 desafios.

Pontuação sugerida:

Acerto de primeira: +100 pontos
Acerto após dica: +50 pontos
Erro: 0 pontos
Combo de 3 acertos: +50 pontos extras
Combo de 5 acertos: +100 pontos extras

Estrelas:

9 ou 10 acertos: 3 estrelas
7 ou 8 acertos: 2 estrelas
5 ou 6 acertos: 1 estrela
Menos de 5 acertos: nenhuma estrela, mas pode tentar novamente
9. Sistema de vidas

Cada fase pode ter 3 corações.

❤️ ❤️ ❤️

Ao errar:

O jogo não deve punir de forma agressiva.
Deve mostrar uma dica.
Pode perder um coração.
A palavra volta para a posição inicial.

Exemplo de feedback:

Quase! Pense assim:
"Brasil" é o nome de um lugar específico.
Por isso é substantivo próprio.
10. Sistema de recompensas

A criança ganha recompensas para manter a motivação.

Tipos de recompensas:

Figurinhas
Roupas para o personagem
Animais ajudantes
Partes da ilha restauradas
Medalhas
Baús surpresa

Exemplos:

Papagaio Professor
Macaco das Palavras
Chapéu de Explorador
Bússola Mágica
Estrela Dourada

As recompensas devem ser salvas no navegador.

11. Repetição inteligente

O jogo deve registrar os erros por categoria.

Categorias:

substantivo_proprio
substantivo_comum
substantivo_coletivo
substantivo_concreto
substantivo_abstrato
adjetivo
verbo
ortografia_c_s_cedilha

Exemplo de dados salvos:

{
  pontos: 1350,
  estrelas: {
    fase1: 3,
    fase2: 2,
    fase3: 1
  },
  erros: {
    substantivo_coletivo: 5,
    verbo: 2,
    ortografia_c_s_cedilha: 7
  },
  recompensas: [
    "Papagaio Professor",
    "Chapéu de Explorador"
  ]
}

O motor adaptativo deve funcionar assim:

Se a criança errou muito uma categoria, essa categoria aparece mais nas revisões.
A fase final mistura conteúdos, mas prioriza os conteúdos com mais erros.
O jogo deve evitar repetir sempre exatamente as mesmas perguntas em sequência.
12. Conteúdos pedagógicos
12.1 Substantivo próprio

Explicação infantil:

Substantivo próprio é o nome específico de uma pessoa, lugar, animal ou coisa.
Geralmente começa com letra maiúscula.

Exemplos:

Ana
Brasil
Pedro
Florianópolis
Rex
Mariana
12.2 Substantivo comum

Explicação infantil:

Substantivo comum é o nome geral das coisas, pessoas, animais ou lugares.

Exemplos:

menina
cidade
cachorro
escola
livro
professor
12.3 Substantivo coletivo

Explicação infantil:

Substantivo coletivo é uma palavra que indica um grupo de seres ou objetos.

Exemplos:

cardume → grupo de peixes
alcateia → grupo de lobos
enxame → grupo de abelhas
turma → grupo de alunos
frota → grupo de veículos
biblioteca → conjunto de livros
12.4 Substantivo concreto

Explicação infantil:

Substantivo concreto é o nome de algo que existe de forma independente, real ou imaginária.

Exemplos:

mesa
cachorro
fada
dragão
pedra
boneca
12.5 Substantivo abstrato

Explicação infantil:

Substantivo abstrato é o nome de sentimentos, ideias, qualidades ou ações.

Exemplos:

amor
alegria
medo
tristeza
saudade
coragem
beleza
12.6 Adjetivo

Explicação infantil:

Adjetivo é a palavra que mostra uma qualidade ou característica.

Exemplos:

bonito
pequeno
grande
feliz
rápido
colorido
inteligente

Frase:

O cachorro pequeno latiu.

Adjetivo:

pequeno
12.7 Verbo

Explicação infantil:

Verbo é a palavra que indica ação, estado ou acontecimento.

Exemplos:

correr
pular
brincar
estudar
dormir
cantar
comer

Frase:

A menina correu no parque.

Verbo:

correu
12.8 Ortografia com c, s e ç

Exemplos:

coração
maçã
açúcar
doce
cidade
passarinho
sapo
sorvete
cinto
cinema

Atividades:

cora__ão
ma__ã
a__úcar
do__e
pa__arinho
13. Fases detalhadas
Fase 1 — Ponte dos Nomes

Conteúdo:

Substantivo próprio e substantivo comum

Mecânica:

A criança arrasta palavras para dois baús:

Baú dos nomes próprios
Baú dos nomes comuns

Exemplo:

Ana → próprio
cidade → comum
Brasil → próprio
escola → comum
Pedro → próprio
livro → comum

Ao acertar, uma parte da ponte aparece.

Ao completar 10 desafios, a ponte fica pronta.

Fase 2 — Floresta dos Coletivos

Conteúdo:

Substantivo coletivo

Mecânica:

A criança liga o coletivo ao grupo correto.

Exemplo:

cardume → peixes
alcateia → lobos
enxame → abelhas
turma → alunos
frota → veículos

A cada acerto, uma árvore da floresta floresce.

Fase 3 — Caverna das Ideias

Conteúdo:

Substantivo concreto e abstrato

Mecânica:

A criança arrasta palavras para dois portais:

Portal do que posso imaginar como coisa
Portal dos sentimentos e ideias

Exemplo:

mesa → concreto
amor → abstrato
dragão → concreto
medo → abstrato
boneca → concreto
alegria → abstrato
Fase 4 — Jardim das Qualidades

Conteúdo:

Adjetivos

Mecânica:

Aparece uma frase. A criança deve tocar ou arrastar o adjetivo.

Exemplo:

O gato preto dormiu.

Resposta:

preto

Outras frases:

A menina inteligente estudou.
O sorvete gelado caiu.
O cachorro pequeno correu.
A flor amarela nasceu.

A cada acerto, nasce uma flor no jardim.

Fase 5 — Montanha das Ações

Conteúdo:

Verbos

Mecânica:

Aparece uma frase. A criança deve identificar o verbo.

Exemplo:

Pedro pulou o muro.

Resposta:

pulou

Outras frases:

Maria cantou uma música.
O pássaro voou alto.
Nós estudamos português.
O bebê dormiu cedo.

A cada acerto, o personagem sobe a montanha.

Fase 6 — Praia do C, S e Ç

Conteúdo:

Ortografia com c, s e ç

Mecânica:

A criança arrasta conchas com letras para completar palavras.

Exemplo:

cora__ão → coração
ma__ã → maçã
do__e → doce
pa__arinho → passarinho
a__úcar → açúcar

A cada acerto, uma estrela-do-mar aparece na praia.

Fase 7 — Castelo da Revisão

Conteúdo:

Todos os conteúdos misturados

Mecânica:

Desafios variados:

Arrastar palavras para categorias
Completar palavras
Identificar verbo em frase
Identificar adjetivo em frase
Ligar coletivo ao grupo
Separar concreto e abstrato

Essa fase deve usar repetição inteligente, dando prioridade às categorias em que a criança mais errou.

14. Banco de questões inicial

A IA deve criar um banco de questões em JavaScript.

Exemplo:

const questions = [
  {
    id: 1,
    type: "drag-category",
    category: "substantivo_proprio_comum",
    instruction: "Arraste cada palavra para o baú correto.",
    items: [
      { text: "Ana", answer: "proprio" },
      { text: "cidade", answer: "comum" },
      { text: "Brasil", answer: "proprio" },
      { text: "cachorro", answer: "comum" }
    ],
    targets: [
      { id: "proprio", label: "Substantivo próprio" },
      { id: "comum", label: "Substantivo comum" }
    ]
  },
  {
    id: 2,
    type: "complete-word",
    category: "ortografia_c_s_cedilha",
    instruction: "Complete a palavra com c, s ou ç.",
    wordTemplate: "cora__ão",
    correct: "ç",
    options: ["c", "s", "ç"],
    finalWord: "coração"
  },
  {
    id: 3,
    type: "select-word",
    category: "verbo",
    instruction: "Toque no verbo da frase.",
    sentence: "A menina correu no parque.",
    words: ["A", "menina", "correu", "no", "parque"],
    correct: "correu"
  }
];
15. Tipos de questão

A IA deve implementar pelo menos estes tipos:

drag-category
complete-word
select-word
match-pairs
build-sentence
mixed-review
15.1 drag-category

Usado para classificar palavras.

Exemplo:

Arrastar "alegria" para "substantivo abstrato".
15.2 complete-word

Usado para ortografia.

Exemplo:

ma__ã → maçã
15.3 select-word

Usado para identificar verbo ou adjetivo em frase.

Exemplo:

O cachorro pequeno latiu.

Resposta:

pequeno
15.4 match-pairs

Usado para coletivos.

Exemplo:

cardume → peixes
15.5 build-sentence

Usado para montar frases.

Exemplo:

A / menina / bonita / correu

Resposta:

A menina bonita correu.
16. Feedback pedagógico

O jogo deve sempre explicar o erro de forma simples.

Exemplo para substantivo próprio:

Ops! "Brasil" é o nome de um país específico.
Por isso é substantivo próprio.

Exemplo para verbo:

Quase! Verbo é uma ação.
Na frase, quem mostra a ação é "correu".

Exemplo para adjetivo:

Boa tentativa! Adjetivo mostra uma característica.
Em "gato preto", a palavra "preto" diz como é o gato.
17. Regras de progressão
Fase 1 começa liberada.
Fase 2 libera quando a criança conclui a fase 1.
Fase 3 libera quando conclui a fase 2.
E assim por diante.

Mesmo com poucos acertos, a criança pode continuar, mas o jogo deve sugerir revisar.

Exemplo:

Você completou a fase!
Mas podemos tentar de novo para ganhar mais estrelas.
18. Salvamento local

Usar localStorage.

Chave sugerida:

ilhaDasPalavrasSave

Estrutura:

const saveData = {
  currentLevel: 1,
  totalPoints: 0,
  stars: {},
  errors: {},
  rewards: [],
  completedLevels: []
};

Funções necessárias:

saveGame()
loadGame()
resetGame()
registerCorrectAnswer()
registerWrongAnswer()
unlockReward()
19. Interface visual

Estilo desejado:

Colorido
Infantil
Com botões grandes
Fonte arredondada
Animações suaves
Personagem mascote
Elementos de ilha, mapa, baús, estrelas, ponte e castelo

Cores sugeridas:

Azul claro
Verde
Amarelo
Laranja
Roxo suave
Branco

Botões grandes, adequados para tablet.

20. Animações desejadas

Implementar animações simples com CSS:

Palavra correta pula levemente
Palavra errada treme
Estrela aparece girando
Baú abre ao completar fase
Ponte aparece aos poucos
Personagem comemora

Exemplo de classes CSS:

.correct {
  animation: bounce 0.4s;
}

.wrong {
  animation: shake 0.4s;
}
21. Áudio

Opcional, mas desejável:

Som de acerto
Som de erro leve
Som de estrela
Som de recompensa
Música de fundo opcional com botão ligar/desligar

O jogo deve funcionar mesmo sem arquivos de áudio.

22. Acessibilidade

O jogo deve ter:

Botões grandes
Textos curtos
Bom contraste
Feedback visual e textual
Possibilidade de jogar sem áudio
Fonte legível
23. Critérios de aceite

A IA deve entregar um jogo que:

Rode no navegador localmente.
Tenha tela inicial.
Tenha mapa de fases.
Tenha pelo menos 7 fases.
Tenha pelo menos 10 desafios por fase.
Use drag and drop em algumas fases.
Use seleção de palavras em frases.
Use completar palavras com c, s e ç.
Tenha pontuação.
Tenha estrelas.
Salve progresso no navegador.
Registre erros por categoria.
Use os erros para reforçar conteúdos na revisão.
Tenha visual infantil e animado.
Mostre explicações simples após erros.
24. Prompt pronto para passar para uma IA programadora
Desenvolva um jogo educativo infantil chamado "A Ilha Mágica das Palavras", usando HTML5, CSS3 e JavaScript puro.

O jogo deve rodar localmente no navegador, sem servidor e sem dependências obrigatórias externas.

O público-alvo é uma criança de aproximadamente 9 anos, estudante da 4ª série / 4º ano. O jogo deve ensinar e revisar conteúdos de Língua Portuguesa de forma lúdica, visual, colorida e interativa.

Conteúdos obrigatórios:
- Substantivo próprio
- Substantivo comum
- Substantivo coletivo
- Substantivo concreto
- Substantivo abstrato
- Adjetivo
- Verbo
- Ortografia com c, s e ç

O jogo deve ter uma narrativa de aventura em uma ilha mágica. A criança é uma exploradora que precisa restaurar regiões da ilha resolvendo desafios de português.

Crie as seguintes telas:
1. Tela inicial
2. Tela de mapa da ilha
3. Tela de fase
4. Tela de resultado
5. Tela de progresso

Crie as seguintes fases:
1. Ponte dos Nomes — substantivo próprio e comum
2. Floresta dos Coletivos — substantivo coletivo
3. Caverna das Ideias — substantivo concreto e abstrato
4. Jardim das Qualidades — adjetivos
5. Montanha das Ações — verbos
6. Praia do C, S e Ç — ortografia
7. Castelo da Revisão — todos os conteúdos misturados

Cada fase deve ter pelo menos 10 desafios.

Implemente os seguintes tipos de atividade:
- Arrastar palavras para categorias
- Completar palavras com c, s ou ç
- Selecionar verbo em uma frase
- Selecionar adjetivo em uma frase
- Ligar coletivos aos grupos correspondentes
- Montar frases simples com palavras embaralhadas

O jogo deve ter:
- Sistema de pontos
- Sistema de estrelas
- Sistema de recompensas
- Feedback imediato
- Dicas após erro
- Animações simples
- Salvamento no localStorage
- Registro de erros por categoria
- Revisão inteligente que mostre mais questões das categorias em que a criança errou mais

Use visual infantil, colorido, com botões grandes, personagens amigáveis, emojis ou ilustrações simples em CSS/SVG.

O código deve ser bem organizado, comentado e fácil de modificar.

Pode entregar inicialmente tudo em um único arquivo index.html, contendo HTML, CSS e JavaScript, mas organize internamente o código em seções.

Inclua um banco de questões inicial em JavaScript com pelo menos 70 questões, sendo 10 por fase.

Implemente localStorage usando a chave "ilhaDasPalavrasSave".

Ao final, o jogo deve permitir apagar o progresso e começar novamente.
25. Versão mais técnica para desenvolvimento
Implemente uma arquitetura simples baseada em estado.

Estados principais:
- home
- map
- level
- result
- progress

Objeto principal:
GameState {
  currentScreen,
  currentLevel,
  currentQuestionIndex,
  score,
  lives,
  combo,
  stars,
  errors,
  rewards,
  completedLevels
}

Funções principais:
initGame()
renderHome()
renderMap()
renderLevel(levelId)
renderQuestion(question)
checkAnswer(answer)
handleCorrectAnswer()
handleWrongAnswer()
finishLevel()
calculateStars()
saveGame()
loadGame()
resetGame()
getAdaptiveQuestions()
renderProgress()

Tipos de questão:
drag-category
complete-word
select-word
match-pairs
build-sentence

Cada questão deve ter:
id
type
category
instruction
data
correctAnswer
explanation

O jogo deve salvar automaticamente após cada resposta.
26. Exemplo de fase em formato de dados
const levels = [
  {
    id: 1,
    title: "Ponte dos Nomes",
    icon: "🌉",
    description: "Ajude a construir a ponte separando nomes próprios e comuns.",
    unlocksAfter: null,
    categories: ["substantivo_proprio", "substantivo_comum"],
    reward: "Chapéu de Explorador"
  },
  {
    id: 2,
    title: "Floresta dos Coletivos",
    icon: "🌳",
    description: "Ligue cada coletivo ao grupo correto.",
    unlocksAfter: 1,
    categories: ["substantivo_coletivo"],
    reward: "Papagaio Professor"
  }
];
27. Exemplo de questão
{
  id: "q001",
  levelId: 1,
  type: "drag-category",
  category: "substantivo_proprio_comum",
  instruction: "Arraste cada palavra para o baú correto.",
  items: [
    { text: "Ana", answer: "proprio" },
    { text: "escola", answer: "comum" },
    { text: "Brasil", answer: "proprio" },
    { text: "cachorro", answer: "comum" }
  ],
  targets: [
    { id: "proprio", label: "Substantivo próprio" },
    { id: "comum", label: "Substantivo comum" }
  ],
  explanation: "Substantivo próprio é o nome específico. Substantivo comum é o nome geral."
}
28. Resultado esperado

Ao final do desenvolvimento, o jogo deve parecer uma pequena aventura infantil, não uma lista de perguntas.

A criança deve sentir que está:

explorando uma ilha,
abrindo caminhos,
ganhando estrelas,
desbloqueando recompensas,
e aprendendo português brincando.