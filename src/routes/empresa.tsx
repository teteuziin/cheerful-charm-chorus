import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Building2 } from "lucide-react";
import { companies } from "@/config/companies";
import { useCompanyStore } from "@/store/companyStore";
import { Logo } from "@/components/common/Logo";
import { ThemeSwitch } from "@/components/common/ThemeSwitch";
import type { Company } from "@/types";

export const Route = createFileRoute("/empresa")({
  ssr: false,
  head: () => ({
    meta: [{ title: "Escolha sua empresa · TrevoOne" }],
  }),
  component: EmpresaPage,
});

function EmpresaPage() {
  const navigate = useNavigate();
  const select = useCompanyStore((s) => s.select);

  const onSelect = (c: Company) => {
    select(c);
    navigate({ to: "/login" });
  };

  return (
    <div className="min-h-dvh bg-background gradient-hero">
      <div className="mx-auto max-w-6xl px-4 md:px-6 py-6 flex items-center justify-between">
        <Logo />
        <ThemeSwitch />
      </div>

      <div className="mx-auto max-w-3xl px-4 md:px-6 pt-6 pb-4 text-center">
        <span className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-primary">
          <Building2 className="h-3.5 w-3.5" />
          Bem-vindo
        </span>
        <h1 className="mt-3 text-h1 text-foreground">Escolha sua empresa</h1>
        <p className="mt-3 text-base text-muted-foreground max-w-xl mx-auto">
          Selecione a organização para acessar sua jornada de saúde e performance no TrevoOne.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-6 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((c, i) => (
            <motion.button
              key={c.id}
              onClick={() => onSelect(c)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -3 }}
              className="group text-left surface-card p-6 transition-all hover:shadow-[var(--shadow-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className="flex items-center justify-between">
                <span
                  className="grid h-14 w-14 place-items-center rounded-2xl text-white text-xl font-bold shadow-[var(--shadow-soft)]"
                  style={{ backgroundColor: c.color }}
                >
                  {c.logoInitial}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-foreground">{c.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.description}</p>
              <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
                <span>Entrar como membro</span>
                <span className="font-medium text-primary group-hover:underline">Continuar</span>
              </div>
            </motion.button>
          ))}
        </div>

        <div className="mt-10 text-center text-xs text-muted-foreground">
          Não encontrou sua empresa? Entre em contato com o administrador da sua organização.
        </div>
      </div>
    </div>
  );
}
