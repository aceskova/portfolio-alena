import { cn } from '@/lib/utils';

type TechnologyBadgesProps = {
  items: readonly string[];
  limit?: number;
  size?: 'sm' | 'md';
  className?: string;
};

export default function TechnologyBadges({
  items,
  limit,
  size = 'sm',
  className,
}: TechnologyBadgesProps) {
  const visible = limit === undefined ? items : items.slice(0, Math.max(0, limit));
  const remaining = items.length - visible.length;
  if (items.length === 0) return null;

  const badgeClass = cn(
    'rounded-full border border-border bg-background px-3 text-foreground dark:border-sky-800 dark:bg-sky-950 dark:text-sky-100',
    size === 'sm' ? 'py-1 text-xs font-medium' : 'py-1.5 text-sm'
  );

  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {visible.map((item) => (
        <li key={item} className={badgeClass}>
          {item}
        </li>
      ))}
      {remaining > 0 && (
        <li className={cn(badgeClass, 'bg-muted text-muted-foreground')}>+{remaining}</li>
      )}
    </ul>
  );
}
