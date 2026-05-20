import Router from './Router.js'
import GameState from './GameState.js'
import Storage from '../storage/Storage.js'

import HomeScreen from '../screens/HomeScreen.js'
import MapScreen from '../screens/MapScreen.js'
import LevelScreen from '../screens/LevelScreen.js'
import ResultScreen from '../screens/ResultScreen.js'
import ProgressScreen from '../screens/ProgressScreen.js'

function init() {
  Router.register('home', HomeScreen)
  Router.register('map', MapScreen)
  Router.register('level', LevelScreen)
  Router.register('result', ResultScreen)
  Router.register('progress', ProgressScreen)

  const saved = Storage.load()
  if (saved) {
    GameState.hydrate(saved)
  }

  Router.navigate('home')
}

export default { init }
