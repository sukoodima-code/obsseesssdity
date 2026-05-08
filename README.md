# AI Music World

Modern Spotify / Yandex Music-like **AI music platform UI**.

## Tech

- React + TypeScript
- Tailwind CSS (dark theme with purple/neon accents)
- React Router
- Node.js API proxy for OpenAI (safe key handling)
- Telegram bot (Node.js + Telegraf)
- Shared AI system prompt for web + Telegram

## Features

- Sidebar navigation: Home, Playlists, Genres, AI Assistant, Reels
- Music cards (cover, title, artist) + hover animations
- Bottom player with local upload support
- Genre filter system
- Playlist page + playlist detail page
- Mood system (Chill/Energetic/Sad/Focus) with dynamic background/effects
- TikTok/Reels style vertical feed with snap scrolling
- AI Assistant with chat + recommendation widgets
- Telegram bot integration
- Responsive layout + smooth transitions

## Run

1) Install dependencies

```bash
npm install
```

2) Setup env

```bash
cp .env.example .env
```

Add your OpenAI key in `.env`:

```bash
OPENAI_API_KEY=sk-...
```

3) Start backend API (OpenAI proxy)

```bash
npm run server:dev
```

4) Start frontend

```bash
npm run dev
```

Then open the local dev server URL shown in the terminal.

## Telegram Bot (optional)

```bash
cd server/telegram-bot
npm install
cp .env.example .env
npm start
```

## Shared AI Brain

Website and Telegram bot now use one backend AI instruction source:

- `server/api/systemPrompt.mjs`

Both endpoints (`/api/ai/chat` and `/api/ai/recommend`) are built from this same prompt module, so behavior stays aligned across channels.