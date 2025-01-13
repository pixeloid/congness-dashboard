import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { AuthState, User } from '@/types/auth';

interface AuthStore extends AuthState {
  actions: {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<void>;
    updateUser: (updates: Partial<User>) => void;
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
    name: "Dr. Kovács Péter",
    email: "kovacs.peter@example.com",
    role: "chief_reviewer",
    expertise: ["Medical Imaging", "AI in Healthcare"]
  },
  {
    id: 3,
    name: "Dr. Szabó Anna",
    email: "szabo.anna@example.com",
    role: "scientific_reviewer",
    expertise: ["Clinical Research", "Neurology"]
  },
  {
    id: 4,
    name: "Dr. Kiss Márta",
    email: "kiss.marta@example.com",
    role: "scientific_reviewer",
    expertise: ["Cardiology", "Medical Technology"]
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

      checkAuth: async () => {
        set({ isLoading: true });
        try {
          await new Promise(resolve => setTimeout(resolve, 1000));
          // In a real app, this would check with the backend
          set({ isLoading: false });
        } catch (error) {
          set({
            error: 'Authentication check failed',
            isLoading: false
          });
        }
      },

      updateUser: (updates) => {
        set((state) => {
          if (state.user) {
            state.user = { ...state.user, ...updates };
          }
        });
      }
    }
  }))
);