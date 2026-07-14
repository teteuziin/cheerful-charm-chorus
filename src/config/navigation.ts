import { Home, Route as RouteIcon, Users, BookOpen, User } from "lucide-react";
import type { ComponentType } from "react";

export interface NavItem {
  label: string;
  to: string;
  icon: ComponentType<{ className?: string }>;
  description?: string;
}

export const navItems: NavItem[] = [
  { label: "Hoje", to: "/hoje", icon: Home, description: "Sua rotina de hoje" },
  { label: "Minha Jornada", to: "/jornada", icon: RouteIcon, description: "Sua evolução" },
  { label: "Minha Equipe", to: "/equipe", icon: Users, description: "Profissionais" },
  { label: "Biblioteca", to: "/biblioteca", icon: BookOpen, description: "Conteúdos" },
  { label: "Perfil", to: "/perfil", icon: User, description: "Sua conta" },
];
