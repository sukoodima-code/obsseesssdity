import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from "react";
import { TRACKS, type Track } from "../data/mock";
import { useMood } from "../theme/MoodContext";

export type RepeatMode = "off" | "all" | "one";

type PlayerContextValue = {
  catalog: Track[];
  queue: Track[];
  queueIndex: number;
  currentTrack: Track;
  currentPlaylist: Track[];
  isPlaying: boolean;
  isBuffering: boolean;
  currentTime: number;
  duration: number;
  progress: number;
  volume: number;
  bassBoost: boolean;
  spatialAudio: boolean;
  shuffle: boolean;
  repeat: RepeatMode;
  orderedTracks: Track[];
  history: Track[];
  recentlyPlayed: Track[];
  playTrack: (track: Track, options?: { queue?: Track[]; autoPlay?: boolean }) => void;
  toggle: () => void;
  pause: () => void;
  play: () => void;
  next: () => void;
  prev: () => void;
  seek: (ratio: number) => void;
  seekTime: (seconds: number) => void;
  setVolume: (value: number) => void;
  setShuffle: (value: boolean) => void;
  setRepeat: (mode: RepeatMode) => void;
  setQueue: (tracks: Track[], startIndex?: number) => void;
  setBassBoost: (value: boolean) => void;
  setSpatialAudio: (value: boolean) => void;
  addUploads: (files: FileList, defaultGenre: Track["genre"]) => void;
};

const PlayerContext = createContext<PlayerContextValue | null>(null);

function pickNextIndex(queue: Track[], index: number, shuffle: boolean) {
  if (queue.length <= 1) return index;
  if (shuffle) {
    let next = index;
    while (next === index) next = Math.floor(Math.random() * queue.length);
    return next;
  }
  return (index + 1) % queue.length;
}

