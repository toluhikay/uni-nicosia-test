import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// interface for Message object
export interface Message {
  id: string; // Unique identifier for each message
  userMessage: string; // User message text
  llmResponse: string | null; // Response from the LLM
  llmStopped?: boolean; // Flag to indicate if the LLM response was stopped
  controller?: AbortController; // Track the controller for aborting
  loading: boolean; // Flag to track loading state
}

export interface ChatSession {
  id: string; // Unique identifier for the chat session
  messages: Message[]; // Array of messages in the session
}

//Shape of the chat store
interface ChatStore {
  chatSessions: ChatSession[]; // Array to hold all chat sessions
  isLoading: boolean; // this is to control the initial load state of the project
  llmStopped: boolean;
  currentSessionId: string | null; // CurrentSessionId property - to get a chat session i.e an array or messages
  currentController: AbortController | null; // Holds the controller for aborting LLM requests
  addMessageToSession: (sessionId: string, userMessage: string, controller: AbortController, loading: boolean) => void; // Function to add a message to a session
  initializeStore: () => void; //this initializes the chat store
  createNewSession: (sessionId?: string) => void; // Function to create a new chat session
  updateMessage: (sessionId: string, messageId: string, updatedMessage: string) => void; // Function to update a message's response
  updateMessageAndCallLLM: (sessionId: string, messageId: string, updatedUserMessage: string) => Promise<void>;
  stopLLMResponse: (callback: () => void) => void; // Function to stop LLM generation for a message
  // stopLLMResponse: (sessionId: string, messageId: string) => void; // Function to stop LLM generation for a message
  handleMultiplePrompts: (sessionId: string, userMessages: string[]) => Promise<void>; // Function to handle multiple prompts
  getSessionId: () => string | null; // Function to get current active section
  getChatSession: (sessionId: string) => ChatSession | undefined; //Function to get the messages in the current or active session
  getMessagesInSession: (sessionId: string) => Message[]; // Function to get the messages in the current or active session
  setCurrentSessionId: (sessionId: string | null) => void; // Function to set the active session id from the list of sessions
}

