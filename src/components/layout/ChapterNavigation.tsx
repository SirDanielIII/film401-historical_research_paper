import { trackDefinitions } from '../../data/narration/tracks'
export function ChapterNavigation({ active }: { active: number }) {
  return <nav className="chapter-nav" aria-label="Historical chapters">{trackDefinitions.map(track => <a key={track.id} href={`#${track.sectionId}`} className={active === track.id ? 'active' : ''} aria-current={active === track.id ? 'step' : undefined}><span>0{track.id}</span><span>{track.label}</span>{active === track.id && <span className="current-dot" />}</a>)}</nav>
}
