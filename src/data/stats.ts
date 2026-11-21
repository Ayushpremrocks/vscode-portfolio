// =============================================================================
// data/stats.ts — live coding-profile stats.
//
// public/stats.json is refreshed daily by .github/workflows/update-stats.yml
// (scripts/fetch-stats.mjs). This module loads it once and shares it with the
// Achievements panel, About, Resume, status bar and terminal.
// =============================================================================
import { useEffect, useState } from 'react'
import { SOCIAL_LINKS } from '../config/socialLinks'

export interface RatingPoint { t: number; rating: number }

export interface GitHubStats {
  username: string
  publicRepos: number
  followers: number
  stars: number
  contributions: number | null
  topLanguages: { name: string; repos: number }[]
  calendar: { start: string; levels: string } | null
  fetchedAt: string
}

export interface LeetCodeStats {
  username: string
  solved: { total: number; easy: number; medium: number; hard: number }
  totalQuestions: { easy: number; medium: number; hard: number }
  ranking: number | null
  rating: number | null
  maxRating: number | null
  globalRanking: number | null
  topPercentage: number | null
  contests: number
  badge: string | null
  history: RatingPoint[]
  fetchedAt: string
}

export interface CodeforcesStats {
  username: string
  rating: number | null
  maxRating: number | null
  rank: string | null
  maxRank: string | null
  solved: number
  contests: number
  history: RatingPoint[]
  fetchedAt: string
}

export interface CodeChefStats {
  username: string
  rating: number | null
  maxRating: number | null
  stars: number | null
  solved: number | null
  globalRank: number | null
  contests: number | null
  history: RatingPoint[]
  fetchedAt: string
}

export interface CodingStats {
  updatedAt: string
  github?: GitHubStats
  leetcode?: LeetCodeStats
  codeforces?: CodeforcesStats
  codechef?: CodeChefStats
}

export type CPPlatform = 'leetcode' | 'codeforces' | 'codechef'

// ── Titles ───────────────────────────────────────────────────────────────────
// Used when the live data is missing. Update these if your rank changes and
// the stats file can't be refreshed.
const FALLBACK = {
  leetcode: { title: 'Knight', stars: 0 },
  codeforces: { title: 'Pupil', stars: 0 },
  codechef: { title: '3★', stars: 3 },
}

export const PROFILE_URLS = {
  github: SOCIAL_LINKS.GITHUB,
  leetcode: SOCIAL_LINKS.LEETCODE,
  codeforces: SOCIAL_LINKS.CODEFORCES,
  codechef: SOCIAL_LINKS.CODECHEF,
} as const

const capitalize = (s: string) => s.replace(/\b\w/g, c => c.toUpperCase())

/** Codeforces rank colours, lightened slightly to stay readable on dark themes. */
const CF_COLORS: Record<string, string> = {
  newbie: '#a0a0a0',
  pupil: '#4caf50',
  specialist: '#03a89e',
  expert: '#6b8cff',
  'candidate master': '#c35cff',
  master: '#ff9800',
  'international master': '#ff9800',
  grandmaster: '#ff5252',
  'international grandmaster': '#ff5252',
  'legendary grandmaster': '#ff5252',
}

/** CodeChef star colours (1★ … 7★). */
const CC_COLORS = ['#a0a0a0', '#4caf50', '#5b8def', '#9c6fb0', '#ffbf00', '#ff7f00', '#ff4d4d']

export function platformTitle(platform: CPPlatform, stats: CodingStats | null): { title: string; color: string } {
  switch (platform) {
    case 'leetcode': {
      const title = stats?.leetcode?.badge ?? FALLBACK.leetcode.title
      return { title, color: title === 'Guardian' ? '#f0a020' : '#4fb3e8' }
    }
    case 'codeforces': {
      const rank = stats?.codeforces?.rank ?? FALLBACK.codeforces.title.toLowerCase()
      return { title: capitalize(rank), color: CF_COLORS[rank] ?? 'var(--text)' }
    }
    case 'codechef': {
      const stars = stats?.codechef?.stars ?? FALLBACK.codechef.stars
      return { title: `${stars}★`, color: CC_COLORS[stars - 1] ?? 'var(--text)' }
    }
  }
}

/** Problems solved across LeetCode, Codeforces and CodeChef. */
export function totalSolved(stats: CodingStats | null): number {
  if (!stats) return 0
  return (stats.leetcode?.solved.total ?? 0) + (stats.codeforces?.solved ?? 0) + (stats.codechef?.solved ?? 0)
}

/** "3 hours ago" style label. */
export function timeAgo(iso: string): string {
  const s = Math.max(0, (Date.now() - Date.parse(iso)) / 1000)
  if (s < 60) return 'just now'
  const units: [number, string][] = [[86400, 'day'], [3600, 'hour'], [60, 'minute']]
  for (const [secs, name] of units) {
    if (s >= secs) {
      const n = Math.floor(s / secs)
      return `${n} ${name}${n === 1 ? '' : 's'} ago`
    }
  }
  return 'just now'
}

// ── Loading ──────────────────────────────────────────────────────────────────

let cache: CodingStats | null = null
let pending: Promise<CodingStats | null> | null = null

/** Fetches /stats.json once; later calls reuse the result. Resolves null on failure. */
export function loadStats(): Promise<CodingStats | null> {
  if (cache) return Promise.resolve(cache)
  pending ??= fetch('/stats.json')
    .then(res => (res.ok ? (res.json() as Promise<CodingStats>) : null))
    .then(data => (cache = data))
    .catch(() => null)
    .finally(() => { pending = null })
  return pending
}

export function useStats(): { stats: CodingStats | null; loading: boolean } {
  const [stats, setStats] = useState<CodingStats | null>(cache)
  const [loading, setLoading] = useState(!cache)

  useEffect(() => {
    if (cache) return
    let alive = true
    loadStats().then(data => {
      if (!alive) return
      setStats(data)
      setLoading(false)
    })
    return () => { alive = false }
  }, [])

  return { stats, loading }
}
