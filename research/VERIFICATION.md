# Redesign verification · 16 November 2026

## Automated checks

- `npm.cmd run build`: TypeScript and Vite production build pass.
- `npm.cmd run lint`: passes.
- `npm.cmd test`: 5/5 pass. Checks cover sourced research and all 24 questions; every original bibliography URL; 650–750-word narration (actual **666**); substantial separately written research without a maximum word limit; all manifest paths/metadata; TrueType signatures; unloaded timing.
- Browser UI checks: **33/33 pass**, including the production build served at `/projects/petro-vlahos/`. Both demonstrations, photographic channel/matte/composite pixel changes, poor/improved comparison, illustrated fallback, four optical steps, transcripts, themes, fonts, citations, keyboard navigation and missing audio were exercised.
- Audio checks: **13/13 pass** using two temporary quiet 12-second WAV test tones. Actual playback, pause, resume, seeking, playback rate, duration, previous-element cleanup, one audio element, pause on reference navigation and a missing chapter were verified. Tones were removed with the guarded cleanup script. Final audio availability is **0/5**, awaiting the presenter's recordings.
- Loaded production exhibit under Chrome Offline emulation: **33/33 UI checks pass**. This verifies local cached content and interactions after loading; it is not a claim of a service-worker installation or a fresh offline URL load. For classroom use without internet, serve the built files locally.
- All loaded production requests are from the local origin, including favicon, three fonts and seventeen images. No app console errors were found.
- Media exclusion: temporarily disabling the hero entry, building and checking output confirmed its image is omitted from `dist/`. The entry was restored and the complete build regenerated afterward.

## Content, media and fonts

- Both supplied DOCX documents were read completely. Extracted text retains every original external hyperlink target; the original DOCX files and ZIP were not modified.
- All thirteen original bibliography entries survive. Supplementary sources are marked and do not replace the dossier.
- The main historical narrative and research are visible in exploration. Technical detail, grouped Q&A and image-rights register use optional disclosure.
- All 24 prepared questions are present in seven topic groups; fourteen glossary terms remain.
- Assignment-to-section mapping is in `CONTENT-COVERAGE.md`.
- Seventeen local optimized images, about **1.9 MB** total: fifteen captioned historical/reference images and three patent facsimiles within that count, plus two CC BY modern photographic demo assets. Photographs, film stills, archival objects, patent records and modern examples are explicitly distinguished. No fabricated historical photography was used.
- Three fonts are actual supplied TrueType files: Berlin Sans FB regular (`BRLNSR`), Berlin Sans FB Demi (`BRLNSD`), Berlin Sans FB bold (`BRLNSB`). Signatures, name tables and actual browser loading were checked. No fonts are missing.
- Captions and rights metadata are centralized. Educational reference use is not represented as public redistribution permission. Some image photographers remain unconfirmed; that is recorded rather than invented.

## Layout and interaction limits

Layouts were exercised at **1920×1080**, **1366×768**, **390×844**, and **320×700**. No page horizontal overflow was found. On phones, the optics diagram deliberately scrolls within its own labelled, keyboard-focusable region so its labels remain readable. The step explanations also remain available as text.

Dark and light appearances were inspected. Light mode uses darker semantic lavender/cyan/gold shades for readable text while retaining the requested brand accents. The exhibit CSS is scoped; its only body reset is in the standalone entry stylesheet.

The photograph's simple software key estimates coverage and corrects some green spill. It is not a production-quality matte or Vlahos's exact photochemical method. The original SVG hair/glass model remains selectable. The sodium diagram is a conceptual optical model, not a scale camera drawing or an RGB simulation of narrowband capture.

Actual recording timing needs rehearsal; 666 words is about 4:45 at 140 wpm before pauses. External reference pages and the Corridor video need internet. Public deployment needs the media review described in `ASSETS_NEEDED.md`.

Repeatable browser scripts: `tests/browser-check.js`, `tests/browser-audio-check.js`, `tests/layout-check.js`. Raw browser JSON and inspected screenshots are under ignored `artifacts/`, with `redesign-` filename prefixes. Earlier artifacts predate this redesign.
