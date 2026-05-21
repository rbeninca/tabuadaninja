import AudioCtrl from './AudioCtrl.js'
import GameState from '../core/GameState.js'

const FEMALE_HINTS = ['female', 'feminina', 'mulher', 'woman', 'maria', 'luciana', 'brenda']
const MALE_HINTS = ['male', 'masculina', 'homem', 'man', 'ricardo', 'antonio', 'paulo']

function isSupported() {
  return typeof window !== 'undefined'
    && 'speechSynthesis' in window
    && typeof SpeechSynthesisUtterance !== 'undefined'
}

function getPtVoices(voices = []) {
  return voices.filter(v => v.lang?.toLowerCase() === 'pt-br' || v.lang?.toLowerCase().startsWith('pt'))
}

function getVoiceByGender(voices = [], voiceGender = 'feminina') {
  const ptVoices = getPtVoices(voices)
  if (ptVoices.length === 0) return null

  const hints = voiceGender === 'masculina' ? MALE_HINTS : FEMALE_HINTS
  const matched = ptVoices.find((voice) => {
    const name = (voice.name || '').toLowerCase()
    return hints.some(hint => name.includes(hint))
  })

  return matched || ptVoices[0]
}

function speak(text, options = {}) {
  if (!text || AudioCtrl.isMuted() || !isSupported()) return false

  const {
    voiceGender = GameState.get('voiceGender') || 'feminina',
    rate = 0.95,
    pitch = 1,
    cancelPrevious = true
  } = options

  try {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'pt-BR'
    utterance.rate = rate
    utterance.pitch = pitch

    const voice = getVoiceByGender(window.speechSynthesis.getVoices(), voiceGender)
    if (voice) utterance.voice = voice

    if (cancelPrevious) window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
    return true
  } catch {
    return false
  }
}

export default { isSupported, speak, getPtVoices, getVoiceByGender }