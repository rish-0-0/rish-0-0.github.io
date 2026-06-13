import { useState, useEffect } from 'preact/hooks';

type Theme = 'dark' | 'light' | 'solarized' | 'aderberry';

export interface ThemeSwitcherStrings {
  chooseLabel: string;
  currentTemplate: string;
  themes: { dark: string; light: string; solarized: string; aderberry: string };
}

// ── Theme icons ───────────────────────────────────────────────────────────────

const IconMoon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
  </svg>
);

const IconSun = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
  </svg>
);

const IconEclipse = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path fill-rule="evenodd" d="M8 3.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zM2 8a6 6 0 1 1 12 0A6 6 0 0 1 2 8zm6 1.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
    <path d="M8 0a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1A.5.5 0 0 1 8 0m0 13.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5m7.5-5.5a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1 0-1h1a.5.5 0 0 1 .5.5M1 8a.5.5 0 0 1-.5.5H-.5a.5.5 0 0 1 0-1H.5A.5.5 0 0 1 1 8m11.243-4.243a.5.5 0 0 1 0 .707l-.707.707a.5.5 0 1 1-.707-.707l.707-.707a.5.5 0 0 1 .707 0M5.172 11.172a.5.5 0 0 1 0 .707l-.707.707a.5.5 0 0 1-.707-.707l.707-.707a.5.5 0 0 1 .707 0m6.364 0a.5.5 0 0 1 .707.707l-.707.707a.5.5 0 0 1-.707-.707l.707-.707zM4.464 3.757a.5.5 0 0 1 .707.707l-.707.707a.5.5 0 0 1-.707-.707l.707-.707z"/>
  </svg>
);

const IconRaspberry = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <circle cx="4"  cy="5"  r="2.1"/>
    <circle cx="8"  cy="4"  r="2.1"/>
    <circle cx="12" cy="5"  r="2.1"/>
    <circle cx="6"  cy="9"  r="2.1"/>
    <circle cx="10" cy="9"  r="2.1"/>
    <circle cx="8"  cy="13" r="2.1"/>
    <path d="M8 1.8V0.2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" fill="none"/>
  </svg>
);

// ── Theme config ──────────────────────────────────────────────────────────────

const THEME_ICONS: Record<Theme, () => JSX.Element> = {
  dark:      IconMoon,
  light:     IconSun,
  aderberry: IconRaspberry,
  solarized: IconEclipse,
};

const THEME_IDS: Theme[] = ['dark', 'light', 'aderberry', 'solarized'];

const STORAGE_KEY = 'portfolio-theme';

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  strings: ThemeSwitcherStrings;
}

export default function ThemeSwitcher({ strings }: Props) {
  const [current, setCurrent] = useState<Theme>('dark');
  const [open, setOpen]       = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved) setCurrent(saved);
  }, []);

  const apply = (theme: Theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
    setCurrent(theme);
    setOpen(false);
  };

  const CurrentIcon = THEME_ICONS[current];
  const currentLabel = strings.currentTemplate.replace('{theme}', strings.themes[current] ?? current);

  return (
    <div class="relative">
      <button
        class="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-fg-muted transition-colors hover:bg-surface-raised hover:text-fg"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={currentLabel}
      >
        <CurrentIcon />
      </button>

      {open && (
        <>
          <div class="fixed inset-0 z-[49]" onClick={() => setOpen(false)} aria-hidden="true" />
          <ul
            class="absolute top-[calc(100%+8px)] right-0 z-50 min-w-[152px] list-none rounded-xl border border-border bg-surface-raised p-1 shadow-[var(--shadow)] animate-in fade-in slide-in-from-top-2 duration-150"
            role="listbox"
            aria-label={strings.chooseLabel}
          >
            {THEME_IDS.map((id) => {
              const Icon = THEME_ICONS[id];
              const label = strings.themes[id] ?? id;
              return (
                <li key={id} role="option" aria-selected={id === current}>
                  <button
                    class={`flex w-full items-center gap-2.5 rounded-md border-none bg-transparent px-2.5 py-2 text-left text-sm font-medium transition-colors hover:bg-sidebar-hover hover:text-fg ${id === current ? 'text-accent' : 'text-fg-muted'}`}
                    onClick={() => apply(id)}
                  >
                    <Icon />
                    {label}
                    {id === current && (
                      <svg class="ml-auto" width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                        <path d="M10 3L5 8.5 2 5.5l-1 1 4 4 6-7z"/>
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
