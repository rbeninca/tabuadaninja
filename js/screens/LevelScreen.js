import Router from '../core/Router.js'
import GameState from '../core/GameState.js'
import ScoreEngine from '../engine/ScoreEngine.js'
import AdaptiveEngine from '../engine/AdaptiveEngine.js'
import ProgressionEngine from '../engine/ProgressionEngine.js'
import ComponentFactory from '../ui/ComponentFactory.js'
import { getLevelById } from '../data/levels.js'
import FeedbackUI from '../ui/FeedbackUI.js'

// Mecânicas importadas dinamicamente no Sprint 4
import DragDrop from '../mechanics/DragDrop.js'
import SelectWord from '../mechanics/SelectWord.js'
import CompleteWord from '../mechanics/CompleteWord.js'
import MatchPairs from '../mechanics/MatchPairs.js'

let currentQuestions = []
let currentIndex = 0
let levelId = null

const MECHANICS = {
  'drag-category': DragDrop,
  'select-word': SelectWord,
  'complete-word': CompleteWord,
  'match-pairs': MatchPairs
}

function render(params = {}) {
  levelId = params.levelId || GameState.get('currentLevelId') || 1
  const level = getLevelById(levelId)
  if (!level) return Router.navigate('map')

  const errors = GameState.get('errors')
  if (levelId === 7) {
    currentQuestions = AdaptiveEngine.getQuestionsForReview(errors)
  } else {
    currentQuestions = AdaptiveEngine.getQuestionsForLevel(levelId, errors)
  }

  GameState.startLevel(levelId)
  currentIndex = 0

  const bg = document.getElementById('level-bg')
  if (bg) {
    bg.style.backgroundImage = `url('${level.backgroundImg}')`
    bg.style.backgroundSize = 'cover'
    bg.style.backgroundPosition = 'center'
  }

  renderFrame()
}

function renderFrame() {
  const el = document.getElementById('level-content')
  const level = getLevelById(levelId)
  const lives = GameState.get('lives')
  const score = GameState.get('score')
  const combo = GameState.get('combo')
  const total = currentQuestions.length

  el.innerHTML = `
    <div class="level-header" style="margin:12px;flex-shrink:0;">
      <button class="btn btn-neutral btn-sm" id="btn-level-back">⬅️</button>
      <div style="display:flex;flex-direction:column;align-items:center;flex:1;">
        <div style="font-weight:900;font-size:0.875rem;">${level?.icon} ${level?.title}</div>
        ${ComponentFactory.progressBar(currentIndex, total)}
        <div style="font-size:0.75rem;color:#777;margin-top:2px;">${currentIndex} de ${total}</div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:2px;">
        ${ComponentFactory.hearts(lives)}
        ${ComponentFactory.scoreDisplay(score)}
        ${ComponentFactory.comboDisplay(combo)}
      </div>
    </div>

    <div class="question-area" id="question-area" style="margin:0 12px 12px;flex:1;overflow-y:auto;">
      <!-- questão renderizada pela mecânica -->
    </div>
  `

  document.getElementById('btn-level-back')?.addEventListener('click', () => {
    Router.navigate('map')
  })

  if (currentIndex < currentQuestions.length) {
    renderQuestion(currentQuestions[currentIndex])
  }
}

function renderQuestion(question) {
  const area = document.getElementById('question-area')
  if (!area) return

  const mechanic = MECHANICS[question.type]
  if (mechanic) {
    mechanic.render(question, area, handleAnswer)
  } else {
    area.innerHTML = `<p style="color:red;">Tipo de questão desconhecido: ${question.type}</p>`
  }
}

function handleAnswer(isCorrect, question) {
  const state = GameState.get()
  const result = ScoreEngine.applyAnswer(state, isCorrect)

  GameState.set({
    score: result.score,
    combo: result.combo,
    correctCount: result.correctCount,
    wrongCount: result.wrongCount
  })

  if (!isCorrect) {
    GameState.set({ lives: state.lives - 1 })
    GameState.registerError(question.category)
  }

  ProgressionEngine.persistProgress()

  FeedbackUI.show(isCorrect, question, result.lastBonus, () => {
    const newLives = GameState.get('lives')
    currentIndex++

    if (newLives <= 0) {
      finishLevel(false)
      return
    }

    if (currentIndex >= currentQuestions.length) {
      finishLevel(true)
    } else {
      renderFrame()
    }
  })
}

function finishLevel(completed) {
  const correctCount = GameState.get('correctCount')
  const wrongCount = GameState.get('wrongCount')
  const score = GameState.get('score')
  const total = currentQuestions.length
  const stars = ScoreEngine.calcStars(correctCount, total)

  let reward = null
  if (completed && stars > 0) {
    reward = ProgressionEngine.completeLevel(levelId, stars)
  } else if (completed) {
    ProgressionEngine.completeLevel(levelId, 0)
  }

  Router.navigate('result', { levelId, score, stars, correctCount, wrongCount, reward })
}

export default { render }
