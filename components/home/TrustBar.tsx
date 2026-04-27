'use client';

import { useState } from 'react';
import { trustItems } from '@/lib/data';

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

export function TrustBar() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      style={{
        background: '#0f0d0a',
        borderTop: '1px solid rgba(201,168,76,0.12)',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
        display: 'flex',
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
        }}
      />

      {trustItems.map(({ label, sub }, i) => (
        <>
          {i > 0 && (
            <div
              key={`div-${i}`}
              style={{
                width: 1,
                alignSelf: 'stretch',
                background: 'rgba(201,168,76,0.12)',
                flexShrink: 0,
              }}
            />
          )}
          <div
            key={label}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              flex: 1,
              padding: '18px 28px',
              cursor: 'default',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            {/* Number */}
            <span
              style={{
                position: 'absolute',
                top: 8,
                left: 12,
                fontFamily: 'var(--font-playfair)',
                fontSize: 10,
                color: '#c9a84c',
                opacity: hovered === i ? 0.7 : 0.2,
                fontStyle: 'italic',
                transition: 'opacity 0.3s',
                letterSpacing: '0.05em',
              }}
            >
              0{i + 1}
            </span>

            {/* Arabic watermark */}
            <div
              style={{
                position: 'absolute',
                right: 10,
                top: '50%',
                transform: 'translateY(-50%)',
                fontFamily: 'var(--font-amiri)',
                fontSize: 38,
                direction: 'rtl',
                color: '#c9a84c',
                opacity: hovered === i ? 0.12 : 0.06,
                pointerEvents: 'none',
                userSelect: 'none',
                lineHeight: 1,
                transition: 'opacity 0.3s',
              }}
            >
              {ARABIC[i]}
            </div>

            {/* Animated bottom line */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: hovered === i ? '100%' : '0%',
                height: 1.5,
                background: 'linear-gradient(90deg, #c9a84c, rgba(201,168,76,0.2))',
                transition: 'width 0.4s ease',
              }}
            />

            {/* Icon */}
            <div
              style={{
                color: '#c9a84c',
                flexShrink: 0,
                opacity: hovered === i ? 1 : 0.5,
                transition: 'opacity 0.3s, transform 0.3s',
                transform: hovered === i ? 'translateY(-2px)' : 'translateY(0)',
              }}
            >
              {ICONS[i]}
            </div>

            <div>
              <div
                style={{
                  fontFamily: 'var(--font-playfair)',
                  fontSize: 13,
                  fontStyle: hovered === i ? 'italic' : 'normal',
                  fontWeight: 400,
                  color: hovered === i ? '#fff' : 'rgba(255,255,255,0.65)',
                  marginBottom: 3,
                  transition: 'all 0.3s',
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 10,
                  color: '#c9a84c',
                  opacity: hovered === i ? 0.75 : 0.3,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  transition: 'opacity 0.3s',
                }}
              >
                {sub}
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
