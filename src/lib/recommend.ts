import type { Genre, Track } from "../data/mock";

const GENRE_ALIASES: Record<string, Genre> = {
  lofi: "lofi",
  "lo-fi": "lofi",
  chill: "chill",
  relax: "chill",
  electronic: "electronic",
  edm: "electronic",
  hiphop: "hiphop",
  "hip-hop": "hiphop",
  rap: "hiphop",
  rock: "rock",
  anime: "anime",
  pop: "pop",
  phonk: "phonk",
  indie: "indie"
};

function tokenize(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9а-яё\s-]/gi, " ")
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function normKey(t: string) {
  return t.replace(/\s+/g, "").replace(/_/g, "").replace(/\./g, "");
}

export type Recommendation = {
  query: string;
  detectedGenres: Genre[];
  tracks: Track[];
};

export function recommendTracks(input: string, allTracks: Track[], limit = 8): Recommendation {
  const tokens = tokenize(input);
  const detectedGenres: Genre[] = [];

  for (const raw of tokens) {
    const key = normKey(raw);
    const genre = GENRE_ALIASES[key];
    if (genre && !detectedGenres.includes(genre)) detectedGenres.push(genre);
  }

  const q = input.trim();
  const qLower = q.toLowerCase();

  const scored = allTracks
    .map((t) => {
      let score = 0;

      // Direct text matches (title/artist)
      if (qLower && t.title.toLowerCase().includes(qLower)) score += 6;
      if (qLower && t.artist.toLowerCase().includes(qLower)) score += 5;

      // Token matches (loose)
      for (const tok of tokens) {
        if (t.title.toLowerCase().includes(tok)) score += 2;
        if (t.artist.toLowerCase().includes(tok)) score += 2;
      }

      // Genre signals
      for (const g of detectedGenres) if (t.genre === g) score += 6;

      return { t, score };
    })
    .sort((a, b) => b.score - a.score || a.t.title.localeCompare(b.t.title));

  const top = scored.filter((s) => s.score > 0).slice(0, limit).map((s) => s.t);
  const fallback = allTracks.slice(0, limit);

  return {
    query: q,
    detectedGenres,
    tracks: top.length ? top : fallback
  };
}

