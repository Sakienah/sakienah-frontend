'use client';

import { useState } from 'react';

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className="text-center py-16">
        <p className="text-gold text-[11px] tracking-[0.18em] uppercase font-semibold mb-3">
          Verzonden
        </p>
        <p className="text-[15px] text-zinc-600">
          Bedankt voor je bericht. We nemen zo snel mogelijk contact op.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[10px] tracking-[0.18em] uppercase text-zinc-500 font-semibold mb-2">
            Naam
          </label>
          <input
            type="text"
            required
            className="w-full border border-[#E8E0D5] bg-white px-4 py-3 text-[14px] text-[#0a0a0a] focus:outline-none focus:border-gold transition-colors"
          />
        </div>
        <div>
          <label className="block text-[10px] tracking-[0.18em] uppercase text-zinc-500 font-semibold mb-2">
            E-mail
          </label>
          <input
            type="email"
            required
            className="w-full border border-[#E8E0D5] bg-white px-4 py-3 text-[14px] text-[#0a0a0a] focus:outline-none focus:border-gold transition-colors"
          />
        </div>
      </div>
      <div>
        <label className="block text-[10px] tracking-[0.18em] uppercase text-zinc-500 font-semibold mb-2">
          Onderwerp
        </label>
        <input
          type="text"
          required
          className="w-full border border-[#E8E0D5] bg-white px-4 py-3 text-[14px] text-[#0a0a0a] focus:outline-none focus:border-gold transition-colors"
        />
      </div>
      <div>
        <label className="block text-[10px] tracking-[0.18em] uppercase text-zinc-500 font-semibold mb-2">
          Bericht
        </label>
        <textarea
          required
          rows={5}
          className="w-full border border-[#E8E0D5] bg-white px-4 py-3 text-[14px] text-[#0a0a0a] focus:outline-none focus:border-gold transition-colors resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="text-[11px] tracking-[0.18em] uppercase font-bold bg-[#0a0a0a] text-white px-10 py-4 hover:opacity-85 transition-opacity disabled:opacity-50"
      >
        {loading ? 'Verzenden...' : 'Verstuur bericht'}
      </button>
    </form>
  );
}
