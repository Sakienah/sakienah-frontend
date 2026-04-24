import Link from 'next/link';
import { GeomPattern } from '@/components/ui/GeomPattern';

export function FinalCTA() {
  return (
    <section
      style={{
        background: '#0a0a0a',
        padding: '100px 40px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GeomPattern opacity={0.08} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p
          style={{
            fontSize: 10,
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
            fontSize: 52,
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
            fontSize: 15,
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
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            fontWeight: 700,
            padding: '18px 48px',
          }}
        >
          Shop nu
        </Link>
      </div>
    </section>
  );
}
