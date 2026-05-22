import { useMemo, useState } from "react";
import { cn } from "../lib/cn";

function hueFromId(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h + id.charCodeAt(i) * 17) % 360;
  return h;
}

export default function TrackCover({
  id,
  title,
  coverUrl,
  className
}: {
  id: string;
  title: string;
  coverUrl?: string;
  className?: string;
}) {
  const [broken, setBroken] = useState(false);
  const hue = hueFromId(id);
  const letter = (title.trim()[0] || "?").toUpperCase();

  const resolvedSrc = useMemo(() => {
    if (!coverUrl) return undefined;
    if (coverUrl.startsWith("/")) {
      return `${import.meta.env.BASE_URL}${coverUrl.slice(1)}`;
    }
    return coverUrl;
  }, [coverUrl]);

  const fallbackStyle = {
    backgroundImage: `linear-gradient(135deg, hsl(${hue} 78% 42%), hsl(${(hue + 50) % 360} 72% 30%))`
  };

  const wrapperClass = cn(
    "relative overflow-hidden rounded-3xl shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]",
    "bg-slate-950/90 text-white ring-1 ring-white/5",
    className
  );

  if (!resolvedSrc || broken) {
    return (
      <div className={wrapperClass} style={fallbackStyle} aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/35" />
        <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 px-3 py-3 text-center">
          <span className="text-2xl">🎵</span>
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/80">{letter}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClass} style={fallbackStyle}>
      <img
        src={resolvedSrc}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out"
        loading="lazy"
        decoding="async"
        onError={() => setBroken(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/30" />
    </div>
  );
}
