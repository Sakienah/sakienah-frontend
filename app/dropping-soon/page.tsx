import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sakienah — Binnenkort terug',
  description: 'Sakienah is momenteel uitverkocht. Een nieuwe collectie komt binnenkort.',
  robots: { index: false, follow: false },
};

export default function DroppingSoonPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: '#0a0a0a',
        color: '#ffffff',
        padding: 'clamp(32px, 6vw, 48px) clamp(24px, 5vw, 48px)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Zellij pattern */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/brand_assets/background.webp')",
          backgroundColor: '#0a0a0a',
          backgroundRepeat: 'repeat',
          backgroundSize: '320px auto',
          opacity: 0.22,
          filter: 'invert(1) sepia(1) saturate(5) hue-rotate(5deg) brightness(0.8)',
          backgroundBlendMode: 'screen',
          pointerEvents: 'none',
        }}
      />

      {/* Arabic watermark */}
      <div
        className="font-arabic select-none pointer-events-none absolute"
        style={{
          right: 'clamp(-60px, -5vw, -30px)',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(10rem, 22vw, 20rem)',
          color: 'rgba(201,168,76,0.06)',
          lineHeight: 1,
          direction: 'rtl',
        }}
      >
        سكينة
      </div>

      {/* Floating particles — subtle gold dust */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { top: '12%', left: '18%', delay: '0s', size: 2 },
          { top: '22%', left: '78%', delay: '1.2s', size: 1.5 },
          { top: '58%', left: '12%', delay: '2.4s', size: 2.5 },
          { top: '72%', left: '82%', delay: '0.8s', size: 1 },
          { top: '35%', left: '45%', delay: '3s', size: 2 },
          { top: '82%', left: '35%', delay: '1.8s', size: 1.5 },
          { top: '15%', left: '55%', delay: '2.8s', size: 1.8 },
          { top: '88%', left: '68%', delay: '0.4s', size: 2.2 },
          { top: '42%', left: '90%', delay: '3.4s', size: 1.2 },
          { top: '65%', left: '8%', delay: '2s', size: 1.7 },
        ].map((p, i) => (
          <span
            key={i}
            style={{
              position: 'absolute',
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              background: '#c9a84c',
              opacity: 0,
              animation: `particleFade 5s ease-in-out infinite`,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <style>{`
          @keyframes particleFade {
            0%, 100% {
              opacity: 0;
              transform: translateY(0);
            }
            50% {
              opacity: 0.35;
              transform: translateY(-12px);
            }
          }
        `}</style>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center" style={{ maxWidth: 520, gap: 32 }}>
        {/* Sakienah wordmark */}
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: '#ffffff',
          }}
        >
          SAKIENAH
        </h1>

        {/* Bismillah ornament */}
        <div className="flex items-center justify-center" style={{ gap: 16 }}>
          <span
            style={{
              width: 40,
              height: 1,
              background: '#c9a84c',
              opacity: 0.5,
              flexShrink: 0,
            }}
          />
          <span
            className="font-arabic"
            style={{
              fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
              color: '#c9a84c',
              opacity: 0.7,
              direction: 'rtl',
            }}
          >
            بِسْمِ اللَّهِ
          </span>
          <span
            style={{
              width: 40,
              height: 1,
              background: '#c9a84c',
              opacity: 0.5,
              flexShrink: 0,
            }}
          />
        </div>

        {/* Diamond ornament */}
        <div className="flex items-center justify-center" style={{ gap: 20 }}>
          <span style={{ width: 48, height: 1, background: '#c9a84c', opacity: 0.4 }} />
          <span
            style={{
              width: 7,
              height: 7,
              background: '#c9a84c',
              opacity: 0.7,
              transform: 'rotate(45deg)',
            }}
          />
          <span style={{ width: 48, height: 1, background: '#c9a84c', opacity: 0.4 }} />
        </div>

        {/* Main message */}
        <div style={{ marginTop: 8 }}>
          <h2
            className="font-display"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
              fontWeight: 600,
              color: '#c9a84c',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            Uitverkocht
          </h2>
          <p
            style={{
              fontSize: 'var(--text-sm)',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.6)',
              fontWeight: 300,
              maxWidth: 420,
              margin: '0 auto',
            }}
          >
            Bedankt voor jullie overweldigende steun. Onze huidige collectie is volledig
            uitverkocht.
          </p>
        </div>

        {/* "New dropping" message */}
        <div
          style={{
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: 1,
            padding: '28px 36px',
            maxWidth: 420,
            width: '100%',
          }}
        >
          <p
            className="font-display"
            style={{
              fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
              fontWeight: 500,
              color: '#ffffff',
              letterSpacing: '-0.01em',
              lineHeight: 1.4,
              marginBottom: 8,
            }}
          >
            Een nieuwe collectie
            <br />
            <span style={{ color: '#c9a84c', fontStyle: 'italic' }}>komt binnenkort</span>
          </p>
          <p
            style={{
              fontSize: 'var(--text-xs)',
              color: 'rgba(255,255,255,0.4)',
              fontWeight: 300,
              lineHeight: 1.6,
            }}
          >
            We werken achter de schermen aan iets moois.
            <br />
            Houd onze socials in de gaten voor de aankondiging.
          </p>
        </div>

        {/* Bottom star divider */}
        <div className="flex items-center justify-center" style={{ gap: 20 }}>
          <span style={{ width: 48, height: 1, background: '#c9a84c', opacity: 0.3 }} />
          <svg width="12" height="12" viewBox="0 0 24 24" style={{ fill: '#c9a84c', opacity: 0.5 }}>
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span style={{ width: 48, height: 1, background: '#c9a84c', opacity: 0.3 }} />
        </div>

        {/* Bottom text */}
        <p
          style={{
            fontSize: 'var(--text-xs)',
            color: 'rgba(255,255,255,0.3)',
            fontWeight: 300,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Soon a new dropping
        </p>
      </div>
    </div>
  );
}
