import { Icon } from './Icon'
import { MediaFigure } from './MediaFigure'
import { SourceCitation } from './SourceCitation'

export function Hero({ onBegin }: { onBegin: () => void }) {
  return <section className="hero major-section" id="introduction" aria-labelledby="exhibit-title">
    <div className="hero-grid"><div className="hero-copy"><p className="eyebrow">FILM 401 · A HISTORY OF SPECIAL EFFECTS</p><h1 id="exhibit-title" tabIndex={-1}>Beyond the<br /><span>Green Screen</span></h1><p className="hero-subtitle">Petro Vlahos and the Evolution<br className="desktop-break" /> of Special Effects</p><p className="hero-intro">An engineer’s work on colour, light, and the difficult business of making two separately filmed worlds look like one.</p><div className="hero-actions"><button className="button primary" onClick={onBegin}><Icon name="play" /> Start presentation</button><a className="button secondary" href="#biography">Explore the research <Icon name="arrow" /></a></div><p className="hero-note">Five narration chapters · About five minutes<br />Explore at your own pace, with or without audio.</p></div>
      <div className="hero-image"><MediaFigure id="poppins-penguins" priority /><span className="film-label">MARY POPPINS <span>1964</span></span></div></div>
    <div className="opening-argument"><div><span className="eyebrow">THE ARGUMENT</span><h2>He didn’t invent the coloured screen.<br />He made the separation more precise.</h2></div><div><p>Petro Vlahos helped filmmakers preserve the details that made a performance feel photographed: hair, moving hands, reflections, and translucent edges. His colour-difference, sodium-vapour, and electronic processes approached that problem in different ways. <SourceCitation ids={['S2', 'S3', 'S4']} /></p><p>This exhibit follows his route into Hollywood, the industry that needed his work, and the people who helped turn it into usable cinema technology.</p><a className="inline-link" href="#colour-difference">Try the colour-separation demonstration ↗</a></div></div>
  </section>
}
