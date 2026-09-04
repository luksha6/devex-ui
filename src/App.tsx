import { useEffect, useState } from 'react';
import { BacklogPage } from './app/features/backlog/BacklogPage';
import { Button, ToastProvider } from './design-system';
import styles from './App.module.css';

type Theme = 'dark' | 'light';

function readTheme(): Theme {
  try {
    const stored = window.localStorage.getItem('backlog:theme');
    return stored === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() =>
    typeof window === 'undefined' ? 'dark' : readTheme(),
  );

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    window.localStorage.setItem('backlog:theme', theme);
  }, [theme]);

  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <Button
      intent="ghost"
      size="sm"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </Button>
  );
}

function Shell() {
  return (
    <div className={styles.shell}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={styles.header}>
        <div className={styles.brand}>
          <span className={styles.mark}>BACKLOG</span>
          <span className={styles.system}>/UI</span>
        </div>
        <ThemeToggle />
      </header>
      <main id="main" className={styles.main}>
        <BacklogPage />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <Shell />
    </ToastProvider>
  );
}
