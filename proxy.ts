import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { type AppLocale, defaultLocale, localeCookieName, localeCodes } from './i18n/config';

function isAppLocale(locale: string | undefined): locale is AppLocale {
  return localeCodes.includes(locale as AppLocale);
}

function detectBrowserLocale(request: NextRequest) {
  const accepted = request.headers.get('accept-language') ?? '';
  const primaryCandidates = accepted
    .split(',')
    .map((part) => part.trim().split(';')[0]?.toLowerCase())
    .filter(Boolean)
    .map((lang) => lang.split('-')[0]);

  return primaryCandidates.find(isAppLocale) ?? defaultLocale;
}

export default function proxy(request: NextRequest) {
  const cookieLocale = request.cookies.get(localeCookieName)?.value;
  const hasValidCookie = isAppLocale(cookieLocale);
  const response = NextResponse.next();

  // First visit without locale cookie: detect locale from browser and persist it.
  if (!hasValidCookie) {
    const browserLocale = detectBrowserLocale(request);
    response.cookies.set(localeCookieName, browserLocale, {
      path: '/',
      sameSite: 'lax',
    });
  }

  return response;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
