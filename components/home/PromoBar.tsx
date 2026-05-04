'use client';

import { useState, useEffect } from 'react';
import { GeomPattern } from '@/components/ui/GeomPattern';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function PromoBar() {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const code = 'SAKIENAH10';

  useEffect(() => {
    const key = 'sakienah_promo_deadline';
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(key);
    } catch {
      /* localStorage onbeschikbaar */
    }

    let deadline: number;
    if (stored) {
      deadline = parseInt(stored, 10);
      if (Date.now() >= deadline) {
        deadline = Date.now() + 24 * 60 * 60 * 1000;
        try {
          localStorage.setItem(key, String(deadline));
        } catch {
          /* negeren */
        }
      }
    } else {
      deadline = Date.now() + 24 * 60 * 60 * 1000;
      try {
        localStorage.setItem(key, String(deadline));
      } catch {
        /* negeren */
      }
    }

    function update() {
      const rem = Math.max(0, deadline - Date.now());
      if (rem <= 0) {
        setTimeLeft(null);
        return;
      }
      setTimeLeft({
        days: Math.floor(rem / (24 * 60 * 60 * 1000)),
        hours: Math.floor((rem % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)),
        minutes: Math.floor((rem % (60 * 60 * 1000)) / (60 * 1000)),
        seconds: Math.floor((rem % (60 * 1000)) / 1000),
      });
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  function handleCopy() {
    navigator.clipboard.writeText(code).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      },
      () => {
        /* clipboard niet beschikbaar */
      },
    );
  }

  const urgent = timeLeft !== null && timeLeft.hours < 1 && timeLeft.days === 0;

  const timerDisplay = timeLeft
    ? `${String(timeLeft.hours + timeLeft.days * 24).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`
    : null;

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: '#ffffff6f',
        padding: 'clamp(14px, 3vw, 22px) clamp(1rem, 5vw, 2.5rem)',
      }}
    >
      <GeomPattern opacity={0.15} />

      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: 1,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(10,10,10,0.12) 25%, rgba(10,10,10,0.12) 75%, transparent 100%)',
        }}
      />

      <span
        className="font-arabic select-none pointer-events-none absolute hidden md:block"
        style={{
          right: 50,
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(4rem, 10vw, 8rem)',
          color: 'rgba(10,10,10,0.035)',
          lineHeight: 1,
          direction: 'rtl',
        }}
      >
        هدية
      </span>
      <span
        className="font-arabic select-none pointer-events-none absolute hidden md:block"
        style={{
          left: 50,
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(4rem, 10vw, 8rem)',
          color: 'rgba(10,10,10,0.035)',
          lineHeight: 1,
          direction: 'rtl',
        }}
      >
        هدية
      </span>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes pulse-gold {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        .promo-container {
          position: relative;
          overflow: hidden;
        }
        .promo-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.12), transparent);
          animation: shimmer 3s ease-in-out infinite;
          pointer-events: none;
        }
        .promo-urgent {
          animation: pulse-gold 1s ease-in-out infinite;
          color: #c9a84c !important;
        }
        .promo-code-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 20px rgba(201,168,76,0.4);
        }
        .promo-code-btn:active {
          transform: scale(0.98);
        }
      `}</style>

      <div className="max-w-[1280px] mx-auto relative z-10 flex justify-center">
        <div
          className="promo-container inline-flex items-center"
          style={{
            background: '#0a0a0a',
            border: '1px solid rgba(201,168,76,0.25)',
            padding: 'clamp(12px, 2.5vw, 18px) clamp(28px, 5vw, 48px)',
            gap: 'clamp(12px, 1.8vw, 22px)',
          }}
        >
          {!revealed ? (
            <div key="initial">
              <button
                onClick={() => setRevealed(true)}
                className="flex items-center justify-center flex-wrap bg-transparent border-none cursor-pointer text-inherit"
                style={{ gap: 'clamp(10px, 1.5vw, 18px)', fontFamily: 'inherit' }}
              >
                <span
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'rgba(201,168,76,0.1)',
                    border: '1px solid rgba(201,168,76,0.25)',
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c9a84c"
                    strokeWidth="1.5"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </span>

                <span
                  className="text-gold font-semibold text-center whitespace-nowrap"
                  style={{
                    fontSize: 'clamp(12px, 1.5vw, 14px)',
                    letterSpacing: '0.04em',
                    fontWeight: 600,
                  }}
                >
                  Ontvang 10% korting op je eerste bestelling
                </span>

                {timerDisplay && (
                  <>
                    <span
                      className="flex-shrink-0 w-px h-5"
                      style={{ background: 'rgba(201,168,76,0.2)' }}
                    />

                    <span
                      className={`flex items-center gap-1.5 ${urgent ? 'promo-urgent' : ''}`}
                      style={{
                        fontSize: 'clamp(12px, 1.3vw, 14px)',
                        color: 'rgba(255,255,255,0.6)',
                        letterSpacing: '0.06em',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                      {timerDisplay}
                    </span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div
              key="revealed"
              className="flex items-center justify-center flex-wrap"
              style={{ gap: 'clamp(10px, 1.5vw, 18px)' }}
            >
              <span
                className="text-white/70 whitespace-nowrap"
                style={{
                  fontSize: 'clamp(11px, 1.2vw, 13px)',
                  letterSpacing: '0.04em',
                }}
              >
                Jouw code:
              </span>

              <button
                onClick={handleCopy}
                className="promo-code-btn border-none cursor-pointer whitespace-nowrap font-mono font-bold"
                style={{
                  background: '#c9a84c',
                  padding: '10px 24px',
                  fontSize: 'clamp(15px, 1.8vw, 18px)',
                  color: '#0a0a0a',
                  letterSpacing: '0.14em',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  borderRadius: 4,
                }}
              >
                {copied ? (
                  <span className="flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Gekopieerd!
                  </span>
                ) : (
                  code
                )}
              </button>

              {timerDisplay && (
                <>
                  <span
                    className="flex-shrink-0 w-px h-5"
                    style={{ background: 'rgba(201,168,76,0.2)' }}
                  />

                  <span
                    className={`flex items-center gap-1.5 ${urgent ? 'promo-urgent' : ''}`}
                    style={{
                      fontSize: 'clamp(12px, 1.3vw, 14px)',
                      color: 'rgba(255,255,255,0.6)',
                      letterSpacing: '0.06em',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    {timerDisplay}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: 1,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(10,10,10,0.12) 25%, rgba(10,10,10,0.12) 75%, transparent 100%)',
        }}
      />
    </section>
  );
}
