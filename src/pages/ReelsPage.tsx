import { useEffect, useMemo, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ChevronLeft, Sparkles } from "lucide-react";
import type { Track } from "../data/mock";
import { similarTracks } from "../music/filter";
import { recommendTracks } from "../lib/recommend";
import { useMood } from "../theme/MoodContext";
import { cn } from "../lib/cn";

type Ctx = { tracks: Track[]; currentTrack: Track; setCurrentTrack: (t: Track) => void };

type SoundMode = "bass" | "cinema" | "focus";

function Waveform({ mode, mood }: { mode: SoundMode; mood: string }) {
  const bars = useMemo(() => Array.from({ length: 26 }, (_, i) => i), []);
  const speed = mode === "bass" ? 0.95 : mode === "cinema" ? 1.3 : 1.15;
  const opacity = mode === "focus" ? 0.95 : 0.85;
  const hue =
    mood === "chill" ? "rgba(168,85,247,.95)" : mood === "sad" ? "rgba(107,114,128,.95)" : "rgba(239,68,68,.95)";

  return (
    <div className="flex h-10 items-end gap-[2px] px-2">
      {bars.map((i) => {
        const height = 14 + Math.round(18 * Math.abs(Math.sin(i * 0.42)));
        const delay = i * 0.035;
        return (
          <span
            key={i}
            className="inline-block w-[2px] rounded-full"
            style={{
              height,
              backgroundColor: hue,
              opacity,
              animation: `waveBar ${speed}s ease-in-out ${delay}s infinite alternate`
            }}
          />
        );
      })}
    </div>
  );
}