function pickPrevIndex(queue: Track[], index: number) {
  if (queue.length <= 1) return index;
  return (index - 1 + queue.length) % queue.length;
}

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const { mood } = useMood();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimer = useRef<number | null>(null);
  const lastPlayedRef = useRef<string | null>(null);

  const [catalog, setCatalog] = useState<Track[]>(TRACKS);
  const [queue, setQueueState] = useState<Track[]>(TRACKS);
  const [queueIndex, setQueueIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(TRACKS[0]?.durationSec ?? 0);
  const [volume, setVolumeState] = useState(0.78);
  const [bassBoost, setBassBoost] = useState(false);
  const [spatialAudio, setSpatialAudio] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState<RepeatMode>("off");
  const [history, setHistory] = useState<Track[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>([]);

  const currentTrack = queue[queueIndex] ?? catalog[0] ?? TRACKS[0];
  const currentPlaylist = queue;

  const orderedTracks = useMemo(() => {
    const preferredByMood: Record<typeof mood, Set<Track["genre"]>> = {
      chill: new Set(["Қазақша Lo-Fi", "Chillwave", "Indie Qazaq", "Ambient"]),
      energetic: new Set(["Electronic", "Phonk Qazaq", "Hip-Hop", "Trap"]),
      sad: new Set(["Sad Vibes", "Cinematic", "Soul", "Ambient"]),
      focus: new Set(["Study Beats", "Acoustic", "Indie Qazaq", "Chillwave"])
    };
    const preferred = preferredByMood[mood];
    return [...catalog].sort((a, b) => {
      const sa = preferred.has(a.genre) ? 10 : 0;
      const sb = preferred.has(b.genre) ? 10 : 0;
      return sb - sa || a.title.localeCompare(b.title);
    });
  }, [catalog, mood]);

  const progress = duration > 0 ? currentTime / duration : 0;

  const fadeAudio = useCallback((targetVolume: number, durationMs = 180) => {
    const el = audioRef.current;
    if (!el) return Promise.resolve();
    if (fadeTimer.current) window.clearInterval(fadeTimer.current);

    const startVolume = el.volume;
    const steps = 12;
    let step = 0;
    return new Promise<void>((resolve) => {
      fadeTimer.current = window.setInterval(() => {
        step += 1;
        const ratio = step / steps;
        el.volume = clamp(startVolume + (targetVolume - startVolume) * ratio);
        if (step >= steps) {
          if (fadeTimer.current) {
            window.clearInterval(fadeTimer.current);
            fadeTimer.current = null;
          }
          resolve();
        }
      }, durationMs / steps);
    });
  }, []);

  const loadAndPlay = useCallback(
    async (track: Track, autoplay = true) => {
      const el = audioRef.current;
      if (!el || !track.audioUrl) {
        setIsPlaying(false);
        setIsBuffering(false);
        return;
      }

      setIsBuffering(true);
      setCurrentTime(0);
      setDuration(track.durationSec || 0);

      const resolvedUrl = track.audioUrl;
      const isSameSource = el.src.endsWith(resolvedUrl);

      const startPlayback = async () => {
        if (!autoplay) {
          setIsBuffering(false);
          return;
        }
        try {
          await fadeAudio(0, 120);
          await el.play();
          setIsPlaying(true);
          await fadeAudio(volume, 220);
        } catch {
          setIsPlaying(false);
        } finally {
          setIsBuffering(false);
        }
      };

      if (!isSameSource) {
        el.src = resolvedUrl;
        el.load();
        if (el.readyState >= 2) {
          await startPlayback();
        } else {
          el.addEventListener("canplay", startPlayback, { once: true });
        }
      } else {
        await startPlayback();
      }
    },
    [fadeAudio, volume]
  );

  const playTrack = useCallback(
    (track: Track, options?: { queue?: Track[]; autoPlay?: boolean }) => {
      const list = options?.queue?.length ? options.queue : queue;
      const idx = list.findIndex((t) => t.id === track.id);

      if (options?.queue?.length) {
        setQueueState(options.queue);
        setQueueIndex(idx >= 0 ? idx : 0);
      } else if (idx >= 0) {
        setQueueIndex(idx);
      } else {
        const next = [track, ...queue.filter((t) => t.id !== track.id)];
        setQueueState(next);
        setQueueIndex(0);
      }

      loadAndPlay(track, options?.autoPlay !== false);
    },
    [loadAndPlay, queue]
  );

  const setQueue = useCallback(
    (tracks: Track[], startIndex = 0) => {
      if (!tracks.length) return;
      const idx = Math.min(Math.max(startIndex, 0), tracks.length - 1);
      setQueueState(tracks);
      setQueueIndex(idx);
      loadAndPlay(tracks[idx], true);
    },
    [loadAndPlay]
  );

  const next = useCallback(() => {
    if (!queue.length) return;
    if (repeat === "one") {
      const el = audioRef.current;
      if (el) {
        el.currentTime = 0;
        el.play().catch(() => setIsPlaying(false));
      }
      return;
    }
    const idx = repeat === "all" && queueIndex === queue.length - 1 ? 0 : pickNextIndex(queue, queueIndex, shuffle);
    setQueueIndex(idx);
    loadAndPlay(queue[idx], true);
  }, [loadAndPlay, queue, queueIndex, repeat, shuffle]);

  const prev = useCallback(() => {
    const el = audioRef.current;
    if (el && currentTime > 3) {
      el.currentTime = 0;
      setCurrentTime(0);
      return;
    }
    if (!queue.length) return;
    const idx = pickPrevIndex(queue, queueIndex);
    setQueueIndex(idx);
    loadAndPlay(queue[idx], true);
  }, [currentTime, loadAndPlay, queue, queueIndex]);

  const toggle = useCallback(() => {
    const el = audioRef.current;
    if (!el || !currentTrack.audioUrl) return;
    if (isPlaying) {
      el.pause();
      setIsPlaying(false);
    } else {
      el.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [currentTrack.audioUrl, isPlaying]);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const play = useCallback(() => {
    const el = audioRef.current;
    if (!el || !currentTrack.audioUrl) return;
    el.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, [currentTrack.audioUrl]);

  const seek = useCallback(
    (ratio: number) => {
      const el = audioRef.current;
      if (!el || !duration) return;
      const t = Math.min(Math.max(ratio, 0), 1) * duration;
      el.currentTime = t;
      setCurrentTime(t);
    },
    [duration]
  );

  const seekTime = useCallback((seconds: number) => {
    const el = audioRef.current;
    if (!el) return;
    el.currentTime = seconds;
    setCurrentTime(seconds);
  }, []);

  const setVolume = useCallback((value: number) => {
    const v = clamp(value);
    setVolumeState(v);
    if (audioRef.current) audioRef.current.volume = v;
  }, []);

  const addUploads = useCallback(
    (files: FileList, defaultGenre: Track["genre"]) => {
      const now = Date.now();
      const added: Track[] = Array.from(files)
        .filter((f) => f.type.startsWith("audio/"))
        .map((f, i) => {
          const name = f.name.replace(/\.[^/.]+$/, "");
          return {
            id: `u_${now}_${i}`,
            title: name || "Жергілікті жүктеу",
            artist: "Жергілікті жүктеу",
            coverUrl: "",
            durationSec: 180,
            genre: defaultGenre,
            mood: "Relaxed",
            plays: 0,
            likes: 0,
            description: "Жергілікті жүктелген аудио.",
            sunoPrompt: "local upload",
            audioUrl: URL.createObjectURL(f)
          };
        });
      if (!added.length) return;
      setCatalog((prev) => [...added, ...prev]);
      playTrack(added[0], { queue: [...added, ...catalog], autoPlay: true });
    },
    [catalog, playTrack]
  );

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;

    const onTime = () => setCurrentTime(el.currentTime);
    const onMeta = () => {
      if (Number.isFinite(el.duration) && el.duration > 0) setDuration(el.duration);
    };
    const onEnd = () => next();

    el.volume = volume;
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("ended", onEnd);
    return () => {
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("ended", onEnd);
    };
  }, [next, volume]);

  useEffect(() => {
    if (!catalog.some((t) => t.id === currentTrack.id) && catalog[0]) {
      setQueueState(catalog);
      setQueueIndex(0);
    }
  }, [catalog, currentTrack.id]);

  useEffect(() => {
    const first = TRACKS[0];
    if (first?.audioUrl) loadAndPlay(first, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isPlaying || !currentTrack.id) return;
    if (lastPlayedRef.current === currentTrack.id) return;

    setHistory((prev) => [currentTrack, ...prev.filter((t) => t.id !== currentTrack.id)].slice(0, 20));
    setRecentlyPlayed((prev) => [currentTrack, ...prev.filter((t) => t.id !== currentTrack.id)].slice(0, 10));
    lastPlayedRef.current = currentTrack.id;
  }, [currentTrack, isPlaying]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const value = useMemo<PlayerContextValue>(
    () => ({
      catalog,
      queue,
      queueIndex,
      currentTrack,
      currentPlaylist,
      isPlaying,
      isBuffering,
      currentTime,
      duration,
      progress,
      volume,
      bassBoost,
      spatialAudio,
      shuffle,
      repeat,
      orderedTracks,
      history,
      recentlyPlayed,
      playTrack,
      toggle,
      pause,
      play,
      next,
      prev,
      seek,
      seekTime,
      setVolume,
      setShuffle,
      setRepeat,
      setQueue,
      setBassBoost,
      setSpatialAudio,
      addUploads
    }),
    [
      addUploads,
      bassBoost,
      catalog,
      currentPlaylist,
      currentTime,
      currentTrack,
      duration,
      history,
      isBuffering,
      isPlaying,
      next,
      orderedTracks,
      pause,
      play,
      playTrack,
      prev,
      progress,
      queue,
      queueIndex,
      recentlyPlayed,
      repeat,
      seek,
      seekTime,
      setBassBoost,
      setQueue,
      setRepeat,
      setShuffle,
      setSpatialAudio,
      shuffle,
      toggle,
      volume
    ]
  );

  return (
    <PlayerContext.Provider value={value}>
      <audio ref={audioRef} preload="metadata" className="hidden" />
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
