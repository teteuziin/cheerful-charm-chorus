import { motion } from "framer-motion";
import { Megaphone, Pin } from "lucide-react";
import type { AnnouncementDTO } from "@/types";

export function AnnouncementCard({ items }: { items: AnnouncementDTO[] }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.35 }}
      className="surface-card p-5 md:p-6 flex flex-col gap-4"
    >
      <header className="flex items-center justify-between">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Comunicação
          </div>
          <h3 className="mt-0.5 text-lg font-semibold text-foreground">Últimos comunicados</h3>
        </div>
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
          <Megaphone className="h-4.5 w-4.5" />
        </span>
      </header>
      <ul className="space-y-2">
        {items.map((a) => (
          <li
            key={a.id}
            className="flex items-start gap-3 rounded-xl border border-border/60 bg-surface/50 px-3 py-2.5"
          >
            {a.pinned && <Pin className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />}
            <div className="min-w-0">
              <div className="text-sm font-medium text-foreground">{a.title}</div>
              <div className="text-[11px] text-muted-foreground">{a.from}</div>
            </div>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
