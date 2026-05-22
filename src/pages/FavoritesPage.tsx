import { usePlayer } from "../context/PlayerContext";
import PageTransition from "../components/PageTransition";
import SectionHeader from "../components/SectionHeader";
import MusicCard from "../components/MusicCard";
import { TRACKS, type Track } from "../data/mock";
import { Star } from "lucide-react";

export default function FavoritesPage() {
  const { playTrack } = usePlayer();
  const favorites = TRACKS.slice(0, 8);

  return (
    <PageTransition className="px-4 py-6 md:px-6">
      <SectionHeader
        title="Таңдаулылар"
        subtitle="Сіздің таңдаулы дыбысыңыз және Kazakh шабытындағы хиттер"
        right={
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200">
            <Star className="h-3.5 w-3.5 text-neon-ember" /> үздік таңдаулар
          </span>
        }
      />

      <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {favorites.map((track) => (
          <div key={track.id} className="glass rounded-3xl border border-white/10 p-4 shadow-glow">
            <MusicCard track={track} onPlay={playTrack} />
          </div>
        ))}
      </div>
    </PageTransition>
  );
}
