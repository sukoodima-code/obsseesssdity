// Minimal mock music library for the Telegram bot.
// Keep this in JS (not importing frontend TS) to avoid extra build tooling.

const songs = [
  { id: "s1", title: "Chill Night", artist: "LoFi Artist", genre: "lofi" },
  { id: "s2", title: "Energy Boost", artist: "DJ Power", genre: "electronic" },
  { id: "s3", title: "Midnight Ramen", artist: "LoFi Senpai", genre: "anime" },
  { id: "s4", title: "Soft Rain Window", artist: "Aoi Mizu", genre: "chill" },
  { id: "s5", title: "808 Heartbeat", artist: "Nova Freq", genre: "hiphop" },
  { id: "s6", title: "Guitar Skyline", artist: "Arctic Comet", genre: "rock" },
  { id: "s7", title: "Bubblegum Eclipse", artist: "Hana Hype", genre: "pop" },
  { id: "s8", title: "Bassline Kunai", artist: "KageBeat", genre: "phonk" },
  { id: "s9", title: "Quiet Pixel Town", artist: "ChromaSleep", genre: "indie" },
  { id: "s10", title: "Crimson Echo", artist: "NightDrive", genre: "electronic" },
  { id: "s11", title: "Blood Moon Lo‑Fi", artist: "TapeHiss", genre: "lofi" },
  { id: "s12", title: "Katana Bass", artist: "KageBeat", genre: "phonk" },
  { id: "s13", title: "After School Noir", artist: "YoruKaze", genre: "anime" },
  { id: "s14", title: "Streetlight Verse", artist: "Nova Freq", genre: "hiphop" },
  { id: "s15", title: "Black Roses", artist: "Arctic Comet", genre: "rock" },
  { id: "s16", title: "Ember Pop", artist: "Hana Hype", genre: "pop" }
];

const playlists = [
  {
    id: "p1",
    title: "ミックス для релакса",
    trackIds: ["s11", "s1", "s4", "s9", "s3"]
  },
  {
    id: "p2",
    title: "Neon Gym",
    trackIds: ["s8", "s2", "s10", "s14", "s5", "s12"]
  },
  {
    id: "p3",
    title: "Anime Night Drive",
    trackIds: ["s3", "s13", "s1", "s6", "s15", "s7"]
  }
];

function detectMood(text) {
  const t = (text || "").toLowerCase();
  if (/(sad|груст|печал)/i.test(t)) return "sad";
  if (/(focus|study|work|концентра|учеб)/i.test(t)) return "focus";
  if (/(ener|energy|gym|hype|энерг|трэш)/i.test(t)) return "energetic";
  if (/(chill|lofi|relax|night|calm|покой|релакс)/i.test(t)) return "chill";
  return null;
}

function pickGenreForMood(mood) {
  // Mood -> preferred genres mapping (simple mock).
  if (mood === "chill") return ["lofi", "chill", "anime", "indie"];
  if (mood === "energetic") return ["electronic", "phonk", "hiphop", "rock"];
  if (mood === "sad") return ["chill", "lofi", "indie"];
  if (mood === "focus") return ["lofi", "indie", "anime", "chill"];
  return [];
}

function bestSongsForQuery(query, limit = 5) {
  const t = (query || "").toLowerCase();
  const genres = pickGenreForMood(detectMood(t));
  return songs
    .map((s) => {
      let score = 0;
      if (t && s.title.toLowerCase().includes(t)) score += 6;
      if (t && s.artist.toLowerCase().includes(t)) score += 5;
      for (const g of genres) if (s.genre === g) score += 8;
      // If genre words appear directly:
      if (/(lofi|lo-fi)/i.test(t) && s.genre === "lofi") score += 8;
      if (/(electronic|edm)/i.test(t) && s.genre === "electronic") score += 8;
      if (/(phonk)/i.test(t) && s.genre === "phonk") score += 8;
      if (/(anime)/i.test(t) && s.genre === "anime") score += 8;
      if (/(hiphop|rap)/i.test(t) && s.genre === "hiphop") score += 8;
      return { s, score };
    })
    .sort((a, b) => b.score - a.score || a.s.title.localeCompare(b.s.title))
    .filter((x) => x.score > 0)
    .slice(0, limit)
    .map((x) => x.s);
}

function playlistForMood(mood) {
  if (mood === "chill") return playlists[0];
  if (mood === "energetic") return playlists[1];
  if (mood === "sad") return playlists[0];
  if (mood === "focus") return playlists[0];
  return playlists[2];
}

module.exports = { songs, playlists, detectMood, pickGenreForMood, bestSongsForQuery, playlistForMood };

