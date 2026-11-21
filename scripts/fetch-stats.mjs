#!/usr/bin/env node
// =============================================================================
// scripts/fetch-stats.mjs — fetches coding-profile stats and writes public/stats.json
//
// Run locally:   npm run stats
// In CI:         .github/workflows/update-stats.yml runs this once a day.
//
// Each platform is fetched independently. If one fails (site down, layout
// changed, rate limit), its previous values from stats.json are kept, so the
// site never shows blanks.
// =============================================================================
import { readFile, writeFile } from 'node:fs/promises'

// Keep in sync with src/config/socialLinks.ts
const USERNAME = 'ayushpremrocks'
const HANDLES = {
  github: USERNAME,
  leetcode: USERNAME,
  codeforces: USERNAME,
  codechef: USERNAME,
}

const OUT_FILE = new URL('../public/stats.json', import.meta.url)
const UA = { 'User-Agent': 'portfolio-stats-bot' }

async function getJson(url, init = {}) {
  const res = await fetch(url, { ...init, headers: { ...UA, ...init.headers } })
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`)
  return res.json()
}

async function getText(url) {
  const res = await fetch(url, { headers: UA })
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`)
  return res.text()
}

const round = n => (typeof n === 'number' ? Math.round(n) : null)

// ── GitHub ───────────────────────────────────────────────────────────────────
async function fetchGitHub(user) {
  const headers = process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}
  const profile = await getJson(`https://api.github.com/users/${user}`, { headers })
  const repos = await getJson(`https://api.github.com/users/${user}/repos?per_page=100&type=owner`, { headers })

  const own = repos.filter(r => !r.fork)
  const stars = own.reduce((sum, r) => sum + r.stargazers_count, 0)

  // Top languages by number of (non-fork) repos
  const langCount = {}
  for (const r of own) if (r.language) langCount[r.language] = (langCount[r.language] ?? 0) + 1
  const topLanguages = Object.entries(langCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([name, repos]) => ({ name, repos }))

  // Contribution calendar (last 12 months) — public, no token needed
  let contributions = null
  let calendar = null
  try {
    const data = await getJson(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`)
    const days = data.contributions ?? []
    contributions = data.total?.lastYear ?? null
    // Compact form: first date + one digit (activity level 0-4) per day
    if (days.length) calendar = { start: days[0].date, levels: days.map(d => d.level).join('') }
  } catch (e) {
    console.warn('  github contributions:', e.message)
  }

  return {
    username: user,
    publicRepos: profile.public_repos,
    followers: profile.followers,
    stars,
    contributions,
    topLanguages,
    calendar, // { start: 'YYYY-MM-DD', levels: '0120…' } or null
  }
}

// ── LeetCode (public GraphQL endpoint) ───────────────────────────────────────
async function fetchLeetCode(user) {
  const query = `
    query stats($username: String!) {
      matchedUser(username: $username) {
        profile { ranking }
        submitStatsGlobal { acSubmissionNum { difficulty count } }
      }
      allQuestionsCount { difficulty count }
      userContestRanking(username: $username) {
        rating globalRanking topPercentage attendedContestsCount
        badge { name }
      }
      userContestRankingHistory(username: $username) {
        attended rating contest { title startTime }
      }
    }`
  const { data, errors } = await getJson('https://leetcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Referer: 'https://leetcode.com' },
    body: JSON.stringify({ query, variables: { username: user } }),
  })
  if (errors?.length || !data?.matchedUser) throw new Error(errors?.[0]?.message ?? 'user not found')

  const solved = Object.fromEntries(
    data.matchedUser.submitStatsGlobal.acSubmissionNum.map(d => [d.difficulty.toLowerCase(), d.count])
  )
  const totals = Object.fromEntries(data.allQuestionsCount.map(d => [d.difficulty.toLowerCase(), d.count]))
  const contest = data.userContestRanking
  const history = (data.userContestRankingHistory ?? [])
    .filter(h => h.attended)
    .map(h => ({ t: h.contest.startTime, rating: round(h.rating) }))
  const maxRating = history.length ? Math.max(...history.map(h => h.rating)) : round(contest?.rating)

  return {
    username: user,
    solved: { total: solved.all ?? 0, easy: solved.easy ?? 0, medium: solved.medium ?? 0, hard: solved.hard ?? 0 },
    totalQuestions: { easy: totals.easy ?? 0, medium: totals.medium ?? 0, hard: totals.hard ?? 0 },
    ranking: data.matchedUser.profile.ranking,
    rating: round(contest?.rating),
    maxRating,
    globalRanking: contest?.globalRanking ?? null,
    topPercentage: contest?.topPercentage ?? null,
    contests: contest?.attendedContestsCount ?? 0,
    badge: contest?.badge?.name ?? null, // "Knight" / "Guardian" or null
    history,
  }
}

// ── Codeforces (official API) ────────────────────────────────────────────────
async function fetchCodeforces(user) {
  const cf = async method => {
    const data = await getJson(`https://codeforces.com/api/${method}`)
    if (data.status !== 'OK') throw new Error(data.comment ?? 'Codeforces API error')
    return data.result
  }
  const [info] = await cf(`user.info?handles=${user}`)
  const ratingChanges = await cf(`user.rating?handle=${user}`)
  const submissions = await cf(`user.status?handle=${user}`)

  const solvedSet = new Set(
    submissions
      .filter(s => s.verdict === 'OK')
      .map(s => `${s.problem.contestId ?? s.problem.problemsetName}-${s.problem.index}`)
  )

  return {
    username: user,
    rating: info.rating ?? null,
    maxRating: info.maxRating ?? null,
    rank: info.rank ?? null, // e.g. "pupil"
    maxRank: info.maxRank ?? null,
    solved: solvedSet.size,
    contests: ratingChanges.length,
    history: ratingChanges.map(r => ({ t: r.ratingUpdateTimeSeconds, rating: r.newRating })),
  }
}

