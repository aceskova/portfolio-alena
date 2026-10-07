import { ArrowRight, Download } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';

export default function HeroText() {
  const t = useTranslations('HomePage');
  const locale = useLocale();
  const cvFilename = `alena-ceskova-cv-${locale === 'en' ? 'en' : 'cs'}.pdf`;

  return (
    <div>
      <p className="mb-5 text-sm font-semibold text-brand-foreground">{t('identity')}</p>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        <span className="block">{t('headline')}</span>
        <span className="mt-1 block">{t('headlineSecond')}</span>
      </h1>

      <div className="mt-6 space-y-4 text-base leading-7 text-muted-foreground">
        <p>{t('description')}</p>
        <p>{t('approach')}</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/projects"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-5 py-2.5 text-sm font-medium text-sky-950 transition-colors hover:border-sky-300 hover:bg-sky-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-100 dark:hover:border-sky-600 dark:hover:bg-sky-900"
        >
          {t('projectsCta')}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
        <a
          href={`/cv/${cvFilename}`}
          download={cvFilename}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-sky-500/50 hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
        >
          <Download className="size-4" aria-hidden="true" />
          {t('cvCta')}
        </a>
      </div>

      <p className="mt-8 border-l-2 border-sky-500/40 pl-4 text-base italic leading-7 text-muted-foreground">
        {t('personal')}
      </p>
    </div>
  );
}
