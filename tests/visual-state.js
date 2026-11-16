async () => {
  const hash = location.hash
  const root = document.querySelector('.vlahos-exhibit')
  const themeButton = document.querySelector('.theme-toggle')
  if (themeButton && root.dataset.theme !== 'light') themeButton.click()
  document.querySelector('.player-close')?.click()
  if (hash !== '#introduction') location.hash = 'introduction'
  else scrollTo(0, 0)
  await new Promise(resolve => setTimeout(resolve, 150))
  return { theme: root.dataset.theme, images: [...document.images].filter(i => i.complete && !i.naturalWidth).map(i => i.src), viewport: [innerWidth, innerHeight] }
}
