# Beyond the Green Screen

Website for my FILM 401 Historical Research Paper assignment.

## Embedding in personal website

Import the default `PetroVlahosExhibit` component from `src/App.tsx` into the host route, optionally using `React.lazy`. Pass `embedded`, the existing host `theme` (see `src/styles/theme.ts`), an optional `onToggleTheme`, and `assetBaseUrl="/projects/film401/historical_research_paper/"`. Use the host React root; do not import this project’s `main.tsx` or `standalone.css`.

Copy `public/fonts/` and `public/media/` into the host’s corresponding public asset directory. Styles are scoped under `.vlahos-exhibit`. Adjust `--vlahos-host-header-height` and `--header-offset` for the host toolbar. Carry over the disabled-image build exclusion if needed; deploy built output rather than research/source files.
