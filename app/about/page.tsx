import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import climbingHold from '@/app/icon.png';

type ApproachItem = { title: string; description: string };

export default async function About() {
  const t = await getTranslations('Pages.about');
  const approach = t.raw('approach.items') as ApproachItem[];

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-20">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-foreground">
        {t('eyebrow')}
      </p>
      <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {t('title')}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{t('description')}</p>

      <div className="mt-12 space-y-12">
        <section className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {t('journey.title')}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {t('journey.description')}
          </p>
        </section>

        <section className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {t('approach.title')}
          </h2>
          <ul className="mt-5 space-y-5">
            {approach.map((item) => (
              <li key={item.title} className="border-l-2 border-sky-500/40 pl-5">
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-base leading-7 text-muted-foreground">{item.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {t('learning.title')}
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            {t('learning.description')}
          </p>
          <Link
            href="/learning"
            className="mt-5 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-brand-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
          >
            {t('learning.cta')}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </section>

        <section className="grid items-center gap-8 border-t border-border pt-10 sm:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              {t('climbing.title')}
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              {t('climbing.description')}
            </p>
          </div>
          <Image
            src={climbingHold}
            alt=""
            className="h-auto w-20 justify-self-center sm:w-24"
            sizes="(min-width: 640px) 96px, 80px"
          />
        </section>
      </div>
    </main>
  );
}
