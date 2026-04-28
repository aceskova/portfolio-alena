import { getTranslations } from 'next-intl/server';
import PageShell from '@/components/pageShell';

export default async function Skills() {
  const t = await getTranslations('Pages.skills');

  return <PageShell eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />;
}
