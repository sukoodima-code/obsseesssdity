import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import TrackCover from "../components/TrackCover";
import { PLAYLISTS } from "../data/mock";
import { ChevronRight } from "lucide-react";

export default function PlaylistsPage() {
  return (
    <div className="px-4 py-6 md:px-6">
      <SectionHeader
        title="Плейлисттер"
        subtitle="Таңдаулы плейлисттер және арнайы микстер"
        right={
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200">
            {PLAYLISTS.length} плейлист
          </span>
        }
      />

      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PLAYLISTS.map((p) => (
          <Link
            key={p.id}
            to={`/playlists/${p.id}`}
            className="group glass flex items-center gap-4 rounded-3xl border border-white/10 p-4 transition hover:-translate-y-0.5 hover:border-neon-crimson/35 hover:bg-white/10 hover:shadow-glow"
          >
            <div className="h-16 w-16 overflow-hidden rounded-2xl border border-white/10">
              <TrackCover id={p.id} title={p.title} coverUrl={p.coverUrl} className="h-full w-full transition duration-500 group-hover:scale-[1.06]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold">{p.title}</div>
              <div className="mt-1 truncate text-xs text-zinc-400">{p.subtitle}</div>
            </div>
            <ChevronRight className="h-5 w-5 text-zinc-500 transition group-hover:text-neon-ember/90" />
          </Link>
        ))}
      </div>
    </div>
  );
}

