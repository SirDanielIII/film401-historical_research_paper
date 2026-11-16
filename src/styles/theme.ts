import type { CSSProperties } from 'react'

// Same public shape and values as src.zip/css/theme.ts. Pass the host AppTheme
// directly: the exhibit does not create another ThemeProvider.
export interface ExhibitTheme {
  mode: 'light' | 'dark'
  colors: { background1: string; background2: string; text: string; highlight1: string; highlight2: string; highlight3: string; highlight4: string; highlight5: string }
  fonts?: { regular: string; demi: string; bold: string }
}
const accents = { highlight1: '#F50057', highlight2: '#38C4E7', highlight3: '#AA9EEA', highlight4: '#3FD49A', highlight5: '#E9C683' }
export const themes: Record<ExhibitTheme['mode'], ExhibitTheme> = {
  dark: { mode: 'dark', colors: { background1: '#121212', background2: '#141414', text: '#D9D9D9', ...accents } },
  light: { mode: 'light', colors: { background1: '#F7F7F7', background2: '#FFFFFF', text: '#000000', ...accents } },
}
export function themeStyle(theme: ExhibitTheme): CSSProperties {
  return {
    '--bg': theme.colors.background1, '--panel': theme.colors.background2, '--ink': theme.colors.text,
    '--pink': theme.colors.highlight1, '--cyan': theme.colors.highlight2,
    '--green': theme.colors.highlight4, '--gold': theme.colors.highlight5,
    '--font': theme.fonts?.regular ?? "'BRLNSR', 'Trebuchet MS', sans-serif",
    '--demi': theme.fonts?.demi ?? "'BRLNSD', 'Trebuchet MS', sans-serif",
    '--bold': theme.fonts?.bold ?? "'BRLNSB', 'Trebuchet MS', sans-serif",
    colorScheme: theme.mode,
  } as CSSProperties
}
