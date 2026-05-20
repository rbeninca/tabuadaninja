let selectedLeft = null
let matchedCount = 0
let totalPairs = 0
let onAnswerCallback = null
let currentQuestion = null
let wrongAttempt = false

function render(question, container, onAnswer) {
  currentQuestion = question
  onAnswerCallback = onAnswer
  selectedLeft = null
  matchedCount = 0
  wrongAttempt = false
  totalPairs = question.pairs.length

  const lefts = question.pairs.map(p => p.left)
  const rights = shuffle([...question.pairs.map(p => p.right)])

  container.innerHTML = `
    <div class="question-instruction">${question.instruction}</div>

    <div style="margin:16px 0;font-size:0.875rem;color:#777;text-align:center;">
      👆 Toque em um coletivo, depois no grupo correto
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;width:100%;">
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${lefts.map((left, i) => `
          <button class="match-item" data-side="left" data-value="${left}" id="left-${i}">
            ${left}
          </button>
        `).join('')}
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        ${rights.map((right, i) => `
          <button class="match-item" data-side="right" data-value="${right}" id="right-${i}">
            ${right}
          </button>
        `).join('')}
      </div>
    </div>
  `

  container.querySelectorAll('.match-item').forEach(btn => {
    btn.addEventListener('click', () => handleClick(btn, container, question))
  })
}

function handleClick(btn, container, question) {
  if (btn.classList.contains('matched')) return

  const side = btn.dataset.side

  if (side === 'left') {
    container.querySelectorAll('[data-side="left"]').forEach(b => b.classList.remove('selected'))
    selectedLeft = btn
    btn.classList.add('selected')
    return
  }

  if (side === 'right' && selectedLeft) {
    const leftVal = selectedLeft.dataset.value
    const rightVal = btn.dataset.value
    const pair = question.pairs.find(p => p.left === leftVal)
    const isCorrect = pair?.right === rightVal

    if (isCorrect) {
      selectedLeft.classList.remove('selected')
      selectedLeft.classList.add('matched')
      btn.classList.add('matched')
      selectedLeft = null
      matchedCount++

      if (matchedCount >= totalPairs) {
        setTimeout(() => onAnswerCallback(!wrongAttempt, question), 400)
      }
    } else {
      selectedLeft.classList.remove('selected')
      selectedLeft.classList.add('anim-shake')
      btn.classList.add('anim-shake')
      setTimeout(() => {
        selectedLeft?.classList.remove('anim-shake')
        btn.classList.remove('anim-shake')
      }, 500)
      selectedLeft = null
      wrongAttempt = true
      onAnswerCallback(false, question)
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
