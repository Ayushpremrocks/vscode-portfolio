import { useState, useCallback, useMemo } from 'react'
import type { TerminalEntry, PanelName } from '../types'
import { portfolio } from '../data/portfolio'
import { FILE_META } from './useFileSystem'
import { loadStats, platformTitle, totalSolved, timeAgo } from '../data/stats'

type OpenFileFn = (panel: PanelName) => void
type Line = Omit<TerminalEntry, 'id'>

let nextId = 0
const withIds = (lines: Line[]): TerminalEntry[] =>
  lines.map(l => ({ ...l, id: `t-${nextId++}` }))

/** Escapes text before it is placed into the HTML-rendered terminal output. */
const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const color = (v: string, text: string) => `<span style="color:var(--${v})">${esc(text)}</span>`
const out = (content: string): Line => ({ type: 'output', content })
const blank: Line = { type: 'output', content: '' }

const WELCOME: TerminalEntry[] = withIds([
  { type: 'info', content: `Welcome to ${esc(portfolio.name)}'s Portfolio Terminal` },
  { type: 'info', content: `Type ${color('func', 'help')} to see available commands.` },
  { type: 'info', content: '' },
])

const HELP: [string, string][] = [
  ['about',      'Learn about me'],
  ['whoami',     'Who am I?'],
  ['skills',     'View my skills'],
  ['stats',      'Awards + live coding stats (LeetCode, CF, CodeChef, GitHub)'],
  ['projects',   'Browse my projects'],
  ['experience', 'Work experience'],
  ['education',  'Education history'],
  ['contact',    'Get in touch'],
  ['resume',     'View / download resume'],
  ['ls',         'List directory contents'],
  ['open',       'Open a file, e.g. open games.ts'],
  ['pwd',        'Print working directory'],
  ['date',       'Print current date/time'],
  ['clear',      'Clear terminal'],
]

async function statsCommand(openFile: OpenFileFn): Promise<Line[]> {
  openFile('achievements')
  const s = await loadStats()
  if (!s) return [{ type: 'error', content: 'stats: could not load live stats — try again later' }, blank]

  const row = (label: string, title: string, titleColor: string, rest: string) =>
    out(`  ${color('keyword', label.padEnd(11))} <span style="color:${titleColor}">${esc(title.padEnd(9))}</span> ${color('text-muted', rest)}`)
  const lc = platformTitle('leetcode', s)
  const cf = platformTitle('codeforces', s)
  const cc = platformTitle('codechef', s)

  return [
    out(color('func', 'Hackathons & contests')),
    ...portfolio.achievements.map(a => out(`  ${color('yellow', a.result)} — ${esc(a.event)}, ${color('text-muted', a.organizer)}`)),
    blank,
    out(color('func', 'Coding stats') + ' ' + color('comment', `(updated ${timeAgo(s.updatedAt)})`)),
    row('LeetCode', lc.title, lc.color, `rating ${s.leetcode?.rating ?? '—'} · ${s.leetcode?.solved.total ?? '—'} solved`),
    row('Codeforces', cf.title, cf.color, `rating ${s.codeforces?.rating ?? '—'} (max ${s.codeforces?.maxRating ?? '—'}) · ${s.codeforces?.solved ?? '—'} solved`),
    row('CodeChef', cc.title, cc.color, `rating ${s.codechef?.rating ?? '—'} · ${s.codechef?.solved ?? '—'} solved`),
    out(`  ${color('keyword', 'GitHub'.padEnd(11))} ${color('text-muted', `${s.github?.contributions ?? '—'} contributions · ${s.github?.publicRepos ?? '—'} repos`)}`),
    out(`  ${color('green', `${totalSolved(s)}+ problems solved in total`)}`),
    blank,
  ]
}

type Handler = (args: string[]) => Line[] | Promise<Line[]>

