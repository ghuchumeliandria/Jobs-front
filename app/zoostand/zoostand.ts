
import { create } from "zustand";
import { Company, User } from "../types/types";

type UserState = {
    user: User | null | Company
    setUser: (user: User | Company)  => void
    clearUser: () => void
  }

export const useUserStore = create<UserState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: null }),
  }))