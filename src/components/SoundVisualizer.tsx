import { useMemo } from "react";

export default function SoundVisualizer() {
  const bars = useMemo(
    () =>
      Array.from({ length: 14 }, (_, idx) => ({
        delay: `${(idx * 0.06).toFixed(2)}s`,
        height: 12 + Math.round(18 * Math.abs(Math.sin((idx + 1) * 0.7)))
      })),
    []
  );

  return (
    <div className="rounded-3xl border border-white/10 bg-black/20 p-5">
      <div className="text-xs uppercase tracking-[0.28em] text-zinc-400">Visual wave</div>
      <div className="mt-3 flex items-end justify-between gap-2">
        {bars.map((bar, index) => (
          <span
            key={index}
            className="block w-2 rounded-full bg-gradient-to-t from-neon-cyan to-neon-purple"
            style={{
              height: `${bar.height}px`,
              animation: `waveBar 1.05s ease-in-out ${bar.delay} infinite alternate`
            }}
          />
        ))}
      </div>
    </div>
  );
}
