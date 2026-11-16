async () => {
  const wait = () => new Promise(resolve => setTimeout(resolve, 150))
  const results = []
  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
  await document.fonts.ready
  // Resolve lazy images first so image loading cannot masquerade as a disclosure jump.
  document.querySelectorAll('img').forEach(image => { image.loading = 'eager' })
  await Promise.all([...document.images].map(image => image.decode()))
  const measure = (aside, article) => ({ top: aside.getBoundingClientRect().top, left: aside.getBoundingClientRect().left, width: article.getBoundingClientRect().width, scroll: scrollY })
  for (const layout of document.querySelectorAll('.chapter .research-layout')) {
    const aside = layout.querySelector('.research-aside')
    const article = layout.querySelector('.research-article')
    for (const detail of article.querySelectorAll('.technical-detail')) {
      for (const position of ['start', 'midway']) {
        detail.open = false
        const top = layout.getBoundingClientRect().top + scrollY
        scrollTo(0, position === 'start' ? top - 180 : detail.getBoundingClientRect().top + scrollY - innerHeight / 2)
        await wait()
        const before = measure(aside, article)
        detail.querySelector('summary').click()
        await wait()
        const opened = measure(aside, article)
        detail.querySelector('summary').click()
        await wait()
        const closed = measure(aside, article)
        const stable = [opened, closed].every(state => Object.keys(before).every(key => Math.abs(state[key] - before[key]) <= 1))
        results.push({ detail: detail.id, position, stable, before, opened, closed })
      }
    }
  }
  return { viewport: [innerWidth, innerHeight], passed: results.filter(result => result.stable).length, failed: results.filter(result => !result.stable), results }
}
