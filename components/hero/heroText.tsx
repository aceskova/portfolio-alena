import { useTranslations } from 'next-intl';

export default function HeroText() {
  const t = useTranslations('HomePage');

  return (
    <div>
      <h1 className="mb-8 text-center text-3xl font-bold">
        {t('introPrefix')} <span className="text-sky-600 dark:text-sky-400">{t('introName')}</span>
      </h1>

      <h3 className="mb-4 text-center text-2xl font-bold">{t('headerSubtitle')}</h3>

      <div className="mt-8 space-y-4 text-center md:border-l md:border-sky-600/80 dark:md:border-sky-400/80 md:pl-6 md:text-left">
        {t.raw('features').map((feature: string) => (
          <p key={feature} className="text-base leading-8 text-muted-foreground">
            {feature}
          </p>
        ))}
      </div>
    </div>
  );
}
