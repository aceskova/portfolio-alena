import HeroImage from './heroImage';
import HeroText from './heroText';

export default function Hero() {
  return (
    <section className="mx-auto w-full px-0 py-4">
      <div className="mx-auto grid items-center gap-12 lg:grid-cols-[1.5fr_1fr]">
        <HeroText />
        <HeroImage />
      </div>
    </section>
  );
}
