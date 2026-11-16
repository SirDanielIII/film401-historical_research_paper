import { useContext, useEffect, useRef, useState } from 'react'
import { AssetBase, assetUrl } from '../lib/assets'
import { mediaById } from '../data/media'

export type PhotoStage = 'colour' | 'red' | 'green' | 'blue' | 'matte' | 'composite'
const imageCache = new Map<string, Promise<HTMLImageElement>>()
function loadImage(url: string) {
  if (!imageCache.has(url)) imageCache.set(url, new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => { imageCache.delete(url); reject(new Error('Image unavailable')) }
    image.src = url
  }))
  return imageCache.get(url)!
}
const smooth = (low: number, high: number, value: number) => {
  const t = Math.max(0, Math.min(1, (value - low) / (high - low)))
  return t * t * (3 - 2 * t)
}

export function PhotoScene({ stage, quality }: { stage: PhotoStage; quality: number }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const base = useContext(AssetBase)
  const [failed, setFailed] = useState(false)
  const foreground = mediaById['demo-subject']
  const background = mediaById['demo-background']
  useEffect(() => {
    let cancelled = false
    if (!foreground.enabled || !background.enabled) return
    Promise.all([loadImage(assetUrl(base, foreground.path)), loadImage(assetUrl(base, background.path))]).then(([subject, backgroundImage]) => {
      if (cancelled) return
      const el = canvas.current
      const ctx = el?.getContext('2d', { willReadFrequently: true })
      if (!ctx || !el) return
      const w = el.width, h = el.height
      ctx.clearRect(0, 0, w, h)
      // Keep the sample's aspect ratio and crop only the bottom of the portrait.
      ctx.drawImage(subject, 0, 0, w, subject.height / subject.width * w)
      const source = ctx.getImageData(0, 0, w, h)
      const scale = Math.max(w / backgroundImage.width, h / backgroundImage.height)
      ctx.drawImage(backgroundImage, (w - backgroundImage.width * scale) / 2, (h - backgroundImage.height * scale) / 2, backgroundImage.width * scale, backgroundImage.height * scale)
      const back = ctx.getImageData(0, 0, w, h)
      const out = ctx.createImageData(w, h)
      for (let i = 0; i < source.data.length; i += 4) {
        const r = source.data[i], g = source.data[i + 1], b = source.data[i + 2]
        const excess = g - Math.max(r, b)
        const poor = (i / 4 % w) / w < (100 - quality) / 100
        const alpha = poor ? (excess > 65 ? 0 : 1) : 1 - smooth(18, 88, excess)
        if (stage === 'red' || stage === 'green' || stage === 'blue') {
          const value = stage === 'red' ? r : stage === 'green' ? g : b
          out.data[i] = value; out.data[i + 1] = value; out.data[i + 2] = value
        } else if (stage === 'matte') {
          out.data[i] = out.data[i + 1] = out.data[i + 2] = alpha * 255
        } else if (stage === 'composite') {
          const corrected = poor ? g : Math.min(g, Math.max(r, b) + 8)
          out.data[i] = r * alpha + back.data[i] * (1 - alpha)
          out.data[i + 1] = corrected * alpha + back.data[i + 1] * (1 - alpha)
          out.data[i + 2] = b * alpha + back.data[i + 2] * (1 - alpha)
        } else {
          out.data[i] = r; out.data[i + 1] = g; out.data[i + 2] = b
        }
        out.data[i + 3] = 255
      }
      ctx.putImageData(out, 0, 0)
    }).catch(() => { if (!cancelled) setFailed(true) })
    return () => { cancelled = true }
  }, [base, foreground, background, stage, quality])
  return failed || !foreground.enabled || !background.enabled ? <div className="media-missing">Photographic sample unavailable. Choose “Illustrated edge cases” to use the offline teaching model.</div> : <canvas ref={canvas} className="photo-scene" width="640" height="720" role="img" aria-label={`Modern green-screen photograph: ${stage === 'matte' ? 'estimated foreground matte, white retains the subject' : stage === 'composite' ? 'room composite; poor key on the left, improved key on the right' : stage === 'colour' ? 'original colour image' : `${stage} channel shown as grayscale`}`} />
}
