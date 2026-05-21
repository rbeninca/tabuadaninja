import SpeechCtrl from '../ui/SpeechCtrl.js'

let isFirstQuestion = true;


function render(question, container, onAnswer, opts = {}) {
  const displayTemplate = question.wordTemplate.replace('__', '_')
  const fullWord = question.wordTemplate.replace('__', question.correct);
  if (opts.showInstruction && opts.instruction) {
    SpeechCtrl.speak(`${opts.instruction} ${fullWord}`);
  } else if (opts.showInstruction) {
    SpeechCtrl.speak(`${question.instruction}. ${fullWord}`);
  } else {
    SpeechCtrl.speak(fullWord);
  }
  isFirstQuestion = false;

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
      SpeechCtrl.speak(chosen)
      const isCorrect = chosen === question.correct

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
        setTimeout(() => {
          btn.classList.remove('anim-shake')
          btn.style.background = ''
          btn.style.borderColor = ''
          if (display) {
            display.innerHTML = buildWordDisplay(question.wordTemplate, '')
            display.style.color = ''
          }
        }, 700)
        return // Do not advance
      }

      // Only advance if correct
      setTimeout(() => onAnswer(true, question), 900)
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
