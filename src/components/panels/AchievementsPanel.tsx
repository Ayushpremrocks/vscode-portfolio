import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Star, GitFork, Users, Trophy } from 'lucide-react'
import {
  useStats, platformTitle, totalSolved, timeAgo, PROFILE_URLS,
  type CodingStats, type CPPlatform, type RatingPoint,
} from '../../data/stats'
import { portfolio } from '../../data/portfolio'
import { BlankLine, CodeLine, CommentBlock, Kw, Op, Prop, Str, Var } from '../editor/CodeBlock'
import { PlatformIcon, TitleBadge, RatingChart, ContributionGraph, Stat } from '../ui/StatsWidgets'
import { AwardCards } from '../ui/AwardsList'

const Num = ({ c }: { c: number | string | null | undefined }) => (
  <span style={{ color: 'var(--number)' }}>{c ?? 'null'}</span>
)

const fmt = (n: number | null | undefined) => (n == null ? null : n.toLocaleString('en-US'))

export const AchievementsPanel: React.FC = () => {
  const { stats, loading } = useStats()

  return (
    <div>
      <CommentBlock
        lines={[
          '// achievements.ts',
          '// Hackathons, contests and live coding-platform stats',
          loading
            ? '// Fetching live stats…'
            : stats
              ? `// Stats updated ${timeAgo(stats.updatedAt)}`
              : '// Live stats are unavailable right now — showing titles only',
        ]}
      />
      <BlankLine />
      <CodeSummary stats={stats} />
      <BlankLine />

      <div className="mt-6" style={{ maxWidth: '900px', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}>
        <div className="font-mono text-xs mb-4" style={{ color: 'var(--comment)' }}>
          {'/* ─── Hackathons & Contests ─── */'}
        </div>
        <div className="mb-8">
          <AwardCards items={portfolio.achievements} />
        </div>

        <div className="font-mono text-xs mb-4" style={{ color: 'var(--comment)' }}>
          {'/* ─── Competitive Programming ─── */'}
        </div>

        {/* Totals */}
        <div className="flex flex-wrap gap-x-10 gap-y-3 mb-6">
          <Stat label="Problems solved" value={stats ? `${fmt(totalSolved(stats))}+` : null} color="var(--green)" />
          <Stat
            label="Rated contests"
            value={stats ? (stats.leetcode?.contests ?? 0) + (stats.codeforces?.contests ?? 0) + (stats.codechef?.contests ?? 0) : null}
            color="var(--blue)"
          />
          <Stat label="LeetCode" value={stats?.leetcode?.topPercentage != null ? `Top ${stats.leetcode.topPercentage}%` : null} color="var(--yellow)" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4 mb-8">
          <LeetCodeCard stats={stats} />
          <CodeforcesCard stats={stats} />
          <CodeChefCard stats={stats} />
        </div>

        <div className="font-mono text-xs mb-4" style={{ color: 'var(--comment)' }}>
          {'/* ─── Open Source ─── */'}
        </div>
        <GitHubCard stats={stats} />
      </div>
    </div>
  )
}

// ── Code preview (the "file contents") ───────────────────────────────────────

const CodeSummary: React.FC<{ stats: CodingStats | null }> = ({ stats }) => {
  const row = (key: string, fields: [string, string | number | null | undefined][]) => (
    <CodeLine indent={1}>
      <Prop c={key} /><Op c=": { " />
      {fields.map(([k, v], i) => (
        <React.Fragment key={k}>
          <Prop c={k} /><Op c=": " />
          {typeof v === 'string' ? <Str c={`'${v}'`} /> : <Num c={v} />}
          {i < fields.length - 1 && <Op c=", " />}
        </React.Fragment>
      ))}
      <Op c=" }," />
    </CodeLine>
  )

  return (
    <>
      <CodeLine><Kw c="export const " /><Var c="achievements" /><Op c=" = " />{'{'}</CodeLine>
      <CodeLine indent={1}><Prop c="awards" /><Op c=": [" /></CodeLine>
      {portfolio.achievements.map(a => (
        <CodeLine key={a.event} indent={2}>
          <Str c={`'${a.result} — ${a.event}, ${a.organizer}'`} /><Op c="," />
        </CodeLine>
      ))}
      <CodeLine indent={1}><Op c="]," /></CodeLine>
      {row('leetcode', [
        ['title', platformTitle('leetcode', stats).title],
        ['rating', stats?.leetcode?.rating],
        ['solved', stats?.leetcode?.solved.total],
      ])}
      {row('codeforces', [
        ['title', platformTitle('codeforces', stats).title],
        ['rating', stats?.codeforces?.rating],
        ['solved', stats?.codeforces?.solved],
      ])}
      {row('codechef', [
        ['title', platformTitle('codechef', stats).title],
        ['rating', stats?.codechef?.rating],
        ['solved', stats?.codechef?.solved],
      ])}
      {row('github', [
        ['repos', stats?.github?.publicRepos],
        ['contributions', stats?.github?.contributions],
      ])}
      <CodeLine>{'}'}</CodeLine>
    </>
  )
}

// ── Cards ────────────────────────────────────────────────────────────────────

const PLATFORM_NAMES = { leetcode: 'LeetCode', codeforces: 'Codeforces', codechef: 'CodeChef', github: 'GitHub' }

const Card: React.FC<{
  platform: keyof typeof PLATFORM_NAMES
  badge?: { title: string; color: string }
  delay?: number
  children: React.ReactNode
}> = ({ platform, badge, delay = 0, children }) => (
  <motion.section
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25, delay }}
    className="rounded-md p-4 flex flex-col gap-4"
    style={{ background: 'var(--bg-sidebar)', border: '1px solid var(--border)' }}
  >
    <header className="flex items-center gap-2">
      <PlatformIcon platform={platform} size={16} />
      <h3 className="text-sm font-semibold" style={{ color: 'var(--text-strong)' }}>{PLATFORM_NAMES[platform]}</h3>
      {badge && <TitleBadge {...badge} />}
      <a
        href={PROFILE_URLS[platform]}
        target="_blank"
        rel="noopener noreferrer"
        className="ml-auto flex items-center gap-1 text-[11px] hover:underline"
        style={{ color: 'var(--text-muted)' }}
      >
        @{PROFILE_URLS[platform].split('/').filter(Boolean).pop()}
        <ExternalLink size={11} />
      </a>
    </header>
    {children}
  </motion.section>
)

