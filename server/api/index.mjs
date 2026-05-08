import "dotenv/config";
import cors from "cors";
import express from "express";
import OpenAI from "openai";
import { buildChatPrompt, buildRecommendPrompt } from "./systemPrompt.mjs";

const app = express();
const port = Number(process.env.AI_SERVER_PORT || 8787);
const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

app.use(cors());
app.use(express.json({ limit: "1mb" }));

function createOpenAI() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({ apiKey });
}

function extractGenres(tracks) {
  const map = new Map();
  for (const t of tracks || []) {
    map.set(t.genre, (map.get(t.genre) || 0) + 1);
  }
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([genre]) => genre)
    .slice(0, 6);
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, model, hasKey: Boolean(process.env.OPENAI_API_KEY) });
});

app.post("/api/ai/recommend", async (req, res) => {
  try {
    const { query, tracks = [] } = req.body || {};
    const q = String(query || "").trim();
    if (!q) return res.status(400).json({ error: "query is required" });

    const topGenres = extractGenres(tracks);
    const openai = createOpenAI();
    if (!openai) {
      return res.json({
        source: "fallback",
        text: `AI key is not configured. Local recommendations for "${q}" are shown.`,
        hints: { mood: null, genres: topGenres }
      });
    }

    const prompt = buildRecommendPrompt({ query: q, knownGenres: topGenres });

    const response = await openai.responses.create({
      model,
      input: prompt
    });

    const raw = response.output_text || "";
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = { text: raw.trim() || `Recommendations for "${q}"`, mood: null, genres: [] };
    }

    return res.json({
      source: "openai",
      text: String(parsed.text || `Recommendations for "${q}"`),
      hints: {
        mood: parsed.mood ?? null,
        genres: Array.isArray(parsed.genres) ? parsed.genres.slice(0, 5) : []
      }
    });
  } catch (error) {
    console.error("recommend error", error);
    return res.status(500).json({ error: "recommend_failed" });
  }
});

app.post("/api/ai/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body || {};
    const userText = String(message || "").trim();
    if (!userText) return res.status(400).json({ error: "message is required" });

    const openai = createOpenAI();
    if (!openai) {
      return res.json({
        source: "fallback",
        text: "OPENAI_API_KEY is missing. Using local mock AI in frontend.",
        mood: null,
        genres: []
      });
    }

    const prompt = buildChatPrompt({ message: userText, history });

    const response = await openai.responses.create({
      model,
      input: prompt
    });

    const raw = response.output_text || "";
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = { text: raw.trim() || "Готово! Подбираю музыку.", mood: null, genres: [] };
    }

    return res.json({
      source: "openai",
      text: String(parsed.text || "Готово! Подбираю музыку."),
      mood: parsed.mood ?? null,
      genres: Array.isArray(parsed.genres) ? parsed.genres.slice(0, 3) : []
    });
  } catch (error) {
    console.error("chat error", error);
    return res.status(500).json({ error: "chat_failed" });
  }
});

app.listen(port, () => {
  console.log(`AI API listening on http://localhost:${port}`);
});

