import { useImperativeHandle, useLayoutEffect, useRef, useState, type Ref } from 'react'
import { tracks, audioPaths } from '../../data/narration'
import availableAudio from '../../data/narration/available-audio.json'
import { Icon } from '../ui/Icon'
import { createPlaybackController, formatTime, missingMediaStatus, type PlaybackState } from '../../lib/audio/playback'
import { useAsset } from '../../lib/media/assets'

export interface PlaybackSelection { chapter: number; revision: number; autoplay: boolean; guided?: boolean }
export interface NarrationHandle { cancel: () => void; isActive: () => boolean }

export function NarrationPlayer({ selection, onStartPlayback, onExitPresentation, allowContinuation, onSelect, onEnded, onClose, ref }: {
  selection: PlaybackSelection; onSelect: (id: number) => void; onEnded: (id: number) => void
  onStartPlayback: () => void; onExitPresentation: () => void
  onClose: () => void; ref: Ref<NarrationHandle>; allowContinuation: () => boolean
}) {
  const { chapter } = selection
  const audio = useRef<HTMLAudioElement>(null)
  const controller = useRef<ReturnType<typeof createPlaybackController> | null>(null)
  const ended = useRef(onEnded)
  const asset = useAsset()
  const [state, setState] = useState<PlaybackState>({ playing: false, loading: false, position: 0, duration: 0, failed: false, blocked: false })
  const [transcriptChoice, setTranscriptChoice] = useState<{ chapter: number; open: boolean } | null>(null)
  const [speed, setSpeed] = useState(1)
  const speedRef = useRef(speed)
  const path = (availableAudio as Record<string, string | null>)[audioPaths[chapter]]
  const source = path ? asset(path) : null
  const available = Boolean(path) && !state.failed
  const transcript = transcriptChoice?.chapter === chapter ? transcriptChoice.open : !available
  const script = tracks[chapter].transcript
  const hasTranscript = Boolean(script.trim())
  const words = script.trim() ? script.trim().split(/\s+/).length : 0
  const { playing, loading, position, duration, blocked } = state

  useImperativeHandle(ref, () => ({ cancel: () => controller.current?.cancel(), isActive: () => controller.current?.isActive() ?? false }), [])
  useLayoutEffect(() => { ended.current = onEnded }, [onEnded])
  useLayoutEffect(() => {
    const instance = createPlaybackController(audio.current!, setState, id => ended.current(id))
    controller.current = instance
    return () => { instance.destroy(); controller.current = null }
  }, [])
  useLayoutEffect(() => {
    controller.current?.select(selection.chapter, source, selection.autoplay && (!selection.guided || allowContinuation()), speedRef.current)
  }, [selection, source, allowContinuation])

  const playbackStatus = loading ? 'Loading Recording...' : playing ? 'Playing Audio' : blocked ? 'Playback Paused · Press Play to Continue' : 'Paused · Press Play'
  const availabilityStatus = missingMediaStatus(available, hasTranscript)
  const status = available ? [playbackStatus, availabilityStatus].filter(Boolean).join(' · ') : availabilityStatus

  const toggleTranscript = () => {
    setTranscriptChoice({ chapter, open: !transcript })
    if (transcript) onExitPresentation()
  }
  const togglePlayback = () => {
    if (!controller.current?.isActive()) onStartPlayback()
    controller.current?.toggle()
  }

  return <aside className="narration-player" aria-label="Chapter audio player" data-keyboard-local>
    <audio ref={audio} preload="metadata" />
    {transcript && <div className="transcript-panel" id="narration-transcript"><div className="transcript-title"><h2>{tracks[chapter].label}</h2><button className="icon-button" onClick={toggleTranscript} aria-label="Close transcript"><Icon name="close" /></button></div><p className="eyebrow">Transcript · {words} Words</p>{script.trim() ? script.split(/\r?\n\s*\r?\n/).map((p, i) => <p key={i} style={{ whiteSpace: 'pre-line' }}>{p}</p>) : <p>Transcript not found.</p>}</div>}
    <div className="player-main"><div className="player-chapter"><span className="eyebrow">Chapter {chapter}</span><label><span className="sr-only">Choose chapter</span><select aria-label="Choose chapter" value={chapter} onChange={e => onSelect(Number(e.target.value))}>{tracks.map(track => <option key={track.id} value={track.id}>{track.label}</option>)}</select></label></div>
      <div className="player-transport"><button className="icon-button" aria-label="Previous chapter" disabled={chapter === 0} onClick={() => onSelect(chapter - 1)}><Icon name="arrow" className="reverse" /></button><button className="audio-play" onClick={togglePlayback} disabled={!available} aria-label={playing || loading ? 'Pause chapter audio' : 'Play chapter audio'}><Icon name={playing || loading ? 'pause' : 'play'} /></button><button className="icon-button" aria-label="Next chapter" disabled={chapter === tracks.length - 1} onClick={() => onSelect(chapter + 1)}><Icon name="arrow" /></button></div>
      <div className="player-track"><input type="range" aria-label="Seek chapter audio" min="0" max={Number.isFinite(duration) ? duration || 1 : 1} step="0.1" value={Number.isFinite(position) ? position : 0} disabled={!available || !duration} onChange={e => { if (audio.current) audio.current.currentTime = Number(e.target.value) }} /><div><span className="audio-status" role="status">{status}</span><span className="audio-time">{formatTime(position)} / {available && duration ? formatTime(duration) : '—:—'}</span></div></div>
      <label className="player-speed"><span className="sr-only">Playback speed</span><select aria-label="Playback speed" value={speed} disabled={!available} onChange={e => { const v = Number(e.target.value); setSpeed(v); speedRef.current = v; if (audio.current) audio.current.playbackRate = v }}><option value="1">1×</option><option value="1.25">1.25×</option><option value="1.5">1.5×</option><option value="2">2×</option></select></label>
      <button className="transcript-toggle" aria-expanded={transcript} aria-controls="narration-transcript" onClick={toggleTranscript}><Icon name="book" /><span>Transcript</span></button><button className="icon-button player-close" onClick={onClose} aria-label="Close narration player"><Icon name="close" /></button></div>
    <div className="player-help" role="group" aria-label="Keyboard shortcuts">
      <span className="player-shortcut"><span className="shortcut-keys"><kbd aria-label="Left arrow">←</kbd><kbd aria-label="Right arrow">→</kbd></span><span>Chapters</span></span>
      <span className="player-shortcut"><kbd>Space</kbd><span>Play / Pause</span></span>
      <span className="player-shortcut"><kbd>Esc</kbd><span>Exit Presentation</span></span>
    </div>
  </aside>
}
