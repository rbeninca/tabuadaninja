function stars(count, max = 3) {
  let html = '<div class="stars-row">'
  for (let i = 1; i <= max; i++) {
    html += `<span class="star ${i <= count ? 'filled' : 'empty'}">${i <= count ? '★' : '☆'}</span>`
  }
  html += '</div>'
  return html
}

function hearts(current, max = 3) {
  let html = '<div class="lives-row">'
  for (let i = 1; i <= max; i++) {
    html += `<span class="heart ${i <= current ? 'filled' : 'empty'}">♥</span>`
  }
  html += '</div>'
  return html
}

function progressBar(current, total) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0
  return `
    <div class="progress-bar-wrap">
      <div class="progress-bar-fill" style="width:${pct}%"></div>
    </div>
  `
}

function scoreDisplay(score) {
  return `<div class="score-display">⭐ ${score}</div>`
}

function comboDisplay(combo) {
  if (combo < 2) return ''
  return `<div class="combo-display">🔥 Combo x${combo}!</div>`
}

function btn(label, id, variant = 'primary', size = '') {
  return `<button class="btn btn-${variant}${size ? ' btn-' + size : ''}" id="${id}">${label}</button>`
}

export default { stars, hearts, progressBar, scoreDisplay, comboDisplay, btn }
