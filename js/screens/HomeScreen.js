import Router from '../core/Router.js'
import Storage from '../storage/Storage.js'
import GameState from '../core/GameState.js'
import ProgressionEngine from '../engine/ProgressionEngine.js'
import SpeechCtrl from '../ui/SpeechCtrl.js'

function saveVoicePreference(voiceGender) {
  GameState.set({ voiceGender })
  ProgressionEngine.persistProgress()
}

function speakPreview(voiceGender) {
  if (!SpeechCtrl.isSupported()) {
    alert('Seu navegador não suporta leitura de voz. Use Chrome atualizado para testar.')
    return
  }

  SpeechCtrl.speak('Olá! Vamos explorar a Ilha Mágica das Palavras.', { voiceGender })
}

function render() {
  const hasSave = Storage.exists()
  const voiceGender = GameState.get('voiceGender') || 'feminina'
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
      <div style="width:100%;background:#fff6dd;border:2px solid #f0d08a;border-radius:12px;padding:12px;">
        <div style="font-weight:800;font-size:0.9rem;color:#7a5b1b;margin-bottom:8px;">🔊 Configuração de Voz</div>
        <label for="voice-gender" style="display:block;font-size:0.8rem;color:#6d6d6d;margin-bottom:6px;">Escolha a voz da leitura:</label>
        <select id="voice-gender" class="btn btn-neutral btn-sm" style="width:100%;background:#fff;">
          <option value="feminina" ${voiceGender === 'feminina' ? 'selected' : ''}>Feminina</option>
          <option value="masculina" ${voiceGender === 'masculina' ? 'selected' : ''}>Masculina</option>
        </select>
        <button class="btn btn-secondary btn-sm" id="btn-test-voice" style="margin-top:8px;width:100%;">
          🔈 Testar Voz
        </button>
      </div>

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

  document.getElementById('voice-gender')?.addEventListener('change', (e) => {
    const selected = e.target.value === 'masculina' ? 'masculina' : 'feminina'
    saveVoicePreference(selected)
  })

  document.getElementById('btn-test-voice')?.addEventListener('click', () => {
    const selected = document.getElementById('voice-gender')?.value === 'masculina' ? 'masculina' : 'feminina'
    saveVoicePreference(selected)
    speakPreview(selected)
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
