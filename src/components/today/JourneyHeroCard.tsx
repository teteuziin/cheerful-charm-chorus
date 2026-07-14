import { ArrowRight, Flag } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { JourneyDTO } from "@/types";

export function JourneyHeroCard({ data }: { data: JourneyDTO }) {
  const pct = Math.round((data.currentDay / data.totalDays) * 100);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl border border-primary/30 text-primary-foreground p-6 md:p-8"
      style={{
        backgroundImage:
          "linear-gradient(135deg, oklch(0.42 0.15 145) 0%, oklch(0.55 0.17 145) 55%, oklch(0.68 0.16 145) 100%)",
        boxShadow: "var(--shadow-glow)",
      }}
      aria-label="Sua jornada atual"
    >
      <div
        aria-hidden
        className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -left-10 -bottom-24 h-56 w-56 rounded-full bg-white/10 blur-3xl"
      />

      <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-[11px] font-medium uppercase tracking-[0.16em]">
            <Flag className="h-3 w-3" />
            Programa atual
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight">
            {data.programName}
          </h2>
          <p className="mt-1 text-sm md:text-base text-white/85">
            Objetivo: <span className="font-semibold">{data.goal}</span>
            {data.coach && <> · com {data.coach}</>}
          </p>
        </div>

        <div className="shrink-0 rounded-2xl bg-white/10 backdrop-blur px-4 py-3 text-center">
          <div className="text-[11px] uppercase tracking-widest text-white/70">Dia</div>
          <div className="mt-0.5 text-2xl font-bold">
            {data.currentDay}
            <span className="text-white/70 text-base font-semibold"> / {data.totalDays}</span>
          </div>
        </div>
      </div>

      <div className="relative mt-8">
        <div className="flex items-center justify-between text-xs text-white/80">
          <span>Progresso do programa</span>
          <span className="font-semibold text-white">{pct}%</span>
        </div>
        <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-white/15">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="h-full rounded-full bg-white"
          />
        </div>
        {data.nextMilestone && (
          <p className="mt-2 text-xs text-white/70">{data.nextMilestone}</p>
        )}
      </div>

      <div className="relative mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <p className="text-sm text-white/85 max-w-md">
          Cada dia é um passo. Mantenha o ritmo e conquiste sua melhor versão.
        </p>
        <Button
          size="lg"
          className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 font-semibold rounded-full px-6"
        >
          Continuar Treino
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </div>
    </motion.section>
  );
}
