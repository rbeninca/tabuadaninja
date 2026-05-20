import EventBus from './EventBus.js'
import GameState from './GameState.js'

const VALID_SCREENS = ['home', 'map', 'level', 'result', 'progress']

let screens = {}

function register(screenName, screenModule) {
  screens[screenName] = screenModule
}

function navigate(screenName, params = {}) {
  if (!VALID_SCREENS.includes(screenName)) {
    console.warn(`Router: tela desconhecida "${screenName}"`)
    return
  }

  const prev = GameState.get('currentScreen')

  document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'))

  const el = document.getElementById(`screen-${screenName}`)
  if (el) el.classList.add('active')

  GameState.set({ currentScreen: screenName })

  const module = screens[screenName]
  if (module?.render) module.render(params)

  EventBus.emit('navigate', { from: prev, to: screenName, params })
}

function getCurrentScreen() {
  return GameState.get('currentScreen')
}

export default { register, navigate, getCurrentScreen, VALID_SCREENS }
