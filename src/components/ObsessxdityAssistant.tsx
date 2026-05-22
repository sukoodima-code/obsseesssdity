import { useEffect, useMemo, useRef, useState } from "react";
import { aiChat } from "../lib/aiApi";
import { TRACKS, type Track } from "../data/mock";

type GeneratedTrack = {
  id: string;
  title: string;
  artist: string;
  genre: string;
  mood: string;
  bpm: number;
  key: string;
  duration: string;
  emoji: string;
  description: string;
  sourceTrackId: string;
};

type Props = {
  onPlay?: (track: Track) => void;
  playingTrackId?: string;
};

const styleChips = [
  { label: "lofi chill", value: "lofi chill" },
  { label: "phonk", value: "phonk aggressive" },
  { label: "anime", value: "anime emotional" },
  { label: "қазақ дәстүрлі", value: "қазақ дәстүрлі" },
  { label: "EDM", value: "edm dance" },
  { label: "hip-hop", value: "hip hop rap" },
  { label: "dark ambient", value: "dark ambient" },
  { label: "jazz", value: "jazz smooth" }
];

const loadingMessages = [
  "AI музыка генерациялауда...",
  "Мелодия сызықтары жасалуда...",
  "Ритм паттерндері анықталуда...",
  "Микширлеу жүргізілуде...",
  "Дыбыстарды балансқа келтіруде...",
  "Трек аяқталуда..."
];

const getRandomFrom = <T,>(items: T[]) => items[Math.floor(Math.random() * items.length)];

const styleGenreMap: Record<string, string[]> = {
  kazakh: ["Домбыра Fusion", "Folk", "Қазақша Lo-Fi", "Indie Qazaq"],
  phonk: ["Phonk Qazaq", "Trap", "Hip-Hop", "Night Drive"],
  edm: ["Electronic", "Synthwave", "Trap"],
  lofi: ["Қазақша Lo-Fi", "Chillwave", "Study Beats", "Relax"],
  anime: ["Chillwave", "Electronic", "Cinematic", "Sad Vibes"],
  ambient: ["Ambient", "Cinematic", "Night Drive"],
  generic: ["Chillwave", "Electronic", "Indie Qazaq", "Q-pop"]
};

function pickCatalogTrack(styleName: string, index: number): Track {
  const genres = styleGenreMap[styleName] || styleGenreMap.generic;
  const pool = TRACKS.filter((t) => genres.includes(t.genre));
  const list = pool.length ? pool : TRACKS;
  return list[index % list.length] ?? TRACKS[index % TRACKS.length];
}

