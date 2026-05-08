import { cn } from "../lib/cn";

export default function GenreChips({
  genres,
  active,
  onChange
}: {
  genres: { id: string; label: string }[];
  active: string;
  onChange: (g: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map((g) => (
        <Chip key={g.id} label={g.label} active={active === g.id} onClick={() => onChange(g.id)} />
      ))}
    </div>
  );
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-medium transition",
        active
          ? "border-neon-crimson/50 bg-neon-crimson/15 text-neon-crimson shadow-[0_0_0_1px_rgba(255,0,51,.14),0_0_18px_rgba(239,68,68,.10)]"
          : "border-white/10 bg-white/5 text-zinc-200 hover:border-neon-ember/35 hover:bg-white/8"
      )}
    >
      {label}
    </button>
  );
}