const RatingBlock: React.FC<{ rating: number | null | undefined; max: number | null | undefined; color: string }> = ({
  rating,
  max,
  color,
}) => (
  <div className="flex items-baseline gap-2">
    <span className="text-3xl font-bold font-mono" style={{ color }}>{rating ?? '—'}</span>
    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>rating</span>
    {max != null && (
      <span className="ml-auto flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
        <Trophy size={11} /> max <b style={{ color: 'var(--text)' }}>{max}</b>
      </span>
    )}
  </div>
)

const CPCard: React.FC<{
  platform: CPPlatform
  stats: CodingStats | null
  rating?: number | null
  max?: number | null
  history?: RatingPoint[]
  delay: number
  children: React.ReactNode
}> = ({ platform, stats, rating, max, history = [], delay, children }) => {
  const badge = platformTitle(platform, stats)
  return (
    <Card platform={platform} badge={badge} delay={delay}>
      <RatingBlock rating={rating} max={max} color={badge.color} />
      <div className="grid grid-cols-3 gap-3">{children}</div>
      <RatingChart history={history} color={badge.color} />
    </Card>
  )
}

const LeetCodeCard: React.FC<{ stats: CodingStats | null }> = ({ stats }) => {
  const lc = stats?.leetcode
  return (
    <CPCard platform="leetcode" stats={stats} rating={lc?.rating} max={lc?.maxRating} history={lc?.history} delay={0.04}>
      <Stat label="Solved" value={fmt(lc?.solved.total)} />
      <Stat label="Contests" value={lc?.contests} />
      <Stat label="Top" value={lc?.topPercentage != null ? `${lc.topPercentage}%` : null} />
      {lc && (
        <div className="col-span-3 flex flex-col gap-1.5">
          <DifficultyBar label="Easy" solved={lc.solved.easy} total={lc.totalQuestions.easy} color="#00b8a3" />
          <DifficultyBar label="Medium" solved={lc.solved.medium} total={lc.totalQuestions.medium} color="#ffc01e" />
          <DifficultyBar label="Hard" solved={lc.solved.hard} total={lc.totalQuestions.hard} color="#ef4743" />
        </div>
      )}
    </CPCard>
  )
}

