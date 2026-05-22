import { ArrowRight, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";
import PageTransition from "../components/PageTransition";
import SectionHeader from "../components/SectionHeader";
import { TELEGRAM_BOT_URL } from "../config";

export default function TelegramPage() {
  return (
    <PageTransition className="px-4 py-6 md:px-6">
      <SectionHeader
        title="Telegram Бот"
        subtitle="AI ұсыныстары мен көңіл күйге арналған плейлист ұсыныстары"
        right={
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200">
            чат дайын
          </span>
        }
      />

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="glass rounded-3xl border border-white/10 p-5 shadow-glow">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-3xl bg-neon-cyan text-black shadow-glow">
              <MessageSquare className="h-6 w-6" />
            </span>
            <div>
              <div className="text-sm font-semibold text-white">Telegram Ботты ашу</div>
              <div className="text-xs text-zinc-400">Түймешікті басып Telegram-да ботты ашыңыз.</div>
            </div>
          </div>

          <div className="mt-6 space-y-4 text-sm text-zinc-400">
            <p>Плейлист табу, көңіл күйді анықтау және әңгімелесу үшін макет ақылды көмекші.</p>
            <p>Мысалы: “coding үшін музыка”, “маған chill музыка керек”, “менің көңілім жоқ” немесе “anime vibes”.</p>
            <p>Бұл плейлисттерді, жанрларды, артистерді және AI-мен басқарылатын тыңдау режимдерін ұсына алады.</p>
          </div>

          <a
            href={TELEGRAM_BOT_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-3xl bg-gradient-to-br from-neon-purple to-neon-cyan px-5 py-3 text-sm font-semibold text-black shadow-glow transition hover:scale-[1.02]"
          >
            Ботты ашу
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="glass rounded-3xl border border-white/10 p-5 shadow-glow">
          <div className="grid gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-neon-cyan" />
                <div className="text-sm font-semibold text-white">AI қауіпсіз түрде имитацияланған</div>
              </div>
              <div className="mt-2 text-sm text-zinc-400">
                Сілтемені `.env` файлына қойыңыз: `VITE_TELEGRAM_BOT_URL=https://t.me/СіздіңБот`. Содан кейін `npm run bot:start` арқылы ботты іске қосыңыз.
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-neon-ember" />
                <div className="text-sm font-semibold text-white">Плейлист ұсыныстары</div>
              </div>
              <div className="mt-2 text-sm text-zinc-400">AI көңіл күй сөздеріне, атмосфераға және оқу/парти тақырыптарына сәйкес тректерді таңдайды.</div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
