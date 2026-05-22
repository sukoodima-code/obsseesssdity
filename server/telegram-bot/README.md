# AI Music Telegram Bot (жалпы AI)

Бұл **Node.js + Telegraf** негізіндегі Telegram-боттың демонстрациясы.
Бот:
- сайтта қолданылатын сол AI бекендті пайдалануға арналған (`/api/ai/chat`, `/api/ai/recommend`)
- веб-қосымшадағы AI логикасымен бірдей жауап береді
- сайтта `Reels Feed` және `AI Assistant` батырмаларын көрсетеді

## Орнату

```bash
cd server/telegram-bot
npm install
cp .env.example .env
```

Орнатыңыз:
- BotFather-тен алынған `BOT_TOKEN`
- `AI_API_BASE_URL` (әдепкі бойынша `http://localhost:8787`)

Сайттағы бот сілтемесі (түймешік) жоба түпкі `.env` файлында:
`VITE_TELEGRAM_BOT_URL=https://t.me/СіздіңБотUsername`

Маңызды: алдымен жоба түпкі қалтасында жалпы AI бекендті іске қосыңыз:

```bash
npm run server:dev
```

## Іске қосу

```bash
npm start
```

