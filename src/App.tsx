import { useCallback, useEffect, useRef, useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ChapterLayout } from './components/ChapterLayout'
import { ResearchBlocks } from './components/ResearchSection'
import { MediaFigure } from './components/MediaFigure'
import { HistoricalTimeline } from './components/HistoricalTimeline'
import { RGBVisualizer } from './components/RGBVisualizer'
import { SodiumVapourVisualizer } from './components/SodiumVapourVisualizer'
import { NarrationPlayer } from './components/NarrationPlayer'
import { ReferenceLibrary } from './components/ReferenceLibrary'
import { Glossary } from './components/Glossary'
import { SourceCitation } from './components/SourceCitation'
import { chapters } from './data/chapters'
import { contextBlocks, legacyBlocks, priorArtBlocks } from './data/context'
import { legacyAnchors, recordingSections, sections } from './data/sections'
import { AssetBase, assetUrl } from './lib/assets'
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

export default function PetroVlahosExhibit({ theme: hostTheme, onToggleTheme, embedded = false, assetBaseUrl = import.meta.env.BASE_URL }: ExhibitProps) {
  const [mode, setMode] = useState(savedMode)
  const [focused, setFocused] = useState(false)
  const [playerOpen, setPlayerOpen] = useState(false)
  const [recording, setRecording] = useState(1)
  const [active, setActive] = useState('introduction')
  const root = useRef<HTMLDivElement>(null)
  const theme = hostTheme ?? themes[mode]

  const selectRecording = useCallback((chapter: number, navigate = true) => {
    setRecording(Math.max(1, Math.min(5, chapter)))
    setPlayerOpen(true)
    if (navigate) window.location.hash = recordingSections[chapter - 1]
  }, [])

  function begin() {
    setFocused(true)
    selectRecording(1)
    root.current?.querySelector('#introduction')?.scrollIntoView({ block: 'start' })
  }

  function toggleTheme() {
    const next = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    try { localStorage.setItem('vlahos-theme', next) } catch { /* Theme still works without storage. */ }
  }

  useEffect(() => {
    const oldTitle = document.title
    document.title = 'Beyond the Green Screen: Petro Vlahos and the Evolution of Special Effects'
    return () => { document.title = oldTitle }
  }, [])

  useEffect(() => {
    function onHash() {
      const hash = decodeURIComponent(window.location.hash.slice(1))
      if (!hash) return
      if (legacyAnchors[hash]) { window.location.replace(`#${legacyAnchors[hash]}`); return }
      if (hash.startsWith('source-') || hash.startsWith('credit-') || hash === 'references' || hash === 'questions') {
        root.current?.querySelectorAll('audio').forEach(audio => audio.pause())
      }
      // Deep links also reveal their optional containing disclosure.
      const target = document.getElementById(hash)
      let ancestor: HTMLElement | null = target
      while (ancestor) {
        if (ancestor instanceof HTMLDetailsElement) ancestor.open = true
        ancestor = ancestor.parentElement
      }
      requestAnimationFrame(() => {
        target?.scrollIntoView({ block: 'start' })
        if (target?.matches('article, h1, h2')) target.focus({ preventScroll: true })
      })
    }
    window.addEventListener('hashchange', onHash)
    const initial = requestAnimationFrame(onHash)
    return () => { window.removeEventListener('hashchange', onHash); cancelAnimationFrame(initial) }
  }, [])

  useEffect(() => {
    let frame = 0
    function update() {
      frame = 0
      let current = 'introduction'
      const threshold = (root.current?.querySelector('.exhibit-header')?.getBoundingClientRect().bottom ?? 100) + 100
      for (const section of sections) {
        const element = document.getElementById(section.id)
        if (element && element.getBoundingClientRect().top <= threshold) current = section.id
      }
      setActive(current)
    }
    function onScroll() { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    frame = requestAnimationFrame(update)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame) }
  }, [focused])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target instanceof HTMLElement ? e.target : null
      if (e.key === 'Escape') { setFocused(false); setPlayerOpen(false); return }
      if (e.altKey || e.ctrlKey || e.metaKey || target?.closest('input, select, textarea, [contenteditable="true"], [data-keyboard-local]')) return
      if (!playerOpen) return
      if (e.key === 'ArrowRight' && recording < 5) { e.preventDefault(); selectRecording(recording + 1) }
      if (e.key === 'ArrowLeft' && recording > 1) { e.preventDefault(); selectRecording(recording - 1) }
      if (e.code === 'Space' && !target?.closest('button, a, summary')) { e.preventDefault(); root.current?.querySelector<HTMLButtonElement>('.audio-play')?.click() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [playerOpen, recording, selectRecording])

  const before = chapters[0]
  const colour = chapters[2]
  const sodium = chapters[3]
  const legacy = chapters[4]
  const listen = (chapter: number) => selectRecording(chapter, false)

  return <AssetBase value={assetBaseUrl}><div ref={root} className={`vlahos-exhibit ${focused ? 'focused' : ''} ${playerOpen ? 'with-player' : ''} ${embedded ? 'embedded' : ''}`} data-theme={theme.mode} style={themeStyle(theme)}>
    <style>{`@font-face{font-family:BRLNSR;src:url("${assetUrl(assetBaseUrl, 'fonts/BRLNSR.TTF')}") format("truetype");font-display:swap;font-weight:400}@font-face{font-family:BRLNSD;src:url("${assetUrl(assetBaseUrl, 'fonts/BRLNSD.TTF')}") format("truetype");font-display:swap;font-weight:400}@font-face{font-family:BRLNSB;src:url("${assetUrl(assetBaseUrl, 'fonts/BRLNSB.TTF')}") format("truetype");font-display:swap;font-weight:400}`}</style>
    <a className="skip-link" href="#main-content">Skip to exhibit</a>
    <Header active={active} mode={theme.mode} onTheme={hostTheme ? onToggleTheme : toggleTheme} focused={focused} onFocus={() => focused ? setFocused(false) : begin()} embedded={embedded} />
    <main id="main-content" className="exhibit-content">
      <Hero onBegin={begin} />
      {focused && <p className="presentation-note">Presentation view · <button className="inline-link" onClick={() => setFocused(false)}>Show section details</button></p>}
      <ChapterLayout id="biography" number="01" period="1916–1950s · ORIGINS & CAREER" title="Who was Petro Vlahos?" introduction="Before he worked on movie images, he worked on aircraft and radar. His route into Hollywood ran through engineering and shared studio research." recording={2} onListen={listen} blocks={contextBlocks} researchAside={<><h3>Vlahos’s early career</h3><p>Engineering took him from industrial laboratories to a research council serving Hollywood studios.</p><MediaFigure id="vlahos-portrait" className="small-portrait" /></>}>
        <div className="biography-grid"><MediaFigure id="vlahos-interview" /><div className="biography-copy"><p className="eyebrow">PETRO VLAHOS · 20 AUGUST 1916 – 10 FEBRUARY 2013</p><h3>From Raton to the film laboratory</h3><p>Vlahos was born in Raton, New Mexico. His family moved to San Pedro, California, when he was eight, and he graduated from UC Berkeley with an engineering degree in 1941. His career began outside filmmaking: he worked at Douglas Aircraft during the Second World War, then as a radar engineer at Bell Laboratories. <SourceCitation ids={['S1', 'S9']} /></p><p>At Bell Laboratories, he met an MGM sound director who introduced him to the Motion Picture Research Council. He worked there until it dissolved in 1960, then managed a military contractor’s physical sciences department. In 1968 he returned to film research as chief scientist at the Motion Picture Research Center, operated by the Association of Motion Picture and Television Producers. <SourceCitation ids={['S1']} /></p><p>Over the following decades, Vlahos developed colour-difference travelling mattes, a sodium-vapour optical system, and electronic compositing. His career brought industrial engineering into filmmaking at a time when studios increasingly depended on technical research. In 1976, he founded Ultimatte to continue developing compositing equipment. <SourceCitation ids={['S1', 'S2', 'S3', 'S4']} /></p></div></div>
        <HistoricalTimeline />
        <div className="context-visual-grid"><MediaFigure id="cinemascope-test" /><div className="context-summary"><p className="eyebrow">HOLLYWOOD IN THE 1950s</p><h3>Why the industry needed engineers</h3><p>Vlahos joined Hollywood as audiences increasingly watched television at home. Studios invested in wide formats, sound and spectacle to make cinema distinctive. Better effects helped them combine actors with settings that were too large, costly or dangerous to film together. <SourceCitation ids={['S8', 'S15', 'S16']} /></p></div></div>
      </ChapterLayout>
      <div className="section-transition"><p>The industry’s demands were changing, but combining separate images was already an old filmmaking problem.</p></div>
      <ChapterLayout id="before-vlahos" number="02" period="BEFORE THE LATE 1950s" title="Before Vlahos: the problem with compositing" introduction="Earlier mattes could put an actor in another setting. The hard part was keeping the edges of that actor convincing." recording={3} onListen={listen} blocks={[...before.blocks, ...priorArtBlocks]} researchAside={<><h3>Before Vlahos</h3><p>Earlier matte processes established the technique. Vlahos worked on the image quality filmmakers could achieve with it.</p></>}>
        <div className="visual-story"><MediaFigure id="early-composites" /><div className="visual-story-copy"><p className="eyebrow">A TRAVELLING MATTE</p><h3>A mask that follows the performance</h3><p>Compositing combines separately photographed images. A matte is a mask controlling which parts remain visible. A travelling matte changes with the subject in each frame; the camera itself does not have to move. Larry Butler’s work on The Thief of Bagdad (1940) was an earlier blue-screen milestone. <SourceCitation ids={['S5']} /></p><p>Hair, smoke, glass, and motion blur mix subject and background light. Treat that boundary as a hard outline and the performance can look pasted into the scene. Vlahos worked on preserving the information a crude mask would lose. <SourceCitation ids={['S2', 'S4']} /></p><a className="inline-link" href="#colour-difference">See the edge problem in the demonstration ↓</a></div></div>
      </ChapterLayout>
      <ChapterLayout id="colour-difference" number="03" period="1959 FILING · 1964 GRANT" title="The colour-difference breakthrough" introduction="In the late 1950s, Vlahos worked to improve blue-screen photography. Earlier composites often lost fine detail or left blue outlines around actors." accent="cyan" recording={3} onListen={listen} leadBlocks={colour.blocks.slice(0, 2)} blocks={colour.blocks.slice(2)} researchAside={<><h3>Better optical composites</h3><p>Vlahos’s process was used for the sea battle and its aftermath in Ben-Hur (1959). <SourceCitation ids={['S1']} /></p><MediaFigure id="ben-hur-still" /></>}>
        <RGBVisualizer />
        <div className="paired-media"><MediaFigure id="ben-hur-camera" /><MediaFigure id="patent-colour" className="patent-figure" /></div>
      </ChapterLayout>
      <div className="section-transition"><p>Colour difference improved mattes made from blue-screen footage. Alongside that work, Vlahos was exploring how to separate the backing light inside the camera, recording the matte during the performance. <SourceCitation ids={['S2', 'S3']} /></p></div>
      <ChapterLayout id="sodium-vapour" number="04" period="1958 FILING · 1963 GRANT · MARY POPPINS, 1964" title="Vlahos, Disney and sodium vapour" introduction="Vlahos developed selective optics for sodium-vapour compositing: a coated prism could separate the backing’s narrow yellow light from most of the performer’s light, allowing picture and matte to be recorded together." accent="gold" recording={4} onListen={listen} leadBlocks={sodium.blocks.slice(0, 1)} blocks={sodium.blocks.slice(2)} researchAside={<><h3>A wider research effort</h3><p>British researchers also developed sodium-backed matting. Ray Harryhausen described using Rank’s process on The 3 Worlds of Gulliver (1960) and Mysterious Island (1961). <SourceCitation ids={['S12']} /></p><MediaFigure id="iwerks-film" /></>}>
        <div className="sodium-feature"><MediaFigure id="disney-prism" /><div className="visual-story-copy"><p className="eyebrow">LIGHT NEAR 589 nm</p><h3>How the light was separated</h3><p>A white or light-coloured backing reflected light from low-pressure sodium lamps, concentrated near 589 nanometres. The actors received ordinary scene lighting. The useful distinction was the narrow spectrum of the backing light, rather than yellow paint. <SourceCitation ids={['S3', 'S5']} /></p><p>Inside the modified Technicolor camera, selective optics sent most of the sodium light to black-and-white film for the matte. Most remaining scene light reached colour film. These simultaneous photographic records were then used in optical printing to combine the performance with another background. <SourceCitation ids={['S3', 'S5']} /></p></div></div>
        <SodiumVapourVisualizer />
        <ResearchBlocks prefix="sodium-significance" blocks={sodium.blocks.slice(1, 2)} />
        <div className="case-study"><div className="case-study-heading"><p className="eyebrow">FILM CASE STUDY · 1964</p><h3>Mary Poppins: live action and animation</h3><p>In Mary Poppins, Dick Van Dyke dances with animated penguins. Sodium-vapour mattes let Disney place the moving performers within the drawn world while retaining soft edges and motion blur. Those boundaries helped the live action belong in the animated setting. <SourceCitation ids={['S5', 'S7']} /></p><p>The process also supported translucent detail, rather than forcing every edge into an opaque silhouette. Disney later used it in Bedknobs and Broomsticks (1971). Animation and optical printing remained essential to the finished scenes. <SourceCitation ids={['S3', 'S7']} /></p></div><MediaFigure id="poppins-comparison" /></div>
        <div className="paired-media"><MediaFigure id="sodium-camera" /><MediaFigure id="patent-sodium" className="patent-figure" /></div>
        <div className="collaboration"><MediaFigure id="disney-and-iwerks" /><div><p className="eyebrow">A SHARED TECHNICAL ACHIEVEMENT</p><h3>Vlahos, Iwerks, and Pohl</h3><p>The Academy recognized Petro Vlahos, Wadsworth E. Pohl, and Ub Iwerks for colour travelling-matte composite cinematography in its 1964 awards year. Presented in 1965, their technical award was separate from Mary Poppins’s competitive Special Visual Effects award to Peter Ellenshaw, Eustace Lycett, and Hamilton Luske. <SourceCitation ids={['S6', 'S17']} /></p></div></div>
      </ChapterLayout>
      <ChapterLayout id="legacy" number="05" period="1975–2013 · ELECTRONIC COMPOSITING & AFTER" title="Ultimatte and his legacy" introduction="Vlahos continued developing compositing as film and television moved toward electronic production. Ultimatte brought his work into new workflows." recording={5} onListen={listen} blocks={[...legacy.blocks, ...legacyBlocks]} researchAside={<><h3>From Ultimatte to digital compositing</h3><p>His later work carried colour-based separation into electronic production and helped set expectations for the digital tools that followed.</p><p><a className="inline-link" href="#questions">Open the classroom questions ↓</a></p></>}>
        <div className="legacy-feature"><MediaFigure id="patent-electronic" className="patent-figure" /><div className="visual-story-copy"><p className="eyebrow">FROM FILM RECORDS TO IMAGE SIGNALS</p><h3>What Ultimatte improved</h3><p>Vlahos founded Ultimatte in 1976. His electronic-compositing patent addressed uneven screens, shadows, blue reflections, and translucent edges. Circuits compared and combined video signals, allowing a composite to be produced electronically. <SourceCitation ids={['S1', 'S4']} /></p><dl className="honours"><div><dt>1978</dt><dd>Emmy recognition</dd></div><div><dt>1993</dt><dd>Gordon E. Sawyer Award · awards year</dd></div><div><dt>1994</dt><dd>Academy Award of Merit with Paul Vlahos · awards year</dd></div></dl><SourceCitation ids={['S1', 'S6', 'S9']} /><p>Petro and Paul’s Ultimatte award was presented in 1995, following the Academy’s 1994 awards year.</p></div></div>
        <div className="era-comparison"><article><p className="eyebrow">PHOTOCHEMICAL</p><h3>Film records</h3><p>Colour separations, mattes, registration, and printing.</p><SourceCitation ids={['S2']} /></article><article><p className="eyebrow">ELECTRONIC</p><h3>Video signals</h3><p>Circuitry controls the mixture and corrects unwanted backing colour.</p><SourceCitation ids={['S4']} /></article><article><p className="eyebrow">DIGITAL</p><h3>Pixels and alpha</h3><p>Software estimates foreground coverage and uses it to blend image layers.</p><SourceCitation ids={['S18']} /></article></div>
        <aside className="corridor-feature"><p className="eyebrow">A MODERN RECONSTRUCTION · 2024</p><h3>Why revisit sodium vapour?</h3><p>In 2024, Paul Debevec and collaborators revisited sodium-vapour matting with Corridor Crew. Their SIGGRAPH poster describes using a modern beam splitter and digital cameras to record colour and matte together. Vlahos’s optical approach still offered something useful: preserving detail during capture, before compositing. <SourceCitation ids={['S7', 'S10', 'S14']} /></p><a className="inline-link" href="https://www.youtube.com/watch?v=UQuIVsNzqDk" target="_blank" rel="noreferrer">Watch the Corridor Crew demonstration ↗</a><small>Corridor Crew · 2024</small></aside>
      </ChapterLayout>
      <Glossary />
      <ReferenceLibrary />
    </main>
    {playerOpen && <NarrationPlayer key={recording} chapter={recording} onSelect={selectRecording} onClose={() => { setPlayerOpen(false); setFocused(false) }} />}
  </div></AssetBase>
}
