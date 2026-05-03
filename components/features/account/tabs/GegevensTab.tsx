'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { updateProfile } from '@/lib/api';
import { inputClass, labelClass } from '../shared';

export function GegevensTab() {
  const { user, updateUser } = useAuth();
  const naamDelen = (user?.naam ?? '').split(' ');
  const originalEmail = user?.email ?? '';
  const [form, setForm] = useState({
    voornaam: naamDelen[0] ?? '',
    achternaam: naamDelen.slice(1).join(' ') ?? '',
    email: originalEmail,
    telefoon: user?.telefoon ?? '',
    huidigWachtwoord: '',
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const emailChanged = form.email.trim().toLowerCase() !== originalEmail.trim().toLowerCase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (emailChanged && !form.huidigWachtwoord) {
      setError('Huidig wachtwoord is verplicht om je e-mailadres te wijzigen.');
      setLoading(false);
      return;
    }

    try {
      const updated = await updateProfile({
        voornaam: form.voornaam,
        achternaam: form.achternaam,
        email: form.email,
        telefoon: form.telefoon,
        ...(emailChanged && { huidigWachtwoord: form.huidigWachtwoord }),
      });
      updateUser(updated);
      setSaved(true);
      setForm((f) => ({ ...f, huidigWachtwoord: '' }));
      setTimeout(() => setSaved(false), 2200);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Opslaan mislukt.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-[#F0EBE3] p-10 max-w-[640px]">
      <h2 className="font-display text-[24px] font-semibold text-[#0a0a0a] mb-8">
        Persoonlijke gegevens
      </h2>
      {saved && (
        <div className="bg-[#F0FBF4] border border-[#4CAF78] px-4 py-3 font-sans text-[13px] text-[#2E7D50] mb-6">
          ✓ Gegevens opgeslagen!
        </div>
      )}
      {error && (
        <div className="bg-[#FFF3F3] border border-[#FCCACA] px-4 py-3 font-sans text-[13px] text-[#C62828] mb-6">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Voornaam</label>
            <input
              value={form.voornaam}
              onChange={(e) => setForm((f) => ({ ...f, voornaam: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Achternaam</label>
            <input
              value={form.achternaam}
              onChange={(e) => setForm((f) => ({ ...f, achternaam: e.target.value }))}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>E-mailadres</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Telefoonnummer (optioneel)</label>
          <input
            value={form.telefoon}
            onChange={(e) => setForm((f) => ({ ...f, telefoon: e.target.value }))}
            placeholder="+31 6 00 000 000"
            className={inputClass}
          />
        </div>
        {emailChanged && (
          <div>
            <label className={labelClass}>Huidig wachtwoord (verplicht voor e-mailwijziging)</label>
            <input
              type="password"
              value={form.huidigWachtwoord}
              onChange={(e) => setForm((f) => ({ ...f, huidigWachtwoord: e.target.value }))}
              placeholder="Voer je huidige wachtwoord in om je e-mail te wijzigen"
              className={inputClass}
              required
            />
            <p className="font-sans text-[11px] text-[#999] mt-1.5">
              Je ontvangt een verificatiemail op je nieuwe adres én een notificatie op je oude
              adres.
            </p>
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="font-sans text-[11px] tracking-[0.18em] uppercase font-bold px-8 py-4 self-start mt-2 transition-all disabled:cursor-wait"
          style={{ background: '#0a0a0a', color: '#c9a84c' }}
        >
          {loading ? 'Opslaan...' : 'Opslaan'}
        </button>
      </form>
    </div>
  );
}
