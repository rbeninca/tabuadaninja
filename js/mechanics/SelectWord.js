function render(question, container, onAnswer) {
  container.innerHTML = `
    <div class="question-instruction">${question.instruction}</div>

    <div style="background:#F3E5F5;border-radius:16px;padding:16px;width:100%;margin:16px 0;">
      <div class="sentence-words" id="sentence-words">
        ${question.words.map(word => `
          <button class="sentence-word" data-word="${word}">${word}</button>
        `).join('')}
      </div>
    </div>

    <div style="font-size:0.875rem;color:#777;text-align:center;">
      👆 Toque na palavra certa
    </div>
  `

  container.querySelectorAll('.sentence-word').forEach(btn => {
    btn.addEventListener('click', () => {
      const chosen = btn.dataset.word
      const isCorrect = chosen === question.correct

      container.querySelectorAll('.sentence-word').forEach(b => {
        b.style.pointerEvents = 'none'
        if (b.dataset.word === question.correct) {
          b.style.background = '#C8E6C9'
          b.style.borderColor = '#2E7D32'
        }
      })

      if (!isCorrect) {
        btn.style.background = '#FFCDD2'
        btn.style.borderColor = '#C62828'
        btn.classList.add('anim-shake')
      } else {
        btn.classList.add('anim-bounce')
      }

      setTimeout(() => onAnswer(isCorrect, question), 600)
    })
  })
}

export default { render }
