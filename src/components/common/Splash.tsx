import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { APP_NAME, APP_TAGLINE } from "@/utils/constants";

export function Splash() {
  return (
    <div className="fixed inset-0 grid place-items-center bg-background gradient-hero overflow-hidden">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
          className="mx-auto mb-6 grid h-24 w-24 place-items-center rounded-[28px] gradient-primary shadow-[var(--shadow-glow)]"
        >
          <svg viewBox="0 0 32 32" className="h-12 w-12 text-primary-foreground" fill="currentColor" aria-hidden>
            <path d="M16 4c-2 3-6 4-6 8a6 6 0 0 0 6 6 6 6 0 0 0 6-6c0-4-4-5-6-8Z" opacity=".95" />
            <circle cx="9" cy="20" r="4" opacity=".8" />
            <circle cx="23" cy="20" r="4" opacity=".8" />
            <rect x="15" y="21" width="2" height="7" rx="1" opacity=".7" />
          </svg>
        </motion.div>
        <motion.h1
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className="text-h2 text-foreground"
        >
          {APP_NAME}
        </motion.h1>
        <motion.p
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="mt-2 text-sm text-muted-foreground max-w-xs"
        >
          {APP_TAGLINE}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 inline-flex items-center gap-2 text-xs text-muted-foreground"
        >
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Preparando sua experiência
        </motion.div>
      </div>
    </div>
  );
}
