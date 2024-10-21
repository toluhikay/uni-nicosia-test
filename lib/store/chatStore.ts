import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// interface for Message object
interface Message {
  id: string; // Unique identifier for each message
  userMessage: string; // User message text
  llmResponse: string | null; // Response from the LLM
  llmStopped?: boolean; // Flag to indicate if the LLM response was stopped
  controller?: AbortController; // Track the controller for aborting
}

interface ChatSession {
  id: string; // Unique identifier for the chat session
  messages: Message[]; // Array of messages in the session
}

//Shape of the chat store
interface ChatStore {
  chatSessions: ChatSession[]; // Array to hold all chat sessions
  currentSessionId: string | null; // CurrentSessionId property - to get a chat session i.e an array or messages
  addMessageToSession: (sessionId: string, userMessage: string, controller: AbortController) => void; // Function to add a message to a session
  createNewSession: (sessionId: string) => void; // Function to create a new chat session
  updateMessage: (sessionId: string, messageId: string, updatedMessage: string) => void; // Function to update a message's response
  stopLLMResponse: (sessionId: string, messageId: string) => void; // Function to stop LLM generation for a message
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
      chatSessions: [], // Initialize chat sessions as an empty array
      currentSessionId: null, // Initialize currentSessionId
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
      addMessageToSession: (sessionId, userMessage, controller) =>
        set((state) => ({
          chatSessions: state.chatSessions.map((session) =>
            session.id === sessionId
              ? {
                  ...session,
                  messages: [
                    ...session.messages,
                    {
                      id: generateId(), // Generate a unique ID for the new message
                      userMessage,
                      llmResponse: null, // Initialize LLM response as null
                      controller, // Save the controller for aborting
                    },
                  ],
                }
              : session
          ),
        })),

      // Creates a new chat session with the specified session ID
      createNewSession: (sessionId) =>
        set((state) => ({
          chatSessions: [...state.chatSessions, { id: sessionId, messages: [] }], // Add new session to the array
        })),

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

      // Stops the LLM response generation for a specified message in a session
      stopLLMResponse: (sessionId, messageId) =>
        set((state) => {
          const session = state.chatSessions.find((s) => s.id === sessionId); // Find the session
          if (!session) return state; // If session doesn't exist, return current state

          const message = session.messages.find((m) => m.id === messageId); // Find the message
          if (message && message.controller) {
            message.controller.abort(); // Abort the LLM generation using the controller
            return {
              chatSessions: state.chatSessions.map((s) =>
                s.id === sessionId
                  ? {
                      ...s,
                      messages: s.messages.map(
                        (m) => (m.id === messageId ? { ...m, llmStopped: true } : m) // Mark message as stopped
                      ),
                    }
                  : s
              ),
            };
          }
          return state; // Return current state if no message found or controller not present
        }),

      // Handles multiple user prompts by sending each to the LLM and adding responses to the chat session
      handleMultiplePrompts: async (sessionId: string, userMessages: string[]) => {
        const addMessageToSession = get().addMessageToSession;

        for (const userMessage of userMessages) {
          const controller = new AbortController();

          addMessageToSession(sessionId, userMessage, controller);

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
              let done = false;
              let responseText = "";

              while (!done) {
                const { done: streamDone, value } = await reader.read();
                done = streamDone;
                const chunk = decoder.decode(value || new Uint8Array(), { stream: true });
                responseText += chunk;
              }

              // Update message with complete responseText
              set((state) => ({
                chatSessions: state.chatSessions.map((session) =>
                  session.id === sessionId
                    ? {
                        ...session,
                        messages: session.messages.map((message) => (message.userMessage === userMessage ? { ...message, llmResponse: responseText.trim() } : message)),
                      }
                    : session
                ),
              }));
            } else {
              console.error("Failed to fetch LLM response:", response.statusText);
            }
          } catch (error) {
            console.error("Error during inference:", error);
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
