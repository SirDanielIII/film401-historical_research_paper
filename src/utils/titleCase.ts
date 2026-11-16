const minorWords = new Set(['a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'from', 'in', 'nor', 'of', 'on', 'or', 'per', 'the', 'to', 'via', 'vs'])
const initialisms = new Set(['RGB', 'MGM', 'FILM', 'TV', 'VFX', 'UC', 'HUAC', 'AMPTP', 'SMPTE', 'UK', 'US', 'USA', 'CC', 'BY', 'SIGGRAPH', 'LED', 'R', 'G', 'B'])

// Presentation labels only; keep narration, research paragraphs and source titles intact.
export function titleCase(text: string) {
  const tokens = text.split(/(\s+)/)
  let first = true
  return tokens.map((token, index) => {
    if (!/[A-Za-z]/.test(token)) {
      if (/[:·—]/.test(token)) first = true
      return token
    }
    const startsPhrase = first
    first = /[:·—]$/.test(token)
    if (/^\d/.test(token)) return token
    const last = !tokens.slice(index + 1).some(next => /[A-Za-z]/.test(next))
    return token.replace(/[A-Za-z][A-Za-z’']*/g, word => {
      if (word === 'nm' || initialisms.has(word)) return word
      const lower = word.toLowerCase()
      return minorWords.has(lower) && !startsPhrase && !last ? lower : lower[0].toUpperCase() + lower.slice(1)
    })
  }).join('')
}
