import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Sparkles,
} from "lucide-react";
import { loginSchema, type LoginFormValues } from "@/utils/validators";
import { useCompanyStore } from "@/store/companyStore";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/common/Logo";
import { ThemeSwitch } from "@/components/common/ThemeSwitch";

export const Route = createFileRoute("/login")({
  ssr: false,
  head: () => ({ meta: [{ title: "Entrar · TrevoOne" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const company = useCompanyStore((s) => s.current);
  const { login } = useAuth();
  const [showPw, setShowPw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sempre exige seleção prévia no portal
  useEffect(() => {
    if (!company) navigate({ to: "/empresa", replace: true });
  }, [company, navigate]);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      companyId: company?.id ?? "",
      username: "",
      password: "",
      remember: true,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    if (!company) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      await login({ ...values, companyId: company.id });
      setSucceeded(true);
    } catch {
      setSubmitError("Usuário ou senha inválidos. Tente novamente.");
      toast.error("Não foi possível entrar.");
      setSubmitting(false);
    }

  });

  if (!company) return null;
  const grad = company.gradient ?? [company.color, company.color];


  return (
    <div className="relative min-h-dvh w-full overflow-x-hidden bg-background lg:grid lg:grid-cols-[0.85fr_1.15fr]">
      {/* Hero — identidade visual apenas */}
      <aside
        className="relative overflow-hidden text-white px-5 md:px-8 lg:px-10 pt-[calc(env(safe-area-inset-top)+0.5rem)] pb-5 lg:min-h-dvh lg:flex lg:flex-col lg:justify-between h-[180px] md:h-[210px] lg:h-auto"
        style={{
          backgroundImage: `linear-gradient(135deg, ${grad[0]} 0%, ${grad[1]} 100%)`,
        }}
      >
        <div
          aria-hidden
          className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_15%_10%,white,transparent_40%),radial-gradient(circle_at_85%_85%,white,transparent_45%)]"
        />
        <div className="relative flex items-center justify-between">
          <Logo size="md" tone="light" />
          <div className="lg:hidden">
            <ThemeSwitch />
          </div>
        </div>

        <div className="relative mt-2 lg:mt-0 max-w-lg">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
          >
            <Sparkles className="h-3 w-3" /> Sua jornada
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mt-2 text-xl md:text-2xl lg:text-4xl font-bold tracking-tight leading-[1.1]"
          >
            Bem-vindo novamente <span className="inline-block">👋</span>
          </motion.h1>
          <p className="hidden lg:block mt-2 text-[15px] text-white/90 max-w-md">
            Continue sua evolução.
          </p>

        </div>

        <div className="hidden lg:block relative text-[11px] text-white/70">
          © {new Date().getFullYear()} TrevoOne
        </div>
      </aside>

      {/* Formulário */}
      <section className="relative flex flex-col pb-[env(safe-area-inset-bottom)]">
        <div className="hidden lg:flex items-center justify-end px-6 md:px-10 py-5">
          <ThemeSwitch />
        </div>

        <div className="flex-1 grid place-items-center px-5 md:px-8 py-8 lg:py-10">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md"
          >
            {/* Chip da organização selecionada */}
            <div className="mb-6 flex items-center gap-3 rounded-2xl border border-border/60 bg-surface p-3">
              <span
                className="grid h-11 w-11 place-items-center rounded-xl text-white text-sm font-bold shrink-0 shadow-[var(--shadow-soft)]"
                style={{ backgroundImage: `linear-gradient(135deg, ${grad[0]}, ${grad[1]})` }}
              >
                {company.logoInitial}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-semibold text-foreground truncate">{company.name}</div>
                <div className="text-xs text-muted-foreground truncate">{company.category}</div>
              </div>
              <Link
                to="/empresa"
                className="text-xs font-semibold text-primary hover:underline shrink-0"
              >
                Trocar
              </Link>
            </div>

            <h2 className="text-2xl md:text-[28px] font-bold tracking-tight text-foreground">
              Bem-vindo novamente <span className="inline-block">👋</span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">Continue sua evolução.</p>


            <form onSubmit={onSubmit} className="mt-8 space-y-5" noValidate>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-[13px] font-semibold">
                  Usuário ou e-mail
                </Label>
                <Input
                  id="username"
                  autoComplete="username"
                  inputMode="email"
                  placeholder="voce@empresa.com"
                  className="h-12 rounded-xl border-border/70 bg-surface text-[15px] px-4 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary transition-all"
                  {...form.register("username")}
                  aria-invalid={!!form.formState.errors.username}
                />
                {form.formState.errors.username && (
                  <p className="text-xs text-destructive">{form.formState.errors.username.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[13px] font-semibold">
                    Senha
                  </Label>
                  <button
                    type="button"
                    className="text-xs font-medium text-primary hover:underline"
                    onClick={() => toast.message("Recuperação de senha disponível em breve.")}
                  >
                    Esqueci minha senha
                  </button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPw ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="h-12 pr-12 rounded-xl border-border/70 bg-surface text-[15px] px-4 focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary transition-all"
                    {...form.register("password")}
                    aria-invalid={!!form.formState.errors.password}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    aria-label={showPw ? "Ocultar senha" : "Mostrar senha"}
                    className="absolute right-2 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent/40 transition-colors"
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {form.formState.errors.password && (
                  <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
                )}
              </div>

              <label className="flex items-center gap-2 text-sm text-foreground/80 select-none">
                <Checkbox
                  checked={form.watch("remember")}
                  onCheckedChange={(v) => form.setValue("remember", Boolean(v))}
                />
                Lembrar acesso neste dispositivo
              </label>

              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive"
                >
                  <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                  <span>{submitError}</span>
                </motion.div>
              )}

              <motion.div whileTap={{ scale: 0.99 }}>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="group w-full h-12 rounded-full text-sm font-semibold shadow-[var(--shadow-glow)]"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Entrando…
                    </>
                  ) : (
                    <>
                      Entrar na Jornada
                      <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </Button>
              </motion.div>

              <p className="text-center text-xs text-muted-foreground">
                Acesso protegido · Autenticação via API TrevoOne
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Fade overlay ao autenticar com sucesso */}
      <AnimatePresence>
        {succeeded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: "easeInOut" }}
            className="fixed inset-0 z-50 grid place-items-center bg-background"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.05, duration: 0.35 }}
              className="flex flex-col items-center gap-3"
            >
              <Logo size="lg" />
              <div className="text-sm text-muted-foreground">Preparando sua jornada…</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
