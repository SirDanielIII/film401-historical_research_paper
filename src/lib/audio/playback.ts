export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00'
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`
}

export function missingMediaStatus(hasAudio: boolean, hasTranscript: boolean) {
  if (!hasAudio) return hasTranscript ? 'Transcript available · audio not found' : 'Transcript not found · audio not found'
  return hasTranscript ? '' : 'Transcript not found'
}

export interface PlaybackState {
  playing: boolean
  loading: boolean
  position: number
  duration: number
  failed: boolean
  blocked: boolean
}

// One controller owns one persistent media element. Epochs invalidate promises
// and listeners from a previous source or a cancelled play request.
export function createPlaybackController(audio: HTMLAudioElement, report: (state: PlaybackState) => void, onEnded: (chapter: number) => void) {
  let epoch = 0, detach = () => {}, wanted = false, armed = false, attempted = false
  let state: PlaybackState = { playing: false, loading: false, position: 0, duration: 0, failed: false, blocked: false }
  const update = (next: Partial<PlaybackState>) => { state = { ...state, ...next }; report(state) }
  const cancel = () => {
    epoch++
    wanted = false; armed = false; attempted = false
    audio.pause()
    update({ playing: false, loading: false, blocked: false })
  }
  const play = async () => {
    if (!wanted || attempted || audio.readyState < 3 || state.failed || !audio.getAttribute('src')) return
    attempted = true
    const token = epoch
    try {
      await audio.play()
      if (token !== epoch) return
      armed = wanted && !audio.paused && !audio.ended
    } catch {
      if (token !== epoch) return
      wanted = false; armed = false
      update({ playing: false, loading: false, blocked: true })
    }
  }
  return {
    cancel,
    isActive: () => wanted || !audio.paused,
    toggle() {
      if (wanted || !audio.paused) { cancel(); return }
      epoch++
      wanted = true; attempted = false
      update({ blocked: false, loading: true })
      void play()
    },
    select(chapter: number, source: string | null, autoplay: boolean, speed: number) {
      cancel(); detach()
      state = { playing: false, loading: autoplay && Boolean(source), position: 0, duration: 0, failed: false, blocked: false }
      report(state)
      const listeners: [string, EventListener][] = []
      // Source listeners also verify the requested resource, not just the chapter.
      const expected = source ? new URL(source, document.baseURI).href : null
      const valid = () => expected !== null && audio.currentSrc === expected
      const listen = (name: string, handler: () => void) => {
        const listener = () => { if (valid()) handler() }
        audio.addEventListener(name, listener); listeners.push([name, listener])
      }
      listen('canplay', () => { void play() })
      listen('loadedmetadata', () => update({ duration: audio.duration }))
      listen('durationchange', () => update({ duration: audio.duration }))
      listen('timeupdate', () => update({ position: audio.currentTime }))
      listen('play', () => {
        if (!wanted) { audio.pause(); return }
        armed = !audio.ended && !audio.seeking
        update({ playing: true, loading: false, blocked: false })
      })
      listen('pause', () => {
        if (!audio.paused) return
        // A natural end emits pause before ended in some browsers.
        if (!audio.ended) { wanted = false; armed = false; epoch++ }
        update({ playing: false, loading: false })
      })
      listen('seeking', () => { armed = false })
      listen('seeked', () => { armed = wanted && !audio.paused && !audio.ended })
      listen('ended', () => {
        const advance = wanted && armed && audio.ended && !audio.seeking
        wanted = false; armed = false; epoch++
        update({ playing: false, loading: false })
        if (advance) onEnded(chapter)
      })
      listen('error', () => {
        wanted = false; armed = false; epoch++
        update({ playing: false, loading: false, failed: true })
      })
      detach = () => listeners.forEach(([name, listener]) => audio.removeEventListener(name, listener))
      if (source) audio.setAttribute('src', source)
      else audio.removeAttribute('src')
      audio.load()
      audio.playbackRate = speed
      wanted = autoplay && Boolean(source)
      void play()
    },
    destroy() { cancel(); detach(); audio.removeAttribute('src'); audio.load() },
  }
}
