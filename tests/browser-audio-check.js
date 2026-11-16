async () => {
  const results = []
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms))
  const check = (name, condition) => { results.push({ name, passed: Boolean(condition) }); if (!condition) throw new Error(name) }
  try {
    document.querySelector('.hero .primary').click(); await wait(500)
    const audio = document.querySelector('audio')
    check('local recording detected with real duration', audio && audio.duration === 12 && !document.querySelector('.audio-play').disabled)
    check('no autoplay', audio.paused)
    document.querySelector('.audio-play').click(); await wait(600)
    check('play starts actual media', !audio.paused && audio.currentTime > 0)
    document.querySelector('.audio-play').click(); await wait(100)
    check('pause works', audio.paused)
    const speed = document.querySelector('[aria-label="Narration playback speed"]')
    speed.value = '1.25'; speed.dispatchEvent(new Event('change', { bubbles: true })); await wait(100)
    check('playback rate reaches audio element', audio.playbackRate === 1.25)
    const seek = document.querySelector('[aria-label="Seek chapter narration"]')
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(seek, '5')
    seek.dispatchEvent(new Event('input', { bubbles: true })); await wait(150)
    check('seek changes real media time', Math.abs(audio.currentTime - 5) < .3)
    document.querySelector('.audio-play').click(); await wait(200)
    check('resume works', !audio.paused)
    document.querySelector('[aria-label="Next narration chapter"]').click(); await wait(500)
    check('chapter change stops and resets old element', audio.paused && audio.currentTime === 0 && !audio.isConnected)
    const next = document.querySelector('audio')
    check('one audio element and no autoplay after next', document.querySelectorAll('audio').length === 1 && next.paused)
    document.querySelector('.audio-play').click(); await wait(300)
    check('second recording plays', !next.paused && next.currentTime > 0)
    location.hash = 'references'; await wait(200)
    check('visiting references pauses narration', next.paused)
    document.querySelector('[aria-label="Next narration chapter"]').click(); await wait(200)
    check('missing third chapter has transcript fallback', !document.querySelector('audio') && document.querySelector('.audio-play').disabled)
    document.querySelector('.player-close').click(); await wait(100)
    check('closing player removes audio', !document.querySelector('audio'))
  } catch (error) { return { passed: results.filter(r => r.passed).length, failed: error.message, results } }
  return { passed: results.length, failed: 0, results }
}
