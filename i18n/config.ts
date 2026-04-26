export const locales = [
  { code: 'cs', label: '🇨🇿' },
  { code: 'en', label: '🇬🇧' },
] as const;

export type AppLocale = (typeof locales)[number]['code'];

export const defaultLocale: AppLocale = 'cs';
export const localeCookieName = 'locale';

export const getLocaleLabel = (locale: AppLocale) =>
  locales.find((l) => l.code === locale)?.label ?? locale;

export const localeCodes = locales.map((l) => l.code) as AppLocale[];
