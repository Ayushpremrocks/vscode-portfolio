import React from 'react'
import { FileCode2, Globe } from 'lucide-react'
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa'
import type { PanelName } from '../../types'
import { portfolio } from '../../data/portfolio'

interface WelcomePanelProps {
  onOpenFile: (panel: PanelName) => void
}

export const WelcomePanel: React.FC<WelcomePanelProps> = ({ onOpenFile }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80%] pt-16 pb-8 font-sans" style={{ color: 'var(--text)' }}>
      <div className="w-full max-w-3xl px-8">
        <h1 className="text-4xl font-light mb-2">{portfolio.name}</h1>
        <h2 className="text-xl mb-12" style={{ color: 'var(--text-muted)' }}>{portfolio.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Start */}
          <div>
            <h3 className="text-lg mb-4" style={{ color: 'var(--text)' }}>Start</h3>
            <ul className="flex flex-col gap-2">
              <WelcomeLink onClick={() => onOpenFile('experience')} icon={<FileCode2 size={16} />} text="Experience..." />
              <WelcomeLink onClick={() => onOpenFile('projects')} icon={<FileCode2 size={16} />} text="Open Projects..." />
              <WelcomeLink onClick={() => onOpenFile('skills')} icon={<FileCode2 size={16} />} text="View Skills..." />
              <WelcomeLink onClick={() => onOpenFile('resume')} icon={<FileCode2 size={16} />} text="Resume..." />
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg mb-4" style={{ color: 'var(--text)' }}>Connect</h3>
            <ul className="flex flex-col gap-2">
              <WelcomeExternalLink href={portfolio.social.linkedin} icon={<FaLinkedin size={16} />} text="LinkedIn" />
              <WelcomeExternalLink href={portfolio.social.github} icon={<FaGithub size={16} />} text="GitHub" />
              <WelcomeExternalLink href={portfolio.social.twitter} icon={<FaTwitter size={16} />} text="Twitter" />
              <WelcomeExternalLink href={portfolio.social.website} icon={<Globe size={16} />} text="Website" />
            </ul>
          </div>
        </div>

        {/* Recent */}
        <div>
          <h3 className="text-lg mb-4" style={{ color: 'var(--text)' }}>Recent</h3>
          <ul className="flex flex-col gap-2">
            <RecentLink onClick={() => onOpenFile('about')} text="about.ts" path="~/portfolio/about.ts" />
            <RecentLink onClick={() => onOpenFile('experience')} text="experience.ts" path="~/portfolio/experience.ts" />
            <RecentLink onClick={() => onOpenFile('projects')} text="projects.ts" path="~/portfolio/projects.ts" />
            <RecentLink onClick={() => onOpenFile('contact')} text="contact.ts" path="~/portfolio/contact.ts" />
          </ul>
        </div>
      </div>
    </div>
  )
}

const WelcomeLink: React.FC<{ onClick: () => void; icon: React.ReactNode; text: string }> = ({ onClick, icon, text }) => (
  <li>
    <button onClick={onClick} className="flex items-center gap-2 text-sm hover:underline transition-colors" style={{ color: 'var(--blue)' }}>
      <span style={{ color: 'var(--blue)' }}>{icon}</span>
      {text}
    </button>
  </li>
)

const WelcomeExternalLink: React.FC<{ href: string; icon: React.ReactNode; text: string }> = ({ href, icon, text }) => (
  <li>
    <a href={href} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm hover:underline transition-colors" style={{ color: 'var(--blue)' }}>
      <span style={{ color: 'var(--blue)' }}>{icon}</span>
      {text}
    </a>
  </li>
)

const RecentLink: React.FC<{ onClick: () => void; text: string; path: string }> = ({ onClick, text, path }) => (
  <li>
    <button onClick={onClick} className="flex items-baseline gap-3 text-sm hover:underline transition-colors w-full text-left">
      <span style={{ color: 'var(--blue)' }}>{text}</span>
      <span className="text-xs truncate opacity-70" style={{ color: 'var(--text-dim)' }}>{path}</span>
    </button>
  </li>
)
