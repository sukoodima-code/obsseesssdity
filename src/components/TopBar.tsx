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
    <header className="sticky top-0 z-30 border-b border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="flex items-center gap-3 px-4 py-3 md:px-6">
        <button
          onClick={onMenu}
          className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 transition hover:border-neon-purple/40 hover:bg-white/10 md:hidden"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className={cn("glass flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-white/10 px-3 py-2", glow)}>
          <Search className="h-4 w-4 text-neon-ember/80" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="What do you want to listen to?"
            className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-400 outline-none"
          />
          <span className="hidden text-xs text-zinc-400 md:inline">Ctrl K</span>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-black to-zinc-800 shadow-glow">
            <Skull className="h-5 w-5 text-zinc-300" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-medium">Owner</div>
            <div className="text-xs text-zinc-400">Premium (mock)</div>
          </div>
        </div>
      </div>
    </header>
  );
}

