import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Mood } from "./moods";
import { moods } from "./moods";

type MoodContextValue = {
  mood: Mood;
  setMood: (m: Mood) => void;
  themeVars: React.CSSProperties;
  moodVibeClass: string;
  rain: boolean;
};

const MoodContext = createContext<MoodContextValue | null>(null);

export function MoodProvider({ children }: { children: ReactNode }) {
  const [mood, setMood] = useState<Mood>(() => {
    const saved = localStorage.getItem("ai-music-mood");
    if (saved === "chill" || saved === "energetic" || saved === "sad" || saved === "focus") return saved;
    return "energetic";
  });

  useEffect(() => {
    localStorage.setItem("ai-music-mood", mood);
  }, [mood]);

  const ctx = useMemo<MoodContextValue>(() => {
    const theme = moods[mood];
    return {
      mood,
      setMood,
      themeVars: {
        ["--mood-primary-rgb" as any]: theme.primaryRgb,
        ["--mood-secondary-rgb" as any]: theme.secondaryRgb
      } as React.CSSProperties,
      moodVibeClass: `mood-vibe-${theme.vibe}`,
      rain: theme.rain
    };
  }, [mood]);

  return <MoodContext.Provider value={ctx}>{children}</MoodContext.Provider>;
}

export function useMood() {
  const v = useContext(MoodContext);
  if (!v) throw new Error("useMood must be used inside MoodProvider");
  return v;
}

