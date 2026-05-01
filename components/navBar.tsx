'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import LocaleSwitcher from './localeSwitcher';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { type AppLocale } from '@/i18n/config';

const navItems = [
  { href: '/about', labelKey: 'about' },
  { href: '/projects', labelKey: 'projects' },
  { href: '/skills', labelKey: 'skills' },
  { href: '/contact', labelKey: 'contact' },
] as const;

type NavigationLink = {
  href: (typeof navItems)[number]['href'];
  label: string;
};

const CV_DIRECTORY = '/cv';

const cvFileNames = {
  cs: 'alena-ceskova-cv-cs.pdf',
  en: 'alena-ceskova-cv-en.pdf',
} satisfies Record<AppLocale, string>;

function getCvDownload(locale: AppLocale) {
  const filename = cvFileNames[locale];

  return {
    href: `${CV_DIRECTORY}/${filename}`,
    filename,
  };
}

export default function Navbar() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();
  const locale = useLocale() as AppLocale;

  const navigationLinks = navItems.map((item) => ({
    href: item.href,
    label: t(item.labelKey),
  }));

  const cvDownload = getCvDownload(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-background/80 backdrop-blur-xl dark:border-white/10">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Logo />

        <DesktopNav items={navigationLinks} activePathname={pathname} />

        <div className="flex items-center gap-2">
          <CvDownloadLink cv={cvDownload} label={t('cv')} ariaLabel={t('downloadCvAria')} />
          <LocaleSwitcher />
          <MobileNav
            items={navigationLinks}
            activePathname={pathname}
            openMenuLabel={t('openMenu')}
            menuTitle={t('menu')}
            menuDescription={t('menuDescription')}
          />
        </div>
      </nav>
    </header>
  );
}

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-semibold">
      <Image src="/images/logo.png" alt="Logo" width={121} height={40} priority />
    </Link>
  );
}

function DesktopNav({
  items,
  activePathname,
}: {
  items: NavigationLink[];
  activePathname: string;
}) {
  return (
    <div className="hidden items-center gap-1 md:flex">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={activePathname === item.href ? 'page' : undefined}
          className={`rounded-full px-4 py-2 text-lg transition ${
            activePathname === item.href
              ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400'
              : 'hover:bg-sky-500/10 hover:text-sky-500 text-foreground'
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

function CvDownloadLink({
  cv,
  label,
  ariaLabel,
}: {
  cv: ReturnType<typeof getCvDownload>;
  label: string;
  ariaLabel: string;
}) {
  return (
    <Button asChild variant="outline" size="lg" className="rounded-full">
      <a href={cv.href} download={cv.filename} aria-label={ariaLabel}>
        <Download className="size-4" aria-hidden="true" />
        {label}
      </a>
    </Button>
  );
}

function MobileNav({
  items,
  activePathname,
  openMenuLabel,
  menuTitle,
  menuDescription,
}: {
  items: NavigationLink[];
  activePathname: string;
  openMenuLabel: string;
  menuTitle: string;
  menuDescription: string;
}) {
  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label={openMenuLabel}>
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-72">
          <SheetHeader>
            <SheetTitle>{menuTitle}</SheetTitle>
            <SheetDescription className="sr-only">{menuDescription}</SheetDescription>
          </SheetHeader>

          <div className="mt-8 flex flex-col gap-2">
            {items.map((item) => (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  aria-current={activePathname === item.href ? 'page' : undefined}
                  className={`rounded-xl px-4 py-3 text-base transition ${
                    activePathname === item.href
                      ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400'
                      : 'hover:bg-sky-500/10 hover:text-sky-500 text-foreground'
                  }`}
                >
                  {item.label}
                </Link>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
