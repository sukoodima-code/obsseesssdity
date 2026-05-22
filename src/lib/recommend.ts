import type { Track } from "../data/mock";

const GENRE_ALIASES: Record<string, Track["genre"]> = {
  "q-pop": "Q-pop",
  "qpop": "Q-pop",
  "қазақша lo-fi": "Қазақша Lo-Fi",
  "қазақша lofi": "Қазақша Lo-Fi",
  "домбыра fusion": "Домбыра Fusion",
  "indie qazaq": "Indie Qazaq",
  "hiphop": "Hip-Hop",
  "hip-hop": "Hip-Hop",
  "trap": "Trap",
  "folk": "Folk",
  "electronic": "Electronic",
  "chillwave": "Chillwave",
  "ambient": "Ambient",
  "night drive": "Night Drive",
  "cinematic": "Cinematic",
  "study beats": "Study Beats",
  "acoustic": "Acoustic",
  "soul": "Soul",
  "jazz fusion": "Jazz Fusion",
  "phonk qazaq": "Phonk Qazaq",
  "sad vibes": "Sad Vibes",
  "relax": "Relax",
  "synthwave": "Synthwave"
};

const MOOD_ALIASES: Record<string, Track["mood"]> = {
  "chill": "Chill",
  "night": "Night",
  "drive": "Driving",
  "driving": "Driving",
  "study": "Focus",
  "focus": "Focus",
  "sad": "Melancholic",
  "melancholic": "Melancholic",
  "relax": "Relaxed",
  "relaxed": "Relaxed",
  "ambient": "Ambient",
  "cinematic": "Cinematic",
  "soulful": "Soulful",
  "energetic": "Energetic",
  "dreamy": "Dreamy",
  "uplifting": "Uplifting"
};

function tokenize(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9а-яёғқңөұүһі\s-]/gi, " ")
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function normKey(token: string) {
  return token.replace(/\s+/g, "").replace(/_/g, "").replace(/\./g, "");
}

export type Recommendation = {
  query: string;
  detectedGenres: Track["genre"][];
  detectedMoods: Track["mood"][];
  tracks: Track[];
};

export function recommendTracks(input: string, allTracks: Track[], limit = 8): Recommendation {
  const tokens = tokenize(input);
  const detectedGenres: Track["genre"][] = [];
  const detectedMoods: Track["mood"][] = [];
  const q = input.trim();
  const qLower = q.toLowerCase();

  for (const raw of tokens) {
    const key = normKey(raw);
    const genre = GENRE_ALIASES[key];
    const mood = MOOD_ALIASES[key];

    if (genre && !detectedGenres.includes(genre)) detectedGenres.push(genre);
    if (mood && !detectedMoods.includes(mood)) detectedMoods.push(mood);
  }

  const scored = allTracks
    .map((track) => {
      let score = 0;

      if (qLower) {
        if (track.title.toLowerCase().includes(qLower)) score += 8;
        if (track.artist.toLowerCase().includes(qLower)) score += 6;
      }

      for (const token of tokens) {
        if (track.title.toLowerCase().includes(token)) score += 2;
        if (track.artist.toLowerCase().includes(token)) score += 2;
        if (track.genre.toLowerCase().includes(token)) score += 3;
      }

      if (detectedGenres.includes(track.genre)) score += 7;
      if (detectedMoods.includes(track.mood)) score += 5;

      if (qLower.includes("night") && track.mood === "Night") score += 4;
      if (qLower.includes("drive") && track.mood === "Driving") score += 4;
      if (qLower.includes("study") && track.mood === "Focus") score += 4;
      if (qLower.includes("sad") && track.mood === "Melancholic") score += 4;

      score += Math.min(3, Math.floor(track.plays / 120000));
      score += Math.min(2, Math.floor(track.likes / 22000));

      return { track, score };
    })
    .sort((a, b) => b.score - a.score || b.track.plays - a.track.plays || a.track.title.localeCompare(b.track.title));

  const top = scored.filter((item) => item.score > 0).slice(0, limit).map((item) => item.track);
  const fallback = [...allTracks]
    .sort((a, b) => b.plays - a.plays || b.likes - a.likes || a.title.localeCompare(b.title))
    .slice(0, limit);

  return {
    query: q,
    detectedGenres,
    detectedMoods,
    tracks: top.length ? top : fallback
  };
}
