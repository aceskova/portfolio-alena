export const themeCookieName = 'theme';
export const themeCookieMaxAge = 31536000;

export const themeModes = ['light', 'dark'] as const;

export type ThemeMode = (typeof themeModes)[number];

export const defaultTheme: ThemeMode = 'light';

export function isThemeMode(value: string | undefined): value is ThemeMode {
  return themeModes.includes(value as ThemeMode);
}
