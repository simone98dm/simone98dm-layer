import { fileURLToPath } from 'node:url'
import { describe, it, expect } from 'vitest'
import { setup, $fetch } from '@nuxt/test-utils/e2e'

describe('layer', async () => {
  await setup({
    rootDir: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
  })

  it('auto-imports AppFooter and renders its default content', async () => {
    const html = await $fetch('/')

    expect(html).toContain('<footer class="app-footer"')
    expect(html).toContain(`© ${new Date().getFullYear()}`)
  })

  it('lets the consumer override the content via the default slot', async () => {
    const html = await $fetch('/')

    expect(html).toContain('custom content')
  })
})
