import { z } from "zod";

export const loginSchema = z.object({
  companyId: z.string().min(1, "Selecione uma empresa"),
  username: z.string().min(3, "Informe seu usuário ou e-mail"),
  password: z.string().min(4, "Informe sua senha"),
  remember: z.boolean().optional(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
