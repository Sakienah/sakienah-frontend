'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AuthLayout } from './AuthLayout';

const inputClass =
  'w-full bg-[#FAF7F2] border border-[#E8E0D5] text-[#0a0a0a] text-sm px-4 py-3.5 outline-none focus:border-[#c9a84c] transition-colors placeholder:text-[#bbb]';
const labelClass = 'block font-sans text-[10px] tracking-[0.13em] uppercase text-[#888] mb-2';

export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  useEffect(() => {
    if (token) {
      window.history.replaceState({}, '', '/reset-password');
    }
  }, [token]);

  const [form, setForm] = useState({ nieuwWachtwoord: '', bevestigWachtwoord: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  if (!token) {
    return (
      <AuthLayout title="Ongeldige link" arabicTitle="خطأ" subtitle="Link niet geldig">
        <div className="text-center py-5">
          <p className="font-sans text-[13px] text-[#888] leading-relaxed mb-7">
            Deze resetlink is ongeldig. Vraag een nieuwe herstellink aan.
          </p>
          <Link
            href="/forgot-password"
            className="inline-block font-sans text-[11px] tracking-[0.18em] uppercase font-bold px-8 py-3.5 bg-[#0a0a0a] text-[#c9a84c]"
          >
            Nieuwe link aanvragen
          </Link>
        </div>
      </AuthLayout>
    );
  }

  if (success) {
    return (
      <AuthLayout title="Wachtwoord gewijzigd" arabicTitle="تم" subtitle="Succesvol gewijzigd">
        <div className="text-center py-5">
          <div className="w-14 h-14 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto mb-5 text-[22px]">
            ✅
          </div>
          <h3 className="font-display text-[22px] text-[#0a0a0a] mb-3">Wachtwoord gewijzigd!</h3>
          <p className="font-sans text-[13px] text-[#888] leading-relaxed mb-7">
            Je wachtwoord is succesvol gewijzigd. Je kunt nu inloggen met je nieuwe wachtwoord.
          </p>
          <Link
            href="/login"
            className="inline-block font-sans text-[11px] tracking-[0.18em] uppercase font-bold px-8 py-3.5 bg-[#0a0a0a] text-[#c9a84c]"
          >
            Inloggen →
          </Link>
        </div>
      </AuthLayout>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.nieuwWachtwoord !== form.bevestigWachtwoord) {
      setError('Wachtwoorden komen niet overeen.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/proxy/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, ...form }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(
          (data as { message?: string }).message ?? 'Er is iets misgegaan. Probeer het opnieuw.',
        );
        return;
      }
      setSuccess(true);
    } catch {
      setError('Er is iets misgegaan. Probeer het opnieuw.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Nieuw wachtwoord"
      arabicTitle="كلمة المرور"
      subtitle="Stel je nieuwe wachtwoord in"
    >
      {error && (
        <div className="bg-[#FFF3F3] border border-[#FCCACA] px-4 py-3 font-sans text-[13px] text-[#C62828] mb-5 text-center">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>Nieuw wachtwoord</label>
          <input
            type="password"
            value={form.nieuwWachtwoord}
            onChange={(e) => set('nieuwWachtwoord', e.target.value)}
            required
            minLength={8}
            placeholder="Minimaal 8 tekens, met een letter"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Bevestig wachtwoord</label>
          <input
            type="password"
            value={form.bevestigWachtwoord}
            onChange={(e) => set('bevestigWachtwoord', e.target.value)}
            required
            minLength={8}
            placeholder="Herhaal je nieuwe wachtwoord"
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
          {loading ? 'Opslaan...' : 'Wachtwoord wijzigen →'}
        </button>
      </form>
      <div className="text-center mt-6">
        <Link
          href="/login"
          className="font-sans text-[12px] text-[#aaa] hover:text-[#0a0a0a] transition-colors"
        >
          ← Terug naar inloggen
        </Link>
      </div>
    </AuthLayout>
  );
}
