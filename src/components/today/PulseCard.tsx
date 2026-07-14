import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import type { PulseDTO } from "@/types";

export function PulseCard({ data }: { data: PulseDTO }) {
  const size = 120;
  const stroke = 10;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (data.score / 100) * c;

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05, duration: 0.35 }}
      className="surface-card p-5 md:p-6 flex flex-col items-center text-center gap-3"
      aria-label={`Pulse: ${data.label}, ${data.score} por cento`}
    >
      <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
        🍀 <span>Pulse</span>
      </div>

      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            className="stroke-muted"
            strokeWidth={stroke}
            fill="none"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            className="stroke-primary"
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div>
            <div className="text-3xl font-bold text-foreground leading-none">{data.score}%</div>
            <div className="mt-1 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              esta semana
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          <TrendingUp className="h-3.5 w-3.5" />
          {data.label}
        </div>
        <p className="mt-1 text-xs text-muted-foreground max-w-[220px] mx-auto">
          {data.message}
        </p>
      </div>
    </motion.article>
  );
}
