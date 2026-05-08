export type Mood = "chill" | "energetic" | "sad" | "focus";

export const moods: Record<
  Mood,
  {
    label: string;
    primaryRgb: string; // "r,g,b"
    secondaryRgb: string; // "r,g,b"
    rain: boolean;
    vibe: "smooth" | "fast" | "blur";
  }
> = {
  chill: {
    label: "Chill",
    primaryRgb: "59,130,246",
    secondaryRgb: "168,85,247",
    rain: false,
    vibe: "smooth"
  },
  energetic: {
    label: "Energetic",
    primaryRgb: "239,68,68",
    secondaryRgb: "255,0,51",
    rain: false,
    vibe: "fast"
  },
  sad: {
    label: "Sad",
    primaryRgb: "107,114,128",
    secondaryRgb: "31,41,55",
    rain: true,
    vibe: "blur"
  },
  focus: {
    label: "Focus",
    primaryRgb: "34,211,238",
    secondaryRgb: "74,222,128",
    rain: false,
    vibe: "smooth"
  }
};

