'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { retryPayment } from '@/lib/api';

export default function PaymentFailedPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order');
  const [guestToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('sakienah_guest_token');
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRetry() {
    if (!orderId) return;
    setLoading(true);
    setError(null);
    try {
      const session = await retryPayment(orderId, guestToken ?? undefined);
      window.location.href = session.checkoutUrl;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Opnieuw proberen mislukt.');
      setLoading(false);
    }
  }

  if (!orderId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <p className="text-[#777]">Geen order ID gevonden.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-6">
      <div
        className="bg-white border border-[#F0EBE3] p-10 md:p-14 max-w-md w-full text-center"
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}
      >
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: '#FAF7F2', fontSize: 28 }}
        >
          ✕
        </div>
        <h1
          className="font-display text-[#0a0a0a]"
          style={{ fontSize: 28, fontWeight: 600, marginBottom: 12 }}
        >
          Betaling mislukt
        </h1>
        <p className="text-[#777] text-sm leading-relaxed mb-8">
          Je betaling is niet voltooid. Geen zorgen, je bestelling is bewaard. Probeer het opnieuw.
        </p>

        <button
          onClick={handleRetry}
          disabled={loading}
          className="inline-block bg-[#0a0a0a] text-[#c9a84c] uppercase font-bold text-[11px] tracking-[0.18em] px-10 py-4 disabled:opacity-50"
        >
          {loading ? 'Laden...' : 'Opnieuw proberen'}
        </button>

        {error && <p className="text-red-500 text-sm mt-6">{error}</p>}
      </div>
    </div>
  );
}
