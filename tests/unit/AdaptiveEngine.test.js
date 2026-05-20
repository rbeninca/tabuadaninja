import { describe, it, expect } from 'vitest'
import AdaptiveEngine from '../../js/engine/AdaptiveEngine.js'
import { questions } from '../../js/data/questions.js'

describe('getQuestionsForLevel', () => {
  it('retorna exatamente 10 questoes para fase 1', () => {
    const qs = AdaptiveEngine.getQuestionsForLevel(1)
    expect(qs.length).toBe(10)
  })

  it('retorna apenas questoes da fase correta', () => {
    const qs = AdaptiveEngine.getQuestionsForLevel(2)
    qs.forEach(q => expect(q.levelId).toBe(2))
  })

  it('nao repete a mesma questao (ids unicos)', () => {
    const qs = AdaptiveEngine.getQuestionsForLevel(1)
    const ids = qs.map(q => q.id)
    const unique = new Set(ids)
    expect(unique.size).toBe(ids.length)
  })

  it('retorna array vazio para fase inexistente', () => {
    const qs = AdaptiveEngine.getQuestionsForLevel(99)
    expect(qs).toEqual([])
  })
})

describe('getQuestionsForLevel com erros', () => {
  it('com muitos erros em categoria, questoes dessa categoria aparecem', () => {
    const errors = { substantivo_proprio_comum: 10 }
    const runs = 5
    let found = 0
    for (let i = 0; i < runs; i++) {
      const qs = AdaptiveEngine.getQuestionsForLevel(1, errors)
      if (qs.some(q => q.category === 'substantivo_proprio_comum')) found++
    }
    expect(found).toBeGreaterThan(0)
  })
})

describe('getQuestionsForReview', () => {
  it('retorna questoes quando ha erros', () => {
    const errors = { verbo: 5, adjetivo: 3 }
    const qs = AdaptiveEngine.getQuestionsForReview(errors)
    expect(qs.length).toBeGreaterThan(0)
  })

  it('prioriza categoria com mais erros', () => {
    const errors = { verbo: 10 }
    const qs = AdaptiveEngine.getQuestionsForReview(errors, 10)
    const verbCount = qs.filter(q => q.category === 'verbo').length
    expect(verbCount).toBeGreaterThan(0)
  })

  it('sem erros: retorna questoes da fase 7', () => {
    const qs = AdaptiveEngine.getQuestionsForReview({})
    expect(qs.length).toBeGreaterThan(0)
  })
})

describe('getTopErrorCategories', () => {
  it('retorna categorias ordenadas por erro', () => {
    const errors = { verbo: 5, adjetivo: 2, substantivo_coletivo: 8 }
    const top = AdaptiveEngine.getTopErrorCategories(errors, 2)
    expect(top[0].category).toBe('substantivo_coletivo')
    expect(top[1].category).toBe('verbo')
  })

  it('retorna no maximo N categorias', () => {
    const errors = { a: 1, b: 2, c: 3, d: 4 }
    const top = AdaptiveEngine.getTopErrorCategories(errors, 2)
    expect(top.length).toBe(2)
  })
})

describe('shuffle', () => {
  it('retorna array de mesmo tamanho', () => {
    const arr = [1, 2, 3, 4, 5]
    expect(AdaptiveEngine.shuffle(arr).length).toBe(5)
  })

  it('nao modifica o array original', () => {
    const arr = [1, 2, 3]
    AdaptiveEngine.shuffle(arr)
    expect(arr).toEqual([1, 2, 3])
  })
})

describe('integridade do banco de questoes', () => {
  it('todas as questoes tem id unico', () => {
    const ids = questions.map(q => q.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('todas as questoes tem campos obrigatorios', () => {
    const required = ['id', 'levelId', 'type', 'category', 'instruction', 'explanation']
    questions.forEach(q => {
      required.forEach(field => {
        expect(q, `questao ${q.id} sem campo ${field}`).toHaveProperty(field)
      })
    })
  })

  it('cada fase tem pelo menos 10 questoes', () => {
    for (let i = 1; i <= 7; i++) {
      const count = questions.filter(q => q.levelId === i).length
      expect(count, `fase ${i} tem menos de 10 questoes`).toBeGreaterThanOrEqual(10)
    }
  })

  it('tipos de questao sao validos', () => {
    const validTypes = ['drag-category', 'complete-word', 'select-word', 'match-pairs', 'build-sentence']
    questions.forEach(q => {
      expect(validTypes, `tipo invalido: ${q.type} em ${q.id}`).toContain(q.type)
    })
  })

  it('questoes drag-category tem items e targets', () => {
    questions.filter(q => q.type === 'drag-category').forEach(q => {
      expect(q).toHaveProperty('items')
      expect(q).toHaveProperty('targets')
      expect(Array.isArray(q.items)).toBe(true)
    })
  })

  it('questoes complete-word tem wordTemplate e correct', () => {
    questions.filter(q => q.type === 'complete-word').forEach(q => {
      expect(q).toHaveProperty('wordTemplate')
      expect(q).toHaveProperty('correct')
    })
  })

  it('questoes select-word tem sentence e correct', () => {
    questions.filter(q => q.type === 'select-word').forEach(q => {
      expect(q).toHaveProperty('sentence')
      expect(q).toHaveProperty('correct')
    })
  })

  it('questoes match-pairs tem pairs', () => {
    questions.filter(q => q.type === 'match-pairs').forEach(q => {
      expect(q).toHaveProperty('pairs')
      expect(Array.isArray(q.pairs)).toBe(true)
    })
  })
})
