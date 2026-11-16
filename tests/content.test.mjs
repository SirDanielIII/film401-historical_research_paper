import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, existsSync } from 'node:fs'
import { chapters } from '../src/data/chapters.ts'
import { sources } from '../src/data/sources.ts'
import { contextBlocks, legacyBlocks, priorArtBlocks } from '../src/data/context.ts'
import { formatTime } from '../src/lib/playback.ts'

const read = file => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')
const media = JSON.parse(read('src/data/media-manifest.json'))
const questions = JSON.parse(read('src/data/questions.json'))
const sourceIds = new Set(sources.map(s => s.id))

test('research and all 24 classroom answers retain valid citations', () => {
  const paragraphs = [...chapters.flatMap(c => c.blocks), ...contextBlocks, ...legacyBlocks, ...priorArtBlocks].flatMap(b => b.paragraphs)
  for (const p of [...paragraphs, ...questions]) {
    assert.ok(p.sources.length)
    p.sources.forEach(id => assert.ok(sourceIds.has(id), `Missing reference ${id}`))
  }
  assert.equal(questions.length, 24)
  assert.equal(new Set(questions.map(q => q.id)).size, 24)
  assert.equal(new Set(questions.map(q => q.topic)).size, 7)
})

test('all thirteen original bibliography links survive the DOCX extraction and redesign', () => {
  const text = read('research/Petro_Vlahos_Expanded_Research_and_Class_QA.txt')
  const urls = text.split('HYPERLINK TARGETS')[1].trim().split(/\r?\n/)
  assert.equal(new Set(sources.map(s => s.id)).size, sources.length)
  for (let n = 1; n <= 13; n++) assert.ok(sourceIds.has(`S${n}`))
  for (const url of urls) assert.ok(sources.some(s => s.url === url), `Original URL missing: ${url}`)
  sources.forEach(s => assert.equal(new URL(s.url).protocol, 'https:'))
})

test('five editable scripts total 650–750 spoken words; research has no upper word limit', () => {
  const files = readdirSync(new URL('../src/data/narration/', import.meta.url)).filter(f => f.endsWith('.txt')).sort()
  assert.equal(files.length, 5)
  const scripts = files.map(f => read(`src/data/narration/${f}`).trim())
  const count = scripts.reduce((sum, s) => sum + s.split(/\s+/).length, 0)
  assert.ok(count >= 650 && count <= 750, `Narration: ${count} words`)
  const research = [...chapters.flatMap(c => c.blocks), ...contextBlocks, ...legacyBlocks, ...priorArtBlocks].flatMap(b => b.paragraphs).map(p => p.text)
  assert.ok(research.join(' ').split(/\s+/).length > count * 5)
  scripts.forEach(s => assert.ok(!research.includes(s)))
  assert.ok(!scripts.some(s => /[a-z]\?[a-z]/i.test(s)), 'Damaged punctuation in narration')
})

test('every manifest asset is local, replaceable, credited and has a rights record', () => {
  assert.ok(media.length >= 10)
  assert.equal(new Set(media.map(m => m.id)).size, media.length)
  for (const m of media) {
    for (const field of ['id', 'path', 'subject', 'alt', 'caption', 'sourceTitle', 'sourceUrl', 'originalUrl', 'creator', 'rights', 'section', 'kind']) assert.ok(m[field], `${m.id}: missing ${field}`)
    assert.ok(m.path.startsWith('media/images/') && !m.path.includes('..'))
    assert.ok(existsSync(new URL(`../public/${m.path}`, import.meta.url)), m.path)
    assert.equal(new URL(m.sourceUrl).protocol, 'https:')
    assert.ok(m.width > 100 && m.height > 100)
  }
  for (const font of ['BRLNSR', 'BRLNSD', 'BRLNSB']) {
    const data = readFileSync(new URL(`../public/fonts/${font}.TTF`, import.meta.url))
    assert.equal(data.readUInt32BE(0), 0x00010000, `${font} is a TrueType font`)
  }
})

test('audio time display handles unloaded and invalid durations', () => {
  assert.equal(formatTime(78.4), '1:18')
  for (const input of [0, Infinity, NaN, -1]) assert.equal(formatTime(input), '0:00')
})
