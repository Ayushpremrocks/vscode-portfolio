import type { HobbyMedia } from '../data/hobbies'
import { HOBBY_MEDIA_MAP, type PanelKey } from '../data/hobbyMediaMap'

// ── Asset bundle ─────────────────────────────────────────────────────────────
// import.meta.glob is required so Vite includes the files in the bundle and
// returns hashed URLs. The result is an object keyed by path → resolved URL.
const mediaGlob = import.meta.glob<string>(
  '/src/assets/hobbies/*.{gif,webp,png,jpg,jpeg,mp4,webm}',
  { eager: true, query: '?url', import: 'default' }
)

// ── Type detection ─────────────────────────────────────────────────────────
const VIDEO_EXTS = new Set(['mp4', 'webm'])
const GIF_EXTS = new Set(['gif'])

function extType(fileName: string): 'gif' | 'video' | 'image' {
  const ext = fileName.slice(fileName.lastIndexOf('.') + 1).toLowerCase()
  if (VIDEO_EXTS.has(ext)) return 'video'
  if (GIF_EXTS.has(ext)) return 'gif'
  return 'image'
}

// ── File-name → URL lookup ────────────────────────────────────────────────
// Keys are the bare file name (e.g. "fcb.gif"), values are the Vite-resolved URL.
const fileNameToUrl: Record<string, string> = {}
for (const [path, url] of Object.entries(mediaGlob)) {
  const fileName = path.split('/').pop()
  if (fileName) fileNameToUrl[fileName] = url
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Returns the HobbyMedia object for a card, or undefined when the map value
 * is null (card keeps its static icon/emoji).
 *
 * @param panel    - the panel key, e.g. 'sportsWatch'
 * @param cardName - the exact `name` string from hobbies.ts
 */
export function getHobbyMedia(
  panel: PanelKey,
  cardName: string
): HobbyMedia | undefined {
  const panelMap = HOBBY_MEDIA_MAP[panel]
  if (!panelMap) return undefined

  const fileName = panelMap[cardName]  // undefined = not in map, null = intentional none
  if (fileName == null) return undefined

  const url = fileNameToUrl[fileName]
  if (!url) return undefined          // file listed in map but missing on disk

  return { src: url, type: extType(fileName), alt: cardName }
}

// ── Dev audit ─────────────────────────────────────────────────────────────────
// Runs once in development. Warns about:
//   1. Map entries whose file does not exist in src/assets/hobbies
//   2. Files in src/assets/hobbies that are not referenced by any map entry

let auditDone = false
export function auditHobbyMedia(_cards: { name: string }[]): void {
  if (!import.meta.env.DEV || auditDone) return
  auditDone = true

  const missingFiles: string[] = []
  const usedFileNames = new Set<string>()

  for (const [panel, entries] of Object.entries(HOBBY_MEDIA_MAP)) {
    for (const [cardName, fileName] of Object.entries(entries)) {
      if (fileName == null) continue           // intentionally no media
      usedFileNames.add(fileName)
      if (!fileNameToUrl[fileName]) {
        missingFiles.push(`[${panel}] "${cardName}" → "${fileName}" (file not found)`)
      }
    }
  }

  const unusedFiles = Object.keys(fileNameToUrl).filter(
    (name) => !usedFileNames.has(name)
  )

  if (missingFiles.length > 0) {
    console.warn(
      `[HobbyMedia] ${missingFiles.length} map entry/entries point to missing file(s):`,
      missingFiles
    )
  }

  if (unusedFiles.length > 0) {
    console.warn(
      `[HobbyMedia] ${unusedFiles.length} file(s) in src/assets/hobbies are not used by any map entry:`,
      unusedFiles
    )
  }
}
