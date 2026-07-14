import { motion } from "framer-motion";
import { Coffee, Moon, Salad, Sandwich, Utensils } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MealDTO, MealSlot, MealStatus } from "@/types";

const slotIcon: Record<MealSlot, React.ComponentType<{ className?: string }>> = {
  café: Coffee,
  almoço: Utensils,
  lanche: Sandwich,
  jantar: Moon,
};

const slotLabel: Record<MealSlot, string> = {
  café: "Café",
  almoço: "Almoço",
  lanche: "Lanche",
  jantar: "Jantar",
};

const statusStyles: Record<MealStatus, string> = {
  feito: "bg-success/15 text-success",
  pendente: "bg-muted text-muted-foreground",
  pulado: "bg-destructive/10 text-destructive",
};

export function MealTodayCard({ meals }: { meals: MealDTO[] }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.35 }}
      className="surface-card p-5 md:p-6 flex flex-col gap-4"
    >
      <header className="flex items-center justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Alimentação
          </div>
          <h3 className="mt-0.5 text-lg font-semibold text-foreground">Plano de hoje</h3>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <Salad className="h-4.5 w-4.5" />
        </span>
      </header>

      <ul className="space-y-2">
        {meals.map((m) => {
          const Icon = slotIcon[m.slot];
          return (
            <li
              key={m.slot}
              className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface/50 px-3 py-2.5"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/40 text-accent-foreground">
                <Icon className="h-4 w-4" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-foreground">{slotLabel[m.slot]}</span>
                  <span className="text-[11px] text-muted-foreground">{m.time}</span>
                </div>
                <div className="text-xs text-muted-foreground truncate">{m.title}</div>
              </div>
              <div className="text-right shrink-0">
                <span
                  className={cn(
                    "inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                    statusStyles[m.status],
                  )}
                >
                  {m.status}
                </span>
                <div className="mt-0.5 text-[11px] text-muted-foreground">{m.kcal} kcal</div>
              </div>
            </li>
          );
        })}
      </ul>
    </motion.article>
  );
}
