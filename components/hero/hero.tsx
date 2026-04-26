import HeroImage from './heroImage';
import HeroText from './heroText';

export default function Hero() {
  return (
    <section className="mx-auto px-0 py-10">
      <div className="mx-auto grid items-center gap-12 md:grid-cols-2">
        <HeroText />
        <HeroImage />
      </div>
    </section>
  );
}
