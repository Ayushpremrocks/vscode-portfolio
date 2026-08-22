import React from 'react'
import { portfolio } from '../../data/portfolio'
import { BlankLine, CodeLine, CommentBlock, Cmt, Kw, Op, Prop, Str, Typ, Var } from '../editor/CodeBlock'

export const AboutPanel: React.FC = () => {
  return (
    <div>
      <CommentBlock lines={[
        '// about.ts',
        `// ${portfolio.name} — ${portfolio.title}`,
      ]} />
      <BlankLine />

      <CodeLine><Kw c="import" /> <Typ c="type" /> {'{ '}<Typ c="Developer" />{'}'} <Kw c="from" /> <Str c='"@/types"' /></CodeLine>
      <BlankLine />

      <CodeLine><Cmt c="/**" /></CodeLine>
      {portfolio.bio.map((line, i) => (
        <CodeLine key={i}><Cmt c={` * ${line}`} /></CodeLine>
      ))}
      <CodeLine><Cmt c=" */" /></CodeLine>
      <BlankLine />

      <CodeLine>
        <Kw c="const " /><Var c="about" /><Op c=": " /><Typ c="Developer" /><Op c=" = " />{'{'} 
      </CodeLine>
      <CodeLine indent={1}><Prop c="name" /><Op c=": " /><Str c={`"${portfolio.name}"`} /><Op c="," /></CodeLine>
      <CodeLine indent={1}><Prop c="title" /><Op c=": " /><Str c={`"${portfolio.title}"`} /><Op c="," /></CodeLine>
      <CodeLine indent={1}><Prop c="subtitle" /><Op c=": " /><Str c={`"${portfolio.subtitle}"`} /><Op c="," /></CodeLine>
      <CodeLine indent={1}><Prop c="location" /><Op c=": " /><Str c={`"${portfolio.location}"`} /><Op c="," /></CodeLine>
      <CodeLine indent={1}><Prop c="email" /><Op c=": " /><Str c={`"${portfolio.email}"`} /><Op c="," /></CodeLine>
      <CodeLine indent={1}><Prop c="availableForWork" /><Op c=": " /><Kw c="true" /><Op c="," /></CodeLine>
      <BlankLine />
      <CodeLine indent={1}><Prop c="social" /><Op c=": " />{'{'}</CodeLine>
      <CodeLine indent={2}><Prop c="github" /><Op c=": " /><Str c={`"${portfolio.social.github}"`} /><Op c="," /></CodeLine>
      <CodeLine indent={2}><Prop c="linkedin" /><Op c=": " /><Str c={`"${portfolio.social.linkedin}"`} /><Op c="," /></CodeLine>
      <CodeLine indent={2}><Prop c="twitter" /><Op c=": " /><Str c={`"${portfolio.social.twitter}"`} /><Op c="," /></CodeLine>
      <CodeLine indent={2}><Prop c="website" /><Op c=": " /><Str c={`"${portfolio.social.website}"`} /></CodeLine>
      <CodeLine indent={1}>{'}'}<Op c="," /></CodeLine>
      <CodeLine>{'}'}</CodeLine>
      <BlankLine />

      <CodeLine><Kw c="export default " /><Var c="about" /></CodeLine>
      <BlankLine />

      {/* Blinking cursor */}
      <div className="flex items-center gap-0 font-mono text-[13px]" style={{ color: 'var(--text)' }}>
        <span className="inline-block w-[2px] h-[14px] animate-[blink_1s_step-end_infinite]" style={{ background: 'var(--text)' }} />
      </div>
    </div>
  )
}
