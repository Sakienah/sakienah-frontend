'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getPaymentStatus, type PaymentStatusResponse } from '@/lib/api';

export default function PaymentPendingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('order');
  const [status, setStatus] = useState<PaymentStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [guestToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('sakienah_guest_token');
  });

  const checkStatus = useCallback(async () => {
    if (!orderId) return;
    try {
      const result = await getPaymentStatus(orderId, guestToken ?? undefined);
      setStatus(result);

      if (result.paymentStatus === 'PAID') {
        router.replace(`/payment/success?order=${orderId}`);
        return;
      }

      if (result.status === 'CANCELLED' || result.paymentStatus === 'FAILED') {
        router.replace(`/payment/failed?order=${orderId}`);
        return;
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Status kon niet worden opgehaald.');
    }
  }, [orderId, guestToken, router]);

  useEffect(() => {
    if (!orderId) return;

    // Polling is intentionally driven by setState; the status updates trigger redirects.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void checkStatus();
    const interval = setInterval(() => {
      void checkStatus();
    }, 3000);
    return () => clearInterval(interval);
  }, [orderId, checkStatus]);

  const expiresAt = status?.expiresAt ? new Date(status.expiresAt) : null;
  const now = new Date();
  const secondsLeft = expiresAt
    ? Math.max(0, Math.floor((expiresAt.getTime() - now.getTime()) / 1000))
    : 0;
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

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
          ⏳
        </div>
        <h1
          className="font-display text-[#0a0a0a]"
          style={{ fontSize: 28, fontWeight: 600, marginBottom: 12 }}
        >
          Betaling in behandeling
        </h1>
        <p className="text-[#777] text-sm leading-relaxed mb-8">
          We wachten op de bevestiging van je betaling. Sluit dit venster niet.
        </p>

        {expiresAt && (
          <div
            className="mb-8 py-4 px-6"
            style={{ background: '#FAF7F2', border: '1px solid #F0EBE3' }}
          >
            <p className="text-xs uppercase tracking-widest text-[#aaa] mb-2">Resterende tijd</p>
            <p className="font-display text-3xl text-[#c9a84c]" style={{ fontWeight: 600 }}>
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </p>
          </div>
        )}

        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

        <p className="text-[#aaa] text-xs mt-6">Ordernummer: {status?.orderNumber ?? '...'}</p>
      </div>
    </div>
  );
}
