import TechnologyBadges from '@/components/technologyBadges';
import { ArrowRight, ArrowUpRight, Code2, Database, GitBranch, TestTube2 } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

const areas = [
  {
    key: 'frontend',
    icon: Code2,
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    links: [
      { key: 'portfolio', href: '/' },
      { key: 'habitTracker', href: '/learning/habit-tracker' },
    ],
  },
  {
    key: 'backend',
    icon: Database,
    tags: ['REST API', 'NestJS', 'Prisma', 'PostgreSQL'],
    links: [{ key: 'reserve', href: '/projects/reserve-app' }],
  },
  {
    key: 'testing',
    icon: TestTube2,
    tags: [],
    links: [{ key: 'reserve', href: '/projects/reserve-app' }],
  },
  {
    key: 'workflow',
    icon: GitBranch,
    tags: ['Git', 'GitHub', 'Swagger', 'Vercel'],
    links: [
      { key: 'github', href: 'https://github.com/aceskova' },
      { key: 'projects', href: '/projects' },
    ],
  },
] as const;

export default async function Skills() {
  const t = await getTranslations('Pages.skills');

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-20">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-foreground">
        {t('eyebrow')}
      </p>
      <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {t('title')}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{t('description')}</p>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {areas.map((area) => {
          const Icon = area.icon;
          const tags =
            area.key === 'testing' ? (t.raw('areas.testing.tags') as string[]) : area.tags;

          return (
            <section
              key={area.key}
              className="flex flex-col rounded-lg border border-border bg-card p-6 text-card-foreground"
            >
              <span className="mb-5 flex size-12 items-center justify-center rounded-full bg-sky-500/10 text-brand-foreground">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h2 className="text-2xl font-bold tracking-tight">{t(`areas.${area.key}.title`)}</h2>
              <p className="mt-3 text-base leading-6 text-muted-foreground">
                {t(`areas.${area.key}.description`)}
              </p>
              <TechnologyBadges items={tags} className="mt-5" />
              <div className="mt-auto flex flex-wrap gap-x-5 gap-y-3 pt-6">
                {area.links.map((link) => {
                  const external = link.href.startsWith('https://');
                  const Icon = external ? ArrowUpRight : ArrowRight;
                  return (
                    <Link
                      key={link.key}
                      href={link.href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-brand-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
                    >
                      {t(`links.${link.key}`)}
                      <Icon className="size-4" aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <section className="mt-12 border-t border-border pt-8">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{t('learning.title')}</h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
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
    </main>
  );
}
