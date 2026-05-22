import { Music2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume2, Waves } from "lucide-react";
import { cn } from "../lib/cn";
import { usePlayer } from "../context/PlayerContext";
import TrackCover from "./TrackCover";
import PlayerWaveform from "./PlayerWaveform";

function fmt(sec: number) {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  return `${m}:${String(s % 60).padStart(2, "0")}`;
}

export default function PlayerBar() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    progress,
    volume,
    bassBoost,
    spatialAudio,
    shuffle,
    repeat,
    toggle,
    next,
    prev,
    seek,
    setVolume,
    setShuffle,
    setRepeat,
    setBassBoost,
    setSpatialAudio
  } = usePlayer();

  const cycleRepeat = () => {
    setRepeat(repeat === "off" ? "all" : repeat === "all" ? "one" : "off");
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t border-white/10",
        "bg-black/90 backdrop-blur-2xl",
        "shadow-[0_-8px_40px_rgba(139,92,246,0.15),0_-4px_24px_rgba(239,68,68,0.08)]"
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-purple/60 to-transparent" />

      <div className="mx-auto flex w-full max-w-[1600px] flex-wrap items-center gap-3 px-4 py-3 md:gap-4 md:px-6 md:py-4">
        <div
          className={cn(
            "flex min-w-0 flex-1 items-center gap-3 rounded-3xl border px-3 py-2 transition md:max-w-[320px]",
            isPlaying ? "border-neon-purple/30 bg-neon-purple/5 shadow-glow" : "border-white/10 bg-white/5"
          )}
        >
          <TrackCover id={currentTrack.id} title={currentTrack.title} coverUrl={currentTrack.coverUrl} className="h-14 w-14 shrink-0 rounded-2xl" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-semibold text-white">{currentTrack.title}</div>
            <div className="truncate text-xs text-zinc-400">{currentTrack.artist}</div>
            <div className="mt-1 hidden text-[10px] uppercase tracking-wider text-neon-crimson/80 sm:block">{currentTrack.genre}</div>
          </div>
          <PlayerWaveform active={isPlaying} className="hidden sm:flex" />
        </div>

        <div className="flex min-w-0 flex-[2] flex-col items-center gap-2">
          <div className="flex items-center gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => setShuffle(!shuffle)}
              className={cn(
                "grid h-9 w-9 place-items-center rounded-full transition",
                shuffle ? "text-neon-cyan" : "text-zinc-500 hover:text-white"
              )}
              aria-label="Shuffle"
            >
              <Shuffle className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={prev}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-zinc-200 transition hover:border-neon-purple/35 hover:bg-white/10"
              aria-label="Алдыңғы"
            >
              <SkipBack className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={toggle}
              disabled={!currentTrack.audioUrl}
              className={cn(
                "grid h-14 w-14 place-items-center rounded-full transition",
                isPlaying
                  ? "bg-gradient-to-br from-neon-purple to-neon-cyan text-black shadow-glow"
                  : "bg-white/10 text-white hover:bg-white/15"
              )}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 translate-x-0.5" />}
            </button>
            <button
              type="button"
              onClick={next}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-zinc-200 transition hover:border-neon-purple/35 hover:bg-white/10"
              aria-label="Келесі"
            >
              <SkipForward className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={cycleRepeat}
              className={cn(
                "grid h-9 w-9 place-items-center rounded-full transition",
                repeat !== "off" ? "text-neon-cyan" : "text-zinc-500 hover:text-white"
              )}
              aria-label="Repeat"
            >
              <Repeat className={cn("h-4 w-4", repeat === "one" && "fill-current")} />
            </button>
          </div>

          <div className="flex w-full max-w-[560px] items-center gap-2 md:gap-3">
            <span className="w-10 shrink-0 text-right font-mono text-xs text-zinc-400">{fmt(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.001}
              value={progress}
              onChange={(e) => seek(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer accent-neon-purple"
              aria-label="Прогресс"
            />
            <span className="w-10 shrink-0 font-mono text-xs text-zinc-400">{fmt(duration || currentTrack.durationSec)}</span>
          </div>
        </div>

        <div className="hidden min-w-[180px] items-center gap-2 md:flex">
          <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
            <Volume2 className="h-4 w-4 shrink-0 text-zinc-400" />
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer accent-cyan-400"
              aria-label="Дыбыс"
            />
          </div>
          <button
            type="button"
            onClick={() => setBassBoost(!bassBoost)}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-full transition",
              bassBoost ? "bg-neon-purple/10 text-neon-purple" : "bg-white/5 text-zinc-300 hover:bg-white/10"
            )}
            aria-label="Bass Boost"
          >
            <Music2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setSpatialAudio(!spatialAudio)}
            className={cn(
              "grid h-9 w-9 place-items-center rounded-full transition",
              spatialAudio ? "bg-neon-cyan/10 text-neon-cyan" : "bg-white/5 text-zinc-300 hover:bg-white/10"
            )}
            aria-label="Spatial Audio"
          >
            <Waves className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
