import Image from 'next/image';

export default function HeroImage() {
  return (
    <div className="flex w-full justify-center overflow-hidden px-4 py-4">
      <div className="relative aspect-4/5 w-64 sm:w-80">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)] overflow-visible"
          viewBox="0 0 320 400"
        >
          <ellipse
            cx="160"
            cy="200"
            rx="154"
            ry="194"
            className="stroke-sky-600/70 dark:stroke-sky-400/70"
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="24 24"
            strokeDashoffset="0"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-144"
              dur="6s"
              repeatCount="indefinite"
            />
          </ellipse>
        </svg>

        <div
          className="relative h-full w-full overflow-hidden rounded-[50%] shadow-xl"
          style={{
            WebkitMaskImage:
              'radial-gradient(ellipse at center, black 78%, rgba(0,0,0,.85) 86%, transparent 100%)',
            maskImage:
              'radial-gradient(ellipse at center, black 78%, rgba(0,0,0,.85) 86%, transparent 100%)',
          }}
        >
          <Image
            src="/images/hero.png"
            alt="Portrait of Alena"
            fill
            loading="eager"
            sizes="(min-width: 768px) 20rem, 80vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 rounded-[50%] shadow-[inset_0_0_30px_20px_var(--background)]" />
        </div>
      </div>
    </div>
  );
}
