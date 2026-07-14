import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { organizationsService } from "@/services/organizations.service";
import { useCompanyStore } from "@/store/companyStore";
import { Logo } from "@/components/common/Logo";
import { ThemeSwitch } from "@/components/common/ThemeSwitch";
import { OrganizationCard } from "@/components/common/OrganizationCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { OrganizationDTO } from "@/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/empresa")({
  ssr: false,
  head: () => ({ meta: [{ title: "Portal · TrevoOne" }] }),
  component: PortalPage,
});

function PortalPage() {
  const navigate = useNavigate();
  const select = useCompanyStore((s) => s.select);
  const [orgs, setOrgs] = useState<OrganizationDTO[] | null>(null);
  const [selectingId, setSelectingId] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    organizationsService.list().then((o) => alive && setOrgs(o));
    return () => {
      alive = false;
    };
  }, []);

  const onSelect = (o: OrganizationDTO) => {
    if (selectingId) return;
    setSelectingId(o.id);
    select(o);
    setTimeout(() => navigate({ to: "/login" }), 380);
  };

  const single = orgs?.length === 1;

  return (
    <div className="min-h-dvh w-full overflow-x-hidden bg-background gradient-hero">
      <header className="mx-auto max-w-6xl px-4 md:px-6 pt-[env(safe-area-inset-top)]">
        <div className="flex items-center justify-between py-5">
          <Logo />
          <ThemeSwitch />
        </div>
      </header>

      {/* Hero compacto */}
      <section className="mx-auto max-w-3xl px-4 md:px-6 pt-2 pb-2 text-center">
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary"
        >
          <Sparkles className="h-3.5 w-3.5" />
          Ecossistema TrevoOne
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mt-3 text-2xl md:text-4xl font-bold tracking-tight text-foreground"
        >
          Bem-vindo ao TrevoOne
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-sm md:text-base text-muted-foreground max-w-lg mx-auto"
        >
          Selecione seu acompanhamento para continuar sua jornada.
        </motion.p>
      </section>

      <main className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 py-8 pb-[calc(env(safe-area-inset-bottom)+3rem)]">
        {!orgs ? (
          <div className={cn("grid gap-4 mx-auto", "max-w-md")}>
            <Skeleton className="h-72 rounded-[28px]" />
          </div>
        ) : (
          <div
            className={cn(
              "grid gap-5 mx-auto",
              single ? "max-w-md" : "sm:grid-cols-2 xl:grid-cols-3 max-w-6xl",
            )}
          >
            {orgs.map((o, i) => (
              <OrganizationCard
                key={o.id}
                organization={o}
                onSelect={onSelect}
                selecting={selectingId === o.id}
                dim={!!selectingId && selectingId !== o.id}
                index={i}
              />
            ))}
          </div>
        )}

        <p className="mt-10 text-center text-xs text-muted-foreground">
          Não encontrou seu acompanhamento? Fale com o administrador da sua organização.
        </p>
      </main>
    </div>
  );
}
