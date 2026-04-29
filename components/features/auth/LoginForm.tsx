'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthLayout } from './AuthLayout';
import { useAuth } from '@/contexts/AuthContext';
import { loginUser, resendVerification } from '@/lib/api';

const inputClass =
  'w-full bg-[#FAF7F2] border border-[#E8E0D5] text-[#0a0a0a] text-sm px-4 py-3.5 outline-none focus:border-[#c9a84c] transition-colors placeholder:text-[#bbb]';
const labelClass = 'block font-sans text-[10px] tracking-[0.13em] uppercase text-[#888] mb-2';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', wachtwoord: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [notVerified, setNotVerified] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendDone, setResendDone] = useState(false);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.wachtwoord) {
      setError('Vul alle velden in.');
      return;
    }
    setLoading(true);
    setError('');
    setNotVerified(false);
    try {
      const user = await loginUser(form.email, form.wachtwoord);
      login(user);
      router.push(searchParams.get('from') ?? '/account');
    } catch (err) {
      const msg = err instanceof Error ? err.message : '';
      if (msg.includes('EMAIL_NOT_VERIFIED')) {
        setNotVerified(true);
      } else {
        setError(msg || 'Inloggen mislukt.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    try {
      await resendVerification(form.email);
      setResendDone(true);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <AuthLayout title="Inloggen" arabicTitle="مرحباً بك" subtitle="Jouw account">
      {notVerified && (
        <div className="bg-[#FFF8E1] border border-[#FFD54F] px-4 py-4 font-sans text-[13px] text-[#7B5800] mb-5">
          <p className="mb-2 font-semibold">Je e-mailadres is nog niet bevestigd.</p>
          <p className="mb-3 text-[12px]">
            Controleer je inbox (en spammap) voor de verificatielink.
          </p>
          {resendDone ? (
            <p className="text-[12px] text-[#2E7D32] font-semibold">
              Nieuwe verificatiemail verstuurd!
            </p>
          ) : (
            <button
              onClick={handleResend}
              disabled={resendLoading || !form.email}
              className="font-sans text-[11px] tracking-[0.12em] uppercase font-bold px-4 py-2 transition-all disabled:opacity-50"
              style={{ background: '#c9a84c', color: '#0a0a0a' }}
            >
              {resendLoading ? 'Versturen...' : 'Verificatiemail opnieuw sturen'}
            </button>
          )}
        </div>
      )}
      {error && (
        <div className="bg-[#FFF3F3] border border-[#FCCACA] px-4 py-3 font-sans text-[13px] text-[#C62828] mb-5 text-center">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>E-mailadres</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            required
            placeholder="jouw@email.nl"
            className={inputClass}
          />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <label className={labelClass.replace('mb-2', '')}>Wachtwoord</label>
            <Link
              href="/forgot-password"
              className="font-sans text-[11px] text-[#c9a84c] hover:underline"
            >
              Vergeten?
            </Link>
          </div>
          <input
            type="password"
            value={form.wachtwoord}
            onChange={(e) => set('wachtwoord', e.target.value)}
            required
            placeholder="••••••••"
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full font-sans text-[11px] tracking-[0.18em] uppercase font-bold py-4 mt-2 transition-all disabled:cursor-wait"
          style={{
            background: loading ? '#c9a84c' : '#0a0a0a',
            color: loading ? '#0a0a0a' : '#c9a84c',
          }}
        >
          {loading ? 'Inloggen...' : 'Inloggen →'}
        </button>
      </form>
      <div className="text-center mt-7 pt-6 border-t border-[#F0EBE3]">
        <span className="font-sans text-[13px] text-[#aaa]">Nog geen account? </span>
        <Link
          href="/register"
          className="font-sans text-[13px] text-[#c9a84c] font-semibold hover:underline"
        >
          Registreer hier
        </Link>
      </div>
    </AuthLayout>
  );
}
