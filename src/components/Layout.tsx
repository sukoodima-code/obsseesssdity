import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import PlayerBar from "./PlayerBar";
import TopBar from "./TopBar";
import { useMood } from "../theme/MoodContext";
import { usePlayer } from "../context/PlayerContext";

export default function Layout() {
  const { themeVars, moodVibeClass, rain } = useMood();
  const { orderedTracks, currentTrack, playTrack, addUploads } = usePlayer();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const mainPadBottom = useMemo(() => "pb-[100px] md:pb-[108px]", []);

  return (
    <div className={["min-h-[100dvh] bg-ink-950 text-zinc-100", moodVibeClass].join(" ")} style={themeVars}>
      <div className={["pointer-events-none fixed inset-0 mood-bg", rain ? "mood-rain" : ""].join(" ")} />
      <div className="pointer-events-none fixed -left-32 top-20 h-64 w-64 rounded-full bg-neon-purple/20 blur-[100px]" />
      <div className="pointer-events-none fixed -right-24 bottom-32 h-72 w-72 rounded-full bg-neon-crimson/15 blur-[110px]" />

      <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[1600px]">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex min-w-0 flex-1 flex-col">
          {location.pathname !== "/" ? <TopBar onMenu={() => setSidebarOpen(true)} /> : null}
          <main className={["min-w-0 flex-1", mainPadBottom].join(" ")}>
            <Outlet
              context={{
                tracks: orderedTracks,
                currentTrack,
                playTrack,
                setCurrentTrack: playTrack,
                addUploads
              }}
            />
          </main>
        </div>
      </div>

      <PlayerBar />
    </div>
  );
}
