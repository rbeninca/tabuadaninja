let draggedItem = null
let pendingItems = []
let answeredCorrectly = 0
let onAnswerCallback = null
let currentQuestion = null

function render(question, container, onAnswer) {
  currentQuestion = question
  onAnswerCallback = onAnswer
  pendingItems = [...question.items]
  answeredCorrectly = 0

  container.innerHTML = `
    <div class="question-instruction">${question.instruction}</div>

    <div id="word-bank" class="word-bank" style="margin:16px 0;min-height:60px;flex-wrap:wrap;">
      ${question.items.map(item => `
        <div class="word-chip"
             draggable="true"
             data-text="${item.text}"
             data-answer="${item.answer}"
             id="chip-${item.text.replace(/\s/g,'-')}">
          ${item.text}
        </div>
      `).join('')}
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;width:100%;">
      ${question.targets.map(target => `
        <div class="drop-zone"
             data-target="${target.id}"
             id="zone-${target.id}">
          <span style="font-size:1.5rem;">${target.icon || ''}</span>
          <div class="drop-zone-label">${target.label}</div>
        </div>
      `).join('')}
    </div>
  `

  bindEvents(container, question)
}

function bindEvents(container, question) {
  // Mouse events
  container.querySelectorAll('.word-chip').forEach(chip => {
    chip.addEventListener('dragstart', e => {
      draggedItem = chip
      chip.classList.add('dragging')
      e.dataTransfer.effectAllowed = 'move'
    })
    chip.addEventListener('dragend', () => {
      chip.classList.remove('dragging')
      draggedItem = null
    })
    // Touch events
    chip.addEventListener('touchstart', touchStart, { passive: true })
    chip.addEventListener('touchmove', touchMove, { passive: false })
    chip.addEventListener('touchend', touchEnd)
  })

  container.querySelectorAll('.drop-zone').forEach(zone => {
    zone.addEventListener('dragover', e => {
      e.preventDefault()
      zone.classList.add('drag-over')
    })
    zone.addEventListener('dragleave', () => zone.classList.remove('drag-over'))
    zone.addEventListener('drop', e => {
      e.preventDefault()
      zone.classList.remove('drag-over')
      if (!draggedItem) return
      handleDrop(draggedItem, zone, question)
    })
  })
}

function handleDrop(chip, zone, question) {
  const answer = chip.dataset.answer
  const target = zone.dataset.target
  const isCorrect = answer === target

  chip.classList.add(isCorrect ? 'correct' : 'wrong')
  chip.setAttribute('draggable', 'false')
  chip.style.cursor = 'default'

  if (isCorrect) {
    zone.appendChild(chip)
    answeredCorrectly++
    if (answeredCorrectly >= question.items.length) {
      setTimeout(() => onAnswerCallback(true, question), 400)
    }
  } else {
    setTimeout(() => {
      chip.classList.remove('wrong')
      chip.classList.add('anim-shake')
      setTimeout(() => chip.classList.remove('anim-shake'), 500)
    }, 200)
    onAnswerCallback(false, question)
  }
}

// ---- Touch drag support ----
let touchClone = null
let touchOrigin = null

function touchStart(e) {
  const chip = e.currentTarget
  touchOrigin = chip
  const rect = chip.getBoundingClientRect()
  touchClone = chip.cloneNode(true)
  touchClone.style.cssText = `
    position:fixed;z-index:999;opacity:0.85;pointer-events:none;
    width:${rect.width}px;left:${rect.left}px;top:${rect.top}px;
    transform:scale(1.1) rotate(3deg);
  `
  document.body.appendChild(touchClone)
}

function touchMove(e) {
  e.preventDefault()
  const t = e.touches[0]
  if (touchClone) {
    touchClone.style.left = (t.clientX - touchClone.offsetWidth / 2) + 'px'
    touchClone.style.top = (t.clientY - touchClone.offsetHeight / 2) + 'px'
  }
}

function touchEnd(e) {
  if (touchClone) {
    document.body.removeChild(touchClone)
    touchClone = null
  }
  if (!touchOrigin) return

  const t = e.changedTouches[0]
  const el = document.elementFromPoint(t.clientX, t.clientY)
  const zone = el?.closest('.drop-zone')
  if (zone && currentQuestion) {
    handleDrop(touchOrigin, zone, currentQuestion)
  }
  touchOrigin = null
}

export default { render }
