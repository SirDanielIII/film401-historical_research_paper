import { legacyAnchors, sections } from '../../data/navigation/sections.ts'
import { trackDefinitions } from '../../data/narration/tracks.ts'

export function parseRoute(hash: string) {
  let route: string
  try { route = decodeURIComponent(hash.replace(/^#/, '')) } catch { return 'introduction' }
  const research = route.match(/^research-([1-5])-\d+$/)
  return legacyAnchors[route] ?? (research ? legacyAnchors[`chapter-${research[1]}`] : route || 'introduction')
}

export function sectionForRoute(route: string) {
  if (route === 'questions' || route.startsWith('question-')) return 'questions'
  if (route.startsWith('source-') || route.startsWith('credit-')) return 'references'
  return sections.find(section => section.id === route)?.id ?? 'introduction'
}

export function recordingForSection(section: string) {
  return trackDefinitions.find(track => track.sectionId === section)?.id
}

export function adjacentChapter(current: number, direction: 'ArrowLeft' | 'ArrowRight') {
  const next = current + (direction === 'ArrowRight' ? 1 : -1)
  return trackDefinitions.find(track => track.id === next)?.sectionId ?? null
}
