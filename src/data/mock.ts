import type { Genre, Song } from "../music/songs";
import { GENRES as SONG_GENRES, SONGS } from "../music/songs";

export type Track = Song;
export type Playlist = {
  id: string;
  title: string;
  subtitle: string;
  coverUrl: string;
  trackIds: string[];
};

export type { Genre };

export const GENRES: { id: "all" | Genre; label: string }[] = SONG_GENRES;
export const TRACKS: Track[] = SONGS;

const cover = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=800&q=70`;

export const PLAYLISTS: Playlist[] = [
  {
    id: "p1",
    title: "ミックス для релакса",
    subtitle: "Lo-fi + Chill • rainy mood",
    coverUrl: cover("photo-1500530855697-b586d89ba3ee"),
    trackIds: ["s11", "s1", "s4", "s9", "s3"]
  },
  {
    id: "p2",
    title: "Neon Gym",
    subtitle: "Phonk + Electronic • no excuses",
    coverUrl: cover("photo-1485579149621-3123dd979885"),
    trackIds: ["s8", "s2", "s10", "s14", "s5", "s12"]
  },
  {
    id: "p3",
    title: "Anime Night Drive",
    subtitle: "City pop vibes • midnight",
    coverUrl: cover("photo-1520975682030-1b1b8e7a69a4"),
    trackIds: ["s3", "s13", "s1", "s6", "s15", "s7"]
  }
];

export function getTrackById(id: string) {
  return TRACKS.find((t) => t.id === id);
}

