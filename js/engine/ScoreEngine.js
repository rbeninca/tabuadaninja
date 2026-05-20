const POINTS_FIRST_TRY = 100
const POINTS_WITH_HINT = 50
const POINTS_WRONG = 0
const BONUS_COMBO_3 = 50
const BONUS_COMBO_5 = 100

const STARS_3 = 9
const STARS_2 = 7
const STARS_1 = 5

function calcPoints(isCorrect, hintUsed) {
  if (!isCorrect) return POINTS_WRONG
  return hintUsed ? POINTS_WITH_HINT : POINTS_FIRST_TRY
}

function calcComboBonus(combo) {
  if (combo >= 5) return BONUS_COMBO_5
  if (combo >= 3) return BONUS_COMBO_3
  return 0
}

function calcStars(correctCount, totalQuestions) {
  const pct = correctCount / totalQuestions
  if (pct >= STARS_3 / 10) return 3
  if (pct >= STARS_2 / 10) return 2
  if (pct >= STARS_1 / 10) return 1
  return 0
}

function applyAnswer(state, isCorrect) {
  const points = calcPoints(isCorrect, state.hintUsed)
  const newCombo = isCorrect ? state.combo + 1 : 0
  const bonus = isCorrect ? calcComboBonus(newCombo) : 0
  const totalPoints = state.score + points + bonus

  return {
    score: totalPoints,
    combo: newCombo,
    correctCount: state.correctCount + (isCorrect ? 1 : 0),
    wrongCount: state.wrongCount + (isCorrect ? 0 : 1),
    lastBonus: bonus
  }
}

export default { calcPoints, calcComboBonus, calcStars, applyAnswer }
