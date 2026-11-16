import { useState } from 'react'
import { Scene } from './Scene'
import { PhotoScene } from './PhotoScene'
import { mediaById } from '../data/media'
import { SourceCitation } from './SourceCitation'

type Stage = 'colour' | 'red' | 'green' | 'blue' | 'matte' | 'composite'
const stages: { id: Stage; label: string; explanation: string }[] = [
  { id: 'colour', label: 'Colour image', explanation: 'A modern green-screen photograph. Select an RGB channel to inspect the recorded light, then try the matte and final composite.' },
  { id: 'red', label: 'Red', explanation: 'Red information shown as brightness. The backing is relatively dark; skin and clothing still contribute information.' },
  { id: 'green', label: 'Green', explanation: 'Green information shown as brightness. The green backing is bright, but the foreground also contains green information.' },
  { id: 'blue', label: 'Blue', explanation: 'Blue information shown as brightness. In the photograph, blue clothing stays bright even where the green backing is darker.' },
  { id: 'matte', label: 'Matte', explanation: 'White retains the subject; black reveals the new background. Gray at soft boundaries represents estimated partial coverage. Look for errors around the hair and coat.' },
  { id: 'composite', label: 'Composite', explanation: 'The matte controls visibility. Foreground colour must also be treated so backing colour does not remain on the edge.' },
]

export function RGBVisualizer() {
  const [photographic, setPhotographic] = useState(true)
  const [stage, setStage] = useState<Stage>('colour')
  const [quality, setQuality] = useState(100)
  const current = stages.find(item => item.id === stage)!
  const channel = stage === 'red' || stage === 'green' || stage === 'blue' ? stage : undefined
  const showComparison = stage === 'matte' || stage === 'composite'
  const explanation = !photographic && stage === 'colour' ? 'An illustrated blue-screen subject with hair and translucent glass. Compare it with the photographic sample.' : !photographic && stage === 'blue' ? 'The blue backing is bright in the blue record. The foreground also contains blue information, so removing the entire channel would remove useful subject colour.' : !photographic && stage === 'green' ? 'Green information shown as brightness. The backing is darker here, while foreground colours contribute differently.' : current.explanation

  return <div className="exhibit rgb-exhibit">
    <div className="exhibit-title"><span>INTERACTIVE EXHIBIT 01</span><span>COLOUR → SEPARATION</span></div>
    <div className="sample-toggle"><span>Try it: choose a record → matte → composite</span><label><span className="sr-only">Demonstration sample</span><select aria-label="Demonstration sample" value={photographic ? "photo" : "illustration"} onChange={e => setPhotographic(e.target.value === "photo")}><option value="photo">Real photograph · green screen</option><option value="illustration">Illustrated edge cases · blue screen</option></select></label></div>
    <div className="segmented channel-tabs" aria-label="Colour information">{stages.map(item => <button key={item.id} className={`channel-${item.id}`} aria-pressed={stage === item.id} onClick={() => setStage(item.id)}>{item.label}</button>)}</div>
    <div className="rgb-display">
      <div className="scene-view">
        {photographic ? <PhotoScene stage={stage} quality={quality} /> : <Scene type={stage === 'matte' ? 'matte' : stage === 'composite' ? 'composite' : 'blue'} channel={channel} />}
        {showComparison && !photographic && <div className="comparison-overlay" style={{ clipPath: `inset(0 ${quality}% 0 0)` }}><Scene type={stage === 'matte' ? 'matte' : 'composite'} poor /></div>}
        {showComparison && <div className="comparison-line" style={{ left: `${100 - quality}%` }}><span>↔</span></div>}
        <span className="image-tag">{stage === 'matte' ? photographic ? 'ESTIMATED FOREGROUND MATTE' : 'ILLUSTRATED SUBJECT MASK' : channel ? `${channel.toUpperCase()} RECORD · GRAYSCALE` : stage === 'composite' ? 'FINAL IMAGE' : photographic ? 'MODERN GREEN-SCREEN PHOTOGRAPH' : 'BLUE-SCREEN ILLUSTRATION'}</span>
      </div>
      <div className="record-readout"><span className="readout-title">INSIDE A COLOUR IMAGE</span><h3>{stage === 'colour' ? 'Red, green and blue' : current.label === 'Matte' ? 'Foreground coverage' : current.label === 'Composite' ? 'Combining the images' : `${current.label} channel`}</h3><p aria-live="polite">{explanation}</p><div className="rgb-bars"><span className={stage === 'red' || stage === 'colour' ? 'lit red' : ''}>R</span><span className={stage === 'green' || stage === 'colour' ? 'lit green' : ''}>G</span><span className={stage === 'blue' || stage === 'colour' ? 'lit blue' : ''}>B</span></div><span className="readout-foot">MODERN KEYING DEMONSTRATION</span></div>
    </div>
    {showComparison ? <label className="comparison-control"><span>Poor key · left</span><input aria-label="Compare poor and better matte" type="range" min="0" max="100" value={quality} onChange={e => setQuality(Number(e.target.value))} /><span>Improved key · right</span></label> : <div className="exhibit-hint"><span>TRY IT</span> Select a colour record, then reveal the matte.</div>}
    <details className="how-it-works"><summary>How does this work?</summary><p>The photograph’s RGB views show the actual red, green or blue values as grayscale. The poor mask uses a hard threshold. Comparing green against red and blue more gradually gives the improved mask softer boundaries; spill correction reduces reflected green. The illustrated sample also shows partial transparency through glass.</p></details>
    {photographic && <p className="demo-credit">Photo: <a href={mediaById["demo-subject"].sourceUrl} target="_blank" rel="noreferrer">PictureYouth</a> · Background: <a href={mediaById["demo-background"].sourceUrl} target="_blank" rel="noreferrer">Nicholas A. Tonelli</a> · <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noreferrer">CC BY 2.0</a>. Cropped; channels, masks and composite generated here.</p>}
    <p className="technical-caveat">Modern demonstration of colour separation. Vlahos used photographic records and controlled printing to make and refine his travelling mattes. <SourceCitation ids={['S2']} /></p>
  </div>
}
