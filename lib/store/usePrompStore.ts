// store/useChatStore.ts
import { create } from "zustand";

interface ChatState {
  prompt: string;
  response: string;
  isLoading: boolean;
  controller: AbortController | null;
  setPrompt: (prompt: string) => void;
  addResponse: (chunk: string) => void;
  setLoading: (loading: boolean) => void;
  setController: (controller: AbortController | null) => void;
  resetResponse: () => void;
  stopGeneration: () => void;
}

export const usePromptStore = create<ChatState>((set) => ({
  prompt: "",
  response: "",
  isLoading: false,
  controller: null,

  setPrompt: (prompt) => set({ prompt }),
  addResponse: (chunk) => set((state) => ({ response: state.response + chunk })),
  setLoading: (loading) => set({ isLoading: loading }),
  setController: (controller) => set({ controller }),

  resetResponse: () => set({ response: "" }),

  stopGeneration: () =>
    set((state) => {
      if (state.controller) {
        state.controller.abort();
        return { isLoading: false, controller: null };
      }
      return state;
    }),
}));
