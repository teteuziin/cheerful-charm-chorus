import { TrendingDown, TrendingUp, Minus } from "lucide-react";
import type { EvolutionMetricDTO } from "@/types";
import { cn } from "@/lib/utils";

function Sparkline({ values }: { values: number[] }) {
  if (values.length < 2) return null;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const w = 120;
  const h = 40;
  const step = w / (values.length - 1);
  const points = values
    .map((v, i) => `${i * step},${h - ((v - min) / range) * h}`)
    .join(" ");
  const last = values.at(-1)!;
  const lastY = h - ((last - min) / range) * h;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-10" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sparkFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={`0,${h} ${points} ${w},${h}`}
        fill="url(#sparkFill)"
        className="text-primary"
      />
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-primary"
      />
      <circle cx={w} cy={lastY} r="2.5" className="fill-primary" />
    </svg>
  );
}

export function EvolutionCard({ metric }: { metric: EvolutionMetricDTO }) {
  const positiveIsGood = metric.key === "muscleMass";
  const good = positiveIsGood ? metric.delta > 0 : metric.delta < 0;
  const flat = metric.delta === 0;
  const Icon = flat ? Minus : metric.delta > 0 ? TrendingUp : TrendingDown;
  return (
    <div className="surface-card p-5 hover:border-primary/30 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="text-caption uppercase tracking-wider">{metric.label}</div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-2xl font-bold tabular-nums text-foreground">
              {metric.latest.toLocaleString("pt-BR")}
            </span>
            {metric.unit && (
              <span className="text-sm text-muted-foreground">{metric.unit}</span>
            )}
          </div>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
            flat
              ? "bg-muted text-muted-foreground"
              : good
                ? "bg-success/15 text-success"
                : "bg-destructive/15 text-destructive",
          )}
        >
          <Icon className="h-3 w-3" />
          {metric.delta > 0 ? "+" : ""}
          {metric.delta.toLocaleString("pt-BR")}
        </span>
      </div>
      <div className="mt-3">
        <Sparkline values={metric.series.map((s) => s.value)} />
      </div>
    </div>
  );
}
