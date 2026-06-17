import { Button } from '@/components/ui/Button';
import { HeroVideo } from './HeroVideo';

export function HeroSection() {
  return (
    <section className="hero-section">
      {/* Mobile: video above text */}
      <div className="hero-video-mobile lg:hidden bg-[#0a0a0a]">
        <HeroVideo />
      </div>

      {/* Left — donker, tekst */}
      <div className="hero-left bg-[#0a0a0a]">
        {/* Zellij pattern */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('/brand_assets/background.webp')",
            backgroundRepeat: 'repeat',
            backgroundSize: '320px auto',
            opacity: 0.2,
            filter: 'invert(1) sepia(1) saturate(5) hue-rotate(5deg) brightness(0.8)',
            mixBlendMode: 'screen',
            pointerEvents: 'none',
          }}
        />

        {/* Arabic watermark */}
        <div
          className="font-arabic select-none pointer-events-none absolute hidden lg:block"
          style={{
            right: -40,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 'clamp(8rem, 18vw, 17.5rem)',
            color: 'rgba(201,168,76,0.04)',
            lineHeight: 1,
            direction: 'rtl',
          }}
        >
          سكينة
        </div>

        <div className="relative z-10 w-full max-w-[480px] text-center lg:text-left">
          {/* Bismillah — doubles as the hero's eyebrow */}
          <div
            className="flex items-center justify-center lg:justify-start mb-6"
            style={{ gap: 12 }}
          >
            <span
              style={{ width: 32, height: 1, background: '#c9a84c', opacity: 0.6, flexShrink: 0 }}
            />
            <span
              className="font-arabic"
              style={{
                fontSize: 'var(--text-lg)',
                color: '#c9a84c',
                opacity: 0.85,
                direction: 'rtl',
              }}
            >
              بِسْمِ اللَّهِ
            </span>
            <span
              style={{ width: 32, height: 1, background: '#c9a84c', opacity: 0.6, flexShrink: 0 }}
            />
          </div>

          {/* Headline */}
          <h1
            className="font-display text-white"
            style={{
              fontSize: 'var(--text-hero)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 6,
              letterSpacing: '-0.02em',
            }}
          >
            Alles voor jouw
          </h1>
          <h1
            className="font-display text-gold italic"
            style={{
              fontSize: 'var(--text-hero)',
              fontWeight: 400,
              lineHeight: 1.1,
              marginBottom: 24,
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
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            Van handgemaakte gebedskleden tot Koran accessoires — elk product met zorg geselecteerd.
            Omdat jouw ibadah verdient het beste.
          </p>

          {/* CTA's */}
          <div
            className="flex flex-wrap items-center justify-center lg:justify-start"
            style={{ gap: 14 }}
          >
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

      {/* Right — video, fills the column edge-to-edge */}
      <div className="hero-right hidden lg:block">
        <HeroVideo fill />
      </div>
    </section>
  );
}
