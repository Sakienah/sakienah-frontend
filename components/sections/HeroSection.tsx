import Link from 'next/link';
import { getProducts } from '@/lib/api';
import { HeroProductCards } from './HeroProductCards';

export async function HeroSection() {
  const products = await getProducts().catch(() => []);
  const featured = products.slice(0, 2);

  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '58% 42%',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Left */}
      <div
        style={{
          background: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '140px 64px 80px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Geom pattern */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
          aria-hidden
        >
          <defs>
            <pattern
              id="geom-hero-l"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <g stroke="#c9a84c" strokeWidth="0.5" fill="none" opacity="0.6">
                <path d="M40 10 L70 40 L40 70 L10 40 Z" />
                <path d="M40 24 L56 40 L40 56 L24 40 Z" />
                <path d="M40 0 L40 10 M40 70 L40 80 M0 40 L10 40 M70 40 L80 40" strokeWidth="0.3" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geom-hero-l)" />
        </svg>
        {/* Arabic watermark */}
        <div
          className="font-arabic select-none pointer-events-none absolute"
          style={{
            right: -40,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: 280,
            color: 'rgba(201,168,76,0.04)',
            lineHeight: 1,
            direction: 'rtl',
          }}
        >
          سكينة
        </div>

        <div className="relative z-10">
          {/* Bismillah */}
          <div className="flex items-center mb-7" style={{ gap: 12 }}>
            <span
              style={{ width: 28, height: 1, background: '#c9a84c', opacity: 0.6, flexShrink: 0 }}
            />
            <span
              className="font-arabic"
              style={{ fontSize: 18, color: '#c9a84c', opacity: 0.85, direction: 'rtl' }}
            >
              بِسْمِ اللَّهِ
            </span>
            <span
              style={{ width: 28, height: 1, background: '#c9a84c', opacity: 0.6, flexShrink: 0 }}
            />
          </div>

          <p
            className="uppercase font-semibold text-gold mb-5"
            style={{ fontFamily: 'inherit', fontSize: 10, letterSpacing: '0.22em' }}
          >
            Islamitische Lifestyle Winkel
          </p>

          <h1
            className="font-display text-white"
            style={{
              fontSize: 64,
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
              fontSize: 64,
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
            style={{ fontSize: 16, lineHeight: 1.75, maxWidth: 420, fontWeight: 300 }}
          >
            Premium producten geselecteerd met zorg en intentie — van gebedskleding tot Koran
            accessoires.
          </p>

          <div className="flex mb-13" style={{ gap: 14 }}>
            <Link
              href="/shop"
              className="text-[11px] tracking-[0.15em] uppercase font-semibold bg-gold text-[#0a0a0a] hover:opacity-85 transition-opacity"
              style={{ padding: '16px 36px' }}
            >
              Shop collectie
            </Link>
            <Link
              href="/about"
              className="text-[11px] tracking-[0.15em] uppercase font-medium hover:text-gold hover:border-gold transition-all"
              style={{
                padding: '16px 36px',
                background: 'transparent',
                color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              Over Sakienah
            </Link>
          </div>

          <div className="flex flex-wrap" style={{ gap: 32 }}>
            {['Gratis verzending v.a. €50', '30 dagen retour', 'Veilig betalen'].map((item) => (
              <span
                key={item}
                className="flex items-center"
                style={{
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.4)',
                  letterSpacing: '0.05em',
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 4,
                    height: 4,
                    background: '#c9a84c',
                    transform: 'rotate(45deg)',
                    flexShrink: 0,
                  }}
                />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right */}
      <div
        style={{
          background: '#FAF7F2',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '140px 48px 80px',
          gap: 24,
          position: 'relative',
        }}
      >
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
          aria-hidden
        >
          <defs>
            <pattern
              id="geom-hero-r"
              x="0"
              y="0"
              width="80"
              height="80"
              patternUnits="userSpaceOnUse"
            >
              <g stroke="#c9a84c" strokeWidth="0.5" fill="none" opacity="0.9">
                <path d="M40 10 L70 40 L40 70 L10 40 Z" />
                <path d="M40 24 L56 40 L40 56 L24 40 Z" />
                <path d="M40 0 L40 10 M40 70 L40 80 M0 40 L10 40 M70 40 L80 40" strokeWidth="0.3" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#geom-hero-r)" />
        </svg>
        <div
          className="font-arabic select-none absolute"
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
