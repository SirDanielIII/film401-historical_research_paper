import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = fileURLToPath(new URL('../', import.meta.url))
const stems = ['01-introduction', '02-biography', '03-colour-difference', '04-sodium-vapour', '05-legacy']
mkdirSync(path.join(root, 'public/media/audio'), { recursive: true })
const manifest = Object.fromEntries(stems.map(stem => {
  const file = ['mp3', 'm4a', 'wav', 'ogg'].map(ext => `media/audio/${stem}.${ext}`).find(file => existsSync(path.join(root, 'public', file)))
  return [`media/audio/${stem}.mp3`, file ?? null]
}))
writeFileSync(path.join(root, 'src/data/available-audio.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log(`Local narration: ${Object.values(manifest).filter(Boolean).length}/5 recordings available.`)
await import('./export-script.mjs')
