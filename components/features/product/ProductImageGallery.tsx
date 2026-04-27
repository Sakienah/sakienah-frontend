'use client';

import { useState } from 'react';
import Image from 'next/image';

export function ProductImageGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
      {/* Grote foto */}
      <div
        style={{
          width: '100%',
          aspectRatio: '3/4',
          background: '#fff',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
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
          alt={name}
          fill
          className="object-contain"
          priority
          sizes="(max-width: 768px) 100vw, 44vw"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div style={{ display: 'flex', gap: 10 }}>
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
                transition: 'border-color 0.15s',
              }}
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
      )}
    </div>
  );
}
