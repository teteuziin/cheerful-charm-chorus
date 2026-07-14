import { motion } from "framer-motion";
import { CalendarDays, MapPin } from "lucide-react";
import type { AgendaItemDTO } from "@/types";

export function AgendaCard({ items }: { items: AgendaItemDTO[] }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25, duration: 0.35 }}
      className="surface-card p-5 md:p-6 flex flex-col gap-4"
    >
      <header className="flex items-center justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Agenda
          </div>
          <h3 className="mt-0.5 text-lg font-semibold text-foreground">Hoje</h3>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <CalendarDays className="h-4.5 w-4.5" />
        </span>
      </header>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nada agendado para hoje.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((it) => (
            <li
              key={it.id}
              className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface/50 px-3 py-2.5"
            >
              <div className="grid place-items-center rounded-lg bg-primary/10 text-primary min-w-14 py-1.5">
                <div className="text-sm font-bold leading-none">{it.time}</div>
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-foreground truncate">{it.title}</div>
                {it.location && (
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{it.location}</span>
                  </div>
                )}
              </div>
              <span className="rounded-full bg-accent/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground shrink-0">
                {it.kind}
              </span>
            </li>
          ))}
        </ul>
      )}
    </motion.article>
  );
}
