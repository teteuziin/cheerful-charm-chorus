import { create } from "zustand";
import type { Notification } from "@/types";

interface NotificationState {
  items: Notification[];
  unreadCount: number;
  setAll: (items: Notification[]) => void;
  markAllRead: () => void;
  markRead: (id: string) => void;
}

const seed: Notification[] = [
  {
    id: "n1",
    title: "Bem-vindo ao TrevoOne",
    body: "Complete seu perfil para começar sua jornada.",
    read: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "n2",
    title: "Novo conteúdo na Biblioteca",
    body: "Guia rápido de hidratação diária.",
    read: false,
    createdAt: new Date(Date.now() - 3600_000).toISOString(),
  },
];

export const useNotificationStore = create<NotificationState>((set, get) => ({
  items: seed,
  unreadCount: seed.filter((n) => !n.read).length,
  setAll: (items) => set({ items, unreadCount: items.filter((n) => !n.read).length }),
  markAllRead: () =>
    set({ items: get().items.map((n) => ({ ...n, read: true })), unreadCount: 0 }),
  markRead: (id) => {
    const items = get().items.map((n) => (n.id === id ? { ...n, read: true } : n));
    set({ items, unreadCount: items.filter((n) => !n.read).length });
  },
}));
