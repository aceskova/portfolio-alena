import { ArrowRight, CalendarCheck2 } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';

const caseStudyCta = {
  cs: 'Otevřít case study',
  en: 'Open case study',
};

export default async function Projects() {
  const locale = await getLocale();
  const t = await getTranslations('Pages.projects');
  const stack = t.raw('reserve.stack.items') as string[];
  const visibleStack = stack.slice(0, 5);
  const hiddenStackCount = stack.length - visibleStack.length;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-20 lg:px-16">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">
        {t('eyebrow')}
      </p>
      <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        {t('title')}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{t('description')}</p>

      <section className="mt-12 grid gap-5">
        <Link
          href="/projects/reserve-app"
          className="group grid gap-6 rounded-lg border border-border bg-card p-6 text-card-foreground transition hover:border-sky-500/50 hover:bg-muted/40 sm:grid-cols-[auto_1fr_auto] sm:items-start"
        >
          <span className="flex size-12 items-center justify-center rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400">
            <CalendarCheck2 className="size-5" aria-hidden="true" />
          </span>

          <span>
            <span className="block text-2xl font-bold tracking-tight">{t('reserve.title')}</span>
            <span className="mt-3 block max-w-2xl text-base leading-6 text-muted-foreground">
              {t('reserve.pitch')}
            </span>
            <span className="mt-5 flex flex-wrap gap-2">
              {visibleStack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground"
                >
                  {item}
                </span>
              ))}
              {hiddenStackCount > 0 && (
                <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                  +{hiddenStackCount}
                </span>
              )}
            </span>
          </span>

          <span className="inline-flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-400">
            {caseStudyCta[locale as keyof typeof caseStudyCta] ?? caseStudyCta.cs}
            <ArrowRight
              className="size-4 transition group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </span>
        </Link>
      </section>
    </main>
  );
}
