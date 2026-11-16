// Keep the content in view when presentation hides or reveals research above it.
export function preserveReadingPosition(root: HTMLElement, preferredAnchor?: HTMLElement) {
  const readingLine = (root.querySelector('.exhibit-header')?.getBoundingClientRect().bottom ?? 0) + 24
  const content = root.querySelector('main')
  const contentRect = content?.getBoundingClientRect()
  const selector = 'h1, h2, h3, h4, p, figure, canvas, details, article'
  let anchor: HTMLElement | null = null
  if (preferredAnchor && root.contains(preferredAnchor)) {
    const rect = preferredAnchor.getBoundingClientRect()
    if (rect.width && rect.height && rect.bottom > readingLine - 24 && rect.top < window.innerHeight) anchor = preferredAnchor
  }
  // Usually one hit test finds the actual text/image at the reading line.
  // Skip fixed overlays such as the transcript instead of anchoring to them.
  if (!anchor && content && contentRect) {
    for (const fraction of [0.5, 0.25, 0.75]) {
      const x = contentRect.left + contentRect.width * fraction
      for (const element of document.elementsFromPoint(x, readingLine)) {
        const candidate = element.closest<HTMLElement>(selector)
        if (candidate && content.contains(candidate)) { anchor = candidate; break }
      }
      if (anchor) break
    }
  }
  let distance = Infinity
  if (!anchor) {
    for (const candidate of root.querySelectorAll<HTMLElement>(`main :is(${selector})`)) {
      const rect = candidate.getBoundingClientRect()
      if (!rect.width || !rect.height || rect.bottom <= readingLine || rect.top >= window.innerHeight) continue
      const proximity = Math.abs(rect.top - readingLine)
      if (proximity < distance) { anchor = candidate; distance = proximity }
    }
  }
  const anchors: { element: HTMLElement; top: number }[] = []
  for (let element = anchor; element && root.contains(element); element = element.parentElement) {
    anchors.push({ element, top: element.getBoundingClientRect().top })
  }
  const scrollY = window.scrollY
  const previousAnchoring = root.style.overflowAnchor
  // Browser anchoring must not compete with this one layout correction.
  root.style.overflowAnchor = 'none'
  return () => {
    let frame = 0
    const interactions = ['wheel', 'touchstart', 'pointerdown', 'keydown']
    const finish = () => {
      cancelAnimationFrame(frame)
      root.style.overflowAnchor = previousAnchoring
      interactions.forEach(type => window.removeEventListener(type, finish))
    }
    const restore = () => {
      // If entering presentation hides the text itself, retain its nearest
      // visible container rather than using a hidden element's zero rectangle.
      let destination = scrollY
      for (const { element, top } of anchors) {
        if (!element.isConnected) continue
        const rect = element.getBoundingClientRect()
        if (rect.width && rect.height) { destination = window.scrollY + rect.top - top; break }
      }
      window.scrollTo({ top: destination, behavior: 'instant' })
    }
    restore()
    // Chrome can deliver one final compositor scroll frame after a native
    // smooth scroll is cancelled. Correct it once, then release the anchor.
    // Any new interaction or React transition cancels this final correction.
    interactions.forEach(type => window.addEventListener(type, finish, { passive: true }))
    frame = requestAnimationFrame(() => { restore(); finish() })
    return finish
  }
}
