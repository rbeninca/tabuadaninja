import { describe, it, expect, beforeEach } from 'vitest'
import GameState from '../../js/core/GameState.js'
import EventBus from '../../js/core/EventBus.js'

beforeEach(() => {
  GameState.reset()
  EventBus.clear()
})

describe('GameState.get', () => {
  it('retorna estado inicial correto', () => {
    expect(GameState.get('currentScreen')).toBe('home')
    expect(GameState.get('score')).toBe(0)
    expect(GameState.get('lives')).toBe(3)
    expect(GameState.get('combo')).toBe(0)
    expect(GameState.get('rewards')).toEqual([])
    expect(GameState.get('completedLevels')).toEqual([])
    expect(GameState.get('voiceGender')).toBe('feminina')
  })

  it('retorna copia do estado completo sem argumento', () => {
    const s = GameState.get()
    expect(s).toHaveProperty('currentScreen')
    expect(s).toHaveProperty('score')
  })
})

describe('GameState.set', () => {
  it('atualiza campo corretamente', () => {
    GameState.set({ score: 100 })
    expect(GameState.get('score')).toBe(100)
  })

  it('emite evento stateChange', () => {
    let emitted = false
    EventBus.on('stateChange', () => { emitted = true })
    GameState.set({ score: 50 })
    expect(emitted).toBe(true)
  })

  it('stateChange contem changed keys', () => {
    let data = null
    EventBus.on('stateChange', d => { data = d })
    GameState.set({ lives: 2 })
    expect(data.changed).toContain('lives')
  })

  it('atualiza multiplos campos de uma vez', () => {
    GameState.set({ score: 200, combo: 3 })
    expect(GameState.get('score')).toBe(200)
    expect(GameState.get('combo')).toBe(3)
  })
})

describe('GameState.reset', () => {
  it('volta ao estado inicial', () => {
    GameState.set({ score: 999, lives: 0, combo: 5 })
    GameState.reset()
    expect(GameState.get('score')).toBe(0)
    expect(GameState.get('lives')).toBe(3)
    expect(GameState.get('combo')).toBe(0)
  })
})

describe('GameState.startLevel', () => {
  it('reseta campos de fase corretamente', () => {
    GameState.set({ score: 500, lives: 1, combo: 4 })
    GameState.startLevel(2)
    expect(GameState.get('currentLevelId')).toBe(2)
    expect(GameState.get('score')).toBe(0)
    expect(GameState.get('lives')).toBe(3)
    expect(GameState.get('combo')).toBe(0)
    expect(GameState.get('currentQuestionIndex')).toBe(0)
  })
})

describe('GameState.registerError', () => {
  it('incrementa contador de erro da categoria', () => {
    GameState.registerError('verbo')
    GameState.registerError('verbo')
    expect(GameState.get('errors')['verbo']).toBe(2)
  })

  it('cria categoria nova se nao existir', () => {
    GameState.registerError('adjetivo')
    expect(GameState.get('errors')['adjetivo']).toBe(1)
  })

  it('nao interfere em outras categorias', () => {
    GameState.registerError('verbo')
    GameState.registerError('adjetivo')
    expect(GameState.get('errors')['verbo']).toBe(1)
    expect(GameState.get('errors')['adjetivo']).toBe(1)
  })
})

describe('GameState.addReward', () => {
  it('adiciona recompensa', () => {
    GameState.addReward('Chapéu de Explorador')
    expect(GameState.get('rewards')).toContain('Chapéu de Explorador')
  })

  it('nao duplica recompensa existente', () => {
    GameState.addReward('Chapéu de Explorador')
    GameState.addReward('Chapéu de Explorador')
    expect(GameState.get('rewards').length).toBe(1)
  })
})

describe('GameState.setLevelStars', () => {
  it('define estrelas de uma fase', () => {
    GameState.setLevelStars(1, 3)
    expect(GameState.get('stars')[1]).toBe(3)
  })

  it('nao substitui por valor menor', () => {
    GameState.setLevelStars(1, 3)
    GameState.setLevelStars(1, 1)
    expect(GameState.get('stars')[1]).toBe(3)
  })

  it('substitui por valor maior', () => {
    GameState.setLevelStars(1, 1)
    GameState.setLevelStars(1, 2)
    expect(GameState.get('stars')[1]).toBe(2)
  })
})

describe('GameState.completeLevel', () => {
  it('adiciona nivel completo', () => {
    GameState.completeLevel(1)
    expect(GameState.get('completedLevels')).toContain(1)
  })

  it('nao duplica nivel ja completo', () => {
    GameState.completeLevel(1)
    GameState.completeLevel(1)
    expect(GameState.get('completedLevels').length).toBe(1)
  })
})

describe('GameState.hydrate', () => {
  it('restaura dados do save', () => {
    GameState.hydrate({
      stars: { 1: 3, 2: 2 },
      errors: { verbo: 5 },
      rewards: ['Chapéu'],
      completedLevels: [1, 2],
      voiceGender: 'masculina'
    })
    expect(GameState.get('stars')[1]).toBe(3)
    expect(GameState.get('errors')['verbo']).toBe(5)
    expect(GameState.get('rewards')).toContain('Chapéu')
    expect(GameState.get('completedLevels')).toContain(2)
    expect(GameState.get('voiceGender')).toBe('masculina')
  })
})
