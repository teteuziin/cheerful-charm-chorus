import type { TodayDTO } from "@/types";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getToday(): Promise<TodayDTO> {
  await wait(220); // simulate latency
  return {
    greetingName: "João",
    dateISO: new Date().toISOString(),
    journey: {
      programName: "Trevo Strong",
      goal: "Hipertrofia",
      currentDay: 18,
      totalDays: 90,
      coach: "Prof. Marina Souza",
      nextMilestone: "Reavaliação em 12 dias",
    },
    pulse: {
      score: 82,
      label: "Excelente Evolução",
      message: "Continue assim. Sua constância está acima da média.",
      trend: "up",
    },
    workout: {
      id: "w-1",
      code: "Treino A",
      title: "Peito e Tríceps",
      durationMin: 55,
      exercisesCount: 7,
      intensity: "moderada",
    },
    meals: [
      { slot: "café", time: "07:30", title: "Ovos, aveia e frutas", kcal: 420, status: "feito" },
      { slot: "almoço", time: "12:30", title: "Frango grelhado, arroz integral, salada", kcal: 720, status: "feito" },
      { slot: "lanche", time: "16:00", title: "Iogurte, whey e castanhas", kcal: 310, status: "pendente" },
      { slot: "jantar", time: "20:00", title: "Salmão assado com legumes", kcal: 560, status: "pendente" },
    ],
    goal: {
      title: "Ganhar 5 kg de massa magra",
      progress: 42,
      currentLabel: "+2,1 kg",
      targetLabel: "+5,0 kg",
      deadline: "em 6 semanas",
    },
    agenda: [
      { id: "a1", time: "18:00", title: "Avaliação Física", location: "Sala 2 · Trevo Fit", kind: "avaliação" },
    ],
    diary: { hasEntryToday: false, streakDays: 6 },
    checkin: { answered: false, moodScale: 0 },
    announcements: [
      { id: "n1", title: "Nova aula de mobilidade toda quarta às 19h", from: "Trevo Fit", createdAt: new Date().toISOString(), pinned: true },
      { id: "n2", title: "Bônus: e-book de receitas hipercalóricas liberado", from: "NutriLife", createdAt: new Date().toISOString() },
    ],
    achievement: {
      emoji: "🏆",
      title: "Primeira Semana Completa",
      description: "Parabéns! Continue evoluindo, um dia de cada vez.",
      earnedAt: new Date().toISOString(),
    },
  };
}
