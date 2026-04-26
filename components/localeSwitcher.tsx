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
    <div className="fixed right-4 top-4 z-50 rounded-full border border-zinc-200/80 bg-white/80 p-1 shadow-lg shadow-zinc-950/5 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-950/75 dark:shadow-black/30 sm:right-6 md:right-[calc((100vw-48rem)/2+1.5rem)]">
      <div className="flex items-center gap-1">
        {locales.map((locale) => (
          <button
            type="button"
            onClick={() => switchLocale(locale.code)}
            key={locale.code}
            disabled={locale.code === activeLocale}
            aria-label={locale.code}
            aria-pressed={locale.code === activeLocale}
            className={`flex h-9 min-w-16 items-center justify-center gap-1.5 rounded-full px-3 text-sm font-semibold transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900 dark:focus-visible:outline-white ${
              locale.code === activeLocale
                ? 'cursor-default bg-sky-600 dark:bg-sky-400 text-white shadow-sm shadow-sky-500/25'
                : 'cursor-pointer text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white'
            }`}
          >
            <span aria-hidden="true" className="text-base leading-none">
              {locale.label}
            </span>
            <span className="leading-none">{locale.code.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
