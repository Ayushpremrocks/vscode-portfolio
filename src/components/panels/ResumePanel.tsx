import React from 'react'
import { Download, ExternalLink, Briefcase, GraduationCap, Code2, Mail, Trophy, Award } from 'lucide-react'
import { portfolio } from '../../data/portfolio'
import { useStats, platformTitle, totalSolved, type CodingStats, type CPPlatform } from '../../data/stats'
import { BlankLine, CodeLine, CommentBlock, Kw, Op, Prop, Str, Var } from '../editor/CodeBlock'
import { PlatformIcon, TitleBadge } from '../ui/StatsWidgets'
import { AwardRows } from '../ui/AwardsList'

const TOP_SKILL_COUNT = 8

export const ResumePanel: React.FC = () => {
  const { resumeUrl } = portfolio
  const topSkills = portfolio.skills.flatMap(c => c.skills).slice(0, TOP_SKILL_COUNT)
  const { stats } = useStats()

  return (
    <div>
      <CommentBlock lines={['// resume.ts', resumeUrl ? '// Download or view my full resume' : '// Full resume available on request']} />
      <BlankLine />

      <CodeLine><Kw c="const " /><Var c="resume" /><Op c=" = " />{'{'}</CodeLine>
      {resumeUrl ? (
        <>
          <CodeLine indent={1}><Prop c="url" /><Op c=": " /><Str c={`"${resumeUrl}"`} /><Op c="," /></CodeLine>
          <CodeLine indent={1}><Prop c="format" /><Op c=": " /><Str c='"PDF"' /><Op c="," /></CodeLine>
        </>
      ) : (
        <CodeLine indent={1}><Prop c="requestVia" /><Op c=": " /><Str c={`"${portfolio.email}"`} /><Op c="," /></CodeLine>
      )}
      <CodeLine>{'}'}</CodeLine>
      <BlankLine />

      {/* Visual section */}
      <div className="mt-8" style={{ maxWidth: '680px' }}>
        <div className="font-mono text-xs mb-6" style={{ color: 'var(--comment)' }}>
          {'/* ─── Resume ─── */'}
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {resumeUrl ? (
            <>
              <a
                href={resumeUrl}
                download
                className="flex items-center gap-2 px-5 py-2.5 rounded font-semibold text-sm transition-all hover:opacity-90"
                style={{ background: 'var(--blue)', color: '#fff' }}
              >
                <Download size={14} />
                Download Resume
              </a>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded font-semibold text-sm transition-all hover:opacity-80"
                style={{ background: 'var(--bg-sidebar)', border: '1px solid var(--border)', color: 'var(--text)' }}
              >
                <ExternalLink size={14} />
                View Online
              </a>
            </>
          ) : (
            <a
              href={`mailto:${portfolio.email}?subject=${encodeURIComponent('Resume request')}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded font-semibold text-sm transition-all hover:opacity-90"
              style={{ background: 'var(--blue)', color: '#fff' }}
            >
              <Mail size={14} />
              Request Resume
            </a>
          )}
        </div>

        {/* Quick summary */}
        <div className="grid grid-cols-1 gap-4">
          <ResumeSection icon={<Briefcase size={15} />} title="Experience Highlights" color="var(--blue)">
            {portfolio.experience.slice(0, 2).map(exp => (
              <div key={exp.id} className="mb-3 last:mb-0">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>{exp.role}</span>
                    <span className="text-xs ml-2" style={{ color: 'var(--blue)' }}>@ {exp.company}</span>
                  </div>
                  <span className="text-[11px] shrink-0" style={{ color: 'var(--text-muted)' }}>{exp.period}</span>
                </div>
                {exp.bullets[0] && (
                  <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{exp.bullets[0]}</p>
                )}
              </div>
            ))}
          </ResumeSection>

          <ResumeSection icon={<GraduationCap size={15} />} title="Education" color="var(--green)">
            {portfolio.education.map(edu => (
              <div key={edu.id} className="mb-3 last:mb-0">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-xs font-semibold" style={{ color: 'var(--text)' }}>
                      {edu.field ? `${edu.degree} — ${edu.field}` : edu.degree}
                    </span>
                    <span className="text-xs block" style={{ color: 'var(--text-muted)' }}>{edu.school}</span>
                  </div>
                  <span className="text-[11px] shrink-0" style={{ color: 'var(--text-muted)' }}>{edu.period}</span>
                </div>
              </div>
            ))}
          </ResumeSection>

          <ResumeSection icon={<Award size={15} />} title="Hackathons & Awards" color="var(--orange)">
            <AwardRows items={portfolio.achievements} />
          </ResumeSection>

          <ResumeSection icon={<Trophy size={15} />} title="Competitive Programming" color="var(--yellow)">
            <CPRow platform="leetcode" name="LeetCode" stats={stats} />
            <CPRow platform="codeforces" name="Codeforces" stats={stats} />
            <CPRow platform="codechef" name="CodeChef" stats={stats} />
            {stats && (
              <p className="text-xs mt-3 pt-2" style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border)' }}>
                <b style={{ color: 'var(--green)' }}>{totalSolved(stats).toLocaleString('en-US')}+</b> problems solved
                {stats.github?.contributions != null && (
                  <> · <b style={{ color: 'var(--text)' }}>{stats.github.contributions}</b> GitHub contributions in the last year</>
                )}
              </p>
            )}
          </ResumeSection>

          <ResumeSection icon={<Code2 size={15} />} title="Top Skills" color="var(--purple)">
            <div className="flex flex-wrap gap-2">
              {topSkills.map(s => (
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

/** One line per platform: title badge plus live rating / peak / solved. */
const CPRow: React.FC<{ platform: CPPlatform; name: string; stats: CodingStats | null }> = ({ platform, name, stats }) => {
  const badge = platformTitle(platform, stats)
  const data = stats?.[platform]
  const solved = platform === 'leetcode' ? stats?.leetcode?.solved.total : stats?.[platform]?.solved
  const parts = [
    data?.rating != null && `Rating ${data.rating}`,
    data?.maxRating != null && data.maxRating !== data.rating && `max ${data.maxRating}`,
    solved != null && `${solved} solved`,
    platform === 'leetcode' && stats?.leetcode?.topPercentage != null && `top ${stats.leetcode.topPercentage}%`,
  ].filter(Boolean)

  return (
    <div className="flex flex-wrap items-center gap-2 mb-2 last:mb-0 text-xs">
      <PlatformIcon platform={platform} size={13} />
      <span className="font-semibold w-20" style={{ color: 'var(--text)' }}>{name}</span>
      <TitleBadge {...badge} />
      {parts.length > 0 && <span style={{ color: 'var(--text-muted)' }}>{parts.join(' · ')}</span>}
    </div>
  )
}

const ResumeSection: React.FC<{
  icon: React.ReactNode
  title: string
  color: string
  children: React.ReactNode
}> = ({ icon, title, color, children }) => (
  <div className="rounded-md p-4" style={{ background: 'var(--bg-sidebar)', border: '1px solid var(--border)' }}>
    <h3 className="flex items-center gap-2 text-xs font-semibold mb-3 pb-2" style={{ color, borderBottom: '1px solid var(--border)' }}>
      {icon}
      {title}
    </h3>
    {children}
  </div>
)
