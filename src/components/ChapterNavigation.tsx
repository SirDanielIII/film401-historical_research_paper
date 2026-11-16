import { chapters } from '../data/chapters'
export function ChapterNavigation({ active }: { active: number }) {
  return <nav className="chapter-nav" aria-label="Historical chapters">{chapters.map(chapter => <a key={chapter.id} href={`#chapter-${chapter.id}`} className={`accent-${chapter.accent} ${active === chapter.id ? 'active' : ''}`} aria-current={active === chapter.id ? 'step' : undefined}><span>0{chapter.id}</span><span>{chapter.shortTitle}</span>{active === chapter.id && <span className="current-dot" />}</a>)}</nav>
}
