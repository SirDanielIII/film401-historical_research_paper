import { useState, type ReactNode } from 'react'
import { ResearchBlocks } from './ResearchSection'
import type { ResearchBlock } from '../data/chapters'
import { Icon } from './Icon'

export function ChapterLayout({ id, number, period, title, introduction, accent = 'lavender', recording, onListen, blocks, children, researchAside }: { id: string; number: string; period: string; title: string; introduction: string; accent?: string; recording: number; onListen: (chapter: number) => void; blocks: ResearchBlock[]; children: ReactNode; researchAside?: ReactNode }) {
  const [research, setResearch] = useState(false)
  return <section className={`major-section chapter accent-${accent} ${research ? 'show-research' : ''}`} id={id} aria-labelledby={`${id}-title`}>
    <header className="section-heading"><div className="section-label"><span>{number}</span><p className="eyebrow">{period}</p></div><div><h2 id={`${id}-title`} tabIndex={-1}>{title}</h2><p className="section-intro">{introduction}</p></div><button className="listen-button" onClick={() => onListen(recording)}><Icon name="volume" /><span>Listen<span className="listen-meta">Chapter {recording} of 5</span></span></button></header>
    <div className="section-visuals">{children}</div>
    <button className="focus-research-toggle text-button" aria-expanded={research} onClick={() => setResearch(!research)}>{research ? 'Hide' : 'Show'} detailed research <Icon name="chevron" /></button>
    <div className="research-layout"><aside className="research-aside"><p className="eyebrow">THE RESEARCH</p>{researchAside ?? <><h3>Read beyond the presentation</h3><p>The narration is a summary. The evidence and historical qualifications continue here.</p></>}</aside><ResearchBlocks prefix={`research-${id}`} blocks={blocks} /></div>
  </section>
}
