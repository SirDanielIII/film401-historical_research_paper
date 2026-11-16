import { createContext, useContext } from 'react'

export const AssetBase = createContext(import.meta.env.BASE_URL)
export function assetUrl(base: string, path: string) { return `${base.replace(/\/?$/, '/')}${path.replace(/^\//, '')}` }
export function useAsset() {
  const base = useContext(AssetBase)
  return (path: string) => assetUrl(base, path)
}
