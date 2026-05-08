import { NavLink } from "react-router-dom";
import { Home, ListMusic, Sparkles, Tags, X, Skull, Clapperboard } from "lucide-react";
import { cn } from "../lib/cn";
import type { Mood } from "../theme/moods";
import { TELEGRAM_BOT_URL } from "../config";
import { Send } from "lucide-react";

const items = [
  { to: "/", label: "Home", icon: Home },
  { to: "/reels", label: "Reels", icon: Clapperboard },
  { to: "/playlists", label: "Playlists", icon: ListMusic },
  { to: "/genres", label: "Genres", icon: Tags },
  { to: "/assistant", label: "AI Assistant", icon: Sparkles }
];

export default function Sidebar({
  mood,
  setMood,
  open,
  onClose
}: {
  mood: Mood;
  setMood: (m: Mood) => void;
  open: boolean;
  onClose: () => void;
}) {
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
          "fixed left-0 top-0 z-50 h-dvh w-[280px] border-r border-white/10 bg-ink-950/70 backdrop-blur-xl transition md:sticky md:z-20 md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between gap-2 px-4 py-4 md:px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-black to-zinc-800 shadow-glow">
              <Skull className="h-6 w-6 text-zinc-300" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-wide">OBSESSXDIT</div>
              <div className="text-xs text-zinc-400">Y</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 transition hover:border-neon-purple/40 hover:bg-white/10 md:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="px-2 md:px-3">
          {items.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition",
                  "hover:bg-white/5 hover:shadow-[0_0_0_1px_rgba(168,85,247,.25)]",
                  isActive ? "bg-white/[0.07] shadow-glow" : "text-zinc-200"
                )
              }
            >
              <Icon className="h-5 w-5 text-neon-crimson/85 transition group-hover:text-neon-ember/90" />
              <span className="min-w-0 truncate">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-5 px-4 md:px-5">
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-4 shadow-[0_0_0_1px_rgba(34,211,238,.10)]">
            <div className="text-sm font-semibold">Your vibe</div>
            <div className="mt-1 text-xs text-zinc-400">
              Minimalistic UI, purple neon accents, немного аниме вайба.
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <MoodBtn label="Chill" active={mood === "chill"} onClick={() => setMood("chill")} />
              <MoodBtn label="Energetic" active={mood === "energetic"} onClick={() => setMood("energetic")} />
              <MoodBtn label="Sad" active={mood === "sad"} onClick={() => setMood("sad")} />
              <MoodBtn label="Focus" active={mood === "focus"} onClick={() => setMood("focus")} />
            </div>
          </div>

          <a
            href={TELEGRAM_BOT_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-4 block rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-semibold transition hover:border-neon-ember/40 hover:bg-white/10"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-neon-crimson/70 to-neon-ember/30 shadow-glow">
                  <Send className="h-5 w-5 text-black" />
                </span>
                <span>Telegram AI Bot</span>
              </div>
              <span className="text-xs text-zinc-400">open</span>
            </div>
          </a>
        </div>
      </aside>
    </>
  );
}

function MoodBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-xl border px-2 py-2 text-[11px] font-semibold transition",
        active
          ? "border-white/10 bg-white/5 shadow-[0_0_0_1px_rgba(255,0,51,.20),0_0_18px_rgba(239,68,68,.10),0_0_36px_rgba(168,85,247,.06)]"
          : "border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10"
      )}
    >
      {label}
    </button>
  );
}

