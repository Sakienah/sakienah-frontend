'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthLayout } from './AuthLayout';
import { useAuth } from '@/contexts/AuthContext';
import { verifyEmail } from '@/lib/api';

type Status = 'loading' | 'success' | 'error';

export function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { login } = useAuth();
  const [status, setStatus] = useState<Status>('loading');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');

    const run = token
      ? verifyEmail(token).then((user) => {
          login(user);
          setStatus('success');
          setTimeout(() => router.push('/account'), 2500);
        })
      : Promise.reject(new Error('Ongeldige verificatielink. Controleer de link in je e-mail.'));

    run.catch((err) => {
      setStatus('error');
      setErrorMsg(
        err instanceof Error ? err.message : 'Verificatie mislukt. De link is mogelijk verlopen.',
      );
    });
  }, [searchParams, login, router]);

  return (
    <AuthLayout title="E-mail bevestigen" arabicTitle="تأكيد البريد" subtitle="Verificatie">
      <div className="text-center">
        {status === 'loading' && (
          <>
            <div className="text-4xl mb-6 animate-pulse">⏳</div>
            <p className="font-sans text-[14px] text-[#555]">Je e-mailadres wordt bevestigd...</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="text-4xl mb-6">✅</div>
            <h2 className="font-display text-[22px] font-semibold text-[#0a0a0a] mb-3">
              E-mailadres bevestigd!
            </h2>
            <p className="font-sans text-[14px] text-[#555] mb-6">
              Welkom bij Sakienah. Je wordt automatisch doorgestuurd naar je account.
            </p>
            <Link
              href="/account"
              className="font-sans text-[11px] tracking-[0.18em] uppercase font-bold px-8 py-4 inline-block transition-all"
              style={{ background: '#0a0a0a', color: '#c9a84c' }}
            >
              Naar mijn account →
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="text-4xl mb-6">❌</div>
            <h2 className="font-display text-[22px] font-semibold text-[#0a0a0a] mb-3">
              Verificatie mislukt
            </h2>
            <p className="font-sans text-[13px] text-[#888] mb-8 leading-relaxed">{errorMsg}</p>
            <div className="flex flex-col gap-3">
              <Link
                href="/register"
                className="font-sans text-[11px] tracking-[0.18em] uppercase font-bold px-8 py-4 inline-block transition-all"
                style={{ background: '#0a0a0a', color: '#c9a84c' }}
              >
                Opnieuw registreren
              </Link>
              <Link
                href="/login"
                className="font-sans text-[13px] text-[#c9a84c] font-semibold hover:underline"
              >
                Inloggen
              </Link>
            </div>
          </>
        )}
      </div>
    </AuthLayout>
  );
}
