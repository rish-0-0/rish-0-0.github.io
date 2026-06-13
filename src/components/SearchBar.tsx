import { useState, useEffect, useRef, useCallback } from 'preact/hooks';

interface SearchEntry {
  type: string;
  slug: string;
  title: string;
  description: string;
  url: string;
  keywords?: string;
  _haystack: string;
}

export interface SearchFallback {
  type: string;
  title: string;
  description: string;
  url: string;
}

export interface SearchBarStrings {
  placeholder: string;
  clearLabel: string;
  inputLabel: string;
  quickNavLabel: string;
  resultSingular: string;
  resultPlural: string;
  noResultsTemplate: string;
}

interface Suggestion {
  label: string;
  href: string;
}

interface Props {
  searchIndexUrl: string;
  strings: SearchBarStrings;
  suggestions: Suggestion[];
  fallback: SearchFallback;
}

const tokenize = (q: string) =>
  q.toLowerCase().split(/\s+/).filter((tok) => tok.length >= 2);

export default function SearchBar({ searchIndexUrl, strings, suggestions, fallback }: Props) {
  const [query,     setQuery]     = useState('');
  const [index,     setIndex]     = useState<SearchEntry[]>([]);
  const [results,   setResults]   = useState<SearchEntry[]>([]);
  const [focused,   setFocused]   = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch(searchIndexUrl)
      .then((r) => r.json())
      .then((entries) => setIndex(entries.map((e: Omit<SearchEntry, '_haystack'>) => ({
        ...e,
        _haystack: `${e.title} ${e.description} ${e.type} ${e.keywords ?? ''}`.toLowerCase(),
      }))))
      .catch(() => {});
  }, [searchIndexUrl]);

  useEffect(() => {
    const tokens = tokenize(query.trim());
    if (tokens.length === 0) { setResults([]); setActiveIdx(-1); return; }
    // Rank by how many query tokens an entry matches; keep the strongest 6.
    const ranked = index
      .map((e) => ({ e, score: tokens.reduce((n, tok) => n + (e._haystack.includes(tok) ? 1 : 0), 0) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map((x) => x.e);
    setResults(ranked);
    setActiveIdx(-1);
  }, [query, index]);

  const navigate = (url: string) => { window.location.href = url; };

  const hasQuery = query.trim().length >= 2;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const items = hasQuery
      ? (results.length > 0 ? results.map((r) => r.url) : [fallback.url])
      : suggestions.map((s) => s.href);
    if      (e.key === 'ArrowDown')          { e.preventDefault(); setActiveIdx((i) => Math.min(i + 1, items.length - 1)); }
    else if (e.key === 'ArrowUp')            { e.preventDefault(); setActiveIdx((i) => Math.max(i - 1, -1)); }
    else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (activeIdx >= 0) navigate(items[activeIdx]);
      else if (items.length > 0) navigate(items[0]);
    }
    else if (e.key === 'Escape') { setQuery(''); setFocused(false); inputRef.current?.blur(); }
  }, [results, activeIdx, hasQuery, suggestions, fallback]);

  const showDropdown = focused && (hasQuery || query.length === 0);

  const resultsLabel = results.length === 1
    ? `1 ${strings.resultSingular}`
    : `${results.length} ${strings.resultPlural}`;

  const noResultsLabel = strings.noResultsTemplate.replace('{q}', query);

  return (
    <div class="flex w-full max-w-[680px] flex-col gap-4">

      {/* Input box */}
      <div class={`flex items-start gap-3 rounded-2xl border px-4 py-3.5 shadow-[var(--shadow-sm)] transition-all bg-input-bg ${focused ? 'border-accent shadow-[0_0_0_3px_color-mix(in_srgb,var(--accent)_20%,transparent)]' : 'border-input-border'}`}>
        <svg class={`mt-0.5 shrink-0 transition-colors ${focused ? 'text-accent' : 'text-fg-muted'}`} width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <circle cx="7.5" cy="7.5" r="5.5"/><path d="M16 16l-3.5-3.5"/>
        </svg>
        <textarea
          ref={inputRef}
          class="field-sizing-content min-h-6 max-h-40 flex-1 resize-none overflow-y-auto border-none bg-transparent text-base leading-relaxed text-fg outline-none placeholder:text-fg-subtle"
          placeholder={strings.placeholder}
          rows={1}
          value={query}
          onInput={(e) => setQuery((e.target as HTMLTextAreaElement).value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          onKeyDown={handleKeyDown as any}
          aria-label={strings.inputLabel}
          spellcheck={false}
        />
        {query && (
          <button
            class="mt-0.5 flex shrink-0 items-center rounded bg-transparent p-1 text-fg-subtle transition-colors hover:bg-surface hover:text-fg"
            onClick={() => { setQuery(''); inputRef.current?.focus(); }}
            aria-label={strings.clearLabel}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
              <path d="M2 2l10 10M12 2L2 12"/>
            </svg>
          </button>
        )}
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div class="overflow-hidden rounded-xl border border-border bg-surface-raised shadow-[var(--shadow)] animate-in fade-in slide-in-from-top-1 duration-150">
          {query.trim().length < 2 ? (
            <>
              <p class="px-3.5 pb-1.5 pt-2.5 text-[0.6875rem] font-semibold uppercase tracking-widest text-fg-subtle">{strings.quickNavLabel}</p>
              {suggestions.map((s, i) => (
                <a key={s.href} href={s.href} onMouseDown={(e) => e.preventDefault()} class={`flex items-center gap-2.5 px-3.5 py-2.5 text-sm no-underline transition-colors ${activeIdx === i ? 'bg-sidebar-hover text-fg' : 'text-fg-muted hover:bg-sidebar-hover hover:text-fg'}`}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5"/>
                  </svg>
                  {s.label}
                </a>
              ))}
            </>
          ) : results.length > 0 ? (
            <>
              <p class="px-3.5 pb-1.5 pt-2.5 text-[0.6875rem] font-semibold uppercase tracking-widest text-fg-subtle">
                {resultsLabel}
              </p>
              {results.map((r, i) => (
                <a key={r.url} href={r.url} onMouseDown={(e) => e.preventDefault()} class={`flex items-center gap-2.5 px-3.5 py-2.5 no-underline transition-colors ${activeIdx === i ? 'bg-sidebar-hover' : 'hover:bg-sidebar-hover'}`}>
                  <span class="shrink-0 rounded border border-border bg-pill-bg px-1.5 py-px text-[0.6875rem] font-semibold uppercase tracking-wide text-accent">{r.type}</span>
                  <span class="flex min-w-0 flex-col gap-px">
                    <span class="truncate text-sm font-medium text-fg">{r.title}</span>
                    <span class="truncate text-xs text-fg-muted">{r.description}</span>
                  </span>
                </a>
              ))}
            </>
          ) : (
            <>
              <p class="px-3.5 pb-1.5 pt-3 text-sm italic text-fg-muted">{noResultsLabel}</p>
              <a href={fallback.url} onMouseDown={(e) => e.preventDefault()} class={`flex items-center gap-2.5 px-3.5 py-2.5 no-underline transition-colors ${activeIdx === 0 ? 'bg-sidebar-hover' : 'hover:bg-sidebar-hover'}`}>
                <span class="shrink-0 rounded border border-border bg-pill-bg px-1.5 py-px text-[0.6875rem] font-semibold uppercase tracking-wide text-accent">{fallback.type}</span>
                <span class="flex min-w-0 flex-col gap-px">
                  <span class="truncate text-sm font-medium text-fg">{fallback.title}</span>
                  <span class="truncate text-xs text-fg-muted">{fallback.description}</span>
                </span>
              </a>
            </>
          )}
        </div>
      )}

      {/* Suggestion pills */}
      <div class="flex flex-wrap gap-2" aria-label={strings.quickNavLabel}>
        {suggestions.map((s) => (
          <a key={s.href} href={s.href} class="whitespace-nowrap rounded-full border border-pill-border bg-pill-bg px-4 py-1.5 text-sm font-medium text-fg-muted no-underline transition-colors hover:border-accent hover:bg-pill-bg hover:text-fg">
            {s.label}
          </a>
        ))}
      </div>

    </div>
  );
}
