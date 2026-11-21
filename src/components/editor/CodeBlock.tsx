import React from 'react'

// Syntax-highlighting primitives that match VS Code token colors

export const Kw = ({ c }: { c: string }) => <span style={{ color: 'var(--keyword)' }}>{c}</span>
export const Str = ({ c }: { c: string }) => <span style={{ color: 'var(--string)' }}>{c}</span>
export const Cmt = ({ c }: { c: string }) => <span style={{ color: 'var(--comment)', fontStyle: 'italic', opacity: 0.9 }}>{c}</span>
export const Var = ({ c }: { c: string }) => <span style={{ color: 'var(--variable)' }}>{c}</span>
export const Prop = ({ c }: { c: string }) => <span style={{ color: 'var(--property)' }}>{c}</span>
export const Op = ({ c }: { c: string }) => <span style={{ color: 'var(--operator)' }}>{c}</span>

// A single code line (with optional indent)
export const CodeLine: React.FC<{
  indent?: number
  children: React.ReactNode
}> = ({ indent = 0, children }) => (
  <div
    className="font-mono leading-relaxed whitespace-pre-wrap break-words hover:bg-[var(--bg-hover)] transition-colors cursor-text"
    style={{
      fontSize: '13px',
      color: 'var(--text)',
      paddingLeft: `${indent * 16}px`,
    }}
  >
    {children}
  </div>
)

// Empty line spacer
export const BlankLine = () => <div className="h-5" />

// Comment block
export const CommentBlock: React.FC<{ lines: string[] }> = ({ lines }) => (
  <>
    {lines.map((l, i) => (
      <CodeLine key={i}>
        <Cmt c={l} />
      </CodeLine>
    ))}
  </>
)
