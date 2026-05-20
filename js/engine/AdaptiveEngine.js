import { getQuestionsByLevel, questions } from '../data/questions.js'

const TOTAL_QUESTIONS_PER_LEVEL = 10
const DIFFICULTY_ORDER = ['facil', 'medio', 'dificil']

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function weightedShuffle(pool, errors) {
  const weighted = []
  pool.forEach(q => {
    const errorCount = errors[q.category] || 0
    const weight = 1 + errorCount * 2
    for (let i = 0; i < weight; i++) weighted.push(q)
  })
  return shuffle(weighted)
}

function progressiveWeightedPool(pool, errors) {
  const ordered = []

  DIFFICULTY_ORDER.forEach((difficulty) => {
    const bucket = pool.filter(q => q.difficulty === difficulty)
    if (bucket.length > 0) {
      ordered.push(...weightedShuffle(bucket, errors))
    }
  })

  const unknownDifficulty = pool.filter(q => !q.difficulty || !DIFFICULTY_ORDER.includes(q.difficulty))
  if (unknownDifficulty.length > 0) {
    ordered.push(...weightedShuffle(unknownDifficulty, errors))
  }

  return ordered
}

function getQuestionsForLevel(levelId, errors = {}, count = TOTAL_QUESTIONS_PER_LEVEL) {
  const pool = getQuestionsByLevel(levelId)
  if (pool.length === 0) return []

  const weighted = progressiveWeightedPool(pool, errors)
  const seen = new Set()
  const result = []

  for (const q of weighted) {
    if (!seen.has(q.id)) {
      seen.add(q.id)
      result.push(q)
      if (result.length >= count) break
    }
  }

  // preenche se pool menor que count
  if (result.length < count && pool.length > 0) {
    const extras = shuffle(pool)
    for (const q of extras) {
      if (result.length >= count) break
      result.push(q)
    }
  }

  return result.slice(0, count)
}

function getQuestionsForReview(errors = {}, count = TOTAL_QUESTIONS_PER_LEVEL) {
  if (Object.keys(errors).length === 0) return getQuestionsForLevel(7, {}, count)

  const sorted = Object.entries(errors)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([cat]) => cat)

  const pool = questions.filter(q =>
    sorted.some(cat => q.category === cat || (q.category && q.category.includes(cat)))
  )

  if (pool.length === 0) return getQuestionsForLevel(7, errors, count)

  const weighted = progressiveWeightedPool(pool, errors)
  const seen = new Set()
  const result = []

  for (const q of weighted) {
    if (!seen.has(q.id)) {
      seen.add(q.id)
      result.push(q)
      if (result.length >= count) break
    }
  }

  return result.slice(0, count)
}

function getTopErrorCategories(errors, n = 3) {
  return Object.entries(errors)
    .sort(([, a], [, b]) => b - a)
    .slice(0, n)
    .map(([cat, count]) => ({ category: cat, count }))
}

export default { getQuestionsForLevel, getQuestionsForReview, getTopErrorCategories, shuffle }