export default function ReelsPage() {
  const { tracks, currentTrack, setCurrentTrack } = useOutletContext<Ctx>();
  const { mood } = useMood();
  const [activeId, setActiveId] = useState(currentTrack.id);
  const [soundMode, setSoundMode] = useState<SoundMode>("bass");
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setActiveId(currentTrack.id);
  }, [currentTrack.id]);

  const moodGenres = useMemo(() => {
    if (mood === "chill") return new Set(["lofi", "chill", "anime", "indie"]);
    if (mood === "energetic") return new Set(["electronic", "phonk", "hiphop", "rock"]);
    if (mood === "sad") return new Set(["chill", "lofi", "indie"]);
    return new Set(["lofi", "indie", "anime", "chill"]);
  }, [mood]);

  const feedTracks = useMemo(() => {
    const scored = tracks.map((t) => {
      const isPreferred = moodGenres.has(t.genre as any);
      const score = (isPreferred ? 10 : 0) + (t.genre === currentTrack.genre ? 2 : 0);
      return { t, score };
    });
    return scored.sort((a, b) => b.score - a.score || a.t.title.localeCompare(b.t.title)).map((x) => x.t);
  }, [tracks, moodGenres, currentTrack.genre]);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const els = Array.from(root.querySelectorAll("[data-reels-card='true']")) as HTMLElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // Pick the most visible card.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (!visible) return;
        const id = visible.target.getAttribute("data-track-id");
        if (!id) return;
        setActiveId(id);
      },
      { root, threshold: [0.55, 0.7, 0.85] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [feedTracks.length]);

  const activeTrack = useMemo(() => tracks.find((t) => t.id === activeId) ?? currentTrack, [tracks, activeId, currentTrack]);

  const similar = useMemo(() => similarTracks(tracks, activeTrack).slice(0, 4), [tracks, activeTrack]);
  const ai = useMemo(() => {
    const q = `${mood} ${activeTrack.genre}`;
    return recommendTracks(q, tracks, 6).tracks.slice(0, 3);
  }, [mood, activeTrack.genre, tracks]);

  return (
    <div className="h-full px-0 py-0">
      <div className="mx-auto flex h-full max-w-[1600px] items-start gap-4 px-0">
        <div className="hidden w-[360px] flex-col gap-4 lg:flex">
          <div className="glass rounded-3xl border border-white/10 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold">Mood AI</div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
                <Sparkles className="h-4 w-4 text-neon-ember/80" />
                {mood}
              </span>
            </div>

            <div className="mt-3 text-sm text-zinc-400">
              Вертикальный reels: свайп вниз → новый трек, плюс рекомендации и похожие треки.
            </div>

            <div className="mt-4">
              <div className="text-xs text-zinc-500">AI Sound Boost</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <ModePill label="Bass+" active={soundMode === "bass"} onClick={() => setSoundMode("bass")} />
                <ModePill label="Cinema" active={soundMode === "cinema"} onClick={() => setSoundMode("cinema")} />
                <ModePill label="Focus Mode" active={soundMode === "focus"} onClick={() => setSoundMode("focus")} />
              </div>
              <div className="mt-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <div className="text-xs text-zinc-500">Preview waveform (visual)</div>
                <div className="mt-2">
                  <Waveform mode={soundMode} mood={mood} />
                </div>
              </div>
            </div>
          </div>

          <div className="glass rounded-3xl border border-white/10 p-5">
            <div className="text-sm font-semibold">Рекомендуемые</div>
            <div className="mt-2 space-y-2">
              {ai.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setCurrentTrack(t)}
                  className="group flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-3 text-left transition hover:-translate-y-0.5 hover:bg-white/[0.06]"
                >
                  <img src={t.coverUrl} alt="" className="h-10 w-10 rounded-2xl object-cover" />
                  <div className="min-w-0">
                    <div className="truncate text-sm font-semibold">{t.title}</div>
                    <div className="truncate text-xs text-zinc-400">{t.artist}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex-1">
          <button
            onClick={() => history.back()}
            className="fixed left-[300px] top-20 z-20 hidden rounded-2xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-zinc-200 backdrop-blur md:flex"
          >
            <ChevronLeft className="mr-2 inline h-4 w-4" />
            Back
          </button>

          <div
            ref={containerRef}
            className={cn(
              "h-[calc(100dvh-16px)] overflow-y-auto snap-y snap-mandatory",
              "pb-[110px] pt-4 md:pb-[110px]"
            )}
          >
            {feedTracks.map((t) => {
              const isActive = t.id === activeTrack.id;
              return (
                <div
                  key={t.id}
                  data-reels-card="true"
                  data-track-id={t.id}
                  className="relative mb-2 h-dvh snap-start px-4 md:px-6"
                >
                  <div className="absolute inset-0">
                    <img src={t.coverUrl} alt="" className="h-full w-full object-cover opacity-50" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    {mood === "sad" ? <div className="absolute inset-0 backdrop-blur-sm" /> : null}
                  </div>

                  <div className="relative flex h-full flex-col justify-end gap-3 rounded-3xl border border-white/10 bg-black/20 p-5 backdrop-blur-xl">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
                          <span className="h-2 w-2 rounded-full bg-neon-crimson/80" />
                          {t.genre}
                        </div>
                        <div className="mt-3 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                          {t.title}
                        </div>
                        <div className="mt-1 truncate text-sm text-zinc-300 md:text-base">{t.artist}</div>
                      </div>

                      <button
                        onClick={() => setCurrentTrack(t)}
                        className={cn(
                          "inline-flex items-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition",
                          isActive
                            ? "border-white/20 bg-white/10 shadow-glow"
                            : "border-white/10 bg-white/5 hover:bg-white/10"
                        )}
                      >
                        {isActive ? "Playing" : "Play"}
                      </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <Waveform mode={soundMode} mood={mood} />

                      <div className="flex items-center gap-2">
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                          <div className="text-[11px] text-zinc-500">Похожие</div>
                          <div className="mt-1 text-xs font-semibold text-zinc-200">{similar.length ? similar[0].title : "—"}</div>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                          <div className="text-[11px] text-zinc-500">AI</div>
                          <div className="mt-1 text-xs font-semibold text-zinc-200">{ai.length ? ai[0].title : "—"}</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {similar.slice(0, 3).map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setCurrentTrack(s)}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 transition hover:border-white/20 hover:bg-white/10"
                        >
                          {s.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Activate track for autoplay preview */}
                  {isActive ? (
                    <AutoplaySync active={isActive} onActive={() => setCurrentTrack(t)} />
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ModePill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
        active ? "border-white/20 bg-white/10 shadow-glow" : "border-white/10 bg-white/5 hover:bg-white/10"
      )}
    >
      {label}
    </button>
  );
}

function AutoplaySync({ active, onActive }: { active: boolean; onActive: () => void }) {
  useEffect(() => {
    if (!active) return;
    onActive();
  }, [active, onActive]);
  return null;
}

