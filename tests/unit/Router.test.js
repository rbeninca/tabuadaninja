import { describe, it, expect, beforeEach, vi } from 'vitest'
import Router from '../../js/core/Router.js'
import GameState from '../../js/core/GameState.js'
import EventBus from '../../js/core/EventBus.js'

beforeEach(() => {
  GameState.reset()
  EventBus.clear()
  document.body.innerHTML = `
    <div id="screen-home" class="screen"></div>
    <div id="screen-map" class="screen"></div>
    <div id="screen-level" class="screen"></div>
    <div id="screen-result" class="screen"></div>
    <div id="screen-progress" class="screen"></div>
  `
})

describe('Router.navigate', () => {
  it('ativa a tela correta no DOM', () => {
    Router.navigate('map')
    expect(document.getElementById('screen-map').classList.contains('active')).toBe(true)
  })

  it('desativa tela anterior', () => {
    Router.navigate('home')
    Router.navigate('map')
    expect(document.getElementById('screen-home').classList.contains('active')).toBe(false)
  })

  it('atualiza GameState.currentScreen', () => {
    Router.navigate('result')
    expect(GameState.get('currentScreen')).toBe('result')
  })

  it('emite evento navigate', () => {
    let nav = null
    EventBus.on('navigate', d => { nav = d })
    Router.navigate('map')
    expect(nav).toMatchObject({ to: 'map' })
  })

  it('nao navega para tela invalida', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    Router.navigate('invalida')
    expect(document.querySelectorAll('.screen.active').length).toBe(0)
    warn.mockRestore()
  })

  it('chama render do modulo registrado', () => {
    const mockScreen = { render: vi.fn() }
    Router.register('home', mockScreen)
    Router.navigate('home')
    expect(mockScreen.render).toHaveBeenCalled()
  })
})

describe('Router.getCurrentScreen', () => {
  it('retorna tela atual', () => {
    Router.navigate('progress')
    expect(Router.getCurrentScreen()).toBe('progress')
  })
})
