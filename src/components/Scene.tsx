import { useId } from 'react'

// Entirely original vector artwork. No historical footage or film still is used.
export function Performer({ matte = false, poor = false, glass = true }: { matte?: boolean; poor?: boolean; glass?: boolean }) {
  const dark = matte ? '#ffffff' : '#182a2e'
  const cloth = matte ? '#ffffff' : '#d6a460'
  return <g>
    <path d="M217 120V263c0 12 18 13 18 0" stroke={dark} strokeWidth="4" fill="none" />
    <path d="M116 120Q217 14 318 120Q291 105 267 120Q242 104 217 120Q191 105 166 120Q140 104 116 120Z" fill={dark} />
    {!matte && <g fill="none" stroke="#93aa9b" opacity=".35"><path d="M217 42Q175 75 166 120M217 42v78M217 42q42 33 50 78" /></g>}
    <path d="M180 211q-20 20-21 62l-22 71 39 10 27-79 18 65 33-9-28-93-14-33Z" fill={dark} />
    <path d="m142 339-10 24q-12 9-22 10-8 10 10 11l44-14 9-18m50-15 5 34q18 12 34 8 12-4-3-12l-12-38" fill={dark} />
    <path d="M182 174q-14 10-16 33l-9 56q28 13 68-5l-14-75Z" fill={cloth} />
    <path d="m203 180 22 23 24-37 10 5-23 58q-6 10-15 4l-30-22" fill={cloth} />
    <path d="m169 193-16 41-31-14-6 10 39 26q9 2 13-7l15-40" fill={cloth} />
    <path d="m245 167 3-15q3-6 6 0l5 18m-141 52-13-9q-7-2-3 6l14 11" fill={matte ? '#fff' : '#dfb488'} />
    <ellipse cx="192" cy="151" rx="18" ry="24" fill={matte ? '#fff' : '#dfb488'} />
    <path d="M173 152q-9-30 11-34 22-10 28 22l-15-4-4 16-9-4-7 13Z" fill={dark} />
    {!poor && <g fill="none" stroke={matte ? '#fff' : '#314346'} strokeWidth="1.4" opacity=".65"><path d="M177 123q-9-7-12 2m14-7q-2-11 8-11m9 10q9-12 15 1m-37 18q-13-7-15 2m18-14q-11-1-13-8m41 20q13-7 13 5" /></g>}
    {!matte && <path d="m183 178 7 17 11-17" fill="#f2eadb" />}
    {glass && <g>
      <path d="M281 275h31l-5 52q-11 12-21 0Z" fill={matte ? '#fff' : '#d6e6de'} fillOpacity={poor ? 1 : .24} stroke={matte ? '#fff' : '#dce9e2'} strokeWidth="2" strokeOpacity=".7" />
      <path d="M296 333v18m-11 0h22" stroke={matte ? '#fff' : '#e2e7dc'} strokeWidth="2" />
    </g>}
  </g>
}

export function Landscape() {
  return <g>
    <rect width="440" height="410" fill="#b8ac8a" />
    <circle cx="337" cy="90" r="44" fill="#e7d4a3" />
    <path d="M0 188Q73 139 151 187T312 163T440 164V410H0Z" fill="#8b9b91" />
    <path d="M0 229q86-53 177-2t263-15v198H0Z" fill="#466666" />
    <path d="M0 300q92-59 185-8t255-16v134H0Z" fill="#263f42" />
    <path d="M0 365q99-37 200-5t240-12v62H0Z" fill="#172d31" />
    <g fill="#304c4c"><path d="M44 247v-96l6-10 6 10v96Zm-20 0v-55l9-8 10 8v55Zm34 0v-67l9-10 10 10v67Z" /><path d="M365 261v-80l9-14 9 14v80Zm20 0v-118l7-12 8 12v118Zm16 0v-60l10-8 10 8v60Z" /></g>
    <g fill="none" stroke="#455d59" strokeWidth="2"><path d="M70 89q7-8 14 0 7-8 14 0m10 14q5-6 10 0 5-6 10 0" /></g>
  </g>
}

export function Scene({ type = 'composite', className = '', poor = false, channel, reveal = 100 }: { type?: 'blue' | 'sodium' | 'matte' | 'composite'; className?: string; poor?: boolean; channel?: 'red' | 'green' | 'blue'; reveal?: number }) {
  const uid = useId().replace(/:/g, '')
  const weights = channel === 'red' ? '1 0 0' : channel === 'green' ? '0 1 0' : '0 0 1'
  return <svg className={`scene ${className}`} viewBox="0 0 440 410" role="img" aria-label={`${type === 'matte' ? 'White performer mask on black' : type === 'sodium' ? 'Performer before a sodium-yellow backing' : type === 'blue' ? 'Performer before a blue backing' : 'Performer composited into an imaginary landscape'}${channel ? `, ${channel} information displayed as grayscale` : ''}`}>
    <defs>
      <filter id={`${uid}-record`} colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values={`${weights} 0 0 ${weights} 0 0 ${weights} 0 0 0 0 0 1 0`} /></filter>
      <filter id={`${uid}-poor`}><feMorphology operator="dilate" radius="3" in="SourceAlpha" result="dilate" /><feFlood floodColor="#5475f4" /><feComposite in2="dilate" operator="in" /><feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge></filter>
      <clipPath id={`${uid}-reveal`}><rect width={440 * reveal / 100} height="410" /></clipPath>
      <pattern id={`${uid}-grid`} width="22" height="22" patternUnits="userSpaceOnUse"><path d="M22 0H0v22" fill="none" stroke="#eae7de" strokeOpacity=".07" /></pattern>
    </defs>
    <g filter={channel ? `url(#${uid}-record)` : undefined}>
      <rect width="440" height="410" fill={type === 'matte' ? '#07090a' : type === 'sodium' ? '#e8bb45' : '#244fc7'} />
      {type === 'composite' && <g clipPath={`url(#${uid}-reveal)`}><Landscape /></g>}
      {(type === 'blue' || type === 'sodium') && <><rect width="440" height="410" fill={`url(#${uid}-grid)`} /><path d="M30 340h380M60 370h320" stroke="#fff" opacity=".12" /></>}
      <g filter={poor && type !== 'matte' ? `url(#${uid}-poor)` : undefined}><Performer matte={type === 'matte'} poor={poor} /></g>
    </g>
  </svg>
}
