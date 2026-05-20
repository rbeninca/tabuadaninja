import Router from '../core/Router.js'
import ProgressionEngine from '../engine/ProgressionEngine.js'
import ComponentFactory from '../ui/ComponentFactory.js'

function render() {
  const el = document.getElementById('map-content')
  const levelStatuses = ProgressionEngine.getAllLevelStatuses()

  el.innerHTML = `
    <div style="background:rgba(255,255,255,0.9);border-radius:24px;padding:16px;width:100%;max-width:700px;max-height:85vh;overflow-y:auto;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
        <h2 style="font-size:1.5rem;font-weight:900;color:#2C3E50;">🗺️ Mapa da Ilha</h2>
        <button class="btn btn-neutral btn-sm" id="btn-back-home">🏠 Início</button>
      </div>

      <div class="map-grid">
        ${levelStatuses.map(level => renderLevelCard(level)).join('')}
      </div>
    </div>
  `

  document.getElementById('btn-back-home')?.addEventListener('click', () => {
    Router.navigate('home')
  })

  levelStatuses.forEach(level => {
    if (level.status === 'locked') return
    document.getElementById(`card-level-${level.id}`)?.addEventListener('click', () => {
      Router.navigate('level', { levelId: level.id })
    })
  })
}

function renderLevelCard(level) {
  const { id, title, icon, status, stars } = level
  const starsHtml = ComponentFactory.stars(stars)
  const badgeLabel = { locked: '🔒 Bloqueada', available: '▶️ Jogar', completed: '✅ Completa' }[status]
  const badgeClass = { locked: 'badge-locked', available: 'badge-available', completed: 'badge-completed' }[status]

  return `
    <div class="level-card ${status}" id="card-level-${id}">
      <div class="level-icon">${icon}</div>
      <div class="level-name">${title}</div>
      ${starsHtml}
      <span class="level-status-badge ${badgeClass}">${badgeLabel}</span>
    </div>
  `
}

export default { render }
