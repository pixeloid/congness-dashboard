import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import { User } from '@/types/auth';
import api from '@/api/api';

export enum AuthStatus {
  LOADING = 'loading',
  AUTHENTICATED = 'authenticated',
  UNAUTHENTICATED = 'unauthenticated'
}

interface AuthStore {
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;
  error: string | null;
  actions: {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    checkAuth: () => Promise<boolean>;
    updateUser: (updates: Partial<User>) => void;
  };
}
/* 
// Mock user data for development
const mockUsers: User[] = [
  {
    id: 1,
    name: "Nagy János",
    email: "nagy.janos@example.com",
    occasionRoles: [
      {
        occasionId: 1,
        roles: [{
          role: UserRole.EVENT_MANAGER
        }]
      },
      {
        occasionId: 2,
        roles: [{ role: UserRole.PARTICIPANT }]
      }
    ]
  },
  {
    id: 2,
    name: "Dr. Kovács Péter",
    email: "kovacs.peter@example.com",
    occasionRoles: [
      {
        occasionId: 1,
        roles: [{
          role: UserRole.CHIEF_REVIEWER,
          capabilities: {
            canReview: {
              expertise: ["Medical Imaging", "AI in Healthcare"],
              isChief: true
            }
          }
        }]
      },
      {
        occasionId: 2,
        roles: [{
          role: UserRole.SCIENTIFIC_REVIEWER,
          capabilities: {
            canReview: {
              expertise: ["Medical Imaging"]
            }
          }
        }]
      }
    ]
  },
  {
    id: 3,
    name: "Dr. Szabó Anna",
    email: "szabo.anna@example.com",
    occasionRoles: [
      {
        occasionId: 1,
        roles: [{
          role: UserRole.SCIENTIFIC_REVIEWER,
          capabilities: {
            canReview: {
              expertise: ["Clinical Research", "Neurology"]
            }
          }
        }]
      }
    ]
  },
  {
    id: 4,
    name: "Dr. Kiss Márta",
    email: "kiss.marta@example.com",
    occasionRoles: [
      {
        occasionId: 1,
        roles: [
          {
            role: UserRole.SCIENTIFIC_REVIEWER,
            capabilities: {
              canReview: {
                expertise: ["Cardiology", "Medical Technology"]
              }
            }
          },
          {
            role: UserRole.PARTICIPANT,
            capabilities: {
              participantId: 123
            }
          }
        ]
      }
    ]
  }
];
 */
export const useAuthStore = create<AuthStore>()(
  persist(
    immer((set, get) => ({
      user: null,
      token: null,
      authStatus: AuthStatus.LOADING,
      error: null,
      actions: {
        login: async (email: string, _password: string) => {
          set({ authStatus: AuthStatus.LOADING, error: null });
          try {
            // Find user immediately for quick login
            // const user = mockUsers.find(u => u.email === email);
            // if (!user) {
            //   throw new Error('Invalid credentials');
            // }

            // Simulate minimal delay for UI feedback
            const { token } = (await api.post(
              (import.meta as any).env.VITE_API_AUTH_URL,
              { email, password: _password })).data;

            const tokenData = JSON.parse(atob(token.split('.')[1]));

            const user: User = {
              email: tokenData.username,
              id: tokenData.userId,
              name: tokenData.username,
              occasionRoles: tokenData.roles
            }
            set({
              user,
              token,
              authStatus: AuthStatus.AUTHENTICATED
            });
          } catch (error) {
            set({
              error: error instanceof Error ? error.message : 'Login failed',
              authStatus: AuthStatus.UNAUTHENTICATED
            });
          }
        },

        logout: () => {
          set({
            user: null,
            token: null,
            authStatus: AuthStatus.UNAUTHENTICATED,
            error: null
          });
        },

        checkAuth: async () => {
          const state = get();

          set({ authStatus: AuthStatus.LOADING, error: null });

          try {
            if (!state.token) {
              set({
                authStatus: AuthStatus.UNAUTHENTICATED,
                user: null,
                error: null
              });
              return false;
            }

            // Decode and validate token
            const tokenData = JSON.parse(atob(state.token.split('.')[1]));

            const now = Date.now() / 1000;
            if (tokenData.exp < now) {
              // print expiry time offset
              console.log(tokenData.exp, now);
              set({
                user: null,
                token: null,
                authStatus: AuthStatus.UNAUTHENTICATED,
                error: 'Session expired'
              });
              return false;
            }
            const user: User = {
              email: tokenData.username,
              id: tokenData.userId,
              name: tokenData.username,
              occasionRoles: tokenData.roles
            }

            // Find user from token
            set({
              user,
              authStatus: AuthStatus.AUTHENTICATED,
              error: null
            });

            return true;
          } catch (error) {
            set({
              user: null,
              token: null,
              authStatus: AuthStatus.UNAUTHENTICATED,
              error: error instanceof Error ? error.message : 'Authentication check failed'
            });
            return false;
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
    })), {
    name: 'auth-storage',
    partialize: (state) => ({
      token: state.token,
      user: state.user
    })
  })
);


const useAuthToken = () => {
  const token = useAuthStore((state) => state.token);
  return token;
};

export default useAuthToken;