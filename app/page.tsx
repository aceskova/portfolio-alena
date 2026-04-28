import Hero from '@/components/hero/hero';

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-background font-sans text-foreground">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center bg-background px-5 pb-20 pt-16 sm:items-start sm:px-8 sm:pb-28 sm:pt-20 lg:px-16">
        <Hero />
      </main>
    </div>
  );
}
