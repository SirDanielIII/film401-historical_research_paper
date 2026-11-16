export const glossary = [
  { term: 'Compositing', definition: 'Combining separately photographed or generated visual elements into a finished image.', sources: ['S5'] },
  { term: 'Matte', definition: 'A mask or photographic record controlling where an image element is visible. Its polarity can be reversed for complementary printing operations.', sources: ['S2', 'S3'] },
  { term: 'Travelling matte', definition: 'A matte that changes from frame to frame with the subject. The camera need not be moving.', sources: ['S2', 'S5'] },
  { term: 'Chroma key', definition: 'Deriving foreground/background separation from differences in colour. Screen colour alone does not specify the complete method.', sources: ['S4', 'S5'] },
  { term: 'Colour-difference matte', definition: 'A matte constructed using relationships among colour records. Vlahos’s original work involved photographic separations and reconstruction.', sources: ['S2'] },
  { term: 'Optical printer', definition: 'Apparatus that re-photographs film elements using controlled masking, alignment and exposures to combine or transform them.', sources: ['S5'] },
  { term: 'Photochemical separation', definition: 'Creating and processing photographic records that isolate components of colour information, rather than manipulating digital pixels.', sources: ['S2'] },
  { term: 'Sodium-vapour illumination', definition: 'Light from sodium discharge lamps. Low-pressure sodium provides narrow yellow spectral lines near 589 nm useful for optical separation.', sources: ['S3'] },
  { term: 'Dichroic optical separation', definition: 'Using wavelength-selective coatings to transmit some parts of the spectrum and reflect others into different optical paths.', sources: ['S3'] },
  { term: 'RGB channels', definition: 'Red, green and blue components of colour information. Photographic records and digital channels are related concepts implemented in different media.', sources: ['S2', 'S11'] },
  { term: 'Colour spill', definition: 'Unwanted coloured backing light reflected onto a foreground subject, which can survive removal of the backing itself.', sources: ['S4'] },
  { term: 'Ultimatte', definition: 'The company founded by Vlahos in 1976 and a family of influential electronic and later digital compositing tools.', sources: ['S1', 'S9'] },
  { term: 'CMOS sensor', definition: 'An electronic image sensor using complementary metal-oxide-semiconductor technology. It records light as electrical signals, not as a film emulsion or an automatic opacity channel.', sources: ['S11'] },
  { term: 'Alpha', definition: 'A digital coverage/opacity value used to control foreground and background mixing; intermediate values allow soft or translucent boundaries.', sources: ['S4'] },
]

export const questions = [
  { question: 'Did Vlahos invent the first blue or green screen?', answer: 'No. Earlier matte processes and blue-screen work, including Larry Butler’s work on The Thief of Bagdad (1940), precede him. His contribution was more effective separation and compositing.', sources: ['S5'] },
  { question: 'Why not use the sodium system for every production?', answer: 'It required specialized lamps, optics and a modified camera. Film-format and workflow constraints limited its flexibility; the Ben-Hur context makes that limitation particularly clear.', sources: ['S5', 'S7'] },
  { question: 'What did Wadsworth E. Pohl contribute?', answer: 'The Academy’s shared credit is established. This source set gives less detail about his individual engineering work, so it would be unsafe to assign him a particular component without further evidence.', sources: ['S6'] },
  { question: 'Was there really only one prism?', answer: 'The sources differ. Foster reports the single-prism story; Disney’s 2025 archive article says three were produced. Neither justifies stating an exact surviving count here as settled fact.', sources: ['S5', 'S7'] },
  { question: 'Did radar engineering produce the compositing invention?', answer: 'The biography establishes that Vlahos worked on radar before entering film research. It does not establish a direct technical derivation of his compositing inventions from radar.', sources: ['S1'] },
  { question: 'Why not say every Ben-Hur chariot shot used this process?', answer: 'The sources connect development with the production’s requirements. A claim about every shot would need shot-level production evidence that is not supplied in this dossier.', sources: ['S5', 'S9'] },
]