function buildCommands(openFile: OpenFileFn): Record<string, Handler> {
  return {
    help: () => [
      out(color('func', 'Available commands:')),
      ...HELP.map(([cmd, desc]) => out(`  ${color('keyword', cmd.padEnd(10))} — ${esc(desc)}`)),
      blank,
    ],

    whoami: () => {
      openFile('about')
      return [
        { type: 'success', content: color('type', portfolio.name) },
        out(color('text-muted', portfolio.title)),
        out(color('comment', `📍 ${portfolio.location}`)),
        blank,
      ]
    },

    about: () => {
      openFile('about')
      return [...portfolio.bio.map(line => out(esc(line))), blank]
    },

    skills: () => {
      openFile('skills')
      return [
        out(color('func', 'Skills:')),
        ...portfolio.skills.map(cat =>
          out(`  ${color('keyword', `${cat.label}:`)} ${esc(cat.skills.map(s => s.name).join(', '))}`)
        ),
        blank,
      ]
    },

    stats: () => statsCommand(openFile),

    projects: () => {
      openFile('projects')
      return [
        out(color('func', `Projects (${portfolio.projects.length}):`)),
        ...portfolio.projects.flatMap((p, i) => [
          out(`  ${color('type', `${i + 1}. ${p.name}`)} ${color('keyword', `[${p.category}]`)}`),
          out(`     ${color('text-muted', p.description)}`),
          out(`     ${color('comment', p.tech.join(' · '))}`),
        ]),
        blank,
      ]
    },

    experience: () => {
      openFile('experience')
      return [
        out(color('func', 'Work Experience:')),
        ...portfolio.experience.flatMap(e => [
          out(`  ${color('type', e.role)} @ ${color('keyword', e.company)}`),
          out(`  ${color('comment', `${e.period} · ${e.location}`)}`),
        ]),
        blank,
      ]
    },

    education: () => {
      openFile('education')
      return [
        out(color('func', 'Education:')),
        ...portfolio.education.flatMap(e => [
          out(`  ${color('type', e.field ? `${e.degree} in ${e.field}` : e.degree)}`),
          out(`  ${color('keyword', e.school)} · ${color('comment', e.period)}`),
        ]),
        blank,
      ]
    },

    contact: () => {
      openFile('contact')
      return [
        out(color('func', 'Contact Information:')),
        out(`  ${color('keyword', 'Email:   ')} ${color('string', portfolio.email)}`),
        out(`  ${color('keyword', 'GitHub:  ')} ${color('blue', portfolio.social.github)}`),
        out(`  ${color('keyword', 'LinkedIn:')} ${color('blue', portfolio.social.linkedin)}`),
        out(`  ${color('keyword', 'Twitter: ')} ${color('blue', portfolio.social.twitter)}`),
        blank,
      ]
    },

    resume: () => {
      openFile('resume')
      return [
        out(color('func', 'Resume:')),
        out(portfolio.resumeUrl
          ? `  ${color('blue', portfolio.resumeUrl)}`
          : `  ${color('text-muted', `Available on request — ${portfolio.email}`)}`),
        blank,
      ]
    },

    ls: () => {
      const files = (Object.keys(FILE_META) as PanelName[])
        .filter(p => p !== 'welcome')
        .map(p => color('type', FILE_META[p].name))
      return [out(files.join('  ')), blank]
    },

    open: ([file]) => {
      const panel = (Object.keys(FILE_META) as PanelName[]).find(
        p => FILE_META[p].name === file || p === file
      )
      if (!file) return [{ type: 'error', content: `Usage: open ${color('type', '<file>')}` }, blank]
      if (!panel) return [{ type: 'error', content: `open: ${esc(file)}: No such file` }, blank]
      openFile(panel)
      return []
    },

    pwd: () => [out('/home/visitor/portfolio'), blank],

    date: () => [out(esc(new Date().toString())), blank],

    sudo: () => [{ type: 'error', content: 'Permission denied 😄' }, blank],
  }
}

/** Command names offered by Tab-completion (includes hidden easter eggs). */
export const COMMAND_NAMES = [...HELP.map(([cmd]) => cmd), 'sudo']

export function useTerminal(openFile: OpenFileFn) {
  const [entries, setEntries] = useState<TerminalEntry[]>(WELCOME)
  const [history, setHistory] = useState<string[]>([])
  const commands = useMemo(() => buildCommands(openFile), [openFile])

  const runCommand = useCallback((raw: string) => {
    const input = raw.trim()
    if (!input) return

    setHistory(prev => [input, ...prev].slice(0, 100))

    const [cmd, ...args] = input.split(/\s+/)
    const name = cmd.toLowerCase()

    if (name === 'clear') {
      setEntries([])
      return
    }

    const inputEntry: Line = { type: 'input', content: input }
    const handler = commands[name]
    // Run the handler outside the state updater so side effects (opening files) happen once.
    const output = handler
      ? handler(args)
      : [
          {
            type: 'error',
            content: `Command not found: ${color('red', input)}. Type ${color('func', 'help')} for available commands.`,
          } as Line,
          { type: 'info', content: '' } as Line,
        ]

    if (output instanceof Promise) {
      // Async commands (e.g. `stats`): echo the input now, append the output when ready
      setEntries(prev => [...prev, ...withIds([inputEntry])])
      output.then(lines => setEntries(prev => [...prev, ...withIds(lines)]))
    } else {
      setEntries(prev => [...prev, ...withIds([inputEntry, ...output])])
    }
  }, [commands])

  const clear = useCallback(() => setEntries([]), [])

  return { entries, runCommand, history, clear }
}
