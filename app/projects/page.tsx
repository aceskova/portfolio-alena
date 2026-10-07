import { CalendarCheck2, Wrench, Waves, PanelsTopLeft } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import PortfolioCard from '@/components/portfolioCard';

const caseStudyCta = {
  cs: 'Otevřít case study',
  en: 'Open case study',
};

const projects = [
  {
    key: 'reserve',
    href: '/projects/reserve-app',
    icon: CalendarCheck2,
  },
  {
    key: 'jablonecSea',
    href: '/projects/jablonec-sea',
    icon: Waves,
  },
] as const;

export default async function Projects() {
  const locale = await getLocale();
  const t = await getTranslations('Pages.projects');
  const cta = caseStudyCta[locale as keyof typeof caseStudyCta] ?? caseStudyCta.cs;

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-20">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-foreground">
        {t('eyebrow')}
      </p>
      <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {t('title')}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{t('description')}</p>

      <section className="mt-12 grid gap-5">
        <PortfolioCard
          icon={Wrench}
          label={t('currentWork.label')}
          title={t('currentWork.title')}
          description={t.raw('currentWork.description') as string[]}
          technologies={[
            'TypeScript',
            'React Hook Form',
            'TanStack Query',
            'Zod',
            'Fetch API',
            'Nginx',
            'Podman',
            'Playwright',
          ]}
          note={t('currentWork.context')}
        >
          <div className="mt-6 grid gap-5">
            <div>
              <h3 className="text-base font-semibold">{t('currentWork.currentTitle')}</h3>
              <p className="mt-2 max-w-2xl text-base leading-6 text-muted-foreground">
                {(t.raw('currentWork.current') as string[]).map((sentence) => (
                  <span key={sentence} className="block">
                    {sentence}
                  </span>
                ))}
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold">{t('currentWork.nextTitle')}</h3>
              <p className="mt-2 max-w-2xl text-base leading-6 text-muted-foreground">
                {(t.raw('currentWork.next') as string[]).map((sentence) => (
                  <span key={sentence} className="block">
                    {sentence}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </PortfolioCard>
        <PortfolioCard
          icon={PanelsTopLeft}
          label={t('portfolio.label')}
          title={t('portfolio.title')}
          description={t('portfolio.description')}
          technologies={[
            'Next.js',
            'React',
            'TypeScript',
            'Tailwind CSS',
            'next-intl',
            'Vercel Analytics',
          ]}
        >
          <div className="mt-6 grid gap-5">
            <div>
              <h3 className="text-base font-semibold">{t('portfolio.learningTitle')}</h3>
              <ul className="mt-2 max-w-2xl list-disc space-y-2 pl-5 text-base leading-6 text-muted-foreground">
                {(t.raw('portfolio.learning') as string[]).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-base font-semibold">{t('portfolio.purposeTitle')}</h3>
              <p className="mt-2 max-w-2xl text-base leading-6 text-muted-foreground">
                {t('portfolio.purpose')}
              </p>
            </div>
          </div>
        </PortfolioCard>
        {projects.map((project) => (
          <PortfolioCard
            key={project.href}
            icon={project.icon}
            title={t(`${project.key}.title`)}
            description={t(`${project.key}.pitch`)}
            technologies={t.raw(`${project.key}.stack.items`) as string[]}
            technologyLimit={5}
            action={{ href: project.href, label: cta }}
            actionPosition="side"
          />
        ))}
      </section>
    </main>
  );
}
