import { useMemo, useState } from "react";
import GenreChips from "../components/GenreChips";
import MusicCard from "../components/MusicCard";
import SectionHeader from "../components/SectionHeader";
import { GENRES, type Genre, type Track } from "../data/mock";
import { useOutletContext } from "react-router-dom";
import { filterByGenre } from "../music/filter";
import { Bolt, Globe2, Heart, Repeat, SlidersHorizontal, Upload } from "lucide-react";

type Ctx = {
  tracks: Track[];
  currentTrack: Track;
  setCurrentTrack: (t: Track) => void;
  addUploads: (files: FileList, defaultGenre: Track["genre"]) => void;
};

export default function HomePage() {
  const { tracks, currentTrack, setCurrentTrack, addUploads } = useOutletContext<Ctx>();
  const [selectedGenre, setSelectedGenre] = useState<"all" | Genre>("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const byGenre = filterByGenre(tracks, selectedGenre);
    const query = q.trim().toLowerCase();
    if (!query) return byGenre;
    return byGenre.filter((t) => t.title.toLowerCase().includes(query) || t.artist.toLowerCase().includes(query));
  }, [q, selectedGenre, tracks]);

  const recent = filtered.slice(0, 4).length ? filtered.slice(0, 4) : tracks.slice(0, 4);
  const mix = filtered.slice(4, 8).length ? filtered.slice(4, 8) : filtered.slice(0, 4);
  const featured = filtered.slice(0, 5).length ? filtered.slice(0, 5) : tracks.slice(0, 5);

  return (
    <div className="px-4 py-6 md:px-6">
      <div className="grid gap-6 xl:grid-cols-[1.75fr_0.95fr]">
        <div className="space-y-6">
          <div className="glass overflow-hidden rounded-3xl border border-white/10 p-5 shadow-[0_0_0_1px_rgba(168,85,247,.12)] md:p-7">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-neon-crimson/25 bg-neon-crimson/10 px-3 py-1 text-xs text-neon-crimson">
                  Более стильная страница, как на скриншоте
                </div>
                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  Обсессивный диджитал и музыка, что играет прямо сейчас.
                </h1>
                <p className="mt-3 text-sm text-zinc-400">
                  Больше карточек, больше секций и прозрачный dark-style интерфейс, похожий на экран обложки.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200">dark mode</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200">playlists</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200">soundcloud-style</span>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
              <div className="space-y-4">
                <div className="grid gap-3 md:grid-cols-[1fr_auto]">
                  <GenreChips genres={GENRES} active={selectedGenre} onChange={(id) => setSelectedGenre(id as "all" | Genre)} />
                  <div className="glass flex items-center gap-2 rounded-2xl border border-white/10 px-3 py-2">
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Поиск: трек или артист..."
                      className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-400 outline-none"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-300">playable interface</div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-zinc-300">dark station</div>
                </div>
              </div>

              <label className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-neon-ember/25 bg-neon-ember/10 px-4 py-3 text-xs font-semibold text-neon-ember transition hover:border-neon-ember/40 hover:bg-neon-ember/15">
                <Upload className="h-4 w-4" />
                Upload music
                <input
                  type="file"
                  accept="audio/*"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    const files = e.currentTarget.files;
                    if (!files) return;
                    const genre = selectedGenre === "all" ? "indie" : selectedGenre;
                    addUploads(files, genre);
                    e.currentTarget.value = "";
                  }}
                />
              </label>
            </div>
          </div>

          <section className="glass overflow-hidden rounded-3xl border border-white/10 p-5 shadow-[0_0_0_1px_rgba(168,85,247,.12)]">
            <SectionHeader
              title="More of what you like"
              subtitle="Коллекция треков в стиле Obsessxdity"
              right={<span className="text-xs text-zinc-500">{filtered.length} tracks</span>}
            />
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
              {featured.map((track) => (
                <MusicCard key={track.id} track={track} onPlay={setCurrentTrack} />
              ))}
            </div>
          </section>

          <div className="grid gap-5 lg:grid-cols-[1.07fr_0.93fr]">
            <div className="glass overflow-hidden rounded-3xl border border-white/10 p-5 shadow-[0_0_0_1px_rgba(168,85,247,.12)]">
              <SectionHeader title="Recently played" subtitle="Последние треки, которые ты слушал" />
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {recent.map((track) => (
                  <MusicCard key={track.id} track={track} onPlay={setCurrentTrack} />
                ))}
              </div>
            </div>

            <div className="glass overflow-hidden rounded-3xl border border-white/10 p-5 shadow-[0_0_0_1px_rgba(168,85,247,.12)]">
              <SectionHeader title={`Mixed for ${currentTrack.artist}`} subtitle="Сборник треков, подобранный под ваш стиль" />
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-2">
                {mix.map((track) => (
                  <MusicCard key={track.id} track={track} onPlay={setCurrentTrack} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="sticky top-24 space-y-4">
            <div className="glass overflow-hidden rounded-3xl border border-white/10 p-5 shadow-[0_0_0_1px_rgba(168,85,247,.12)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">Artist tools</div>
                  <div className="mt-1 text-xs text-zinc-500">Инструменты для трека и дистрибуции</div>
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] uppercase text-zinc-300">Pro</span>
              </div>
              <div className="mt-5 grid gap-3">
                <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-3">
                  <span className="grid h-10 w-10 place-items-center rounded-3xl bg-neon-crimson/15 text-neon-crimson">
                    <Bolt className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold">Amplify</div>
                    <div className="text-xs text-zinc-500">Push your sound further</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-3">
                  <span className="grid h-10 w-10 place-items-center rounded-3xl bg-neon-cyan/15 text-neon-cyan">
                    <Repeat className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold">Replace</div>
                    <div className="text-xs text-zinc-500">Swap beats in a click</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-3">
                  <span className="grid h-10 w-10 place-items-center rounded-3xl bg-neon-ember/15 text-neon-ember">
                    <Globe2 className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold">Distribute</div>
                    <div className="text-xs text-zinc-500">Release worldwide</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-3">
                  <span className="grid h-10 w-10 place-items-center rounded-3xl bg-neon-purple/15 text-neon-purple">
                    <SlidersHorizontal className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold">Master</div>
                    <div className="text-xs text-zinc-500">Polish the final mix</div>
                  </div>
                </div>
              </div>
              <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-zinc-300">
                Unlock Artist tools from €2.99/month.
              </div>
            </div>

            <div className="glass overflow-hidden rounded-3xl border border-white/10 p-5 shadow-[0_0_0_1px_rgba(168,85,247,.12)]">
              <SectionHeader title="New tracks" subtitle="Свежее за сегодня" />
              <div className="mt-4 space-y-3">
                {tracks.slice(0, 4).map((track) => (
                  <button
                    key={track.id}
                    onClick={() => setCurrentTrack(track)}
                    className="group flex w-full items-center gap-3 rounded-3xl border border-white/10 bg-black/40 p-3 text-left transition hover:border-neon-purple/30 hover:bg-white/5"
                  >
                    <img src={track.coverUrl} alt="" className="h-12 w-12 rounded-2xl object-cover" />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{track.title}</div>
                      <div className="truncate text-xs text-zinc-500">{track.artist}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="glass overflow-hidden rounded-3xl border border-white/10 p-5 shadow-[0_0_0_1px_rgba(168,85,247,.12)]">
              <SectionHeader title="Artists you should follow" subtitle="Свежие имена в ленте" />
              <div className="mt-4 space-y-3">
                {tracks.slice(0, 3).map((track) => (
                  <div key={track.id} className="flex items-center justify-between gap-3 rounded-3xl border border-white/10 bg-black/40 px-3 py-3">
                    <div className="flex items-center gap-3">
                      <img src={track.coverUrl} alt="" className="h-11 w-11 rounded-full object-cover" />
                      <div>
                        <div className="text-sm font-semibold">{track.artist}</div>
                        <div className="text-xs text-zinc-500">{track.genre}</div>
                      </div>
                    </div>
                    <button className="rounded-2xl border border-neon-cyan/20 bg-neon-cyan/10 px-3 py-2 text-[11px] font-semibold text-neon-cyan transition hover:bg-neon-cyan/15">
                      Follow
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass overflow-hidden rounded-3xl border border-white/10 p-5 shadow-[0_0_0_1px_rgba(168,85,247,.12)]">
              <SectionHeader title="366 likes" subtitle="Популярные треки твоей ленты" />
              <div className="mt-4 space-y-3">
                {tracks.slice(0, 2).map((track) => (
                  <button
                    key={track.id}
                    onClick={() => setCurrentTrack(track)}
                    className="group flex w-full items-center gap-3 rounded-3xl border border-white/10 bg-black/40 px-3 py-3 text-left transition hover:border-neon-purple/30 hover:bg-white/5"
                  >
                    <img src={track.coverUrl} alt="" className="h-12 w-12 rounded-2xl object-cover" />
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{track.title}</div>
                      <div className="truncate text-xs text-zinc-500">{track.artist}</div>
                    </div>
                    <Heart className="h-4 w-4 text-neon-crimson" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

