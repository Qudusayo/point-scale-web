import { create } from "zustand";
import axios from "axios";

interface Session {
  _id: string;
  session: string;
}

interface UserData {
  sessions: Session[];
  session_id: string;
  message: string;
  data: string;
}

interface FetchedSession {
  session_id: string;
  data: string;
}

interface UserState {
  matricNumber: string;
  password: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | undefined;
  userData: UserData | null;
  fetchedSessions: Record<string, FetchedSession>;
  setMatricNumber: (matricNumber: string) => void;
  setPassword: (password: string) => void;
  login: () => Promise<void>;
  reset: () => void;
  makeRequest: (
    endpoint: string,
    data?: Record<string, unknown>
  ) => Promise<unknown>;
  addFetchedSession: (sessionId: string, data: FetchedSession) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  matricNumber: "",
  password: "",
  isAuthenticated: false,
  isLoading: false,
  error: undefined,
  userData: null,
  fetchedSessions: {},

  setMatricNumber: (matricNumber) => set({ matricNumber }),
  setPassword: (password) => set({ password }),

  login: async () => {
    const { matricNumber, password } = get();
    set({ isLoading: true, error: undefined });

    try {
      const response = await axios.post("/api/fetch-results", {
        username: matricNumber,
        password,
      });

      if (response.status === 200) {
        set({
          isAuthenticated: true,
          userData: response.data,
          error: undefined,
          fetchedSessions: {
            [response.data.session_id]: {
              session_id: response.data.session_id,
              data: response.data.data,
            },
          },
        });
      } else {
        set({
          error: response.data.message || "Login failed",
          isAuthenticated: false,
          userData: null,
        });
      }
    } catch {
      set({
        error: "An error occurred during login",
        isAuthenticated: false,
        userData: null,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  makeRequest: async (endpoint: string, data = {}) => {
    const { matricNumber, password } = get();
    set({ isLoading: true, error: undefined });

    try {
      const response = await axios.post(endpoint, {
        username: matricNumber,
        password,
        ...data,
      });

      if (response.status === 200) {
        set({ error: undefined });
        return response.data;
      } else {
        set({
          error: response.data.message || "Request failed",
          isAuthenticated: false,
        });
        return null;
      }
    } catch {
      set({
        error: "An error occurred during the request",
        isAuthenticated: false,
      });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  addFetchedSession: (sessionId: string, data: FetchedSession) => {
    set((state) => ({
      fetchedSessions: {
        ...state.fetchedSessions,
        [sessionId]: data,
      },
    }));
  },

  reset: () =>
    set({
      matricNumber: "",
      password: "",
      isAuthenticated: false,
      isLoading: false,
      error: undefined,
      userData: null,
      fetchedSessions: {},
    }),
}));
