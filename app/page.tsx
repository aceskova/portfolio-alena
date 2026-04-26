import Hero from '@/components/hero/hero';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col items-center bg-white px-5 pb-20 pt-16 dark:bg-black sm:items-start sm:px-8 sm:pb-28 sm:pt-20 lg:px-16">
        <Hero />
      </main>
    </div>
  );
}
