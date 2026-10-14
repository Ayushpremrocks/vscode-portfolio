import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Star, Search, X, Sparkles } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { portfolio, type Project } from '../../data/portfolio'

const CATEGORY_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  'Spring Boot':        { text: '#4ec9b0', bg: 'rgba(78,201,176,0.12)',  border: 'rgba(78,201,176,0.28)' },
  'Machine Learning':   { text: '#c586c0', bg: 'rgba(197,134,192,0.12)', border: 'rgba(197,134,192,0.28)' },
  'Chatbots':           { text: '#569cd6', bg: 'rgba(86,156,214,0.12)', border: 'rgba(86,156,214,0.28)' },
  'Hardware':           { text: '#ce9178', bg: 'rgba(206,145,120,0.12)', border: 'rgba(206,145,120,0.28)' },
  'Java':               { text: '#e06c75', bg: 'rgba(224,108,117,0.12)', border: 'rgba(224,108,117,0.28)' },
  'Next.js and React':  { text: '#4fc1ff', bg: 'rgba(79,193,255,0.12)',  border: 'rgba(79,193,255,0.28)' },
  'Data Analytics':     { text: '#dcdcaa', bg: 'rgba(220,220,170,0.12)', border: 'rgba(220,220,170,0.28)' },
}

const CATEGORIES = [
  'All',
  'Spring Boot',
  'Machine Learning',
  'Chatbots',
  'Next.js and React',
  'Java',
  'Hardware',
  'Data Analytics',
]

