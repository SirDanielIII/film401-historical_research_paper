export function parseRoute(hash: string) {
  const route = hash.replace(/^#/, '')
  if (/^chapter-[1-5]$/.test(route) || route === 'sources' || route === 'glossary' || /^source-S\d+$/.test(route)) return route
  const research = route.match(/^research-([1-5])-\d+$/)
  return research ? `chapter-${research[1]}` : 'home'
}

export function adjacentChapter(current: number, direction: 'ArrowLeft' | 'ArrowRight') {
  const next = current + (direction === 'ArrowRight' ? 1 : -1)
  return next >= 1 && next <= 5 ? `chapter-${next}` : null
}
