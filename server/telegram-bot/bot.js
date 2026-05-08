require("dotenv").config();
const { Telegraf, Markup } = require("telegraf");
const { songs, bestSongsForQuery, playlistForMood } = require("./music");

const BOT_TOKEN = process.env.BOT_TOKEN;
const SITE_URL = process.env.SITE_URL || "http://localhost:5173";
const AI_API_BASE_URL = process.env.AI_API_BASE_URL || "http://localhost:8787";

if (!BOT_TOKEN) {
  // eslint-disable-next-line no-console
  console.error("Missing BOT_TOKEN in .env");
  process.exit(1);
}

const bot = new Telegraf(BOT_TOKEN);
const userHistory = new Map();

function formatSongs(list) {
  if (!list.length) return "—";
  return list.map((s, i) => `${i + 1}. ${s.title} — ${s.artist} (${s.genre})`).join("\n");
}

async function requestAiChat(message, history) {
  const res = await fetch(`${AI_API_BASE_URL}/api/ai/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, history })
  });
  if (!res.ok) throw new Error(`ai_chat_failed_${res.status}`);
  return res.json();
}

async function requestAiRecommend(query) {
  const res = await fetch(`${AI_API_BASE_URL}/api/ai/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, tracks: songs.map((s) => ({ genre: s.genre })) })
  });
  if (!res.ok) throw new Error(`ai_recommend_failed_${res.status}`);
  return res.json();
}

function pickSongsByGenres(genres, limit = 5) {
  if (!genres?.length) return [];
  return songs.filter((s) => genres.includes(s.genre)).slice(0, limit);
}

async function buildUnifiedReply(userId, text) {
  const history = userHistory.get(userId) || [];
  try {
    // Same AI backend as website.
    const [chatRes, recRes] = await Promise.all([requestAiChat(text, history), requestAiRecommend(text)]);
    const aiSongs = pickSongsByGenres(recRes?.hints?.genres, 5);
    const fallbackSongs = bestSongsForQuery(text, 5);
    const pickedSongs = aiSongs.length ? aiSongs : fallbackSongs;
    const mood = recRes?.hints?.mood || chatRes?.mood || null;
    const playlist = mood ? playlistForMood(mood) : null;

    const answer = [
      String(chatRes?.text || "Готово, подбираю музыку."),
      recRes?.text ? `\n${String(recRes.text)}` : "",
      "",
      "🎧 Треки:",
      formatSongs(pickedSongs),
      playlist ? `\nПлейлист: ${playlist.title}\nОткрыть: ${SITE_URL}/playlists/${playlist.id}` : `\nОткрыть: ${SITE_URL}/reels`
    ].join("\n");

    const nextHistory = [...history, { role: "user", text }, { role: "ai", text: answer }].slice(-10);
    userHistory.set(userId, nextHistory);
    return answer;
  } catch (_e) {
    // Fallback if API not running.
    const localSongs = bestSongsForQuery(text, 5);
    const fallbackAnswer = [
      "⚠️ AI сервер сейчас недоступен, использую локальный fallback.",
      "",
      "🎧 Треки:",
      formatSongs(localSongs),
      `\nОткрыть: ${SITE_URL}/assistant`
    ].join("\n");
    const nextHistory = [...history, { role: "user", text }, { role: "ai", text: fallbackAnswer }].slice(-10);
    userHistory.set(userId, nextHistory);
    return fallbackAnswer;
  }
}

bot.start((ctx) => {
  return ctx.reply(
    "🎧 Welcome to AI Music Bot!\n\nНапиши настроение или вопрос.\nПример: “Мне грустно”, “gym phonk”, “кто такой Mozart?”",
    Markup.inlineKeyboard([
      Markup.button.callback("Chill", "MOOD:chill"),
      Markup.button.callback("Energetic", "MOOD:energetic"),
      Markup.button.callback("Sad", "MOOD:sad"),
      Markup.button.callback("Focus", "MOOD:focus")
    ])
  );
});

bot.action(/MOOD:(.+)/, async (ctx) => {
  const mood = ctx.match[1];
  const text = `mood ${mood}`;
  const userId = String(ctx.from?.id || "anon");
  const answer = await buildUnifiedReply(userId, text);

  await ctx.answerCbQuery();
  await ctx.reply(
    `🔥 ${mood.toUpperCase()} picks\n\n${answer}`,
    Markup.inlineKeyboard([
      Markup.button.url("Открыть плейлисты", `${SITE_URL}/playlists`),
      Markup.button.url("AI Assistant", `${SITE_URL}/assistant`)
    ])
  );
});

bot.on("text", async (ctx) => {
  const text = (ctx.message?.text || "").trim();
  const userId = String(ctx.from?.id || "anon");

  if (!text) return;
  const answer = await buildUnifiedReply(userId, text);
  return ctx.reply(
    answer,
    Markup.inlineKeyboard([
      Markup.button.url("Reels Feed", `${SITE_URL}/reels`),
      Markup.button.url("AI Assistant", `${SITE_URL}/assistant`)
    ])
  );
});

bot.launch();
// eslint-disable-next-line no-console
console.log("🤖 Bot started!");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