//Zustand store with persistence enabled to track state globally
export const useChatStore = create(
  persist<ChatStore>(
    (set, get) => ({
      isLoading: true,
      llmStopped: false,
      chatSessions: [], // Initialize chat sessions as an empty array
      currentSessionId: null, // Initialize currentSessionId
      currentController: null, // Controller for aborting LLM requests
      getSessionId: () => {
        return get().currentSessionId;
      },
      getChatSession: (sessionId: string) => {
        const state = get();
        return state.chatSessions.find((session) => session.id === sessionId);
      },
      getMessagesInSession: (sessionId: string) => {
        const session = get().getChatSession(sessionId);
        return session?.messages || [];
      },
      setCurrentSessionId: (sessionId: string | null) => {
        set((state) => ({ ...state, currentSessionId: sessionId }));
      },
      // Adds a user message to the specified chat session
      addMessageToSession: (sessionId, userMessage, controller, loading = false) =>
        set((state) => ({
          chatSessions: state.chatSessions.map((session) =>
            session.id === sessionId
              ? {
                  ...session,
                  messages: [
                    ...session.messages,
                    {
                      id: generateId(),
                      userMessage,
                      llmResponse: null,
                      controller,
                      loading,
                    },
                  ],
                }
              : session
          ),
          currentController: controller,
        })),

      initializeStore: () => {
        const storedSessionId = sessionStorage.getItem("currentSessionId");

        if (storedSessionId) {
          const existingSession = get().chatSessions.find((session) => session.id === storedSessionId);

          if (existingSession) {
            set({
              currentSessionId: storedSessionId,
              isLoading: false,
            });
          } else {
            const newSession = { id: storedSessionId, messages: [] };

            set({
              chatSessions: [...get().chatSessions, newSession],
              currentSessionId: storedSessionId,
              isLoading: false,
            });
          }
        } else {
          const sessionId = generateId();
          const newSession = { id: sessionId, messages: [] };

          set({
            chatSessions: [newSession],
            currentSessionId: sessionId,
            isLoading: false,
          });

          sessionStorage.setItem("currentSessionId", sessionId);
        }
      },

      // Creates a new chat session with the specified session ID
      createNewSession: (sessionId?: string) =>
        set((state) => {
          const newSessionId = sessionId || generateId(); // Generate a new ID if none is provided
          return {
            chatSessions: [...state.chatSessions, { id: newSessionId, messages: [] }],
            currentSessionId: newSessionId,
          };
        }),

      // Updates a message's LLM response in a specified chat session
      updateMessage: (sessionId, messageId, updatedMessage) =>
        set((state) => ({
          chatSessions: state.chatSessions.map((session) =>
            session.id === sessionId
              ? {
                  ...session,
                  messages: session.messages.map(
                    (message) => (message.id === messageId ? { ...message, llmResponse: updatedMessage } : message) // Update the specific message's response
                  ),
                }
              : session
          ),
        })),

      updateMessageAndCallLLM: async (sessionId: string, messageId: string, updatedUserMessage: string) => {
        // Update user message
        set((state) => {
          const session = state.chatSessions.find((s) => s.id === sessionId);
          if (!session) return state;

          const messageIndex = session.messages.findIndex((m) => m.id === messageId);
          if (messageIndex === -1) return state;

          session.messages[messageIndex].userMessage = updatedUserMessage;

          // Move updated message to the top of the queue (or last)
          const updatedMessage = session.messages.splice(messageIndex, 1)[0];
          session.messages.push(updatedMessage);

          return {
            chatSessions: state.chatSessions.map((s) => (s.id === sessionId ? { ...s, messages: session.messages } : s)),
          };
        });

        // Call LLM API to get new response
        const llmResponse = await fetch("/api/inference", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages: [{ role: "user", content: updatedUserMessage }] }),
        });

        const responseText = await llmResponse.text();

        // Update LLM response
        set((state) => {
          const session = state.chatSessions.find((s) => s.id === sessionId);
          if (!session) return state;

          const messageIndex = session.messages.findIndex((m) => m.id === messageId);
          if (messageIndex === -1) return state;

          session.messages[messageIndex].llmResponse = responseText.trim();

          return {
            chatSessions: state.chatSessions.map((s) => (s.id === sessionId ? { ...s, messages: session.messages } : s)),
          };
        });
      },
      // Refactored stopLLMResponse
      stopLLMResponse: () => {
        const controller = get().currentController;
        if (controller) {
          controller.abort(); // Abort the current LLM request
          set((state) => ({ ...state, llmStopped: true }));
        }
      },

      // Handles multiple user prompts by sending each to the LLM and adding responses to the chat session
      handleMultiplePrompts: async (sessionId: string, userMessages: string[]) => {
        const addMessageToSession = get().addMessageToSession;

        for (const userMessage of userMessages) {
          const controller = new AbortController();

          addMessageToSession(sessionId, userMessage, controller, true); // Set loading to true initially

          try {
            const response = await fetch("/api/inference", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ messages: [{ role: "user", content: userMessage }] }),
              signal: controller.signal,
            });

            if (response.body) {
              const reader = response.body.getReader();
              const decoder = new TextDecoder();
              let accumulatedResponse = "";

              while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                accumulatedResponse += chunk;

                // Check if the abort signal has been raised
                if (controller.signal.aborted) {
                  console.log("LLM Response Aborted!");
                  set((state) => ({
                    chatSessions: state.chatSessions.map((session) =>
                      session.id === sessionId
                        ? {
                            ...session,
                            messages: session.messages.map((message) =>
                              message.userMessage === userMessage
                                ? { ...message, llmResponse: accumulatedResponse, loading: false } // Set loading to false on abort
                                : message
                            ),
                          }
                        : session
                    ),
                  }));
                  break;
                }

                // Update message with accumulated response
                set((state) => ({
                  chatSessions: state.chatSessions.map((session) =>
                    session.id === sessionId
                      ? {
                          ...session,
                          messages: session.messages.map((message) =>
                            message.userMessage === userMessage
                              ? { ...message, llmResponse: accumulatedResponse, loading: true } // Keep loading true during response generation
                              : message
                          ),
                        }
                      : session
                  ),
                }));
              }
            } else {
              console.error("Failed to fetch LLM response:", response.statusText);
              set((state) => ({
                chatSessions: state.chatSessions.map((session) =>
                  session.id === sessionId
                    ? {
                        ...session,
                        messages: session.messages.map((message) =>
                          message.userMessage === userMessage
                            ? { ...message, llmResponse: "", loading: false } // Set loading to false on error
                            : message
                        ),
                      }
                    : session
                ),
              }));
            }
          } catch (error) {
            console.error("Error during inference:", error);
            set((state) => ({
              chatSessions: state.chatSessions.map((session) =>
                session.id === sessionId
                  ? {
                      ...session,
                      messages: session.messages.map((message) =>
                        message.userMessage === userMessage
                          ? { ...message, llmResponse: "", loading: false } // Set loading to false on error
                          : message
                      ),
                    }
                  : session
              ),
            }));
          }
        }
      },
    }),
    {
      name: "chat-store", // Name of the storage key for persistence
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

// Helper function for generating unique IDs for messages and sessions - normal in the real world I would opt for a more sophisticated UUID generator but for the purpose of this test this is sufficient
const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9); // Simple ID generator
};
