// =============================================================================
// src/data/hobbyMediaMap.ts — Manual media assignment for every hobby card
// =============================================================================
//
// HOW TO USE:
//   • Each key is the EXACT card name as it appears in hobbies.ts.
//   • Each value is the EXACT filename (with extension) inside src/assets/hobbies/.
//   • Set the value to null to keep that card's default static icon/emoji.
//
// HOW TO ADD A NEW CARD:
//   1. Drop the file into src/assets/hobbies/.
//   2. Add a new entry here: 'Card Name': 'filename.gif'
//   3. The card name must match the `name` field in hobbies.ts exactly.
//
// HOW TO CHANGE A GIF:
//   Replace the filename value. Old file can be deleted from src/assets/hobbies.
//
// HOW TO DISABLE A CARD'S MEDIA:
//   Set the value to null — the card will fall back to its static icon/emoji.
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
    'FC Barcelona': 'fcb.gif',
    'Argentina': 'argentina_gif.gif',
    "India Men's Cricket": 'indian_cricket_team_gif.gif',
    "India Women's Cricket": 'indian_cricket_team_gif.gif',
    'Chennai Super Kings': 'csk_gif.gif',
    'Scuderia Ferrari': 'ferrari_gif.gif',
  },

  // ── Sports Play ─────────────────────────────────────────────────────────────
  sportsPlay: {
    'Football': 'football_gif.gif',
    'Cricket': 'cricket_gif.gif',
    'Volleyball': 'volleyball_gif.gif',
    'Badminton': 'badmintion_gif.gif', // filename has a typo — do not fix the value here
    'Table Tennis': 'table_tennis_gif.gif',
    'Chess': 'chess_gif.gif',
  },

  // ── Instruments ─────────────────────────────────────────────────────────────
  instruments: {
    'Guitar': 'guitar_gif.gif',
    'Piano': 'piano_gif.gif',
    'Harmonium': 'harmonium_gif.gif',
  },

  // ── Games ───────────────────────────────────────────────────────────────────
  games: {
    'PUBG Mobile': 'pubgm_gif.gif',
    'Clash of Clans': 'coc_gif.gif',
    'Clash Royale': 'cr_gif.gif',
    'Minecraft': 'minecraft_gif.gif',
    'FIFA': 'fifa_gif.gif',
    'Chess': 'chess_gif.gif',
    'Call of Duty': 'cod_gif.gif',
    'Valorant': 'valorant_gif.gif',
    'Counter-Strike': 'counter_strike_gif.gif',
    'Pokémon': 'pokemon_gif.gif',
    "Assassin's Creed": "assassin's_creed_gif.gif",
    'Need for Speed': 'nfs_gif.gif',
  },

  // ── Movies & TV Shows ───────────────────────────────────────────────────────
  moviesTV: {
    '3 Idiots': '3idiots_gif.gif',
    'Avengers: Endgame': 'endgame_gif.gif',
    'Avengers: Infinity War': 'infinitywar_gif.gif',
    'Interstellar': 'interstellar_gif.gif',
    'Inception': 'inception_gif.gif',
    'Fight Club': 'fightclub_gif.gif',
    'Whiplash': 'whiplash_gif.gif',
    'The Big Bang Theory': 'tbbt_gif.gif',
    'Sherlock': 'sherlock_gif.gif',
  },

  // ── Anime ────────────────────────────────────────────────────────────────────
  anime: {
    'Death Note': 'death_note_gif.gif',
    'One Punch Man': 'opm_gif.gif',
    'Jujutsu Kaisen': 'jjk_gif.gif',
    '100 Meters': null, // no media yet — uses placeholder emoji
  },
}
