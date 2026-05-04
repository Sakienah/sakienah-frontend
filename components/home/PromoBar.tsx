'use client';

import { useState, useEffect } from 'react';
import { GeomPattern } from '@/components/ui/GeomPattern';

/**
 * Tijdseenheden voor de countdown-timer.
 */
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Promotiebalk met 24-uurs countdown, gradient shimmer animatie,
 * en interactieve kortingscode-reveal.
 *
 * Goud achtergrond (Mekka-stijl) met zwarte container die een subtiele
 * goud-gradient overlay + shimmer sweep animatie heeft.
 * De countdown geeft urgentie: bij <1 uur pulseert de timer in warm amber.
 */
export function PromoBar() {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const code = 'SAKIENAH10';

  /** 24-uurs countdown — deadline opgeslagen in localStorage (zelfde patroon als DealCard). */
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

  /** Timer weergave als HH:MM:SS string. */
  const timerDisplay = timeLeft
    ? `${String(timeLeft.hours + timeLeft.days * 24).padStart(2, '0')}:${String(timeLeft.minutes).padStart(2, '0')}:${String(timeLeft.seconds).padStart(2, '0')}`
    : null;

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: '#c9a84c',
        padding: 'clamp(14px, 3vw, 22px) clamp(1rem, 5vw, 2.5rem)',
      }}
    >
      {/* Zellij-patroon als subtiele textuur */}
      <GeomPattern opacity={0.15} />

      {/* Gouden top border ornament */}
      <div
        className="absolute top-0 left-0 right-0"
        style={{
          height: 1,
          background:
            'linear-gradient(90deg, transparent 0%, rgba(10,10,10,0.12) 25%, rgba(10,10,10,0.12) 75%, transparent 100%)',
        }}
      />

      {/* Arabic watermarks — مكة links en rechts */}
      <span
        className="font-arabic select-none pointer-events-none absolute hidden md:block"
        style={{
          right: -20,
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(4rem, 10vw, 8rem)',
          color: 'rgba(10,10,10,0.035)',
          lineHeight: 1,
          direction: 'rtl',
        }}
      >
        مكة
      </span>
      <span
        className="font-arabic select-none pointer-events-none absolute hidden md:block"
        style={{
          left: -20,
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(4rem, 10vw, 8rem)',
          color: 'rgba(10,10,10,0.035)',
          lineHeight: 1,
          direction: 'rtl',
        }}
      >
        مكة
      </span>

      <div className="max-w-[1280px] mx-auto relative z-10 flex justify-center">
        {/* Zwarte container met gradient overlay + shimmer sweep */}
        <div
          className="promo-container promo-gradient inline-flex items-center"
          style={{
            border: '1px solid rgba(201,168,76,0.2)',
            padding: 'clamp(10px, 2vw, 14px) clamp(20px, 4vw, 36px)',
          }}
        >
          {!revealed ? (
            /* Initieel: promo-tekst met countdown inline */
            <div key="initial">
              <button
                onClick={() => setRevealed(true)}
                className="flex items-center justify-center flex-wrap bg-transparent border-none cursor-pointer p-0 text-inherit"
                style={{
                  gap: 'clamp(8px, 1.2vw, 14px)',
                  fontFamily: 'inherit',
                }}
              >
                <span className="flex-shrink-0" style={{ fontSize: 18 }}>
                  🕋
                </span>

                <span
                  className="text-gold font-semibold text-center whitespace-nowrap font-display"
                  style={{
                    fontSize: 'clamp(12px, 1.5vw, 14px)',
                    letterSpacing: '0.06em',
                  }}
                >
                  Ontvang 10% korting op je eerste bestelling
                </span>

                {timerDisplay && (
                  <>
                    {/* Dunne gouden divider */}
                    <span
                      className="flex-shrink-0"
                      style={{
                        width: 1,
                        height: 16,
                        background: 'rgba(201,168,76,0.2)',
                      }}
                    />

                    <span
                      className={
                        urgent
                          ? 'promo-urgent font-mono font-medium whitespace-nowrap'
                          : 'font-mono font-medium whitespace-nowrap'
                      }
                      style={{
                        fontSize: 'clamp(12px, 1.2vw, 13px)',
                        color: 'rgba(255,255,255,0.7)',
                        letterSpacing: '0.05em',
                        transition: 'color 0.3s',
                      }}
                    >
                      {timerDisplay}
                    </span>
                  </>
                )}

                <span
                  className="flex-shrink-0 font-semibold"
                  style={{
                    fontSize: 14,
                    color: 'rgba(201,168,76,0.5)',
                    transition: 'transform 0.2s',
                  }}
                >
                  →
                </span>
              </button>
            </div>
          ) : (
            /* Onthuld: code met kopieer-knop + timer */
            <div
              key="revealed"
              className="promo-reveal flex items-center justify-center flex-wrap"
              style={{
                gap: 'clamp(8px, 1.2vw, 16px)',
              }}
            >
              <span
                className="text-white font-medium whitespace-nowrap"
                style={{
                  fontSize: 'clamp(11px, 1.2vw, 13px)',
                  letterSpacing: '0.04em',
                  opacity: 0.9,
                }}
              >
                Gebruik code
              </span>

              <button
                onClick={handleCopy}
                className="border-none cursor-pointer whitespace-nowrap font-mono font-bold hover:scale-105"
                style={{
                  background: '#c9a84c',
                  padding: '8px 20px',
                  fontSize: 'clamp(14px, 1.6vw, 16px)',
                  color: '#0a0a0a',
                  letterSpacing: '0.12em',
                  transition: 'transform 0.2s, background 0.2s',
                }}
              >
                {copied ? '✓ Gekopieerd!' : code}
              </button>

              <span
                className="whitespace-nowrap"
                style={{
                  fontSize: 'clamp(10px, 1.1vw, 11px)',
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                bij het afrekenen
              </span>

              {timerDisplay && (
                <>
                  <span
                    className="flex-shrink-0"
                    style={{
                      width: 1,
                      height: 16,
                      background: 'rgba(201,168,76,0.2)',
                    }}
                  />

                  <span
                    className={
                      urgent
                        ? 'promo-urgent font-mono font-medium whitespace-nowrap'
                        : 'font-mono font-medium whitespace-nowrap'
                    }
                    style={{
                      fontSize: 'clamp(12px, 1.2vw, 13px)',
                      color: 'rgba(255,255,255,0.7)',
                      letterSpacing: '0.05em',
                      transition: 'color 0.3s',
                    }}
                  >
                    {timerDisplay}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Gouden onderkant ornament */}
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
