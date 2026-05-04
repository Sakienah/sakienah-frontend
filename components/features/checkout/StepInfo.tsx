'use client';

import { useState } from 'react';
import Link from 'next/link';
import { checkEmailExists } from '@/lib/api';
import type { FormData } from './types';

type Props = {
  form: FormData;
  update: (field: keyof FormData, value: string) => void;
  isGuest?: boolean;
};

function InputField({
  label,
  value,
  onChange,
  onBlur,
  type = 'text',
  required = true,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        style={{
          display: 'block',
          fontSize: 10,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#777',
          fontWeight: 600,
          marginBottom: 8,
        }}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        required={required}
        style={{
          width: '100%',
          background: '#FAF7F2',
          border: '1px solid #E8E0D5',
          padding: '14px 18px',
          fontSize: 14,
          color: '#0a0a0a',
          outline: 'none',
          boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

export function StepInfo({ form, update, isGuest }: Props) {
  const [emailWarning, setEmailWarning] = useState(false);

  const isValid =
    !emailWarning &&
    form.firstName &&
    form.lastName &&
    form.email &&
    form.address &&
    form.postalCode &&
    form.city;

  async function handleEmailBlur() {
    if (!isGuest || !form.email) return;
    const exists = await checkEmailExists(form.email);
    setEmailWarning(exists);
  }

  return (
    <div>
      <h2
        className="font-display"
        style={{ fontSize: 24, fontWeight: 600, color: '#0a0a0a', marginBottom: 28 }}
      >
        Bezorggegevens
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <InputField
            label="Voornaam"
            value={form.firstName}
            onChange={(v) => update('firstName', v)}
          />
          <InputField
            label="Achternaam"
            value={form.lastName}
            onChange={(v) => update('lastName', v)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <InputField
              label="E-mail"
              type="email"
              value={form.email}
              onChange={(v) => {
                update('email', v);
                setEmailWarning(false);
              }}
              onBlur={() => void handleEmailBlur()}
            />
            <InputField
              label="Telefoon"
              type="tel"
              value={form.phone}
              onChange={(v) => update('phone', v)}
              required={false}
            />
          </div>
          {emailWarning && (
            <div
              style={{
                background: '#FFF8EC',
                border: '1px solid rgba(201,168,76,0.4)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
              }}
            >
              <span
                style={{ fontFamily: 'Inter, Arial, sans-serif', fontSize: 12, color: '#7a5c00' }}
              >
                Er bestaat al een account met dit e-mailadres.
              </span>
              <Link
                href={`/login?from=/checkout`}
                style={{
                  fontFamily: 'Inter, Arial, sans-serif',
                  fontSize: 11,
                  letterSpacing: '0.13em',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                  color: '#c9a84c',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                Inloggen →
              </Link>
            </div>
          )}
        </div>
        <InputField label="Adres" value={form.address} onChange={(v) => update('address', v)} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
          <InputField
            label="Postcode"
            value={form.postalCode}
            onChange={(v) => update('postalCode', v)}
          />
          <InputField label="Stad" value={form.city} onChange={(v) => update('city', v)} />
        </div>
      </div>
    </div>
  );
}