// ── CodeChef (no API — parsed from the public profile page) ──────────────────
async function fetchCodeChef(user) {
  const html = await getText(`https://www.codechef.com/users/${user}`)
  const num = re => {
    const m = html.match(re)
    return m ? Number(m[1].replace(/,/g, '')) : null
  }

  const rating = num(/class="rating-number"[^>]*>\s*(\d+)/)
  if (rating === null) throw new Error('could not find rating on profile page (layout changed?)')

  // Stars shown next to the username, e.g. "3&#9733;" — fall back to CodeChef's rating bands
  const starsMatch = html.match(/>\s*(\d)\s*(?:★|&#9733;)\s*</)
  const bands = [1400, 1600, 1800, 2000, 2200, 2500]
  const stars = starsMatch ? Number(starsMatch[1]) : 1 + bands.filter(b => rating >= b).length

  const history = []
  const histMatch = html.match(/var\s+all_rating\s*=\s*(\[[\s\S]*?\]);/)
  if (histMatch) {
    try {
      for (const r of JSON.parse(histMatch[1])) {
        const t = Date.parse(r.end_date ?? `${r.getyear}-${r.getmonth}-${r.getday}`) / 1000
        history.push({ t: Math.round(t), rating: Number(r.rating) })
      }
    } catch { /* ignore malformed history */ }
  }

  return {
    username: user,
    rating,
    maxRating: num(/Highest Rating\s*(\d+)/i),
    stars,
    solved: num(/Total Problems Solved:\s*([\d,]+)/i),
    globalRank: num(/<strong>\s*([\d,]+)\s*<\/strong>\s*<\/a>\s*Global Rank/i),
    contests: history.length || num(/No\. of Contests Participated:\s*<b>\s*(\d+)/i) || null,
    history,
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────
const FETCHERS = {
  github: fetchGitHub,
  leetcode: fetchLeetCode,
  codeforces: fetchCodeforces,
  codechef: fetchCodeChef,
}

async function main() {
  let previous = {}
  try {
    previous = JSON.parse(await readFile(OUT_FILE, 'utf8'))
  } catch { /* first run */ }

  const now = new Date().toISOString()
  const result = { updatedAt: now }
  let failures = 0

  for (const [platform, fetcher] of Object.entries(FETCHERS)) {
    try {
      const data = await fetcher(HANDLES[platform])
      result[platform] = { ...data, fetchedAt: now }
      console.log(`✔ ${platform}`)
    } catch (e) {
      failures++
      console.warn(`✖ ${platform}: ${e.message} — keeping previous data`)
      if (previous[platform]) result[platform] = previous[platform]
    }
  }

  await writeFile(OUT_FILE, JSON.stringify(result, null, 2) + '\n')
  console.log(`Wrote public/stats.json (${failures} failed)`)
  // Only fail the job if nothing at all could be fetched
  if (failures === Object.keys(FETCHERS).length) process.exit(1)
}

main()
