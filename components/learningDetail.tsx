import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export type LearningDetailData = {
  back: string;
  label: string;
  title: string;
  intro: string;
  featuresTitle: string;
  features: string[];
  learningsTitle: string;
  learnings: { title: string; description: string }[];
  nextTitle: string;
  next: string[];
};

export default function LearningDetail({ data }: { data: LearningDetailData }) {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-20">
      <Link
        href="/learning"
        className="mb-8 inline-flex items-center gap-2 self-start text-sm font-semibold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {data.back}
      </Link>
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-foreground">
        {data.label}
      </p>
      <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {data.title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{data.intro}</p>
      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight">{data.featuresTitle}</h2>
        <ul className="mt-5 max-w-2xl list-disc space-y-2 pl-5 text-base leading-7 text-muted-foreground">
          {data.features.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight">{data.learningsTitle}</h2>
        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          {data.learnings.map((item) => (
            <div key={item.title} className="border-l-2 border-sky-500/40 pl-5">
              <h3 className="text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-base leading-7 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-12 border-t border-border pt-8">
        <h2 className="text-2xl font-bold tracking-tight">{data.nextTitle}</h2>
        <ul className="mt-5 max-w-2xl list-disc space-y-2 pl-5 text-base leading-7 text-muted-foreground">
          {data.next.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}
