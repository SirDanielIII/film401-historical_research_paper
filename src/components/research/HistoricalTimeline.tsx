import { titleCase } from '../../utils/titleCase'
import { timeline } from '../../data/content/timeline'
import { SourceCitation } from './SourceCitation'

export function HistoricalTimeline() {
  return <div className="timeline-wrap"><h3>A Career Across Image Technologies</h3><ol className="career-timeline">{timeline.map(event => <li key={event.year}><span className="timeline-year">{event.year}</span><div><h4>{titleCase(event.title)}</h4><p>{event.detail} <SourceCitation ids={event.sources} /></p></div></li>)}</ol></div>
}
