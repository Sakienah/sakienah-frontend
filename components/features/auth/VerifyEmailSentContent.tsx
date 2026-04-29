'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AuthLayout } from './AuthLayout';
import { resendVerification } from '@/lib/api';

export function VerifyEmailSentContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';

  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleResend = async () => {
    if (!email) return;
    setLoading(true);
    setError('');
    try {
      await resendVerification(email);
      setDone(true);
    } catch {
      setError('Er ging iets mis. Probeer het later opnieuw.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Controleer je e-mail" arabicTitle="تحقق من بريدك" subtitle="Bijna klaar">
      <div className="text-center">
        <div className="text-5xl mb-6">✉️</div>

        <p className="font-sans text-[14px] text-[#555] leading-relaxed mb-3">
          We hebben een verificatielink gestuurd naar:
        </p>
        {email && (
          <p className="font-sans text-[14px] font-semibold text-[#0a0a0a] mb-6 break-all">
            {email}
          </p>
        )}
        <p className="font-sans text-[13px] text-[#888] leading-relaxed mb-8">
          Klik op de link in de e-mail om je account te activeren. Vergeet ook je spammap te
          controleren.
        </p>

        {done ? (
          <p className="font-sans text-[13px] text-[#2E7D32] font-semibold bg-[#F1F8E9] border border-[#C5E1A5] px-4 py-3 mb-6">
            Nieuwe verificatiemail verstuurd!
          </p>
        ) : (
          <div className="mb-6">
            <p className="font-sans text-[12px] text-[#aaa] mb-3">Geen e-mail ontvangen?</p>
            {error && <p className="font-sans text-[12px] text-[#C62828] mb-3">{error}</p>}
            <button
              onClick={handleResend}
              disabled={loading || !email}
              className="font-sans text-[11px] tracking-[0.15em] uppercase font-bold px-6 py-3 transition-all border border-[#c9a84c] text-[#c9a84c] hover:bg-[#c9a84c] hover:text-[#0a0a0a] disabled:opacity-50 disabled:cursor-wait"
            >
              {loading ? 'Versturen...' : 'Opnieuw versturen'}
            </button>
          </div>
        )}

        <div className="pt-5 border-t border-[#F0EBE3]">
          <Link
            href="/login"
            className="font-sans text-[13px] text-[#c9a84c] font-semibold hover:underline"
          >
            Terug naar inloggen
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
