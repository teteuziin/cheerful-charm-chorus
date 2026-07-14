import { motion } from "framer-motion";
import type { AchievementDTO } from "@/types";

export function AchievementCard({ data }: { data: AchievementDTO }) {
  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.45, duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl border border-accent/40 p-6 text-center"
      style={{
        backgroundImage:
          "linear-gradient(135deg, oklch(0.78 0.12 145 / 0.25), oklch(0.55 0.17 145 / 0.20))",
      }}
    >
      <div
        aria-hidden
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-primary/25 blur-2xl"
      />
      <div className="relative">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-white/40 dark:bg-white/10 text-3xl shadow-[var(--shadow-soft)]">
          {data.emoji}
        </div>
        <h3 className="mt-3 text-lg font-bold text-foreground">{data.title}</h3>
        <p className="mt-1 text-sm text-foreground/70 max-w-xs mx-auto">{data.description}</p>
      </div>
    </motion.article>
  );
}
