import type { ProgressPhotoDTO } from "@/types";
import { ArrowRight, Camera } from "lucide-react";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
}

export function ProgressPhotosCard({ photos }: { photos: ProgressPhotoDTO[] }) {
  const p = photos[0];
  if (!p) return null;
  return (
    <div className="surface-card overflow-hidden">
      <div className="p-5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
            <Camera className="h-3.5 w-3.5" /> Evolução visual
          </span>
          <h4 className="mt-1 text-base font-bold text-foreground truncate">{p.label}</h4>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-px bg-border/60">
        <figure className="relative bg-card">
          <img
            src={p.beforeUrl}
            alt="Antes"
            loading="lazy"
            className="aspect-[3/4] w-full object-cover"
          />
          <figcaption className="absolute top-2 left-2 rounded-full bg-background/85 backdrop-blur px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-foreground">
            Antes · {formatDate(p.beforeDateISO)}
          </figcaption>
        </figure>
        <figure className="relative bg-card">
          <img
            src={p.afterUrl}
            alt="Depois"
            loading="lazy"
            className="aspect-[3/4] w-full object-cover"
          />
          <figcaption className="absolute top-2 left-2 rounded-full bg-primary text-primary-foreground px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
            Depois · {formatDate(p.afterDateISO)}
          </figcaption>
        </figure>
      </div>
      <div className="p-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        Comparação lado a lado <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </div>
  );
}
