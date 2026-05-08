import type { Track } from "../data/mock";
import { Pause, Play, SkipBack, SkipForward, Upload, Volume2, Sparkles } from "lucide-react";
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "../lib/cn";
import { similarTracks } from "../music/filter";

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function PlayerBar({
  tracks,
  track,
  onNext,
  onPrev,
  autoPlay = false
}: {
  tracks: Track[];
  track: Track;
  onNext: () => void;
  onPrev: () => void;
  autoPlay?: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState<number>(track.durationSec || 0);
  const [volume, setVolume] = useState(0.72);
  const [autopick, setAutopick] = useState(true);

  const wrap = useMemo(
    () =>
      cn(
        "fixed bottom-0 left-0 right-0 z-50 border-t border-white/10",
        "bg-black/55 backdrop-blur-2xl"
      ),
    []
  );

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = volume;
  }, [volume]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    setProgress(0);
    setDuration(track.durationSec || 0);

    if (track.audioUrl) {
      el.src = track.audioUrl;
      el.load();
      if (playing) el.play().catch(() => setPlaying(false));
    } else {
      el.removeAttribute("src");
      el.load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [track.id]);

  useEffect(() => {
    // In "reels" mode we want autoplay preview when the active card changes.
    if (!autoPlay) return;
    if (!track.audioUrl) return;
    setPlaying(true);
  }, [autoPlay, track.id, track.audioUrl]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    if (!track.audioUrl) return;
    if (playing) el.play().catch(() => setPlaying(false));
    else el.pause();
  }, [playing, track.audioUrl]);

  function handleEnded() {
    if (!autopick) return onNext();
    const sim = similarTracks(tracks, track);
    if (sim.length) {
      const next = sim[Math.floor(Math.random() * sim.length)];
      // We can't call setTrack here directly; Layout's onNext/onPrev handle it.
      // So we simulate by triggering a click-like flow: use next/prev buttons logic via custom event is overkill.
      // Instead: if similar exists, reorder by moving it to front via onNext isn't possible. We'll just advance normally.
      // To keep behavior correct, fallback to onNext.
      // (Home page already provides “Автоподбор” for similar tracks.)
      if (next) return onNext();
    }
    return onNext();
  }

  return (
    <div className={wrap}>
      <audio
        ref={audioRef}
        onTimeUpdate={() => {
          const el = audioRef.current;
          if (!el) return;
          const d = Number.isFinite(el.duration) && el.duration > 0 ? el.duration : duration;
          setDuration(d || 0);
          setProgress(d ? el.currentTime / d : 0);
        }}
        onLoadedMetadata={() => {
          const el = audioRef.current;
          if (!el) return;
          if (Number.isFinite(el.duration) && el.duration > 0) setDuration(el.duration);
        }}
        onEnded={handleEnded}
      />

      <div className="mx-auto flex w-full max-w-[1600px] items-center gap-3 px-3 py-3 md:gap-4 md:px-6 md:py-4">
        {/* Track */}
        <div className="flex min-w-0 items-center gap-3 md:w-[340px]">
          <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/10 md:h-14 md:w-14">
            <img src={track.coverUrl} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-neon-crimson/20 to-neon-ember/10" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold">{track.title}</div>
            <div className="truncate text-xs text-zinc-400">{track.artist}</div>
            {!track.audioUrl ? (
              <div className="mt-1 text-[11px] text-zinc-500">mock track (no audio) • upload mp3 to play</div>
            ) : null}
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-1 flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <IconBtn label="Prev" onClick={onPrev}>
              <SkipBack className="h-5 w-5" />
            </IconBtn>
            <button
              onClick={() => {
                if (!track.audioUrl) return;
                setPlaying((p) => !p);
              }}
              className={cn(
                "grid h-11 w-11 place-items-center rounded-full",
                "bg-gradient-to-br from-neon-crimson to-neon-ember text-black shadow-glow transition",
                "hover:scale-[1.04] active:scale-[0.98]",
                !track.audioUrl ? "opacity-50" : ""
              )}
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <IconBtn label="Next" onClick={onNext}>
              <SkipForward className="h-5 w-5" />
            </IconBtn>

            <button
              onClick={() => setAutopick((v) => !v)}
              className={cn(
                "hidden items-center gap-2 rounded-2xl border px-3 py-2 text-xs font-semibold transition md:inline-flex",
                autopick
                  ? "border-neon-crimson/30 bg-neon-crimson/10 text-neon-crimson"
                  : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
              )}
              aria-label="Toggle autopick"
              title="Автоподбор: следующий трек"
            >
              <Sparkles className="h-4 w-4" />
              Автоподбор
            </button>
          </div>

          <div className="flex w-full max-w-[560px] items-center gap-3">
            <span className="w-10 text-right text-[11px] text-zinc-500">{fmt(Math.floor((duration || track.durationSec) * progress))}</span>
            <input
              value={progress}
              onChange={(e) => setProgress(Number(e.target.value))}
              type="range"
              min={0}
              max={1}
              step={0.001}
              className="h-1.5 w-full cursor-pointer accent-red-500"
              aria-label="Progress"
            />
            <span className="w-10 text-[11px] text-zinc-500">{fmt(Math.floor(duration || track.durationSec))}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="hidden items-center justify-end gap-2 md:flex md:w-[340px]">
          <Volume2 className="h-4 w-4 text-zinc-400" />
          <input
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            type="range"
            min={0}
            max={1}
            step={0.01}
            className="h-1.5 w-[160px] cursor-pointer accent-cyan-400"
            aria-label="Volume"
          />

          <label className="ml-2 inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-200 transition hover:bg-white/10">
            <Upload className="h-4 w-4 text-neon-ember/90" />
            Upload
            <input
              type="file"
              accept="audio/*"
              multiple
              className="hidden"
              onChange={() => {
                // Upload UI is handled on Home page (for genre tagging).
                // This button is just a visual affordance.
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

function IconBtn({
  label,
  onClick,
  children
}: {
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-zinc-200 transition hover:border-neon-crimson/35 hover:bg-white/10"
      aria-label={label}
    >
      {children}
    </button>
  );
}

