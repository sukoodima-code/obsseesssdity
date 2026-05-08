type ChatHistoryItem = { role: "user" | "ai"; text: string };

type ChatResponse = {
  source: "openai" | "fallback";
  text: string;
  mood: "chill" | "energetic" | "sad" | "focus" | null;
  genres: string[];
};

type RecommendResponse = {
  source: "openai" | "fallback";
  text: string;
  hints: {
    mood: "chill" | "energetic" | "sad" | "focus" | null;
    genres: string[];
  };
};

const AI_BASE = import.meta.env.VITE_AI_API_BASE_URL || "";

export async function aiChat(message: string, history: ChatHistoryItem[]): Promise<ChatResponse> {
  const res = await fetch(`${AI_BASE}/api/ai/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history })
  });
  if (!res.ok) throw new Error(`ai_chat_failed_${res.status}`);
  return res.json();
}

export async function aiRecommend(query: string, tracks: Array<{ genre: string }>): Promise<RecommendResponse> {
  const res = await fetch(`${AI_BASE}/api/ai/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, tracks })
  });
  if (!res.ok) throw new Error(`ai_recommend_failed_${res.status}`);
  return res.json();
}

