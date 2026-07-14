import type { Company } from "@/types";

/**
 * Empresas cadastradas na plataforma TrevoOne.
 * A arquitetura é multiempresa — a interface esconde a seleção
 * automaticamente enquanto houver apenas uma empresa disponível.
 */
export const companies: Company[] = [
  {
    id: "saiya-shape",
    slug: "saiya-shape",
    name: "Saiya Shape",
    description: "Transformação Física • Saúde • Performance",
    category: "Consultoria Premium",
    color: "#F97316",
    gradient: ["#B45309", "#F97316"],
    logoInitial: "S",
    city: "Curitiba · PR",
    students: 0,
    status: "active",
  },
];

export const defaultCompany = companies[0];
export const hasSingleCompany = companies.length === 1;
