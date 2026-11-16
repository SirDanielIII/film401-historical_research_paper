import { sourceById } from '../data/sources'

export function SourceCitation({ ids }: { ids: string[] }) {
  return <span className="citations">{ids.map(id => <a key={id} href={`#source-${id}`} title={sourceById[id]?.title} aria-label={`Reference ${id.slice(1)}: ${sourceById[id]?.title}`}>[{id.slice(1)}]</a>)}</span>
}
