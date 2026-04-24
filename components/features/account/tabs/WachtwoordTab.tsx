'use client';

import { useState } from 'react';
import { changePassword } from '@/lib/api';
import { inputClass, labelClass } from '../shared';

const FIELDS = [
  { key: 'huidig', label: 'Huidig wachtwoord', placeholder: '••••••••' },
  { key: 'nieuw', label: 'Nieuw wachtwoord', placeholder: 'Min. 6 tekens' },
  { key: 'bevestig', label: 'Bevestig nieuw wachtwoord', placeholder: '••••••••' },
] as const;

export function WachtwoordTab() {
  const [form, setForm] = useState({ huidig: '', nieuw: '', bevestig: '' });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.huidig) {
      setError('Vul je huidige wachtwoord in.');
      return;
    }
    if (form.nieuw.length < 6) {
      setError('Nieuw wachtwoord moet min. 6 tekens zijn.');
      return;
    }
    if (form.nieuw !== form.bevestig) {
      setError('Wachtwoorden komen niet overeen.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await changePassword(form.huidig, form.nieuw);
      setForm({ huidig: '', nieuw: '', bevestig: '' });
      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wijzigen mislukt.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-[#F0EBE3] p-10 max-w-[480px]">
      <h2 className="font-display text-[24px] font-semibold text-[#0a0a0a] mb-8">
        Wachtwoord wijzigen
      </h2>
      {saved && (
        <div className="bg-[#F0FBF4] border border-[#4CAF78] px-4 py-3 font-sans text-[13px] text-[#2E7D50] mb-6">
          ✓ Wachtwoord gewijzigd!
        </div>
      )}
      {error && (
        <div className="bg-[#FFF3F3] border border-[#FCCACA] px-4 py-3 font-sans text-[13px] text-[#C62828] mb-6">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {FIELDS.map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className={labelClass}>{label}</label>
            <input
              type="password"
              value={form[key]}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              placeholder={placeholder}
              className={inputClass}
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="font-sans text-[11px] tracking-[0.18em] uppercase font-bold px-8 py-4 self-start mt-2 disabled:cursor-wait transition-all"
          style={{ background: '#0a0a0a', color: '#c9a84c' }}
        >
          {loading ? 'Wijzigen...' : 'Wachtwoord wijzigen'}
        </button>
      </form>
    </div>
  );
}
