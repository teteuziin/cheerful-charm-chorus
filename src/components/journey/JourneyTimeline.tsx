import { motion } from "framer-motion";
import { Dumbbell, Camera, Utensils, LineChart, Target, Smile, StickyNote } from "lucide-react";
import type { ComponentType } from "react";
import type { TimelineEventDTO, TimelineEventKind } from "@/types";
import { cn } from "@/lib/utils";

const iconFor: Record<TimelineEventKind, ComponentType<{ className?: string }>> = {
  workout: Dumbbell,
  photo: Camera,
  "meal-plan": Utensils,
  assessment: LineChart,
  goal: Target,
  checkin: Smile,
  note: StickyNote,
};

const toneFor: Record<TimelineEventKind, string> = {
  workout: "bg-primary/15 text-primary ring-primary/25",
  photo: "bg-accent/40 text-accent-foreground ring-accent/50",
  "meal-plan": "bg-secondary/25 text-secondary-foreground ring-secondary/40",
  assessment: "bg-chart-4/20 text-chart-4 ring-chart-4/30",
  goal: "bg-warning/25 text-warning-foreground ring-warning/40",
  checkin: "bg-success/20 text-success ring-success/30",
  note: "bg-muted text-muted-foreground ring-border",
};

function relative(dateISO: string) {
  const diff = Date.now() - new Date(dateISO).getTime();
  const d = Math.floor(diff / 86400000);
  if (d <= 0) return "hoje";
  if (d === 1) return "ontem";
  if (d < 7) return `há ${d} dias`;
  const w = Math.floor(d / 7);
  return `há ${w} sem`;
}

export function JourneyTimeline({ events }: { events: TimelineEventDTO[] }) {
  return (
    <ol className="relative">
      <span
        aria-hidden
        className="absolute left-[19px] top-1 bottom-1 w-px bg-gradient-to-b from-primary/40 via-border to-transparent"
      />
      <div className="space-y-3">
        {events.map((e, i) => {
          const Icon = iconFor[e.kind];
          return (
            <motion.li
              key={e.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="relative pl-14"
            >
              <span
                className={cn(
                  "absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full ring-4 ring-background",
                  toneFor[e.kind],
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="surface-card p-4 hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-sm font-semibold text-foreground">{e.title}</h4>
                  <span className="text-[11px] uppercase tracking-wider text-muted-foreground shrink-0">
                    {relative(e.dateISO)}
                  </span>
                </div>
                {e.description && (
                  <p className="mt-1 text-xs text-muted-foreground">{e.description}</p>
                )}
              </div>
            </motion.li>
          );
        })}
      </div>
    </ol>
  );
}
