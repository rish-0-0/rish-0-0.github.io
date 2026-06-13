import { useState } from 'preact/hooks';

interface LocaleOption {
  code: string;
  label: string;
  nativeLabel: string;
}

interface Props {
  current: string;
  currentPath: string;
  locales: LocaleOption[];
  chooseLabel: string;
  currentTemplate: string;
}

export default function LocaleSwitcher({ current, currentPath, locales, chooseLabel, currentTemplate }: Props) {
  const [open, setOpen] = useState(false);

  // Swap the locale segment in the current path: /en/blog → /fr/blog
  const switchTo = (code: string) => {
    const parts = currentPath.split('/').filter(Boolean);
    parts[0] = code;
    return '/' + parts.join('/');
  };

  const currentLocale = locales.find((l) => l.code === current);
  const ariaLabel = currentTemplate.replace('{locale}', currentLocale?.nativeLabel ?? current);

  return (
    <div class="relative">
      <button
        class="flex h-8 items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 text-sm font-medium text-fg-muted transition-colors hover:bg-surface-raised hover:text-fg"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
      >
        <svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855A8 8 0 0 0 5.145 4H7.5zM4.09 4a9.3 9.3 0 0 1 .64-1.539 7 7 0 0 1 .597-.933A7.03 7.03 0 0 0 2.255 4zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a7 7 0 0 0-.656 2.5zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5zM8.5 5v2.5h2.99a12.5 12.5 0 0 0-.337-2.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5zM5.145 12q.208.58.468 1.068c.552 1.035 1.218 1.65 1.887 1.855V12zm.182 2.472a7 7 0 0 1-.597-.933A9.3 9.3 0 0 1 4.09 12H2.255a7 7 0 0 0 3.072 2.472M3.82 11a13.7 13.7 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5zm6.853 3.472A7 7 0 0 0 13.745 12H11.91a9.3 9.3 0 0 1-.64 1.539 7 7 0 0 1-.597.933M8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855q.26-.487.468-1.068zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.7 13.7 0 0 1-.312 2.5m2.802-3.5a7 7 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7 7 0 0 0-3.072-2.472c.218.284.418.598.597.933M10.855 4a8 8 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4z"/>
        </svg>
        <span class="uppercase tracking-wide text-[0.6875rem] font-semibold">{current}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" class="opacity-50" aria-hidden="true">
          <path d="M2 3.5L5 6.5L8 3.5"/>
        </svg>
      </button>

      {open && (
        <>
          <div class="fixed inset-0 z-[49]" onClick={() => setOpen(false)} aria-hidden="true" />
          <ul
            class="absolute top-[calc(100%+8px)] right-0 z-50 min-w-[168px] list-none rounded-xl border border-border bg-surface-raised p-1 shadow-[var(--shadow)] animate-in fade-in slide-in-from-top-2 duration-150"
            role="listbox"
            aria-label={chooseLabel}
          >
            {locales.map(({ code, label, nativeLabel }) => (
              <li key={code} role="option" aria-selected={code === current}>
                <a
                  href={switchTo(code)}
                  class={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm font-medium no-underline transition-colors hover:bg-sidebar-hover hover:text-fg ${code === current ? 'text-accent' : 'text-fg-muted'}`}
                  onClick={() => setOpen(false)}
                >
                  <span class="w-7 text-[0.6875rem] font-semibold uppercase tracking-wide opacity-60">{code}</span>
                  <span class="flex flex-col leading-tight">
                    <span>{nativeLabel}</span>
                    {nativeLabel !== label && <span class="text-[0.7rem] text-fg-subtle">{label}</span>}
                  </span>
                  {code === current && (
                    <svg class="ml-auto shrink-0" width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true">
                      <path d="M10 3L5 8.5 2 5.5l-1 1 4 4 6-7z"/>
                    </svg>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
