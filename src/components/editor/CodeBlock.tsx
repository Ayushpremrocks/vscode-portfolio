import React from 'react'

// Syntax-highlighting primitives that match VS Code token colors

export const Kw = ({ c }: { c: string }) => <span style={{ color: 'var(--keyword)' }}>{c}</span>
export const Str = ({ c }: { c: string }) => <span style={{ color: 'var(--string)' }}>{c}</span>
export const Cmt = ({ c }: { c: string }) => <span style={{ color: 'var(--comment)', fontStyle: 'italic', opacity: 0.9 }}>{c}</span>
export const Num = ({ c }: { c: string }) => <span style={{ color: 'var(--number)' }}>{c}</span>
export const Typ = ({ c }: { c: string }) => <span style={{ color: 'var(--type)' }}>{c}</span>
export const Var = ({ c }: { c: string }) => <span style={{ color: 'var(--variable)' }}>{c}</span>
export const Fn = ({ c }: { c: string }) => <span style={{ color: 'var(--func)' }}>{c}</span>
export const Prop = ({ c }: { c: string }) => <span style={{ color: 'var(--property)' }}>{c}</span>
export const Op = ({ c }: { c: string }) => <span style={{ color: 'var(--operator)' }}>{c}</span>
export const Pur = ({ c }: { c: string }) => <span style={{ color: 'var(--purple)' }}>{c}</span>

// A single code line (with optional indent)
export const CodeLine: React.FC<{
  indent?: number
  children: React.ReactNode
}> = ({ indent = 0, children }) => (
  <div
    className="font-mono leading-relaxed whitespace-pre hover:bg-[#2a2a2a] transition-colors cursor-text"
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
