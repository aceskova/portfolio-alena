type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageShell({ eyebrow, title, description }: PageShellProps) {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-20 lg:px-16">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">
        {eyebrow}
      </p>
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
    </main>
  );
}