function buildDemoTracks(prompt: string, selectedStyle: string): GeneratedTrack[] {
  const normalized = `${prompt} ${selectedStyle}`.toLowerCase();
  const styleMatchers = [
    {
      name: "kazakh",
      keys: ["казақ", "kazakh", "домбыра", "qazaq", "қазақ"],
      titles: ["Дала Аңқымасы", "Жел Сарыны", "Түнгі Дала", "Саз Шары"],
      genres: ["Қазақ Fusion", "Қазақ Electronic", "Домбыра Future"],
      mood: "Soulful",
      emojis: ["🎻", "🌙", "✨"],
      description: "Қазақ дәстүрі мен futuristik beat-тің үйлесімі."
    },
    {
      name: "phonk",
      keys: ["phonk", "trap", "gym"],
      titles: ["Night Rider", "Dark Energy", "Trap Pulse", "Low Light"],
      genres: ["Dark Phonk", "Trap", "Midnight Bass"],
      mood: "Energetic",
      emojis: ["💀", "⚡", "🔥"],
      description: "Қатты 808 және түнгі қала ритмі."
    },
    {
      name: "edm",
      keys: ["edm", "dance", "pop", "electro"],
      titles: ["Neon Pulse", "Glow Rush", "Skyline Beat", "Club Motion"],
      genres: ["EDM", "Dance", "Future Pop"],
      mood: "Hype",
      emojis: ["🎧", "✨", "🌃"],
      description: "Жарық синтезаторлар мен би ритмі."
    },
    {
      name: "lofi",
      keys: ["lofi", "chill", "study", "relax"],
      titles: ["Midnight Drift", "Rain Memory", "Soft Loop", "Candle Glow"],
      genres: ["Lofi Chill", "Chillwave", "Study Beats"],
      mood: "Calm",
      emojis: ["🌧️", "🎵", "🌌"],
      description: "Жылы lo-fi атмосферасы мен жұмсақ текстура."
    },
    {
      name: "anime",
      keys: ["anime", "emotional", "nostalgic"],
      titles: ["Sky Journey", "Dream Arcade", "Pixel Wishes", "Moonlight Pulse"],
      genres: ["Anime Pop", "Emotional EDM"],
      mood: "Dreamy",
      emojis: ["🌸", "💫", "✨"],
      description: "Эмоциялық melodic atmosphere және сиқырлы әуен."
    },
    {
      name: "ambient",
      keys: ["ambient", "dark", "rain", "space"],
      titles: ["Void Echo", "Aether Drift", "Deep Haze", "Silence Wave"],
      genres: ["Dark Ambient", "Space Chill", "Ethereal"],
      mood: "Relaxed",
      emojis: ["🌫️", "🌌", "🎚️"],
      description: "Тыныш синтез және кеңістік атмосферасы."
    }
  ];

  const fallback = {
    name: "generic",
    keys: [] as string[],
    titles: ["Moonlight Drive", "Aurora Pulse", "Skyline Dream", "City Lights"],
    genres: ["Future Pop", "Chillwave", "Electronic"],
    mood: "Dreamy",
    emojis: ["✨", "🎧", "🌌"],
    description: "Жалпы жеңіл әрі футуристік музыка."
  };
  const match = styleMatchers.find((item) => item.keys.some((key) => normalized.includes(key))) || fallback;
  const candidates = match.titles.slice();
  const tracks: GeneratedTrack[] = [];

  while (tracks.length < 4 && candidates.length > 0) {
    const index = Math.floor(Math.random() * candidates.length);
    const title = candidates.splice(index, 1)[0];
    const catalog = pickCatalogTrack(match.name, tracks.length);
    const durationSec = catalog.durationSec || 30;
    tracks.push({
      id: `gen-${match.name}-${title.replace(/\s+/g, "-").toLowerCase()}`,
      title,
      artist: getRandomFrom(["OBSESSXDITY", "Aru Wave", "Soley Nazar", "Neon Nomad"]),
      genre: getRandomFrom(match.genres),
      mood: match.mood,
      bpm: match.name === "phonk" ? 150 : match.name === "edm" ? 132 : 88,
      key: match.name === "kazakh" ? "A minor" : "F minor",
      duration: `${Math.floor(durationSec / 60)}:${String(durationSec % 60).padStart(2, "0")}`,
      emoji: getRandomFrom(match.emojis),
      description: match.description,
      sourceTrackId: catalog.id
    });
  }

  return tracks;
}

function createLyrics(prompt: string, instrumental: boolean) {
  if (instrumental) return "[Инструментальды трек]";

  const isKazakh = /казақ|домбыра|қазақ/i.test(prompt);
  const verse1 = isKazakh
    ? "[Verse 1]\nТүнгі далада үн бар, жүрекке жетер жол\nAI әуенімен бірге алысқа сан\nЖел сыбыры мен домбыра үнін қамтып\nӨмір мен болашақты бір толқынға тоқтырам"
    : "[Verse 1]\nNight streets hum with neon soul, a path to find\nAI waves carry hearts into the night\nWind whispers through the synth and drum combined\nThis obsession lifts us toward the light";
  const verse2 = isKazakh
    ? "[Verse 2]\nҚала шамдарында арман жанары жанып\nЖыр мен дыбыс екеуі бірге көкте қалықтап\nOBSESSXDITY-тің дәл осы сәті мәңгілік\nЖүректі тербетіп, жанды үнмен оятады"
    : "[Verse 2]\nNeon lights and midnight streets collide\nSynths and heartbeat racing side by side\nAI made melody leaving city pride\nThis obsession feeds the endless vibe";
  const chorus = isKazakh
    ? "[Chorus]\nOBSESSXDITY, зависимость\nМузыка жаны — мәңгі\nAI мен адам бірге жасайды\nЖаңа дүние, жаңа ән"
    : "[Chorus]\nFeel the neon in the night\nLet the rhythm take the drive\nAI dreams in city lights\nWe will keep this sound alive";

  return `${verse1}\n\n${chorus}\n\n${verse2}`;
}

