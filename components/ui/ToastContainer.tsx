'use client';

import Image from 'next/image';
import { useToast } from '@/contexts/ToastContext';

/**
 * Rendert actieve toast-meldingen rechtsonderin het scherm.
 * Toasts schuiven omhoog in met een bounce-animatie en verdwijnen automatisch.
 */
export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-label="Meldingen"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 250,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        maxWidth: 380,
        width: '100%',
        pointerEvents: 'none',
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            background: '#0a0a0a',
            color: '#fff',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            pointerEvents: 'auto',
            cursor: 'pointer',
            animation: 'toastSlideUp 0.45s cubic-bezier(0.22, 1, 0.36, 1)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
          }}
          onClick={() => removeToast(toast.id)}
          role="status"
        >
          {/* Product thumbnail */}
          {toast.productImage && (
            <div
              style={{
                width: 44,
                height: 52,
                background: '#222',
                flexShrink: 0,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <Image src={toast.productImage} alt="" fill className="object-cover" sizes="44px" />
            </div>
          )}

          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Icon + type label */}
            <p
              style={{
                fontSize: 10,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: toast.type === 'success' ? '#4CAF78' : '#c9a84c',
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              {toast.type === 'success' ? '✓' : '♥'}{' '}
              {toast.type === 'success' ? 'Toegevoegd' : 'Favorieten'}
            </p>
            {/* Meldingstekst */}
            <p style={{ fontSize: 13, lineHeight: 1.4, color: '#ddd' }}>{toast.message}</p>
          </div>

          {/* Sluitknop */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeToast(toast.id);
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#666',
              cursor: 'pointer',
              fontSize: 16,
              padding: 0,
              flexShrink: 0,
            }}
            aria-label="Sluit melding"
          >
            ✕
          </button>
        </div>
      ))}

      <style>{`
        @keyframes toastSlideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
