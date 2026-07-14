import type { AchievementDTO } from "@/types";
import { motion } from "framer-motion";

export function AchievementCard({ item, index = 0 }: { item: AchievementDTO; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="relative overflow-hidden surface-card p-5 hover:border-primary/30 transition-colors"
    >
      <div
        aria-hidden
        className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl"
      />
      <div className="relative flex items-start gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary/10 text-2xl">
          {item.emoji}
        </span>
        <div className="min-w-0">
          <h4 className="text-sm font-bold text-foreground truncate">{item.title}</h4>
          <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
