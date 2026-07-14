import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { PageHeader } from "@/components/common/PageHeader";
import { SectionTitle } from "@/components/common/SectionTitle";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { getJourney } from "@/services/journey.service";
import type { JourneyDetailDTO } from "@/types";
import { JourneyHero } from "@/components/journey/JourneyHero";
import { JourneyTimeline } from "@/components/journey/JourneyTimeline";
import { EvolutionCard } from "@/components/journey/EvolutionCard";
import { AchievementCard } from "@/components/journey/AchievementCard";
import { GoalCard } from "@/components/journey/GoalCard";
import { ProgressPhotosCard } from "@/components/journey/ProgressPhotosCard";
import { HabitsCard } from "@/components/journey/HabitsCard";
import { AgendaCard } from "@/components/journey/AgendaCard";

export const Route = createFileRoute("/_app/jornada")({
  head: () => ({ meta: [{ title: "Minha Jornada · TrevoOne" }] }),
  component: JornadaPage,
});

function JornadaPage() {
  const [data, setData] = useState<JourneyDetailDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    getJourney()
      .then((d) => alive && setData(d))
      .catch(() => alive && setError("Não foi possível carregar sua jornada."));
    return () => {
      alive = false;
    };
  }, []);

  if (error) {
    return (
      <>
        <PageHeader title="Minha Jornada" description="Acompanhe sua evolução diariamente." />
        <div className="surface-card p-8 flex flex-col items-center text-center gap-3">
          <AlertCircle className="h-8 w-8 text-destructive" />
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button onClick={() => window.location.reload()} variant="outline" size="sm">
            Tentar novamente
          </Button>
        </div>
      </>
    );
  }

  if (!data) return <JornadaSkeleton />;

  const fade = {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <>
      <PageHeader title="Minha Jornada" description="Acompanhe sua evolução diariamente." />

      <JourneyHero data={data.hero} />

      {/* Evolução */}
      <motion.section {...fade} transition={{ delay: 0.05 }} className="mt-8 md:mt-10">
        <SectionTitle eyebrow="Evolução" title="Sua evolução física" description="Últimos 30 dias." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.evolution.map((m) => (
            <EvolutionCard key={m.key} metric={m} />
          ))}
        </div>
      </motion.section>

      {/* Metas + Hábitos */}
      <motion.section {...fade} transition={{ delay: 0.1 }} className="mt-8 md:mt-10 grid gap-4 lg:grid-cols-2">
        <div className="grid gap-4">
          <GoalCard goal={data.goalCurrent} variant="current" />
          <GoalCard goal={data.goalNext} variant="next" />
        </div>
        <HabitsCard habits={data.habits} />
      </motion.section>

      {/* Fotos + Agenda */}
      <motion.section {...fade} transition={{ delay: 0.15 }} className="mt-8 md:mt-10 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <ProgressPhotosCard photos={data.photos} />
        <AgendaCard items={data.agenda} />
      </motion.section>

      {/* Conquistas */}
      <motion.section {...fade} transition={{ delay: 0.2 }} className="mt-8 md:mt-10">
        <SectionTitle eyebrow="Conquistas" title="Suas medalhas" description="Pequenas vitórias que impulsionam a jornada." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {data.achievements.map((a, i) => (
            <AchievementCard key={a.title} item={a} index={i} />
          ))}
        </div>
      </motion.section>

      {/* Timeline */}
      <motion.section {...fade} transition={{ delay: 0.25 }} className="mt-8 md:mt-10 mb-4">
        <SectionTitle eyebrow="Linha do tempo" title="Cada passo conta" description="Tudo o que aconteceu nas últimas semanas." />
        <JourneyTimeline events={data.timeline} />
      </motion.section>
    </>
  );
}

function JornadaSkeleton() {
  return (
    <>
      <PageHeader title="Minha Jornada" description="Acompanhe sua evolução diariamente." />
      <Skeleton className="h-56 w-full rounded-3xl" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Skeleton className="h-64 rounded-2xl" />
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    </>
  );
}
