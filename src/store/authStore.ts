import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AuthState, User } from '@/types/auth';

interface AuthStore extends AuthState {
  actions: {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    updateUser: (updates: Partial<User>) => void;
    checkAuth: () => Promise<void>;
  };
}

// Mock user data for development
const mockUsers: User[] = [
  {
    id: 1,
    name: "Nagy János",
    email: "nagy.janos@example.com",
    role: "event_manager"
  },
  {
    id: 2,
    name: "Kiss Éva",
    email: "kiss.eva@example.com",
    role: "exhibitor",
    exhibitorId: 1
  },
  {
    id: 3,
    name: "Kovács Péter",
    email: "kovacs.peter@example.com",
    role: "exhibition_staff",
    exhibitionId: 1
  },
  {
    id: 4,
    name: "Szabó Anna",
    email: "szabo.anna@example.com",
    role: "participant",
    participantId: 1
  }
];

export const useAuthStore = create<AuthStore>()(
  immer((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    actions: {
      login: async (email: string, _password: string) => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call
          await new Promise(resolve => setTimeout(resolve, 1000));

          const user = mockUsers.find(u => u.email === email);
          if (!user) {
            throw new Error('Invalid credentials');
          }

          set({
            user,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false
          });
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null
        });
      },

      updateUser: (updates) => {
        set((state) => {
          if (state.user) {
            state.user = { ...state.user, ...updates };
          }
        });
      },

      checkAuth: async () => {
        set({ isLoading: true, error: null });
        try {
          // Simulate API call to check session
          await new Promise(resolve => setTimeout(resolve, 500));

          // For development, auto-login as event manager
          set({
            user: mockUsers[0],
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: 'Session expired'
          });
        }
      }
    }
  }))
);