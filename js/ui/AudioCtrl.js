let muted = false
const cache = {}

const SOUNDS = {
  correct: 'assets/audio/correct.mp3',
  wrong: 'assets/audio/wrong.mp3',
  star: 'assets/audio/star.mp3',
  reward: 'assets/audio/reward.mp3'
}

function load(key) {
  if (cache[key]) return cache[key]
  const audio = new Audio(SOUNDS[key])
  audio.preload = 'auto'
  cache[key] = audio
  return audio
}

function play(key) {
  if (muted || !SOUNDS[key]) return
  try {
    const audio = load(key)
    audio.currentTime = 0
    audio.play().catch(() => {})
  } catch {}
}

function toggleMute() {
  muted = !muted
  return muted
}

function isMuted() { return muted }

export default { play, toggleMute, isMuted }
