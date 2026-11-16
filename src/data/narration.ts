import introduction from './narration/01-introduction.txt?raw'
import biography from './narration/02-biography.txt?raw'
import colour from './narration/03-colour-difference.txt?raw'
import sodium from './narration/04-sodium-vapour.txt?raw'
import legacy from './narration/05-legacy.txt?raw'

export const narration = [introduction, biography, colour, sodium, legacy]
export const narrationSources = [['S3', 'S5', 'S7'], ['S1', 'S8', 'S15', 'S16'], ['S2', 'S5'], ['S3', 'S5', 'S6', 'S7', 'S10', 'S14'], ['S1', 'S4', 'S6', 'S9', 'S11']]

export const audioPaths = [
  'media/audio/01-introduction.mp3',
  'media/audio/02-biography.mp3',
  'media/audio/03-colour-difference.mp3',
  'media/audio/04-sodium-vapour.mp3',
  'media/audio/05-legacy.mp3',
]
