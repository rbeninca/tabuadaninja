import { describe, it, expect, beforeEach } from 'vitest'
import EventBus from '../../js/core/EventBus.js'

beforeEach(() => EventBus.clear())

describe('EventBus.on / emit', () => {
  it('chama o listener ao emitir o evento', () => {
    let called = false
    EventBus.on('teste', () => { called = true })
    EventBus.emit('teste')
    expect(called).toBe(true)
  })

  it('passa dados para o listener', () => {
    let received = null
    EventBus.on('dados', d => { received = d })
    EventBus.emit('dados', { valor: 42 })
    expect(received).toEqual({ valor: 42 })
  })

  it('chama multiplos listeners no mesmo evento', () => {
    let count = 0
    EventBus.on('multi', () => count++)
    EventBus.on('multi', () => count++)
    EventBus.emit('multi')
    expect(count).toBe(2)
  })

  it('nao interfere em eventos diferentes', () => {
    let a = false, b = false
    EventBus.on('evA', () => { a = true })
    EventBus.on('evB', () => { b = true })
    EventBus.emit('evA')
    expect(a).toBe(true)
    expect(b).toBe(false)
  })
})

describe('EventBus.off', () => {
  it('remove listener registrado', () => {
    let count = 0
    const cb = () => count++
    EventBus.on('rem', cb)
    EventBus.off('rem', cb)
    EventBus.emit('rem')
    expect(count).toBe(0)
  })

  it('nao remove outros listeners', () => {
    let a = 0, b = 0
    const cbA = () => a++
    EventBus.on('rem2', cbA)
    EventBus.on('rem2', () => b++)
    EventBus.off('rem2', cbA)
    EventBus.emit('rem2')
    expect(a).toBe(0)
    expect(b).toBe(1)
  })
})

describe('EventBus.emit sem listeners', () => {
  it('nao lanca erro ao emitir evento sem listeners', () => {
    expect(() => EventBus.emit('inexistente')).not.toThrow()
  })
})

describe('EventBus: unsubscribe via retorno de on', () => {
  it('unsubscribe funciona via funcao retornada', () => {
    let count = 0
    const unsub = EventBus.on('unsub', () => count++)
    EventBus.emit('unsub')
    unsub()
    EventBus.emit('unsub')
    expect(count).toBe(1)
  })
})
