// Types shared across all components

export type ThemeName = 'dark-modern' | 'github-dark' | 'dracula'

export type PanelName =
  | 'welcome'
  | 'about'
  | 'projects'
  | 'skills'
  | 'achievements'
  | 'experience'
  | 'education'
  | 'contact'
  | 'resume'
  | 'sports-watch'
  | 'sports-play'
  | 'instruments'
  | 'games'
  | 'movies-tv'
  | 'anime'

export interface Tab {
  id: string
  name: string
  panel: PanelName
  language: string
  isActive: boolean
}

export interface TerminalEntry {
  id: string
  type: 'input' | 'output' | 'error' | 'info' | 'success'
  content: string
}

export interface HobbyMedia {
  src: string
  type: 'gif' | 'video' | 'image'
  alt?: string
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
  bgInput:      string
  border:       string
  text:         string
  textStrong:   string
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
