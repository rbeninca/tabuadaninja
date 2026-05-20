import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      include: ['js/**/*.js'],
      exclude: ['js/data/**'],
      thresholds: { lines: 80 }
    }
  }
})
