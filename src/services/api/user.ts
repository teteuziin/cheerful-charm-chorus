import type { User } from "@/types";
import { http } from "./http";

export const userApi = {
  me: () => http.get<User>("/users/me"),
  update: (data: Partial<User>) => http.patch<User>("/users/me", data),
};
