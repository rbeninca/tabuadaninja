import Router from '../core/Router.js'
import GameState from '../core/GameState.js'
import ProgressionEngine from '../engine/ProgressionEngine.js'
import AdaptiveEngine from '../engine/AdaptiveEngine.js'
import ComponentFactory from '../ui/ComponentFactory.js'
import { getRewardByLevelId } from '../data/rewards.js'

function render() {
  const el = document.getElementById('progress-content')
  const levelStatuses = ProgressionEngine.getAllLevelStatuses()
  const errors = GameState.get('errors')
  const rewards = GameState.get('rewards')
  const topErrors = AdaptiveEngine.getTopErrorCategories(errors)

  const categoryLabels = {
    substantivo_proprio: 'Substantivo Próprio',
    substantivo_comum: 'Substantivo Comum',
    substantivo_proprio_comum: 'Próprio e Comum',
    substantivo_coletivo: 'Substantivo Coletivo',
    substantivo_concreto: 'Substantivo Concreto',
    substantivo_abstrato: 'Substantivo Abstrato',
    substantivo_concreto_abstrato: 'Concreto e Abstrato',
    adjetivo: 'Adjetivo',
    verbo: 'Verbo',
    ortografia_c_s_cedilha: 'C, S e Ç'
  }

  el.innerHTML = `
    <div style="background:rgba(255,255,255,0.95);border-radius:32px;padding:24px;max-width:600px;width:100%;box-shadow:0 8px 24px rgba(0,0,0,0.25);">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;">
        <h2 style="font-size:1.5rem;font-weight:900;">📊 Meu Progresso</h2>
        <button class="btn btn-neutral btn-sm" id="btn-back">⬅️ Voltar</button>
      </div>

      <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;color:#555;">🗺️ Fases</h3>
      <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:24px;">
        ${levelStatuses.map(l => `
          <div style="display:flex;align-items:center;justify-content:space-between;background:#F5F5F5;border-radius:12px;padding:10px 16px;">
            <span style="font-size:1.25rem;">${l.icon}</span>
            <span style="flex:1;margin:0 12px;font-weight:700;font-size:0.875rem;">${l.title}</span>
            <div style="display:flex;align-items:center;gap:8px;">
              ${ComponentFactory.stars(l.stars)}
              <span style="font-size:0.75rem;padding:2px 8px;border-radius:99px;font-weight:700;background:${l.status === 'completed' ? '#C8E6C9' : l.status === 'available' ? '#FFF3E0' : '#ECEFF1'};color:${l.status === 'completed' ? '#1B5E20' : l.status === 'available' ? '#E65100' : '#607D8B'};">
                ${{ completed: '✅', available: '▶️', locked: '🔒' }[l.status]}
              </span>
            </div>
          </div>
        `).join('')}
      </div>

      ${topErrors.length > 0 ? `
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;color:#555;">⚠️ Precisa praticar mais</h3>
        <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:24px;">
          ${topErrors.map(e => `
            <div style="display:flex;align-items:center;justify-content:space-between;background:#FFF8E1;border-radius:12px;padding:10px 16px;border-left:4px solid #FF8C00;">
              <span style="font-weight:700;font-size:0.875rem;">${categoryLabels[e.category] || e.category}</span>
              <span style="background:#FF8C00;color:white;border-radius:99px;padding:2px 10px;font-size:0.75rem;font-weight:700;">${e.count} erro${e.count > 1 ? 's' : ''}</span>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${rewards.length > 0 ? `
        <h3 style="font-size:1rem;font-weight:700;margin-bottom:12px;color:#555;">🎁 Recompensas</h3>
        <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:24px;">
          ${levelStatuses.filter(l => l.status === 'completed').map(l => {
            const r = getRewardByLevelId(l.id)
            if (!r || !rewards.includes(r.name)) return ''
            return `
              <div style="display:flex;flex-direction:column;align-items:center;gap:4px;background:#FFF8E1;border-radius:12px;padding:12px;border:2px solid #FFD700;width:90px;">
                <img src="${r.img}" alt="${r.name}" style="width:48px;height:48px;object-fit:contain;" onerror="this.textContent='🎁';this.style.fontSize='2rem'">
                <span style="font-size:0.625rem;font-weight:700;text-align:center;color:#2C3E50;">${r.name}</span>
              </div>
            `
          }).join('')}
        </div>
      ` : ''}

      <button class="btn btn-primary" id="btn-map" style="width:100%;">🗺️ Ir para o Mapa</button>
    </div>
  `

  document.getElementById('btn-back')?.addEventListener('click', () => Router.navigate('home'))
  document.getElementById('btn-map')?.addEventListener('click', () => Router.navigate('map'))
}

export default { render }
