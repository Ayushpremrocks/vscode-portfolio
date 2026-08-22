import React, { useState } from 'react'
import { Send, Globe, Mail, MapPin } from 'lucide-react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import { portfolio } from '../../data/portfolio'
import { BlankLine, CodeLine, CommentBlock, Kw, Op, Prop, Str, Var } from '../editor/CodeBlock'

export const ContactPanel: React.FC = () => {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', message: '' })
  }

  return (
    <div>
      <CommentBlock lines={[
        '// contact.ts',
        '// Get in touch — always happy to chat!',
      ]} />
      <BlankLine />

      <CodeLine><Kw c="const " /><Var c="contact" /><Op c=" = " />{'{'}</CodeLine>
      <CodeLine indent={1}><Prop c="email" /><Op c=": " /><Str c={`"${portfolio.email}"`} /><Op c="," /></CodeLine>
      <CodeLine indent={1}><Prop c="github" /><Op c=": " /><Str c={`"${portfolio.social.github}"`} /><Op c="," /></CodeLine>
      <CodeLine indent={1}><Prop c="linkedin" /><Op c=": " /><Str c={`"${portfolio.social.linkedin}"`} /><Op c="," /></CodeLine>
      <CodeLine indent={1}><Prop c="twitter" /><Op c=": " /><Str c={`"${portfolio.social.twitter}"`} /><Op c="," /></CodeLine>
      <CodeLine indent={1}><Prop c="location" /><Op c=": " /><Str c={`"${portfolio.location}"`} /></CodeLine>
      <CodeLine>{'}'}</CodeLine>
      <BlankLine />

      {/* Visual section */}
      <div className="mt-8 grid grid-cols-1 gap-6" style={{ maxWidth: '680px' }}>
        <div className="font-mono text-xs mb-2" style={{ color: 'var(--comment)' }}>
          {'/* ─── Contact ─── */'}
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <InfoCard icon={<Mail size={14} />} label="Email" value={portfolio.email} href={`mailto:${portfolio.email}`} />
          <InfoCard icon={<MapPin size={14} />} label="Location" value={portfolio.location} />
        </div>

        {/* Social links */}
        <div className="flex flex-wrap gap-3">
          <SocialButton icon={<FaGithub size={15} />} label="GitHub"   href={portfolio.social.github} />
          <SocialButton icon={<FaLinkedin size={15} />} label="LinkedIn" href={portfolio.social.linkedin} />
          <SocialButton icon={<FaTwitter size={15} />} label="Twitter"  href={portfolio.social.twitter} />
          {portfolio.social.website && (
            <SocialButton icon={<Globe size={15} />} label="Website" href={portfolio.social.website} />
          )}
        </div>

        {/* Contact form */}
        <div
          className="rounded-md p-5"
          style={{ background: 'var(--bg-sidebar)', border: '1px solid var(--border)' }}
        >
          <h3 className="text-sm font-semibold mb-4" style={{ color: 'var(--text)' }}>
            Send a Message
          </h3>
          {sent ? (
            <div className="py-6 text-center" style={{ color: 'var(--green)' }}>
              ✓ Message sent! I'll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
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
                value={form.email}
                onChange={v => setForm(f => ({ ...f, email: v }))}
                placeholder="your@email.com"
                type="email"
              />
              <div>
                <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)' }} htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="What's on your mind?"
                  className="w-full rounded px-3 py-2 text-xs font-mono resize-none outline-none border transition-colors"
                  style={{
                    background:   'var(--bg-hover)',
                    color:        'var(--text)',
                    borderColor:  'var(--border)',
                    caretColor:   'var(--text)',
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = 'var(--blue)')}
                  onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
                  required
                />
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 rounded text-xs font-semibold transition-all hover:opacity-90"
                style={{ background: 'var(--blue)', color: '#fff' }}
              >
                <Send size={12} />
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

const InfoCard: React.FC<{ icon: React.ReactNode; label: string; value: string; href?: string }> = ({ icon, label, value, href }) => {
  const content = (
    <div
      className="flex items-center gap-3 p-3 rounded-md"
      style={{ background: 'var(--bg-sidebar)', border: '1px solid var(--border)' }}
    >
      <span style={{ color: 'var(--blue)' }}>{icon}</span>
      <div>
        <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{label}</div>
        <div className="text-xs" style={{ color: 'var(--text)' }}>{value}</div>
      </div>
    </div>
  )
  return href ? <a href={href} className="hover:opacity-80 transition-opacity block">{content}</a> : <div>{content}</div>
}

const SocialButton: React.FC<{ icon: React.ReactNode; label: string; href: string }> = ({ icon, label, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-4 py-2 rounded text-xs font-medium transition-all hover:opacity-80"
    style={{ background: 'var(--bg-sidebar)', border: '1px solid var(--border)', color: 'var(--text)' }}
    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--blue)')}
    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
  >
    <span style={{ color: 'var(--blue)' }}>{icon}</span>
    {label}
  </a>
)

const FormField: React.FC<{
  id: string; label: string; value: string; placeholder: string
  type?: string; onChange: (v: string) => void
}> = ({ id, label, value, placeholder, type = 'text', onChange }) => (
  <div>
    <label className="block text-xs mb-1.5" style={{ color: 'var(--text-muted)' }} htmlFor={id}>{label}</label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded px-3 py-2 text-xs font-mono outline-none border transition-colors"
      style={{ background: 'var(--bg-hover)', color: 'var(--text)', borderColor: 'var(--border)', caretColor: 'var(--text)' }}
      onFocus={e => (e.currentTarget.style.borderColor = 'var(--blue)')}
      onBlur={e => (e.currentTarget.style.borderColor = 'var(--border)')}
      required
    />
  </div>
)
