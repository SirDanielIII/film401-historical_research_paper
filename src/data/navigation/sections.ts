import { trackDefinitions } from '../narration/tracks.ts'

export const sections = [
  { id: 'introduction', label: 'Introduction', number: '00' },
  { id: 'biography', label: 'Who Was Vlahos?', number: '01' },
  { id: 'before-vlahos', label: 'Before Vlahos', number: '02' },
  { id: 'colour-difference', label: 'Colour Difference', number: '03' },
  { id: 'sodium-vapour', label: 'Sodium Vapour', number: '04' },
  { id: 'legacy', label: 'Ultimatte & Legacy', number: '05' },
  { id: 'references', label: 'References', number: '06' },
] as const

type SectionId = typeof sections[number]['id'] | 'questions' | 'main-content'

// Section targets are rendered across components, rather than in one HTML file.
export function sectionHref(id: SectionId): `#${SectionId}` {
  return `#${id}`
}
export const recordingSections = trackDefinitions.map(track => track.sectionId)
export const recordingLabels = trackDefinitions.map(track => track.label)
export const legacyAnchors: Record<string, string> = {
  home: 'introduction', 'chapter-1': 'introduction', 'chapter-2': 'biography', 'chapter-3': 'colour-difference',
  'chapter-4': 'sodium-vapour', 'chapter-5': 'legacy', sources: 'references', glossary: 'questions',
}
