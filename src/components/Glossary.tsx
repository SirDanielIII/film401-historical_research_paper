import { glossary } from '../data/glossary'
import questions from '../data/questions.json'
import { SourceCitation } from './SourceCitation'

const topics = ['Biography and career', 'Historical context', 'Early compositing', 'Colour-difference technology', 'Sodium-vapour photography', 'Mary Poppins and attribution', 'Ultimatte and modern technology']

export function Glossary() {
  return <section className="questions-section" id="questions" aria-labelledby="questions-title"><p className="eyebrow">DISCUSSION & TECHNICAL TERMS</p><h2 id="questions-title" tabIndex={-1}>Further questions</h2><p className="section-intro">Questions about Vlahos’s work, his collaborators and the technology.</p><div className="question-groups">{topics.map(topic => <details className="question-topic" key={topic}><summary>{topic}<span>{questions.filter(q => q.topic === topic).length} questions</span></summary>{questions.filter(q => q.topic === topic).map(q => <div className="question-answer" key={q.id}><h3>{q.question}</h3><p>{q.answer} <SourceCitation ids={q.sources} /></p></div>)}</details>)}</div><details className="glossary-disclosure"><summary>Glossary of compositing terms <span>{glossary.length} terms</span></summary><dl className="glossary-list">{glossary.map(item => <div key={item.term}><dt>{item.term}</dt><dd>{item.definition} <SourceCitation ids={item.sources} /></dd></div>)}</dl></details></section>
}
