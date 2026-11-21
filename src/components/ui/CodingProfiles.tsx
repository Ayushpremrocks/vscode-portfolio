import React from 'react'
import { ArrowRight } from 'lucide-react'
import { useStats, platformTitle, totalSolved, PROFILE_URLS, type CodingStats } from '../../data/stats'
import { PlatformIcon, TitleBadge } from './StatsWidgets'

type Row = {
  platform: 'leetcode' | 'codeforces' | 'codechef' | 'github'
  name: string
  badge?: { title: string; color: string }
  detail: string | null
}

const join = (...parts: (string | null | false | undefined)[]) => parts.filter(Boolean).join(' · ') || null

function rows(stats: CodingStats | null): Row[] {
  const { leetcode: lc, codeforces: cf, codechef: cc, github: gh } = stats ?? {}
  return [
    {
      platform: 'leetcode',
      name: 'LeetCode',
      badge: platformTitle('leetcode', stats),
      detail: join(lc?.rating != null && `${lc.rating} rating`, lc && `${lc.solved.total} solved`),
    },
    {
      platform: 'codeforces',
      name: 'Codeforces',
      badge: platformTitle('codeforces', stats),
      detail: join(cf?.rating != null && `${cf.rating} rating`, cf && `${cf.solved} solved`),
    },
    {
      platform: 'codechef',
      name: 'CodeChef',
      badge: platformTitle('codechef', stats),
      detail: join(cc?.rating != null && `${cc.rating} rating`, cc?.solved != null && `${cc.solved} solved`),
    },
    {
      platform: 'github',
      name: 'GitHub',
      detail: join(gh?.contributions != null && `${gh.contributions} contributions`, gh && `${gh.publicRepos} repos`),
    },
  ]
}

/** Compact live-stats list used on the About page. */
export const CodingProfiles: React.FC<{ onOpenAchievements: () => void }> = ({ onOpenAchievements }) => {
  const { stats, loading } = useStats()
  const solved = totalSolved(stats)

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {rows(stats).map(r => (
          <a
            key={r.platform}
            href={PROFILE_URLS[r.platform]}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-opacity hover:opacity-80"
            style={{ border: '1px solid var(--border)', background: 'var(--bg-sidebar)', textDecoration: 'none' }}
          >
            <PlatformIcon platform={r.platform} size={16} />
            <div className="min-w-0">
              <div className="flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--text)' }}>
                {r.name}
                {r.badge && <TitleBadge {...r.badge} />}
              </div>
              <div className="text-[11px] mt-0.5 font-mono truncate" style={{ color: 'var(--text-muted)' }}>
                {r.detail ?? (loading ? 'loading…' : 'view profile')}
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 mt-3 text-xs">
        <span style={{ color: 'var(--text-muted)' }}>
          {solved > 0 && (
            <>
              <b style={{ color: 'var(--green)' }}>{solved.toLocaleString('en-US')}+</b> problems solved across platforms
            </>
          )}
        </span>
        <button
          type="button"
          onClick={onOpenAchievements}
          className="flex items-center gap-1 hover:underline"
          style={{ color: 'var(--blue)' }}
        >
          Open achievements.ts <ArrowRight size={12} />
        </button>
      </div>
    </div>
  )
}
