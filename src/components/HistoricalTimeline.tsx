import { timeline } from '../data/timeline'
import { SourceCitation } from './SourceCitation'

export function HistoricalTimeline() {
  return <div className="timeline-wrap"><h3>A career across image technologies</h3><ol className="career-timeline">{timeline.map(event => <li key={event.year}><span className="timeline-year">{event.year}</span><div><h4>{event.title}</h4><p>{event.detail} <SourceCitation ids={event.sources} /></p></div></li>)}</ol></div>
}
