import { motion } from "framer-motion";
import { ArrowRight, Flag, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { JourneyDTO } from "@/types";

export function JourneyHero({ data }: { data: JourneyDTO }) {
  const pct = Math.round((data.currentDay / data.totalDays) * 100);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl border border-primary/25 gradient-primary text-primary-foreground p-6 md:p-8 shadow-[var(--shadow-elevated)]"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_15%_10%,white,transparent_40%),radial-gradient(circle_at_85%_85%,white,transparent_45%)]"
      />
      <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
            <Flag className="h-3.5 w-3.5" /> Programa ativo
          </span>
          <h2 className="mt-3 text-2xl md:text-4xl font-bold tracking-tight leading-tight">
            {data.programName}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/85">
            <span className="inline-flex items-center gap-1.5">
              <Flag className="h-4 w-4" /> {data.goal}
            </span>
            {data.coach && (
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" /> {data.coach}
              </span>
            )}
            {data.nextMilestone && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {data.nextMilestone}
              </span>
            )}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <div className="text-4xl md:text-5xl font-bold tabular-nums leading-none">
            {data.currentDay}
            <span className="text-lg text-white/70 font-semibold"> / {data.totalDays}</span>
          </div>
          <div className="mt-1 text-xs uppercase tracking-widest text-white/80">Dia atual</div>
        </div>
      </div>

      <div className="relative mt-6">
        <div className="flex items-center justify-between text-xs text-white/80 mb-2">
          <span>{pct}% do programa</span>
          <span>{data.totalDays - data.currentDay} dias restantes</span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-white/15">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="h-full rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.6)]"
          />
        </div>
      </div>

      <div className="relative mt-6">
        <Button className="rounded-full bg-white text-primary hover:bg-white/90 font-semibold group">
          Continuar treino
          <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Button>
      </div>
    </motion.div>
  );
}
