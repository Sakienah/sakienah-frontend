'use client';

import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.23, 1, 0.32, 1] as const;

const topGradient =
  'linear-gradient(180deg, rgba(10,8,4,0.55) 0%, rgba(10,8,4,0.15) 28%, transparent 50%)';

// Blends the video's left edge into the dark hero column instead of a hard cut
const seamGradient = 'linear-gradient(90deg, #0a0a0a 0%, rgba(10,10,10,0.5) 35%, transparent 100%)';

export function HeroVideo({
  fill = false,
  className,
}: {
  /** Fill the parent container edge-to-edge (desktop right column). */
  fill?: boolean;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  const mediaProps = {
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      display: 'block',
    },
  };

  return (
    <motion.div
      className={className}
      style={
        fill
          ? { position: 'absolute', inset: 0 }
          : { width: '100%', aspectRatio: '4 / 5', position: 'relative' }
      }
      initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: EASE }}
    >
      {reduceMotion ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/video/hero-poster.jpg" alt="Sakienah collectie" {...mediaProps} />
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/hero-poster.jpg"
          {...mediaProps}
        >
          <source src="/video/hero.webm" type="video/webm" />
        </video>
      )}

      {/* Soft dark vignette at the top so the navbar/headline area stays legible */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: topGradient,
          pointerEvents: 'none',
        }}
      />

      {fill && (
        <div
          aria-hidden
          className="hidden lg:block"
          style={{
            position: 'absolute',
            inset: 0,
            width: '18%',
            background: seamGradient,
            pointerEvents: 'none',
          }}
        />
      )}
    </motion.div>
  );
}
