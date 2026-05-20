import { describe, it, expect } from 'vitest'
import ScoreEngine from '../../js/engine/ScoreEngine.js'

const baseState = { score: 0, combo: 0, correctCount: 0, wrongCount: 0, hintUsed: false }

describe('calcPoints', () => {
  it('acerto de primeira: +100', () => {
    expect(ScoreEngine.calcPoints(true, false)).toBe(100)
  })
  it('acerto com dica: +50', () => {
    expect(ScoreEngine.calcPoints(true, true)).toBe(50)
  })
  it('erro: 0 pontos', () => {
    expect(ScoreEngine.calcPoints(false, false)).toBe(0)
  })
})

describe('calcComboBonus', () => {
  it('combo < 3: sem bonus', () => {
    expect(ScoreEngine.calcComboBonus(2)).toBe(0)
  })
  it('combo = 3: +50', () => {
    expect(ScoreEngine.calcComboBonus(3)).toBe(50)
  })
  it('combo = 4: +50', () => {
    expect(ScoreEngine.calcComboBonus(4)).toBe(50)
  })
  it('combo = 5: +100', () => {
    expect(ScoreEngine.calcComboBonus(5)).toBe(100)
  })
  it('combo > 5: +100', () => {
    expect(ScoreEngine.calcComboBonus(8)).toBe(100)
  })
})

describe('calcStars', () => {
  it('10/10 acertos: 3 estrelas', () => {
    expect(ScoreEngine.calcStars(10, 10)).toBe(3)
  })
  it('9/10 acertos: 3 estrelas', () => {
    expect(ScoreEngine.calcStars(9, 10)).toBe(3)
  })
  it('8/10 acertos: 2 estrelas', () => {
    expect(ScoreEngine.calcStars(8, 10)).toBe(2)
  })
  it('7/10 acertos: 2 estrelas', () => {
    expect(ScoreEngine.calcStars(7, 10)).toBe(2)
  })
  it('6/10 acertos: 1 estrela', () => {
    expect(ScoreEngine.calcStars(6, 10)).toBe(1)
  })
  it('5/10 acertos: 1 estrela', () => {
    expect(ScoreEngine.calcStars(5, 10)).toBe(1)
  })
  it('4/10 acertos: 0 estrelas', () => {
    expect(ScoreEngine.calcStars(4, 10)).toBe(0)
  })
})

describe('applyAnswer', () => {
  it('acerto incrementa score e combo', () => {
    const result = ScoreEngine.applyAnswer(baseState, true)
    expect(result.score).toBe(100)
    expect(result.combo).toBe(1)
    expect(result.correctCount).toBe(1)
    expect(result.wrongCount).toBe(0)
  })

  it('erro zera combo e nao incrementa score', () => {
    const state = { ...baseState, combo: 4, score: 300 }
    const result = ScoreEngine.applyAnswer(state, false)
    expect(result.combo).toBe(0)
    expect(result.score).toBe(300)
    expect(result.wrongCount).toBe(1)
  })

  it('combo 3 gera bonus de 50', () => {
    const state = { ...baseState, combo: 2, score: 200 }
    const result = ScoreEngine.applyAnswer(state, true)
    expect(result.combo).toBe(3)
    expect(result.lastBonus).toBe(50)
    expect(result.score).toBe(200 + 100 + 50)
  })

  it('combo 5 gera bonus de 100', () => {
    const state = { ...baseState, combo: 4, score: 400 }
    const result = ScoreEngine.applyAnswer(state, true)
    expect(result.combo).toBe(5)
    expect(result.lastBonus).toBe(100)
  })
})
