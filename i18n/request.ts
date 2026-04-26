import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { cookies, headers } from 'next/headers';
import { defaultLocale, localeCookieName, localeCodes } from '@/i18n/config';

function detectLocaleFromHeader(acceptLanguage: string | null) {
  const candidates = (acceptLanguage ?? '')
    .split(',')
    .map((part) => part.trim().split(';')[0]?.toLowerCase())
    .filter(Boolean)
    .map((lang) => lang.split('-')[0]);

  return candidates.find((lang) => hasLocale(localeCodes, lang)) ?? defaultLocale;
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const headerStore = await headers();

  const cookieLocale = cookieStore.get(localeCookieName)?.value;

  const locale = hasLocale(localeCodes, cookieLocale)
    ? cookieLocale
    : detectLocaleFromHeader(headerStore.get('accept-language'));

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
