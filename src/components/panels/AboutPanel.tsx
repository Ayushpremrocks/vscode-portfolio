import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Mail, Globe, Calendar } from 'lucide-react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { portfolio } from '../../data/portfolio'

export const AboutPanel: React.FC = () => {
  const infoCards = [
    { icon: <MapPin size={14} />, label: 'Location', value: portfolio.location, href: undefined },
    { icon: <Mail size={14} />, label: 'Email', value: portfolio.email, href: `mailto:${portfolio.email}` },
    { icon: <Calendar size={14} />, label: 'Availability', value: 'Open to work', href: undefined },
    { icon: <Globe size={14} />, label: 'Website', value: portfolio.social.website, href: portfolio.social.website },
  ]

  const socials = [
    { icon: <FaGithub size={15} />, label: 'GitHub', href: portfolio.social.github },
    { icon: <FaLinkedin size={15} />, label: 'LinkedIn', href: portfolio.social.linkedin },
    { icon: <FaTwitter size={15} />, label: 'Twitter', href: portfolio.social.twitter },
  ]

  return (
    <div
      className="min-h-full px-8 py-10 max-w-2xl"
      style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", color: 'var(--text)' }}
    >
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-10"
      >
        <h1
          className="text-3xl font-bold mb-1 tracking-tight"
          style={{ color: '#e8e8e8', letterSpacing: '-0.02em' }}
        >
          {portfolio.name}
        </h1>
        <p className="text-base mb-1" style={{ color: 'var(--blue)' }}>
          {portfolio.title}
        </p>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {portfolio.subtitle}
        </p>
      </motion.div>

      {/* Bio */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.06 }}
        className="mb-8"
      >
        <h2
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}
        >
          About
        </h2>
        <div className="space-y-2">
          {portfolio.bio.filter(l => l.trim()).map((line, i) => (
            <p key={i} className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {line}
            </p>
          ))}
        </div>
      </motion.div>

      {/* Info cards */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.1 }}
        className="mb-8"
      >
        <h2
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}
        >
          Quick Info
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {infoCards.map(card => {
            const inner = (
              <div
                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
                style={{
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                }}
              >
                <span style={{ color: 'var(--blue)', flexShrink: 0 }}>{card.icon}</span>
                <div>
                  <div className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-dim)' }}>
                    {card.label}
                  </div>
                  <div className="text-xs font-medium" style={{ color: 'var(--text)' }}>
                    {card.value}
                  </div>
                </div>
              </div>
            )
            return card.href ? (
              <a key={card.label} href={card.href} target="_blank" rel="noopener noreferrer" className="block hover:opacity-80 transition-opacity">
                {inner}
              </a>
            ) : (
              <div key={card.label}>{inner}</div>
            )
          })}
        </div>
      </motion.div>

      {/* Socials */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.14 }}
      >
        <h2
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}
        >
          Connect
        </h2>
        <div className="flex flex-wrap gap-2">
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all hover:opacity-80"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.03)',
                color: 'var(--text)',
                textDecoration: 'none',
              }}
            >
              <span style={{ color: 'var(--blue)' }}>{s.icon}</span>
              {s.label}
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
