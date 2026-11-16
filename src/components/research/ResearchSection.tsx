import { titleCase } from '../../utils/titleCase'
import type { ResearchBlock } from '../../data/content/chapters'
import { Fragment, type ReactNode } from 'react'
import { SourceCitation } from './SourceCitation'

export function ResearchBlocks({ blocks, prefix, afterBlock }: { blocks: ResearchBlock[]; prefix: string; afterBlock?: { title: string; content: ReactNode } }) {
  return <div className="research-article">{blocks.map((block, i) => <Fragment key={titleCase(block.title)}>{block.technical ? <details className="technical-detail" id={`${prefix}-${i}`}>
    <summary>{titleCase(block.title)}</summary>{block.paragraphs.map((p, j) => <p key={j}>{p.text} <SourceCitation ids={p.sources} /></p>)}
  </details> : <section className="research-block" id={`${prefix}-${i}`}>
    <h3>{titleCase(block.title)}</h3>{block.paragraphs.map((p, j) => <p key={j}>{p.text} <SourceCitation ids={p.sources} /></p>)}
  </section>}{afterBlock?.title === block.title && afterBlock.content}</Fragment>)}</div>
}
