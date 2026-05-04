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

        <div className="relative z-10 w-full max-w-[420px] text-center lg:text-left">
          {/* Bismillah */}
          <div
            className="flex items-center justify-center lg:justify-start mb-7"
            style={{ gap: 12 }}
          >
            <span
              style={{ width: 28, height: 1, background: '#c9a84c', opacity: 0.6, flexShrink: 0 }}
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
              style={{ width: 28, height: 1, background: '#c9a84c', opacity: 0.6, flexShrink: 0 }}
            />
          </div>

          <p
            className="uppercase font-semibold text-gold mb-5"
            style={{ fontFamily: 'inherit', fontSize: 'var(--text-xs)', letterSpacing: '0.22em' }}
          >
            Islamitische Lifestyle Winkel
          </p>

          <h1
            className="font-display text-white"
            style={{
              fontSize: 'var(--text-hero)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 8,
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
              marginBottom: 32,
              letterSpacing: '-0.02em',
            }}
          >
            islamitische lifestyle
          </h1>

          <p
            className="text-white/55 mb-11"
            style={{
              fontSize: 'var(--text-base)',
              lineHeight: 1.75,
              maxWidth: 420,
              fontWeight: 300,
              color: 'white',
            }}
          >
            Premium producten geselecteerd met zorg en intentie — van gebedskleding tot Koran
            accessoires.
          </p>

          <div className="flex flex-wrap mb-13 justify-center lg:justify-start" style={{ gap: 14 }}>
            <Link
              href="/shop"
              className="tracking-[0.15em] uppercase font-semibold bg-gold text-[#0a0a0a] hover:opacity-85 transition-opacity"
              style={{ fontSize: 'var(--text-xs)', padding: '16px 36px' }}
            >
              Shop collectie
            </Link>
          </div>

          {/* Subtiele trust-lijn — geen overlap met TrustBar eronder */}
          <div className="flex items-center" style={{ gap: 8, justifyContent: 'center' }}>
            <span className="flex items-center" style={{ gap: 6 }}>
              <svg width="14" height="14" viewBox="0 0 20 20" style={{ fill: '#c9a84c' }}>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
                4.9 · 500+ tevreden klanten
              </span>
            </span>
            <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.15)' }} />
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
              Islamitisch gecureerd
            </span>
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
    </section>
  );
}
