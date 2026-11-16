import { useEffect, useRef, useState } from 'react'
import { narration, audioPaths, narrationSources } from '../data/narration'
import { recordingLabels } from '../data/sections'
import availableAudio from '../data/available-audio.json'
import { Icon } from './Icon'
import { SourceCitation } from './SourceCitation'
import { formatTime } from '../lib/playback'
import { useAsset } from '../lib/assets'

export function NarrationPlayer({ chapter, onSelect, onClose }: { chapter: number; onSelect: (id: number) => void; onClose: () => void }) {
  const audio = useRef<HTMLAudioElement>(null)
  const asset = useAsset()
  const [playing, setPlaying] = useState(false)
  const [position, setPosition] = useState(0)
  const [duration, setDuration] = useState(0)
  const [failed, setFailed] = useState(false)
  const [transcript, setTranscript] = useState(false)
  const [speed, setSpeed] = useState(1)
  const path = (availableAudio as Record<string, string | null>)[audioPaths[chapter - 1]]
  const available = Boolean(path) && !failed
  const words = narration[chapter - 1].trim().split(/\s+/).length

  useEffect(() => {
    const element = audio.current
    return () => { if (element) { element.pause(); element.currentTime = 0 } }
  }, [])

  async function togglePlayback() {
    const element = audio.current
    if (!element || !available) return
    if (!element.paused) element.pause()
    else {
      try { await element.play() } catch { setFailed(true); setPlaying(false) }
    }
  }

  return <aside className="narration-player" aria-label="Presentation narration">
    {path && <audio ref={audio} src={asset(path)} preload="metadata" onLoadedMetadata={e => setDuration(e.currentTarget.duration)} onDurationChange={e => setDuration(e.currentTarget.duration)} onTimeUpdate={e => setPosition(e.currentTarget.currentTime)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false) }} />}
    {transcript && <div className="transcript-panel" id="narration-transcript"><div className="transcript-title"><h2>{recordingLabels[chapter - 1]}</h2><button className="icon-button" onClick={() => setTranscript(false)} aria-label="Close transcript"><Icon name="close" /></button></div><p className="eyebrow">RECORDING SCRIPT · {words} WORDS · ~{formatTime(words / 140 * 60)} AT 140 WPM</p>{narration[chapter - 1].trim().split(/\n\s*\n/).map((p, i) => <p key={i}>{p}</p>)}<p>Research <SourceCitation ids={narrationSources[chapter - 1]} /></p><a className="inline-link" href={asset('recording-script.txt')} download>Download the five recording scripts ↓</a></div>}
    <div className="player-main"><div className="player-chapter"><span className="eyebrow">NARRATION {chapter} / 5</span><label><span className="sr-only">Choose narration chapter</span><select aria-label="Choose narration chapter" value={chapter} onChange={e => onSelect(Number(e.target.value))}>{recordingLabels.map((label, i) => <option key={label} value={i + 1}>{label}</option>)}</select></label></div>
      <div className="player-transport"><button className="icon-button" aria-label="Previous narration chapter" disabled={chapter === 1} onClick={() => onSelect(chapter - 1)}><Icon name="arrow" className="reverse" /></button><button className="audio-play" onClick={togglePlayback} disabled={!available} aria-label={playing ? 'Pause chapter narration' : 'Play chapter narration'}><Icon name={playing ? 'pause' : 'play'} /></button><button className="icon-button" aria-label="Next narration chapter" disabled={chapter === 5} onClick={() => onSelect(chapter + 1)}><Icon name="arrow" /></button></div>
      <div className="player-track"><input type="range" aria-label="Seek chapter narration" min="0" max={Number.isFinite(duration) ? duration || 1 : 1} step="0.1" value={position} disabled={!available || !duration} onChange={e => { const seconds = Number(e.target.value); if (audio.current) audio.current.currentTime = seconds; setPosition(seconds) }} /><div><span className="audio-status" role="status">{available ? playing ? 'Playing your recording' : 'Ready to play' : failed ? 'Recording unavailable · transcript available' : 'Recording not added yet · transcript available'}</span><span className="audio-time">{formatTime(position)} / {available && duration ? formatTime(duration) : '—:—'}</span></div></div>
      <label className="player-speed"><span className="sr-only">Narration playback speed</span><select aria-label="Narration playback speed" value={speed} disabled={!available} onChange={e => { const v = Number(e.target.value); setSpeed(v); if (audio.current) audio.current.playbackRate = v }}><option value="1">1×</option><option value="1.25">1.25×</option></select></label>
      <button className="transcript-toggle" aria-expanded={transcript} aria-controls="narration-transcript" onClick={() => setTranscript(!transcript)}><Icon name="book" /><span>Transcript</span></button><button className="icon-button player-close" onClick={onClose} aria-label="Close narration player"><Icon name="close" /></button></div>
    <div className="player-help"><span>← → Chapters · Space Play / pause · Esc Exit presentation</span>{chapter === 3 && <a href="#colour-difference">Continue to the colour-difference demo ↓</a>}</div>
  </aside>
}
