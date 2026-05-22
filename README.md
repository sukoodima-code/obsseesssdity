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

## Музыка (демо-треки)

В `public/music/` должны лежать аудиофайлы. Если их нет, сгенерируйте демо:

```bash
npm run setup:media
```

После этого нажмите Play на любом треке — должны играть короткие демо-звуки (4 сек).

## Telegram Bot

### Куда вставить ссылку на бота

В **корне проекта** создайте файл `.env` (скопируйте из `.env.example`):

```env
VITE_TELEGRAM_BOT_URL=https://t.me/ВашБотUsername
```

Эта ссылка откроется на странице «Telegram» и в кнопке «Ботты ашу».

### Запуск бота

1. Создайте бота в Telegram: [@BotFather](https://t.me/BotFather) → `/newbot` → скопируйте **токен**.
2. В `server/telegram-bot/.env` (скопируйте из `.env.example`):

```env
BOT_TOKEN=ваш_токен_от_BotFather
SITE_URL=http://localhost:5173
AI_API_BASE_URL=http://localhost:8787
```

3. Запустите AI-сервер и бота (в разных терминалах):

```bash
npm run server:dev
npm run bot:start
```

(Бірінші рет: `npm run bot:install`)

## Shared AI Brain

Website and Telegram bot now use one backend AI instruction source:

- `server/api/systemPrompt.mjs`

Both endpoints (`/api/ai/chat` and `/api/ai/recommend`) are built from this same prompt module, so behavior stays aligned across channels.