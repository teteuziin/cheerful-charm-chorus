import { createFileRoute } from "@tanstack/react-router";
import { Route as RouteIcon, Trophy, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { JourneyCard, MetricCard, InfoCard } from "@/components/common/Cards";
import { EmptyState } from "@/components/common/EmptyState";

export const Route = createFileRoute("/_app/jornada")({
  head: () => ({ meta: [{ title: "Minha Jornada · TrevoOne" }] }),
  component: JornadaPage,
});

function JornadaPage() {
  return (
    <>
      <PageHeader title="Minha Jornada" description="Acompanhe sua evolução ao longo do tempo." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Consistência" value="86" unit="%" progress={86} />
        <MetricCard label="Treinos" value="42" unit="/ 60" progress={70} />
        <MetricCard label="Hábitos" value="12" unit="ativos" />
        <MetricCard label="Meta atual" value="Emagrecer" />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <JourneyCard title="Fase 1 · Adaptação" subtitle="Concluída" progress={100} />
        <JourneyCard title="Fase 2 · Construção" subtitle="Em andamento" progress={55} />
        <JourneyCard title="Fase 3 · Performance" subtitle="Próxima etapa" progress={0} />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <InfoCard
          title="Conquistas recentes"
          description="Pequenas vitórias que compõem sua jornada."
          icon={Trophy}
        >
          <ul className="space-y-2 text-sm">
            <li className="flex items-center justify-between"><span>Primeira semana completa</span><span className="text-xs text-muted-foreground">há 3d</span></li>
            <li className="flex items-center justify-between"><span>10 treinos no mês</span><span className="text-xs text-muted-foreground">há 1d</span></li>
          </ul>
        </InfoCard>

        <EmptyState
          icon={Sparkles}
          title="Insights personalizados em breve"
          description="Assim que módulos de treino e avaliação forem ativados, insights aparecerão aqui."
        />
      </div>

      <div className="mt-8">
        <div className="surface-card p-6 flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
            <RouteIcon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <div className="text-sm font-semibold text-foreground">Estrutura pronta para módulos futuros</div>
            <div className="text-xs text-muted-foreground">Treinos, dieta, avaliações e check-ins serão exibidos aqui.</div>
          </div>
        </div>
      </div>
    </>
  );
}
