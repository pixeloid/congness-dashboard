import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDark: boolean;
  actions: {
    toggleTheme: () => void;
  };
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: true,
      actions: {
        toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);