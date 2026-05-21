export function HeroSkeleton() {
  return (
    <section className="hero-section">
      <div className="hero-left bg-[#0a0a0a]">
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
          <div
            className="skeleton-shimmer"
            style={{
              height: 10,
              width: 180,
              marginBottom: 20,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
          <div
            className="skeleton-shimmer"
            style={{
              height: 48,
              width: '80%',
              marginBottom: 8,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
          <div
            className="skeleton-shimmer"
            style={{
              height: 48,
              width: '70%',
              marginBottom: 32,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
          <div
            className="skeleton-shimmer"
            style={{
              height: 14,
              width: '90%',
              marginBottom: 6,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
          <div
            className="skeleton-shimmer"
            style={{
              height: 14,
              width: '75%',
              marginBottom: 44,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          />
          <div
            style={{ display: 'flex', gap: 12, justifyContent: 'center' }}
            className="lg:justify-start"
          >
            <div className="skeleton-shimmer" style={{ height: 54, width: 160 }} />
            <div className="skeleton-shimmer" style={{ height: 54, width: 140 }} />
          </div>
        </div>
      </div>
      <div className="hero-right bg-[#FAF7F2]">
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
          className="skeleton-shimmer"
          style={{ width: '80%', aspectRatio: '3/4', maxWidth: 380 }}
        />
      </div>
    </section>
  );
}
