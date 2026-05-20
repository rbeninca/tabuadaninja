import Router from '../core/Router.js'
import Storage from '../storage/Storage.js'
import GameState from '../core/GameState.js'

function render() {
  const hasSave = Storage.exists()
  const el = document.getElementById('home-content')

  el.innerHTML = `
    <div class="game-title">🏝️ A Ilha Mágica<br>das Palavras</div>

    <div style="position:relative;width:200px;height:200px;margin:0 auto;">
      <img src="imgens/mascote/mascote-normal.png"
           alt="Mascote"
           class="mascote-idle"
           style="width:200px;height:200px;object-fit:contain;"
           onerror="this.style.display='none';document.getElementById('mascote-emoji').style.display='block'">
      <div id="mascote-emoji" style="display:none;font-size:8rem;text-align:center;line-height:200px;">🧭</div>
    </div>

    <div style="display:flex;flex-direction:column;gap:16px;width:100%;max-width:320px;align-items:center;">
      <button class="btn btn-primary btn-lg" id="btn-start">
        🗺️ Começar Aventura
      </button>

      ${hasSave ? `
        <button class="btn btn-secondary" id="btn-continue">
          ▶️ Continuar
        </button>
      ` : ''}

      <button class="btn btn-accent" id="btn-progress">
        📊 Ver Progresso
      </button>

      ${hasSave ? `
        <button class="btn btn-neutral btn-sm" id="btn-reset">
          🗑️ Apagar Progresso
        </button>
      ` : ''}
    </div>
  `

  document.getElementById('btn-start')?.addEventListener('click', () => {
    if (hasSave) {
      const ok = confirm('Isso vai apagar seu progresso. Tem certeza?')
      if (!ok) return
      Storage.reset()
      GameState.reset()
    }
    Router.navigate('map')
  })

  document.getElementById('btn-continue')?.addEventListener('click', () => {
    Router.navigate('map')
  })

  document.getElementById('btn-progress')?.addEventListener('click', () => {
    Router.navigate('progress')
  })

  document.getElementById('btn-reset')?.addEventListener('click', () => {
    const ok = confirm('Apagar todo o progresso? Esta ação não pode ser desfeita.')
    if (!ok) return
    Storage.reset()
    GameState.reset()
    Router.navigate('home')
  })
}

export default { render }
