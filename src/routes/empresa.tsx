import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Building2, MapPin, Users } from "lucide-react";
import { useState } from "react";
import { companies } from "@/config/companies";
import { useCompanyStore } from "@/store/companyStore";
import { Logo } from "@/components/common/Logo";
import { ThemeSwitch } from "@/components/common/ThemeSwitch";
import type { Company, CompanyStatus } from "@/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/empresa")({
  ssr: false,
  head: () => ({ meta: [{ title: "Escolha sua empresa · TrevoOne" }] }),
  component: EmpresaPage,
});

const statusStyles: Record<CompanyStatus, { label: string; className: string }> = {
  active: { label: "Ativa", className: "bg-success/15 text-success" },
  beta: { label: "Beta", className: "bg-warning/20 text-warning-foreground" },
  "coming-soon": { label: "Em breve", className: "bg-muted text-muted-foreground" },
};

function EmpresaPage() {
  const navigate = useNavigate();
  const select = useCompanyStore((s) => s.select);
  const [selectingId, setSelectingId] = useState<string | null>(null);

  const onSelect = (c: Company) => {
    if (selectingId) return;
    setSelectingId(c.id);
    select(c);
    setTimeout(() => navigate({ to: "/login" }), 360);
  };

  return (
    <div className="min-h-dvh w-full overflow-x-hidden bg-background gradient-hero">
      <div className="mx-auto max-w-6xl px-4 md:px-6 pt-[env(safe-area-inset-top)]">
        <div className="flex items-center justify-between py-5">
          <Logo />
          <ThemeSwitch />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 md:px-6 pt-4 pb-2 text-center">
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary"
        >
          <Building2 className="h-3.5 w-3.5" />
          Escolha sua empresa
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-foreground"
        >
          Bem-vindo ao TrevoOne
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-base text-muted-foreground max-w-xl mx-auto"
        >
          Selecione a organização para acessar sua jornada de saúde e performance.
        </motion.p>
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-6 py-8 pb-[calc(env(safe-area-inset-bottom)+2rem)]">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {companies.map((c, i) => {
            const isSelecting = selectingId === c.id;
            const dim = selectingId && !isSelecting;
            const grad = c.gradient ?? [c.color, c.color];
            const st = statusStyles[c.status];
            return (
              <motion.button
                key={c.id}
                onClick={() => onSelect(c)}
                initial={{ opacity: 0, y: 14 }}
                animate={{
                  opacity: dim ? 0.35 : 1,
                  y: 0,
                  scale: isSelecting ? 1.02 : 1,
                }}
                transition={{ delay: i * 0.06, duration: 0.35 }}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.99 }}
                disabled={!!selectingId}
                className={cn(
                  "group relative isolate w-full text-left rounded-3xl border border-border/60 bg-card overflow-hidden",
                  "transition-all duration-300 hover:shadow-[var(--shadow-elevated)] hover:border-primary/30",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
                aria-label={`Entrar em ${c.name}`}
              >
                {/* Banner (contido dentro do card) */}
                <div
                  aria-hidden
                  className="relative h-20 w-full"
                  style={{ backgroundImage: `linear-gradient(135deg, ${grad[0]}, ${grad[1]})` }}
                >
                  <div className="absolute inset-0 opacity-30 [background:radial-gradient(circle_at_20%_10%,white,transparent_45%),radial-gradient(circle_at_85%_90%,white,transparent_40%)]" />
                  {c.bannerLabel && (
                    <span className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-foreground">
                      {c.bannerLabel}
                    </span>
                  )}
                </div>

                {/* Header: logo + status */}
                <div className="px-5 -mt-7 flex items-start justify-between gap-3">
                  <span
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-white text-xl font-bold shadow-[var(--shadow-elevated)] ring-4 ring-card"
                    style={{ backgroundImage: `linear-gradient(135deg, ${grad[0]}, ${grad[1]})` }}
                  >
                    {c.logoInitial}
                  </span>
                  <span
                    className={cn(
                      "mt-8 rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                      st.className,
                    )}
                  >
                    {st.label}
                  </span>
                </div>

                <div className="px-5 pt-3 pb-5">
                  <span className="inline-block rounded-md bg-accent/40 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent-foreground">
                    {c.category}
                  </span>
                  <h3 className="mt-2.5 text-lg font-bold text-foreground truncate">{c.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {c.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-border/60 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground min-w-0">
                      <span className="inline-flex items-center gap-1 shrink-0">
                        <Users className="h-3.5 w-3.5" /> {c.students.toLocaleString("pt-BR")}
                      </span>
                      <span className="inline-flex items-center gap-1 min-w-0">
                        <MapPin className="h-3.5 w-3.5 shrink-0" />
                        <span className="truncate">{c.city}</span>
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary shrink-0 group-hover:gap-2 transition-all">
                      Entrar <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>

                {isSelecting && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 grid place-items-center bg-primary/10 backdrop-blur-[2px] rounded-3xl"
                  >
                    <span className="rounded-full bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 shadow-[var(--shadow-glow)]">
                      Selecionando…
                    </span>
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="mt-10 text-center text-xs text-muted-foreground">
          Não encontrou sua empresa? Entre em contato com o administrador da sua organização.
        </div>
      </div>
    </div>
  );
}
