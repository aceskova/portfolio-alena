'use client';

import Image from 'next/image';
import { useSyncExternalStore } from 'react';
import { Button } from '@/components/ui/button';
import { themeCookieMaxAge, themeCookieName, type ThemeMode } from '@/lib/theme';

const themeChangeEvent = 'themechange';

const themeIcons = {
  light: '/theme/sun.svg',
  dark: '/theme/moon.svg',
} satisfies Record<ThemeMode, string>;

const nextTheme = {
  light: 'dark',
  dark: 'light',
} satisfies Record<ThemeMode, ThemeMode>;

function persistThemeCookie(theme: ThemeMode) {
  document.cookie = `${themeCookieName}=${theme}; path=/; samesite=lax; max-age=${themeCookieMaxAge}`;
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);
  window.dispatchEvent(new Event(themeChangeEvent));
}

function getThemeSnapshot(): ThemeMode {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

function subscribeToThemeChange(onStoreChange: () => void) {
  window.addEventListener(themeChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener(themeChangeEvent, onStoreChange);
  };
}

export default function ThemeSwitcher({
  initialTheme,
  labels,
}: {
  initialTheme: ThemeMode;
  labels: Record<ThemeMode, string>;
}) {
  const theme = useSyncExternalStore(subscribeToThemeChange, getThemeSnapshot, () => initialTheme);
  const targetTheme = nextTheme[theme];

  function switchTheme() {
    applyTheme(targetTheme);
    persistThemeCookie(targetTheme);
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-lg"
      onClick={switchTheme}
      aria-label={labels[targetTheme]}
      className="rounded-full"
      suppressHydrationWarning
    >
      <Image
        src={themeIcons[targetTheme]}
        alt=""
        width={20}
        height={20}
        aria-hidden="true"
        className="size-5"
      />
    </Button>
  );
}
