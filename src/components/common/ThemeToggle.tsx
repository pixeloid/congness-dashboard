import { useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useThemeStore } from '@/store/themeStore';

const ThemeToggle = () => {
  const { isDark, actions } = useThemeStore();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <button
      onClick={actions.toggleTheme}
      className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  );
};

export default ThemeToggle;