async () => {
  const wait = () => new Promise(resolve => setTimeout(resolve, 150))
  const results = []
  for (const id of ['introduction', 'biography', 'before-vlahos', 'colour-difference', 'sodium-vapour', 'legacy', 'questions', 'references']) {
    location.hash = id; await wait()
    const element = document.getElementById(id)
    const rect = element.getBoundingClientRect()
    const overflowing = [...element.querySelectorAll('*')].filter(el => {
      const style = getComputedStyle(el)
      if (el.closest('.sodium-optics')) return false // Intentional diagram-only scroll region.
      if (style.display === 'none' || !el.getClientRects().length || el.closest('details:not([open])') && el.tagName !== 'SUMMARY') return false
      const r = el.getBoundingClientRect()
      return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1)
    }).slice(0, 8).map(el => ({ tag: el.tagName, class: el.className }))
    results.push({ section: id, viewport: [innerWidth, innerHeight], top: rect.top, noPageOverflow: document.documentElement.scrollWidth <= document.documentElement.clientWidth, overflowing })
  }
  return results
}
