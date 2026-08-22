import React from 'react'
import { GraduationCap, Calendar } from 'lucide-react'
import { portfolio } from '../../data/portfolio'
import { BlankLine, CodeLine, CommentBlock, Kw, Op, Prop, Str, Typ, Var } from '../editor/CodeBlock'

export const EducationPanel: React.FC = () => {
  return (
    <div>
      <CommentBlock lines={[
        '// education.ts',
        `// ${portfolio.education.length} educational qualifications`,
      ]} />
      <BlankLine />

      <CodeLine><Kw c="import" /> <Typ c="type" /> {'{ '}<Typ c="Education" />{'}'} <Kw c="from" /> <Str c='"@/types"' /></CodeLine>
      <BlankLine />

      <CodeLine><Kw c="const " /><Var c="education" /><Op c=": " /><Typ c="Education" /><Op c="[]" /><Op c=" = " /><Op c="[" /></CodeLine>
      {portfolio.education.map((edu, i) => (
        <React.Fragment key={edu.id}>
          <CodeLine indent={1}><Op c="{" /></CodeLine>
          <CodeLine indent={2}><Prop c="school" /><Op c=": " /><Str c={`"${edu.school}"`} /><Op c="," /></CodeLine>
          <CodeLine indent={2}><Prop c="degree" /><Op c=": " /><Str c={`"${edu.degree}"`} /><Op c="," /></CodeLine>
          <CodeLine indent={2}><Prop c="field" /><Op c=": " /><Str c={`"${edu.field}"`} /><Op c="," /></CodeLine>
          <CodeLine indent={2}><Prop c="period" /><Op c=": " /><Str c={`"${edu.period}"`} /><Op c="," /></CodeLine>
          {edu.gpa && <CodeLine indent={2}><Prop c="gpa" /><Op c=": " /><Str c={`"${edu.gpa}"`} /><Op c="," /></CodeLine>}
          <CodeLine indent={1}><Op c={i < portfolio.education.length - 1 ? "}," : "}"} /></CodeLine>
        </React.Fragment>
      ))}
      <CodeLine><Op c="]" /></CodeLine>
      <BlankLine />
      <CodeLine><Kw c="export default " /><Var c="education" /></CodeLine>
      <BlankLine />

      {/* Visual cards */}
      <div className="mt-8 space-y-4">
        <div className="font-mono text-xs mb-6" style={{ color: 'var(--comment)' }}>
          {'/* ─── Education History ─── */'}
        </div>
        {portfolio.education.map((edu, i) => (
          <EducationCard key={edu.id} education={edu} isFirst={i === 0} />
        ))}
      </div>
    </div>
  )
}

const EducationCard: React.FC<{ education: typeof portfolio.education[0]; isFirst: boolean }> = ({ education }) => (
  <div
    className="rounded-md p-5 transition-all"
    style={{
      background: 'var(--bg-sidebar)',
      border:     '1px solid var(--border)',
    }}
    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--green)')}
    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
  >
    <div className="flex flex-wrap justify-between gap-3 mb-3">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <GraduationCap size={16} style={{ color: 'var(--green)' }} />
          <h3 className="font-semibold text-sm" style={{ color: 'var(--text)' }}>
            {education.degree}
          </h3>
        </div>
        <p className="text-xs" style={{ color: 'var(--blue)' }}>{education.field}</p>
        <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{education.school}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <div className="flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
          <Calendar size={11} />
          <span className="text-[11px]">{education.period}</span>
        </div>
        {education.gpa && (
          <span className="text-[11px] px-2 py-0.5 rounded" style={{ background: 'var(--bg-hover)', color: 'var(--yellow)' }}>
            GPA: {education.gpa}
          </span>
        )}
      </div>
    </div>
    {education.details.length > 0 && (
      <ul className="space-y-1 border-t pt-3" style={{ borderColor: 'var(--border)' }}>
        {education.details.map((d, i) => (
          <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--green)' }} />
            {d}
          </li>
        ))}
      </ul>
    )}
  </div>
)
