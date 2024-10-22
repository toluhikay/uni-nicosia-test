import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface User {
  fullName: string;
  email: string;
}

interface AuthState {
  user: User | null;
}

interface LoginParams {
  fullName: string;
  email: string;
}

interface AuthActions {
  login: (params: LoginParams) => void;
  logout: () => void;
}

interface AuthStore extends AuthState, AuthActions {}

export const useAuthStore = create<AuthStore>(
  persist(
    (set) => ({
      user: null,
      login: ({ fullName, email }: LoginParams) => set({ user: { fullName, email } }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
    }
  ) as any
);
