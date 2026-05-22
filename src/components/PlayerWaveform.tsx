import { cn } from "../lib/cn";

export default function PlayerWaveform({
  active,
  bars = 12,
  className
}: {
  active: boolean;
  bars?: number;
  className?: string;
}) {
  return (
    <div className={cn("flex h-8 items-end justify-center gap-[3px]", className)} aria-hidden>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "w-[3px] rounded-full bg-gradient-to-t from-neon-crimson to-neon-purple transition-opacity",
            active ? "opacity-100" : "opacity-40"
          )}
          style={{
            height: `${10 + (i % 5) * 4}px`,
            animation: active ? `waveBar 0.9s ease-in-out ${i * 0.06}s infinite alternate` : undefined
          }}
        />
      ))}
    </div>
  );
}