export default function ObsessxdityAssistant({ onPlay, playingTrackId }: Props) {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [instrumental, setInstrumental] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tracks, setTracks] = useState<GeneratedTrack[]>([]);
  const [lyrics, setLyrics] = useState("");
  const [styleTags, setStyleTags] = useState<string[]>([]);
  const [promptUsed, setPromptUsed] = useState("");
  const [visible, setVisible] = useState(false);
  const [activeTrackIndex, setActiveTrackIndex] = useState<number | null>(null);
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0]);
  const loadingRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (loadingRef.current) window.clearInterval(loadingRef.current);
    };
  }, []);

  const chips = useMemo(() => styleChips, []);
  const effectivePrompt = useMemo(() => [prompt, selectedStyle].filter(Boolean).join(", "), [prompt, selectedStyle]);

  function toggleChip(value: string) {
    setSelectedStyle((prev) => (prev === value ? "" : value));
  }

  function resolveCatalogTrack(gen: GeneratedTrack): Track | undefined {
    return TRACKS.find((t) => t.id === gen.sourceTrackId);
  }

  function playTrack(idx: number, list = tracks) {
    const gen = list[idx];
    if (!gen) return;
    const catalog = resolveCatalogTrack(gen);
    if (!catalog?.audioUrl) return;
    setActiveTrackIndex(idx);
    onPlay?.(catalog);
  }

  async function generate() {
    if (!prompt.trim() && !selectedStyle) return;

    const fullPrompt = effectivePrompt || "AI музыка генерациясы";
    setPromptUsed(fullPrompt);
    setLoading(true);
    setVisible(false);
    setTracks([]);
    setLyrics("");
    setStyleTags(Array.from(new Set(fullPrompt.split(/[ ,]+/).filter(Boolean))).slice(0, 4));
    setLoadingMessage(getRandomFrom(loadingMessages));

    if (loadingRef.current) window.clearInterval(loadingRef.current);
    loadingRef.current = window.setInterval(() => {
      setLoadingMessage(getRandomFrom(loadingMessages));
    }, 1200);

    await new Promise((resolve) => setTimeout(resolve, 900 + Math.random() * 900));

    let chatText = "";
    try {
      const chat = await aiChat(fullPrompt, [{ role: "user", text: fullPrompt }]);
      if (chat?.text) chatText = chat.text;
    } catch {
      chatText = "AI серверіне қосылу мүмкін болмады. Демо-тректер көрсетілді.";
    }

    if (loadingRef.current) {
      window.clearInterval(loadingRef.current);
      loadingRef.current = null;
    }

    const demo = buildDemoTracks(fullPrompt, selectedStyle);
    setTracks(demo);
    setLyrics(createLyrics(fullPrompt, instrumental));
    setVisible(true);
    setLoading(false);
    setLoadingMessage(chatText || getRandomFrom(loadingMessages));

    if (demo.length) playTrack(0, demo);
  }

  function downloadLyrics() {
    const text = lyrics || "";
    const filename = tracks[activeTrackIndex ?? 0]?.title || "obsessxdity_lyrics";
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${filename.replace(/\s+/g, "_")}_lyrics.txt`;
    a.click();
  }

  return (
    <div className="px-4 py-6 md:px-6">
      <style>{`
        .obs-card { background: #161628; border: 1px solid #2d2d48; border-radius: 20px; position: relative; overflow: hidden; }
        .obs-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, #ff2d55, #9333ea, transparent); opacity: 0.75; }
        .obs-input, .obs-track-card { transition: all 0.2s; }
        .obs-grid { display: grid; gap: 16px; grid-template-columns: repeat(2, minmax(0, 1fr)); }
        @media (max-width: 900px) { .obs-grid { grid-template-columns: 1fr; } }
        .obs-track-card:hover { border-color: #ff2d55; transform: translateY(-3px); }
        .obs-track-card.playing { border-color: #ff2d55; }
        .obs-play-overlay { opacity: 0; transition: opacity 0.2s; }
        .obs-track-card:hover .obs-play-overlay, .obs-track-card.playing .obs-play-overlay { opacity: 1; }
        .obs-wave-bar { width: 2px; background: #ff2d55; border-radius: 1px; }
        .obs-track-card.playing .obs-wave-bar { animation: obs-wave 0.8s ease-in-out infinite; }
        @keyframes obs-wave { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.3); } }
      `}</style>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#ff2d55] to-[#7c3aed] flex items-center justify-center text-lg">
              🖤
            </div>
            <div className="text-2xl font-semibold uppercase tracking-[0.18em] text-transparent bg-clip-text bg-gradient-to-br from-white via-[#ff6b8a] to-[#ff6b8a]">
              OBSESSXDITY
            </div>
          </div>
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-400">Музыка шынайыдай • AI генератор</div>
        </div>

        <div className="obs-card p-8 mb-6">
          <div className="text-sm font-semibold uppercase tracking-[0.12em] text-[#ff2d55] mb-4">Музыка сипаттамасы</div>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Мысалы: sad lofi beats, қазақ домбырасы, gym phonk, chill anime vibes..."
            className="obs-input w-full bg-[#161625] border border-[#1e1e35] rounded-[12px] p-5 text-sm text-white min-h-[100px] outline-none resize-none"
          />

          <div className="text-sm font-semibold uppercase tracking-[0.12em] text-[#ff2d55] mt-6 mb-3">Жанр / Стиль</div>
          <div className="flex flex-wrap gap-3">
            {chips.map((chip) => (
              <button
                key={chip.value}
                type="button"
                onClick={() => toggleChip(chip.value)}
                className={`px-4 py-2 rounded-full border text-sm ${selectedStyle === chip.value ? "border-[#ff2d55] bg-white/10 text-white" : "border-[#1e1e35] bg-[#161625] text-zinc-400"}`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 mt-6 items-center">
            <button
              type="button"
              onClick={generate}
              disabled={loading || (!prompt.trim() && !selectedStyle)}
              className="inline-flex items-center gap-2 rounded-[16px] bg-gradient-to-br from-[#ff2d55] to-[#c0392b] px-6 py-3 text-base font-semibold text-white shadow-glow disabled:opacity-50"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Музыка жасау
            </button>
            <button type="button" onClick={() => setInstrumental((prev) => !prev)} className="inline-flex items-center gap-3 text-sm text-zinc-400">
              <span
                className={`w-9 h-5 rounded-full border p-0.5 transition ${instrumental ? "bg-[#ff2d55]/30 border-[#ff2d55]" : "bg-[#161625] border-[#1e1e35]"}`}
              >
                <span className={`block w-4 h-4 rounded-full transition ${instrumental ? "translate-x-4 bg-[#ff2d55]" : "translate-x-0 bg-zinc-400"}`} />
              </span>
              Инструментальды
            </button>
          </div>
        </div>

        <div className={`${loading ? "block" : "hidden"} text-center p-10 mb-6`}>
          <div className="mx-auto mb-4 h-12 w-12 rounded-full border-4 border-[#1e1e35] border-t-[#ff2d55] animate-spin" />
          <div className="text-sm text-zinc-400">{loading ? loadingMessage : "AI музыка генерациялауда..."}</div>
        </div>

        <div className={visible ? "block" : "hidden"}>
          <div className="flex flex-wrap gap-2 mb-6">
            <div className="rounded-full border border-[#1e1e35] bg-[#161625] px-4 py-2 text-xs text-zinc-300">
              Промпт: {promptUsed.slice(0, 40)}
              {promptUsed.length > 40 ? "..." : ""}
            </div>
            <div className="rounded-full border border-[#1e1e35] bg-[#161625] px-4 py-2 text-xs text-zinc-300">Тректер: {tracks.length}</div>
            <div className="rounded-full border border-[#1e1e35] bg-[#161625] px-4 py-2 text-xs text-zinc-300">
              Стиль: {styleTags.join(", ") || "—"}
            </div>
          </div>

          <div className="obs-grid gap-4 mb-6">
            {tracks.map((track, index) => {
              const isActive =
                activeTrackIndex === index || (playingTrackId ? playingTrackId === track.sourceTrackId : false);
              return (
                <button
                  key={track.id}
                  type="button"
                  onClick={() => playTrack(index)}
                  className={`obs-track-card relative overflow-hidden rounded-[18px] border border-[#1e1e35] bg-[#12121f] p-4 text-left transition ${isActive ? "playing border-[#ff2d55]" : "hover:-translate-y-1 hover:border-[#ff2d55]"}`}
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-[#161625]">
                    <div className="absolute inset-0 flex items-center justify-center text-5xl">{track.emoji}</div>
                    <div className="obs-play-overlay absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none">
                      <span className="grid h-14 w-14 place-items-center rounded-full bg-[#ff2d55] text-white">▶</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="truncate text-sm font-semibold text-white">{track.title}</div>
                    <div className="mt-2 text-xs text-zinc-400">{track.artist}</div>
                    <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-500">
                      <span>{track.genre}</span>
                      <span>{track.duration}</span>
                    </div>
                    <div className="mt-3 text-[12px] text-zinc-400">{track.description}</div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className={`obs-card p-6 mb-6 ${lyrics && !instrumental ? "block" : "hidden"}`}>
            <div className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#ff2d55] mb-4 font-mono">// Мәтін / Lyrics</div>
            <div className="whitespace-pre-line text-sm leading-7 text-white font-mono">{lyrics}</div>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={generate} type="button" className="rounded-xl border border-[#1e1e35] px-4 py-3 text-sm text-white hover:border-[#ff2d55]">
                Жаңадан жасау
              </button>
              <button onClick={downloadLyrics} type="button" className="rounded-xl border border-[#1e1e35] px-4 py-3 text-sm text-white hover:border-[#ff2d55]">
                Мәтінді сақтау
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
