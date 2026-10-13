import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Globe, Send, CheckCircle } from 'lucide-react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { portfolio } from '../../data/portfolio'

export const ContactPanel: React.FC = () => {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', message: '' })
  }

  const socials = [
    { icon: <FaGithub size={16} />, label: 'GitHub', href: portfolio.social.github, color: '#e8e8e8' },
    { icon: <FaLinkedin size={16} />, label: 'LinkedIn', href: portfolio.social.linkedin, color: '#0a66c2' },
    { icon: <FaTwitter size={16} />, label: 'Twitter', href: portfolio.social.twitter, color: '#1d9bf0' },
    ...(portfolio.social.website ? [{ icon: <Globe size={16} />, label: 'Website', href: portfolio.social.website, color: 'var(--blue)' }] : []),
  ]

  const infoItems = [
    { icon: <Mail size={14} />, label: 'Email', value: portfolio.email, href: `mailto:${portfolio.email}` },
    { icon: <MapPin size={14} />, label: 'Location', value: portfolio.location, href: undefined },
  ]

  return (
    <div
      className="min-h-full px-8 py-10"
      style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", color: 'var(--text)', maxWidth: '700px' }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-10"
      >
        <h1
          className="text-3xl font-bold mb-2 tracking-tight"
          style={{ color: '#e8e8e8', letterSpacing: '-0.02em' }}
        >
          Contact
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Get in touch — always happy to chat!
        </p>
      </motion.div>

      {/* Info cards */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, delay: 0.05 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8"
      >
        {infoItems.map(item => {
          const inner = (
            <div
              className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <span style={{ color: 'var(--blue)', flexShrink: 0 }}>{item.icon}</span>
              <div>
                <div className="text-[10px] uppercase tracking-wider mb-0.5" style={{ color: 'var(--text-dim)' }}>
                  {item.label}
                </div>
                <div className="text-xs font-medium" style={{ color: 'var(--text)' }}>
                  {item.value}
                </div>
              </div>
            </div>
          )
          return item.href ? (
            <a key={item.label} href={item.href} className="block hover:opacity-80 transition-opacity" style={{ textDecoration: 'none' }}>
              {inner}
            </a>
          ) : (
            <div key={item.label}>{inner}</div>
          )
        })}
      </motion.div>

      {/* Social links */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, delay: 0.09 }}
        className="mb-8"
      >
        <h2
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}
        >
          Socials
        </h2>
        <div className="flex flex-wrap gap-2">
          {socials.map(s => (
            <SocialCard key={s.label} {...s} />
          ))}
        </div>
      </motion.div>

      {/* Contact form */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, delay: 0.13 }}
      >
        <h2
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}
        >
          Send a Message
        </h2>
        <div
          className="rounded-xl p-6"
          style={{
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          {sent ? (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <CheckCircle size={32} style={{ color: 'var(--green)' }} />
              <p className="text-sm" style={{ color: 'var(--green)' }}>
                Message sent! I'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  id="contact-name"
                  label="Name"
                  value={form.name}
                  onChange={v => setForm(f => ({ ...f, name: v }))}
                  placeholder="Your name"
                />
                <FormField
                  id="contact-email"
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={v => setForm(f => ({ ...f, email: v }))}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs mb-1.5 font-medium"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="What's on your mind?"
                  className="w-full rounded-lg px-3 py-2.5 text-xs resize-none outline-none border transition-colors"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    color: 'var(--text)',
                    borderColor: 'rgba(255,255,255,0.1)',
                    caretColor: 'var(--blue)',
                    fontFamily: 'inherit',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,127,212,0.6)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                  required
                />
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90 active:scale-95"
                style={{
                  background: 'var(--blue)',
                  color: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <Send size={12} />
                Send Message
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────────────────────────────

const SocialCard: React.FC<{ icon: React.ReactNode; label: string; href: string; color: string }> = ({ icon, label, href, color }) => {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '9px 16px',
        borderRadius: '8px',
        border: `1px solid ${hovered ? color + '55' : 'rgba(255,255,255,0.08)'}`,
        background: hovered ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
        color: hovered ? color : 'var(--text-muted)',
        textDecoration: 'none',
        fontSize: '12px',
        fontWeight: 500,
        transition: 'all 0.15s ease',
        transform: hovered ? 'translateY(-1px)' : 'none',
      }}
    >
      <span style={{ color: hovered ? color : 'var(--text-dim)', transition: 'color 0.15s' }}>
        {icon}
      </span>
      {label}
    </a>
  )
}

const FormField: React.FC<{
  id: string
  label: string
  value: string
  placeholder: string
  type?: string
  onChange: (v: string) => void
}> = ({ id, label, value, placeholder, type = 'text', onChange }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-xs mb-1.5 font-medium"
      style={{ color: 'var(--text-muted)' }}
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg px-3 py-2.5 text-xs outline-none border transition-colors"
      style={{
        background: 'rgba(255,255,255,0.04)',
        color: 'var(--text)',
        borderColor: 'rgba(255,255,255,0.1)',
        caretColor: 'var(--blue)',
        fontFamily: 'inherit',
      }}
      onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,127,212,0.6)')}
      onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
      required
    />
  </div>
)
