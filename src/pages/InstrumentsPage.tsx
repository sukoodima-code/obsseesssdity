import { Drumstick, Guitar, Music, Music2, Sparkles, Cpu } from "lucide-react";
import PageTransition from "../components/PageTransition";
import SectionHeader from "../components/SectionHeader";
import { useState } from "react";

const instruments = [
  {
    id: "inst1",
    title: "Гитара",
    description: "Жылы аккордтар, кинематографиялық лидтер және жұмсақ пернетақта үні.",
    icon: Guitar,
    color: "from-neon-purple to-neon-cyan"
  },
  {
    id: "inst2",
    title: "Пианино",
    description: "Зиянсыз lo-fi пернелер және фокус үшін жарқыраған айналымдар.",
    icon: Music2,
    color: "from-neon-cyan to-neon-pink"
  },
  {
    id: "inst3",
    title: "Барабандар",
    description: "Айтарлықтай биттер, trap қабаттары және кинематографиялық перкуссия.",
    icon: Drumstick,
    color: "from-neon-crimson to-neon-ember"
  },
  {
    id: "inst4",
    title: "Скрипка",
    description: "Әлемді сырлы тілмен сыр шертетін эмоционалды әуен.",
    icon: Music,
    color: "from-neon-purple to-neon-ember"
  },
  {
    id: "inst5",
    title: "Синтезатор",
    description: "Заманауи падтар, бас лидтер және болашақ дыбыстық кеңістіктер.",
    icon: Cpu,
    color: "from-neon-cyan to-neon-purple"
  },
  {
    id: "inst6",
    title: "Домбыра",
    description: "Дәстүрлі домбыра әуені ambient биттермен қосылған.",
    icon: Sparkles,
    color: "from-neon-cyan to-neon-ember"
  }
];

const modes = ["Бас күшейту", "Кино режимі", "Фокус режимі", "Кеңістік аудио"];

export default function InstrumentsPage() {
  const [activeMode, setActiveMode] = useState("Бас күшейту");

  return (
    <PageTransition className="px-4 py-6 md:px-6">
      <SectionHeader
        title="Құралдар"
        subtitle="Футуристік AI сахнадағы дыбыс көздерін зерттеңіз"
        right={<span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-200">макет аудио UI</span>}
      />

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_0.75fr]">
        <div className="space-y-5">
          <div className="glass rounded-3xl border border-white/10 p-5 shadow-glow">
            <div className="text-sm font-semibold text-white">Дыбыс режимдері</div>
            <div className="mt-4 flex flex-wrap gap-3">
              {modes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setActiveMode(mode)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold transition ${
                    activeMode === mode ? "border-neon-cyan bg-neon-cyan/15 text-white" : "border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            <div className="mt-4 rounded-3xl border border-white/10 bg-black/20 p-4 text-sm text-zinc-400">
              Белсенді режим: <span className="text-white">{activeMode}</span>. Платформа визуалді дыбыс энергиясымен premium аудио қозғалтқышын имитациялайды.
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {instruments.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="glass rounded-3xl border border-white/10 p-5 transition hover:-translate-y-1 hover:shadow-glow">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-sm font-semibold text-white">{item.title}</div>
                      <div className="mt-1 text-xs text-zinc-400">{item.description}</div>
                    </div>
                    <div className={`grid h-12 w-12 place-items-center rounded-3xl bg-gradient-to-br ${item.color} shadow-glow`}>
                      <Icon className="h-6 w-6 text-black" />
                    </div>
                  </div>
                  <button className="mt-5 w-full rounded-2xl bg-gradient-to-br from-neon-purple to-neon-cyan px-4 py-3 text-sm font-semibold text-black transition hover:scale-[1.01]">
                    Дыбысты ойнату
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="glass rounded-3xl border border-white/10 p-5 shadow-glow">
          <div className="text-sm font-semibold text-white">Құралдардың ерекшелігі</div>
          <div className="mt-4 space-y-4 text-sm text-zinc-400">
            <p>
              Әр құрал картасы аналогтық және цифрлық текстураларды біріктіреді. Бұл cyberpunk музыка сервисі үшін әзірленген визуалдық демонстрация.
            </p>
            <p>
              “Дыбысты ойнату” түймешігін басып, көңіл күй өзгерісін елестетіңіз. Dombyra картасы Kazakh әуенін көрсетеді, Synthesizer неон энергиясын білдіреді.
            </p>
          </div>
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="text-xs uppercase tracking-[0.28em] text-zinc-400">Кеңес</div>
            <div className="mt-2 text-sm text-zinc-200">
              Бұл бетті платформа мәдени құралдарды AI ұсыныстарымен қалай байланыстыратынын көрсету үшін пайдаланыңыз.
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
