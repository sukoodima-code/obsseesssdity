import { Link, useParams } from "react-router-dom";
import { PLAYLISTS, getTrackById, type Track } from "../data/mock";
import SectionHeader from "../components/SectionHeader";
import TrackCover from "../components/TrackCover";
import { ArrowLeft, Play } from "lucide-react";
import { cn } from "../lib/cn";
import { usePlayer } from "../context/PlayerContext";

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function PlaylistDetailPage() {
  const { playlistId } = useParams();
  const { playTrack } = usePlayer();

  const playlist = PLAYLISTS.find((p) => p.id === playlistId);
  if (!playlist) {
    return (
      <div className="px-4 py-6 md:px-6">
        <SectionHeader title="Плейлист табылмады" subtitle="Бұл тек макет маршрут." />
        <div className="mt-4">
          <Link className="text-neon-cyan hover:underline" to="/playlists">
            Плейлисттерге қайту
          </Link>
        </div>
      </div>
    );
  }

  const tracks = playlist.trackIds.map(getTrackById).filter(Boolean) as Track[];
  const totalSec = tracks.reduce((acc, t) => acc + t.durationSec, 0);

  return (
    <div className="px-4 py-6 md:px-6">
      <div className="mb-4">
        <Link
          to="/playlists"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 transition hover:border-neon-purple/35 hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      <div className="glass overflow-hidden rounded-3xl border border-white/10 p-5 shadow-[0_0_0_1px_rgba(168,85,247,.12)] md:p-7">
        <div className="flex flex-col gap-5 md:flex-row md:items-end">
          <div className="relative h-44 w-44 overflow-hidden rounded-3xl border border-white/10 md:h-52 md:w-52">
            <TrackCover id={playlist.id} title={playlist.title} coverUrl={playlist.coverUrl} className="h-full w-full" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="text-xs text-zinc-400">ПЛЕЙЛИСТ</div>
            <h1 className="mt-1 truncate text-2xl font-semibold tracking-tight md:text-3xl">
              {playlist.title}
            </h1>
            <div className="mt-2 text-sm text-zinc-400">{playlist.subtitle}</div>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
              <span>{tracks.length} трек</span>
              <span>•</span>
              <span>{Math.round(totalSec / 60)} мин</span>
            </div>
          </div>

          <button
            onClick={() => tracks[0] && playTrack(tracks[0], { queue: tracks, autoPlay: true })}
            className={cn(
              "inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold",
              "bg-gradient-to-br from-neon-purple to-neon-cyan text-black shadow-glow transition hover:scale-[1.02] active:scale-[0.99]"
            )}
          >
            <Play className="h-5 w-5" />
            Ойнату
          </button>
        </div>
      </div>

      <div className="mt-6">
        <SectionHeader title="Тректер" subtitle="Қатарды шертіп, макет ойнатқышында тыңдаңыз." />

        <div className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
          <div className="grid grid-cols-[40px_1fr_90px] gap-3 border-b border-white/10 px-4 py-3 text-xs text-zinc-500 md:grid-cols-[44px_1fr_140px] md:px-5">
            <div>#</div>
            <div>Атауы</div>
            <div className="text-right">Уақыты</div>
          </div>

          {tracks.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => playTrack(t, { queue: tracks, autoPlay: true })}
              className="grid w-full grid-cols-[40px_1fr_90px] items-center gap-3 px-4 py-3 text-left transition hover:bg-white/5 md:grid-cols-[44px_1fr_140px] md:px-5"
            >
              <div className="text-xs text-zinc-500">{idx + 1}</div>
              <div className="flex min-w-0 items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-2xl border border-white/10">
                  <TrackCover id={t.id} title={t.title} coverUrl={t.coverUrl} className="h-full w-full" />
                </div>
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{t.title}</div>
                  <div className="truncate text-xs text-zinc-400">{t.artist}</div>
                </div>
              </div>
              <div className="text-right text-xs text-zinc-500">{fmt(t.durationSec)}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

