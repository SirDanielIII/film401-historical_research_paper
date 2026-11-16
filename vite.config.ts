import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { readFileSync, rmSync } from 'node:fs'
import { resolve, relative } from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), {
    name: 'exclude-disabled-reference-media',
    apply: 'build',
    writeBundle(options) {
      const media = JSON.parse(readFileSync(new URL('./src/data/media-manifest.json', import.meta.url), 'utf8')) as { enabled: boolean; path: string }[]
      const output = resolve(options.dir ?? 'dist')
      for (const item of media.filter(item => !item.enabled)) {
        if (!item.path.startsWith('media/images/') || item.path.includes('..')) throw new Error('Invalid media path')
        const target = resolve(output, item.path)
        if (relative(output, target).startsWith('..')) throw new Error('Media path escaped build directory')
        // Vite copies public/ verbatim. Hiding an asset in React alone would
        // still publish it, so remove disabled copies from the output too.
        rmSync(target, { force: true })
      }
    },
  }],
  base: './', // Portable standalone build; see INTEGRATION.md for a React route.
})
