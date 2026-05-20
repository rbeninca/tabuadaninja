import { levels } from '../data/levels.js'
import GameState from '../core/GameState.js'
import Storage from '../storage/Storage.js'
import { getRewardByLevelId } from '../data/rewards.js'

function isUnlocked(levelId, completedLevels) {
  const level = levels.find(l => l.id === levelId)
  if (!level) return false
  if (level.unlocksAfter === null) return true
  return completedLevels.includes(level.unlocksAfter)
}

function isCompleted(levelId, completedLevels) {
  return completedLevels.includes(levelId)
}

function completeLevel(levelId, stars) {
  GameState.completeLevel(levelId)
  GameState.setLevelStars(levelId, stars)

  const reward = getRewardByLevelId(levelId)
  if (reward) GameState.addReward(reward.name)

  persistProgress()
  return reward
}

function persistProgress() {
  const s = GameState.get()
  Storage.save({
    currentLevelId: s.currentLevelId,
    totalPoints: s.score,
    stars: s.stars,
    errors: s.errors,
    rewards: s.rewards,
    completedLevels: s.completedLevels,
    voiceGender: s.voiceGender
  })
}

function getLevelStatus(levelId) {
  const completedLevels = GameState.get('completedLevels')
  if (isCompleted(levelId, completedLevels)) return 'completed'
  if (isUnlocked(levelId, completedLevels)) return 'available'
  return 'locked'
}

function getAllLevelStatuses() {
  return levels.map(l => ({
    ...l,
    status: getLevelStatus(l.id),
    stars: GameState.get('stars')[l.id] || 0
  }))
}

export default { isUnlocked, isCompleted, completeLevel, getLevelStatus, getAllLevelStatuses, persistProgress }
