function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function render(question, container, onAnswer) {
  const shuffled = shuffle([...question.words])
  let builtSentence = []

  const rerender = () => {
    container.innerHTML = `
      <div class="question-instruction">${question.instruction}</div>

      <div class="sentence-builder" style="margin:16px 0;">
        <div class="sentence-drop-area" id="sentence-area" style="min-height:70px;">
          ${builtSentence.map((w, i) => `
            <button class="word-chip" data-word="${w}" data-idx="${i}" style="cursor:pointer;" id="built-${i}">${w}</button>
          `).join('')}
          ${builtSentence.length === 0 ? '<span style="color:#aaa;font-size:0.875rem;">Monte a frase aqui...</span>' : ''}
        </div>

        <div class="word-bank" id="word-bank" style="margin-top:12px;">
          ${shuffled.filter(w => !builtSentence.includes(w)).map(w => `
            <button class="word-chip" data-word="${w}" style="cursor:pointer;">${w}</button>
          `).join('')}
        </div>
      </div>

      <div style="display:flex;gap:12px;justify-content:center;">
        <button class="btn btn-neutral btn-sm" id="btn-clear-sentence">🔄 Limpar</button>
        <button class="btn btn-primary" id="btn-check-sentence">✅ Verificar</button>
      </div>
    `

    document.getElementById('btn-clear-sentence')?.addEventListener('click', () => {
      builtSentence = []
      rerender()
    })

    document.getElementById('btn-check-sentence')?.addEventListener('click', () => {
      const built = builtSentence.join(' ')
      const isCorrect = built === question.correctSentence ||
        built.toLowerCase().replace(/\.$/, '') === question.correctSentence.toLowerCase().replace(/\.$/, '')
      onAnswer(isCorrect, question)
    })

    // Click words from bank → add to sentence
    container.querySelectorAll('#word-bank .word-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        builtSentence.push(btn.dataset.word)
        rerender()
      })
    })

    // Click words in sentence → remove
    container.querySelectorAll('#sentence-area .word-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx)
        builtSentence.splice(idx, 1)
        rerender()
      })
    })
  }

  rerender()
}

export default { render }
