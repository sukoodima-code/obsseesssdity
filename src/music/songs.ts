export type Genre =
  | "lofi"
  | "electronic"
  | "hiphop"
  | "rock"
  | "anime"
  | "pop"
  | "chill"
  | "phonk"
  | "indie";

export type Song = {
  id: string;
  title: string;
  artist: string;
  genre: Genre;
  coverUrl: string;
  durationSec: number;
  audioUrl?: string;
};

const cover = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=800&q=70`;

// The user-requested snippet shape (kept exactly as an example):
export const songs = [
  {
    title: "Chill Night",
    artist: "LoFi Artist",
    genre: "lofi"
  },
  {
    title: "Energy Boost",
    artist: "DJ Power",
    genre: "electronic"
  }
] as const;

export const SONGS: Song[] = [
  {
    id: "s1",
    title: "Chill Night",
    artist: "LoFi Artist",
    genre: "lofi",
    coverUrl: cover("photo-1526498460520-4c246339dccb"),
    durationSec: 192,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: "s2",
    title: "Energy Boost",
    artist: "DJ Power",
    genre: "electronic",
    coverUrl: cover("photo-1520975682030-1b1b8e7a69a4"),
    durationSec: 178,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: "s3",
    title: "Midnight Ramen",
    artist: "LoFi Senpai",
    genre: "anime",
    coverUrl: cover("photo-1526498460520-4c246339dccb"),
    durationSec: 201,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: "s4",
    title: "Soft Rain Window",
    artist: "Aoi Mizu",
    genre: "chill",
    coverUrl: cover("photo-1500530855697-b586d89ba3ee"),
    durationSec: 214,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    id: "s5",
    title: "808 Heartbeat",
    artist: "Nova Freq",
    genre: "hiphop",
    coverUrl: cover("photo-1511379938547-c1f69419868d"),
    durationSec: 171,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
  {
    id: "s6",
    title: "Guitar Skyline",
    artist: "Arctic Comet",
    genre: "rock",
    coverUrl: cover("photo-1511671782779-c97d3d27a1d4"),
    durationSec: 229,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  },
  {
    id: "s7",
    title: "Bubblegum Eclipse",
    artist: "Hana Hype",
    genre: "pop",
    coverUrl: cover("photo-1511379938547-c1f69419868d"),
    durationSec: 199,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
  },
  {
    id: "s8",
    title: "Bassline Kunai",
    artist: "KageBeat",
    genre: "phonk",
    coverUrl: cover("photo-1485579149621-3123dd979885"),
    durationSec: 164,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
  },
  {
    id: "s9",
    title: "Quiet Pixel Town",
    artist: "ChromaSleep",
    genre: "indie",
    coverUrl: cover("photo-1526498460520-4c246339dccb"),
    durationSec: 223,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: "s10",
    title: "Crimson Echo",
    artist: "NightDrive",
    genre: "electronic",
    coverUrl: cover("photo-1511379938547-c1f69419868d"),
    durationSec: 186,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: "s11",
    title: "Blood Moon Lo‑Fi",
    artist: "TapeHiss",
    genre: "lofi",
    coverUrl: cover("photo-1500530855697-b586d89ba3ee"),
    durationSec: 207,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: "s12",
    title: "Katana Bass",
    artist: "KageBeat",
    genre: "phonk",
    coverUrl: cover("photo-1485579149621-3123dd979885"),
    durationSec: 165,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    id: "s13",
    title: "After School Noir",
    artist: "YoruKaze",
    genre: "anime",
    coverUrl: cover("photo-1520975682030-1b1b8e7a69a4"),
    durationSec: 212,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
  {
    id: "s14",
    title: "Streetlight Verse",
    artist: "Nova Freq",
    genre: "hiphop",
    coverUrl: cover("photo-1511671782779-c97d3d27a1d4"),
    durationSec: 173,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  },
  {
    id: "s15",
    title: "Black Roses",
    artist: "Arctic Comet",
    genre: "rock",
    coverUrl: cover("photo-1511671782779-c97d3d27a1d4"),
    durationSec: 231,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3"
  },
  {
    id: "s16",
    title: "Ember Pop",
    artist: "Hana Hype",
    genre: "pop",
    coverUrl: cover("photo-1511379938547-c1f69419868d"),
    durationSec: 198,
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3"
  }
];

export const GENRES: { id: "all" | Genre; label: string }[] = [
  { id: "all", label: "All" },
  { id: "lofi", label: "Lo‑fi" },
  { id: "chill", label: "Chill" },
  { id: "anime", label: "Anime" },
  { id: "electronic", label: "Electronic" },
  { id: "hiphop", label: "Hip‑Hop" },
  { id: "phonk", label: "Phonk" },
  { id: "rock", label: "Rock" },
  { id: "pop", label: "Pop" },
  { id: "indie", label: "Indie" }
];

