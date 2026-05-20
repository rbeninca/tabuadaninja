import Router from '../core/Router.js'
import ComponentFactory from '../ui/ComponentFactory.js'
import { getLevelById } from '../data/levels.js'
import { getRewardByLevelId } from '../data/rewards.js'

function render(params = {}) {
  const { levelId, score, stars, correctCount, wrongCount, reward } = params
  const level = getLevelById(levelId)
  const rewardData = reward ? getRewardByLevelId(levelId) : null
  const el = document.getElementById('result-content')

  const starsHtml = ComponentFactory.stars(stars)
  const title = stars >= 3 ? '🎉 Incrível!' : stars >= 2 ? '😊 Muito bem!' : stars >= 1 ? '👍 Continue!' : '💪 Tente de novo!'

  el.innerHTML = `
    <div style="background:rgba(255,255,255,0.95);border-radius:32px;padding:32px;max-width:480px;width:100%;text-align:center;box-shadow:0 8px 24px rgba(0,0,0,0.25);">
      <div style="font-size:3rem;">${title}</div>

      <h2 style="font-size:1.5rem;font-weight:900;margin:8px 0;color:#2C3E50;">
        ${level?.title || 'Fase concluída'}
      </h2>

      <div style="margin:16px 0;display:flex;justify-content:center;gap:8px;font-size:2rem;">
        ${starsHtml}
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:16px 0;">
        <div style="background:#E8F5E9;border-radius:16px;padding:16px;">
          <div style="font-size:2rem;font-weight:900;color:#2E7D32;">✅ ${correctCount}</div>
          <div style="font-size:0.875rem;color:#555;">Acertos</div>
        </div>
        <div style="background:#FFEBEE;border-radius:16px;padding:16px;">
          <div style="font-size:2rem;font-weight:900;color:#C62828;">❌ ${wrongCount}</div>
          <div style="font-size:0.875rem;color:#555;">Erros</div>
        </div>
      </div>

      <div style="font-size:1.5rem;font-weight:900;color:#FF8C00;margin:8px 0;">
        ⭐ ${score} pontos
      </div>

      ${rewardData ? `
        <div style="background:#FFF8E1;border-radius:16px;padding:16px;margin:16px 0;border:2px solid #FFD700;">
          <div style="font-size:0.875rem;font-weight:700;color:#FF8C00;margin-bottom:8px;">🎁 Recompensa desbloqueada!</div>
          <img src="${rewardData.img}" alt="${rewardData.name}"
               style="width:80px;height:80px;object-fit:contain;margin:0 auto;"
               class="anim-pop-in"
               onerror="this.style.fontSize='3rem';this.textContent='🎁'">
          <div style="font-weight:900;color:#2C3E50;margin-top:8px;">${rewardData.name}</div>
          <div style="font-size:0.75rem;color:#777;">${rewardData.description}</div>
        </div>
      ` : ''}

      <div style="display:flex;flex-direction:column;gap:12px;margin-top:24px;">
        <button class="btn btn-primary" id="btn-play-again">🔄 Jogar novamente</button>
        <button class="btn btn-secondary" id="btn-go-map">🗺️ Voltar ao mapa</button>
      </div>
    </div>
  `

  document.getElementById('btn-play-again')?.addEventListener('click', () => {
    Router.navigate('level', { levelId })
  })

  document.getElementById('btn-go-map')?.addEventListener('click', () => {
    Router.navigate('map')
  })
}

export default { render }
