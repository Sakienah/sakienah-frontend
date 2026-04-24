'use client';

import { useState, useEffect } from 'react';
import { useDiscountCode } from '@/hooks/useDiscountCode';

export default function GiftFloater() {
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { copied, copyCode: handleCopy } = useDiscountCode('SAKIENAH10');

  useEffect(() => {
    const mountTimer = setTimeout(() => setMounted(true), 0);
    const timer = setTimeout(() => setBubbleVisible(true), 1800);
    return () => {
      clearTimeout(mountTimer);
      clearTimeout(timer);
    };
  }, []);

  const handleGiftClick = () => {
    setShowCode(true);
    setBubbleVisible(true);
  };

  const handleClose = () => {
    setBubbleVisible(false);
    setTimeout(() => setShowCode(false), 300);
  };

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes gift-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(201,168,76,0.5), 0 8px 32px rgba(0,0,0,0.18); }
          50% { box-shadow: 0 0 0 10px rgba(201,168,76,0), 0 8px 32px rgba(0,0,0,0.18); }
        }
        @keyframes gift-bounce {
          0%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
          60% { transform: translateY(-3px); }
        }
        @keyframes bubble-in {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes bubble-out {
          from { opacity: 1; transform: translateY(0)   scale(1); }
          to   { opacity: 0; transform: translateY(10px) scale(0.95); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .gift-floater-btn {
          animation: gift-pulse 2.4s ease-in-out infinite, gift-bounce 3.2s ease-in-out infinite;
        }
        .gift-floater-btn:hover {
          animation: none;
          transform: scale(1.08);
          transition: transform 0.2s ease;
        }
        .bubble-enter { animation: bubble-in  0.28s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        .bubble-exit  { animation: bubble-out 0.22s ease-in forwards; }
        .code-shimmer {
          background: linear-gradient(90deg, #c9a84c 30%, #f0d080 50%, #c9a84c 70%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 2s linear infinite;
        }
      `}</style>

      <div
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
        style={{ fontFamily: 'var(--font-inter, DM Sans, sans-serif)' }}
      >
        {/* Bubble */}
        {bubbleVisible && (
          <div
            className={bubbleVisible ? 'bubble-enter' : 'bubble-exit'}
            style={{
              background: '#fff',
              border: '1.5px solid rgba(201,168,76,0.35)',
              borderRadius: '16px',
              boxShadow: '0 8px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(201,168,76,0.1)',
              padding: '14px 16px 14px 18px',
              maxWidth: '220px',
              position: 'relative',
            }}
          >
            {/* Tail */}
            <div
              style={{
                position: 'absolute',
                bottom: '-9px',
                right: '24px',
                width: '16px',
                height: '10px',
                overflow: 'visible',
              }}
            >
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                <path
                  d="M0 0 L8 10 L16 0"
                  fill="white"
                  stroke="rgba(201,168,76,0.35)"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path d="M1 0 L8 9 L15 0" fill="white" />
              </svg>
            </div>

            {/* Close */}
            <button
              onClick={handleClose}
              style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                border: 'none',
                background: 'rgba(0,0,0,0.06)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#888',
                fontSize: '11px',
                lineHeight: 1,
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.12)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.06)')}
              aria-label="Sluiten"
            >
              ✕
            </button>

            {!showCode ? (
              <div style={{ paddingRight: '16px' }}>
                <p
                  style={{
                    margin: 0,
                    fontSize: '13.5px',
                    lineHeight: '1.45',
                    color: '#2a2a2a',
                    fontWeight: 450,
                    letterSpacing: '0.01em',
                  }}
                >
                  Er wacht een <span style={{ color: '#c9a84c', fontWeight: 600 }}>cadeautje</span>{' '}
                  voor jou
                </p>
              </div>
            ) : (
              <div style={{ paddingRight: '16px' }}>
                <p
                  style={{
                    margin: '0 0 8px',
                    fontSize: '11.5px',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: '#888',
                    fontWeight: 500,
                  }}
                >
                  Jouw kortingscode
                </p>
                <button
                  onClick={handleCopy}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(201,168,76,0.08)',
                    border: '1.5px dashed rgba(201,168,76,0.6)',
                    borderRadius: '8px',
                    padding: '7px 12px',
                    cursor: 'pointer',
                    width: '100%',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(201,168,76,0.15)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(201,168,76,0.08)')}
                >
                  <span
                    className="code-shimmer"
                    style={{
                      fontSize: '15px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      fontFamily: 'var(--font-playfair, serif)',
                    }}
                  >
                    SAKIENAH10
                  </span>
                  <span
                    style={{
                      marginLeft: 'auto',
                      fontSize: '10px',
                      color: copied ? '#4caf87' : '#c9a84c',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      transition: 'color 0.2s',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {copied ? '✓ Gekopieerd' : 'Kopieer'}
                  </span>
                </button>
                <p
                  style={{
                    margin: '7px 0 0',
                    fontSize: '11px',
                    color: '#aaa',
                    lineHeight: 1.4,
                  }}
                >
                  10% korting op je eerste bestelling
                </p>
              </div>
            )}
          </div>
        )}

        {/* Gift button */}
        <button
          className="gift-floater-btn"
          onClick={handleGiftClick}
          aria-label="Bekijk jouw cadeau"
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            border: 'none',
            background: 'linear-gradient(135deg, #c9a84c 0%, #e8c96a 50%, #b8912e 100%)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            transition: 'transform 0.2s ease',
            position: 'relative',
          }}
        >
          {/* Inner ring accent */}
          <span
            style={{
              position: 'absolute',
              inset: '4px',
              borderRadius: '50%',
              border: '1px solid rgba(255,255,255,0.35)',
              pointerEvents: 'none',
            }}
          />
          🎁
        </button>
      </div>
    </>
  );
}
