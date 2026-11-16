import type { ResearchBlock } from '../data/chapters'
import { SourceCitation } from './SourceCitation'

export function ResearchBlocks({ blocks, prefix }: { blocks: ResearchBlock[]; prefix: string }) {
  return <div className="research-article">{blocks.map((block, i) => block.technical ? <details className="technical-detail" id={`${prefix}-${i}`} key={block.title}>
    <summary>{block.title}</summary>{block.paragraphs.map((p, j) => <p key={j}>{p.text} <SourceCitation ids={p.sources} /></p>)}
  </details> : <section className="research-block" id={`${prefix}-${i}`} key={block.title}>
    <h3>{block.title}</h3>{block.paragraphs.map((p, j) => <p key={j}>{p.text} <SourceCitation ids={p.sources} /></p>)}
  </section>)}</div>
}
