'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

type Props = {
  variant?: 'desktop' | 'mobile';
  onClose?: () => void;
  autoFocus?: boolean;
};

export function NavbarSearch({ variant = 'desktop', onClose, autoFocus = false }: Props) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setQuery('');
    router.push(`/shop?search=${encodeURIComponent(trimmed)}`);
    onClose?.();
  }

  if (variant === 'mobile') {
    return (
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid rgba(201,168,76,0.25)',
            background: 'rgba(201,168,76,0.03)',
            padding: '0 14px',
          }}
        >
          <span style={{ display: 'flex', color: '#c9a84c', opacity: 0.7 }}>
            <SearchIcon />
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Zoeken..."
            autoFocus={autoFocus}
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              outline: 'none',
              fontSize: 14,
              padding: '11px 10px',
              color: '#0a0a0a',
              fontFamily: 'var(--font-sans)',
            }}
          />
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid rgba(0,0,0,0.12)',
          background: 'rgba(0,0,0,0.02)',
          padding: '0 12px',
          width: 220,
          transition: 'border-color 0.2s, background 0.2s',
        }}
        onFocusCapture={() => {
          if (inputRef.current) {
            inputRef.current.parentElement!.style.borderColor = 'rgba(201,168,76,0.4)';
            inputRef.current.parentElement!.style.background = 'rgba(201,168,76,0.04)';
          }
        }}
        onBlurCapture={() => {
          if (inputRef.current) {
            inputRef.current.parentElement!.style.borderColor = 'rgba(0,0,0,0.12)';
            inputRef.current.parentElement!.style.background = 'rgba(0,0,0,0.02)';
          }
        }}
      >
        <span style={{ display: 'flex', color: '#999', flexShrink: 0 }}>
          <SearchIcon />
        </span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Zoeken..."
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            outline: 'none',
            fontSize: 13,
            padding: '8px 6px',
            color: '#0a0a0a',
            fontFamily: 'var(--font-sans)',
          }}
        />
      </div>
    </form>
  );
}
