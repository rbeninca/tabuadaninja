function render(question, container, onAnswer) {
  const displayTemplate = question.wordTemplate.replace('__', '_')

  container.innerHTML = `
    <div class="question-instruction">${question.instruction}</div>

    <div style="text-align:center;margin:24px 0;">
      <div id="word-display" class="word-template">${buildWordDisplay(question.wordTemplate, '')}</div>
    </div>

    <div class="letter-options" id="letter-options">
      ${question.options.map(letter => `
        <button class="letter-chip" data-letter="${letter}">${letter}</button>
      `).join('')}
    </div>

    <div style="margin-top:16px;text-align:center;font-size:0.875rem;color:#777;">
      👆 Toque na letra certa
    </div>
  `

  container.querySelectorAll('.letter-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      const chosen = btn.dataset.letter
      const isCorrect = chosen === question.correct

      container.querySelectorAll('.letter-chip').forEach(b => b.disabled = true)

      const display = document.getElementById('word-display')
      if (display) {
        display.innerHTML = buildWordDisplay(question.wordTemplate, chosen)
        display.style.color = isCorrect ? '#2E7D32' : '#C62828'
      }

      btn.style.background = isCorrect ? '#C8E6C9' : '#FFCDD2'
      btn.style.borderColor = isCorrect ? '#2E7D32' : '#C62828'

      if (isCorrect && question.finalWord) {
        setTimeout(() => {
          if (display) {
            display.textContent = question.finalWord
            display.classList.add('anim-bounce')
          }
        }, 300)
      } else if (!isCorrect) {
        btn.classList.add('anim-shake')
      }

      setTimeout(() => onAnswer(isCorrect, question), 900)
    })
  })
}

function buildWordDisplay(template, letter) {
  return template.replace('__', letter
    ? `<span style="color:#9C27B0;text-decoration:underline;">${letter}</span>`
    : '<span style="display:inline-block;width:32px;border-bottom:3px solid #9C27B0;">&nbsp;</span>'
  )
}

export default { render }
