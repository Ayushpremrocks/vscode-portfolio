// =============================================================================
// data/hobbies.ts — Centralized hobby data for all hobby panels
// =============================================================================

// ── Sports Watch ─────────────────────────────────────────────────────────────

export interface WatchItem {
  id: string
  name: string
  description: string
  url: string
  imageUrl: string // URL or placeholder flag
  isPlaceholder?: boolean
}

export interface WatchGroup {
  sport: string
  emoji: string
  teams: WatchItem[]
}

export const sportsWatch: WatchGroup[] = [
  {
    sport: 'Football',
    emoji: '⚽',
    teams: [
      {
        id: 'fcb',
        name: 'FC Barcelona',
        description: 'Club — La Liga, Spain',
        url: 'https://www.fcbarcelona.com',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
      },
      {
        id: 'arg',
        name: 'Argentina',
        description: 'National Team — FIFA World Champions',
        url: 'https://www.afa.com.ar',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/24_selecci%C3%B3n_argentina_de_f%C3%BAtbol-association.svg',
      },
    ],
  },
  {
    sport: 'Cricket',
    emoji: '🏏',
    teams: [
      {
        id: 'indm',
        name: 'India Men\'s Cricket',
        description: 'National Team — ICC',
        url: 'https://www.bcci.tv',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/8d/Cricket_India_Crest.svg',
      },
      {
        id: 'indw',
        name: 'India Women\'s Cricket',
        description: 'National Team — ICC',
        url: 'https://www.bcci.tv',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/8/8d/Cricket_India_Crest.svg',
      },
      {
        id: 'csk',
        name: 'Chennai Super Kings',
        description: 'IPL Team — BCCI',
        url: 'https://www.chennaisuperkings.com',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2b/Chennai_Super_Kings_Logo.svg',
      },
    ],
  },
  {
    sport: 'Formula 1',
    emoji: '🏎️',
    teams: [
      {
        id: 'ferrari',
        name: 'Scuderia Ferrari',
        description: 'F1 Constructors — Maranello',
        url: 'https://www.ferrari.com/en-EN/formula1',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d4/Scuderia_Ferrari_Logo.svg',
      },
    ],
  },
]

// ── Sports Play ───────────────────────────────────────────────────────────────

export interface SportItem {
  id: string
  name: string
  emoji: string
}

export interface SportGroup {
  group: 'Outdoor' | 'Indoor'
  emoji: string
  sports: SportItem[]
}

export const sportsPlay: SportGroup[] = [
  {
    group: 'Outdoor',
    emoji: '🌤️',
    sports: [
      { id: 'football-play', name: 'Football', emoji: '⚽' },
      { id: 'cricket-play',  name: 'Cricket',  emoji: '🏏' },
      { id: 'volleyball',    name: 'Volleyball', emoji: '🏐' },
    ],
  },
  {
    group: 'Indoor',
    emoji: '🏠',
    sports: [
      { id: 'badminton',    name: 'Badminton',     emoji: '🏸' },
      { id: 'tabletennis', name: 'Table Tennis',  emoji: '🏓' },
      { id: 'chess-sport', name: 'Chess',         emoji: '♟️' },
    ],
  },
]

// ── Instruments ───────────────────────────────────────────────────────────────

export interface InstrumentItem {
  id: string
  name: string
  emoji: string
  url: string
}

export const instruments: InstrumentItem[] = [
  { id: 'guitar',    name: 'Guitar',    emoji: '🎸', url: 'https://en.wikipedia.org/wiki/Guitar' },
  { id: 'piano',     name: 'Piano',     emoji: '🎹', url: 'https://en.wikipedia.org/wiki/Piano' },
  { id: 'harmonium', name: 'Harmonium', emoji: '🪗', url: 'https://en.wikipedia.org/wiki/Harmonium' },
]

// ── Games ─────────────────────────────────────────────────────────────────────

export interface GameItem {
  id: string
  name: string
  url: string
  imageUrl: string
  isPlaceholder?: boolean
}

export interface GameGroup {
  platform: 'Mobile' | 'PC'
  emoji: string
  games: GameItem[]
}

