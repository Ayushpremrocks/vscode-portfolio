import { useState, useCallback } from 'react'
import type { TerminalEntry, PanelName } from '../types'
import { portfolio } from '../data/portfolio'

const WELCOME: TerminalEntry[] = [
  {
    id:      'welcome-0',
    type:    'info',
    content: `Welcome to ${portfolio.name}'s Portfolio Terminal`,
  },
  {
    id:      'welcome-1',
    type:    'info',
    content: `Type <span style="color:var(--func)">help</span> to see available commands.`,
  },
  { id: 'welcome-sep', type: 'info', content: '' },
]

type OpenFileFn = (panel: PanelName) => void

function buildOutput(openFile: OpenFileFn): Record<string, () => TerminalEntry[]> {
  const id = () => Math.random().toString(36).slice(2, 8)

  return {
    help: () => [
      { id: id(), type: 'output', content: `<span style="color:var(--func)">Available commands:</span>` },
      { id: id(), type: 'output', content: `  <span style="color:var(--keyword)">about</span>      — Learn about me` },
      { id: id(), type: 'output', content: `  <span style="color:var(--keyword)">whoami</span>     — Who am I?` },
      { id: id(), type: 'output', content: `  <span style="color:var(--keyword)">skills</span>     — View my skills` },
      { id: id(), type: 'output', content: `  <span style="color:var(--keyword)">projects</span>   — Browse my projects` },
      { id: id(), type: 'output', content: `  <span style="color:var(--keyword)">experience</span> — Work experience` },
      { id: id(), type: 'output', content: `  <span style="color:var(--keyword)">education</span>  — Education history` },
      { id: id(), type: 'output', content: `  <span style="color:var(--keyword)">contact</span>    — Get in touch` },
      { id: id(), type: 'output', content: `  <span style="color:var(--keyword)">resume</span>     — View / download resume` },
      { id: id(), type: 'output', content: `  <span style="color:var(--keyword)">ls</span>         — List directory contents` },
      { id: id(), type: 'output', content: `  <span style="color:var(--keyword)">pwd</span>        — Print working directory` },
      { id: id(), type: 'output', content: `  <span style="color:var(--keyword)">date</span>       — Print current date/time` },
      { id: id(), type: 'output', content: `  <span style="color:var(--keyword)">clear</span>      — Clear terminal` },
      { id: id(), type: 'output', content: '' },
    ],

    whoami: () => {
      openFile('about')
      return [
        { id: id(), type: 'success', content: `<span style="color:var(--type)">${portfolio.name}</span>` },
        { id: id(), type: 'output', content: `<span style="color:var(--text-muted)">${portfolio.title}</span>` },
        { id: id(), type: 'output', content: `<span style="color:var(--comment)">📍 ${portfolio.location}</span>` },
        { id: id(), type: 'output', content: '' },
      ]
    },

    about: () => {
      openFile('about')
      return portfolio.bio.map(line =>
        ({ id: id(), type: 'output' as const, content: line || '' })
      ).concat([{ id: id(), type: 'output', content: '' }])
    },

    skills: () => {
      openFile('skills')
      const entries: TerminalEntry[] = [
        { id: id(), type: 'output', content: `<span style="color:var(--func)">Skills:</span>` },
      ]
      const { languages, frameworks, tools, databases } = portfolio.skills
      const fmt = (label: string, arr: { name: string }[]) => [
        { id: id(), type: 'output' as const, content: `  <span style="color:var(--keyword)">${label}:</span> ${arr.map(s => s.name).join(', ')}` },
      ]
      return entries
        .concat(fmt('Languages',  languages))
        .concat(fmt('Frameworks', frameworks))
        .concat(fmt('Tools',      tools))
        .concat(fmt('Databases',  databases))
        .concat([{ id: id(), type: 'output', content: '' }])
    },

    projects: () => {
      openFile('projects')
      const entries: TerminalEntry[] = [
        { id: id(), type: 'output', content: `<span style="color:var(--func)">Projects (${portfolio.projects.length}):</span>` },
      ]
      portfolio.projects.forEach((p, i) => {
        entries.push({ id: id(), type: 'output', content: `  <span style="color:var(--type)">${i + 1}. ${p.name}</span> <span style="color:var(--keyword)">[${p.category}]</span>` })
        entries.push({ id: id(), type: 'output', content: `     <span style="color:var(--text-muted)">${p.description}</span>` })
        entries.push({ id: id(), type: 'output', content: `     <span style="color:var(--comment)">${p.tech.join(' · ')}</span>` })
      })
      entries.push({ id: id(), type: 'output', content: '' })
      return entries
    },

    experience: () => {
      openFile('experience')
      const entries: TerminalEntry[] = [
        { id: id(), type: 'output', content: `<span style="color:var(--func)">Work Experience:</span>` },
      ]
      portfolio.experience.forEach(e => {
        entries.push({ id: id(), type: 'output', content: `  <span style="color:var(--type)">${e.role}</span> @ <span style="color:var(--keyword)">${e.company}</span>` })
        entries.push({ id: id(), type: 'output', content: `  <span style="color:var(--comment)">${e.period} · ${e.location}</span>` })
      })
      entries.push({ id: id(), type: 'output', content: '' })
      return entries
    },

    education: () => {
      openFile('education')
      const entries: TerminalEntry[] = [
        { id: id(), type: 'output', content: `<span style="color:var(--func)">Education:</span>` },
      ]
      portfolio.education.forEach(e => {
        entries.push({ id: id(), type: 'output', content: `  <span style="color:var(--type)">${e.degree} in ${e.field}</span>` })
        entries.push({ id: id(), type: 'output', content: `  <span style="color:var(--keyword)">${e.school}</span> · <span style="color:var(--comment)">${e.period}</span>` })
      })
      entries.push({ id: id(), type: 'output', content: '' })
      return entries
    },

    contact: () => {
      openFile('contact')
      return [
        { id: id(), type: 'output', content: `<span style="color:var(--func)">Contact Information:</span>` },
        { id: id(), type: 'output', content: `  <span style="color:var(--keyword)">Email:</span>    <span style="color:var(--string)">${portfolio.email}</span>` },
        { id: id(), type: 'output', content: `  <span style="color:var(--keyword)">GitHub:</span>   <span style="color:var(--blue)">${portfolio.social.github}</span>` },
        { id: id(), type: 'output', content: `  <span style="color:var(--keyword)">LinkedIn:</span> <span style="color:var(--blue)">${portfolio.social.linkedin}</span>` },
        { id: id(), type: 'output', content: `  <span style="color:var(--keyword)">Twitter:</span>  <span style="color:var(--blue)">${portfolio.social.twitter}</span>` },
        { id: id(), type: 'output', content: '' },
      ]
    },

    resume: () => {
      openFile('resume')
      return [
        { id: id(), type: 'output', content: `<span style="color:var(--func)">Resume:</span>` },
        { id: id(), type: 'output', content: `  <span style="color:var(--blue)">${portfolio.resumeUrl}</span>` },
        { id: id(), type: 'output', content: '' },
      ]
    },

    ls: () => [
      { id: id(), type: 'output', content: `<span style="color:var(--type)">about.ts</span>      <span style="color:var(--type)">projects.ts</span>   <span style="color:var(--type)">skills.ts</span>` },
      { id: id(), type: 'output', content: `<span style="color:var(--type)">experience.ts</span> <span style="color:var(--type)">education.ts</span>  <span style="color:var(--type)">contact.ts</span>    <span style="color:var(--type)">resume.ts</span>` },
      { id: id(), type: 'output', content: '' },
    ],

    pwd: () => [
      { id: id(), type: 'output', content: `/home/visitor/portfolio` },
      { id: id(), type: 'output', content: '' },
    ],

    date: () => [
      { id: id(), type: 'output', content: new Date().toString() },
      { id: id(), type: 'output', content: '' },
    ],

    sudo: () => [
      { id: id(), type: 'error', content: `Permission denied 😄` },
      { id: id(), type: 'output', content: '' },
    ],

    clear: () => [],
  }
}

