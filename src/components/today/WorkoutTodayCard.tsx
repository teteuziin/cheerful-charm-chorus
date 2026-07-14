import { motion } from "framer-motion";
import { Clock, Dumbbell, Flame, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { WorkoutDTO } from "@/types";

const intensityLabel: Record<WorkoutDTO["intensity"], string> = {
  leve: "Leve",
  moderada: "Moderada",
  intensa: "Intensa",
};

export function WorkoutTodayCard({ data }: { data: WorkoutDTO }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.35 }}
      className="surface-card p-5 md:p-6 flex flex-col gap-4"
    >
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Treino de hoje
          </div>
          <div className="mt-1 flex items-center gap-2">
            <span className="rounded-md bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
              {data.code}
            </span>
            <h3 className="text-lg font-semibold text-foreground truncate">{data.title}</h3>
          </div>
        </div>
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
          <Dumbbell className="h-5 w-5" />
        </span>
      </header>

      <div className="grid grid-cols-3 gap-2 text-center">
        <MetricPill icon={Clock} label="Duração" value={`${data.durationMin} min`} />
        <MetricPill icon={Dumbbell} label="Exercícios" value={String(data.exercisesCount)} />
        <MetricPill icon={Flame} label="Intensidade" value={intensityLabel[data.intensity]} />
      </div>

      <Button className="w-full h-11 rounded-full font-semibold">
        <Play className="mr-1.5 h-4 w-4" />
        Iniciar Treino
      </Button>
    </motion.article>
  );
}

function MetricPill({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-muted/50 px-2 py-2.5">
      <Icon className="mx-auto h-3.5 w-3.5 text-muted-foreground" />
      <div className="mt-1 text-sm font-semibold text-foreground">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}
