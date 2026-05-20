import { describe, it, expect, beforeEach } from 'vitest'
import ProgressionEngine from '../../js/engine/ProgressionEngine.js'
import GameState from '../../js/core/GameState.js'
import EventBus from '../../js/core/EventBus.js'
import Storage from '../../js/storage/Storage.js'

beforeEach(() => {
  GameState.reset()
  EventBus.clear()
  Storage.reset()
})

describe('isUnlocked', () => {
  it('fase 1 sempre desbloqueada', () => {
    expect(ProgressionEngine.isUnlocked(1, [])).toBe(true)
  })

  it('fase 2 bloqueada sem completar fase 1', () => {
    expect(ProgressionEngine.isUnlocked(2, [])).toBe(false)
  })

  it('fase 2 desbloqueada apos completar fase 1', () => {
    expect(ProgressionEngine.isUnlocked(2, [1])).toBe(true)
  })

  it('fase 3 bloqueada mesmo com fase 1 completa', () => {
    expect(ProgressionEngine.isUnlocked(3, [1])).toBe(false)
  })

  it('fase 3 desbloqueada apos completar fase 2', () => {
    expect(ProgressionEngine.isUnlocked(3, [1, 2])).toBe(true)
  })

  it('retorna false para fase inexistente', () => {
    expect(ProgressionEngine.isUnlocked(99, [1, 2, 3])).toBe(false)
  })
})

describe('isCompleted', () => {
  it('nao completada inicialmente', () => {
    expect(ProgressionEngine.isCompleted(1, [])).toBe(false)
  })

  it('completada apos adicionar ao array', () => {
    expect(ProgressionEngine.isCompleted(1, [1])).toBe(true)
  })
})

describe('getLevelStatus', () => {
  it('fase 1 disponivel inicialmente', () => {
    expect(ProgressionEngine.getLevelStatus(1)).toBe('available')
  })

  it('fase 2 bloqueada inicialmente', () => {
    expect(ProgressionEngine.getLevelStatus(2)).toBe('locked')
  })

  it('fase 1 concluida apos completeLevel', () => {
    ProgressionEngine.completeLevel(1, 3)
    expect(ProgressionEngine.getLevelStatus(1)).toBe('completed')
  })

  it('fase 2 disponivel apos completar fase 1', () => {
    ProgressionEngine.completeLevel(1, 2)
    expect(ProgressionEngine.getLevelStatus(2)).toBe('available')
  })
})

describe('completeLevel', () => {
  it('salva estrelas corretamente', () => {
    ProgressionEngine.completeLevel(1, 3)
    expect(GameState.get('stars')[1]).toBe(3)
  })

  it('adiciona recompensa ao state', () => {
    ProgressionEngine.completeLevel(1, 3)
    expect(GameState.get('rewards').length).toBeGreaterThan(0)
  })

  it('persiste no storage', () => {
    ProgressionEngine.completeLevel(1, 2)
    const loaded = Storage.load()
    expect(loaded).not.toBeNull()
    expect(loaded.completedLevels).toContain(1)
  })
})

describe('getAllLevelStatuses', () => {
  it('retorna 7 fases', () => {
    const statuses = ProgressionEngine.getAllLevelStatuses()
    expect(statuses.length).toBe(7)
  })

  it('primeira fase e available', () => {
    const statuses = ProgressionEngine.getAllLevelStatuses()
    expect(statuses[0].status).toBe('available')
  })

  it('demais fases sao locked inicialmente', () => {
    const statuses = ProgressionEngine.getAllLevelStatuses()
    statuses.slice(1).forEach(s => expect(s.status).toBe('locked'))
  })
})
