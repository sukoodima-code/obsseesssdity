import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend } from "recharts";
import PageTransition from "../components/PageTransition";
import SectionHeader from "../components/SectionHeader";

const genreData = [
  { name: "Qazaq Chill", value: 28 },
  { name: "Lo-fi", value: 22 },
  { name: "Electronic", value: 18 },
  { name: "Hip-hop", value: 14 },
  { name: "Anime", value: 10 },
  { name: "Pop", value: 8 }
];

const chartData = [
  { name: "Mon", listens: 120, sessions: 60 },
  { name: "Tue", listens: 145, sessions: 78 },
  { name: "Wed", listens: 168, sessions: 92 },
  { name: "Thu", listens: 142, sessions: 80 },
  { name: "Fri", listens: 189, sessions: 104 },
  { name: "Sat", listens: 216, sessions: 126 },
  { name: "Sun", listens: 232, sessions: 138 }
];

const playlistData = [
  { name: "Dombyra Fusion", value: 35 },
  { name: "Astana Night", value: 26 },
  { name: "Dala Vibes", value: 18 },
  { name: "Nomad Energy", value: 21 }
];

const moodData = [
  { name: "Chill", value: 40 },
  { name: "Energetic", value: 26 },
  { name: "Focus", value: 18 },
  { name: "Sad", value: 16 }
];

const COLORS = ["#8b5cf6", "#22d3ee", "#ec4899", "#f59e0b", "#7c3aed", "#38bdf8"];

export default function StatisticsPage() {
  return (
    <PageTransition className="px-4 py-6 md:px-6">
      <SectionHeader
        title="Статистика"
        subtitle="Жанрдар, тыңдау динамикасы мен плейлист трендтері"
        right={
          <span className="rounded-full border border-white/10 bg-violet-500/10 px-3 py-1.5 text-xs text-violet-200">
            нақты деректер
          </span>
        }
      />

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <div className="glass rounded-3xl border border-white/10 p-5 shadow-glow">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-sm font-semibold text-white">Жалпы тыңдаулар</div>
              <div className="mt-1 text-3xl font-semibold text-white">24.8k</div>
            </div>
            <div className="rounded-3xl bg-white/5 px-4 py-3 text-sm text-zinc-300">
              +18% аптадан аптаға
            </div>
          </div>

          <div className="mt-3 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 12, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#9ca3af" axisLine={false} tickLine={false} />
                <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)" }} />
                <Legend verticalAlign="top" wrapperStyle={{ color: "#cbd5e1" }} />
                <Line type="monotone" dataKey="listens" stroke="#a855f7" strokeWidth={3} dot={false} />
                <Line type="monotone" dataKey="sessions" stroke="#38bdf8" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-5">
          <div className="glass rounded-3xl border border-white/10 p-5 shadow-glow">
            <div className="text-sm font-semibold text-white">Танымал жанрдар</div>
            <div className="mt-3 h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={genreData} innerRadius={52} outerRadius={96} dataKey="value" stroke="transparent">
                    {genreData.map((entry, index) => (
                      <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid gap-3">
              {genreData.map((item, idx) => (
                <div key={item.name} className="flex items-center justify-between rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div>
                    <div className="text-sm font-semibold text-white">{item.name}</div>
                    <div className="text-xs text-zinc-400">жанр үлесі</div>
                  </div>
                  <div className="text-sm font-semibold text-white">{item.value}%</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl border border-white/10 p-5 shadow-glow">
            <div className="text-sm font-semibold text-white">Үздік плейлисттер</div>
            <div className="mt-3 grid gap-4">
              {playlistData.map((item) => (
                <div key={item.name} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-white">{item.name}</div>
                      <div className="text-xs text-zinc-400">қызығушылық деңгейі</div>
                    </div>
                    <div className="rounded-full bg-violet-500/15 px-3 py-1 text-xs font-semibold text-violet-200">{item.value}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass rounded-3xl border border-white/10 p-5 shadow-glow">
          <div className="text-sm font-semibold text-white">Көңіл күй аналитикасы</div>
          <div className="mt-4 h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moodData} margin={{ top: 24, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                <XAxis dataKey="name" stroke="#9ca3af" axisLine={false} tickLine={false} />
                <YAxis stroke="#9ca3af" axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)" }} />
                <Bar dataKey="value" fill="#38bdf8" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-3xl border border-white/10 p-5 shadow-glow">
          <div className="text-sm font-semibold text-white">Жалпы метрикалар</div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs uppercase tracking-[0.3em] text-zinc-400">Белсенділік</div>
              <div className="mt-3 text-2xl font-semibold text-white">1.9k</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs uppercase tracking-[0.3em] text-zinc-400">Орташа толық тыңдау</div>
              <div className="mt-3 text-2xl font-semibold text-white">82%</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs uppercase tracking-[0.3em] text-zinc-400">Жаңа трек</div>
              <div className="mt-3 text-2xl font-semibold text-white">135</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs uppercase tracking-[0.3em] text-zinc-400">Соңғы апта</div>
              <div className="mt-3 text-2xl font-semibold text-white">+14%</div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
