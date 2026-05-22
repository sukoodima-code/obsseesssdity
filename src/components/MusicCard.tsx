import type { Track } from "../data/mock";
import { cn } from "../lib/cn";
import { Pause, Play } from "lucide-react";
import TrackCover from "./TrackCover";
import { usePlayer } from "../context/PlayerContext";

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function MusicCard({ track, onPlay }: { track: Track; onPlay?: (track: Track) => void }) {
  const { currentTrack, isPlaying, playTrack, orderedTracks } = usePlayer();
  const active = currentTrack.id === track.id;
  const showPause = active && isPlaying;

  const handleClick = () => {
    if (onPlay) {
      onPlay(track);
      return;
    }
    playTrack(track, { queue: orderedTracks, autoPlay: true });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "group relative flex w-full flex-col overflow-hidden rounded-[2.5rem] border bg-slate-950/80 p-3 text-left shadow-[0_20px_80px_-48px_rgba(168,85,247,0.65)] transition duration-300",
        "hover:-translate-y-1 hover:border-neon-purple/40 hover:bg-slate-900/95 focus:outline-none",
        active ? "border-neon-purple/40 bg-neon-purple/10" : "border-white/10"
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/50">
        <TrackCover
          id={track.id}
          title={track.title}
          coverUrl={track.coverUrl}
          className="h-full w-full transition duration-500 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90 transition group-hover:opacity-75" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className="glass rounded-full border border-white/15 bg-black/40 px-2 py-1 text-[11px] text-zinc-200">{fmt(track.durationSec)}</span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full shadow-[0_10px_40px_-18px_rgba(139,92,246,0.75)] transition duration-300 group-hover:scale-105",
              active ? "bg-gradient-to-br from-neon-crimson to-neon-ember" : "bg-gradient-to-br from-neon-purple to-neon-cyan"
            )}
          >
            {showPause ? <Pause className="h-5 w-5 text-black" /> : <Play className="h-5 w-5 text-black" />}
          </span>
        </div>
      </div>

      <div className="mt-3 min-w-0">
        <div className="truncate text-sm font-semibold text-white">{track.title}</div>
        <div className="mt-1 flex items-center justify-between gap-3 text-xs text-zinc-400">
          <span className="truncate">{track.artist}</span>
          <span className="rounded-full bg-white/5 px-2 py-1 uppercase tracking-[0.18em] text-[11px] text-zinc-200">{track.genre}</span>
        </div>
      </div>
    </button>
  );
}
