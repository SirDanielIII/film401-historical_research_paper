import { useCallback, useEffect, useRef, useState } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ChapterLayout } from './components/ChapterLayout'
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
  const biography = chapters[1]
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
      {focused && <p className="presentation-note">Presentation view · The same exhibit, with detailed research tucked away. <button className="inline-link" onClick={() => setFocused(false)}>Show all research</button></p>}
      <ChapterLayout id="biography" number="01" period="1916–1950s · ORIGINS & CAREER" title="Who was Petro Vlahos?" introduction="Before he worked on movie images, he worked on aircraft and radar. His route into Hollywood ran through engineering and shared studio research." recording={2} onListen={listen} blocks={[...biography.blocks.slice(1, 3), ...contextBlocks, biography.blocks[3]]} researchAside={<><h3>An engineer in the studio system</h3><p>His employers and institutions are documented. Connections to the wider political climate need a different kind of argument.</p><MediaFigure id="vlahos-portrait" className="small-portrait" /></>}>
        <div className="biography-grid"><MediaFigure id="vlahos-interview" /><div className="biography-copy"><p className="eyebrow">PETRO VLAHOS · 20 AUGUST 1916 – 10 FEBRUARY 2013</p><h3>From Raton to the film laboratory</h3><p>Vlahos was born in Raton, New Mexico. His family moved to San Pedro, California, when he was eight, and he graduated from UC Berkeley with an engineering degree in 1941. His career began outside filmmaking: he worked at Douglas Aircraft during the Second World War, then as a radar engineer at Bell Laboratories. <SourceCitation ids={['S1', 'S9']} /></p><p>According to his Los Angeles Times obituary, an MGM sound director connected him with the Motion Picture Research Council. He stayed until its dissolution in 1960 and returned to film research as chief scientist at the Academy’s Motion Picture Research Center in 1968. This route helps explain his attention to the whole system: the lighting, the camera, the recorded information, and the work needed to turn those elements into a finished image. <SourceCitation ids={['S1']} /></p><p>His best-known contributions were colour-difference travelling mattes, a patented sodium-vapour optical system, and electronic compositing associated with Ultimatte, founded in 1976. Aircraft and radar work are documented parts of his background; a direct technical derivation of those inventions from wartime work is not established. <SourceCitation ids={['S1', 'S2', 'S3', 'S4']} /></p></div></div>
        <HistoricalTimeline />
        <div className="context-visual-grid"><MediaFigure id="cinemascope-test" /><div className="context-summary"><p className="eyebrow">HOLLYWOOD IN THE 1950s</p><h3>Why the industry needed engineers</h3><p>Television changed where audiences watched moving images. Studios invested in wide formats, sound, and spectacle to give the cinema a different appeal. At the same time, antitrust action, political investigations, and labour tensions were changing the conditions of studio work. <SourceCitation ids={['S8', 'S15', 'S16']} /></p><p>The Motion Picture Research Council, established in 1948, brought studios together around technical problems. That institution is a direct link to Vlahos’s career; the wider political pressures are context.</p></div></div>
      </ChapterLayout>
      <p className="section-transition">The industry’s demands were changing, but combining separate images was already an old filmmaking problem.</p>
      <ChapterLayout id="before-vlahos" number="02" period="BEFORE THE LATE 1950s" title="Before Vlahos: the problem with compositing" introduction="Earlier mattes could put an actor in another setting. The hard part was keeping the edges of that actor convincing." recording={3} onListen={listen} blocks={[...before.blocks, ...priorArtBlocks]} researchAside={<><h3>What existed before him?</h3><p>Vlahos entered an established tradition. His contribution is clearer when the earlier techniques and their limits remain in view.</p></>}>
        <div className="visual-story"><MediaFigure id="early-composites" /><div className="visual-story-copy"><p className="eyebrow">A TRAVELLING MATTE</p><h3>A mask that follows the performance</h3><p>A matte controls which parts of an image survive. A travelling matte changes with the subject in each frame; the camera itself does not have to move. Larry Butler’s work on The Thief of Bagdad (1940) was an earlier blue-screen milestone. <SourceCitation ids={['S5']} /></p><p>Hair, smoke, glass, and motion blur mix subject and background light. Treat that boundary as a hard outline and the performance can look pasted into the scene. Vlahos worked on preserving the information a crude mask would lose. <SourceCitation ids={['S2', 'S4']} /></p><a className="inline-link" href="#colour-difference">See the edge problem in the demonstration ↓</a></div></div>
      </ChapterLayout>
      <ChapterLayout id="colour-difference" number="03" period="1959 FILING · 1964 GRANT" title="The colour-difference breakthrough" introduction="A blue screen was a starting point. Vlahos’s process used relationships between photographic colour records to make a better matte and reconstruct the foreground." accent="cyan" recording={3} onListen={listen} blocks={colour.blocks} researchAside={<><h3>Ben-Hur and the format problem</h3><p>A useful process still had to fit the camera and negative size. Foster connects the colour-difference development with Ben-Hur’s 65 mm requirements. <SourceCitation ids={['S5']} /></p><MediaFigure id="ben-hur-still" /></>}>
        <RGBVisualizer />
        <div className="paired-media"><MediaFigure id="ben-hur-camera" /><MediaFigure id="patent-colour" className="patent-figure" /></div>
        <div className="process-strip" aria-label="Photochemical colour-difference process"><span>01 · Photograph against blue</span><span>02 · Make colour records</span><span>03 · Construct and refine mattes</span><span>04 · Reconstruct and print</span></div>
      </ChapterLayout>
      <p className="section-transition">Blue-screen work was one branch of the research. Vlahos had already filed a different optical approach in 1958: separate the backing light inside the camera.</p>
      <ChapterLayout id="sodium-vapour" number="04" period="1958 FILING · 1963 GRANT · MARY POPPINS, 1964" title="The sodium-vapour process" introduction="Instead of identifying a broad backing colour after photography, this system isolated a narrow band of yellow light and recorded a matte alongside the performance." accent="gold" recording={4} onListen={listen} blocks={sodium.blocks} researchAside={<><h3>Keep the chronology clear</h3><p>Sodium patent filed: 15 May 1958.<br />Colour-difference patent filed: 2 April 1959.</p><p>These are related approaches developed in the same period, presented here by technique rather than as a simple succession. <SourceCitation ids={['S2', 'S3']} /></p><MediaFigure id="iwerks-film" /></>}>
        <div className="sodium-feature"><MediaFigure id="disney-prism" /><div className="visual-story-copy"><p className="eyebrow">LIGHT NEAR 589 nm</p><h3>Yellow light, not yellow paint</h3><p>Low-pressure sodium lamps illuminate the backing. The performer receives broad-spectrum lighting. Coated optics separate the sodium band into a monochrome record while the remaining light forms the colour picture. The two records share the same view and instant of exposure. <SourceCitation ids={['S3']} /></p><p>A colour photograph of a yellow screen cannot recreate that spectral separation. The diagram below explains the optical paths; it does not turn an RGB image into a genuine sodium record.</p></div></div>
        <SodiumVapourVisualizer />
        <div className="case-study"><div className="case-study-heading"><p className="eyebrow">FILM CASE STUDY · 1964</p><h3>Mary Poppins: making the elements meet</h3><p>The sodium process supplied a well-matched matte for live action and animation. Animators, optical-printer crews, cinematographers, and editors still had to make the combined world work. <SourceCitation ids={['S5', 'S7']} /></p></div><MediaFigure id="poppins-comparison" /></div>
        <div className="paired-media"><MediaFigure id="sodium-camera" /><MediaFigure id="patent-sodium" className="patent-figure" /></div>
        <div className="collaboration"><MediaFigure id="disney-and-iwerks" /><div><p className="eyebrow">A SHARED TECHNICAL ACHIEVEMENT</p><h3>Vlahos, Iwerks, and Pohl</h3><p>The Academy’s 1964 awards-year record names Petro Vlahos, Wadsworth E. Pohl, and Ub Iwerks together. Foster emphasizes Vlahos’s prism design and Iwerks’s camera adaptation; Disney’s history foregrounds Iwerks. The shared official credit is clear, even where accounts differ about individual roles. <SourceCitation ids={['S5', 'S6', 'S7']} /></p><p>The award year is 1964; the ceremony took place in 1965. Parallel British sodium work also belongs to the history. <SourceCitation ids={['S5', 'S6', 'S12']} /></p></div></div>
      </ChapterLayout>
      <ChapterLayout id="legacy" number="05" period="1975–2013 · ELECTRONIC COMPOSITING & AFTER" title="Ultimatte and his legacy" introduction="The image medium changed, but the engineering problem persisted: preserve the subject, control the backing, and keep the difficult edges." recording={5} onListen={listen} blocks={[...legacy.blocks, ...legacyBlocks]} researchAside={<><h3>Influence without the invention myth</h3><p>The continuity is a problem and a set of principles. Modern digital compositing has many contributors; it is not all one historical patent.</p><p><a className="inline-link" href="#questions">Open the classroom questions ↓</a></p></>}>
        <div className="legacy-feature"><MediaFigure id="patent-electronic" className="patent-figure" /><div className="visual-story-copy"><p className="eyebrow">FROM FILM RECORDS TO IMAGE SIGNALS</p><h3>What Ultimatte improved</h3><p>Vlahos founded Ultimatte in 1976. His electronic-compositing patent addressed uneven screens, shadows, blue reflections, and translucent edges. Circuits could compare and combine signals in a workflow very different from photographic printing. <SourceCitation ids={['S1', 'S4']} /></p><dl className="honours"><div><dt>1978</dt><dd>Emmy recognition</dd></div><div><dt>1993</dt><dd>Gordon E. Sawyer Award · awards year</dd></div><div><dt>1994</dt><dd>Academy Award of Merit with Paul Vlahos · awards year</dd></div></dl><SourceCitation ids={['S1', 'S6', 'S9']} /><p>The achievement was a more dependable way to combine images, across changing media. It expanded what crews could attempt while leaving lighting, perspective, and matching just as important.</p></div></div>
        <div className="era-comparison"><article><p className="eyebrow">PHOTOCHEMICAL</p><h3>Film records</h3><p>Colour separations, mattes, registration, and printing.</p><SourceCitation ids={['S2']} /></article><article><p className="eyebrow">ELECTRONIC</p><h3>Video signals</h3><p>Circuitry controls the mixture and corrects unwanted backing colour.</p><SourceCitation ids={['S4']} /></article><article><p className="eyebrow">DIGITAL</p><h3>Pixels and alpha</h3><p>Software derives coverage. A normal RGB sensor does not directly record a perfect matte.</p><SourceCitation ids={['S11']} /></article></div>
        <aside className="corridor-feature"><p className="eyebrow">A MODERN RECONSTRUCTION · 2024</p><h3>Why revisit sodium vapour?</h3><p>Corridor Crew’s reconstruction shows continuing interest in spectral separation. It is useful visual explanation, rather than primary evidence for who invented the mid-century process. Disney’s archive also complicates the video title’s “lost” prism story. <SourceCitation ids={['S7', 'S10', 'S14']} /></p><a className="inline-link" href="https://www.youtube.com/watch?v=UQuIVsNzqDk" target="_blank" rel="noreferrer">Watch the Corridor Crew demonstration ↗</a><small>External video · internet required · no autoplay</small></aside>
      </ChapterLayout>
      <Glossary />
      <ReferenceLibrary />
    </main>
    <footer className="exhibit-footer"><a href="#introduction">Beyond the Green Screen ↑</a><p>Petro Vlahos and the Evolution of Special Effects<br />FILM 401 · Historical research exhibit</p><span>Research and narration are separate.<br />No audio plays automatically.</span></footer>
    {playerOpen && <NarrationPlayer key={recording} chapter={recording} onSelect={selectRecording} onClose={() => { setPlayerOpen(false); setFocused(false) }} />}
  </div></AssetBase>
}
