import { ArrowRight, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { useId, type ReactNode } from 'react';
import { cn } from '@/lib/utils';
import TechnologyBadges from '@/components/technologyBadges';

type PortfolioCardProps = {
  icon: LucideIcon;
  label?: string;
  title: string;
  description: string | readonly string[];
  technologies: readonly string[];
  technologyLimit?: number;
  action?: { href: string; label: string };
  actionPosition?: 'side' | 'bottom';
  children?: ReactNode;
  note?: string;
};

export default function PortfolioCard({
  icon: Icon,
  label,
  title,
  description,
  technologies,
  technologyLimit,
  action,
  actionPosition = 'bottom',
  children,
  note,
}: PortfolioCardProps) {
  const titleId = useId();
  const className = cn(
    'grid gap-6 rounded-lg border border-border bg-card p-6 text-card-foreground sm:items-start',
    action && actionPosition === 'side'
      ? 'sm:grid-cols-[auto_1fr_auto]'
      : 'sm:grid-cols-[auto_1fr]',
    action &&
      'group transition hover:border-sky-500/50 hover:bg-muted/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500'
  );
  const cta = action && (
    <span
      className={cn(
        'inline-flex items-center gap-2 text-sm font-semibold text-brand-foreground',
        actionPosition === 'bottom' && 'mt-5'
      )}
    >
      {action.label}
      <ArrowRight className="size-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
    </span>
  );
  const content = (
    <>
      <span className="flex size-12 items-center justify-center rounded-full bg-sky-500/10 text-brand-foreground">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <div>
        {label && (
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-brand-foreground">
            {label}
          </p>
        )}
        <h2 id={titleId} className="text-2xl font-bold tracking-tight">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-6 text-muted-foreground">
          {typeof description === 'string'
            ? description
            : description.map((sentence) => (
                <span key={sentence} className="block">
                  {sentence}
                </span>
              ))}
        </p>
        {children}
        <TechnologyBadges items={technologies} limit={technologyLimit} className="mt-5" />
        {note && <p className="mt-5 text-sm leading-6 text-muted-foreground">{note}</p>}
        {actionPosition === 'bottom' && cta}
      </div>
      {actionPosition === 'side' && cta}
    </>
  );

  return action ? (
    <Link href={action.href} aria-labelledby={titleId} className={className}>
      {content}
    </Link>
  ) : (
    <article className={className}>{content}</article>
  );
}