export function useTerminal(openFile: OpenFileFn) {
  const [entries, setEntries]   = useState<TerminalEntry[]>(WELCOME)
  const [history, setHistory]   = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const [commands] = useState(() => buildOutput(openFile))

  const runCommand = useCallback((raw: string) => {
    const input = raw.trim()
    if (!input) return

    const id = Math.random().toString(36).slice(2, 8)
    const inputEntry: TerminalEntry = {
      id:      `cmd-${id}`,
      type:    'input',
      content: input,
    }

    setHistory(prev => [input, ...prev].slice(0, 100))
    setHistoryIdx(-1)

    const cmd = input.toLowerCase().split(' ')[0]

    if (cmd === 'clear') {
      setEntries([inputEntry, { id: `clear-${id}`, type: 'info', content: '' }])
      return
    }

    const handler = commands[cmd]
    if (handler) {
      setEntries(prev => [...prev, inputEntry, ...handler()])
    } else {
      setEntries(prev => [
        ...prev,
        inputEntry,
        {
          id:      `err-${id}`,
          type:    'error',
          content: `Command not found: <span style="color:var(--red)">${input}</span>. Type <span style="color:var(--func)">help</span> for available commands.`,
        },
        { id: `sep-${id}`, type: 'info', content: '' },
      ])
    }
  }, [commands])

  const navigateHistory = useCallback((dir: 'up' | 'down') => {
    setHistoryIdx(prev => {
      if (dir === 'up')   return Math.min(prev + 1, history.length - 1)
      if (dir === 'down') return Math.max(prev - 1, -1)
      return prev
    })
    return dir === 'up'
      ? history[Math.min(historyIdx + 1, history.length - 1)] ?? ''
      : history[Math.max(historyIdx - 1, -1)] ?? ''
  }, [history, historyIdx])

  return { entries, runCommand, history, historyIdx, navigateHistory }
}
