# Implemented redesign

## Changed implementation files

| Files | Changes |
|---|---|
| `src/App.tsx` | Modular continuous exhibit, seven primary anchors, legacy hash support, focus mode, keyboard controls, single player and host-theme/asset-base props. |
| `src/components/Header.tsx`, `Hero.tsx`, `ChapterLayout.tsx`, `HistoricalTimeline.tsx` | Single responsive menu, photographic introduction, readable chapter layouts, biography and fully populated career timeline. |
| `src/components/ResearchSection.tsx`, `Glossary.tsx`, `ReferenceLibrary.tsx` | Visible research, all 24 grouped answers, fourteen terms, complete annotated bibliography and centralized media register. |
| `src/components/NarrationPlayer.tsx` | Compact persistent player, chapter selection, transport/progress/duration/rate, transcripts, local recording detection and graceful missing audio. |
| `src/components/RGBVisualizer.tsx`, new `PhotoScene.tsx` | Real photograph, numerical RGB views, matte estimate, poor/improved key, composite; original illustrated model retained. |
| `src/components/SodiumVapourVisualizer.tsx` | Preserved optical stages and views; larger responsive diagram with local horizontal scrolling on phones. |
| New `src/components/MediaFigure.tsx`, `src/data/media.ts`, `media-manifest.json`, `src/lib/assets.tsx` | One media/credit system, image failure handling, replacement/disable switches and configurable local asset base. |
| `src/data/chapters.ts`, new `context.ts`, `questions.json`, `sections.ts`; `sources.ts`, `narration.ts` | Expanded context and legacy, all questions, corrected modern/historical distinctions, section data, complete original references and supplementary sources. |
| `src/data/narration/01-introduction.txt` through `05-legacy.txt`, `scripts/export-script.mjs`, `public/recording-script.txt` | Five separately editable scripts/transcripts, 666 spoken words, regenerated timing estimates and recording instructions. |
| `src/styles/globals.css`, `components.css`, `print.css`; new `responsive.css`, `theme.ts`, `standalone.css`; `src/main.tsx` | Brand palette and both modes, scoped styles, supplied typography, responsive layout, separate standalone-only reset and print support. |
| `vite.config.ts`, `index.html` | Relative deployment base, disabled-media build exclusion, full title, local relative favicon and matching theme metadata. |
| `tests/content.test.mjs`, `browser-check.js`, `browser-audio-check.js`, `layout-check.js`; new `visual-state.js` | Updated checks for continuous content, research, media, demonstrations, audio, layouts and source integrity. |
| `research/Petro_Vlahos_*.txt` | Refreshed complete extraction of both originals, preserving all external hyperlink targets. |
| `README.md`, `INTEGRATION.md`, `ASSETS_NEEDED.md`, `research/CONTENT-COVERAGE.md`, `VERIFICATION.md`, `EDITORIAL-NOTES.md` | Run/recording instructions, host integration, prioritized assets, assignment mapping and current editorial/QA records. |

Seventeen new optimized WebP assets are in `public/media/images/`; their individual filenames, original URLs, captions and caveats are listed in `src/data/media-manifest.json`. All three pre-existing `public/fonts/BRLNS*.TTF` files were used unchanged. No package dependency changes were needed. Original DOCX and ZIP files remain unchanged. Browser artifacts and downloaded source audit copies are local under ignored `artifacts/`.

## Result and remaining input

The normal exhibit reads continuously in the requested order. Research is visible, with optional technical detail. Presentation mode reuses the content and a single player. Both demonstrations work offline with local resources.

Style references reused: `css/theme.ts`, fonts, global conventions, homepage spacing, section-card image rounding/borders/hover, header controls, portfolio typography and layout, and the guide article's readable prose treatment. An existing host `AppTheme` can be passed directly; no second ThemeProvider is introduced.

Images added: two Vlahos photographs; two period camera/format production photographs; earlier film composites; a Ben-Hur still; three original patent drawing sheets; Disney's prism and Mary Poppins before/after; the modified sodium camera; Disney/Iwerks and Iwerks-with-film photographs; and two modern demonstration photographs. All 17 have source/rights records. Copyrighted reference images are not publicly cleared merely by crediting them.

Narration is ready for the user's **own recordings**. None was generated. The five scripts total 666 words, about 4:45 at 140 wpm before pauses. Essential input is the five local recordings. Optional improvements and publication decisions are prioritized in `ASSETS_NEEDED.md`.

Checks: build, lint and 5 automated tests pass; 33 UI/browser checks pass in the production subpath and in the loaded exhibit under Offline emulation; 13 actual audio checks pass with temporary test tones, since removed. Responsive checks cover 1920, 1366, 390 and 320 px widths. See `research/VERIFICATION.md` for exact scope and limits.

Run `npm run dev` (`npm.cmd run dev` in restricted PowerShell). For later integration, use the lazy route adapter, existing host theme and asset-directory mapping in `INTEGRATION.md`. The main personal website has not been merged or rewritten.

Assignment coverage: origins/career/social/political context → Biography; earlier practice/industrial constraints → Before Vlahos and Colour Difference; contributions → Colour Difference, Sodium and Ultimatte; collaboration/Mary Poppins → Sodium; critical legacy/recognition → Ultimatte and Legacy. `research/CONTENT-COVERAGE.md` maps every requirement and all sixteen dossier topics to identifiable content.
