'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { reviews } from '@/lib/data';
import { GeomPattern } from '@/components/ui/GeomPattern';

function Stars({ count = 5 }: { count?: number }) {
  return (
    <span style={{ display: 'flex', gap: 3 }}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 20 20" fill="#c9a84c">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

export function SocialProof() {
  const [active, setActive] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = reviews.length;

  const go = useCallback(
    (idx: number) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setActive(idx);
        setAnimKey((k) => k + 1);
        setAnimating(false);
      }, 260);
    },
    [animating],
  );

  const next = useCallback(() => go((active + 1) % total), [active, go, total]);
  const prev = useCallback(() => go((active - 1 + total) % total), [active, go, total]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((a) => {
        const n = (a + 1) % total;
        setAnimKey((k) => k + 1);
        return n;
      });
    }, 5000);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((a) => {
        setAnimKey((k) => k + 1);
        return (a + 1) % total;
      });
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [total]);

  const r = reviews[active];
  const leftR = reviews[(active - 1 + total) % total];
  const rightR = reviews[(active + 1) % total];
  const initials = r.author
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <section
      style={{
        background: '#FAF7F2',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GeomPattern />
      <style>{`
        @keyframes revIn  { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes revOut { from { opacity: 1; transform: translateY(0); }    to { opacity: 0; transform: translateY(-14px); } }
        .rev-enter { animation: revIn 0.42s cubic-bezier(0.22,1,0.36,1) forwards; }
        .rev-dot { width: 6px; height: 6px; border-radius: 3px; background: rgba(201,168,76,0.3); cursor: pointer; transition: width 0.3s, background 0.3s; }
        .rev-dot.is-active { width: 24px; background: #c9a84c; }
        .rev-arrow { width: 48px; height: 48px; border: 1px solid rgba(201,168,76,0.3); background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; color: rgba(201,168,76,0.7); font-size: 18px; transition: border-color 0.2s, color 0.2s, background 0.2s; }
        .rev-arrow:hover { border-color: #c9a84c; color: #c9a84c; background: rgba(201,168,76,0.08); }
        .rev-sidecard { background: #fff; border: 1px solid rgba(201,168,76,0.15); padding: 28px 24px; transition: opacity 0.3s, border-color 0.2s; }
        .rev-sidecard:hover { border-color: rgba(201,168,76,0.3); }
      `}</style>

      {/* Ambient glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 600,
          height: 400,
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '0 40px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p
            style={{
              fontSize: 10,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#c9a84c',
              fontWeight: 600,
              marginBottom: 14,
            }}
          >
            Klantervaringen
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: 44,
              fontWeight: 600,
              color: '#0a0a0a',
              letterSpacing: '-0.02em',
              marginBottom: 18,
            }}
          >
            Wat onze klanten zeggen
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Stars count={5} />
            <span style={{ fontSize: 12, color: '#aaa', marginLeft: 4 }}>
              4.9 gemiddeld · 500+ reviews
            </span>
          </div>
        </div>

        {/* Layout: side | featured | side */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr 1fr',
            gap: 24,
            alignItems: 'center',
          }}
        >
          {/* Left side card */}
          <div className="rev-sidecard" style={{ opacity: animating ? 0.3 : 0.65 }}>
            <Stars count={leftR.rating} />
            <p
              className="font-display"
              style={{
                fontSize: 14,
                fontStyle: 'italic',
                color: '#777',
                lineHeight: 1.75,
                margin: '14px 0 18px',
              }}
            >
              &ldquo;{leftR.text}&rdquo;
            </p>
            <p style={{ fontSize: 11, color: '#c9a84c', fontWeight: 600 }}>{leftR.author}</p>
          </div>

          {/* Center featured card */}
          <div
            style={{
              position: 'relative',
              textAlign: 'center',
              padding: '52px 48px',
              border: '1px solid rgba(201,168,76,0.22)',
              background: '#fff',
              minHeight: 340,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 40px rgba(201,168,76,0.08)',
            }}
          >
            {/* Corner brackets */}
            <div
              style={{
                position: 'absolute',
                top: 10,
                left: 10,
                width: 16,
                height: 16,
                borderTop: '1px solid rgba(201,168,76,0.5)',
                borderLeft: '1px solid rgba(201,168,76,0.5)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                width: 16,
                height: 16,
                borderTop: '1px solid rgba(201,168,76,0.5)',
                borderRight: '1px solid rgba(201,168,76,0.5)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                left: 10,
                width: 16,
                height: 16,
                borderBottom: '1px solid rgba(201,168,76,0.5)',
                borderLeft: '1px solid rgba(201,168,76,0.5)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                right: 10,
                width: 16,
                height: 16,
                borderBottom: '1px solid rgba(201,168,76,0.5)',
                borderRight: '1px solid rgba(201,168,76,0.5)',
              }}
            />

            {/* Decorative quote mark */}
            <div
              className="font-display select-none"
              style={{
                position: 'absolute',
                top: 18,
                left: 28,
                fontSize: 100,
                color: 'rgba(201,168,76,0.12)',
                lineHeight: 1,
              }}
            >
              &ldquo;
            </div>

            <div
              key={animKey}
              className="rev-enter"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: 4, marginBottom: 28, justifyContent: 'center' }}>
                <Stars count={r.rating} />
              </div>

              {/* Quote */}
              <p
                className="font-display"
                style={{
                  fontSize: 21,
                  fontStyle: 'italic',
                  color: '#222',
                  lineHeight: 1.75,
                  marginBottom: 36,
                  maxWidth: 440,
                }}
              >
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Ornamental divider */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 1,
                    background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5))',
                  }}
                />
                <div
                  style={{
                    width: 5,
                    height: 5,
                    background: '#c9a84c',
                    opacity: 0.6,
                    transform: 'rotate(45deg)',
                  }}
                />
                <div
                  style={{
                    width: 32,
                    height: 1,
                    background: 'linear-gradient(90deg, rgba(201,168,76,0.5), transparent)',
                  }}
                />
              </div>

              {/* Avatar + name */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div
                  className="font-display"
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: 'rgba(201,168,76,0.12)',
                    border: '1px solid rgba(201,168,76,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    color: '#c9a84c',
                    fontWeight: 600,
                  }}
                >
                  {initials}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#0a0a0a',
                    letterSpacing: '0.04em',
                  }}
                >
                  {r.author}
                </p>
                <p
                  style={{
                    fontSize: 10,
                    color: 'rgba(201,168,76,0.7)',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  {r.product}
                </p>
              </div>
            </div>
          </div>

          {/* Right side card */}
          <div className="rev-sidecard" style={{ opacity: animating ? 0.3 : 0.65 }}>
            <Stars count={rightR.rating} />
            <p
              className="font-display"
              style={{
                fontSize: 14,
                fontStyle: 'italic',
                color: '#777',
                lineHeight: 1.75,
                margin: '14px 0 18px',
              }}
            >
              &ldquo;{rightR.text}&rdquo;
            </p>
            <p style={{ fontSize: 11, color: '#c9a84c', fontWeight: 600 }}>{rightR.author}</p>
          </div>
        </div>

        {/* Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            marginTop: 48,
          }}
        >
          <button
            className="rev-arrow"
            onClick={() => {
              prev();
              resetTimer();
            }}
            aria-label="Vorige review"
          >
            ←
          </button>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {reviews.map((_, i) => (
              <div
                key={i}
                className={`rev-dot${i === active ? ' is-active' : ''}`}
                onClick={() => {
                  go(i);
                  resetTimer();
                }}
              />
            ))}
          </div>
          <button
            className="rev-arrow"
            onClick={() => {
              next();
              resetTimer();
            }}
            aria-label="Volgende review"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
