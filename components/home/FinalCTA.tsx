import Link from 'next/link';
import { GeomPattern } from '@/components/ui/GeomPattern';

export function FinalCTA() {
  return (
    <section
      className="py-20 lg:py-24"
      style={{
        background: '#0a0a0a',
        paddingLeft: 'clamp(1.5rem, 5vw, 2.5rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 2.5rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GeomPattern dark />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p
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
        <h2
          className="font-display text-white"
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
        <p
          style={{
            fontSize: 'var(--text-base)',
            color: 'rgb(255, 255, 255)',
            maxWidth: 420,
            margin: '0 auto 44px',
          }}
        >
          Premium producten voor jouw islamitische lifestyle — met gratis verzending vanaf €50.
        </p>
        <Link
          href="/shop"
          className="inline-block hover:opacity-85 transition-opacity"
          style={{
            background: '#c9a84c',
            color: '#0a0a0a',
            fontSize: 'var(--text-xs)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 600,
            padding: '16px 36px',
          }}
        >
          Shop nu
        </Link>
      </div>
    </section>
  );
}
