import { useState } from 'react'
import { Scene, Performer } from './Scene'
import { SourceCitation } from '../research/SourceCitation'
import { Icon } from '../ui/Icon'

const steps = [
  { title: 'Illuminate the Scene', icon: '💡', text: 'Ordinary scene light illuminates the performer. A light-coloured backing reflects the lamps’ narrowband sodium light near 589 nm.' },
  { title: 'Separate by Wavelength', icon: '🌈', text: 'The lens collects both. Wavelength-selective coated optics redirect the narrow sodium band into its own optical path.' },
  { title: 'Expose Two Film Records', icon: '🎞️', text: 'One synchronized colour record preserves the foreground. A monochrome record captures the sodium-backing information.' },
  { title: 'Combine Through Printing', icon: '🧩', text: 'Complementary mattes control later photographic printing, placing the performance into a separately produced scene.' },
]

export function SodiumVapourVisualizer() {
  const [step, setStep] = useState(0)
  const [view, setView] = useState<'diagram' | 'screen' | 'composite'>('diagram')
  return <div className="exhibit sodium-exhibit">
    <div className="exhibit-title"><span><span aria-hidden="true">🎥</span> Interactive Exhibit 02</span><span>λ ≈ 589 nm</span></div>
    <div className="segmented">{([{ id: 'diagram', label: 'Inside the Camera' }, { id: 'screen', label: 'Sodium-Lit Stage' }, { id: 'composite', label: 'Final Composite' }] as const).map(item => <button key={item.id} aria-pressed={view === item.id} onClick={() => setView(item.id)}>{item.label}</button>)}</div>
    {view === 'diagram' ? <div className="sodium-optics" role="region" aria-label="Camera optics diagram; scroll sideways on small screens" tabIndex={0} data-keyboard-local><svg className="sodium-diagram" viewBox="0 0 760 340" role="img" aria-labelledby="sodium-title sodium-desc">
      <title id="sodium-title">Simplified sodium-vapour optical separation</title><desc id="sodium-desc">Ordinary foreground light and narrow sodium light enter the same lens. Coated optics separate two synchronized photographic records. Later printing combines the foreground with a new background.</desc>
      <defs><marker id="arrow-white" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="m0 0 10 5-10 5Z" fill="#eee8d9" /></marker><marker id="arrow-yellow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="m0 0 10 5-10 5Z" fill="#e8bf63" /></marker></defs>
      <g opacity={step === 0 ? 1 : .65}><rect x="35" y="88" width="124" height="142" fill="#c8a345" opacity=".2" stroke="#e8bf63" /><g transform="translate(25 75) scale(.38)"><Performer glass={false} /></g><text x="97" y="259" textAnchor="middle">Performer + Backing</text><text x="97" y="279" className="svg-small" textAnchor="middle">Two Kinds of Light</text></g>
      <g className={step < 2 ? 'light-path active' : 'light-path'}><path d="M161 144h175" stroke="#eee8d9" markerEnd="url(#arrow-white)" /><path d="M161 174h175" stroke="#e8bf63" markerEnd="url(#arrow-yellow)" /></g>
      <g><ellipse cx="235" cy="158" rx="11" ry="55" fill="#a8c3c0" fillOpacity=".16" stroke="#a8c3c0" /><text x="235" y="242" textAnchor="middle">Lens</text></g>
      <g className={step === 1 ? 'splitter highlighted' : 'splitter'}><path d="m338 119 62 39-62 39Z" fill="#b5c8c5" fillOpacity=".12" stroke="#b5c8c5" /><path d="m338 119 31 59" stroke="#e8bf63" strokeWidth="3" /><text x="366" y="242" textAnchor="middle">Coated Optics</text><text x="366" y="261" className="svg-small" textAnchor="middle">Spectral Separation</text></g>
      <g className={step >= 1 && step <= 2 ? 'light-path active' : 'light-path'}><path d="m387 150 70-70h48" stroke="#eee8d9" markerEnd="url(#arrow-white)" /><path d="m372 178 85 55h48" stroke="#e8bf63" markerEnd="url(#arrow-yellow)" /></g>
      <g opacity={step >= 2 ? 1 : .65}><rect x="512" y="30" width="102" height="100" rx="1" fill="#0e1717" stroke="#748c89" /><g transform="translate(513 32) scale(.24)"><Performer glass={false} /></g><text x="563" y="150" textAnchor="middle">Colour Record</text><rect x="512" y="183" width="102" height="100" rx="1" fill="#eee8d9" /><g transform="translate(513 185) scale(.24)" style={{ filter: 'brightness(0)' }}><Performer matte glass={false} /></g><text x="563" y="305" textAnchor="middle">Matte Record</text><text x="563" y="325" className="svg-small" textAnchor="middle">Bright = Sodium Exposure</text></g>
      <g opacity={step === 3 ? 1 : .25}><path d="M623 81h29v96h37m-66 56h29v-56" stroke="#a8bcad" strokeWidth="1.5" fill="none" /><rect x="674" y="146" width="64" height="64" stroke="#a8bcad" fill="#263f36" /><path d="m681 196 17-25 12 14 13-20 9 31" stroke="#a8bcad" fill="none" /><text x="706" y="242" textAnchor="middle">Composite</text><text x="706" y="261" className="svg-small" textAnchor="middle">Later Printing</text></g>
      <g className="spectrum-key"><path d="M35 23h18" stroke="#eee8d9" strokeWidth="2" /><text x="61" y="27" className="svg-small">Broad-Spectrum Scene Light</text><path d="M370 23h18" stroke="#e8bf63" strokeWidth="2" /><text x="396" y="27" className="svg-small">Narrow Sodium Band ≈ 589 nm</text></g>
    </svg></div> : <div className="sodium-scene"><Scene type={view === 'screen' ? 'sodium' : 'composite'} /><div><span className="eyebrow">{view === 'screen' ? 'During Photography' : 'After Photographic Printing'}</span><h3><span aria-hidden="true">{view === 'screen' ? '💡' : '🧩'}</span> {view === 'screen' ? 'The Sodium-Lit Backdrop' : 'The Finished Composite'}</h3><p>{view === 'screen' ? 'The backing’s narrow spectrum allows physical separation through optics. The performer receives ordinary scene lighting.' : 'Illustrated composite: complementary mattes control where the foreground and the replacement background appear.'}</p></div></div>}
    {view === 'diagram' && <p className="optics-hint">Scroll the diagram sideways to see the full light path. The numbered steps explain each stage below.</p>}
    <div className="sodium-step-nav" aria-label="Optical process steps">{steps.map((item, i) => <button key={item.title} aria-label={`Step ${i + 1}: ${item.title}`} aria-pressed={step === i} onClick={() => { setStep(i); setView('diagram') }}><span>0{i + 1}</span><span><span aria-hidden="true">{item.icon}</span> {item.title}</span></button>)}</div>
    <div className="step-explanation" aria-live="polite"><div><strong><span aria-hidden="true">{steps[step].icon}</span> {steps[step].title}</strong><p>{steps[step].text}</p></div><button className="round-button" aria-label={step === 3 ? 'Restart optical process' : 'Next optical step'} onClick={() => { setStep((step + 1) % steps.length); setView('diagram') }}><Icon name="arrow" /></button></div>
    <details className="how-it-works"><summary>How Does This Differ from Blue Screen?</summary><p>Colour-difference work processes photographic colour records to derive and refine mattes. Here, wavelength-selective optics isolate the sodium band during exposure, producing two synchronized film records. A matte may be inverted later to obtain the complementary mask needed for printing.</p></details>
    <p className="technical-caveat">Simplified diagram of Vlahos’s sodium-vapour system: simultaneous film records, followed by photographic printing. <SourceCitation ids={['S3', 'S5']} /></p>
  </div>
}
