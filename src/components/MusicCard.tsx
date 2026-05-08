import type { Track } from "../data/mock";
import { cn } from "../lib/cn";
import { Play } from "lucide-react";

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function MusicCard({
  track,
  onPlay
}: {
  track: Track;
  onPlay: (track: Track) => void;
}) {
  return (
    <button
      onClick={() => onPlay(track)}
      className={cn(
        "group relative flex w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-3 text-left",
        "transition duration-300 hover:-translate-y-1 hover:border-neon-purple/35 hover:bg-white/[0.06] hover:shadow-glow focus:outline-none"
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
        <img
          src={track.coverUrl}
          alt={`${track.title} cover`}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 transition group-hover:opacity-55" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="glass rounded-full border border-white/15 px-2 py-1 text-[11px] text-zinc-200">
            {fmt(track.durationSec)}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-2">
          <span className="glass rounded-full border border-white/15 px-2 py-1 text-[11px] text-zinc-200">
            {track.genre}
          </span>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-neon-crimson to-neon-ember shadow-glow transition group-hover:scale-105">
            <Play className="h-5 w-5 text-black" />
          </span>
        </div>
      </div>

      <div className="mt-3 min-w-0">
        <div className="truncate text-sm font-semibold">{track.title}</div>
        <div className="mt-0.5 flex items-center justify-between gap-3 text-xs text-zinc-400">
          <span className="truncate">{track.artist}</span>
          <span className="rounded-full bg-white/5 px-2 py-1">{fmt(track.durationSec)}</span>
        </div>
      </div>
    </button>
  );
}

