'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AuthLayout } from './AuthLayout';

const inputClass =
  'w-full bg-[#FAF7F2] border border-[#E8E0D5] text-[#0a0a0a] text-sm px-4 py-3.5 outline-none focus:border-[#c9a84c] transition-colors placeholder:text-[#bbb]';

export function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch('/api/proxy/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
    } catch {
    } finally {
      setLoading(false);
      setSent(true);
    }
  };

  return (
    <AuthLayout title="Wachtwoord vergeten" arabicTitle="لا تقلق" subtitle="Herstel toegang">
      {sent ? (
        <div className="text-center py-5">
          <div className="w-14 h-14 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto mb-5 text-[22px]">
            ✉️
          </div>
          <h3 className="font-display text-[22px] text-[#0a0a0a] mb-3">E-mail verzonden!</h3>
          <p className="font-sans text-[13px] text-[#888] leading-relaxed mb-7">
            Als <strong>{email}</strong> bij ons bekend is, ontvang je binnen enkele minuten een
            herstellink.
          </p>
          <Link
            href="/login"
            className="inline-block font-sans text-[11px] tracking-[0.18em] uppercase font-bold px-8 py-3.5 bg-[#0a0a0a] text-[#c9a84c]"
          >
            Terug naar inloggen
          </Link>
        </div>
      ) : (
        <>
          <p className="font-sans text-[13px] text-[#888] leading-relaxed mb-7 text-center">
            Vul je e-mailadres in en we sturen je een link om je wachtwoord te herstellen.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block font-sans text-[10px] tracking-[0.13em] uppercase text-[#888] mb-2">
                E-mailadres
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="jouw@email.nl"
                className={inputClass}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full font-sans text-[11px] tracking-[0.18em] uppercase font-bold py-4 transition-all disabled:cursor-wait"
              style={{
                background: loading ? '#c9a84c' : '#0a0a0a',
                color: loading ? '#0a0a0a' : '#c9a84c',
              }}
            >
              {loading ? 'Verzenden...' : 'Herstellink sturen →'}
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
        </>
      )}
    </AuthLayout>
  );
}
