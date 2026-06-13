import en, { type Translations } from './locales/en';
import hi from './locales/hi';
import es from './locales/es';
import fr from './locales/fr';
import de from './locales/de';
import nl from './locales/nl';

export type { Translations };

export const LOCALES = ['en', 'hi', 'es', 'fr', 'de', 'nl'] as const;
export type Locale = typeof LOCALES[number];

const locales: Record<string, Translations> = { en, hi, es, fr, de, nl };

export function t(locale: string | undefined): Translations {
  return locales[locale ?? 'en'] ?? locales.en;
}
