import EventBus from './EventBus.js'

const INITIAL_STATE = {
  currentScreen: 'home',
  currentLevelId: null,
  currentQuestionIndex: 0,
  score: 0,
  lives: 3,
  combo: 0,
  correctCount: 0,
  wrongCount: 0,
  hintUsed: false,
  stars: {},
  errors: {},
  rewards: [],
  completedLevels: [],
  voiceGender: 'feminina'
}

let state = { ...INITIAL_STATE }

function get(key) {
  if (key === undefined) return { ...state }
  return state[key]
}

function set(updates) {
  const prev = { ...state }
  state = { ...state, ...updates }
  EventBus.emit('stateChange', { prev, next: { ...state }, changed: Object.keys(updates) })
}

function reset() {
  state = { ...INITIAL_STATE }
  EventBus.emit('stateChange', { prev: null, next: { ...state }, changed: ['all'] })
}

function startLevel(levelId) {
  set({
    currentLevelId: levelId,
    currentQuestionIndex: 0,
    score: 0,
    lives: 3,
    combo: 0,
    correctCount: 0,
    wrongCount: 0,
    hintUsed: false
  })
}

function registerError(category) {
  const current = state.errors[category] || 0
  set({ errors: { ...state.errors, [category]: current + 1 } })
}

function addReward(rewardName) {
  if (state.rewards.includes(rewardName)) return
  set({ rewards: [...state.rewards, rewardName] })
}

function setLevelStars(levelId, starCount) {
  const current = state.stars[levelId] || 0
  if (starCount > current) {
    set({ stars: { ...state.stars, [levelId]: starCount } })
  }
}

function completeLevel(levelId) {
  if (!state.completedLevels.includes(levelId)) {
    set({ completedLevels: [...state.completedLevels, levelId] })
  }
}

function hydrate(savedData) {
  state = {
    ...INITIAL_STATE,
    stars: savedData.stars || {},
    errors: savedData.errors || {},
    rewards: savedData.rewards || [],
    completedLevels: savedData.completedLevels || [],
    voiceGender: savedData.voiceGender || INITIAL_STATE.voiceGender
  }
}

export default { get, set, reset, startLevel, registerError, addReward, setLevelStars, completeLevel, hydrate }
