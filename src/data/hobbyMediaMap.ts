// =============================================================================
// src/data/hobbyMediaMap.ts — Manual media assignment for every hobby card
// =============================================================================
//
// HOW TO USE:
//   • Each key is the EXACT card name as it appears in hobbies.ts.
//   • Each value is the EXACT filename (with extension) inside src/assets/hobbies/.
//   • Set the value to null to keep that card's default static icon/emoji.
//
// FILE NAMING CONVENTION:
//   lowercase-kebab-case named after the card, e.g. 'Clash of Clans' → clash-of-clans.mp4 (prefer MP4 over GIF: ~10x smaller)
//
// HOW TO ADD A NEW CARD:
//   1. Drop the file into src/assets/hobbies/.
//   2. Add a new entry here: 'Card Name': 'card-name.mp4'
//   3. The card name must match the `name` field in hobbies.ts exactly.
//
// =============================================================================

export type PanelKey =
  | 'sportsWatch'
  | 'sportsPlay'
  | 'instruments'
  | 'games'
  | 'moviesTV'
  | 'anime'

export type HobbyMediaMap = {
  [panel in PanelKey]: Record<string, string | null>
}

export const HOBBY_MEDIA_MAP: HobbyMediaMap = {
  // ── Sports Watch ────────────────────────────────────────────────────────────
  sportsWatch: {
    'FC Barcelona': 'fc-barcelona.mp4',
    'Argentina': 'argentina.mp4',
    "India Men's Cricket": 'india-cricket.mp4',
    "India Women's Cricket": 'india-women-cricket.mp4',
    'Chennai Super Kings': 'chennai-super-kings.mp4',
    'Scuderia Ferrari': 'scuderia-ferrari.mp4',
  },

  // ── Sports Play ─────────────────────────────────────────────────────────────
  sportsPlay: {
    'Football': 'football.mp4',
    'Cricket': 'cricket.mp4',
    'Volleyball': 'volleyball.mp4',
    'Badminton': 'badminton.mp4',
    'Table Tennis': 'table-tennis.mp4',
    'Chess': 'chess.mp4',
  },

  // ── Instruments ─────────────────────────────────────────────────────────────
  instruments: {
    'Guitar': 'guitar.mp4',
    'Piano': 'piano.mp4',
    'Harmonium': 'harmonium.mp4',
  },

  // ── Games ───────────────────────────────────────────────────────────────────
  games: {
    'PUBG Mobile': 'pubg-mobile.mp4',
    'Clash of Clans': 'clash-of-clans.mp4',
    'Clash Royale': 'clash-royale.mp4',
    'Minecraft': 'minecraft.mp4',
    'FIFA': 'fifa.mp4',
    'Chess': 'chess.mp4',
    'Call of Duty': 'call-of-duty.mp4',
    'Valorant': 'valorant.mp4',
    'Counter-Strike': 'counter-strike.mp4',
    'Pokémon': 'pokemon.mp4',
    "Assassin's Creed": 'assassins-creed.mp4',
    'Need for Speed': 'need-for-speed.mp4',
  },

  // ── Movies & TV Shows ───────────────────────────────────────────────────────
  moviesTV: {
    '3 Idiots': '3-idiots.mp4',
    'Avengers: Endgame': 'avengers-endgame.mp4',
    'Avengers: Infinity War': 'avengers-infinity-war.mp4',
    'Interstellar': 'interstellar.mp4',
    'Inception': 'inception.mp4',
    'Fight Club': 'fight-club.mp4',
    'Whiplash': 'whiplash.mp4',
    'The Big Bang Theory': 'the-big-bang-theory.mp4',
    'Sherlock': 'sherlock.mp4',
  },

  // ── Anime ────────────────────────────────────────────────────────────────────
  anime: {
    'Death Note': 'death-note.mp4',
    'One Punch Man': 'one-punch-man.mp4',
    'Jujutsu Kaisen': 'jujutsu-kaisen.mp4',
    '100 Meters': '100-meters.mp4',
  },
}
