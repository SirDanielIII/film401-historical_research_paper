import { titleCase } from '../../utils/titleCase'
import type { ReactNode } from 'react'
import { ResearchBlocks } from '../research/ResearchSection'
import type { ResearchBlock } from '../../data/content/chapters'
import { Icon } from '../ui/Icon'
import { audioPaths } from '../../data/narration'
import { trackDefinitions } from '../../data/narration/tracks'
import availableAudio from '../../data/narration/available-audio.json'

export function ChapterLayout({ id, number, period, title, introduction, accent = 'green', onListen, blocks, leadBlocks = [], children, researchAside, afterResearchBlock }: { id: string; number: string; period: string; title: string; introduction: string; accent?: string; onListen: (chapter: number, control?: HTMLElement) => void; blocks: ResearchBlock[]; leadBlocks?: ResearchBlock[]; children: ReactNode; researchAside?: ReactNode; afterResearchBlock?: { title: string; content: ReactNode } }) {
  const recording = trackDefinitions.find(track => track.sectionId === id)!.id
  const hasRecording = Boolean((availableAudio as Record<string, string | null>)[audioPaths[recording]])
  return <section className={`major-section chapter accent-${accent}`} id={id} aria-labelledby={`${id}-title`}>
    <header className="section-heading"><div className="section-label"><span>{number}</span><p className="eyebrow">{period}</p></div><div><h2 id={`${id}-title`} tabIndex={-1}>{titleCase(title)}</h2><p className="section-intro">{introduction}</p></div><button className="listen-button" onClick={event => onListen(recording, event.currentTarget)}><Icon name={hasRecording ? 'volume' : 'book'} /><span>{hasRecording ? 'Listen' : 'Transcript'}<span className="listen-meta">Chapter {recording}</span></span></button></header>
    <div className="section-visuals">{leadBlocks.length > 0 && <div className="narrative-lead"><ResearchBlocks prefix={`intro-${id}`} blocks={leadBlocks} /></div>}{children}</div>
    <div className="research-layout"><aside className="research-aside">{researchAside ?? <h3>{titleCase(title)}</h3>}</aside><ResearchBlocks prefix={`research-${id}`} blocks={blocks} afterBlock={afterResearchBlock} /></div>
  </section>
}
