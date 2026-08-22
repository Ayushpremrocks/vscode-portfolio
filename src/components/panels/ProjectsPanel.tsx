import React from 'react'
import { ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { portfolio } from '../../data/portfolio'
import { BlankLine, CodeLine, CommentBlock, Kw, Op, Prop, Str, Typ, Var } from '../editor/CodeBlock'

export const ProjectsPanel: React.FC = () => {
  return (
    <div>
      <CommentBlock lines={[
        '// projects.ts',
        `// ${portfolio.projects.length} projects — featured and personal`,
      ]} />
      <BlankLine />

      <CodeLine><Kw c="import" /> <Typ c="type" /> {'{ '}<Typ c="Project" />{'}'} <Kw c="from" /> <Str c='"@/types"' /></CodeLine>
      <BlankLine />

      <CodeLine>
        <Kw c="const " /><Var c="projects" /><Op c=": " /><Typ c="Project" /><Op c="[]" /><Op c=" = " /><Op c="[" />
      </CodeLine>

      {portfolio.projects.map((p, i) => (
        <React.Fragment key={p.id}>
          <CodeLine indent={1}><Op c="{" /></CodeLine>
          <CodeLine indent={2}><Prop c="id" /><Op c=": " /><Str c={`"${p.id}"`} /><Op c="," /></CodeLine>
          <CodeLine indent={2}><Prop c="name" /><Op c=": " /><Str c={`"${p.name}"`} /><Op c="," /></CodeLine>
          <CodeLine indent={2}><Prop c="description" /><Op c=": " /><Str c={`"${p.description}"`} /><Op c="," /></CodeLine>
          <CodeLine indent={2}><Prop c="tech" /><Op c=": " /><Op c="[" />{p.tech.map((t, ti) => <React.Fragment key={t}><Str c={`"${t}"`} />{ti < p.tech.length - 1 && <Op c=", " />}</React.Fragment>)}<Op c="]," /></CodeLine>
          <CodeLine indent={2}><Prop c="url" /><Op c=": " /><Str c={`"${p.url}"`} /><Op c="," /></CodeLine>
          <CodeLine indent={2}><Prop c="repo" /><Op c=": " /><Str c={`"${p.repo}"`} /><Op c="," /></CodeLine>
          <CodeLine indent={2}><Prop c="featured" /><Op c=": " /><Kw c={p.featured ? 'true' : 'false'} /></CodeLine>
          <CodeLine indent={1}><Op c={i < portfolio.projects.length - 1 ? "}," : "}"} /></CodeLine>
        </React.Fragment>
      ))}

      <CodeLine><Op c="]" /></CodeLine>
      <BlankLine />
      <CodeLine><Kw c="export default " /><Var c="projects" /></CodeLine>
      <BlankLine />

      {/* Visual project cards */}
      <div className="mt-8 space-y-4">
        <div className="font-mono text-xs mb-4" style={{ color: 'var(--comment)' }}>
          {'/* ─── Project Cards ─── */'}
        </div>
        {portfolio.projects.map(p => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </div>
  )
}

const ProjectCard: React.FC<{ project: typeof portfolio.projects[0] }> = ({ project }) => (
  <div
    className="rounded-md p-4 transition-all duration-200 group"
    style={{
      background:   'var(--bg-sidebar)',
      border:       '1px solid var(--border)',
    }}
    onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--blue)')}
    onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
  >
    <div className="flex items-start justify-between gap-3">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {project.featured && (
            <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold" style={{ background: 'var(--bg-selected)', color: 'var(--blue)' }}>
              Featured
            </span>
          )}
          <h3 className="font-semibold text-sm truncate" style={{ color: 'var(--text)' }}>
            {project.name}
          </h3>
        </div>
        <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>
          {project.longDescription}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.tech.map(t => (
            <span
              key={t}
              className="text-[10px] px-2 py-0.5 rounded-full font-mono"
              style={{ background: 'var(--bg-hover)', color: 'var(--green)' }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-2 shrink-0">
        {project.repo && (
          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded transition-colors hover:opacity-80" style={{ color: 'var(--text-muted)' }}>
            <FaGithub size={16} />
          </a>
        )}
        {project.url && (
          <a href={project.url} target="_blank" rel="noopener noreferrer" title="Live demo" className="p-1.5 rounded transition-colors hover:opacity-80" style={{ color: 'var(--text-muted)' }}>
            <ExternalLink size={15} />
          </a>
        )}
      </div>
    </div>
  </div>
)
