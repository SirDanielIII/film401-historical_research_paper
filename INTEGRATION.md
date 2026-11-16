# Integrating the Petro Vlahos exhibit

This repository remains a standalone React/TypeScript/Vite project. `src.zip` is a reference snapshot, not the active complete personal application. Nothing in the personal website has been rewritten or merged.

## Standalone deployment

Run `npm install`, `npm run dev`, or `npm run build`. On Windows with PowerShell script restrictions, use `npm.cmd` instead of `npm`.

Vite uses `base: './'`. Serve **the contents of `dist/`** at `/projects/petro-vlahos/` with a trailing slash. The HTML, scripts, favicon, font files, narration and images use that directory as their base. The build also works at a server root. Use a local web server; do not open `dist/index.html` as a `file://` document. A direct hash link such as `/projects/petro-vlahos/#sodium-vapour` does not need a separate route rewrite.

All exhibit content, demonstrations, fonts and installed recordings are local. No API, embedded video, external image host or CDN is needed to run the classroom exhibit. External bibliography links and the Corridor video require internet. The exhibit has no service worker: a completely fresh network-blocked URL is not an offline installation. Serve `dist/` on the classroom machine to work without internet.

## Lazy-loaded route in the main website

Copy the exhibit's `src/` modules into a project folder, keeping relative imports. Do **not** import its standalone `main.tsx`, `standalone.css`, or mount another React root. `App.tsx` default-exports the modular `PetroVlahosExhibit` component.

Use the existing Router and `ThemeProvider`; the exhibit accepts the host's `AppTheme` shape. It does not introduce a second provider or add a styled-components dependency to the standalone application.

```tsx
import { lazy, Suspense } from 'react';
import { useTheme } from 'styled-components';

const PetroVlahosExhibit = lazy(() => import('./projects/petro-vlahos/App'));

function PetroVlahosRoute() {
  const theme = useTheme(); // existing lightTheme / darkTheme from css/theme.ts
  return (
    <Suspense fallback={<p>Loading exhibit…</p>}>
      <PetroVlahosExhibit
        embedded
        theme={theme}
        assetBaseUrl="/projects/petro-vlahos/"
      />
    </Suspense>
  );
}

// Inside your existing <Routes>, Header, Footer and ThemeProvider:
// <Route path="/projects/petro-vlahos/" element={<PetroVlahosRoute />} />
```

Copy the exhibit's `public/fonts/`, `public/media/`, and `public/recording-script.txt` into your host application's `public/projects/petro-vlahos/` directory. The component's `assetBaseUrl` then resolves all of these. If you prefer the host's already-installed `/fonts/`, remove the exhibit's inline `@font-face` style and retain your `css/fonts.css` import. Do not register two different font files under the same family name.

The host's existing theme button controls the passed theme automatically. You can optionally pass `onToggleTheme={toggleTheme}` to show a theme button in the exhibit toolbar too. Omitting that prop avoids a duplicate theme control.

The toolbar is exhibit chapter navigation, not a copy of your personal site's full header. In embedded mode it sticks beneath the host header. Adjust `--vlahos-host-header-height` (default `80px`) and `--header-offset` on the exhibit wrapper if the host header height changes. You may omit `.exhibit-footer` in the integrated component if the host footer makes its small exhibit credit redundant.

The CSS is scoped under `.vlahos-exhibit`. It uses theme variables supplied by `styles/theme.ts`, with the same background/text values and five brand accents as `src.zip/css/theme.ts`. Lighter/darker semantic shades keep lavender/cyan/gold readable in light mode. Berlin Sans headings and controls follow the portfolio typography; system-font research prose and line spacing follow `GuideArticle.styles.ts`.

## Media replacement and public release

`src/data/media-manifest.json` is the single source of image paths, descriptions, captions, creators, source URLs, dimensions, rights notes and section associations. `MediaFigure` and the photographic demo both read it.

Replace a file and update its manifest entry. Set `enabled: false` to hide a figure. The **standalone Vite build** also removes disabled image files from `dist/media/images/`, because hiding a component would otherwise leave the copyrighted file publicly accessible. Development `public/` still contains the source file. When embedding into the main site, carry over that build-exclusion rule or remove disabled assets from the host's public directory yourself. Never deploy the raw source/reference folders.

The photographic teaching key currently expects green. A blue-screen replacement needs corresponding changes to the `excess` and spill calculations in `components/PhotoScene.tsx`. This deliberately simple software example is not a historical laboratory reconstruction. It estimates a mask; a professionally prepared matte/composite pair would be more accurate for fine hair or glass.

Keep CC BY credits, licence links, and modification notices with the two demonstration photographs. Film/archival references are educational copies with uncertain public-redistribution rights. Review `ASSETS_NEEDED.md` and the on-page image register before publishing.

## Recording workflow

Edit `src/data/narration/*.txt`; these are also the transcripts. Record matching MP3 stems into `public/media/audio/`. Run `npm run media` and restart the dev server or rebuild. Detection also accepts M4A, WAV and OGG. There is no synthetic audio, autoplay, or automatic playback of the next chapter. Only one audio element is mounted. The printable `public/recording-script.txt` is regenerated from the same editable files.

`←` / `→` change narration chapters while the player is open. Space toggles playback outside native controls; sliders and selects retain their own keyboard behavior. Escape closes the player and exits focus mode. Chapter 3 covers both the earlier-matte and colour-difference sections; its player includes a direct link to continue to the interactive example. Main research is visible in exploration and can be restored within each focused chapter.
