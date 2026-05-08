import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { Track } from "../data/mock";
import ChatAssistant from "../components/ChatAssistant";
import SectionHeader from "../components/SectionHeader";
import { recommendTracks } from "../lib/recommend";
import { similarTracks } from "../music/filter";
import { useMood } from "../theme/MoodContext";
import type { Mood } from "../theme/moods";
import { GENRES } from "../data/mock";
import { Sparkles } from "lucide-react";

type Ctx = { tracks: Track[]; currentTrack: Track; setCurrentTrack: (t: Track) => void };

export default function AssistantPage() {
  const { tracks, currentTrack, setCurrentTrack } = useOutletContext<Ctx>();
  const { mood, setMood } = useMood();
  const [analyzeInput, setAnalyzeInput] = useState("");

  const detectedMood = useMemo<Mood>(() => {
    const t = analyzeInput.trim().toLowerCase();
    if (!t) return mood;
    if (/(sad|груст|печал)/i.test(t)) return "sad";
    if (/(focus|study|work|концентра|учеб)/i.test(t)) return "focus";
    if (/(ener|get|gym|hype|энерг|трэш)/i.test(t)) return "energetic";
    if (/(chill|lofi|relax|night|calm|покой|релакс)/i.test(t)) return "chill";
    return mood;
  }, [analyzeInput, mood]);

  const widgetRecs = useMemo(() => {
    const q = analyzeInput.trim() ? analyzeInput : `${detectedMood} ${currentTrack.genre}`;
    return recommendTracks(q, tracks, 5).tracks;
  }, [analyzeInput, detectedMood, currentTrack.genre, tracks]);

  const widgetSimilar = useMemo(() => similarTracks(tracks, currentTrack).slice(0, 4), [tracks, currentTrack]);

  const trending = useMemo(() => {
    const counts = new Map<string, number>();
    tracks.forEach((t) => counts.set(t.genre, (counts.get(t.genre) ?? 0) + 1));
    const top = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([genre]) => genre);
    return top;
  }, [tracks]);

  return (
    <div className="px-4 py-6 md:px-6">
      <SectionHeader
        title="AI Assistant"
        subtitle="Type your mood/genre → get mock recommendations"
        right={
          <span className="rounded-full border border-neon-crimson/25 bg-neon-crimson/10 px-3 py-1.5 text-xs text-neon-crimson/90">
            AI proxy ready
          </span>
        }
      />

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
        <ChatAssistant onPlay={setCurrentTrack} />

        <div className="space-y-5">
          {/* Mood Analyzer */}
          <div className="glass rounded-3xl border border-white/10 p-5 shadow-[0_0_0_1px_rgba(255,0,51,.10)]">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold">Mood Analyzer</div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-zinc-200">
                <Sparkles className="h-4 w-4 text-neon-ember/80" />
                {detectedMood}
              </span>
            </div>

            <div className="mt-3">
              <input
                value={analyzeInput}
                onChange={(e) => setAnalyzeInput(e.target.value)}
                placeholder="Напиши: “sad chill”, “gym phonk”, “study focus”…"
                className="glass w-full rounded-2xl border border-white/10 px-3 py-3 text-sm outline-none transition focus:border-neon-ember/40"
              />
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => setMood(detectedMood)}
                className="rounded-2xl border border-neon-ember/25 bg-neon-ember/10 px-4 py-2 text-xs font-semibold text-neon-ember transition hover:bg-neon-ember/15"
              >
                Apply mood UI
              </button>
              <button
                onClick={() => setAnalyzeInput("")}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-zinc-200 transition hover:bg-white/10"
              >
                Clear
              </button>
            </div>

            <div className="mt-4 text-xs text-zinc-500">Recommended tracks</div>
            <div className="mt-3 space-y-2">
              {widgetRecs.slice(0, 3).map((t) => (
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

          {/* Similar Songs */}
          <div className="glass rounded-3xl border border-white/10 p-5">
            <div className="text-sm font-semibold">Similar Songs</div>
            <div className="mt-2 text-xs text-zinc-500">Same genre as: {currentTrack.title}</div>
            <div className="mt-3 space-y-2">
              {widgetSimilar.map((t) => (
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

          {/* Trending Genres */}
          <div className="glass rounded-3xl border border-white/10 p-5">
            <div className="text-sm font-semibold">Trending Genres</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {trending.map((g) => {
                const label = GENRES.find((x) => x.id === g)?.label ?? g;
                return (
                  <button
                    key={g}
                    onClick={() => {
                      // Soft behavior: set mood UI based on known mapping.
                      // (We keep it client-side and mock-only.)
                      setAnalyzeInput(label.toLowerCase());
                    }}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-200 transition hover:bg-white/10"
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

