import en, { type Translations } from './locales/en';
import hi from './locales/hi';
import es from './locales/es';
import fr from './locales/fr';
import de from './locales/de';
import nl from './locales/nl';

export type { Translations };

export const LOCALES = ['en', 'hi', 'es', 'fr', 'de', 'nl'] as const;
export type Locale = typeof LOCALES[number];

export const DEFAULT_LOCALE: Locale = 'en';

/**
 * Route-param value for a locale. The default locale is served at the root
 * (no prefix), so its `[...locale]` rest param is omitted (undefined).
 */
export const localeParam = (locale: string) =>
  locale === DEFAULT_LOCALE ? undefined : locale;

const locales: Record<string, Translations> = { en, hi, es, fr, de, nl };

export function t(locale: string | undefined): Translations {
  return locales[locale ?? 'en'] ?? locales.en;
}
