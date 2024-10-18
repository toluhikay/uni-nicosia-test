import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null, // Initial state: no user is logged in
      login: (fullNAme: string, email: string) => set({ user: { fullNAme, email } }),
      logout: () => set({ user: null }),
    }),
    {
      name: "auth-storage", // Name of the storage item
      storage: createJSONStorage(() => sessionStorage), // Define the type of storage
    }
  )
);
