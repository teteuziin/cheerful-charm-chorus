import { Calendar, ChevronRight } from "lucide-react";
import type { AgendaItemDTO } from "@/types";

const kindTone: Record<AgendaItemDTO["kind"], string> = {
  avaliação: "bg-chart-4/20 text-chart-4",
  consulta: "bg-secondary/25 text-secondary-foreground",
  treino: "bg-primary/15 text-primary",
  aula: "bg-accent/40 text-accent-foreground",
};

export function AgendaCard({ items }: { items: AgendaItemDTO[] }) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-bold text-foreground inline-flex items-center gap-2">
          <Calendar className="h-4 w-4 text-primary" /> Próximos eventos
        </h4>
      </div>
      <ul className="space-y-2">
        {items.map((it) => (
          <li
            key={it.id}
            className="flex items-center gap-3 p-3 rounded-xl border border-border/60 hover:border-primary/30 hover:bg-muted/40 transition-colors"
          >
            <span className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${kindTone[it.kind]}`}>
              {it.kind}
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold text-foreground truncate">{it.title}</div>
              <div className="text-xs text-muted-foreground truncate">
                {it.time}
                {it.location && ` · ${it.location}`}
              </div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
          </li>
        ))}
      </ul>
    </div>
  );
}
