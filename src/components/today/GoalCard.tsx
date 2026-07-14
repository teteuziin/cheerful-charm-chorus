import { motion } from "framer-motion";
import { Target } from "lucide-react";
import type { GoalDTO } from "@/types";

export function GoalCard({ data }: { data: GoalDTO }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.35 }}
      className="surface-card p-5 md:p-6 flex flex-col gap-4"
    >
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Meta atual
          </div>
          <h3 className="mt-1 text-base font-semibold text-foreground">{data.title}</h3>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Target className="h-4.5 w-4.5" />
        </span>
      </header>

      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-3xl font-bold text-foreground">{data.progress}%</div>
          {data.deadline && (
            <div className="text-xs text-muted-foreground">restam {data.deadline}</div>
          )}
        </div>
        <div className="text-right text-xs">
          <div className="text-muted-foreground">Atual · Meta</div>
          <div className="font-semibold text-foreground">
            {data.currentLabel} <span className="text-muted-foreground">/</span> {data.targetLabel}
          </div>
        </div>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${data.progress}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-primary to-primary-glow"
        />
      </div>
    </motion.article>
  );
}
