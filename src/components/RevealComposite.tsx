import { useState } from 'react'
import { Scene } from './Scene'

export function RevealComposite() {
  const [stage, setStage] = useState<'blue' | 'matte' | 'composite'>('blue')
  const [reveal, setReveal] = useState(60)
  return <div className="exhibit reveal-exhibit">
    <div className="exhibit-title"><span>REVEAL THE COMPOSITE</span><span>THREE ELEMENTS / ONE IMAGE</span></div>
    <div className="reveal-scene"><Scene type={stage} reveal={stage === 'composite' ? reveal : 100} /><div className="scene-side-label"><span>THE PERFORMER</span><span>THE MASK</span><span>THE WORLD</span></div></div>
    <div className="segmented reveal-tabs">{([{ id: 'blue', label: '01 / Foreground' }, { id: 'matte', label: '02 / Matte' }, { id: 'composite', label: '03 / Composite' }] as const).map(item => <button key={item.id} aria-pressed={stage === item.id} onClick={() => setStage(item.id)}>{item.label}</button>)}</div>
    {stage === 'composite' ? <label className="comparison-control"><span>Blue backing</span><input type="range" min="0" max="100" value={reveal} onChange={e => setReveal(Number(e.target.value))} aria-label="Reveal replacement background" /><span>New world</span></label> : <p className="exhibit-description" aria-live="polite">{stage === 'blue' ? 'The foreground is photographed separately. Its backing must give way to a different environment.' : 'A changing mask controls which image is visible. Soft and translucent areas need intermediate coverage.'}</p>}
    <p className="technical-caveat">Original SVG illustration. A modern explanation of masking, not an exact reconstruction of a 1940s optical process.</p>
  </div>
}
