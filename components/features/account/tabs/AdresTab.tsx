'use client';

import { useState, useEffect } from 'react';
import { getAddress, saveAddress } from '@/lib/api';
import { inputClass, labelClass } from '../shared';

const LANDEN = ['Nederland', 'België', 'Duitsland', 'Frankrijk', 'Verenigd Koninkrijk'];

export function AdresTab() {
  const [form, setForm] = useState({ street: '', postalCode: '', city: '', country: 'Nederland' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getAddress()
      .then((addr) => {
        if (addr)
          setForm({
            street: addr.street,
            postalCode: addr.postalCode,
            city: addr.city,
            country: addr.country,
          });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await saveAddress(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Opslaan mislukt.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-[#F0EBE3] p-10 max-w-[640px] flex items-center justify-center py-20">
        <div className="font-arabic text-[32px] text-[#c9a84c] opacity-40">سكينة</div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#F0EBE3] p-10 max-w-[640px]">
      <h2 className="font-display text-[24px] font-semibold text-[#0a0a0a] mb-8">Bezorgadres</h2>
      {saved && (
        <div className="bg-[#F0FBF4] border border-[#4CAF78] px-4 py-3 font-sans text-[13px] text-[#2E7D50] mb-6">
          ✓ Adres opgeslagen!
        </div>
      )}
      {error && (
        <div className="bg-[#FFF3F3] border border-[#FCCACA] px-4 py-3 font-sans text-[13px] text-[#C62828] mb-6">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>Straat + huisnummer</label>
          <input
            value={form.street}
            onChange={(e) => setForm((f) => ({ ...f, street: e.target.value }))}
            placeholder="Hoofdstraat 12"
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Postcode</label>
            <input
              value={form.postalCode}
              onChange={(e) => setForm((f) => ({ ...f, postalCode: e.target.value }))}
              placeholder="1234 AB"
              className={inputClass}
            />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Stad</label>
            <input
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              placeholder="Amsterdam"
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Land</label>
          <select
            value={form.country}
            onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
            className={`${inputClass} appearance-none`}
          >
            {LANDEN.map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="font-sans text-[11px] tracking-[0.18em] uppercase font-bold px-8 py-4 self-start mt-2 disabled:cursor-wait transition-all"
          style={{ background: '#0a0a0a', color: '#c9a84c' }}
        >
          {saving ? 'Opslaan...' : 'Adres opslaan'}
        </button>
      </form>
    </div>
  );
}
