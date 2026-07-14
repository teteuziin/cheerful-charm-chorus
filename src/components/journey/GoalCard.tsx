import type { GoalDTO } from "@/types";
import { motion } from "framer-motion";
import { Target } from "lucide-react";
import { cn } from "@/lib/utils";

export function GoalCard({
  goal,
  variant = "current",
}: {
  goal: GoalDTO;
  variant?: "current" | "next";
}) {
  const isCurrent = variant === "current";
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border p-5",
        isCurrent
          ? "border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card"
          : "border-border/60 bg-card",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
              isCurrent
                ? "bg-primary/15 text-primary"
                : "bg-muted text-muted-foreground",
            )}
          >
            <Target className="h-3 w-3" />
            {isCurrent ? "Meta atual" : "Próxima meta"}
          </span>
          <h4 className="mt-2 text-base font-bold text-foreground">{goal.title}</h4>
        </div>
        <span className="text-2xl font-bold tabular-nums text-foreground shrink-0">
          {goal.progress}%
        </span>
      </div>

      <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${goal.progress}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={cn(
            "h-full rounded-full",
            isCurrent ? "bg-gradient-to-r from-primary to-primary-glow" : "bg-secondary",
          )}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>Atual: <strong className="text-foreground">{goal.currentLabel}</strong></span>
        <span>Meta: <strong className="text-foreground">{goal.targetLabel}</strong></span>
      </div>
      {goal.deadline && (
        <div className="mt-1 text-[11px] text-muted-foreground">Prazo: {goal.deadline}</div>
      )}
    </div>
  );
}
