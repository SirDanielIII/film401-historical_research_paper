import { useState } from 'react'
import { sections, sectionHref } from '../../data/navigation/sections'
import { Icon } from '../ui/Icon'

export function Header({ active, mode, onTheme, focused, onFocus, embedded }: { active: string; mode: string; onTheme?: () => void; focused: boolean; onFocus: () => void; embedded: boolean }) {
  const [open, setOpen] = useState(false)
  return <header className={`exhibit-header ${embedded ? 'embedded-header' : ''}`}>
    <div className="header-top"><a className="brand" href={sectionHref('introduction')}><span className="brand-symbol" aria-hidden="true">V<span>↗</span></span><span>Beyond the Green Screen<small>FILM 401 · DANIEL ZHUO</small></span></a>
      <div className="header-actions"><button className="focus-button" aria-label={focused ? 'Exit presentation' : 'Start presentation'} onClick={onFocus}><Icon name={focused ? 'close' : 'play'} /><span>{focused ? 'Exit presentation' : 'Present'}</span></button>{onTheme && <button className="theme-toggle" onClick={onTheme} aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>{mode === 'dark' ? '☼' : '☾'}</button>}<button className="menu-toggle" aria-expanded={open} aria-controls="exhibit-nav" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Chapters'} <Icon name="chevron" /></button></div>
    </div>
    <nav id="exhibit-nav" className={open ? 'chapter-nav open' : 'chapter-nav'} aria-label="Exhibit chapters">{sections.map(item => <a key={item.id} href={sectionHref(item.id)} aria-current={active === item.id ? 'location' : undefined} onClick={() => setOpen(false)}><span>{item.number}</span>{item.label}</a>)}</nav>
  </header>
}
