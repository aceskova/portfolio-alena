import { getTranslations } from 'next-intl/server';
import PageShell from '@/components/pageShell';

export default async function Contact() {
  const t = await getTranslations('Pages.contact');

  return <PageShell eyebrow={t('eyebrow')} title={t('title')} description={t('description')} />;
}
