import Link from 'next/link';
import { IslamicMandala } from './IslamicMandala';

export function FinalCTA() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: '#0a0a0a',
        padding: 'clamp(80px, 12vw, 120px) clamp(1.5rem, 5vw, 2.5rem)',
        textAlign: 'center',
      }}
    >
      {/* Islamic geometric mandala illustration */}
      <IslamicMandala />

      {/* Arabic watermark above text */}
      <div
        className="font-arabic select-none pointer-events-none relative z-10"
        style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          color: '#c9a84c',
          opacity: 0.15,
          direction: 'rtl',
          lineHeight: 1,
          marginBottom: 16,
        }}
      >
        سكينة
      </div>

      {/* Label */}
      <p
        className="relative z-10"
        style={{
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: '#c9a84c',
          fontWeight: 600,
          marginBottom: 20,
        }}
      >
        Klaar om te bestellen?
      </p>

      {/* Headline */}
      <h2
        className="font-display text-white relative z-10"
        style={{
          fontSize: 'var(--text-xl)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          marginBottom: 16,
          lineHeight: 1.15,
        }}
      >
        Ontdek onze volledige
        <br />
        <span style={{ color: '#c9a84c', fontStyle: 'italic' }}>collectie</span>
      </h2>

      {/* Subtitle */}
      <p
        className="relative z-10"
        style={{
          fontSize: 'var(--text-sm)',
          color: 'rgba(255,255,255,0.55)',
          maxWidth: 440,
          margin: '0 auto 40px',
          lineHeight: 1.75,
          fontWeight: 300,
        }}
      >
        Premium producten voor jouw islamitische lifestyle — met gratis verzending vanaf €50.
      </p>

      {/* CTA button */}
      <Link
        href="/shop"
        className="relative z-10 inline-block group overflow-hidden"
        style={{
          background: '#c9a84c',
          color: '#0a0a0a',
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          fontWeight: 700,
          padding: '18px 44px',
          boxShadow: '0 4px 24px rgba(201,168,76,0.25)',
        }}
      >
        <span className="relative z-10 flex items-center gap-3">
          Shop nu
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
        {/* Hover overlay */}
        <span
          className="absolute inset-0 transition-transform duration-300 -translate-x-full group-hover:translate-x-0"
          style={{ background: 'rgba(255,255,255,0.15)' }}
        />
      </Link>

      {/* Bottom trust line */}
      <div
        className="relative z-10 flex items-center justify-center flex-wrap mt-10"
        style={{ gap: 24 }}
      >
        {[
          { icon: '↗', text: 'Gratis verzending vanaf €50' },
          { icon: '↺', text: '30 dagen retour' },
          { icon: '✓', text: 'Veilig betalen' },
        ].map(({ icon, text }) => (
          <span
            key={text}
            className="flex items-center gap-2"
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.05em',
            }}
          >
            <span style={{ color: '#c9a84c', fontSize: 12 }}>{icon}</span>
            {text}
          </span>
        ))}
      </div>
    </section>
  );
}
