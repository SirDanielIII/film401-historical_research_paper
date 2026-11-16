// Explicit test tone, never narration. Create only for browser QA; always clean afterward.
import { createHash } from 'node:crypto'
import { existsSync, readFileSync, writeFileSync, unlinkSync } from 'node:fs'
import { trackDefinitions } from '../src/data/narration/tracks.ts'
const dir = new URL('../public/media/audio/', import.meta.url)
const stateFile = new URL('../tests/.audio-fixture-state.json', import.meta.url)
const paths = trackDefinitions.map(track => track.audioFilename.replace(/mp3$/, 'wav'))
const digest = buffer => createHash('sha256').update(buffer).digest('hex')
if (process.argv[2] === 'prepare') {
  const recordingFiles = paths.flatMap(p => ['mp3', 'wav', 'm4a', 'ogg'].map(ext => p.replace(/wav$/, ext)))
  if (existsSync(stateFile) || recordingFiles.some(p => existsSync(new URL(p, dir)))) throw new Error('Fixture or recording exists; refusing to overwrite.')
  const rate = 16000, samples = rate * 12
  const buffer = Buffer.alloc(44 + samples * 2)
  buffer.write('RIFF', 0); buffer.writeUInt32LE(buffer.length - 8, 4); buffer.write('WAVEfmt ', 8)
  buffer.writeUInt32LE(16, 16); buffer.writeUInt16LE(1, 20); buffer.writeUInt16LE(1, 22)
  buffer.writeUInt32LE(rate, 24); buffer.writeUInt32LE(rate * 2, 28); buffer.writeUInt16LE(2, 32); buffer.writeUInt16LE(16, 34)
  buffer.write('data', 36); buffer.writeUInt32LE(samples * 2, 40)
  for (let i = 0; i < samples; i++) buffer.writeInt16LE(Math.round(Math.sin(i / rate * 440 * 2 * Math.PI) * 250), 44 + i * 2)
  paths.forEach(p => writeFileSync(new URL(p, dir), buffer))
  writeFileSync(stateFile, JSON.stringify({ paths, digest: digest(buffer) }))
  console.log(`${paths.length} quiet 12-second TEST TONES prepared. Not narration. Run npm run test:audio:clean after QA.`)
} else if (process.argv[2] === 'clean') {
  if (!existsSync(stateFile)) throw new Error('No fixture state; no files removed.')
  const state = JSON.parse(readFileSync(stateFile, 'utf8'))
  for (const p of state.paths) {
    if (!paths.includes(p)) throw new Error('Unexpected fixture path')
    const file = new URL(p, dir)
    if (digest(readFileSync(file)) !== state.digest) throw new Error('File changed; refusing to remove a possible recording.')
    unlinkSync(file)
  }
  unlinkSync(stateFile)
  console.log('Test tones removed.')
} else throw new Error('Use prepare or clean')
await import('./prepare-media.mjs')
