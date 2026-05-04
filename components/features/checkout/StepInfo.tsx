'use client';

import { useState } from 'react';
import Link from 'next/link';
import { checkEmailExists, lookupPostcode } from '@/lib/api';
import { formatPostcode } from '@/lib/utils';
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
  placeholder,
  suffix,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  suffix?: React.ReactNode;
  maxLength?: number;
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
      <div style={{ position: 'relative' }}>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          required={required}
          placeholder={placeholder}
          maxLength={maxLength}
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
        {suffix && (
          <div
            style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)' }}
          >
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
}

const LANDEN = [
  { value: 'NL', label: 'Nederland' },
  { value: 'BE', label: 'België' },
];

export function StepInfo({ form, update, isGuest }: Props) {
  const [emailWarning, setEmailWarning] = useState(false);
  const [postcodeLoading, setPostcodeLoading] = useState(false);
  const [postcodeError, setPostcodeError] = useState('');

  async function handleEmailBlur() {
    if (!isGuest || !form.email) return;
    const exists = await checkEmailExists(form.email);
    setEmailWarning(exists);
  }

  async function handlePostcodeBlur() {
    setPostcodeError('');
    if (form.country !== 'NL' || !form.postalCode || !form.houseNumber) return;

    const trimmedCode = form.postalCode.replace(/\s/g, '');
    const trimmedNumber = form.houseNumber.trim();
    if (!trimmedCode || !trimmedNumber) return;

    setPostcodeLoading(true);
    try {
      const result = await lookupPostcode(trimmedCode, trimmedNumber);
      update('address', result.street);
      update('city', result.city);
    } catch (err) {
      setPostcodeError(err instanceof Error ? err.message : 'Postcode niet gevonden.');
    } finally {
      setPostcodeLoading(false);
    }
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

        {/* Land — dropdown */}
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
            Land
          </label>
          <select
            value={form.country}
            onChange={(e) => {
              const next = e.target.value;
              update('country', next);
              update('postalCode', formatPostcode(form.postalCode, next));
              setPostcodeError('');
            }}
            required
            style={{
              width: '100%',
              background: '#FAF7F2',
              border: '1px solid #E8E0D5',
              padding: '14px 18px',
              fontSize: 14,
              color: form.country ? '#0a0a0a' : '#aaa',
              outline: 'none',
              boxSizing: 'border-box',
              appearance: 'none',
            }}
          >
            <option value="" disabled>
              Selecteer je land
            </option>
            {LANDEN.map((l) => (
              <option key={l.value} value={l.value}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        {/* Postcode + Huisnummer */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <InputField
            label="Postcode"
            value={form.postalCode}
            onChange={(v) => {
              update('postalCode', formatPostcode(v, form.country));
              setPostcodeError('');
            }}
            onBlur={() => void handlePostcodeBlur()}
            placeholder={form.country === 'NL' ? '1234 AB' : 'bv. 1000'}
            maxLength={form.country === 'NL' ? 7 : 4}
          />
          <InputField
            label={form.country === 'NL' ? 'Huisnummer' : 'Huisnr.'}
            value={form.houseNumber}
            onChange={(v) => {
              update('houseNumber', v);
              setPostcodeError('');
            }}
            onBlur={() => void handlePostcodeBlur()}
            placeholder="12"
            required={form.country === 'NL'}
            suffix={
              postcodeLoading ? <span style={{ fontSize: 12, color: '#c9a84c' }}>⏳</span> : null
            }
          />
        </div>
        {postcodeError && (
          <div
            style={{
              background: '#FFF3F3',
              border: '1px solid #FCCACA',
              padding: '10px 16px',
              fontSize: 12,
              color: '#C62828',
              marginTop: -8,
            }}
          >
            {postcodeError}
          </div>
        )}

        {/* Straat (auto-fill) */}
        <InputField
          label="Straat"
          value={form.address}
          onChange={(v) => update('address', v)}
          placeholder="Hoofdstraat"
        />

        {/* Stad (auto-fill) */}
        <InputField
          label="Stad"
          value={form.city}
          onChange={(v) => update('city', v)}
          placeholder="Amsterdam"
        />
      </div>
    </div>
  );
}
