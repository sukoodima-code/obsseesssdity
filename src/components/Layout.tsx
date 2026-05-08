import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import PlayerBar from "./PlayerBar";
import TopBar from "./TopBar";
import { TRACKS, type Track } from "../data/mock";
import { useMood } from "../theme/MoodContext";

export default function Layout() {
  const { mood, themeVars, moodVibeClass, rain, setMood } = useMood();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tracks, setTracks] = useState<Track[]>(TRACKS);
  const [currentTrack, setCurrentTrack] = useState<Track>(TRACKS[0]);
  const location = useLocation();
  const autoPlay = location.pathname === "/reels";

  const orderedTracks = useMemo(() => {
    const preferredByMood: Record<typeof mood, Set<Track["genre"]>> = {
      chill: new Set(["lofi", "chill", "anime", "indie"]),
      energetic: new Set(["electronic", "phonk", "hiphop", "rock"]),
      sad: new Set(["chill", "lofi", "indie", "anime"]),
      focus: new Set(["lofi", "indie", "anime", "chill"])
    };

    const preferred = preferredByMood[mood];
    return [...tracks].sort((a, b) => {
      const sa = preferred.has(a.genre) ? 10 : 0;
      const sb = preferred.has(b.genre) ? 10 : 0;
      // Keep stable-ish ordering for predictable UI.
      return sb - sa || a.title.localeCompare(b.title);
    });
  }, [tracks, mood]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (tracks.length && !tracks.some((t) => t.id === currentTrack.id)) setCurrentTrack(tracks[0]);
  }, [currentTrack.id, tracks]);

  const mainPadBottom = useMemo(() => "pb-[92px] md:pb-[98px]", []);

  function addUploads(files: FileList, defaultGenre: Track["genre"]) {
    const now = Date.now();
    const added: Track[] = Array.from(files)
      .filter((f) => f.type.startsWith("audio/"))
      .map((f, i) => {
        const name = f.name.replace(/\.[^/.]+$/, "");
        const url = URL.createObjectURL(f);
        return {
          id: `u_${now}_${i}`,
          title: name || "Local Upload",
          artist: "Local Upload",
          coverUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&q=70",
          durationSec: 180,
          genre: defaultGenre,
          audioUrl: url
        };
      });

    if (!added.length) return;
    setTracks((prev) => [...added, ...prev]);
    setCurrentTrack(added[0]);
  }

  return (
    <div className={["min-h-dvh bg-ink-950 text-zinc-100", moodVibeClass].join(" ")} style={themeVars}>
      <div className={["pointer-events-none fixed inset-0 mood-bg", rain ? "mood-rain" : ""].join(" ")} />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-[1600px]">
        <Sidebar mood={mood} setMood={setMood} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar onMenu={() => setSidebarOpen(true)} />

          <main className={["min-w-0 flex-1", mainPadBottom].join(" ")}>
            <Outlet context={{ tracks: orderedTracks, currentTrack, setCurrentTrack, addUploads }} />
          </main>
        </div>
      </div>

      <PlayerBar
        tracks={orderedTracks}
        track={currentTrack}
        autoPlay={autoPlay}
        onNext={() => {
          const idx = orderedTracks.findIndex((t) => t.id === currentTrack.id);
          const next = orderedTracks[(idx + 1) % orderedTracks.length];
          if (next) setCurrentTrack(next);
        }}
        onPrev={() => {
          const idx = orderedTracks.findIndex((t) => t.id === currentTrack.id);
          const prev = orderedTracks[(idx - 1 + orderedTracks.length) % orderedTracks.length];
          if (prev) setCurrentTrack(prev);
        }}
      />
    </div>
  );
}

