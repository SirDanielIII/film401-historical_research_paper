import { useState } from 'react'
import { SourceCitation } from '../research/SourceCitation'

const eras = [
  { date: '1950s–1960s', title: 'Photochemical', material: 'FILM + LIGHT', body: 'Colour separations, travelling mattes and optical printing. Photographic records and exposure control shape the final image.', source: 'S2', glyph: 'film' },
  { date: '1970s onward', title: 'Electronic', material: 'VIDEO + CIRCUITS', body: 'Colour signals drive a keyer. Electronic controls handle the backing, foreground mixing and difficult edge information.', source: 'S4', glyph: 'signal' },
  { date: 'Today', title: 'Digital', material: 'PIXELS + SOFTWARE', body: 'Numerical colour samples and derived alpha mattes enable detailed keying, spill correction and image matching.', source: 'S11', glyph: 'pixels' },
]

export function EraComparison() {
  const [active, setActive] = useState(0)
  const era = eras[active]
  return <div className="exhibit era-exhibit"><div className="exhibit-title"><span>THREE MEDIA / ONE CREATIVE PROBLEM</span><span>THE EVOLVING IMAGE</span></div>
    <div className="era-grid">{eras.map((item, i) => <button key={item.title} aria-pressed={active === i} onClick={() => setActive(i)}><span className="eyebrow">{item.date}</span><svg viewBox="0 0 120 105" aria-hidden="true">{i === 0 ? <g fill="none" stroke="currentColor"><rect x="16" y="12" width="88" height="80" /><rect x="28" y="23" width="64" height="58" />{[20, 37, 54, 71].map(y => <g key={y}><rect x="19" y={y} width="5" height="8" /><rect x="96" y={y} width="5" height="8" /></g>)}</g> : i === 1 ? <g stroke="currentColor" fill="none"><path d="M10 51h10l8-24 14 50 12-40 12 24 12-12h32M10 24h100M10 80h100" /><circle cx="60" cy="51" r="41" opacity=".25" /></g> : <g fill="currentColor">{Array.from({ length: 36 }, (_, n) => <rect key={n} x={20 + n % 6 * 14} y={12 + Math.floor(n / 6) * 14} width="9" height="9" opacity={.2 + ((n * 7) % 9) / 12} />)}</g>}</svg><h3>{item.title}</h3><span className="era-material">{item.material}</span></button>)}</div>
    <div className="era-explanation" aria-live="polite"><span>0{active + 1}</span><p>{era.body} <SourceCitation ids={[era.source]} /></p></div>
    <p className="technical-caveat">Vlahos’s work connected colour separation across photographic and electronic media.</p>
  </div>
}
