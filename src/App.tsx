import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Header } from './components/layout/Header'
import { Hero } from './components/layout/Hero'
import { ChapterLayout } from './components/layout/ChapterLayout'
import { ResearchBlocks } from './components/research/ResearchSection'
import { MediaFigure } from './components/media/MediaFigure'
import { HistoricalTimeline } from './components/research/HistoricalTimeline'
import { RGBVisualizer } from './components/interactive/RGBVisualizer'
import { SodiumVapourVisualizer } from './components/interactive/SodiumVapourVisualizer'
import { NarrationPlayer, type NarrationHandle, type PlaybackSelection } from './components/audio/NarrationPlayer'
import { ReferenceLibrary } from './components/research/ReferenceLibrary'
import { Glossary } from './components/research/Glossary'
import { SourceCitation } from './components/research/SourceCitation'
import { chapters } from './data/content/chapters'
import { contextBlocks, legacyBlocks, priorArtBlocks } from './data/content/context'
import { sectionHref } from './data/navigation/sections'
import { trackDefinitions } from './data/narration/tracks'
import { parseRoute, recordingForSection, sectionForRoute } from './lib/navigation/routes'
import { useExhibitNavigation } from './hooks/useExhibitNavigation'
import { preserveReadingPosition } from './lib/navigation/readingPosition'
import { AssetBase, assetUrl } from './lib/media/assets'
import { themes, themeStyle, type ExhibitTheme } from './styles/theme'
import './styles/globals.css'
import './styles/components.css'
import './styles/responsive.css'

export interface ExhibitProps {
  theme?: ExhibitTheme
  onToggleTheme?: () => void
  embedded?: boolean
  assetBaseUrl?: string
}

function savedMode(): 'light' | 'dark' {
  try { return localStorage.getItem('vlahos-theme') === 'light' ? 'light' : 'dark' } catch { return 'dark' }
}

function savedPresentation() {
  try { return sessionStorage.getItem('vlahos-presentation') === 'true' } catch { return false }
}