export const games: GameGroup[] = [
  {
    platform: 'Mobile',
    emoji: '📱',
    games: [
      {
        id: 'pubg-mobile',
        name: 'PUBG Mobile',
        url: 'https://www.pubgmobile.com',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6b/Pubgmobilecover.jpg',
      },
      {
        id: 'coc',
        name: 'Clash of Clans',
        url: 'https://supercell.com/en/games/clashofclans/',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/1/13/Clash_of_Clans_2022_Logo.png',
      },
      {
        id: 'cr',
        name: 'Clash Royale',
        url: 'https://supercell.com/en/games/clashroyale/',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/1/19/Clash_Royale_key_art.jpg',
      },
    ],
  },
  {
    platform: 'PC',
    emoji: '🖥️',
    games: [
      {
        id: 'minecraft',
        name: 'Minecraft',
        url: 'https://www.minecraft.net',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png',
      },
      {
        id: 'fifa',
        name: 'FIFA',
        url: 'https://www.ea.com/games/ea-sports-fc',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2c/EA_SPORTS_FC_24_Standard_Edition_Cover.jpg',
      },
      {
        id: 'chess-game',
        name: 'Chess',
        url: 'https://www.chess.com',
        imageUrl: 'https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/SamCopeland/phpn3HFLE.png',
        isPlaceholder: true, // chess.com image may vary, use emoji card instead
      },
      {
        id: 'cod',
        name: 'Call of Duty',
        url: 'https://www.callofduty.com',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/f/f8/Call_of_Duty_Modern_Warfare_logo.svg',
      },
      {
        id: 'valorant',
        name: 'Valorant',
        url: 'https://playvalorant.com',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/23/Valorant_coverart.jpg',
      },
      {
        id: 'cs',
        name: 'Counter-Strike',
        url: 'https://www.counter-strike.net',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6e/CS2_Cover_Art.jpg',
      },
      {
        id: 'pokemon',
        name: 'Pokémon',
        url: 'https://www.pokemon.com',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg',
      },
      {
        id: 'ac',
        name: "Assassin's Creed",
        url: 'https://www.ubisoft.com/en-us/game/assassins-creed',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/c/c1/Assassin%27s_Creed_III_cover.jpg',
      },
      {
        id: 'nfs',
        name: 'Need for Speed',
        url: 'https://www.ea.com/games/need-for-speed',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/b/b2/NFS_Unbound_cover_art.jpg',
      },
    ],
  },
]

// ── Movies & TV Shows ─────────────────────────────────────────────────────────

export interface MediaItem {
  id: string
  name: string
  year?: string
  language?: string
  url: string
  imageUrl: string
  isPlaceholder?: boolean
}

export interface MovieGroup {
  group: string
  items: MediaItem[]
}

export const moviesTV: MovieGroup[] = [
  {
    group: 'Hindi Movies',
    items: [
      {
        id: '3idiots',
        name: '3 Idiots',
        year: '2009',
        language: 'Hindi',
        url: 'https://www.imdb.com/title/tt1187043/',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BNTkyOGVjMGEtNmQzZi00NzFlLTlhOWQtODYyMDc2ZGJmYzFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
      },
    ],
  },
  {
    group: 'English Movies',
    items: [
      {
        id: 'endgame',
        name: 'Avengers: Endgame',
        year: '2019',
        url: 'https://www.imdb.com/title/tt4154796/',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg',
      },
      {
        id: 'infinitywar',
        name: 'Avengers: Infinity War',
        year: '2018',
        url: 'https://www.imdb.com/title/tt4154756/',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_.jpg',
      },
      {
        id: 'interstellar',
        name: 'Interstellar',
        year: '2014',
        url: 'https://www.imdb.com/title/tt0816692/',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
      },
      {
        id: 'inception',
        name: 'Inception',
        year: '2010',
        url: 'https://www.imdb.com/title/tt1375666/',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
      },
      {
        id: 'fightclub',
        name: 'Fight Club',
        year: '1999',
        url: 'https://www.imdb.com/title/tt0137523/',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg',
      },
      {
        id: 'whiplash',
        name: 'Whiplash',
        year: '2014',
        url: 'https://www.imdb.com/title/tt2582802/',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BOTA5NDZlZGUtMjAxOS00YTRkLTkwYmMtYWQ0NWEwZDZiXzE5MDAyNTk5OQ@@._V1_.jpg',
      },
    ],
  },
  {
    group: 'TV Shows',
    items: [
      {
        id: 'tbbt',
        name: 'The Big Bang Theory',
        year: '2007–2019',
        url: 'https://www.imdb.com/title/tt0898266/',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BY2FmZmY2NTgtYmNhZC00YjE3LWI3ZGMtMDA4M2MyODkwMzdiXkEyXkFqcGc@._V1_.jpg',
      },
      {
        id: 'sherlock',
        name: 'Sherlock',
        year: '2010–2017',
        url: 'https://www.imdb.com/title/tt1475582/',
        imageUrl: 'https://m.media-amazon.com/images/M/MV5BMWY3NTljMjEtYzRiMi00NWM2LTkzNjItZTVmZjE0MTdjMjJhL2ltYWdlXkEyXkFqcGc@._V1_.jpg',
      },
    ],
  },
]

// ── Anime ─────────────────────────────────────────────────────────────────────

export interface AnimeItem {
  id: string
  name: string
  year?: string
  url: string        // MAL or IMDB
  imageUrl: string
  isPlaceholder?: boolean
}

export const anime: AnimeItem[] = [
  {
    id: 'deathnote',
    name: 'Death Note',
    year: '2006',
    url: 'https://myanimelist.net/anime/1535/Death_Note',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/9/9453.jpg',
  },
  {
    id: 'opm',
    name: 'One Punch Man',
    year: '2015',
    url: 'https://myanimelist.net/anime/30276/One_Punch_Man',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/12/76049.jpg',
  },
  {
    id: 'jjk',
    name: 'Jujutsu Kaisen',
    year: '2020',
    url: 'https://myanimelist.net/anime/40748/Jujutsu_Kaisen',
    imageUrl: 'https://cdn.myanimelist.net/images/anime/1171/109222.jpg',
  },
  {
    id: '100meters',
    name: '100 Meters',
    year: '2024',
    url: 'https://www.imdb.com/title/tt32600395/',
    imageUrl: '', // IMDB doesn't allow hotlinking; use placeholder
    isPlaceholder: true,
  },
]
