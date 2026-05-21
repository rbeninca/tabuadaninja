# Tabuada Ninja

Jogo educativo de matematica focado em treino de tabuada com visual divertido, ranking e modo de jogo rapido.

## Publico-alvo

Este jogo foi feito para criancas e adolescentes, com foco em:
- praticar multiplicacao de forma ludica
- desenvolver raciocinio rapido
- incentivar progresso com pontuacao e ranking

## Link de acesso

### Acesso local (desenvolvimento)
- Inicie com Five Server no VS Code
- Acesse: http://127.0.0.1:5500/

### Acesso web (producao)
- Se voce publicar o jogo (GitHub Pages, Vercel, Netlify etc.), coloque aqui:
- Link oficial: [adicione aqui](#)

## Como jogar

1. Abra o jogo e clique em **Novo Jogo**.
2. Escolha o nome do aluno e ajuste as configuracoes (vidas, velocidade, modo e tabuadas).
3. Clique em **Comecar**.
4. Corte a fruta com a resposta correta da tabuada para ganhar pontos.
5. Evite cortar respostas erradas para nao perder vidas.
6. Use o botao de desaceleracao (ou espaco no teclado) para facilitar, lembrando que pode reduzir a pontuacao da questao.
7. Ao fim da partida, salve o resultado para entrar no ranking.

## Recursos principais

- Fundo animado com simbolos matematicos
- Ranking geral e por turma (`?turma=nome-da-turma`)
- Modo instalavel como PWA
- Login opcional com Google (Firebase Auth)
- Foto de perfil para usuarios logados no HUD e no ranking
- Jogo aberto para todos, inclusive sem login

## Parametros de URL

- `?turma=nome` -> separa ranking por turma
- `?animacao=1` -> ativa a animacao alternativa de fundo

## Controles

- Mouse/toque: corta as frutas
- Teclado: `Espaco` ativa desaceleracao
- Teclado: `P` pausa/continua o jogo

## Tecnologias

- HTML, CSS, JavaScript
- Service Worker (PWA)
- Firebase Auth (login opcional)
- Cloudflare Worker para API/ranking

## Seguranca e configuracao

- As chaves publicas do app web ficam em `firebase-config.js`.
- Isso e esperado no Firebase Web; o controle real vem de regras e validacoes no backend.

## Creditos

Imagem de creditos em `creditos/foto.png`.
