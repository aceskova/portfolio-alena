import { getTranslations } from 'next-intl/server';
import LearningDetail, { type LearningDetailData } from '@/components/learningDetail';

export default async function IBuiltThis() {
  const t = await getTranslations('Pages.learning');
  const data = t.raw('ibuiltthis') as LearningDetailData;
  return <LearningDetail data={data} />;
}
