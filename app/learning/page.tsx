import PortfolioCard from '@/components/portfolioCard';
import { Layers3, CalendarCheck2 } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function Learning() {
  const t = await getTranslations('Pages.learning');

  const stack = ['React', 'TypeScript', 'Tailwind CSS', 'localStorage'];

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-20">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-foreground">
        {t('eyebrow')}
      </p>
      <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {t('title')}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{t('description')}</p>

      <div className="mt-12 grid gap-5">
        <PortfolioCard
          icon={Layers3}
          label={t('ibuiltthis.label')}
          title={t('ibuiltthis.title')}
          description={t('ibuiltthis.pitch')}
          technologies={['Next.js 16', 'React 19', 'Drizzle', 'PostgreSQL', 'Clerk']}
          action={{ href: '/learning/ibuiltthis', label: t('ibuiltthis.cta') }}
        />
        <PortfolioCard
          icon={CalendarCheck2}
          label={t('habitTracker.label')}
          title={t('habitTracker.title')}
          description={t('habitTracker.description')}
          technologies={stack}
          action={{ href: '/learning/habit-tracker', label: t('habitTracker.cta') }}
        />
      </div>
    </main>
  );
}
