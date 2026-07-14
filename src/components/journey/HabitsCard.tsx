import type { HabitDTO } from "@/types";
import { motion } from "framer-motion";

function Ring({ pct }: { pct: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90">
      <circle cx="28" cy="28" r={r} fill="none" strokeWidth="5" className="stroke-muted" />
      <motion.circle
        cx="28"
        cy="28"
        r={r}
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        className="stroke-primary"
        initial={{ strokeDasharray: `0 ${c}` }}
        animate={{ strokeDasharray: `${(pct / 100) * c} ${c}` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </svg>
  );
}

export function HabitsCard({ habits }: { habits: HabitDTO[] }) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-bold text-foreground">Hábitos de hoje</h4>
        <span className="text-[11px] uppercase tracking-wider text-muted-foreground">Semana</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {habits.map((h) => {
          const pct = Math.min(100, Math.round((h.value / h.target) * 100));
          return (
            <div key={h.key} className="flex flex-col items-center text-center">
              <div className="relative">
                <Ring pct={pct} />
                <span className="absolute inset-0 grid place-items-center text-xl">{h.emoji}</span>
              </div>
              <div className="mt-2 text-xs font-semibold text-foreground">{h.label}</div>
              <div className="text-[11px] text-muted-foreground tabular-nums">
                {h.value.toLocaleString("pt-BR")}
                {h.unit && ` ${h.unit}`} / {h.target.toLocaleString("pt-BR")}
                {h.unit && ` ${h.unit}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
