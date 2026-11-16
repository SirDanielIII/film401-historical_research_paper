import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { trackDefinitions } from '../src/data/narration/tracks.ts'

const root = fileURLToPath(new URL('../', import.meta.url))
const stems = trackDefinitions.map(track => track.audioFilename.replace(/\.mp3$/, ''))
mkdirSync(path.join(root, 'public/media/audio'), { recursive: true })
const manifest = Object.fromEntries(stems.map(stem => {
  const file = ['mp3', 'm4a', 'wav', 'ogg'].map(ext => `media/audio/${stem}.${ext}`).find(file => existsSync(path.join(root, 'public', file)))
  return [`media/audio/${stem}.mp3`, file ?? null]
}))
writeFileSync(path.join(root, 'src/data/narration/available-audio.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log(`Local narration: ${Object.values(manifest).filter(Boolean).length}/${stems.length} recordings available.`)
