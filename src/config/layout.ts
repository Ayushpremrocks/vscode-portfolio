// Size limits for the resizable sidebar and terminal panels (pixels).

export const MIN_SIDEBAR_WIDTH = 170
export const DEFAULT_SIDEBAR_WIDTH = 240
export const maxSidebarWidth = () => Math.floor(window.innerWidth * 0.5)

export const MIN_TERMINAL_HEIGHT = 100
export const DEFAULT_TERMINAL_HEIGHT = 220
export const maxTerminalHeight = () => Math.floor(window.innerHeight * 0.7)
