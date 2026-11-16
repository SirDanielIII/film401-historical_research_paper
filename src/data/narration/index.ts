import { trackDefinitions } from './tracks'

const transcripts = import.meta.glob<string>('./scripts/*.txt', { query: '?raw', import: 'default', eager: true })
export const tracks = trackDefinitions.map(track => ({ ...track, transcript: transcripts[`./scripts/${track.transcriptFilename}`] ?? '' }))
export const narration = tracks.map(track => track.transcript)
export const narrationSources = tracks.map(track => track.sources)
export const audioPaths = tracks.map(track => `media/audio/${track.audioFilename}`)
