import { readFileSync, writeFileSync } from 'node:fs'
const chapters = [
  ['01-introduction', 'Introduction'],
  ['02-biography', 'An engineer enters Hollywood'],
  ['03-colour-difference', 'Before Vlahos and colour difference'],
  ['04-sodium-vapour', 'Sodium vapour and Mary Poppins'],
  ['05-legacy', 'Ultimatte and legacy'],
]
const time = seconds => `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, '0')}`
let words = 0
const sections = chapters.map(([file, title], i) => {
  const text = readFileSync(new URL(`../src/data/narration/${file}.txt`, import.meta.url), 'utf8').trim()
  const count = text.split(/\s+/).length
  words += count
  return `${i + 1}. ${title.toUpperCase()}\nFile: ${file}.mp3 | ${count} words | About ${time(count / 140 * 60)} at 140 wpm\n\n${text}`
})
writeFileSync(new URL('../public/recording-script.txt', import.meta.url), `BEYOND THE GREEN SCREEN\nPetro Vlahos and the Evolution of Special Effects\nFILM 401 | Presentation narration\n\n${words} spoken words. About ${time(words / 140 * 60)} at 140 words per minute, before demonstration pauses. Rehearse at your own pace.\nRead the paragraphs; headings and file names are not spoken.\n\n${sections.join('\n\n' + '—'.repeat(48) + '\n\n')}\n\nSources and further questions are available in the exhibit.\n`)
console.log(`Recording script exported: ${words} spoken words across five chapters.`)
