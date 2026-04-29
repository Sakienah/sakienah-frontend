'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthLayout } from './AuthLayout';
import { registerUser } from '@/lib/api';

const labelClass = 'font-sans text-[10px] tracking-[0.13em] uppercase';

type FormState = {
  voornaam: string;
  achternaam: string;
  email: string;
  wachtwoord: string;
  bevestig: string;
  nieuwsbrief: boolean;
};

type Errors = Partial<Record<keyof FormState, string>>;

function Field({
  label,
  field,
  type = 'text',
  placeholder,
  form,
  errors,
  onChange,
}: {
  label: string;
  field: keyof FormState;
  type?: string;
  placeholder: string;
  form: FormState;
  errors: Errors;
  onChange: (field: keyof FormState, value: string) => void;
}) {
  const inputClass = `w-full bg-[#FAF7F2] border text-[#0a0a0a] text-sm px-4 py-3.5 outline-none focus:border-[#c9a84c] transition-colors placeholder:text-[#bbb] ${
    errors[field] ? 'border-[#e57373]' : 'border-[#E8E0D5]'
  }`;
  return (
    <div>
      <div className="mb-2">
        <span className={`${labelClass} ${errors[field] ? 'text-[#e57373]' : 'text-[#888]'}`}>
          {label}
        </span>
        {errors[field] && (
          <span className="font-sans text-[10px] text-[#e57373] ml-2">— {errors[field]}</span>
        )}
      </div>
      <input
        type={type}
        value={form[field] as string}
        onChange={(e) => onChange(field, e.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    voornaam: '',
    achternaam: '',
    email: '',
    wachtwoord: '',
    bevestig: '',
    nieuwsbrief: false,
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [apiError, setApiError] = useState('');

  const set = (k: keyof FormState, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const validate = (): boolean => {
    const e: Errors = {};
    if (!form.voornaam) e.voornaam = 'Verplicht';
    if (!form.achternaam) e.achternaam = 'Verplicht';
    if (!form.email || !form.email.includes('@')) e.email = 'Geldig e-mail vereist';
    if (!form.wachtwoord || form.wachtwoord.length < 6) e.wachtwoord = 'Min. 6 tekens';
    if (form.wachtwoord !== form.bevestig) e.bevestig = 'Wachtwoorden komen niet overeen';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError('');
    try {
      await registerUser({
        voornaam: form.voornaam,
        achternaam: form.achternaam,
        email: form.email,
        wachtwoord: form.wachtwoord,
        nieuwsbrief: form.nieuwsbrief,
      });
      router.push(`/verify-email-sent?email=${encodeURIComponent(form.email)}`);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : 'Registratie mislukt.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Account aanmaken" arabicTitle="انضم إلينا" subtitle="Nieuw bij Sakienah">
      {apiError && (
        <div className="bg-[#FFF3F3] border border-[#FCCACA] px-4 py-3 font-sans text-[13px] text-[#C62828] mb-5 text-center">
          {apiError}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3.5">
          <Field
            label="Voornaam"
            field="voornaam"
            placeholder="Omar"
            form={form}
            errors={errors}
            onChange={set}
          />
          <Field
            label="Achternaam"
            field="achternaam"
            placeholder="El-Amrani"
            form={form}
            errors={errors}
            onChange={set}
          />
        </div>
        <Field
          label="E-mailadres"
          field="email"
          type="email"
          placeholder="jouw@email.nl"
          form={form}
          errors={errors}
          onChange={set}
        />
        <Field
          label="Wachtwoord"
          field="wachtwoord"
          type="password"
          placeholder="Min. 6 tekens"
          form={form}
          errors={errors}
          onChange={set}
        />
        <Field
          label="Bevestig wachtwoord"
          field="bevestig"
          type="password"
          placeholder="••••••••"
          form={form}
          errors={errors}
          onChange={set}
        />
        <label className="flex items-start gap-3 cursor-pointer mt-1">
          <div
            onClick={() => set('nieuwsbrief', !form.nieuwsbrief)}
            className="flex-shrink-0 mt-0.5 w-[18px] h-[18px] flex items-center justify-center transition-all"
            style={{
              border: `2px solid ${form.nieuwsbrief ? '#c9a84c' : '#D0C8BC'}`,
              background: form.nieuwsbrief ? '#c9a84c' : 'transparent',
            }}
          >
            {form.nieuwsbrief && <span className="text-[#0a0a0a] text-[11px] font-bold">✓</span>}
          </div>
          <span className="font-sans text-[12px] text-[#888] leading-relaxed">
            Ja, ik wil de nieuwsbrief ontvangen met aanbiedingen en islamitisch nieuws.
          </span>
        </label>
        <button
          type="submit"
          disabled={loading}
          className="w-full font-sans text-[11px] tracking-[0.18em] uppercase font-bold py-4 mt-2 transition-all disabled:cursor-wait"
          style={{
            background: loading ? '#c9a84c' : '#0a0a0a',
            color: loading ? '#0a0a0a' : '#c9a84c',
          }}
        >
          {loading ? 'Account aanmaken...' : 'Account aanmaken →'}
        </button>
      </form>
      <div className="text-center mt-6 pt-5 border-t border-[#F0EBE3]">
        <span className="font-sans text-[13px] text-[#aaa]">Al een account? </span>
        <Link
          href="/login"
          className="font-sans text-[13px] text-[#c9a84c] font-semibold hover:underline"
        >
          Inloggen
        </Link>
      </div>
    </AuthLayout>
  );
}
