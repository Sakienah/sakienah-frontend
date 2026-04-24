import { reviews } from '@/lib/data';

function Stars({ count }: { count: number }) {
  return (
    <span className="flex" style={{ gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="12" height="12" viewBox="0 0 20 20" style={{ fill: '#c9a84c' }}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export function SocialProof() {
  return (
    <section style={{ background: '#FAF7F2', padding: '96px 0' }}>
      <div className="max-w-[1280px] mx-auto" style={{ padding: '0 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <p
            style={{
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#c9a84c',
              fontWeight: 600,
              marginBottom: 14,
            }}
          >
            Reviews
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: 44,
              fontWeight: 600,
              color: '#0a0a0a',
              letterSpacing: '-0.02em',
              marginBottom: 16,
            }}
          >
            Wat klanten zeggen
          </h2>
          <div className="flex items-center justify-center" style={{ gap: 6 }}>
            <Stars count={5} />
            <span style={{ fontSize: 12, color: '#aaa', marginLeft: 6 }}>
              4.9 gemiddeld · 500+ reviews
            </span>
          </div>
        </div>

        <div
          style={{ marginTop: 52, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
        >
          {reviews.map(({ text, author, product, rating }) => (
            <div
              key={author}
              style={{
                background: '#fff',
                border: '1px solid rgba(201,168,76,0.15)',
                padding: '36px 32px',
              }}
            >
              <Stars count={rating} />
              <p
                className="font-display"
                style={{
                  fontSize: 16,
                  fontStyle: 'italic',
                  color: '#333',
                  lineHeight: 1.8,
                  margin: '18px 0 24px',
                }}
              >
                &ldquo;{text}&rdquo;
              </p>
              <div style={{ borderTop: '1px solid #F0EBE3', paddingTop: 18 }}>
                <p style={{ fontSize: 12, fontWeight: 600, color: '#0a0a0a' }}>{author}</p>
                <p
                  style={{ fontSize: 11, color: '#c9a84c', marginTop: 3, letterSpacing: '0.05em' }}
                >
                  {product}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
