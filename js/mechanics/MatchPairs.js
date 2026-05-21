import SpeechCtrl from '../ui/SpeechCtrl.js'

let selectedLeft = null
let matchedCount = 0
let totalPairs = 0
let onAnswerCallback = null
let currentQuestion = null
let wrongAttempt = false
let finished = false
let matchedConnections = []
let activeResizeHandler = null
let connectionPalette = []

const BASE_CONNECTION_COLORS = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#22c55e',
  '#14b8a6',
  '#3b82f6',
  '#6366f1',
  '#a855f7',
  '#ec4899',
  '#0ea5e9'
]

function clearResizeHandler() {
  if (!activeResizeHandler) return
  window.removeEventListener('resize', activeResizeHandler)
  activeResizeHandler = null
}

function speakWord(text) {
  if (!text) return
  SpeechCtrl.speak(text)
}


function render(question, container, onAnswer, opts = {}) {
  clearResizeHandler()

  currentQuestion = question
  onAnswerCallback = onAnswer
  selectedLeft = null
  matchedCount = 0
  wrongAttempt = false
  finished = false
  matchedConnections = []
  connectionPalette = shuffle([...BASE_CONNECTION_COLORS])
  totalPairs = question.pairs.length

  if (opts.showInstruction && opts.instruction) {
    SpeechCtrl.speak(opts.instruction)
  }

  const lefts = question.pairs.map(p => p.left)
  const rights = shuffle([...question.pairs.map(p => p.right)])

  container.innerHTML = `
    <div class="question-instruction">${question.instruction}</div>

    <div style="margin:16px 0;font-size:0.875rem;color:#777;text-align:center;">
      👆 Toque em um coletivo, depois no grupo correto
    </div>

    <div id="match-board" style="position:relative;width:100%;">
      <svg id="match-lines" style="position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1;overflow:visible;">
      </svg>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;width:100%;position:relative;z-index:2;">
      <div style="display:flex;flex-direction:column;gap:8px;align-items:center;">
        ${lefts.map((left, i) => `
          <button class="match-item" data-side="left" data-value="${left}" id="left-${i}" style="width:fit-content;max-width:78%;min-width:120px;">
            ${left}
          </button>
        `).join('')}
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;align-items:center;">
        ${rights.map((right, i) => `
          <button class="match-item" data-side="right" data-value="${right}" id="right-${i}" style="width:fit-content;max-width:78%;min-width:120px;">
            ${right}
          </button>
        `).join('')}
      </div>
      </div>

      <style>
        @keyframes draw-connection {
          to {
            stroke-dashoffset: 0;
          }
        }
      </style>
    </div>
  `

  activeResizeHandler = () => drawConnections(container)
  window.addEventListener('resize', activeResizeHandler)

  container.querySelectorAll('.match-item').forEach(btn => {
    btn.addEventListener('click', () => handleClick(btn, container, question))
  })
}

function drawConnections(container) {
  const board = container.querySelector('#match-board')
  const svg = container.querySelector('#match-lines')
  if (!board || !svg) return

  const boardRect = board.getBoundingClientRect()

  svg.innerHTML = matchedConnections.map((conn, idx) => {
    const leftBtn = container.querySelector(`#${conn.leftId}`)
    const rightBtn = container.querySelector(`#${conn.rightId}`)
    if (!leftBtn || !rightBtn) return ''

    const leftRect = leftBtn.getBoundingClientRect()
    const rightRect = rightBtn.getBoundingClientRect()

    const x1 = leftRect.right - boardRect.left
    const y1 = leftRect.top - boardRect.top + (leftRect.height / 2)
    const x2 = rightRect.left - boardRect.left
    const y2 = rightRect.top - boardRect.top + (rightRect.height / 2)

    const curve = Math.max(42, Math.abs(x2 - x1) * 0.3)
    const cx1 = x1 + curve
    const cx2 = x2 - curve
    const d = `M ${x1} ${y1} C ${cx1} ${y1}, ${cx2} ${y2}, ${x2} ${y2}`

    const strokeColor = conn.color || '#22c55e'

    return `
      <g>
        <path d="${d}"
              fill="none"
              stroke="${strokeColor}"
              stroke-width="4"
              stroke-linecap="round"
              style="filter:drop-shadow(0 0 4px ${strokeColor}66);stroke-dasharray:600;stroke-dashoffset:600;animation:draw-connection 360ms ease forwards;animation-delay:${idx * 40}ms;" />
        <circle cx="${x2}" cy="${y2}" r="5" fill="${strokeColor}" />
      </g>
    `
  }).join('')
}

function registerConnection(container, leftBtn, rightBtn) {
  const color = connectionPalette[matchedConnections.length % connectionPalette.length] || '#22c55e'
  matchedConnections.push({ leftId: leftBtn.id, rightId: rightBtn.id, color })

  leftBtn.style.borderColor = color
  rightBtn.style.borderColor = color
  leftBtn.style.background = `${color}22`
  rightBtn.style.background = `${color}22`

  drawConnections(container)
}

function handleClick(btn, container, question) {
  if (finished || btn.classList.contains('matched')) return

  speakWord(btn.dataset.value)

  const side = btn.dataset.side

  if (side === 'left') {
    container.querySelectorAll('[data-side="left"]').forEach(b => b.classList.remove('selected'))
    selectedLeft = btn
    btn.classList.add('selected')
    return
  }

  if (side === 'right' && selectedLeft) {
    const leftBtn = selectedLeft
    const leftVal = selectedLeft.dataset.value
    const rightVal = btn.dataset.value
    const pair = question.pairs.find(p => p.left === leftVal)
    const isCorrect = pair?.right === rightVal

    if (isCorrect) {
      leftBtn.classList.remove('selected')
      leftBtn.classList.add('matched')
      btn.classList.add('matched')
      registerConnection(container, leftBtn, btn)
      selectedLeft = null
      matchedCount++

      if (matchedCount >= totalPairs) {
        finished = true
        setTimeout(() => onAnswerCallback(true, question), 400)
      }
    } else {
      leftBtn.classList.remove('selected')
      leftBtn.classList.add('anim-shake')
      btn.classList.add('anim-shake')
      setTimeout(() => {
        leftBtn.classList.remove('anim-shake')
        btn.classList.remove('anim-shake')
      }, 500)
      selectedLeft = null
      // Do not finish or advance, just allow retry
    }
  }
}

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default { render }
