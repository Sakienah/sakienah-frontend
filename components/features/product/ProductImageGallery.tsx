'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

/**
 * Productafbeeldingsgalerij met ondersteuning voor:
 * - Keyboard navigatie (← → pijltjestoetsen)
 * - Thumbnail-selectie (desktop) en dot-indicatoren (mobile)
 * - Responsieve layout
 * - Gouden markering op de actieve afbeelding
 */
export function ProductImageGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  /** Keyboard navigatie — links/rechts door de afbeeldingen */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setActive((i) => (i > 0 ? i - 1 : images.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setActive((i) => (i < images.length - 1 ? i + 1 : 0));
      }
    },
    [images.length],
  );
  if (images.length === 0) {
    return (
      <div
        style={{
          aspectRatio: '3/4',
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ color: '#ccc', fontSize: 14 }}>Geen foto beschikbaar</span>
      </div>
    );
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-label={`Afbeeldingengalerij voor ${name}`}
      aria-roledescription="carousel"
    >
      {/* Grote hoofdafbeelding */}
      <div
        style={{
          width: '100%',
          aspectRatio: '3/4',
          background: '#fff',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Decoratieve gouden kaderrand */}
        <div
          style={{
            position: 'absolute',
            inset: 20,
            border: '1px solid rgba(201,168,76,0.2)',
            zIndex: 10,
            pointerEvents: 'none',
          }}
        />
        <Image
          src={images[active]}
          alt={`${name} — afbeelding ${active + 1} van ${images.length}`}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, 44vw"
        />

        {/* Navigatiepijlen bij meerdere afbeeldingen */}
        {images.length > 1 && (
          <>
            <button
              onClick={() => setActive((i) => (i > 0 ? i - 1 : images.length - 1))}
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.9)',
                border: '1px solid #F0EBE3',
                cursor: 'pointer',
                width: 36,
                height: 36,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                color: '#555',
                zIndex: 15,
                transition: 'all 0.2s',
              }}
              className="hover:bg-[#c9a84c] hover:text-white hover:border-[#c9a84c]"
              aria-label="Vorige afbeelding"
            >
              ←
            </button>
            <button
              onClick={() => setActive((i) => (i < images.length - 1 ? i + 1 : 0))}
              style={{
                position: 'absolute',
                right: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.9)',
                border: '1px solid #F0EBE3',
                cursor: 'pointer',
                width: 36,
                height: 36,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 14,
                color: '#555',
                zIndex: 15,
                transition: 'all 0.2s',
              }}
              className="hover:bg-[#c9a84c] hover:text-white hover:border-[#c9a84c]"
              aria-label="Volgende afbeelding"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Thumbnails op desktop, dot-indicatoren op mobile */}
      {images.length > 1 && (
        <>
          {/* Desktop: thumbnail-strip */}
          <div className="hidden md:flex" style={{ gap: 10 }}>
            {images.map((src, i) => (
              <button
                key={src}
                onClick={() => setActive(i)}
                style={{
                  width: 80,
                  height: 80,
                  flexShrink: 0,
                  padding: 0,
                  border: `2px solid ${i === active ? '#c9a84c' : '#E8E0D5'}`,
                  background: '#fff',
                  overflow: 'hidden',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s, transform 0.15s',
                }}
                className="hover:scale-105"
                aria-label={`Afbeelding ${i + 1}`}
              >
                <Image
                  src={src}
                  alt={`${name} foto ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>

          {/* Mobile: dot-indicatoren */}
          <div className="flex md:hidden" style={{ gap: 10 }}>
            {images.map((src, i) => (
              <button
                key={src}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === active ? '#c9a84c' : '#E8E0D5',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'all 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                aria-label={`Afbeelding ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
