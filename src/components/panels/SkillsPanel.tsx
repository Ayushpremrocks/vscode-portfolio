import React from 'react'
import { portfolio } from '../../data/portfolio'
import { BlankLine, CodeLine, CommentBlock, Kw, Op, Prop, Str, Typ, Num, Var } from '../editor/CodeBlock'
import type { Skill } from '../../data/portfolio'

export const SkillsPanel: React.FC = () => {
  const { languages, frameworks, tools, databases } = portfolio.skills
  return (
    <div>
      <CommentBlock lines={['// skills.ts', '// Technical skills and proficiency levels']} />
      <BlankLine />

      <CodeLine><Kw c="import" /> <Typ c="type" /> {'{ '}<Typ c="Skill" />{'}'} <Kw c="from" /> <Str c='"@/types"' /></CodeLine>
      <BlankLine />

      <SkillSection varName="languages"  label="Languages"   items={languages} />
      <BlankLine />
      <SkillSection varName="frameworks" label="Frameworks"   items={frameworks} />
      <BlankLine />
      <SkillSection varName="tools"      label="Tools"        items={tools} />
      <BlankLine />
      <SkillSection varName="databases"  label="Databases"    items={databases} />
      <BlankLine />

      <CodeLine><Kw c="export const " /><Var c="skills" /><Op c=" = " />{'{'} <Var c="languages" /><Op c="," /> <Var c="frameworks" /><Op c="," /> <Var c="tools" /><Op c="," /> <Var c="databases" /> {'}'}</CodeLine>
      <BlankLine />

      {/* Visual skill bars */}
      <div className="mt-8">
        <div className="font-mono text-xs mb-4" style={{ color: 'var(--comment)' }}>
          {'/* ─── Skill Bars ─── */'}
        </div>
        <div className="grid grid-cols-1 gap-6">
          <SkillGroup title="Languages"  items={languages} color="var(--blue)" />
          <SkillGroup title="Frameworks" items={frameworks} color="var(--green)" />
          <SkillGroup title="Tools"      items={tools} color="var(--purple)" />
          <SkillGroup title="Databases"  items={databases} color="var(--orange)" />
        </div>
      </div>
    </div>
  )
}

const SkillSection: React.FC<{ varName: string; label: string; items: Skill[] }> = ({ varName, items }) => (
  <>
    <CodeLine>
      <Kw c="const " /><Var c={varName} /><Op c=": " /><Typ c="Skill" /><Op c="[]" /><Op c=" = " /><Op c="[" />
    </CodeLine>
    {items.map((s, i) => (
      <CodeLine key={s.name} indent={1}>
        <Op c="{" /> <Prop c="name" /><Op c=": " /><Str c={`"${s.name}"`} /><Op c=", " /><Prop c="level" /><Op c=": " /><Num c={String(s.level)} /> <Op c={i < items.length - 1 ? "}," : "}"} />
      </CodeLine>
    ))}
    <CodeLine><Op c="]" /></CodeLine>
  </>
)

const SkillGroup: React.FC<{ title: string; items: Skill[]; color: string }> = ({ title, items, color }) => (
  <div>
    <h3 className="text-xs font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
      {title}
    </h3>
    <div className="space-y-2">
      {items.map(s => (
        <div key={s.name}>
          <div className="flex justify-between mb-1">
            <span className="text-xs font-mono" style={{ color: 'var(--text)' }}>{s.name}</span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{'●'.repeat(s.level)}{'○'.repeat(5 - s.level)}</span>
          </div>
          <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${(s.level / 5) * 100}%`, background: color }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
)
