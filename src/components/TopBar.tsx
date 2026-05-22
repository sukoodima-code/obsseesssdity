import { Search, Menu, Skull } from "lucide-react";
import { useMemo, useState } from "react";
import { cn } from "../lib/cn";

export default function TopBar({ onMenu }: { onMenu: () => void }) {
  const [query, setQuery] = useState("");
  const glow = useMemo(
    () => "shadow-[0_0_0_1px_rgba(255,0,51,.18),0_0_24px_rgba(239,68,68,.10)]",
    []
  );

  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-black/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-4 py-4 md:px-6">
        <button
          onClick={onMenu}
          className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-2 transition hover:border-neon-purple/40 hover:bg-white/10 md:hidden"
          aria-label="Мәзірді ашу"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="rounded-3xl border border-white/10 bg-black/40 px-4 py-3 text-sm font-semibold tracking-[0.18em] text-zinc-100 shadow-glow">
            FUTURISTIC STREAM
          </div>
          <div className={cn("glass flex min-w-0 flex-1 items-center gap-3 rounded-3xl border border-white/10 px-4 py-3", glow)}>
            <Search className="h-4 w-4 text-neon-ember/80" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Қандай әуен іздеп жүрсіз?"
              className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-400 outline-none"
            />
            <span className="hidden text-xs uppercase tracking-[0.2em] text-zinc-400 md:inline">Ctrl K</span>
          </div>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-xs uppercase tracking-[0.24em] text-neon-ember">
            Live Mix
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-3xl bg-gradient-to-br from-black to-zinc-800 shadow-glow">
            <Skull className="h-5 w-5 text-zinc-300" />
          </div>
        </div>
      </div>
    </header>
  );
}

