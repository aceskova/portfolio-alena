import { BriefcaseBusiness, Code2, ExternalLink, FileDown, Mail, MapPin } from 'lucide-react';
import { getLocale, getTranslations } from 'next-intl/server';
import { type AppLocale } from '@/i18n/config';

type ContactLink = {
  label: string;
  description: string;
  href: string;
  icon: 'linkedin' | 'github' | 'cv';
};

const linkedinUrl =
  'https://www.linkedin.com/in/alena-%C4%8De%C5%A1kov%C3%A1-mlejnkov%C3%A1-73a455360/';
const githubUrl = 'https://github.com/aceskova';
const email = 'amlejnkova@gmail.com';

const cvFileNames = {
  cs: 'alena-ceskova-cv-cs.pdf',
  en: 'alena-ceskova-cv-en.pdf',
} satisfies Record<AppLocale, string>;

const contactIcons = {
  linkedin: BriefcaseBusiness,
  github: Code2,
  cv: FileDown,
} satisfies Record<ContactLink['icon'], typeof BriefcaseBusiness>;

export default async function Contact() {
  const locale = (await getLocale()) as AppLocale;
  const t = await getTranslations('Pages.contact');
  const focusItems = t.raw('focus.items') as string[];
  const links = [
    {
      ...(t.raw('links.linkedin') as Omit<ContactLink, 'href' | 'icon'>),
      href: linkedinUrl,
      icon: 'linkedin',
    },
    {
      ...(t.raw('links.github') as Omit<ContactLink, 'href' | 'icon'>),
      href: githubUrl,
      icon: 'github',
    },
    {
      ...(t.raw('links.cv') as Omit<ContactLink, 'href' | 'icon'>),
      href: `/cv/${cvFileNames[locale]}`,
      icon: 'cv',
    },
  ] satisfies ContactLink[];

  return (
    <main className="mx-auto grid w-full max-w-5xl flex-1 gap-12 px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-20 lg:grid-cols-[1fr_0.85fr] lg:px-16">
      <section>
        <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">
          {t('eyebrow')}
        </p>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {t('title')}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{t('description')}</p>

        <div className="mt-10">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">{t('focus.title')}</h2>
          <ul className="mt-5 grid gap-3">
            {focusItems.map((item) => (
              <li key={item} className="flex gap-3 text-base leading-7 text-muted-foreground">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-sky-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <aside className="space-y-5">
        <a
          href={`mailto:${email}`}
          className="group block rounded-lg border border-border bg-card p-6 text-card-foreground transition hover:border-sky-500/50 hover:bg-muted/40"
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400">
            <Mail className="size-5" aria-hidden="true" />
          </span>
          <span className="mt-5 block text-2xl font-bold tracking-tight">{t('primary.title')}</span>
          <span className="mt-3 block text-base leading-7 text-muted-foreground">
            {t('primary.description')}
          </span>
          <span className="mt-4 block font-semibold text-foreground">{email}</span>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-600 dark:text-sky-400">
            {t('primary.cta')}
            <ExternalLink className="size-4" aria-hidden="true" />
          </span>
        </a>

        <div className="grid gap-3">
          {links.map((link) => (
            <ContactAction key={link.href} link={link} />
          ))}
        </div>

        <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-5 text-card-foreground">
          <MapPin className="mt-0.5 size-5 shrink-0 text-sky-600 dark:text-sky-400" />
          <div>
            <p className="font-semibold">{t('location.title')}</p>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {t('location.description')}
            </p>
          </div>
        </div>
      </aside>
    </main>
  );
}

function ContactAction({ link }: { link: ContactLink }) {
  const Icon = contactIcons[link.icon];
  const isCv = link.icon === 'cv';

  return (
    <a
      href={link.href}
      target={isCv ? undefined : '_blank'}
      rel={isCv ? undefined : 'noreferrer'}
      download={isCv ? true : undefined}
      className="flex items-start gap-4 rounded-lg border border-border bg-card p-5 text-card-foreground transition hover:border-sky-500/50 hover:bg-muted/40"
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block font-semibold">{link.label}</span>
        <span className="mt-1 block text-sm leading-6 text-muted-foreground">
          {link.description}
        </span>
      </span>
    </a>
  );
}
