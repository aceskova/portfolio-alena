'use client';

import { useLocale } from 'next-intl';
import { type AppLocale, localeCookieName, locales } from '@/i18n/config';
import { useRouter } from 'next/navigation';

function persistLocaleCookie(nextLocale: AppLocale) {
  document.cookie = `${localeCookieName}=${nextLocale}; path=/; samesite=lax; max-age=31536000`;
}

export default function LocaleSwitcher() {
  const activeLocale = useLocale() as AppLocale;
  const router = useRouter();

  function switchLocale(nextLocale: AppLocale) {
    if (nextLocale === activeLocale) {
      return;
    }

    persistLocaleCookie(nextLocale);
    router.refresh();
  }

  return (
    <div className="rounded-full border border-border bg-background/60 p-0.5 backdrop-blur">
      <div className="flex items-center gap-0.5">
        {locales.map((locale) => (
          <button
            type="button"
            onClick={() => switchLocale(locale.code)}
            key={locale.code}
            disabled={locale.code === activeLocale}
            aria-label={locale.code}
            aria-pressed={locale.code === activeLocale}
            className={`flex h-8 min-w-10 items-center justify-center rounded-full px-2 text-xs font-semibold uppercase tracking-wide transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 ${
              locale.code === activeLocale
                ? 'cursor-default bg-sky-600 text-white shadow-sm shadow-sky-600/20 dark:bg-sky-400 dark:text-slate-950'
                : 'cursor-pointer text-muted-foreground hover:bg-accent hover:text-foreground'
            }`}
          >
            {locale.code}
          </button>
        ))}
      </div>
    </div>
  );
}
