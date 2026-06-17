'use client';

import { useState, useEffect } from 'react';
import { trustItems } from '@/lib/data';
import { Reveal } from '@/components/ui/Reveal';

const ARABIC = ['شحن', 'إرجاع', 'أمان', 'إسلام'];

const ICONS = [
  <svg
    key="truck"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <path d="M16 8h4l3 5v3h-7V8z" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>,
  <svg
    key="return"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 10h13a5 5 0 0 1 0 10H3" />
    <polyline points="7 6 3 10 7 14" />
  </svg>,
  <svg
    key="lock"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>,
  <svg
    key="star"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>,
];

function TrustItem({ label, sub, index }: { label: string; sub: string; index: number }) {
  return (
    <div
      style={{
        padding: 'clamp(14px, 4vw, 18px) clamp(16px, 5vw, 28px)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(10px, 3vw, 16px)',
        height: '100%',
      }}
    >
      {/* Number */}
      <span
        style={{
          position: 'absolute',
          top: 8,
          left: 12,
          fontFamily: 'var(--font-playfair)',
          fontSize: 'var(--text-xs)',
          color: '#c9a84c',
          opacity: 0.5,
          fontStyle: 'italic',
          letterSpacing: '0.05em',
        }}
      >
        0{index + 1}
      </span>

      {/* Arabic watermark */}
      <div
        style={{
          position: 'absolute',
          right: 'clamp(6px, 2vw, 10px)',
          top: '50%',
          transform: 'translateY(-50%)',
          fontFamily: 'var(--font-amiri)',
          fontSize: 'clamp(24px, 6vw, 38px)',
          direction: 'rtl',
          color: '#c9a84c',
          opacity: 0.1,
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 1,
        }}
      >
        {ARABIC[index]}
      </div>

      {/* Gold line bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 24,
          height: 1.5,
          background: 'linear-gradient(90deg, #c9a84c, rgba(201,168,76,0.2))',
        }}
      />

      {/* Icon */}
      <div
        style={{
          color: '#c9a84c',
          flexShrink: 0,
          opacity: 0.85,
        }}
      >
        {ICONS[index]}
      </div>

      <div>
        <div
          style={{
            fontFamily: 'var(--font-playfair)',
            fontSize: 'var(--text-sm)',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.9)',
            marginBottom: 3,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--text-xs)',
            color: '#c9a84c',
            opacity: 0.65,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          {sub}
        </div>
      </div>
    </div>
  );
}

export function TrustBar() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % trustItems.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <Reveal
      style={{
        background: '#0f0d0a',
        borderTop: '1px solid rgba(201,168,76,0.12)',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
        position: 'relative',
      }}
    >
      {/* Top gold gradient line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            'linear-gradient(90deg, transparent 0%, #c9a84c 20%, #c9a84c 80%, transparent 100%)',
          opacity: 0.35,
          zIndex: 1,
        }}
      />

      {/* ---- Mobile: auto-sliding carousel ---- */}
      <div
        className="md:hidden"
        style={{ overflow: 'hidden' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
      >
        <div
          style={{
            display: 'flex',
            transform: `translateX(-${current * 100}%)`,
            transition: 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        >
          {trustItems.map((item, i) => (
            <div key={item.label} style={{ minWidth: '100%', flexShrink: 0 }}>
              <TrustItem label={item.label} sub={item.sub} index={i} />
            </div>
          ))}
        </div>
      </div>

      {/* ---- Desktop: 4-column grid ---- */}
      <div className="hidden md:flex">
        {trustItems.map((item, i) => (
          <div
            key={item.label}
            style={{
              flex: 1,
              borderRight: i < trustItems.length - 1 ? '1px solid rgba(201,168,76,0.12)' : 'none',
            }}
          >
            <TrustItem label={item.label} sub={item.sub} index={i} />
          </div>
        ))}
      </div>
    </Reveal>
  );
}
