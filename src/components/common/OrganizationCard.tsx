import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { OrganizationDTO, OrganizationStatus } from "@/types";
import { cn } from "@/lib/utils";

const statusStyles: Record<OrganizationStatus, { label: string; className: string }> = {
  active: { label: "Ativa", className: "bg-success/15 text-success ring-1 ring-success/25" },
  beta: { label: "Beta", className: "bg-warning/20 text-warning-foreground ring-1 ring-warning/30" },
  "coming-soon": { label: "Em breve", className: "bg-muted text-muted-foreground ring-1 ring-border/50" },
};

interface Props {
  organization: OrganizationDTO;
  onSelect?: (org: OrganizationDTO) => void;
  selecting?: boolean;
  dim?: boolean;
  index?: number;
}

export function OrganizationCard({ organization, onSelect, selecting, dim, index = 0 }: Props) {
  const grad = organization.gradient ?? [organization.color, organization.color];
  const st = statusStyles[organization.status];

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      animate={{
        opacity: dim ? 0.4 : 1,
        y: 0,
        scale: selecting ? 1.02 : 1,
      }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: "easeOut" }}
      whileHover={!selecting ? { y: -4, scale: 1.02 } : undefined}
      className={cn(
        "group relative isolate w-full text-left rounded-[28px] border border-border/60 bg-card overflow-hidden",
        "shadow-[0_1px_2px_rgba(0,0,0,0.04),0_12px_32px_-16px_rgba(0,0,0,0.15)]",
        "transition-shadow duration-300 hover:shadow-[0_2px_4px_rgba(0,0,0,0.06),0_24px_48px_-20px_rgba(0,0,0,0.25)] hover:border-primary/30",
      )}
      aria-label={`Organização ${organization.name}`}
    >
      {/* Banner de identidade */}
      <div
        aria-hidden
        className="relative h-20 w-full"
        style={{ backgroundImage: `linear-gradient(135deg, ${grad[0]}, ${grad[1]})` }}
      >
        <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_10%,white,transparent_45%),radial-gradient(circle_at_85%_90%,white,transparent_40%)]" />
        <span
          className={cn(
            "absolute top-3 right-3 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-white/95 text-foreground backdrop-blur",
          )}
        >
          <span className={cn("inline-block h-1.5 w-1.5 rounded-full mr-1.5 align-middle", organization.status === "active" ? "bg-success" : "bg-muted-foreground")} />
          {st.label}
        </span>
      </div>

      {/* Logo sobreposta */}
      <div className="px-6 -mt-10 flex items-start justify-between gap-3">
        <span
          className="relative grid h-20 w-20 shrink-0 place-items-center rounded-2xl text-white text-3xl font-bold shadow-[0_10px_24px_-8px_rgba(0,0,0,0.35)] ring-4 ring-card"
          style={{ backgroundImage: `linear-gradient(135deg, ${grad[0]}, ${grad[1]})` }}
        >
          {organization.logoInitial}
        </span>
      </div>

      <div className="px-6 pt-3 pb-6">
        <span className="inline-block rounded-md bg-accent/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
          {organization.category}
        </span>
        <h3 className="mt-2.5 text-xl font-bold tracking-tight text-foreground truncate">
          {organization.name}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {organization.description}
        </p>

        <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{organization.city}</span>
        </div>

        <Button
          onClick={() => onSelect?.(organization)}
          disabled={selecting}
          className="mt-5 w-full h-11 rounded-full font-semibold shadow-[var(--shadow-glow)] group/btn"
        >
          {selecting ? "Entrando…" : "Entrar"}
          <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
        </Button>
      </div>
    </motion.article>
  );
}
