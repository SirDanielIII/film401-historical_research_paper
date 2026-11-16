# Beyond the Green Screen

Petro Vlahos and the Evolution of Special Effects · FILM 401. A React/TypeScript/Vite research exhibit with local historical imagery, two interactive demonstrations, light/dark themes and optional narration.

## Run and check

```sh
npm install
npm run dev
npm run build
npm run lint
npm run test
npm run preview
```

Use `npm.cmd` on Windows if PowerShell blocks `npm.ps1`. Serve the generated `dist/` directory through a web server. Vite’s relative asset base supports root hosting and subdirectories such as `/projects/petro-vlahos/` (with a trailing slash). Local images, fonts and demonstrations work without external services; source links require internet.

## Content and assets

- `src/App.tsx`: section sequence, historical summaries and film case studies.
- `src/data/chapters.ts` and `context.ts`: cited research; chapter lead blocks introduce the history before the demonstrations. Further technical notes are expandable.
- `src/data/sources.ts`: bibliography with stable citation IDs, corrections and replacement URLs.
- `src/data/questions.json`: 24 classroom questions; `glossary.ts`: supporting terms.
- `research/`: original DOCX research/script documents and complete text extracts. Preserve these as source material; the website includes later corrections.
- `src/data/media-manifest.json`: local image paths, captions, credits and rights metadata. Replace images through this manifest; `enabled: false` hides a figure and excludes its image from the standalone build.

The RGB demo uses a modern green-screen photograph and a simple software key to illustrate separation; it does not reproduce Vlahos’s photochemical workflow. Its algorithm assumes green. The sodium diagram illustrates simultaneous photographic records and later printing. All historical images and Berlin Sans font files remain local under `public/`.

## Presentation and optional narration

The chapter menu follows biography, earlier compositing, colour difference, sodium vapour and legacy. Presentation mode uses the same content with supporting research tucked away; each section can restore its details. The historical introductions remain visible in both modes.

The exhibit is complete without recordings. Chapter controls show **Transcript** when audio is absent. Existing scripts in `src/data/narration/` and the exported `public/recording-script.txt` are retained for later revision and recording.

When ready, place matching recordings in `public/media/audio/`: `01-introduction.mp3`, `02-biography.mp3`, `03-colour-difference.mp3`, `04-sodium-vapour.mp3`, `05-legacy.mp3`. Run `npm run media` and restart or rebuild. M4A, WAV and OGG are also detected. Chapter 3 covers earlier compositing and colour difference. Playback does not autoplay or advance automatically. Arrow keys change player chapters, Space toggles playback outside native controls, and Escape closes presentation mode.

## Embedding in the personal website

Import the default `PetroVlahosExhibit` component from `src/App.tsx` into the host route, optionally using `React.lazy`. Pass `embedded`, the existing host `theme` (see `src/styles/theme.ts`), an optional `onToggleTheme`, and `assetBaseUrl="/projects/petro-vlahos/"`. Use the host React root; do not import this project’s `main.tsx` or `standalone.css`.

Copy `public/fonts/`, `public/media/` and `public/recording-script.txt` into the host’s corresponding public asset directory. Styles are scoped under `.vlahos-exhibit`. Adjust `--vlahos-host-header-height` and `--header-offset` for the host toolbar. Carry over the disabled-image build exclusion if needed; deploy built output rather than research/source files.

## Tests

`npm run test` validates citations, source traceability, chapter content, transcripts, local media/fonts and audio time handling. Browser functions in `tests/` run through Chrome DevTools `evaluate_script --sourcePath`: `browser-check.js` checks navigation, demonstrations, images, themes and transcript fallback; `layout-check.js` checks overflow; `sidebar-check.js` checks disclosure stability at section start and midway through the article.

The existing `browser-audio-check.js` can validate real playback using temporary fixtures (`npm run test:audio:prepare`, then `npm run test:audio:clean`). Never deploy test fixtures or overwrite real recordings. Browser screenshots belong in ignored `artifacts/`.
