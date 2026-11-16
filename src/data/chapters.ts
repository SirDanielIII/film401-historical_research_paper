export interface ResearchBlock {
  title: string
  paragraphs: { text: string; sources: string[] }[]
  technical?: boolean
}
export interface Chapter {
  id: number
  title: string
  shortTitle: string
  period: string
  accent: string
  duration: string
  takeaway: string
  introduction: string
  blocks: ResearchBlock[]
}

export const chapters: Chapter[] = [
  {
    id: 1, title: 'The impossible image', shortTitle: 'The illusion', period: 'BEFORE THE BREAKTHROUGH', accent: 'blue', duration: '0:35',
    takeaway: 'Two photographed worlds. One convincing illusion.',
    introduction: 'The problem was never simply the colour of a screen. It was how to keep a performer—and every difficult edge—while replacing the world around them.',
    blocks: [
      { title: 'A picture made from separate pieces', paragraphs: [
        { text: 'Compositing brings separately photographed or produced elements into a single image. A performer, a miniature city and a painted sky can belong to different places, scales and moments of production, yet appear to share one space on screen. Long before software, filmmakers assembled images using carefully controlled exposures, masks and photographic printing. The illusion depended on deciding which areas of each exposure would survive in the finished picture.', sources: ['S5'] },
        { text: 'This is an artistic problem as well as a technical one. Separate elements must agree in perspective, brightness, colour and apparent depth. A convincing mask cannot compensate for an actor lit from the wrong direction or a background photographed from the wrong viewpoint. Effects work therefore joins cinematography, laboratory practice and visual design: the final image has to feel like a single photographic event even when its components were made separately.', sources: ['S2', 'S5'] },
      ] },
      { title: 'Before Vlahos: a lineage of mattes', paragraphs: [
        { text: 'Vlahos entered an established history of photographic combination. Matte and trick-photography methods were already part of silent cinema. In the history summarized by Jeff Foster, Larry Butler’s work on The Thief of Bagdad (1940) is an important early blue-screen milestone. The existence of these earlier processes is essential to understanding Vlahos’s contribution: he refined a difficult method rather than inventing the first coloured backdrop or the idea of combining worlds.', sources: ['S5'] },
        { text: 'A fixed matte can reserve a stationary area of the frame for another exposure. A travelling matte changes with the subject from frame to frame, allowing a moving body to remain visible while its surroundings are replaced. “Travelling” describes the changing mask; it does not require the camera itself to move. Once a performer crosses the frame, the matte must follow accurately at every instant or the boundary gives away the construction.', sources: ['S2', 'S5'] },
      ] },
      { title: 'The edge gives the game away', paragraphs: [
        { text: 'A torso may have a clear silhouette, but hair, smoke, glass and a rapidly moving hand do not. Motion blur and transparency mix light from the subject with light from the backing. Treating every location as either entirely foreground or entirely background loses that information. The result can be a hard cut-out, a dark border, a coloured fringe or a transparent object that becomes wrongly opaque.', sources: ['S2', 'S4', 'S5'] },
        { text: 'Screen colour and compositing process are not interchangeable terms. Blue is a useful signal to distinguish a backing from a subject; it does not, by itself, specify how a matte is generated, how reflected blue is handled or how the foreground is reconstructed. Vlahos’s historical significance lies in making those operations more precise. The exhibit’s vector scene is a modern explanation of masking, not a reconstruction of Butler’s laboratory procedure.', sources: ['S2', 'S5'] },
      ] },
    ],
  },
  {
    id: 2, title: 'An engineer enters Hollywood', shortTitle: 'The engineer', period: '1916–1950s', accent: 'neutral', duration: '0:45',
    takeaway: 'Cinema’s next illusion began as an engineering problem.',
    introduction: 'From New Mexico to California, from aircraft and radar to the film laboratory: Vlahos brought an engineer’s attention to the machinery of make-believe.',
    blocks: [
      { title: 'Raton, San Pedro, Berkeley', paragraphs: [
        { text: 'Petro Vlahos was born on 20 August 1916 in Raton, New Mexico. His family moved to San Pedro, California, when he was eight. In 1941 he graduated from the University of California, Berkeley, with an engineering degree. These origins place him outside the conventional story of a director or studio artist: his route into cinema began with technical training and the analysis of physical systems.', sources: ['S1', 'S9'] },
        { text: 'During the Second World War he worked at Douglas Aircraft; afterward he worked as a radar engineer at Bell Laboratories. Nelson’s obituary describes an MGM sound director connecting him with the Motion Picture Research Council. This sequence shows movement between industrial research and entertainment. It does not establish that radar or aircraft engineering directly caused a particular compositing invention; that stronger causal claim would need different evidence.', sources: ['S1'] },
      ] },
      { title: 'A film industry under pressure', paragraphs: [
        { text: 'The spread of television challenged American cinema’s business in the postwar years. Studios sought experiences that could distinguish a visit to the cinema: wide images, stereophonic sound and expensive spectacle. Fratini describes an industry making fewer, costlier films while developing new formats and production techniques. In that environment, the ability to combine large-scale settings with separately photographed performances had clear practical and artistic value.', sources: ['S8'] },
        { text: 'The period was also shaped by federal antitrust action against studio distribution and exhibition practices, House Un-American Activities Committee investigations and labour conflict. These pressures belong to the political and industrial setting of Vlahos’s career. They should not be reduced to a direct explanation of a patent. Historical context helps explain the institutions and priorities surrounding an invention without replacing evidence about the invention itself.', sources: ['S8'] },
      ] },
      { title: 'Research as a shared infrastructure', paragraphs: [
        { text: 'Established in 1948, the Motion Picture Research Council represented a cross-studio approach to technical problems. Instead of treating every limitation as a private studio problem, research could support common production needs. Vlahos remained with the council until its dissolution in 1960. After further work in the physical sciences, he returned as chief scientist when the Academy opened its Motion Picture Research Center in 1968.', sources: ['S1', 'S8'] },
        { text: 'This institutional history changes how special effects can be understood. An apparently effortless fantasy depends on laboratories, standardized equipment and technicians whose work may be invisible to audiences. Vlahos’s career is evidence of that connection between engineering and storytelling. His patents extended beyond compositing to other filmmaking apparatus, supporting a portrait of a systems engineer interested in making production techniques reliable and repeatable.', sources: ['S1', 'S9'] },
      ] },
      { title: 'The epic as a technical demand', paragraphs: [
        { text: 'Ben-Hur (1959) made format a concrete constraint. Its MGM Camera 65 system used a 65 mm negative, associated with 70 mm exhibition. Foster connects Vlahos’s colour-difference development to requirements that could not simply be met by the modified 35 mm sodium-vapour camera. A useful technique was not automatically transferable to a larger negative. This is a connection to the production context, not evidence that every chariot-race shot used one matte process.', sources: ['S5', 'S8', 'S9'] },
      ] },
    ],
  },
  {
    id: 3, title: 'Solving the blue edge', shortTitle: 'The blue edge', period: '1959 / 1964', accent: 'blue', duration: '1:10',
    takeaway: 'The breakthrough was in the separation, not the screen.',
    introduction: 'Colour carried more information than a simple outline. Vlahos used relationships between photographic colour records to build a more convincing travelling matte.',
    blocks: [
      { title: 'Colour as discriminating information', paragraphs: [
        { text: 'In a photographed scene, a blue backing and a foreground face contribute differently to red, green and blue records. A saturated blue backing registers strongly in blue information and differently in the other records. Vlahos used these relationships to form mattes and reconstruct a foreground with less unwanted blue at its boundary. The goal was a better account of what belonged to the subject, including detail that a blunt silhouette would discard.', sources: ['S2', 'S5'] },
        { text: 'The colour-difference travelling-matte method belongs to a photochemical workflow. Its working materials were photographic separations, positive and negative records, masks and controlled printing exposures. It was not a digital camera identifying a blue pixel and making it disappear. The interactive exhibit uses a modern green-screen photograph and numerical RGB data to make colour information visible. Its controls explain separation; they do not simulate the complete blue-screen patent.', sources: ['S2'] },
      ] },
      { title: 'A patent with two important dates', paragraphs: [
        { text: 'US Patent 3,158,477, Composite Color Photography, was filed on 2 April 1959 and granted on 24 November 1964. Keeping these dates distinct prevents the misleading claim that the work suddenly began in 1964. The Ben-Hur production context belongs to the late 1950s, while the grant records a later stage in the patent history. The patent is a primary source for the process described and the claims made; it is not a complete account of every production worker’s contribution.', sources: ['S2', 'S5'] },
        { text: 'Conceptually, the workflow begins with a performer against a controlled blue backing, proceeds through photographic colour separations and matte construction, then reconstructs foreground colour and combines it with another scene. Registration—the precise alignment of records—matters throughout. Slight displacement can make the subject look bordered or detached. Exposure and colour reconstruction matter too: a matte controls visibility, but the retained image still has to look natural.', sources: ['S2'] },
      ] },
      { title: 'Why partial transparency is central', paragraphs: [
        { text: 'A blurred hand occupies only part of its apparent edge during an exposure. A glass object transmits some background light; a strand of hair may be smaller than a resolved image detail. These cases require graduated coverage rather than an all-or-nothing decision. A more faithful matte preserves intermediate information while controlling backing contamination. In the demonstration, the poor key uses a hard threshold; the improved key retains intermediate values at softer boundaries. Its estimated mask is still imperfect, which makes the remaining edge problems available for inspection.', sources: ['S2', 'S4'] },
        { text: 'Blue reflected from the backing is a separate problem from the outline itself. Removing the background can leave that reflected light on the actor. Reconstructing a believable foreground therefore involves colour as well as coverage. This is why “he invented blue screen” misses the substance of Vlahos’s work: a screen can be easy to photograph while the reliable extraction and recombination of the image remain technically difficult.', sources: ['S2', 'S5'] },
      ] },
      { title: 'Technical detail: why there is no single subtraction recipe', technical: true, paragraphs: [
        { text: 'The patent treats photographic separations, synthetic colour information, masks and exposure response as related operations. Film density is not identical to an 8-bit RGB sample, and positives and negatives invert relationships between light and dark. Describing the entire process as “blue minus green” conceals these transformations. Read the original patent for its actual sequence; use this exhibit to understand why comparing colour information can help separate an image.', sources: ['S2'] },
        { text: 'The improved bluescreen approach also offered flexibility across photographic workflows that a specialized sodium camera could not always provide. The Academy retrospective connects the system with Ben-Hur and its later use in effects-heavy cinema, including the original Star Wars trilogy. These histories support an argument about broad influence; they do not make every blue-screen composite an application of exactly the same laboratory recipe.', sources: ['S5', 'S9'] },
      ] },
    ],
  },
  {
    id: 4, title: 'The yellow screen', shortTitle: 'The yellow screen', period: '1958–1964', accent: 'yellow', duration: '1:30',
    takeaway: 'A narrow band of light opened a much wider world.',
    introduction: 'For Mary Poppins, a different route to the matte: sodium light, specialized optics and two synchronized film records. An optical separation made during photography.',
    blocks: [
      { title: 'Yellow light, rather than yellow paint', paragraphs: [
        { text: 'Sodium-vapour photography solved a related problem through a different physical mechanism. Low-pressure sodium lamps illuminated the backdrop with a very narrow band of yellow light near 589 nm. The performer received broad-spectrum scene lighting. Specialized wavelength-selective optics could distinguish the backing’s narrow spectral component from most of the light forming the performer’s colour image. An ordinary yellow-painted wall under white light would not provide the same isolated signal.', sources: ['S3', 'S5'] },
        { text: 'Vlahos filed US Patent 3,095,304, Composite Photography Utilizing Sodium Vapor Illumination, on 15 May 1958; it was granted on 25 June 1963. Its optical approach should be kept separate from the colour-difference patent. One works with narrowband illumination and optical separation during exposure; the other derives and refines mattes through photographic colour records. They share a creative purpose without being mechanically identical.', sources: ['S2', 'S3'] },
      ] },
      { title: 'Two records, one optical view', paragraphs: [
        { text: 'Inside the modified camera, a specially coated prism arrangement separated the sodium band from the remaining scene light. Two synchronized photographic records resulted: the performer’s colour image and a black-and-white matte record associated with the sodium-lit backing. Printing used complementary masks to combine the foreground with a replacement scene. The camera did not run software to remove yellow pixels; optical filtering and film recorded the information for later compositing.', sources: ['S3', 'S5'] },
        { text: 'Because the records were made at the same instant from the same view, their edges corresponded closely. Fine detail, soft boundaries and partial transmission could be represented more faithfully than by a crude cut-out. That advantage still depended on careful lighting, exposure and optical work. Reflections or contamination by backing light could remain troublesome. The diagram simplifies the light paths and later printing; it is not a scale drawing of the original camera.', sources: ['S3', 'S7'] },
      ] },
      { title: 'Mary Poppins: engineering in service of a dance', paragraphs: [
        { text: 'In the Jolly Holiday sequence of Mary Poppins (1964), live performers appear inside an animated world. The performance and the animation came from different production processes. Sodium-vapour matting supplied carefully matched foreground and mask records that helped the effects team bring them together. The technology supported the apparent contact between performers and imaginary surroundings; it did not replace the work of animators, layout artists, camera crews, optical printers or editors.', sources: ['S5', 'S7'] },
        { text: 'Credit must remain collaborative. Foster’s account of an interview with Vlahos foregrounds the prism development and Iwerks’s camera adaptation; Disney’s institutional history emphasizes Ub Iwerks. The Academy’s 1964 awards-year scientific/technical record jointly honours Petro Vlahos, Wadsworth E. Pohl and Ub Iwerks for colour travelling-matte composite cinematography. The ceremony took place in 1965. These accounts establish shared achievement more securely than an exclusive claim for any one inventor.', sources: ['S5', 'S6', 'S7'] },
      ] },
      { title: 'A powerful process with practical constraints', paragraphs: [
        { text: 'The sodium process depended on specific lamps, precision optical coatings, a modified camera and a specialized photographic workflow. Those requirements limited its adaptability as formats and production practices changed. Ordinary blue and green backings could be used with a wider range of cameras and increasingly capable keyers. The history is not a simple contest in which a technically inferior method defeated a perfect one; flexibility and production infrastructure also shape adoption.', sources: ['S5', 'S7'] },
        { text: 'The lineage also extends beyond the United States. Foster describes parallel British development, and Harryhausen discussed Rank’s sodium process. Likewise, the often-repeated assertion that only one prism ever existed should be treated cautiously: Foster reports the single-prism story, while Disney’s 2025 archive account says three were produced. This exhibit preserves that disagreement rather than turning an attractive anecdote into settled fact.', sources: ['S5', 'S7', 'S12'] },
      ] },
      { title: 'Technical detail: narrowband light and the matte', technical: true, paragraphs: [
        { text: 'The useful distinction is spectral: the sodium backing concentrates light in a tiny interval of the visible spectrum, while normal foreground lighting is spread across many wavelengths. A selective optical coating can route the narrow band to a matte record and the remainder toward the colour record. The matte’s light and dark polarity can be reversed in subsequent printing. In this diagram a bright background denotes sodium exposure; the inverted subject mask is a later conceptual view, not an additional digital stream inside the camera.', sources: ['S3'] },
      ] },
    ],
  },
  {
    id: 5, title: 'From Ultimatte to the digital age', shortTitle: 'The legacy', period: '1976 → TODAY', accent: 'green', duration: '1:00',
    takeaway: 'New media. The same demand for a believable edge.',
    introduction: 'From film records to video signals and digital pixels, Vlahos’s enduring contribution was making the separation more convincing, repeatable and adaptable.',
    blocks: [
      { title: 'The idea moves into electronics', paragraphs: [
        { text: 'Vlahos founded Ultimatte in 1976, extending his work into electronic compositing. Video systems could compare image signals and control foreground/background mixing through circuitry, rather than relying on multiple physical film-printing stages. Electronic keying already had a history; Ultimatte’s significance was in improving how a system handled the difficult departures from an ideal screen and subject. His career continued through a change in the medium of the image itself.', sources: ['S1', 'S4', 'S9'] },
        { text: 'US Patent 4,007,487, Electronic Composite Photography with Color Control, was filed on 25 September 1975 and granted on 8 February 1977. It addresses uneven backing brightness, shadows, imperfect backing colour, reflected blue flare and partially transparent subjects. These are familiar problems because the photographic situation has not become simple: light still reflects onto a performer, glass still transmits a background, and a moving hand still produces a soft boundary.', sources: ['S4'] },
      ] },
      { title: 'Recognition across generations', paragraphs: [
        { text: 'The dossier records a 1978 Emmy and a series of Academy honours, including the Gordon E. Sawyer Award for the 1993 awards year. For the 1994 awards year, Petro and his son Paul Vlahos shared an Academy Award of Merit for the Ultimatte Electronic Blue Screen Compositing Process for motion pictures. These honours demonstrate recognition beyond a single 1960s breakthrough and connect the photographic and electronic stages of his career.', sources: ['S1', 'S6', 'S9'] },
        { text: 'Vlahos died on 10 February 2013, aged 96. His legacy is not ownership of every later composite. It is a series of influential solutions that helped image-makers preserve more of a performance while exchanging its surroundings. That is a defensible historical argument about both technical precision and artistic freedom, rather than the misleading claim that one person invented the green screen.', sources: ['S1', 'S9'] },
      ] },
      { title: 'Film, electronic signals, digital samples', paragraphs: [
        { text: 'Photographic film records light through light-sensitive emulsions; a modern electronic image sensor converts incident light into electrical signals that can be represented numerically. Many single-sensor cameras use a Bayer colour-filter array: half the photosites are green-filtered, a quarter red and a quarter blue. Demosaicing estimates a full-colour image from that sampled pattern. This is different from producing photographic colour separations in a film laboratory.', sources: ['S2', 'S11'] },
        { text: 'That denser green sampling can support useful green-channel detail, but screen choice also depends on wardrobe, lighting, reflections and the scene. Green is not always preferable. Neither a Bayer array nor a CMOS sensor inherently records a perfect opacity mask. A normal camera records light and colour; a keyer or another process must derive foreground coverage. Vlahos did not invent CMOS, CCD sensors or the Bayer filter.', sources: ['S11'] },
      ] },
      { title: 'Technical detail: what a digital matte controls', technical: true, paragraphs: [
        { text: 'In a simplified digital composite, C = αF + (1 − α)B. F is foreground, B is background and α describes coverage or opacity. Values between zero and one allow intermediate visibility at soft or translucent boundaries. Real compositing also involves colour treatment, edge contamination and matching the elements. This equation explains a modern image mixture; it is not the recipe used in Vlahos’s original colour-difference patent.', sources: ['S2', 'S4'] },
        { text: 'Across these different media, the recurring task is to identify useful image information and preserve it through combination. The artistic result is a scene that seems to have been photographed whole. Vlahos did not invent the idea of putting an actor in another world. He helped make that illusion more convincing, repeatable and adaptable—and transformed what filmmakers could imagine.', sources: ['S2', 'S4', 'S9'] },
      ] },
    ],
  },
]
