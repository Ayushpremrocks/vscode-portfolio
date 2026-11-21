import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Globe, Briefcase, ArrowRight } from 'lucide-react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { portfolio } from '../../data/portfolio'
import type { PanelName } from '../../types'
import { BlankLine, CodeLine, CommentBlock, Kw, Op, Prop, Str, Var } from '../editor/CodeBlock'
import { CodingProfiles } from '../ui/CodingProfiles'
import { AwardRows } from '../ui/AwardsList'

const HIGHLIGHT_COUNT = 3

export const AboutPanel: React.FC<{ onOpenFile: (panel: PanelName) => void }> = ({ onOpenFile }) => {
  const infoCards = [
    { icon: <MapPin size={14} />, label: 'Location', value: portfolio.location, href: undefined },
    { icon: <Briefcase size={14} />, label: 'Availability', value: portfolio.availability, href: undefined },
    { icon: <Mail size={14} />, label: 'Email', value: portfolio.email, href: `mailto:${portfolio.email}` },
    { icon: <Globe size={14} />, label: 'Website', value: portfolio.social.website.replace(/^https?:\/\//, ''), href: portfolio.social.website },
  ]

  const socials = [
    { icon: <FaGithub size={15} />, label: 'GitHub', href: portfolio.social.github },
    { icon: <FaLinkedin size={15} />, label: 'LinkedIn', href: portfolio.social.linkedin },
    { icon: <FaTwitter size={15} />, label: 'Twitter', href: portfolio.social.twitter },
  ]

  return (
    <div>
      {/* File header — keeps the editor feel */}
      <CommentBlock lines={['// about.ts', '// Who I am, what I build, and how to reach me']} />
      <BlankLine />
      <CodeLine><Kw c="export const " /><Var c="me" /><Op c=" = " />{'{'}</CodeLine>
      <CodeLine indent={1}><Prop c="name" /><Op c=": " /><Str c={`'${portfolio.name}'`} /><Op c="," /></CodeLine>
      <CodeLine indent={1}><Prop c="role" /><Op c=": " /><Str c={`'${portfolio.title}'`} /><Op c="," /></CodeLine>
      <CodeLine indent={1}><Prop c="location" /><Op c=": " /><Str c={`'${portfolio.location}'`} /><Op c="," /></CodeLine>
      <CodeLine indent={1}>
        <Prop c="focus" /><Op c=": [" />
        {portfolio.focus.map((f, i) => (
          <React.Fragment key={f}>
            <Str c={`'${f}'`} />{i < portfolio.focus.length - 1 && <Op c=", " />}
          </React.Fragment>
        ))}
        <Op c="]," />
      </CodeLine>
      <CodeLine indent={1}><Prop c="openToWork" /><Op c=": " /><Kw c="true" /><Op c="," /></CodeLine>
      <CodeLine>{'}'}</CodeLine>
      <BlankLine />

      <div className="mt-4 max-w-2xl" style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", color: 'var(--text)' }}>
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="mb-8"
        >
          <h1
            className="text-3xl font-bold mb-1 tracking-tight"
            style={{ color: 'var(--text-strong)', letterSpacing: '-0.02em' }}
          >
            {portfolio.name}
          </h1>
          <p className="text-base mb-1" style={{ color: 'var(--blue)' }}>{portfolio.title}</p>
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>{portfolio.subtitle}</p>
          <div className="flex flex-wrap gap-2">
            {portfolio.focus.map(f => (
              <span
                key={f}
                className="text-[11px] px-2.5 py-0.5 rounded-full font-mono"
                style={{
                  color: 'var(--blue)',
                  background: 'color-mix(in srgb, var(--blue) 12%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--blue) 30%, transparent)',
                }}
              >
                {f}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Bio */}
        <Section title="About" delay={0.06}>
          <div className="space-y-3">
            {portfolio.bio.map((paragraph, i) => (
              <p key={i} className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {paragraph}
              </p>
            ))}
          </div>
        </Section>

        {/* Highlights */}
        <Section title="Highlights" delay={0.09}>
          <AwardRows items={portfolio.achievements.slice(0, HIGHLIGHT_COUNT)} />
          <button
            type="button"
            onClick={() => onOpenFile('achievements')}
            className="flex items-center gap-1 mt-3 text-xs hover:underline"
            style={{ color: 'var(--blue)' }}
          >
            All achievements <ArrowRight size={12} />
          </button>
        </Section>

        {/* Coding profiles (live stats) */}
        <Section title="Coding Profiles" delay={0.12}>
          <CodingProfiles onOpenAchievements={() => onOpenFile('achievements')} />
        </Section>

        {/* Info cards */}
        <Section title="Quick Info" delay={0.15}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {infoCards.map(card => {
              const inner = (
                <div
                  className="flex items-center gap-3 px-4 py-3 rounded-lg"
                  style={{ border: '1px solid var(--border)', background: 'var(--bg-sidebar)' }}
                >
                  <span style={{ color: 'var(--blue)', flexShrink: 0 }}>{card.icon}</span>
                  <div className="min-w-0">
                    <div className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-dim)' }}>
                      {card.label}
                    </div>
                    <div className="text-xs font-medium truncate" style={{ color: 'var(--text)' }}>{card.value}</div>
                  </div>
                </div>
              )
              const isExternal = card.href?.startsWith('http')
              return card.href ? (
                <a
                  key={card.label}
                  href={card.href}
                  {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="block hover:opacity-80 transition-opacity"
                >
                  {inner}
                </a>
              ) : (
                <div key={card.label}>{inner}</div>
              )
            })}
          </div>
        </Section>

        {/* Socials */}
        <Section title="Connect" delay={0.18} last>
          <div className="flex flex-wrap gap-2">
            {socials.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-opacity hover:opacity-80"
                style={{
                  border: '1px solid var(--border)',
                  background: 'var(--bg-sidebar)',
                  color: 'var(--text)',
                  textDecoration: 'none',
                }}
              >
                <span style={{ color: 'var(--blue)' }}>{s.icon}</span>
                {s.label}
              </a>
            ))}
          </div>
        </Section>
      </div>
    </div>
  )
}

const Section: React.FC<{ title: string; delay: number; last?: boolean; children: React.ReactNode }> = ({
  title,
  delay,
  last,
  children,
}) => (
  <motion.section
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25, delay }}
    className={last ? '' : 'mb-8'}
  >
    <h2
      className="text-xs font-semibold uppercase tracking-widest mb-3"
      style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}
    >
      {title}
    </h2>
    {children}
  </motion.section>
)
