import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const moods = [
  { emoji: "😀", label: "Ótimo" },
  { emoji: "🙂", label: "Bem" },
  { emoji: "😐", label: "Neutro" },
  { emoji: "😔", label: "Cansado" },
  { emoji: "😣", label: "Difícil" },
];

export function CheckinCard() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.35 }}
      className="surface-card p-5 md:p-6 flex flex-col gap-3"
    >
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Check-in
        </div>
        <h3 className="mt-0.5 text-lg font-semibold text-foreground">Como você está hoje?</h3>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {moods.map((m, i) => (
          <button
            key={m.label}
            type="button"
            onClick={() => setSelected(i)}
            aria-label={m.label}
            aria-pressed={selected === i}
            className={cn(
              "flex flex-col items-center gap-1 rounded-xl border py-3 text-2xl transition-all",
              selected === i
                ? "border-primary bg-primary/10 scale-105"
                : "border-border/60 hover:border-primary/50 hover:bg-accent/30",
            )}
          >
            <span>{m.emoji}</span>
            <span className="text-[10px] font-medium text-muted-foreground">{m.label}</span>
          </button>
        ))}
      </div>
    </motion.article>
  );
}
