import { ArrowRight } from "lucide-react";
import { Link, useOutletContext } from "react-router-dom";
import TrackCover from "../components/TrackCover";
import MusicCard from "../components/MusicCard";
import { usePlayer } from "../context/PlayerContext";
import { type Track } from "../data/mock";

type Ctx = { tracks: Track[] };

export default function HomePage() {
  const { tracks } = useOutletContext<Ctx>();
  const { playTrack, orderedTracks, currentTrack } = usePlayer();
  const featured = tracks[0] ?? currentTrack;

  return (
    <div className="relative overflow-hidden px-4 py-6 md:px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.16),transparent_20%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.12),transparent_20%),radial-gradient(circle_at_20%_90%,rgba(244,63,94,0.10),transparent_28%)]" />
      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid gap-8 rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 shadow-neon backdrop-blur-xl">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full border border-violet-400/30 bg-violet-500/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-violet-300">
                obsessxdity
              </div>
              <div className="space-y-5">
                <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
                  Барлық музыка бір бетте
                </h1>
                <p className="max-w-2xl text-base text-zinc-300 sm:text-lg">
                  obsessxdity арқылы қазақ музыкасы мен futuristik beat-терді таңдаңыз. Басты бетке толық трек тізімі және жылдам тыңдау қосылды.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => featured && playTrack(featured, { queue: orderedTracks })}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 px-6 py-4 text-sm font-semibold text-black shadow-glow transition hover:scale-[1.02]"
                >
                  Тыңдауды бастау
                  <ArrowRight className="h-4 w-4" />
                </button>
                <Link
                  to="/assistant"
                  className="rounded-full border border-white/10 bg-white/5 px-6 py-4 text-sm font-semibold text-zinc-100 transition hover:border-violet-400/40 hover:bg-white/10"
                >
                  AI ұсыныстарын ашу
                </Link>
              </div>
            </div>

            <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/70 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.28em] text-zinc-400">Таңдаулы трек</div>
                  <div className="mt-3 text-2xl font-semibold text-white">{featured.title}</div>
                  <div className="mt-1 text-sm text-zinc-400">{featured.artist}</div>
                </div>
                <div className="h-20 w-20 overflow-hidden rounded-3xl bg-slate-800">
                  <TrackCover id={featured.id} title={featured.title} coverUrl={featured.coverUrl} className="h-full w-full" />
                </div>
              </div>
              <div className="mt-8 grid gap-3 text-sm text-zinc-300">
                <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3">Ең көп тыңдалған жанрлар</div>
                <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3">Жаңа қазақ тректер</div>
                <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3">AI генерацияланған ұсыныстар</div>
              </div>
            </div>
          </div>

          <section className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-[0.28em] text-zinc-400">Барлық әндер</div>
                <h2 className="text-2xl font-semibold text-white">Толық трек кітапханасы</h2>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-zinc-300">
                {tracks.length} трек</div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {tracks.map((track) => (
                <button
                  key={track.id}
                  onClick={() => playTrack(track, { queue: orderedTracks })}
                  className="group flex flex-col gap-4 rounded-[1.5rem] border border-white/10 bg-slate-900/80 p-5 text-left transition hover:-translate-y-1 hover:border-violet-400/40 hover:bg-slate-900/95"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-lg font-semibold text-white">{track.title}</div>
                      <div className="mt-1 text-sm text-zinc-400">{track.artist}</div>
                    </div>
                    <div className="rounded-2xl bg-violet-500/10 px-3 py-1 text-xs uppercase tracking-[0.18em] text-violet-300">{track.genre}</div>
                  </div>
                  <div className="text-sm text-zinc-400">{track.genre}</div>
                </button>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
