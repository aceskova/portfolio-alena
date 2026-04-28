import { getTranslations } from 'next-intl/server';
import PageShell from '@/components/pageShell';

export default async function Projects() {
  const t = await getTranslations('Pages.projects');

  return <PageShell eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />;
}
