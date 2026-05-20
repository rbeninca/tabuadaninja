const KEY = 'ilhaDasPalavrasSave'
const CURRENT_VERSION = 1

const SCHEMA = {
  version: 'number',
  currentLevel: 'number',
  totalPoints: 'number',
  stars: 'object',
  errors: 'object',
  rewards: 'object',
  completedLevels: 'object'
}

function validate(data) {
  if (!data || typeof data !== 'object') return false
  for (const [key, type] of Object.entries(SCHEMA)) {
    if (!(key in data)) return false
    if (type === 'object' && !Array.isArray(data[key]) && typeof data[key] !== 'object') return false
    if (type === 'number' && typeof data[key] !== 'number') return false
  }
  return true
}

function save(data) {
  const payload = {
    version: CURRENT_VERSION,
    currentLevel: data.currentLevelId || 1,
    totalPoints: data.totalPoints || 0,
    stars: data.stars || {},
    errors: data.errors || {},
    rewards: data.rewards || [],
    completedLevels: data.completedLevels || [],
    lastSaved: new Date().toISOString()
  }
  try {
    localStorage.setItem(KEY, JSON.stringify(payload))
    return true
  } catch {
    return false
  }
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!validate(parsed)) return null
    return parsed
  } catch {
    return null
  }
}

function reset() {
  localStorage.removeItem(KEY)
}

function exists() {
  return localStorage.getItem(KEY) !== null
}

export default { save, load, reset, exists, validate, KEY }
