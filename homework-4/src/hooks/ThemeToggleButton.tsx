import { useThemeStore } from '../stores/theme';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}