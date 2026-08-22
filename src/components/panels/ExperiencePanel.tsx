import React from 'react'
import { Briefcase, MapPin, Calendar } from 'lucide-react'
import { portfolio } from '../../data/portfolio'
import { BlankLine, CodeLine, CommentBlock, Kw, Op, Prop, Str, Typ, Var } from '../editor/CodeBlock'

export const ExperiencePanel: React.FC = () => {
  return (
    <div>
      <CommentBlock lines={[
        '// experience.ts',
        `// ${portfolio.experience.length} roles across ${portfolio.experience.map(e => e.company).join(', ')}`,
      ]} />
      <BlankLine />

      <CodeLine><Kw c="import" /> <Typ c="type" /> {'{ '}<Typ c="Experience" />{'}'} <Kw c="from" /> <Str c='"@/types"' /></CodeLine>
      <BlankLine />

      <CodeLine><Kw c="const " /><Var c="experience" /><Op c=": " /><Typ c="Experience" /><Op c="[]" /><Op c=" = " /><Op c="[" /></CodeLine>
      {portfolio.experience.map((exp, i) => (
        <React.Fragment key={exp.id}>
          <CodeLine indent={1}><Op c="{" /></CodeLine>
          <CodeLine indent={2}><Prop c="company" /><Op c=": " /><Str c={`"${exp.company}"`} /><Op c="," /></CodeLine>
          <CodeLine indent={2}><Prop c="role" /><Op c=": " /><Str c={`"${exp.role}"`} /><Op c="," /></CodeLine>
          <CodeLine indent={2}><Prop c="period" /><Op c=": " /><Str c={`"${exp.period}"`} /><Op c="," /></CodeLine>
          <CodeLine indent={2}><Prop c="location" /><Op c=": " /><Str c={`"${exp.location}"`} /><Op c="," /></CodeLine>
          <CodeLine indent={2}><Prop c="bullets" /><Op c=": " /><Op c="[" /></CodeLine>
          {exp.bullets.map((b, bi) => (
            <CodeLine key={bi} indent={3}><Str c={`"${b}"`} /><Op c={bi < exp.bullets.length - 1 ? ',' : ''} /></CodeLine>
          ))}
          <CodeLine indent={2}><Op c="]," /></CodeLine>
          <CodeLine indent={1}><Op c={i < portfolio.experience.length - 1 ? "}," : "}"} /></CodeLine>
        </React.Fragment>
      ))}
      <CodeLine><Op c="]" /></CodeLine>
      <BlankLine />
      <CodeLine><Kw c="export default " /><Var c="experience" /></CodeLine>
      <BlankLine />

      {/* Visual experience timeline */}
      <div className="mt-8">
        <div className="font-mono text-xs mb-6" style={{ color: 'var(--comment)' }}>
          {'/* ─── Experience Timeline ─── */'}
        </div>
        <div className="relative">
          {/* Vertical timeline line */}
          <div
            className="absolute left-4 top-0 bottom-0 w-px"
            style={{ background: 'var(--border)' }}
          />
          <div className="space-y-8 pl-12">
            {portfolio.experience.map((exp, i) => (
              <ExperienceCard key={exp.id} experience={exp} isFirst={i === 0} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const ExperienceCard: React.FC<{ experience: typeof portfolio.experience[0]; isFirst: boolean }> = ({ experience, isFirst }) => (
  <div className="relative group">
    {/* Timeline dot */}
    <div
      className="absolute -left-[40px] w-3 h-3 rounded-full border-2 transition-colors"
      style={{
        background:   isFirst ? 'var(--blue)' : 'var(--bg-sidebar)',
        borderColor:  isFirst ? 'var(--blue)' : 'var(--border)',
        top:          '6px',
      }}
    />

    <div
      className="rounded-md p-4 transition-all"
      style={{
        background: 'var(--bg-sidebar)',
        border:     '1px solid var(--border)',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--blue)')}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
        <div>
          <h3 className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{experience.role}</h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Briefcase size={11} style={{ color: 'var(--blue)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--blue)' }}>{experience.company}</span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <div className="flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
            <Calendar size={10} />
            <span className="text-[11px]">{experience.period}</span>
          </div>
          <div className="flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
            <MapPin size={10} />
            <span className="text-[11px]">{experience.location}</span>
          </div>
        </div>
      </div>
      <ul className="space-y-1 mt-3">
        {experience.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: 'var(--green)' }} />
            {b}
          </li>
        ))}
      </ul>
    </div>
  </div>
)
