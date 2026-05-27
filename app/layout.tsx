import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';
import Navbar from '@/components/navBar';
import { defaultTheme, themeCookieName } from '@/lib/theme';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Meta');

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${defaultTheme} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
try {
  var match = document.cookie.match(/(?:^|; )${themeCookieName}=([^;]*)/);
  var cookieTheme = match ? decodeURIComponent(match[1]) : '';
  var theme = cookieTheme === 'light' || cookieTheme === 'dark'
    ? cookieTheme
    : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.classList.remove('light', 'dark');
  document.documentElement.classList.add(theme);
} catch (_) {}
            `.trim(),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>
          <Navbar initialTheme={defaultTheme} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
