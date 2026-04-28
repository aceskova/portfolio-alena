import { getTranslations } from 'next-intl/server';
import PageShell from '@/components/pageShell';

export default function About() {
  return <AboutContent />;
}

async function AboutContent() {
  const t = await getTranslations('Pages.about');

  return <PageShell eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />;
}
