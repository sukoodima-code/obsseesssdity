import { useMemo, useState } from "react";
import GenreChips from "../components/GenreChips";
import MusicCard from "../components/MusicCard";
import SectionHeader from "../components/SectionHeader";
import { GENRES, TRACKS, type Genre, type Track } from "../data/mock";
import { useOutletContext } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import { cn } from "../lib/cn";
import { Play, Sparkles } from "lucide-react";
import { filterByGenre } from "../music/filter";

type Ctx = {
  tracks: Track[];
};

export default function GenresPage() {
  const { tracks } = useOutletContext<Ctx>();
  const { playTrack } = usePlayer();
  const [active, setActive] = useState<"all" | Genre>("all");

  const visible = useMemo(() => filterByGenre(tracks, active).slice(0, 12), [active, tracks]);

  const mixes = useMemo(() => {
    const picks: { id: string; title: string; subtitle: string; genres: ("all" | Genre)[] }[] = [
      { id: "mix1", title: "Noir Chillwave", subtitle: "Қазақша Chillwave + Ambient", genres: ["Chillwave", "Ambient"] },
      { id: "mix2", title: "Bass & Blood", subtitle: "Phonk Qazaq + Electronic түнгі трек", genres: ["Phonk Qazaq", "Electronic"] },
      { id: "mix3", title: "Neon Pop", subtitle: "Q-pop + Synthwave • неон қала", genres: ["Q-pop", "Synthwave"] }
    ];

    return picks.map((m) => {
      const list = tracks.filter((t) => m.genres.includes(t.genre)).slice(0, 8);
      return { ...m, tracks: list };
    });
  }, [tracks]);

  return (
    <div className="px-4 py-6 md:px-6">
      <SectionHeader
        title="Жанрлар"
        subtitle="Жанр микстері + плейлисттер/таңдаулар"
        right={<span className="text-xs text-zinc-500">“Миксті қосу”-ны басыңыз — төменде қосылады</span>}
      />

      <div className="mt-4">
        <GenreChips genres={GENRES} active={active} onChange={(id) => setActive(id as "all" | Genre)} />
      </div>

      <div className="mt-6">
        <div className="text-sm font-semibold">Микстер</div>
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
          {mixes.map((m) => (
            <div
              key={m.id}
              className={cn(
                "glass overflow-hidden rounded-3xl border border-white/10 p-5 transition",
                "hover:-translate-y-0.5 hover:border-neon-crimson/35 hover:bg-white/10 hover:shadow-glow"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{m.title}</div>
                  <div className="mt-1 text-xs text-zinc-400">{m.subtitle}</div>
                </div>
                <button
                  onClick={() => {
                    if (m.tracks[0]) playTrack(m.tracks[0], { queue: m.tracks, autoPlay: true });
                  }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br from-neon-crimson to-neon-ember px-3 py-2 text-xs font-semibold text-black shadow-glow transition hover:scale-[1.02] active:scale-[0.99]"
                >
                  <Play className="h-4 w-4" />
                  Қоспаны тыңдау
                </button>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {m.tracks.slice(0, 4).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => playTrack(t, { queue: m.tracks, autoPlay: true })}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left transition hover:bg-white/5"
                  >
                    <div className="truncate text-xs font-semibold">{t.title}</div>
                    <div className="mt-1 truncate text-[11px] text-zinc-400">{t.artist}</div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold">Тректер</div>
            <div className="mt-1 text-xs text-zinc-400">Жанр бойынша сүзу + карточкалар</div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full border border-neon-crimson/25 bg-neon-crimson/10 px-3 py-1.5 text-xs text-neon-crimson">
            <Sparkles className="h-4 w-4" />
            таңдаулы
          </span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visible.map((t) => (
            <MusicCard key={t.id} track={t} onPlay={playTrack} />
          ))}
        </div>
      </div>
    </div>
  );
}

