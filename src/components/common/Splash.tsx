import { motion } from "framer-motion";
import { APP_NAME, APP_TAGLINE } from "@/utils/constants";

export function Splash() {
  return (
    <div className="fixed inset-0 grid place-items-center overflow-hidden bg-background">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-70 [background:radial-gradient(ellipse_at_top,oklch(0.65_0.17_145/0.18),transparent_55%),radial-gradient(ellipse_at_bottom,oklch(0.5_0.15_145/0.12),transparent_60%)]"
      />
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.35, scale: 1.1 }}
        transition={{ duration: 1.6, ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
        className="absolute h-64 w-64 rounded-full gradient-primary blur-3xl"
      />

      <div className="relative text-center px-6">
        <motion.div
          initial={{ scale: 0.6, opacity: 0, y: 8 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 16 }}
          className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-[28px] gradient-primary shadow-[var(--shadow-glow)]"
        >
          <svg
            viewBox="0 0 32 32"
            className="h-12 w-12 text-primary-foreground"
            fill="currentColor"
            aria-hidden
          >
            <path d="M16 4c-2 3-6 4-6 8a6 6 0 0 0 6 6 6 6 0 0 0 6-6c0-4-4-5-6-8Z" opacity=".95" />
            <circle cx="9" cy="20" r="4" opacity=".8" />
            <circle cx="23" cy="20" r="4" opacity=".8" />
            <rect x="15" y="21" width="2" height="7" rx="1" opacity=".7" />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ y: 10, opacity: 0, letterSpacing: "0.02em" }}
          animate={{ y: 0, opacity: 1, letterSpacing: "-0.02em" }}
          transition={{ delay: 0.15, duration: 0.55 }}
          className="text-4xl font-bold tracking-tight text-foreground"
        >
          {APP_NAME}
        </motion.h1>

        <motion.p
          initial={{ y: 6, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto"
        >
          {APP_TAGLINE}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.55, duration: 0.7, ease: "easeOut" }}
          className="mx-auto mt-8 h-[3px] w-24 origin-center rounded-full gradient-primary"
        />
      </div>
    </div>
  );
}
