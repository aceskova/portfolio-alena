'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
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
import { useTranslations } from 'next-intl';

const navItems = [
  { href: '/about', labelKey: 'about' },
  { href: '/projects', labelKey: 'projects' },
  { href: '/skills', labelKey: 'skills' },
  { href: '/contact', labelKey: 'contact' },
] as const;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-background/80 backdrop-blur-xl dark:border-white/10">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
        <Logo />

        <DesktopNav />

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <MobileNav />
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

function DesktopNav() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();

  return (
    <div className="hidden items-center gap-1 md:flex">
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          aria-current={pathname === item.href ? 'page' : undefined}
          className={`rounded-full px-4 py-2 text-lg transition ${
            pathname === item.href
              ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400'
              : 'hover:bg-sky-500/10 hover:text-sky-500 text-foreground'
          }`}
        >
          {t(item.labelKey)}
        </Link>
      ))}
    </div>
  );
}

function MobileNav() {
  const t = useTranslations('Navigation');
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" aria-label={t('openMenu')}>
            <Menu className="size-5" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-72">
          <SheetHeader>
            <SheetTitle>{t('menu')}</SheetTitle>
            <SheetDescription className="sr-only">{t('menuDescription')}</SheetDescription>
          </SheetHeader>

          <div className="mt-8 flex flex-col gap-2">
            {navItems.map((item) => (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? 'page' : undefined}
                  className={`rounded-xl px-4 py-3 text-base transition ${
                    pathname === item.href
                      ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400'
                      :  'hover:bg-sky-500/10 hover:text-sky-500 text-foreground'
                  }`}
                >
                  {t(item.labelKey)}
                </Link>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
