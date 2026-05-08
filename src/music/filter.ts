import type { Genre, Song } from "./songs";

export function filterByGenre(songs: Song[], selectedGenre: "all" | Genre) {
  // const filteredSongs = songs.filter(song => song.genre === selectedGenre);
  if (selectedGenre === "all") return songs;
  return songs.filter((song) => song.genre === selectedGenre);
}

export function similarTracks(songs: Song[], currentSong: Song) {
  // songs.filter(song => song.genre === currentSong.genre);
  return songs.filter((song) => song.genre === currentSong.genre && song.id !== currentSong.id);
}

