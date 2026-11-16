import { useCallback, useEffect, useRef, useState, type RefObject } from 'react'
import { sections } from '../data/navigation/sections'
import { parseRoute, sectionForRoute } from '../lib/navigation/routes'

export function useExhibitNavigation(root: RefObject<HTMLDivElement | null>, onManual: (section: string, origin: 'scroll' | 'navigation') => void) {
  const [active, setActive] = useState(() => sectionForRoute(parseRoute(window.location.hash)))
  const manual = useRef(onManual)
  const lock = useRef(0)
  const observed = useRef(active)
  const currentRoute = useRef('')
  useEffect(() => { manual.current = onManual }, [onManual])

  const cancelNavigation = useCallback(() => {
    cancelAnimationFrame(lock.current)
    lock.current = 0
    window.scrollTo({ top: window.scrollY, behavior: 'instant' })
  }, [])

  const navigate = useCallback((id: string, historyMode: 'push' | 'replace' | 'none' = 'push', automatic = false, focus = false, smooth = true) => {
    const route = parseRoute(id)
    const target = document.getElementById(route)
    if (!target || !root.current?.contains(target)) return
    cancelAnimationFrame(lock.current)
    const section = target.closest<HTMLElement>('.major-section, .questions-section')?.id ?? sectionForRoute(route)
    if (!automatic) manual.current(section, 'navigation')
    currentRoute.current = route
    observed.current = section
    setActive(section)
    // Relative hash preserves both a standalone deployment and the host route.
    if (historyMode !== 'none' && window.location.hash !== `#${route}`) {
      window.history[historyMode === 'push' ? 'pushState' : 'replaceState'](null, '', `#${encodeURIComponent(route)}`)
    }
    let ancestor: HTMLElement | null = target
    while (ancestor && root.current.contains(ancestor)) {
      if (ancestor instanceof HTMLDetailsElement) ancestor.open = true
      ancestor = ancestor.parentElement
    }
    target.scrollIntoView({ block: 'start', behavior: smooth && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'instant' })
    if (focus) {
      const heading = target.matches('h1, h2, article') ? target : target.querySelector<HTMLElement>('h1, h2')
      heading?.focus({ preventScroll: true })
    }
    // Keep passive observation locked through the entire native smooth scroll.
    // Geometry, rather than a timer, determines when the destination is reached.
    let lastY = window.scrollY, stable = 0
    const settled = () => {
      const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0
      const desired = Math.max(0, Math.min(window.scrollY + target.getBoundingClientRect().top - margin, document.documentElement.scrollHeight - innerHeight))
      stable = Math.abs(window.scrollY - lastY) < 1 ? stable + 1 : 0
      lastY = window.scrollY
      if (stable >= 3 && Math.abs(window.scrollY - desired) < 2) lock.current = 0
      else {
        // A mode/layout change can move the target during native scrolling.
        if (stable >= 6) target.scrollIntoView({ block: 'start', behavior: 'instant' })
        lock.current = requestAnimationFrame(settled)
      }
    }
    lock.current = requestAnimationFrame(settled)
  }, [root])

  useEffect(() => {
    let frame = 0, disposed = false
    const readLocation = () => {
      const route = parseRoute(window.location.hash)
      if (route === currentRoute.current) return // popstate may also emit hashchange.
      navigate(route, window.location.hash.slice(1) === route ? 'none' : 'replace', false, false, false)
    }
    const click = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href]')
      if (!anchor || anchor.download || anchor.target && anchor.target !== '_self') return
      const url = new URL(anchor.href)
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || !url.hash) return
      if (!document.getElementById(parseRoute(url.hash))) return
      event.preventDefault()
      navigate(url.hash, 'push', false, event.detail === 0)
    }
    const update = () => {
      frame = 0
      if (lock.current) return
      let section = 'introduction'
      const threshold = (root.current?.querySelector('.exhibit-header')?.getBoundingClientRect().bottom ?? 100) + 100
      for (const id of [...sections.slice(0, -1).map(s => s.id), 'questions', 'references']) {
        if ((document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= threshold) section = id
      }
      if (section === observed.current) return
      observed.current = section
      currentRoute.current = section
      setActive(section)
      manual.current(section, 'scroll')
      window.history.replaceState(null, '', `#${section}`)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    const interrupt = () => {
      if (!lock.current) return
      cancelAnimationFrame(lock.current)
      lock.current = 0
      // Stop the in-flight native scroll when the visitor takes over.
      window.scrollTo({ top: window.scrollY, behavior: 'instant' })
      onScroll()
    }
    const interruptKey = (event: KeyboardEvent) => {
      if (['PageUp', 'PageDown', 'Home', 'End', 'ArrowUp', 'ArrowDown'].includes(event.key) && !(event.target as Element)?.closest('input, select, textarea, [data-keyboard-local]')) interrupt()
    }
    const element = root.current
    element?.addEventListener('click', click)
    window.addEventListener('popstate', readLocation)
    window.addEventListener('hashchange', readLocation)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('wheel', interrupt, { passive: true })
    window.addEventListener('touchstart', interrupt, { passive: true })
    window.addEventListener('pointerdown', interrupt, { passive: true })
    window.addEventListener('keydown', interruptKey)
    const initial = requestAnimationFrame(() => {
      readLocation()
      const route = currentRoute.current
      void document.fonts.ready.then(() => {
        if (!disposed && lock.current && currentRoute.current === route) navigate(route, 'none', true, false, false)
      })
    })
    return () => {
      disposed = true
      cancelAnimationFrame(initial); cancelAnimationFrame(frame); cancelAnimationFrame(lock.current)
      element?.removeEventListener('click', click)
      window.removeEventListener('popstate', readLocation)
      window.removeEventListener('hashchange', readLocation)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('wheel', interrupt)
      window.removeEventListener('touchstart', interrupt)
      window.removeEventListener('pointerdown', interrupt)
      window.removeEventListener('keydown', interruptKey)
    }
  }, [navigate, root])
  return { active, navigate, cancelNavigation }
}
