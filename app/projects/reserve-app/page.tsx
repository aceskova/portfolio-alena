import {
  ArrowLeft,
  BookOpenText,
  CheckCircle2,
  Code2,
  ExternalLink,
  Layers3,
  LockKeyhole,
  Rocket,
  TestTube2,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

type LinkItem = {
  label: string;
  href: string;
  icon: 'web' | 'docs' | 'github';
};

type SummaryItem = {
  label: string;
  value: string;
};

type SectionItem = {
  title: string;
  description: string;
};

type RoadmapItem = {
  title: string;
  description: string;
};

const projectLinks = {
  web: 'https://reserve-app-web.vercel.app',
  docs: 'https://reserve-app-djf2.onrender.com/docs',
  github: 'https://github.com/aceskova/reserve-app',
};

const linkIcons = {
  web: ExternalLink,
  docs: BookOpenText,
  github: Code2,
} satisfies Record<LinkItem['icon'], typeof ExternalLink>;

const sectionIcons = [CheckCircle2, Layers3, LockKeyhole, TestTube2, Rocket];

export default async function ReserveAppProject() {
  const t = await getTranslations('Pages.projects');
  const links = t.raw('reserve.links.items') as LinkItem[];
  const summary = t.raw('reserve.summary.items') as SummaryItem[];
  const done = t.raw('reserve.done.items') as string[];
  const architecture = t.raw('reserve.architecture.items') as SectionItem[];
  const auth = t.raw('reserve.auth.items') as SectionItem[];
  const testing = t.raw('reserve.testing.items') as string[];
  const learnings = t.raw('reserve.learnings.items') as string[];
  const roadmap = t.raw('reserve.roadmap.items') as RoadmapItem[];

  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-20 lg:px-16">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {t('backToProjects')}
      </Link>

      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">
        {t('eyebrow')}
      </p>

      <section className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {t('reserve.title')}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            {t('reserve.pitch')}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {links.map((link) => (
              <ProjectLink
                key={link.icon}
                item={link}
                href={projectLinks[link.icon] || link.href}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-3 border-l border-border pl-5">
          {summary.map((item) => (
            <div key={item.label}>
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14 border-y border-border py-8">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
          {t('reserve.stack.title')}
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {(t.raw('reserve.stack.items') as string[]).map((item) => (
            <span
              key={item}
              className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <div className="mt-14 grid gap-12">
        <CaseSection iconIndex={0} title={t('reserve.done.title')}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {done.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-sky-600 dark:text-sky-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CaseSection>

        <CaseSection iconIndex={1} title={t('reserve.architecture.title')}>
          <div className="grid gap-4 md:grid-cols-3">
            {architecture.map((item) => (
              <InfoCard key={item.title} title={item.title} description={item.description} />
            ))}
          </div>
        </CaseSection>

        <CaseSection iconIndex={2} title={t('reserve.auth.title')}>
          <div className="grid gap-4 md:grid-cols-3">
            {auth.map((item) => (
              <InfoCard key={item.title} title={item.title} description={item.description} />
            ))}
          </div>
        </CaseSection>

        <CaseSection iconIndex={3} title={t('reserve.testing.title')}>
          <BulletList items={testing} />
        </CaseSection>

        <CaseSection iconIndex={4} title={t('reserve.learnings.title')}>
          <BulletList items={learnings} />
        </CaseSection>

        <section className="border-t border-border pt-10">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            {t('reserve.roadmap.title')}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {roadmap.map((item) => (
              <InfoCard key={item.title} title={item.title} description={item.description} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function ProjectLink({ item, href }: { item: LinkItem; href: string }) {
  const Icon = linkIcons[item.icon];
  const isReady = href.length > 0;

  if (!isReady) {
    return (
      <span className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-muted/50 px-4 text-sm font-medium text-muted-foreground">
        <Icon className="size-4" aria-hidden="true" />
        {item.label}
      </span>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-background px-4 text-sm font-medium text-foreground transition hover:bg-muted"
    >
      <Icon className="size-4" aria-hidden="true" />
      {item.label}
    </a>
  );
}

function CaseSection({
  iconIndex,
  title,
  children,
}: {
  iconIndex: number;
  title: string;
  children: React.ReactNode;
}) {
  const Icon = sectionIcons[iconIndex];

  return (
    <section>
      <div className="mb-5 flex items-center gap-3">
        <span className="flex size-9 items-center justify-center rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function InfoCard({ title, description }: SectionItem) {
  return (
    <article className="rounded-lg border border-border bg-card p-5 text-card-foreground">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
    </article>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sky-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
