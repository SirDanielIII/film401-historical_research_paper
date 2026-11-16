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
    "id": 1,
    "title": "Before Vlahos",
    "shortTitle": "Earlier compositing",
    "period": "BEFORE THE LATE 1950s",
    "accent": "blue",
    "duration": "0:35",
    "takeaway": "Earlier blue-screen methods left room for improvement.",
    "introduction": "Vlahos worked on a problem filmmakers already knew: combining separate images without an obvious join.",
    "blocks": [
      {
        "title": "From masks to a finished shot",
        "paragraphs": [
          {
            "text": "Early filmmakers combined exposures using masks that reserved part of the frame for another image. Moving subjects required a changing mask, followed by accurate alignment of the film records. This laboratory work was slow and demanding. Vlahos’s later research concentrated on making separation and reconstruction more reliable.",
            "sources": [
              "S2",
              "S5"
            ]
          },
          {
            "text": "A successful composite also depends on matching perspective, lighting and colour. A precise matte gives the effects department a better starting element; cinematographers and laboratory crews still have to make the separate images fit together.",
            "sources": [
              "S2",
              "S5"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 2,
    "title": "An engineer enters Hollywood",
    "shortTitle": "Biography",
    "period": "1916–1968",
    "accent": "neutral",
    "duration": "0:50",
    "takeaway": "Industrial engineering led Vlahos into shared studio research.",
    "introduction": "His career connected aircraft manufacture, radar engineering and Hollywood’s laboratories.",
    "blocks": []
  },
  {
    "id": 3,
    "title": "The colour-difference process",
    "shortTitle": "Colour difference",
    "period": "1959 / 1964",
    "accent": "blue",
    "duration": "1:15",
    "takeaway": "Comparing colour records produced more useful mattes.",
    "introduction": "Vlahos improved blue-screen photography by working with the colour information recorded on film.",
    "blocks": [
      {
        "title": "A production problem: Ben-Hur",
        "paragraphs": [
          {
            "text": "At the Motion Picture Research Council, Vlahos applied his engineering background to Hollywood’s matte problems. MGM’s Ben-Hur (1959) needed improved composites on 65 mm film, beyond the format of his 35 mm sodium-vapour camera. He developed a colour-difference travelling-matte process using a single colour negative.",
            "sources": [
              "S5",
              "S2"
            ]
          }
        ]
      },
      {
        "title": "His colour-difference process",
        "paragraphs": [
          {
            "text": "Vlahos used relationships between red, green and blue photographic records to build mattes and reconstruct foreground colour. This gave filmmakers better control over hair, motion blur and unwanted blue at subject boundaries. The process involved film separations and carefully controlled printing; the RGB demonstration below illustrates the principle with modern digital images.",
            "sources": [
              "S2"
            ]
          }
        ]
      },
      {
        "title": "The patent and its influence",
        "paragraphs": [
          {
            "text": "Vlahos filed Composite Color Photography, US 3,158,477, on 2 April 1959; it was granted on 24 November 1964. It improved optical composites without requiring a dual-film camera. His blue-screen work later served productions including the original Star Wars trilogy.",
            "sources": [
              "S2",
              "S9"
            ]
          }
        ]
      },
      {
        "title": "Technical notes: film records and printing",
        "technical": true,
        "paragraphs": [
          {
            "text": "The patent describes positive and negative separations, a reconstructed blue record, compensating masks and controlled printing exposures. Photographic density measures how much light a film record absorbs; it does not behave like a digital RGB value. Accurate alignment, or registration, remained essential. The demonstration’s numerical comparisons and spill correction are teaching tools, rather than a reproduction of those laboratory operations.",
            "sources": [
              "S2"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 4,
    "title": "Sodium vapour and Mary Poppins",
    "shortTitle": "Sodium vapour",
    "period": "1958–1965",
    "accent": "yellow",
    "duration": "1:20",
    "takeaway": "Vlahos’s optical system recorded picture and matte together.",
    "introduction": "A second approach separated the backdrop’s narrow yellow spectrum inside the camera.",
    "blocks": [
      {
        "title": "Vlahos’s optical contribution",
        "paragraphs": [
          {
            "text": "His sodium-vapour patent was filed on 15 May 1958, before the colour-difference filing in 1959, and granted on 25 June 1963. These were parallel approaches. The patent describes wavelength-selective optics and simultaneous film records. Foster credits Vlahos’s coated prism and Ub Iwerks’s adaptation of the production camera for Disney. Wadsworth E. Pohl shared their later Academy recognition; the sources give less detail about his individual engineering role.",
            "sources": [
              "S3",
              "S5",
              "S6"
            ]
          }
        ]
      },
      {
        "title": "Why recording the matte mattered",
        "paragraphs": [
          {
            "text": "Picture and matte shared a lens and exposure, keeping their boundaries closely matched while reducing intermediate mask-making. Fine hair, motion blur and light passing through sheer fabric could produce graded matte detail instead of a hard cut-out.",
            "sources": [
              "S3",
              "S7"
            ]
          },
          {
            "text": "Optical separation kept most sodium-backing light off the colour record, reducing a source of coloured edges. It also allowed blue clothing without treating the whole blue range as background. Clean results still depended on lighting, coatings and film response: some residual backing light remained.",
            "sources": [
              "S3",
              "S2"
            ]
          }
        ]
      },
      {
        "title": "Why it remained specialized",
        "paragraphs": [
          {
            "text": "Sodium-vapour photography required special lamps, precision optics and a dual-film camera, followed by laboratory printing. Its 35 mm equipment did not suit every format, as Ben-Hur showed. Improved blue-screen methods offered more flexible camera choices; later electronic systems could combine video signals without simultaneous film records. Sodium vapour was an effective solution for particular productions, rather than a universal replacement.",
            "sources": [
              "S2",
              "S3",
              "S4",
              "S5"
            ]
          }
        ]
      },
      {
        "title": "Technical notes: spectrum and transparency",
        "technical": true,
        "paragraphs": [
          {
            "text": "The patent describes a non-coloured translucent backing lit from behind; Foster describes a white reflective backing. Both rely on narrow sodium illumination near 589 nm. The coatings and filters select that band, while colour film has reduced sensitivity around it, rather than no sensitivity at all. Light transmitted through fine or transparent material gives intermediate matte exposure. Printing can reverse the record to obtain the complementary mask.",
            "sources": [
              "S3",
              "S5"
            ]
          }
        ]
      }
    ]
  },
  {
    "id": 5,
    "title": "Ultimatte and his legacy",
    "shortTitle": "Legacy",
    "period": "1976 → TODAY",
    "accent": "green",
    "duration": "1:00",
    "takeaway": "Vlahos continued refining compositing as production moved into video.",
    "introduction": "His later work brought more precise colour control to electronic film and television workflows.",
    "blocks": [
      {
        "title": "Continuing the work in electronics",
        "paragraphs": [
          {
            "text": "Vlahos’s electronic-compositing patent, US 4,007,487, was filed on 25 September 1975 and granted on 8 February 1977. It addressed uneven backing brightness, shadows, unwanted blue reflections and partly transparent subjects. Electronic keying already existed; his contribution was better control over the faults that made a composite look artificial.",
            "sources": [
              "S4"
            ]
          },
          {
            "text": "Ultimatte extended this research into production equipment. Circuits compared foreground colour signals and controlled their mixture with a background signal, avoiding the repeated film-printing stages of optical compositing. Foster identifies Carl Sagan’s Cosmos as an early television use. Television, once a competitor pushing studios toward spectacle, also became an important setting for Vlahos’s work.",
            "sources": [
              "S4",
              "S5",
              "S8"
            ]
          }
        ]
      },
      {
        "title": "Technical notes: digital cameras and colour",
        "paragraphs": [
          {
            "text": "Many single-sensor digital cameras use a Bayer filter pattern: half the photosites measure green, one quarter red and one quarter blue. Demosaicing estimates the missing components to make a full-colour image. This can favour green-channel detail, although wardrobe, reflections, lighting and camera response also influence the choice of backing.",
            "sources": [
              "S11"
            ]
          },
          {
            "text": "A conventional colour camera measures light, so foreground coverage must be estimated or captured through an additional method. Digital compositing often represents that coverage as alpha: zero reveals the background, one retains the foreground, and intermediate values blend them. Vlahos’s film separations and electronic circuits addressed this separation problem using the recording media available to him.",
            "sources": [
              "S2",
              "S4",
              "S18"
            ]
          }
        ],
        "technical": true
      }
    ]
  }
]
