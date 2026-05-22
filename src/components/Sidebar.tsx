import { NavLink } from "react-router-dom";
import { BarChart3, Clapperboard, Heart, Home, ListMusic, Music, Send, Sparkles, Tags, X } from "lucide-react";
import { cn } from "../lib/cn";
import { usePlayer } from "../context/PlayerContext";
import TrackCover from "./TrackCover";

const items = [
  { to: "/", label: "Басты бет", icon: Home },
  { to: "/genres", label: "Жанрлар", icon: Tags },
  { to: "/playlists", label: "Ойнату тізімдері", icon: ListMusic },
  { to: "/assistant", label: "AI Көмекші", icon: Sparkles },
  { to: "/reels", label: "Рилс", icon: Clapperboard },
  { to: "/favorites", label: "Таңдаулылар", icon: Heart },
  { to: "/statistics", label: "Статистика", icon: BarChart3 },
  { to: "/telegram", label: "Telegram бот", icon: Send }
];

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { orderedTracks, currentTrack, playTrack, isPlaying } = usePlayer();
  const sidebarTracks = orderedTracks.slice(0, 8);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition md:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden
      />

      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-[100dvh] w-[280px] overflow-y-auto border-r border-white/10 bg-black/85 pb-28 backdrop-blur-xl transition md:sticky md:z-20 md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between gap-2 px-4 py-5 md:px-5">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-3xl bg-gradient-to-br from-neon-purple to-neon-cyan text-white shadow-glow">
              <Music className="h-6 w-6" />
            </div>
            <div>
              <div className="text-lg font-semibold tracking-[0.08em] text-white">obsessxdity</div>
              <div className="text-xs text-zinc-400">AI музыкалық сервисі</div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 transition hover:border-neon-purple/40 hover:bg-white/10 md:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-6 px-2 md:px-3">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "group mb-1 flex items-center gap-3 rounded-3xl px-4 py-3 text-sm font-medium transition",
                  isActive
                    ? "bg-gradient-to-br from-neon-purple to-neon-cyan text-black shadow-glow"
                    : "text-zinc-300 hover:bg-white/5 hover:text-white"
                )
              }
            >
              <Icon className="h-5 w-5 shrink-0" />
              <span className="min-w-0 truncate">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 px-3">
          <div className="mb-3 text-xs uppercase tracking-[0.28em] text-zinc-500">Барлық әндер</div>
          <div className="space-y-1.5">
            {sidebarTracks.map((track) => {
              const active = currentTrack.id === track.id;
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => playTrack(track, { queue: orderedTracks })}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-2xl border px-2.5 py-2 text-left transition",
                    active
                      ? "border-neon-purple/40 bg-neon-purple/10 shadow-glow"
                      : "border-white/10 bg-white/5 hover:border-neon-purple/25 hover:bg-white/10"
                  )}
                >
                  <TrackCover id={track.id} title={track.title} coverUrl={track.coverUrl} className="h-9 w-9 shrink-0 rounded-xl" />
                  <div className="min-w-0 flex-1">
                    <div className={cn("truncate text-sm font-medium", active ? "text-white" : "text-zinc-200")}>
                      {track.title}
                    </div>
                    <div className="truncate text-xs text-zinc-500">{track.artist}</div>
                  </div>
                  {active && isPlaying ? (
                    <span className="h-2 w-2 shrink-0 animate-pulse rounded-full bg-neon-cyan shadow-glow" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
