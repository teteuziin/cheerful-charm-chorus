import type { JourneyDetailDTO } from "@/types";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function isoDaysAgo(d: number) {
  const dt = new Date();
  dt.setDate(dt.getDate() - d);
  return dt.toISOString();
}

export async function getJourney(): Promise<JourneyDetailDTO> {
  await wait(240);
  return {
    hero: {
      programName: "Trevo Strong",
      goal: "Hipertrofia",
      currentDay: 18,
      totalDays: 90,
      coach: "Prof. Marina Souza",
      nextMilestone: "Reavaliação em 12 dias",
    },
    timeline: [
      { id: "t1", kind: "workout", title: "Treino A concluído", description: "Peito e Tríceps · 55 min", dateISO: isoDaysAgo(0) },
      { id: "t2", kind: "checkin", title: "Check-in realizado", description: "Humor: ótimo · Energia: alta", dateISO: isoDaysAgo(0) },
      { id: "t3", kind: "photo", title: "Foto de evolução adicionada", dateISO: isoDaysAgo(1) },
      { id: "t4", kind: "meal-plan", title: "Plano alimentar atualizado", description: "Ajuste de +150 kcal", dateISO: isoDaysAgo(2) },
      { id: "t5", kind: "assessment", title: "Nova avaliação registrada", description: "Peso: 74,2 kg · %G: 17,4", dateISO: isoDaysAgo(4) },
      { id: "t6", kind: "goal", title: "Meta atingida", description: "7 dias consecutivos de treino", dateISO: isoDaysAgo(6) },
      { id: "t7", kind: "workout", title: "Treino B concluído", description: "Costas e Bíceps · 50 min", dateISO: isoDaysAgo(7) },
    ],
    evolution: [
      {
        key: "weight",
        label: "Peso",
        unit: "kg",
        latest: 74.2,
        delta: -0.6,
        series: [76, 75.6, 75.2, 75, 74.8, 74.5, 74.2].map((v, i) => ({
          dateISO: isoDaysAgo(30 - i * 5),
          value: v,
        })),
      },
      {
        key: "bodyFat",
        label: "% Gordura",
        unit: "%",
        latest: 17.4,
        delta: -0.9,
        series: [19.2, 18.9, 18.5, 18.1, 17.9, 17.6, 17.4].map((v, i) => ({
          dateISO: isoDaysAgo(30 - i * 5),
          value: v,
        })),
      },
      {
        key: "muscleMass",
        label: "Massa Muscular",
        unit: "kg",
        latest: 36.8,
        delta: 0.7,
        series: [35.4, 35.6, 35.9, 36.1, 36.4, 36.6, 36.8].map((v, i) => ({
          dateISO: isoDaysAgo(30 - i * 5),
          value: v,
        })),
      },
      {
        key: "bmi",
        label: "IMC",
        unit: "",
        latest: 23.1,
        delta: -0.3,
        series: [23.8, 23.7, 23.5, 23.4, 23.3, 23.2, 23.1].map((v, i) => ({
          dateISO: isoDaysAgo(30 - i * 5),
          value: v,
        })),
      },
    ],
    achievements: [
      { emoji: "🏆", title: "Primeira Semana", description: "Concluiu a primeira semana completa.", earnedAt: isoDaysAgo(11) },
      { emoji: "🔥", title: "7 dias consecutivos", description: "Streak de treinos sem falhas.", earnedAt: isoDaysAgo(6) },
      { emoji: "💪", title: "Primeiro treino completo", description: "Todos os exercícios registrados.", earnedAt: isoDaysAgo(17) },
      { emoji: "📸", title: "Primeira foto de evolução", description: "Registrou o ponto inicial.", earnedAt: isoDaysAgo(14) },
    ],
    goalCurrent: {
      title: "Ganhar 5 kg de massa magra",
      progress: 42,
      currentLabel: "+2,1 kg",
      targetLabel: "+5,0 kg",
      deadline: "em 6 semanas",
    },
    goalNext: {
      title: "Reduzir % de gordura para 15%",
      progress: 12,
      currentLabel: "17,4%",
      targetLabel: "15,0%",
      deadline: "próximo ciclo",
    },
    photos: [
      {
        id: "p1",
        beforeUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=70",
        afterUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=70",
        beforeDateISO: isoDaysAgo(60),
        afterDateISO: isoDaysAgo(2),
        label: "60 dias de evolução",
      },
    ],
    habits: [
      { key: "water", label: "Água", emoji: "💧", value: 1.8, target: 2.5, unit: "L" },
      { key: "sleep", label: "Sono", emoji: "😴", value: 7.2, target: 8, unit: "h" },
      { key: "steps", label: "Passos", emoji: "👟", value: 6800, target: 10000, unit: "" },
      { key: "checkin", label: "Check-in", emoji: "😊", value: 6, target: 7, unit: "dias" },
    ],
    agenda: [
      { id: "a1", time: "Amanhã · 07:00", title: "Treino B — Costas/Bíceps", kind: "treino" },
      { id: "a2", time: "Qua · 18:00", title: "Avaliação Física", location: "Sala 2", kind: "avaliação" },
      { id: "a3", time: "Sex · 10:00", title: "Retorno com nutricionista", kind: "consulta" },
    ],
  };
}
