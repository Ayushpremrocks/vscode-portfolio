import React from 'react'
import { Download, ExternalLink, Briefcase, GraduationCap, Code2 } from 'lucide-react'
import { portfolio } from '../../data/portfolio'
import { BlankLine, CodeLine, CommentBlock, Kw, Op, Prop, Str, Var } from '../editor/CodeBlock'

export const ResumePanel: React.FC = () => {
  return (
    <div>
      <CommentBlock lines={[
        '// resume.ts',
        '// Download or view my full resume',
      ]} />
      <BlankLine />

      <CodeLine><Kw c="const " /><Var c="resume" /><Op c=" = " />{'{'}</CodeLine>
      <CodeLine indent={1}><Prop c="url" /><Op c=": " /><Str c={`"${portfolio.resumeUrl}"`} /><Op c="," /></CodeLine>
      <CodeLine indent={1}><Prop c="format" /><Op c=": " /><Str c='"PDF"' /><Op c="," /></CodeLine>
      <CodeLine indent={1}><Prop c="lastUpdated" /><Op c=": " /><Str c='"[Date]"' /></CodeLine>
      <CodeLine>{'}'}</CodeLine>
      <BlankLine />

      {/* Visual section */}
      <div className="mt-8" style={{ maxWidth: '680px' }}>
        <div className="font-mono text-xs mb-6" style={{ color: 'var(--comment)' }}>
          {'/* ─── Resume ─── */'}
        </div>

        {/* Download button */}
        <div className="flex flex-wrap gap-3 mb-8">
          <a
            href={portfolio.resumeUrl}
            download
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded font-semibold text-sm transition-all hover:opacity-90"
            style={{ background: 'var(--blue)', color: '#fff' }}
          >
            <Download size={14} />
            Download Resume
          </a>
          <a
            href={portfolio.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded font-semibold text-sm transition-all hover:opacity-80"
            style={{ background: 'var(--bg-sidebar)', border: '1px solid var(--border)', color: 'var(--text)' }}
          >
            <ExternalLink size={14} />
            View Online
          </a>
        </div>

        {/* Quick summary */}
        <div className="grid grid-cols-1 gap-4">
          <ResumeSection
            icon={<Briefcase size={15} />}
            title="Experience Highlights"
            color="var(--blue)"
          >
            {portfolio.experience.slice(0, 2).map(exp => (
              <div key={exp.id} className="mb-3 last:mb-0">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>{exp.role}</span>
                    <span className="text-xs ml-2" style={{ color: 'var(--blue)' }}>@ {exp.company}</span>
                  </div>
                  <span className="text-[11px] shrink-0" style={{ color: 'var(--text-muted)' }}>{exp.period}</span>
                </div>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{exp.bullets[0]}</p>
              </div>
            ))}
          </ResumeSection>

          <ResumeSection icon={<GraduationCap size={15} />} title="Education" color="var(--green)">
            {portfolio.education.map(edu => (
              <div key={edu.id} className="mb-3 last:mb-0">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>{edu.degree}</span>
                    <span className="text-xs block" style={{ color: 'var(--text-muted)' }}>{edu.school}</span>
                  </div>
                  <span className="text-[11px] shrink-0" style={{ color: 'var(--text-muted)' }}>{edu.period}</span>
                </div>
              </div>
            ))}
          </ResumeSection>

          <ResumeSection icon={<Code2 size={15} />} title="Top Skills" color="var(--purple)">
            <div className="flex flex-wrap gap-2">
              {[
                ...portfolio.skills.languages.slice(0, 4),
                ...portfolio.skills.frameworks.slice(0, 4),
              ].map(s => (
                <span
                  key={s.name}
                  className="text-xs px-2 py-0.5 rounded-full font-mono"
                  style={{ background: 'var(--bg-hover)', color: 'var(--green)' }}
                >
                  {s.name}
                </span>
              ))}
            </div>
          </ResumeSection>
        </div>
      </div>
    </div>
  )
}

const ResumeSection: React.FC<{
  icon: React.ReactNode
  title: string
  color: string
  children: React.ReactNode
}> = ({ icon, title, color, children }) => (
  <div
    className="rounded-md p-4"
    style={{ background: 'var(--bg-sidebar)', border: '1px solid var(--border)' }}
  >
    <h3 className="flex items-center gap-2 text-xs font-semibold mb-3 pb-2" style={{ color, borderBottom: '1px solid var(--border)' }}>
      {icon}
      {title}
    </h3>
    {children}
  </div>
)
