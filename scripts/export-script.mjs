import { readFileSync } from 'node:fs'
import { trackDefinitions } from '../src/data/narration/tracks.ts'
const time = seconds => `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, '0')}`
let words = 0
const sections = trackDefinitions.map(({ audioFilename, transcriptFilename, label, id }) => {
  const text = readFileSync(new URL(`../src/data/narration/scripts/${transcriptFilename}`, import.meta.url), 'utf8')
  const count = text.trim() ? text.trim().split(/\s+/).length : 0
  words += count
  if (!text.trim()) console.warn(`Transcript required: src/data/narration/scripts/${transcriptFilename}`)
  return `${id}. ${label.toUpperCase()}\nFile: ${audioFilename} | ${count} words | About ${time(count / 140 * 60)} at 140 wpm\n\n${text || '[Final transcript not supplied]'}`
})
process.stdout.write( `BEYOND THE GREEN SCREEN\nPetro Vlahos and the Evolution of Special Effects\nFILM 401 | Presentation narration\n\n${words} spoken words. About ${time(words / 140 * 60)} at 140 words per minute, before demonstration pauses. Rehearse at your own pace.\nRead the paragraphs; headings and file names are not spoken.\n\n${sections.join('\n\n' + '—'.repeat(48) + '\n\n')}\n\nSources and further questions are available in the exhibit.\n`)
console.error(`Recording script: ${words} spoken words across ${trackDefinitions.length} recordings.`)
