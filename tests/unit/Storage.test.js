import { describe, it, expect, beforeEach } from 'vitest'
import Storage from '../../js/storage/Storage.js'

beforeEach(() => Storage.reset())

const validSave = {
  version: 1,
  currentLevel: 1,
  totalPoints: 0,
  stars: {},
  errors: {},
  rewards: [],
  completedLevels: []
}

describe('Storage.save e load', () => {
  it('salva e recupera dado valido', () => {
    Storage.save({ stars: { 1: 3 }, errors: {}, rewards: [], completedLevels: [] })
    const loaded = Storage.load()
    expect(loaded).not.toBeNull()
    expect(loaded.stars).toEqual({ 1: 3 })
  })

  it('load retorna null quando nao ha save', () => {
    expect(Storage.load()).toBeNull()
  })
})

describe('Storage.validate', () => {
  it('valida estrutura correta', () => {
    expect(Storage.validate(validSave)).toBe(true)
  })

  it('invalida dado null', () => {
    expect(Storage.validate(null)).toBe(false)
  })

  it('invalida dado sem campo obrigatorio', () => {
    const { rewards, ...sem } = validSave
    expect(Storage.validate(sem)).toBe(false)
  })

  it('invalida se totalPoints nao for number', () => {
    expect(Storage.validate({ ...validSave, totalPoints: 'abc' })).toBe(false)
  })

  it('invalida dado corrompido (string)', () => {
    expect(Storage.validate('corrompido')).toBe(false)
  })
})

describe('Storage.reset', () => {
  it('remove o save do localStorage', () => {
    Storage.save(validSave)
    Storage.reset()
    expect(Storage.load()).toBeNull()
  })
})

describe('Storage.exists', () => {
  it('retorna false quando nao ha save', () => {
    expect(Storage.exists()).toBe(false)
  })

  it('retorna true apos salvar', () => {
    Storage.save(validSave)
    expect(Storage.exists()).toBe(true)
  })
})

describe('Storage: dado JSON corrompido', () => {
  it('load retorna null ao encontrar JSON invalido', () => {
    localStorage.setItem(Storage.KEY, 'nao_e_json{{{')
    expect(Storage.load()).toBeNull()
  })
})
