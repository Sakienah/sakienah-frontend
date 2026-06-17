import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

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
      {/* Background photo with a dark layer for legibility, same approach as the mobile hero */}
      <div aria-hidden style={{ position: 'absolute', inset: 0 }}>
        <Image
          src="/images/products/finalcta.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(10,8,4,0.7) 0%, rgba(10,8,4,0.6) 40%, rgba(10,8,4,0.78) 100%)',
          }}
        />
      </div>

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

      <Reveal>
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
        <Button href="/shop" variant="primary" className="relative z-10">
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
        </Button>
      </Reveal>

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
