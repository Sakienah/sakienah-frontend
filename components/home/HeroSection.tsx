import Link from 'next/link';
import { getProducts } from '@/lib/api';
import { HeroProductCards } from './HeroProductCards';

export async function HeroSection() {
  const products = await getProducts().catch(() => []);
  const dealProduct = products.find((p) => p.comparePrice) ?? products[0];
  const featured = dealProduct ? [dealProduct] : [];

  return (
    <section className="hero-section">
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
          {/* Bismillah */}
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

          {/* Social proof bar */}
          <div
            className="flex items-center justify-center lg:justify-start mb-6"
            style={{ gap: 10 }}
          >
            <div className="flex items-center" style={{ gap: 3 }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <svg key={s} width="14" height="14" viewBox="0 0 20 20" style={{ fill: '#c9a84c' }}>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
              4.9/5 · 1.200+ tevreden klanten
            </span>
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
              marginBottom: 16,
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
            className="flex flex-wrap items-center mb-10 justify-center lg:justify-start"
            style={{ gap: 14 }}
          >
            <Link
              href="/shop"
              className="group relative overflow-hidden tracking-[0.12em] uppercase font-bold bg-gold text-[#0a0a0a]"
              style={{
                fontSize: 12,
                padding: '18px 44px',
                boxShadow: '0 4px 24px rgba(201,168,76,0.25)',
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
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
              </span>
              {/* Subtle gold pulse ring */}
              <span
                className="absolute inset-0 rounded-none"
                style={{
                  animation: 'ctaPulse 2.5s ease-in-out infinite',
                  border: '1px solid rgba(201,168,76,0.4)',
                }}
              />
            </Link>
            <Link
              href="/shop?category=deals"
              className="tracking-[0.12em] uppercase font-bold border border-gold/40 text-gold hover:bg-gold/10 transition-all"
              style={{ fontSize: 12, padding: '18px 36px' }}
            >
              Bekijk deals
            </Link>
          </div>
        </div>
      </div>

      {/* Right — crème, product */}
      <div className="hero-right bg-[#FAF7F2] hidden lg:flex">
        {/* Zellij pattern */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: "url('/brand_assets/background.webp')",
            backgroundRepeat: 'repeat',
            backgroundSize: '320px auto',
            opacity: 0.22,
            mixBlendMode: 'multiply',
            pointerEvents: 'none',
            transform: 'scaleX(-1)',
          }}
        />
        <div
          className="font-arabic select-none absolute hidden lg:block"
          style={{
            fontSize: 48,
            color: '#c9a84c',
            opacity: 0.25,
            top: 160,
            right: 40,
            direction: 'rtl',
          }}
        >
          سكينة
        </div>
        <HeroProductCards products={featured} />
      </div>

      <style>{`
        @keyframes ctaPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.03); opacity: 0.7; }
        }
      `}</style>
    </section>
  );
}
