import { useState, type ReactNode } from 'react'
import { ResearchBlocks } from './ResearchSection'
import type { ResearchBlock } from '../data/chapters'
import { Icon } from './Icon'
import { audioPaths } from '../data/narration'
import availableAudio from '../data/available-audio.json'

export function ChapterLayout({ id, number, period, title, introduction, accent = 'lavender', recording, onListen, blocks, leadBlocks = [], children, researchAside }: { id: string; number: string; period: string; title: string; introduction: string; accent?: string; recording: number; onListen: (chapter: number) => void; blocks: ResearchBlock[]; leadBlocks?: ResearchBlock[]; children: ReactNode; researchAside?: ReactNode }) {
  const [research, setResearch] = useState(false)
  const hasRecording = Boolean((availableAudio as Record<string, string | null>)[audioPaths[recording - 1]])
  return <section className={`major-section chapter accent-${accent} ${research ? 'show-research' : ''}`} id={id} aria-labelledby={`${id}-title`}>
    <header className="section-heading"><div className="section-label"><span>{number}</span><p className="eyebrow">{period}</p></div><div><h2 id={`${id}-title`} tabIndex={-1}>{title}</h2><p className="section-intro">{introduction}</p></div><button className="listen-button" onClick={() => onListen(recording)}><Icon name={hasRecording ? 'volume' : 'book'} /><span>{hasRecording ? 'Listen' : 'Transcript'}<span className="listen-meta">Chapter {recording} of 5</span></span></button></header>
    <div className="section-visuals">{leadBlocks.length > 0 && <div className="narrative-lead"><ResearchBlocks prefix={`intro-${id}`} blocks={leadBlocks} /></div>}{children}</div>
    <button className="focus-research-toggle text-button" aria-expanded={research} onClick={() => setResearch(!research)}>{research ? 'Hide' : 'Show'} section details <Icon name="chevron" /></button>
    <div className="research-layout"><aside className="research-aside">{researchAside ?? <h3>{title}</h3>}</aside><ResearchBlocks prefix={`research-${id}`} blocks={blocks} /></div>
  </section>
}