export const ProjectsPanel: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Count projects per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: portfolio.projects.length }
    portfolio.projects.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1
    })
    return counts
  }, [])

  // Filter projects based on category and search query
  const filteredProjects = useMemo(() => {
    return portfolio.projects.filter(p => {
      const matchesCategory =
        selectedCategory === 'All' || p.category === selectedCategory

      const query = searchQuery.trim().toLowerCase()
      if (!query) return matchesCategory

      const matchesSearch =
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.tech.some(t => t.toLowerCase().includes(query))

      return matchesCategory && matchesSearch
    })
  }, [selectedCategory, searchQuery])

  const isDefaultView = selectedCategory === 'All' && !searchQuery.trim()
  const featured = useMemo(() => portfolio.projects.filter(p => p.featured), [])
  const others = useMemo(() => portfolio.projects.filter(p => !p.featured), [])

  return (
    <div
      className="min-h-full px-6 md:px-10 py-10 max-w-6xl mx-auto"
      style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", color: 'var(--text)' }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
          <div>
            <h1
              className="text-3xl font-bold tracking-tight flex items-center gap-2.5"
              style={{ color: '#e8e8e8', letterSpacing: '-0.02em' }}
            >
              Projects
              <span
                className="text-xs px-2.5 py-0.5 rounded-full font-mono font-normal"
                style={{
                  background: 'rgba(0,122,204,0.15)',
                  color: 'var(--blue)',
                  border: '1px solid rgba(0,122,204,0.3)',
                }}
              >
                {portfolio.projects.length}
              </span>
            </h1>
            <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
              Things I've built — full-stack systems, machine learning models, chatbots, and analytics.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Search and Category Filter Section */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05 }}
        className="mb-8 space-y-4"
      >
        {/* Search input */}
        <div className="relative max-w-md">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
            style={{ color: 'var(--text-muted)' }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by name, technology, or category..."
            className="w-full pl-9 pr-9 py-2 text-xs rounded-lg outline-none transition-all"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#e8e8e8',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'rgba(0,122,204,0.6)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded hover:opacity-75 transition-opacity"
              style={{ color: 'var(--text-muted)' }}
              title="Clear search"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat
            const count = categoryCounts[cat] || 0
            const style = CATEGORY_COLORS[cat]

            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all"
                style={{
                  background: isSelected
                    ? 'rgba(0,122,204,0.22)'
                    : 'rgba(255,255,255,0.025)',
                  border: isSelected
                    ? '1px solid rgba(0,122,204,0.65)'
                    : '1px solid rgba(255,255,255,0.07)',
                  color: isSelected ? '#ffffff' : 'var(--text-muted)',
                  boxShadow: isSelected ? '0 0 12px rgba(0,122,204,0.2)' : 'none',
                }}
              >
                {style && (
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: style.text }}
                  />
                )}
                <span>{cat}</span>
                <span
                  className="text-[10px] px-1.5 py-0.2 rounded-full font-mono opacity-80"
                  style={{
                    background: isSelected
                      ? 'rgba(255,255,255,0.15)'
                      : 'rgba(255,255,255,0.06)',
                  }}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </motion.div>

      {/* Status line */}
      <div className="flex items-center justify-between text-xs mb-5" style={{ color: 'var(--text-muted)' }}>
        <span>
          Showing <span style={{ color: '#e8e8e8', fontWeight: 600 }}>{filteredProjects.length}</span> {filteredProjects.length === 1 ? 'project' : 'projects'}
          {selectedCategory !== 'All' && <span> in <span style={{ color: 'var(--blue)' }}>{selectedCategory}</span></span>}
          {searchQuery && <span> matching "<span style={{ color: '#e8e8e8' }}>{searchQuery}</span>"</span>}
        </span>
      </div>

      {/* Main Project Listings */}
      <AnimatePresence mode="wait">
        {filteredProjects.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-center py-16 px-4 rounded-xl"
            style={{
              background: 'rgba(255,255,255,0.015)',
              border: '1px dashed rgba(255,255,255,0.1)',
            }}
          >
            <p className="text-sm mb-2" style={{ color: '#e8e8e8' }}>
              No projects found
            </p>
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
              Try searching for another keyword or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All')
                setSearchQuery('')
              }}
              className="text-xs px-3 py-1.5 rounded"
              style={{
                background: 'rgba(0,122,204,0.2)',
                color: 'var(--blue)',
                border: '1px solid rgba(0,122,204,0.4)',
              }}
            >
              Reset Filters
            </button>
          </motion.div>
        ) : isDefaultView ? (
          <motion.div
            key="default-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-10"
          >
            {/* Featured Section */}
            {featured.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={14} style={{ color: '#dcdcaa' }} />
                  <h2
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}
                  >
                    Featured Highlights
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {featured.map((p, i) => (
                    <ProjectCard key={p.id} project={p} index={i} featuredCard />
                  ))}
                </div>
              </section>
            )}

            {/* Other Projects */}
            {others.length > 0 && (
              <section>
                <h2
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}
                >
                  All Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {others.map((p, i) => (
                    <ProjectCard key={p.id} project={p} index={i} />
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        ) : (
          /* Filtered or Searched view */
          <motion.div
            key={`filtered-${selectedCategory}-${searchQuery}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {filteredProjects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} featuredCard={p.featured} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Project Card ──────────────────────────────────────────────────────────────

interface ProjectCardProps {
  project: Project
  index: number
  featuredCard?: boolean
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, featuredCard = false }) => {
  const [hovered, setHovered] = useState(false)
  const categoryStyle = CATEGORY_COLORS[project.category] || {
    text: 'var(--text-muted)',
    bg: 'rgba(255,255,255,0.06)',
    border: 'rgba(255,255,255,0.12)',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, delay: Math.min(index * 0.04, 0.3) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col justify-between"
      style={{
        borderRadius: '10px',
        border: `1px solid ${
          hovered
            ? 'rgba(0,127,212,0.5)'
            : featuredCard
            ? 'rgba(220,220,170,0.18)'
            : 'rgba(255,255,255,0.08)'
        }`,
        background: hovered
          ? 'rgba(255,255,255,0.035)'
          : featuredCard
          ? 'rgba(255,255,255,0.02)'
          : 'rgba(255,255,255,0.015)',
        padding: '20px',
        transition: 'all 0.18s ease',
        transform: hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.3)' : 'none',
      }}
    >
      <div>
        {/* Top bar: Category badge + Links */}
        <div className="flex items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{
                color: categoryStyle.text,
                background: categoryStyle.bg,
                border: `1px solid ${categoryStyle.border}`,
              }}
            >
              {project.category}
            </span>

            {project.featured && (
              <span
                className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium"
                style={{
                  color: '#dcdcaa',
                  background: 'rgba(220,220,170,0.1)',
                  border: '1px solid rgba(220,220,170,0.25)',
                }}
              >
                <Star size={10} fill="#dcdcaa" />
                Featured
              </span>
            )}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-1.5 shrink-0">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                title="View GitHub Repository"
                className="p-1.5 rounded transition-all hover:text-white"
                style={{
                  color: 'var(--text-muted)',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <FaGithub size={13} />
              </a>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                title="Open Live Application"
                className="flex items-center gap-1 text-[11px] px-2 py-1 rounded transition-all hover:brightness-110 font-medium"
                style={{
                  color: '#ffffff',
                  background: 'rgba(0,122,204,0.35)',
                  border: '1px solid rgba(0,122,204,0.6)',
                }}
              >
                <span>Live</span>
                <ExternalLink size={11} />
              </a>
            )}
          </div>
        </div>

        {/* Project Title */}
        <h3
          className="font-semibold text-base mb-2 tracking-tight"
          style={{ color: '#e8e8e8' }}
        >
          {project.name}
        </h3>

        {/* Description */}
        <p
          className="text-xs leading-relaxed mb-4"
          style={{ color: 'var(--text-muted)' }}
        >
          {project.description}
        </p>
      </div>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-1.5 pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        {project.tech.map(t => (
          <span
            key={t}
            className="text-[10px] px-2 py-0.5 rounded-full font-mono"
            style={{
              background: 'rgba(78,201,176,0.1)',
              color: 'var(--green)',
              border: '1px solid rgba(78,201,176,0.2)',
            }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
