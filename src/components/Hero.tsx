import { Icon } from './Icon'
import { MediaFigure } from './MediaFigure'
import { SourceCitation } from './SourceCitation'

export function Hero({ onBegin }: { onBegin: () => void }) {
  return <section className="hero major-section" id="introduction" aria-labelledby="exhibit-title">
    <div className="hero-grid"><div className="hero-copy"><p className="eyebrow">FILM 401 · A HISTORY OF SPECIAL EFFECTS</p><h1 id="exhibit-title" tabIndex={-1}>Beyond the<br /><span>Green Screen</span></h1><p className="hero-subtitle">Petro Vlahos and the Evolution<br className="desktop-break" /> of Special Effects</p><p className="hero-intro">Petro Vlahos developed ways to combine separately filmed images, from blue-screen mattes to Disney’s sodium-vapour system and Ultimatte.</p><div className="hero-actions"><button className="button primary" onClick={onBegin}><Icon name="play" /> Start presentation</button><a className="button secondary" href="#biography">Explore the research <Icon name="arrow" /></a></div><p className="hero-note">Five narration chapters · About five minutes<br />Explore at your own pace, with or without audio.</p></div>
      <div className="hero-image"><MediaFigure id="poppins-penguins" priority /><span className="film-label">MARY POPPINS <span>1964</span></span></div></div>
    <div className="opening-argument"><div><span className="eyebrow">PETRO VLAHOS · 1916–2013</span><h2>An engineer behind better film composites</h2></div><div><p>Vlahos improved the separation of actors from their backgrounds, making it easier to combine a performance with another scene. His work connected photographic colour records, specialized camera optics and electronic image signals. <SourceCitation ids={['S2', 'S3', 'S4']} /></p><p>His route from aircraft and radar engineering into Hollywood helps explain a career shaped by practical production problems and collaboration.</p><a className="inline-link" href="#colour-difference">Try the colour-separation demonstration ↗</a></div></div>
  </section>
}
