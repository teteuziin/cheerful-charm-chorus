import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { getToday } from "@/services/today.service";
import type { TodayDTO } from "@/types";
import { formatters } from "@/utils/formatters";
import { useUserStore } from "@/store/userStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { JourneyHeroCard } from "@/components/today/JourneyHeroCard";
import { PulseCard } from "@/components/today/PulseCard";
import { WorkoutTodayCard } from "@/components/today/WorkoutTodayCard";
import { MealTodayCard } from "@/components/today/MealTodayCard";
import { GoalCard } from "@/components/today/GoalCard";
import { AgendaCard } from "@/components/today/AgendaCard";
import { CheckinCard } from "@/components/today/CheckinCard";
import { DiaryCard } from "@/components/today/DiaryCard";
import { AnnouncementCard } from "@/components/today/AnnouncementCard";
import { AchievementCard } from "@/components/today/AchievementCard";

export const Route = createFileRoute("/_app/hoje")({
  head: () => ({ meta: [{ title: "Hoje · TrevoOne" }] }),
  component: HojePage,
});

function greetingFor(date: Date) {
  const h = date.getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

function HojePage() {
  const user = useUserStore((s) => s.profile);
  const [data, setData] = useState<TodayDTO | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    getToday()
      .then((d) => alive && setData(d))
      .catch(() => alive && setError("Não foi possível carregar sua rotina."));
    return () => {
      alive = false;
    };
  }, []);

  const now = new Date();
  const firstName = user?.name.split(" ")[0] ?? data?.greetingName ?? "por aí";
  const dateLabel = formatters.date(now);

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4"
      >
        <div className="min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground truncate">
            {greetingFor(now)}, {firstName} <span className="wave">👋</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground capitalize">Hoje é {dateLabel}.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            className="relative grid h-10 w-10 place-items-center rounded-full border border-border/60 bg-surface hover:bg-accent/40 transition-colors"
            aria-label="Notificações"
          >
            <Bell className="h-4 w-4 text-foreground/70" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary animate-pulse" />
          </button>
          <Avatar className="h-10 w-10 ring-2 ring-primary/20">
            <AvatarImage src={user?.avatarUrl} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {user ? formatters.initials(user.name) : "?"}
            </AvatarFallback>
          </Avatar>
        </div>
      </motion.header>

      {error && (
        <div className="surface-card border-destructive/40 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {!data ? (
        <TodaySkeleton />
      ) : (
        <>
          <JourneyHeroCard data={data.journey} />

          <div className="grid gap-4 md:gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 grid gap-4 md:gap-6 sm:grid-cols-2">
              <WorkoutTodayCard data={data.workout} />
              <GoalCard data={data.goal} />
              <MealTodayCard meals={data.meals} />
              <AgendaCard items={data.agenda} />
            </div>
            <div className="grid gap-4 md:gap-6">
              <PulseCard data={data.pulse} />
              <CheckinCard />
              <DiaryCard data={data.diary} />
            </div>
          </div>

          <div className="grid gap-4 md:gap-6 lg:grid-cols-[2fr_1fr]">
            <AnnouncementCard items={data.announcements} />
            <AchievementCard data={data.achievement} />
          </div>
        </>
      )}
    </div>
  );
}

function TodaySkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-52 w-full rounded-3xl" />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-2xl" />
          ))}
        </div>
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-2xl" />
          ))}
        </div>
      </div>
    </div>
  );
}
