// TrevoOne — domain interfaces (preparadas para Laravel + MySQL, sem conexão nesta fase)

export type CompanyCategory =
  | "Academia Premium"
  | "Consultoria"
  | "Nutrição"
  | "Clínica";

export type CompanyStatus = "active" | "beta" | "coming-soon";

export interface Company {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: CompanyCategory;
  color: string;
  gradient?: [string, string];
  logoInitial: string;
  logoUrl?: string;
  city: string;
  students: number;
  status: CompanyStatus;
  bannerLabel?: string;
}

export type Role = "admin" | "coach" | "nutritionist" | "student" | "patient";

export interface Permission {
  key: string;
  label: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role: Role;
  companyId: string;
  createdAt?: string;
}

export interface Notification {
  id: string;
  title: string;
  body?: string;
  read: boolean;
  createdAt: string;
  href?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: { page: number; perPage: number; total: number; lastPage: number };
}

export interface AuthSession {
  token: string;
  refreshToken: string;
  user: User;
  expiresAt: number;
}

/* ============================================================
 * Today (Home /hoje) — DTOs
 * ============================================================ */

export interface JourneyDTO {
  programName: string;
  goal: string;
  currentDay: number;
  totalDays: number;
  coach?: string;
  nextMilestone?: string;
}

export interface PulseDTO {
  score: number; // 0-100
  label: string; // "Excelente Evolução"
  message: string;
  trend: "up" | "down" | "steady";
}

export interface WorkoutDTO {
  id: string;
  code: string; // "Treino A"
  title: string; // "Peito e Tríceps"
  durationMin: number;
  exercisesCount: number;
  intensity: "leve" | "moderada" | "intensa";
}

export type MealSlot = "café" | "almoço" | "lanche" | "jantar";
export type MealStatus = "pendente" | "feito" | "pulado";

export interface MealDTO {
  slot: MealSlot;
  time: string; // "07:30"
  title: string;
  kcal: number;
  status: MealStatus;
}

export interface GoalDTO {
  title: string;
  progress: number; // 0-100
  currentLabel: string;
  targetLabel: string;
  deadline?: string;
}

export interface AgendaItemDTO {
  id: string;
  time: string;
  title: string;
  location?: string;
  kind: "avaliação" | "consulta" | "treino" | "aula";
}

export interface AnnouncementDTO {
  id: string;
  title: string;
  from: string;
  createdAt: string; // ISO
  pinned?: boolean;
}

export interface AchievementDTO {
  emoji: string;
  title: string;
  description: string;
  earnedAt: string; // ISO
}

export interface DiaryDTO {
  hasEntryToday: boolean;
  streakDays: number;
}

export interface CheckinDTO {
  answered: boolean;
  moodScale: number; // 1-5
}

export interface TodayDTO {
  greetingName: string;
  dateISO: string;
  journey: JourneyDTO;
  pulse: PulseDTO;
  workout: WorkoutDTO;
  meals: MealDTO[];
  goal: GoalDTO;
  agenda: AgendaItemDTO[];
  diary: DiaryDTO;
  checkin: CheckinDTO;
  announcements: AnnouncementDTO[];
  achievement: AchievementDTO;
}
