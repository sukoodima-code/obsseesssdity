import type { Genre, Song } from "../music/songs";
import { GENRES as SONG_GENRES, SONGS } from "../music/songs";

export type Track = Song;
export type Playlist = {
  id: string;
  title: string;
  subtitle: string;
  coverUrl: string;
  trackIds: string[];
  mood: string;
};

export type { Genre };

export const GENRES: { id: "all" | Genre; label: string }[] = SONG_GENRES;
export const TRACKS: Track[] = SONGS;

export const PLAYLISTS: Playlist[] = [
  {
    id: "p-kazchill",
    title: "Қазақша Chill",
    subtitle: "Тыныш қала мен жайлы дала тректері",
    coverUrl: "/covers/pl-kazchill.svg",
    mood: "Chill",
    trackIds: ["s01", "s03", "s16", "s21", "s27"]
  },
  {
    id: "p-night-drive",
    title: "Түнгі Drive",
    subtitle: "Neon Astana мен далалық бағытқа арналған түнгі плеер",
    coverUrl: "/covers/pl-night-drive.svg",
    mood: "Driving",
    trackIds: ["s06", "s08", "s12", "s22", "s29"]
  },
  {
    id: "p-study-mode",
    title: "Study Mode",
    subtitle: "Зерттеу мен жұмысқа арналған жеңіл beat-тер",
    coverUrl: "/covers/pl-study-mode.svg",
    mood: "Focus",
    trackIds: ["s02", "s03", "s11", "s23", "s25"]
  },
  {
    id: "p-indie-kazakhstan",
    title: "Indie Қазақстан",
    subtitle: "Қазақша инди, жылы текстуралар және әуездер",
    coverUrl: "/covers/pl-indie-kz.svg",
    mood: "Relax",
    trackIds: ["s02", "s13", "s16", "s19", "s27"]
  },
  {
    id: "p-dombyra-future",
    title: "Домбыра Future",
    subtitle: "Ұлттық қолтаңба мен futuristik продакшн",
    coverUrl: "/covers/pl-dombyra-future.svg",
    mood: "Soulful",
    trackIds: ["s05", "s09", "s17", "s24", "s27"]
  },
  {
    id: "p-qazaq-energy",
    title: "Qazaq Energy",
    subtitle: "Энергиялы хип-хоп пен трап тректері",
    coverUrl: "/covers/pl-qazaq-energy.svg",
    mood: "Energetic",
    trackIds: ["s09", "s14", "s15", "s19", "s28"]
  },
  {
    id: "p-sad-vibes",
    title: "Sad Vibes",
    subtitle: "Мұңды қала әуендері мен жылы сағыну әуендері",
    coverUrl: "/covers/pl-sad-vibes.svg",
    mood: "Melancholic",
    trackIds: ["s10", "s18", "s20", "s03", "s23"]
  },
  {
    id: "p-deep-focus",
    title: "Deep Focus",
    subtitle: "Терең концентрация мен зерттеу үшін әзірленген тректер",
    coverUrl: "/covers/pl-deep-focus.svg",
    mood: "Focus",
    trackIds: ["s03", "s11", "s25", "s01", "s16"]
  },
  {
    id: "p-neon-steppe",
    title: "Neon Steppe",
    subtitle: "Түнгі синтез дыбыстары мен дала мотивтері",
    coverUrl: "/covers/pl-neon-steppe.svg",
    mood: "Night",
    trackIds: ["s08", "s12", "s15", "s22", "s26"]
  },
  {
    id: "p-ai-usynystary",
    title: "AI Ұсыныстары",
    subtitle: "Сіздің дауыс және ойыңызға қарай ұсынылған жаңа тректер",
    coverUrl: "/covers/pl-ai-usynystary.svg",
    mood: "Uplifting",
    trackIds: ["s04", "s07", "s16", "s19", "s13"]
  }
];

export function getTrackById(id: string) {
  return TRACKS.find((t) => t.id === id);
}
