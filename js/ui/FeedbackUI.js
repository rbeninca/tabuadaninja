let feedbackTimeout = null

function show(isCorrect, question, bonus, onContinue) {
  const overlay = document.getElementById('feedback-overlay')
  if (!overlay) { onContinue(); return }

  if (feedbackTimeout) clearTimeout(feedbackTimeout)

  const emoji = isCorrect ? (bonus > 0 ? '🔥' : '✅') : '💭'
  const title = isCorrect
    ? (bonus > 0 ? `Incrível! +${bonus} bônus!` : 'Muito bem!')
    : 'Quase!'

  overlay.style.display = 'flex'
  overlay.style.pointerEvents = 'all'
  overlay.innerHTML = `
    <div class="feedback-toast ${isCorrect ? '' : 'wrong'} anim-slide-up"
         style="pointer-events:all;cursor:pointer;max-width:360px;width:90%;">
      <div class="feedback-emoji">${emoji}</div>
      <div class="feedback-title" style="color:${isCorrect ? '#2E7D32' : '#C62828'};">${title}</div>
      ${!isCorrect && question?.explanation ? `
        <div class="feedback-explanation">${question.explanation}</div>
      ` : ''}
      <div style="margin-top:12px;font-size:0.75rem;color:#999;">Toque para continuar</div>
    </div>
  `

  const hide = () => {
    clearTimeout(feedbackTimeout)
    overlay.style.display = 'none'
    overlay.style.pointerEvents = 'none'
    overlay.innerHTML = ''
    onContinue()
  }

  overlay.addEventListener('click', hide, { once: true })
  feedbackTimeout = setTimeout(hide, 3000)
}

export default { show }
