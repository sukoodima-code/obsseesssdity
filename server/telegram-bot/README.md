# AI Music Telegram Bot (shared AI)

Это демо Telegram-бота на **Node.js + Telegraf**.
Он:
- использует тот же AI backend, что и сайт (`/api/ai/chat`, `/api/ai/recommend`)
- отвечает одной и той же AI-логикой с веб-приложением
- показывает кнопки `Reels Feed` и `AI Assistant` на сайте

## Установка

```bash
cd server/telegram-bot
npm install
cp .env.example .env
```

Поставь:
- `BOT_TOKEN` из BotFather
- `AI_API_BASE_URL` (по умолчанию `http://localhost:8787`)

Важно: сначала запусти общий AI backend в корне проекта:

```bash
npm run server:dev
```

## Запуск

```bash
npm start
```

