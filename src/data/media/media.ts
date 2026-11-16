import entries from './media-manifest.json'

export interface MediaAsset {
  id: string
  path: string
  subject: string
  alt: string
  caption: string
  sourceTitle: string
  sourceUrl: string
  originalUrl: string
  creator: string
  rights: string
  section: string
  kind: string
  width: number
  height: number
  enabled: boolean
  license?: string
  licenseUrl?: string
}
export const media: MediaAsset[] = entries
export const mediaById: Record<string, MediaAsset> = Object.fromEntries(media.map(item => [item.id, item]))