export default function PetroVlahosExhibit({ theme: hostTheme, onToggleTheme, embedded = false, assetBaseUrl = import.meta.env.BASE_URL }: ExhibitProps) {
  const [mode, setMode] = useState(savedMode)

  const [focused, setFocused] = useState(savedPresentation)
  const [playerOpen, setPlayerOpen] = useState(savedPresentation)
  const [selection, setSelection] = useState<PlaybackSelection>(() => ({
    chapter: recordingForSection(sectionForRoute(parseRoute(window.location.hash))) ?? 0, revision: 0, autoplay: false,
  }))
  const selected = useRef(selection)
  const presenting = useRef(focused)
  const player = useRef<NarrationHandle>(null)
  const root = useRef<HTMLDivElement>(null)
  const restoreReadingPosition = useRef<(() => () => void) | null>(null)
  const theme = hostTheme ?? themes[mode]

  const manualNavigation = useCallback((section: string, origin: 'scroll' | 'navigation') => {
    // Reading elsewhere changes the URL, never the open player's track or time.
    if (origin === 'scroll' && player.current) return
    player.current?.cancel()
    const chapter = recordingForSection(section)
    if (chapter !== undefined) {
      const next = { chapter, revision: selected.current.revision + 1, autoplay: false }
      selected.current = next
      setSelection(next)
    }
  }, [])
  const { active, navigate, cancelNavigation } = useExhibitNavigation(root, manualNavigation)

  const selectRecording = useCallback((chapter: number, autoplay = false) => {
    const track = trackDefinitions[Math.max(0, Math.min(trackDefinitions.length - 1, chapter))]
    player.current?.cancel()
    cancelNavigation()
    setPlayerOpen(true)
    const request = { chapter: track.id, revision: selected.current.revision + 1, autoplay }
    selected.current = request
    setSelection(request)
  }, [cancelNavigation])

  const exitPresentation = useCallback(() => {
    if (root.current && (presenting.current || player.current)) {
      restoreReadingPosition.current = preserveReadingPosition(root.current)
      cancelNavigation()
    }
    presenting.current = false
    player.current?.cancel()
    setFocused(false)
    setPlayerOpen(false)
  }, [cancelNavigation])

  useLayoutEffect(() => {
    const restore = restoreReadingPosition.current
    restoreReadingPosition.current = null
    return restore?.()
  }, [focused, playerOpen])

  const closePlayer = exitPresentation

  const advanceRecording = useCallback((endedChapter: number) => {
    if (!presenting.current || selected.current.chapter !== endedChapter) return
    const next = trackDefinitions[endedChapter + 1]
    if (!next) return
    const request = { chapter: next.id, revision: selected.current.revision + 1, autoplay: true, guided: true }
    selected.current = request
    setSelection(request)
    navigate(next.sectionId, 'push', true)
  }, [navigate])

  const allowContinuation = useCallback(() => presenting.current, [])

  const enterPresentation = useCallback((keepPosition = true, control?: HTMLElement) => {
    if (keepPosition && !presenting.current && root.current) {
      restoreReadingPosition.current = preserveReadingPosition(root.current, control)
      cancelNavigation()
    }
    presenting.current = true
    setFocused(true)
  }, [cancelNavigation])

  function begin() {
    enterPresentation(false)
    selectRecording(0, true)
    navigate('introduction', 'push', true)
  }

  function toggleTheme() {
    const next = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    try { localStorage.setItem('vlahos-theme', next) } catch { /* Theme still works without storage. */ }
  }

  useEffect(() => {
    try { sessionStorage.setItem('vlahos-presentation', String(focused)) } catch { /* Mode still works without storage. */ }
  }, [focused])

  useEffect(() => {
    const oldTitle = document.title
    document.title = 'Beyond the Green Screen: Petro Vlahos and the Evolution of Special Effects'
    return () => { document.title = oldTitle }
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target instanceof HTMLElement ? e.target : null
      if (e.key === 'Escape') { closePlayer(); return }
      if (e.altKey || e.ctrlKey || e.metaKey || target?.closest('input, select, textarea, button, a, summary, [contenteditable], [data-keyboard-local]')) return
      if (!playerOpen) return
      if (e.key === 'ArrowRight' && selection.chapter < trackDefinitions.length - 1) { e.preventDefault(); selectRecording(selection.chapter + 1) }
      if (e.key === 'ArrowLeft' && selection.chapter > 0) { e.preventDefault(); selectRecording(selection.chapter - 1) }
      if (e.code === 'Space') { e.preventDefault(); root.current?.querySelector<HTMLButtonElement>('.audio-play')?.click() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [playerOpen, selection.chapter, selectRecording, closePlayer])

  const before = chapters[0]
  const colour = chapters[2]
  const sodium = chapters[3]
  const legacy = chapters[4]
  const listen = (chapter: number, control?: HTMLElement) => { enterPresentation(true, control); selectRecording(chapter, true) }

  return <AssetBase value={assetBaseUrl}><div ref={root} className={`vlahos-exhibit ${focused ? 'focused' : ''} ${playerOpen ? 'with-player' : ''} ${embedded ? 'embedded' : ''}`} data-theme={theme.mode} style={themeStyle(theme)}>
    <style>{`@font-face{font-family:BRLNSR;src:url("${assetUrl(assetBaseUrl, 'fonts/BRLNSR.TTF')}") format("truetype");font-display:swap;font-weight:400}@font-face{font-family:BRLNSD;src:url("${assetUrl(assetBaseUrl, 'fonts/BRLNSD.TTF')}") format("truetype");font-display:swap;font-weight:400}@font-face{font-family:BRLNSB;src:url("${assetUrl(assetBaseUrl, 'fonts/BRLNSB.TTF')}") format("truetype");font-display:swap;font-weight:400}`}</style>
    <a className="skip-link" href={sectionHref('main-content')}>Skip to exhibit</a>
    <Header active={active} mode={theme.mode} onTheme={hostTheme ? onToggleTheme : toggleTheme} focused={focused} onFocus={() => focused ? exitPresentation() : begin()} embedded={embedded} />
    <main id="main-content" className="exhibit-content">
      <Hero onBegin={() => listen(0)} />
      <ChapterLayout id="biography" number="01" period="1916–1950s" title="Who was Petro Vlahos?" introduction="" onListen={listen} blocks={contextBlocks} researchAside={<><h3>Vlahos’ Early Career</h3><p>Engineering took him from industrial laboratories to a research council serving Hollywood studios.</p><MediaFigure id="vlahos-portrait" className="small-portrait" /></>}>
        <div className="biography-grid"><MediaFigure id="vlahos-interview" /><div className="biography-copy"><h3>An Engineer’s Unlikely Path to Hollywood</h3><p>Vlahos was born in Raton, New Mexico. His family moved to San Pedro, California, when he was eight, and he graduated from UC Berkeley with an engineering degree in 1941. His career began outside filmmaking: he worked at Douglas Aircraft during the Second World War, then as a radar engineer at Bell Laboratories. <SourceCitation ids={['S1', 'S9']} /></p><p>At Bell Laboratories, he met an MGM sound director who introduced him to the Motion Picture Research Council. He worked there until it dissolved in 1960, then managed a military contractor’s physical sciences department. In 1968 he returned to film research as chief scientist at the Motion Picture Research Center, operated by the Association of Motion Picture and Television Producers. <SourceCitation ids={['S1']} /></p><p>Over the following decades, Vlahos developed colour-difference travelling mattes, a sodium-vapour optical system, and electronic compositing. His career brought industrial engineering into filmmaking at a time when studios increasingly depended on technical research. In 1976, he founded Ultimatte to continue developing compositing equipment. <SourceCitation ids={['S1', 'S2', 'S3', 'S4']} /></p></div></div>
        <HistoricalTimeline />
        <div className="context-visual-grid"><MediaFigure id="cinemascope-test" /><div className="context-summary"><h3>Why the Industry Needed Engineers</h3><p>Vlahos joined Hollywood as audiences increasingly watched television at home. Studios invested in wide formats, sound and spectacle to make cinema distinctive. Better effects helped them combine actors with settings that were too large, costly or dangerous to film together. <SourceCitation ids={['S8', 'S5']} /></p></div></div>
      </ChapterLayout>
      <div className="section-transition"><p>The industry’s demands were changing, but combining separate images was already an old filmmaking problem.</p></div>
      <ChapterLayout id="before-vlahos" number="02" period="Before the late 1950s" title="Before Vlahos: The Problem With Compositing" introduction="Early mattes could put an actor in another setting, but the hard part was keeping the edges of that actor consistent and convincing." onListen={listen} blocks={[...before.blocks, ...priorArtBlocks]} researchAside={<><h3>Before Vlahos</h3><p>Earlier matte processes established the technique. Vlahos worked on the image quality filmmakers could achieve with it.</p></>}>
        <div className="visual-story"><MediaFigure id="early-composites" /><div className="visual-story-copy"><h3>A Mask That Follows the Performance</h3><p>Compositing combines separately photographed images. A matte is a mask controlling which parts remain visible. A travelling matte changes with the subject in each frame; the camera itself does not have to move. Larry Butler’s work on The Thief of Bagdad (1940) was an earlier blue-screen milestone. <SourceCitation ids={['S5']} /></p><p>Hair, smoke, glass, and motion blur mix subject and background light. Treat that boundary as a hard outline and the performance can look pasted into the scene. Vlahos worked on preserving the information a crude mask would lose. <SourceCitation ids={['S2', 'S4']} /></p><a className="inline-link" href={sectionHref('colour-difference')}>See the edge problem in the demonstration ↓</a></div></div>
      </ChapterLayout>
      <ChapterLayout id="colour-difference" number="03" period="1959–1964" title="The Colour-Difference Breakthrough" introduction="In the late 1950s, Vlahos worked to improve blue-screen photography. Earlier composites often lost fine detail or left blue outlines around actors." accent="cyan" onListen={listen} leadBlocks={colour.blocks.slice(0, 2)} blocks={colour.blocks.slice(2)} researchAside={<><h3>Better Optical Composites</h3><p>Vlahos’s process was used for the sea battle and its aftermath in Ben-Hur (1959). <SourceCitation ids={['S1']} /></p><MediaFigure id="ben-hur-still" /></>}>
        <RGBVisualizer />
        <div className="paired-media"><MediaFigure id="ben-hur-camera" /><MediaFigure id="patent-colour" className="patent-figure" /></div>
      </ChapterLayout>
      <div className="section-transition"><p>Colour difference improved mattes made from blue-screen footage. Alongside that work, Vlahos was exploring how to separate the backing light inside the camera, recording the matte during the performance. <SourceCitation ids={['S2', 'S3']} /></p></div>
      <ChapterLayout id="sodium-vapour" number="04" period="1958–1964" title="Vlahos, Disney and Sodium Vapour" introduction="Vlahos developed selective optics for sodium-vapour compositing: a coated prism could separate the backing’s narrow yellow light from most of the performer’s light, allowing picture and matte to be recorded together." accent="gold" onListen={listen} afterResearchBlock={{ title: 'Why it remained specialized', content: <aside className="corridor-feature"><p className="eyebrow">A Modern Reconstruction · 2024</p><h3>Why Revisit Sodium Vapour?</h3><p>In 2024, Paul Debevec and collaborators revisited sodium-vapour matting with Corridor Crew. Their SIGGRAPH poster describes using a modern beam splitter and digital cameras to record colour and matte together. Vlahos’s optical approach still offered something useful: preserving detail during capture, before compositing. <SourceCitation ids={['S7', 'S10', 'S14']} /></p><a className="inline-link" href="https://www.youtube.com/watch?v=UQuIVsNzqDk" target="_blank" rel="noreferrer">Watch the Corridor Crew demonstration ↗</a><small>Corridor Crew · 2024</small></aside> }} leadBlocks={sodium.blocks.slice(0, 1)} blocks={sodium.blocks.slice(2)} researchAside={<><h3>A Wider Research Effort</h3><p>British researchers also developed sodium-backed matting. Ray Harryhausen described using Rank’s process on The 3 Worlds of Gulliver (1960) and Mysterious Island (1961). <SourceCitation ids={['S12']} /></p><MediaFigure id="iwerks-film" /></>}>
        <div className="sodium-feature"><MediaFigure id="disney-prism" /><div className="visual-story-copy"><h3>How the Light Was Separated</h3><p>A white or light-coloured backing reflected light from low-pressure sodium lamps, concentrated near 589 nanometres. The actors received ordinary scene lighting. The useful distinction was the narrow spectrum of the backing light, rather than yellow paint. <SourceCitation ids={['S3', 'S5']} /></p><p>Inside the modified Technicolor camera, selective optics sent most of the sodium light to black-and-white film for the matte. Most remaining scene light reached colour film. These simultaneous photographic records were then used in optical printing to combine the performance with another background. <SourceCitation ids={['S3', 'S5']} /></p></div></div>
        <SodiumVapourVisualizer />
        <ResearchBlocks prefix="sodium-significance" blocks={sodium.blocks.slice(1, 2)} />
        <div className="case-study"><div className="case-study-heading"><h3>Mary Poppins: Live Action and Animation</h3><p>In Mary Poppins, Dick Van Dyke dances with animated penguins. Sodium-vapour mattes let Disney place the moving performers within the drawn world while retaining soft edges and motion blur. Those boundaries helped the live action belong in the animated setting. <SourceCitation ids={['S5', 'S7']} /></p><p>The process also supported translucent detail, rather than forcing every edge into an opaque silhouette. Disney later used it in Bedknobs and Broomsticks (1971). Animation and optical printing remained essential to the finished scenes. <SourceCitation ids={['S3', 'S7']} /></p></div><MediaFigure id="poppins-comparison" /></div>
        <div className="paired-media"><MediaFigure id="sodium-camera" /><MediaFigure id="patent-sodium" className="patent-figure" /></div>
        <div className="collaboration"><MediaFigure id="disney-and-iwerks" /><div><p className="eyebrow">A Shared Technical Achievement</p><h3>Vlahos, Iwerks, and Pohl</h3><p>The Academy recognized Petro Vlahos, Wadsworth E. Pohl, and Ub Iwerks for colour travelling-matte composite cinematography in its 1964 awards year. Presented in 1965, their technical award was separate from Mary Poppins’s competitive Special Visual Effects award to Peter Ellenshaw, Eustace Lycett, and Hamilton Luske. <SourceCitation ids={['S6', 'S17']} /></p></div></div>
      </ChapterLayout>
      <ChapterLayout id="legacy" number="05" period="1975–2013" title="Ultimatte and Vlahos's Legacy" introduction="Vlahos continued developing compositing as film and television moved toward electronic production. Ultimatte brought his work into new workflows." onListen={listen} blocks={[...legacy.blocks, ...legacyBlocks]} researchAside={<><h3>From Ultimatte to Digital Compositing</h3><p>His later work carried colour-based separation into electronic production and helped set expectations for the digital tools that followed.</p><p><a className="inline-link" href={sectionHref('questions')}>Open the classroom questions ↓</a></p></>}>
        <div className="legacy-feature"><MediaFigure id="patent-electronic" className="patent-figure" /><div className="visual-story-copy"><h3>What Ultimatte Improved</h3><p>Vlahos founded Ultimatte in 1976. His electronic-compositing patent addressed uneven screens, shadows, blue reflections, and translucent edges. Circuits compared and combined video signals, allowing a composite to be produced electronically. <SourceCitation ids={['S1', 'S4']} /></p><dl className="honours"><div><dt>1978</dt><dd>Emmy recognition</dd></div><div><dt>1993</dt><dd>Gordon E. Sawyer Award · awards year</dd></div><div><dt>1994</dt><dd>Academy Award of Merit with Paul Vlahos · awards year</dd></div></dl><SourceCitation ids={['S1', 'S6', 'S9']} /><p>Petro and Paul’s Ultimatte award was presented in 1995, following the Academy’s 1994 awards year.</p></div></div>
      </ChapterLayout>
      <Glossary />
      <ReferenceLibrary />
    </main>
    {playerOpen && <NarrationPlayer ref={player} selection={selection} onStartPlayback={enterPresentation} onExitPresentation={exitPresentation} allowContinuation={allowContinuation} onSelect={selectRecording} onEnded={advanceRecording} onClose={closePlayer} />}
  </div></AssetBase>
}
