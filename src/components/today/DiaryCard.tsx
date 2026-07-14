import { motion } from "framer-motion";
import { BookOpen, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DiaryDTO } from "@/types";

export function DiaryCard({ data }: { data: DiaryDTO }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.35 }}
      className="surface-card p-5 md:p-6 flex flex-col gap-3"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Diário
          </div>
          <h3 className="mt-0.5 text-lg font-semibold text-foreground">
            {data.hasEntryToday ? "Registro feito 🎉" : "Você ainda não escreveu hoje"}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground inline-flex items-center gap-1">
            <Flame className="h-3.5 w-3.5 text-primary" />
            {data.streakDays} dias seguidos
          </p>
        </div>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <BookOpen className="h-4.5 w-4.5" />
        </span>
      </div>

      <Button variant="outline" className="w-full rounded-full">
        {data.hasEntryToday ? "Ver diário" : "Escrever Diário"}
      </Button>
    </motion.article>
  );
}
