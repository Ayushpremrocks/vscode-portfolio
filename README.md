# VS Code Portfolio

Ayush Prem's developer portfolio, built to look and feel like Visual Studio Code.
Live at **https://www.ayushprem.rocks**.

Built with React 19, TypeScript, Vite, Tailwind CSS and Framer Motion.

## Features

- **Explorer sidebar** with portfolio and hobby "files" — resizable, collapsible (`Ctrl+B`)
- **Tabs** — open, switch, close (middle-click works too)
- **Interactive terminal** (`` Ctrl+` ``) — try `help`, `ls`, `open games.ts`, `projects`, `whoami`; supports history (↑/↓), Tab completion and `Ctrl+L`
- **Command palette** (`Ctrl+Shift+P`) — jump to any file or switch theme
- **Three color themes** — Dark Modern, GitHub Dark, Dracula (remembered between visits)
- **Projects** with search and category filters
- **Hobby panels** with animated cards (looping MP4s)
- **Deep links** — every file has its own URL (`/projects`, `/achievements`…); Back/Forward switch tabs
- Collapses the sidebar and terminal on small screens

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run lint     # oxlint
```

## Editing content

| What | Where |
| --- | --- |
| Name, bio, skills, projects, experience, education, resume link | `src/data/portfolio.ts` |
| Social / coding profile URLs | `src/config/socialLinks.ts` |
| Coding-profile usernames (stats) | `scripts/fetch-stats.mjs` |
| Hobby cards (sports, games, movies, anime…) | `src/data/hobbies.ts` |
| Which clip each hobby card shows | `src/data/hobbyMediaMap.ts` |
| Theme colors | `src/styles/themes.ts` (defaults mirrored in `src/index.css`) |

### Resume

Put your PDF in `public/` (e.g. `public/resume.pdf`) and set `resumeUrl: '/resume.pdf'` in
`src/data/portfolio.ts`. While it is empty, the Resume page shows a "Request Resume" email button instead.

### Hobby clips

Clips live in `src/assets/hobbies/` as `.mp4`, named in `lowercase-kebab-case` after the card
(e.g. `clash-of-clans.mp4`). To add one, drop the file in that folder and map the card name to
it in `src/data/hobbyMediaMap.ts`. In development the console warns about map entries pointing to
missing files and files that no card uses.

Prefer MP4 over GIF: it is ~10x smaller (all 39 clips total ~8 MB). To convert a GIF:

```bash
ffmpeg -i in.gif -an -movflags +faststart -c:v libx264 -crf 27 -pix_fmt yuv420p   -vf "scale='trunc(min(480,iw)/2)*2':-2" out.mp4
```

### Live coding stats

`achievements.ts` (plus the About page, Resume page, status bar and the `stats` terminal
command) shows live LeetCode, Codeforces, CodeChef and GitHub stats from `public/stats.json`.

- `scripts/fetch-stats.mjs` fetches everything and writes that file. Run it locally with `npm run stats`.
- `.github/workflows/update-stats.yml` runs it daily at 06:00 IST and commits the result, which
  triggers a Vercel redeploy. Run it manually from the repo's **Actions** tab ("Update coding stats").
- If a platform fails (site down / page layout changed), its previous numbers are kept.
- The username is set at the top of the script; fallback titles (Knight / Pupil / 3★) are in `src/data/stats.ts`.
- If Vercel doesn't redeploy after the bot's commit, add a Vercel Deploy Hook URL as the repo secret
  `VERCEL_DEPLOY_HOOK` — the workflow calls it automatically.

### SEO & analytics

- `index.html` holds the page title/description, link-preview tags (Open Graph / X) and a JSON-LD
  `Person` block. The preview image is `public/og-image.png` (1200×630); `robots.txt` and
  `sitemap.xml` are in `public/`. If the domain changes, update the URLs in those files.
- Vercel Web Analytics is wired in `src/main.tsx`. Enable it in the Vercel dashboard
  (Project → Analytics → Enable). Each opened file is a page view, so the dashboard shows which
  files visitors open.
- `vercel.json` rewrites unknown paths to `index.html` so deep links survive a refresh.

### Contact form

There is no backend: the form opens the visitor's email client with the message pre-filled,
addressed to the email in `portfolio.ts`.

## Project structure

```
src/
  App.tsx                 layout shell, keyboard shortcuts, panel/overlay state
  components/
    layout/               TitleBar, MenuBar, ActivityBar, Sidebar, TabBar, Terminal, StatusBar
    editor/               EditorArea (line gutter + active panel), CodeBlock syntax helpers
    panels/               one component per "file"
    ui/                   CommandPalette, ThemeSwitcher, hobby media helpers
  config/                 social links, panel size limits
  data/                   all content
  hooks/                  useFileSystem (tabs), useTerminal, useTheme, useDragResize
  styles/themes.ts        theme tokens → CSS custom properties
```
