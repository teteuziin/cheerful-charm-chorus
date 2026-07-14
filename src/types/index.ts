// TrevoOne — domain interfaces (preparadas para Laravel + MySQL, sem conexão nesta fase)

export interface Company {
  id: string;
  slug: string;
  name: string;
  description: string;
  color: string;
  logoInitial: string;
  logoUrl?: string;
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
  meta: {
    page: number;
    perPage: number;
    total: number;
    lastPage: number;
  };
}

export interface AuthSession {
  token: string;
  refreshToken: string;
  user: User;
  expiresAt: number;
}
