// Types shared across all components

export type ThemeName = 'one-dark-pro' | 'github-dark' | 'dracula'

export interface FileNode {
  id: string
  name: string
  icon: string        // lucide icon name or custom
  type: 'file' | 'folder'
  children?: FileNode[]
  panel?: PanelName   // which panel this file opens
  href?: string       // for external links (social)
  language?: string
  group?: string
}

export type PanelName =
  | 'welcome'
  | 'about'
  | 'projects'
  | 'skills'
  | 'experience'
  | 'education'
  | 'contact'
  | 'resume'

export interface Tab {
  id: string
  fileId: string
  name: string
  panel: PanelName
  language: string
  isDirty: boolean
  isActive: boolean
}

export interface TerminalEntry {
  id: string
  type: 'input' | 'output' | 'error' | 'info' | 'success'
  content: string
  timestamp?: string
}

export interface ThemeTokens {
  name: ThemeName
  label: string
  bg:           string
  bgEditor:     string
  bgSidebar:    string
  bgActbar:     string
  bgTitlebar:   string
  bgTabActive:  string
  bgTabInactive:string
  bgTerminal:   string
  bgStatusbar:  string
  bgHover:      string
  bgSelected:   string
  border:       string
  text:         string
  textMuted:    string
  textDim:      string
  textLine:     string
  keyword:      string
  string:       string
  comment:      string
  number:       string
  type:         string
  variable:     string
  func:         string
  operator:     string
  property:     string
  blue:         string
  green:        string
  orange:       string
  purple:       string
  yellow:       string
  red:          string
  cyan:         string
}
