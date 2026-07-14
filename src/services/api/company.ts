import type { Company } from "@/types";
import { companies } from "@/config/companies";
import { http } from "./http";

export const companyApi = {
  list: () => http.get<Company[]>("/companies", { auth: false }),
  get: (id: string) => http.get<Company>(`/companies/${id}`, { auth: false }),
};

// Mock nesta fase
export async function mockListCompanies(): Promise<Company[]> {
  await new Promise((r) => setTimeout(r, 250));
  return companies;
}
