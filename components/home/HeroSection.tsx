import Image from 'next/image';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <section className="relative w-full" style={{ minHeight: '100svh' }}>
      {/* Background photo, full-bleed — extends behind the transparent navbar */}
      <div className="absolute inset-0">
        <Image
          src="/hero.webp"
          alt="Sakienah — rust voor lichaam en ziel"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(10,8,4,0.55) 0%, rgba(10,8,4,0.5) 10%, transparent 22%), linear-gradient(0deg, rgba(10,8,4,0.65) 0%, rgba(10,8,4,0.35) 28%, transparent 50%), linear-gradient(90deg, rgba(10,8,4,0.6) 0%, rgba(10,8,4,0.22) 42%, transparent 68%)',
          }}
        />
      </div>

      {/* Desktop content — text + inline CTA, bottom-left */}
      <div
        className="hidden lg:flex relative z-10 flex-col justify-end"
        style={{ minHeight: '100svh', padding: '120px 24px 231px' }}
      >
        <div className="max-w-[1280px] mx-auto w-full px-6 md:px-10">
          <div className="text-left" style={{ maxWidth: 720 }}>
            {/* Bismillah */}
            <div className="flex items-center justify-start mb-6" style={{ gap: 12 }}>
              <span
                className="font-arabic"
                style={{ fontSize: 'var(--text-lg)', color: '#c9a84c', direction: 'rtl' }}
              >
                بِسْمِ اللَّهِ
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-display text-white"
              style={{
                fontSize: 'clamp(2.25rem, 5.5vw, 4.75rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                marginBottom: 2,
                letterSpacing: '-0.02em',
                textShadow: '0 2px 24px rgba(0,0,0,0.3)',
              }}
            >
              Alles voor jouw
            </h1>
            <h1
              className="font-display text-gold italic mb-9"
              style={{
                fontSize: 'clamp(2.25rem, 5.5vw, 4.75rem)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              spirituele reis
            </h1>

            {/* Subheadline */}
            <p
              className="mb-10"
              style={{
                fontSize: 'var(--text-sm)',
                lineHeight: 1.75,
                maxWidth: 440,
                fontWeight: 300,
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              Van handgemaakte gebedskleden tot Koran accessoires — elk product met zorg
              geselecteerd. Omdat jouw ibadah verdient het beste.
            </p>

            {/* CTA's */}
            <div className="flex items-center justify-start" style={{ gap: 14 }}>
              <Button href="/shop" variant="primary">
                Ontdek de collectie
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-1.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>
              <Button href="/shop?category=deals" variant="outline">
                Bekijk deals
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile content — text centered above, CTA's pinned to the very bottom */}
      <div className="lg:hidden relative z-10" style={{ minHeight: '100svh' }}>
        <div
          className="flex flex-col justify-end"
          style={{ minHeight: '100svh', padding: '120px 24px 130px' }}
        >
          <div className="text-center mx-auto" style={{ maxWidth: 480 }}>
            {/* Bismillah */}
            <div className="flex items-center justify-center mb-3" style={{ gap: 12 }}>
              <span
                className="font-arabic"
                style={{ fontSize: 'var(--text-lg)', color: '#c9a84c', direction: 'rtl' }}
              >
                بِسْمِ اللَّهِ
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-display text-white"
              style={{
                fontSize: 'clamp(2.25rem, 5.5vw, 4.75rem)',
                fontWeight: 700,
                lineHeight: 1.05,
                marginBottom: 2,
                letterSpacing: '-0.02em',
                textShadow: '0 2px 24px rgba(0,0,0,0.3)',
              }}
            >
              Alles voor jouw
            </h1>
            <h1
              className="font-display text-gold italic"
              style={{
                fontSize: 'clamp(2.25rem, 5.5vw, 4.75rem)',
                fontWeight: 400,
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
              }}
            >
              spirituele reis
            </h1>
          </div>
        </div>

        {/* CTA's — pinned to the very bottom of the hero */}
        <div className="absolute left-0 right-0 bottom-0" style={{ padding: '0 24px 40px' }}>
          <div className="flex flex-nowrap items-stretch justify-center" style={{ gap: 10 }}>
            <Button
              href="/shop"
              variant="primary"
              className="flex-1 justify-center whitespace-nowrap"
              style={{ padding: '14px 10px', fontSize: 10.5, letterSpacing: '0.04em', gap: 6 }}
            >
              Ontdek de collectie
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-1.5 shrink-0"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
            <Button
              href="/shop?category=deals"
              variant="outline"
              className="flex-1 justify-center whitespace-nowrap"
              style={{ padding: '14px 10px', fontSize: 10.5, letterSpacing: '0.04em' }}
            >
              Bekijk deals
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
