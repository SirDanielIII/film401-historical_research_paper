type Name = 'arrow' | 'play' | 'pause' | 'volume' | 'expand' | 'close' | 'book' | 'external' | 'chevron'
const paths: Record<Name, string> = {
  arrow: 'M4 12h16m-6-6 6 6-6 6',
  play: 'm9 5 11 7-11 7V5Z',
  pause: 'M8 5v14M16 5v14',
  volume: 'M11 5 5 9H2v6h3l6 4V5Zm5 3a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14',
  expand: 'M9 3H3v6m12-6h6v6M3 15v6h6m12-6v6h-6',
  close: 'm6 6 12 12M6 18 18 6',
  book: 'M12 6C9 3 5 3 2 4v15c4-1 7-1 10 2m0-15c3-3 7-3 10-2v15c-4-1-7-1-10 2V6Z',
  external: 'M14 3h7v7m0-7L10 14m0-10H4v16h16v-6',
  chevron: 'm6 9 6 6 6-6',
}
export function Icon({ name, className = '' }: { name: Name; className?: string }) {
  return <svg className={`icon ${className}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>
}
