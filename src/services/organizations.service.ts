import type { OrganizationDTO } from "@/types";
import { organizations } from "@/config/companies";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const organizationsService = {
  async list(): Promise<OrganizationDTO[]> {
    await wait(180);
    return organizations;
  },
  async get(id: string): Promise<OrganizationDTO | null> {
    await wait(120);
    return organizations.find((o) => o.id === id) ?? null;
  },
};
