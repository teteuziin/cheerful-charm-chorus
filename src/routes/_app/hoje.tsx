import { createFileRoute } from "@tanstack/react-router";
import { Activity, Droplet, Flame, HeartPulse, Moon, Plus } from "lucide-react";
import { PageHeader, SectionHeader } from "@/components/common/PageHeader";
import { StatCard, InfoCard, TimelineCard, PulseCard, JourneyCard } from "@/components/common/Cards";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/userStore";
import { formatters } from "@/utils/formatters";

export const Route = createFileRoute("/_app/hoje")({
  head: () => ({ meta: [{ title: "Hoje · TrevoOne" }] }),
  component: HojePage,
});

function HojePage() {
  const user = useUserStore((s) => s.profile);
  const firstName = user?.name.split(" ")[0] ?? "por aí";
  const today = formatters.date(new Date());

  return (
    <>
      <PageHeader
        title={`Olá, ${firstName} 👋`}
        description={`Hoje é ${today}. Aqui está o resumo da sua jornada.`}
        actions={
          <Button className="hidden md:inline-flex" disabled>
            <Plus className="mr-2 h-4 w-4" /> Registrar
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Frequência" value="72 bpm" hint="Repouso · média 7d" icon={HeartPulse} trend={{ value: "-2%", positive: true }} />
        <StatCard label="Passos" value="8.412" hint="Meta 10.000" icon={Activity} trend={{ value: "+12%", positive: true }} />
        <StatCard label="Calorias" value="1.940 kcal" hint="Balanço saudável" icon={Flame} />
        <StatCard label="Hidratação" value="1,8 L" hint="Meta 2,5 L" icon={Droplet} />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SectionHeader title="Sua rotina de hoje" description="Placeholder — próximos módulos ativam este bloco." />
          <div className="space-y-3">
            <TimelineCard time="07:00" title="Alongamento matinal" description="10 min · foco em mobilidade" status="done" />
            <TimelineCard time="10:30" title="Check-in de bem-estar" description="Como você está se sentindo?" status="now" />
            <TimelineCard time="17:30" title="Treino de força" description="Superior · 45 min" status="next" />
            <TimelineCard time="21:00" title="Reflexão do dia" description="Diário rápido" status="next" />
          </div>
        </div>

        <div className="space-y-4">
          <SectionHeader title="Pulse" description="Indicadores instantâneos" />
          <PulseCard label="Energia" value="Alta · 8/10" />
          <PulseCard label="Sono" value="7h 12min" />
          <InfoCard
            title="Descanso"
            description="Você dormiu bem, mantenha o ritmo."
            icon={Moon}
          />
          <JourneyCard title="Semana ativa" subtitle="4 de 6 dias" progress={66} />
        </div>
      </div>
    </>
  );
}
