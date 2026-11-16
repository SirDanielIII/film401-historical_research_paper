import { titleCase } from '../../utils/titleCase'
import { useState } from 'react'
import { mediaById } from '../../data/media/media'
import { useAsset } from '../../lib/media/assets'

export function MediaFigure({ id, className = '', priority = false }: { id: string; className?: string; priority?: boolean }) {
  const item = mediaById[id]
  const asset = useAsset()
  const [failed, setFailed] = useState(false)
  if (!item || !item.enabled) return null
  return <figure className={`media-figure ${className}`} data-media={id}>
    <a className="media-image" href={asset(item.path)} target="_blank" rel="noreferrer" aria-label={`Enlarge: ${item.subject}`}>
      {failed ? <span className="media-missing">{item.subject} — image unavailable. Source and caption below.</span> : <img src={asset(item.path)} alt={item.alt} width={item.width} height={item.height} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} onError={() => setFailed(true)} />}
      <span className="enlarge" aria-hidden="true">↗</span>
    </a>
    <figcaption><span className="media-kind">{titleCase(item.kind)}</span><p>{item.caption}</p><a href={item.sourceUrl} target="_blank" rel="noreferrer">{item.sourceTitle} ↗</a><span className="media-credit">{item.creator}{item.licenseUrl && <> · <a href={item.licenseUrl} target="_blank" rel="noreferrer">{item.license}</a></>}</span></figcaption>
  </figure>
}
