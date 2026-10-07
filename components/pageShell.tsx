type PageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageShell({ eyebrow, title, description }: PageShellProps) {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-20">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-foreground">
        {eyebrow}
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p>
    </main>
  );
}
