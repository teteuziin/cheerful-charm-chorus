import type { Organization } from "@/types";

/**
 * Organizações cadastradas no ecossistema TrevoOne.
 * Arquitetura preparada para múltiplas categorias: academias,
 * consultorias, personal trainers, nutricionistas, clínicas e
 * centros esportivos.
 */
export const organizations: Organization[] = [
  {
    id: "saiya-shape",
    slug: "saiya-shape",
    name: "Saiya Shape",
    description: "Transformação Física • Saúde • Performance",
    category: "Consultoria Premium",
    color: "#F97316",
    gradient: ["#B45309", "#F97316"],
    logoInitial: "S",
    city: "Salvador - Bahia",
    students: 0,
    status: "active",
  },
];

export const defaultOrganization = organizations[0];

// Compat com a arquitetura anterior
export const companies = organizations;
export const defaultCompany = defaultOrganization;
export const hasSingleCompany = organizations.length === 1;
