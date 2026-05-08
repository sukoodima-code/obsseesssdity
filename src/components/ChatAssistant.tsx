import { useMemo, useRef, useState } from "react";
import { Sparkles, Send, Bot, User2 } from "lucide-react";
import { TRACKS, type Track } from "../data/mock";
import { recommendTracks } from "../lib/recommend";
import MusicCard from "./MusicCard";
import { cn } from "../lib/cn";
import { aiChat, aiRecommend } from "../lib/aiApi";

type Msg =
  | { id: string; role: "user"; text: string }
  | { id: string; role: "ai"; text: string; tracks?: Track[] };

function uid() {
  return Math.random().toString(16).slice(2);
}

export default function ChatAssistant({ onPlay }: { onPlay: (t: Track) => void }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: uid(),
      role: "ai",
      text: "Tell me your mood or genre: “anime lofi night”, “gym phonk”, “sad chill”. If backend AI is running, I’ll use OpenAI; otherwise local mock."
    }
  ]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const quickPrompts = useMemo(
    () => ["anime lofi night", "gym phonk", "sad chill", "k-pop happy", "focus study lofi"],
    []
  );

  function push(msg: Msg) {
    setMessages((m) => [...m, msg]);
    setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }), 0);
  }

  async function submit(text: string) {
    const q = text.trim();
    if (!q) return;
    if (loading) return;
    setInput("");
    push({ id: uid(), role: "user", text: q });

    setLoading(true);
    try {
      const history = messages.map((m) => ({ role: m.role, text: m.text }));
      const [chatRes, recRes] = await Promise.all([
        aiChat(q, history),
        aiRecommend(q, TRACKS.map((t) => ({ genre: t.genre })))
      ]);

      const local = recommendTracks(q, TRACKS, 8);
      const hinted = recRes.hints?.genres?.length
        ? local.tracks.filter((t) => recRes.hints.genres.includes(t.genre)).slice(0, 8)
        : local.tracks;

      push({
        id: uid(),
        role: "ai",
        text: `${chatRes.text}\n\n${recRes.text}`,
        tracks: hinted.length ? hinted : local.tracks
      });
    } catch {
      // Safe fallback to local mock AI
      const rec = recommendTracks(q, TRACKS, 8);
      const genreStr = rec.detectedGenres.length ? `genres: ${rec.detectedGenres.join(", ")}` : "";
      const hint = [genreStr].filter(Boolean).join(" • ");
      const response = hint
        ? `Mock mode — ${hint}. Here are recommended tracks for “${rec.query}”.`
        : `Mock mode. Here are recommended tracks for “${rec.query}”.`;
      push({ id: uid(), role: "ai", text: response, tracks: rec.tracks });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
      <div className="glass overflow-hidden rounded-3xl border border-white/10 shadow-[0_0_0_1px_rgba(255,0,51,.10)]">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gradient-to-br from-neon-crimson/70 to-neon-ember/30 shadow-glow">
              <Sparkles className="h-5 w-5 text-black" />
            </span>
            <div>
              <div className="text-sm font-semibold">AI Assistant</div>
              <div className="text-xs text-zinc-400">Client-side recommendations (mock)</div>
            </div>
          </div>
          <div className="hidden gap-2 lg:flex">
            {quickPrompts.slice(0, 3).map((p) => (
              <button
                key={p}
                onClick={() => submit(p)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 transition hover:border-neon-ember/35 hover:bg-white/10"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div ref={scrollRef} className="max-h-[52vh] overflow-auto px-4 py-4 md:px-5">
          <div className="space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={cn("flex gap-3", m.role === "user" ? "justify-end" : "justify-start")}>
                {m.role === "ai" ? (
                  <div className="mt-1 grid h-8 w-8 place-items-center rounded-2xl border border-white/10 bg-white/5">
                    <Bot className="h-4 w-4 text-neon-ember/90" />
                  </div>
                ) : null}

                <div
                  className={cn(
                    "max-w-[78%] rounded-3xl border px-4 py-3 text-sm leading-relaxed",
                    m.role === "user"
                      ? "border-neon-crimson/30 bg-neon-crimson/15 text-zinc-100 shadow-[0_0_0_1px_rgba(255,0,51,.10)]"
                      : "border-white/10 bg-white/[0.04] text-zinc-100"
                  )}
                >
                  {m.text}

                  {m.role === "ai" && m.tracks?.length ? (
                    <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {m.tracks.map((t) => (
                        <MusicCard key={t.id} track={t} onPlay={onPlay} />
                      ))}
                    </div>
                  ) : null}
                </div>

                {m.role === "user" ? (
                  <div className="mt-1 grid h-8 w-8 place-items-center rounded-2xl border border-white/10 bg-white/5">
                    <User2 className="h-4 w-4 text-neon-crimson/90" />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 p-4 md:p-5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type mood or genre…"
              className="glass flex-1 rounded-2xl border border-white/10 px-3 py-3 text-sm outline-none transition focus:border-neon-ember/40"
            />
            <button
              type="submit"
              disabled={loading}
              className={cn(
                "inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold",
                "bg-gradient-to-br from-neon-crimson to-neon-ember text-black shadow-glow transition hover:scale-[1.02] active:scale-[0.99]",
                loading ? "opacity-70" : ""
              )}
            >
              <Send className="h-4 w-4" />
              {loading ? "Thinking..." : "Send"}
            </button>
          </form>

          <div className="mt-3 flex flex-wrap gap-2 lg:hidden">
            {quickPrompts.map((p) => (
              <button
                key={p}
                onClick={() => submit(p)}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200 transition hover:border-neon-ember/35 hover:bg-white/10"
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="glass rounded-3xl border border-white/10 p-5 shadow-[0_0_0_1px_rgba(239,68,68,.10)] md:p-6">
        <div className="text-sm font-semibold">How it works</div>
        <div className="mt-2 text-sm text-zinc-400">
          This is a UI-only demo: your message is parsed locally (keywords → moods/genres), then tracks are scored and
          shown as “Recommended”.
        </div>

        <div className="mt-4 space-y-3 text-sm">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="text-xs text-zinc-500">Examples</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {["anime lofi night", "romance pop", "work focus", "hype edm", "sad indie"].map((p) => (
                <span key={p} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200">
                  {p}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <div className="text-xs text-zinc-500">Note</div>
            <div className="mt-2 text-sm text-zinc-400">
              No backend, no real audio. Player is simulated. Perfect for a modern portfolio-style UI.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

