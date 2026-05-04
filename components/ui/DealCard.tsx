'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Deal countdown timer — toont een real-time countdown onder de productafbeelding.
 * Elk product met comparePrice krijgt een 24-uurs countdown vanaf het eerste bezoek.
 * De deadline wordt per product opgeslagen in localStorage voor persistentie.
 */
export function DealTimer({ productId }: { productId: string }) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [expired, setExpired] = useState(false);

  const getDeadline = useCallback(() => {
    try {
      const key = `sakienah_deal_${productId}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        const deadline = parseInt(stored, 10);
        if (Date.now() < deadline) return deadline;
        // Deadline verlopen — genereer nieuwe
        const next = Date.now() + 24 * 60 * 60 * 1000;
        localStorage.setItem(key, String(next));
        return next;
      }
      // Eerste bezoek: zet 24u deadline
      const deadline = Date.now() + 24 * 60 * 60 * 1000;
      localStorage.setItem(key, String(deadline));
      return deadline;
    } catch {
      // localStorage onbeschikbaar — fallback naar 24h in memory
      return Date.now() + 24 * 60 * 60 * 1000;
    }
  }, [productId]);

  useEffect(() => {
    const deadline = getDeadline();

    function update() {
      const remaining = Math.max(0, deadline - Date.now());
      if (remaining <= 0) {
        setExpired(true);
        setTimeLeft(null);
        return;
      }
      setTimeLeft({
        days: Math.floor(remaining / (24 * 60 * 60 * 1000)),
        hours: Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)),
        minutes: Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000)),
        seconds: Math.floor((remaining % (60 * 1000)) / 1000),
      });
    }

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [getDeadline]);

  if (expired || !timeLeft) return null;

  return (
    <div
      className="flex flex-col items-center bg-gold"
      style={{
        padding: '6px 10px',
        gap: 3,
      }}
    >
      <p
        className="uppercase font-bold"
        style={{
          fontSize: 8,
          letterSpacing: '0.1em',
          color: '#0a0a0a',
          margin: 0,
        }}
      >
        🔥 Deal eindigt in:
      </p>
      <div
        className="flex items-center font-bold"
        style={{
          gap: 1,
          fontSize: 16,
          color: '#0a0a0a',
        }}
      >
        {String(timeLeft.days).padStart(2, '0')}
        <span className="opacity-70" style={{ fontSize: 8 }}>
          d
        </span>
        <span style={{ fontSize: 14, margin: '0 1px' }}>:</span>
        {String(timeLeft.hours).padStart(2, '0')}
        <span className="opacity-70" style={{ fontSize: 8 }}>
          u
        </span>
        <span style={{ fontSize: 14, margin: '0 1px' }}>:</span>
        {String(timeLeft.minutes).padStart(2, '0')}
        <span className="opacity-70" style={{ fontSize: 8 }}>
          m
        </span>
        <span style={{ fontSize: 14, margin: '0 1px' }}>:</span>
        {String(timeLeft.seconds).padStart(2, '0')}
        <span className="opacity-70" style={{ fontSize: 8 }}>
          s
        </span>
      </div>
    </div>
  );
}