const CodeforcesCard: React.FC<{ stats: CodingStats | null }> = ({ stats }) => {
  const cf = stats?.codeforces
  return (
    <CPCard platform="codeforces" stats={stats} rating={cf?.rating} max={cf?.maxRating} history={cf?.history} delay={0.08}>
      <Stat label="Solved" value={fmt(cf?.solved)} />
      <Stat label="Contests" value={cf?.contests} />
      <Stat label="Max rank" value={cf?.maxRank ? cf.maxRank.replace(/\b\w/g, c => c.toUpperCase()) : null} />
    </CPCard>
  )
}

const CodeChefCard: React.FC<{ stats: CodingStats | null }> = ({ stats }) => {
  const cc = stats?.codechef
  return (
    <CPCard platform="codechef" stats={stats} rating={cc?.rating} max={cc?.maxRating} history={cc?.history} delay={0.12}>
      <Stat label="Solved" value={fmt(cc?.solved)} />
      <Stat label="Contests" value={cc?.contests} />
      <Stat label="Global rank" value={fmt(cc?.globalRank)} />
    </CPCard>
  )
}

const DifficultyBar: React.FC<{ label: string; solved: number; total: number; color: string }> = ({
  label,
  solved,
  total,
  color,
}) => (
  <div className="flex items-center gap-2 text-[11px]">
    <span className="w-12" style={{ color }}>{label}</span>
    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-hover)' }}>
      <div className="h-full rounded-full" style={{ width: `${total ? (solved / total) * 100 : 0}%`, background: color }} />
    </div>
    <span className="w-16 text-right font-mono" style={{ color: 'var(--text-muted)' }}>
      {solved}<span style={{ color: 'var(--text-dim)' }}>/{total}</span>
    </span>
  </div>
)

const GitHubCard: React.FC<{ stats: CodingStats | null }> = ({ stats }) => {
  const gh = stats?.github
  return (
    <Card platform="github" delay={0.16}>
      <div className="flex flex-wrap gap-x-8 gap-y-3">
        <Stat label="Contributions (1y)" value={fmt(gh?.contributions)} color="var(--green)" />
        <Stat label="Repositories" value={<IconValue icon={<GitFork size={12} />} value={gh?.publicRepos} />} />
        <Stat label="Stars" value={<IconValue icon={<Star size={12} />} value={gh?.stars} />} />
        <Stat label="Followers" value={<IconValue icon={<Users size={12} />} value={gh?.followers} />} />
      </div>
      {gh?.calendar && <ContributionGraph start={gh.calendar.start} levels={gh.calendar.levels} />}
      {gh && gh.topLanguages.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {gh.topLanguages.map(l => (
            <span
              key={l.name}
              className="text-[11px] px-2 py-0.5 rounded-full font-mono"
              style={{ background: 'var(--bg-hover)', color: 'var(--text)' }}
            >
              {l.name} <span style={{ color: 'var(--text-dim)' }}>{l.repos}</span>
            </span>
          ))}
        </div>
      )}
    </Card>
  )
}

const IconValue: React.FC<{ icon: React.ReactNode; value: number | null | undefined }> = ({ icon, value }) => (
  <span className="flex items-center gap-1">
    <span style={{ color: 'var(--text-muted)' }}>{icon}</span>
    {value ?? '—'}
  </span>
)
