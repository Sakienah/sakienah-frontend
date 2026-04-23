'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GeomPattern } from '@/components/ui/GeomPattern';
import { useCart } from '@/contexts/CartContext';
import { postCheckout, type OrderResponse } from '@/lib/api';

type Step = 1 | 2 | 3;

function formatPrice(n: number) {
  return `€ ${n.toFixed(2).replace('.', ',')}`;
}

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  postalCode: string;
  city: string;
  payment: string;
};

const defaultForm: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  postalCode: '',
  city: '',
  payment: 'ideal',
};

function InputField({
  label,
  value,
  onChange,
  type = 'text',
  required = true,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
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

export function CheckoutFlow() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(defaultForm);
  const [placed, setPlaced] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderResponse | null>(null);

  const shipping = totalPrice >= 50 ? 0 : 4.95;
  const grandTotal = totalPrice + shipping;

  function update(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handlePlaceOrder() {
    setSubmitting(true);
    setError(null);
    try {
      const result = await postCheckout({
        address: {
          street: form.address,
          city: form.city,
          postalCode: form.postalCode,
        },
        paymentMethod: form.payment,
      });
      setOrder(result);
      await clearCart();
      setPlaced(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Er ging iets mis. Probeer opnieuw.');
    } finally {
      setSubmitting(false);
    }
  }

  const stepLabels = ['Gegevens', 'Betaling', 'Bevestiging'];

  if (items.length === 0 && !placed) {
    return (
      <>
        <div
          style={{
            background: '#0a0a0a',
            paddingTop: 106,
            paddingBottom: 56,
            paddingLeft: 40,
            paddingRight: 40,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <GeomPattern opacity={0.07} />
          <div className="max-w-[1280px] mx-auto relative z-10">
            <p
              style={{
                fontSize: 10,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#c9a84c',
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              Afronden
            </p>
            <h1
              className="font-display text-white"
              style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 28 }}
            >
              Bestelling afronden
            </h1>
          </div>
        </div>
        <div
          style={{
            background: '#FAF7F2',
            padding: '80px 40px',
            textAlign: 'center',
            color: '#aaa',
          }}
        >
          <p style={{ fontSize: 14, marginBottom: 32 }}>Je winkelwagen is leeg.</p>
          <Link
            href="/shop"
            style={{
              display: 'inline-block',
              background: '#0a0a0a',
              color: '#c9a84c',
              fontSize: 11,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              fontWeight: 700,
              padding: '14px 36px',
            }}
          >
            Ga naar de shop
          </Link>
        </div>
      </>
    );
  }

  if (placed) {
    return (
      <>
        <div
          style={{
            background: '#0a0a0a',
            paddingTop: 106,
            paddingBottom: 56,
            paddingLeft: 40,
            paddingRight: 40,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <GeomPattern opacity={0.07} />
          <div className="max-w-[1280px] mx-auto relative z-10">
            <p
              style={{
                fontSize: 10,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#c9a84c',
                fontWeight: 600,
                marginBottom: 12,
              }}
            >
              Afronden
            </p>
            <h1
              className="font-display text-white"
              style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 28 }}
            >
              Bestelling afronden
            </h1>
            <div className="flex items-center">
              {stepLabels.map((label, i) => {
                return (
                  <div key={label} className="flex items-center">
                    <div className="flex items-center" style={{ gap: 10 }}>
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 12,
                          fontWeight: 600,
                          background: '#c9a84c',
                          color: '#0a0a0a',
                        }}
                      >
                        ✓
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          fontWeight: 500,
                          color: '#fff',
                        }}
                      >
                        {label}
                      </span>
                    </div>
                    {i < stepLabels.length - 1 && (
                      <span
                        style={{
                          width: 40,
                          height: 1,
                          background: 'rgba(255,255,255,0.15)',
                          margin: '0 16px',
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div
          style={{
            background: '#FAF7F2',
            padding: '80px 40px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: '#fff',
              border: '1px solid rgba(201,168,76,0.2)',
              padding: 64,
              maxWidth: 560,
              textAlign: 'center',
              width: '100%',
            }}
          >
            <div
              className="font-arabic"
              style={{ fontSize: 48, color: '#c9a84c', marginBottom: 16 }}
            >
              الحمد لله
            </div>
            <div
              style={{
                width: 56,
                height: 56,
                background: '#FAF7F2',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                marginBottom: 24,
                fontSize: 24,
              }}
            >
              ✓
            </div>
            <h2
              className="font-display"
              style={{ fontSize: 32, fontWeight: 600, color: '#0a0a0a', marginBottom: 12 }}
            >
              Bestelling geplaatst!
            </h2>
            <p style={{ fontSize: 14, color: '#777', lineHeight: 1.8, marginBottom: 8 }}>
              Beste {form.firstName || 'klant'},<br />
              Je bestelling is ontvangen. Je ontvangt een bevestiging op{' '}
              {form.email || 'jouw e-mailadres'}.
            </p>
            <p style={{ fontSize: 13, color: '#aaa', marginBottom: 8 }}>
              Verwachte levertijd: 2–4 werkdagen
            </p>
            {order && (
              <p style={{ fontSize: 12, color: '#aaa', marginBottom: 36 }}>
                Bestelnummer: <strong style={{ color: '#555' }}>{order.orderNumber}</strong>
              </p>
            )}
            <div
              style={{
                background: '#FAF7F2',
                border: '1px solid #F0EBE3',
                padding: '20px 24px',
                textAlign: 'left',
                marginBottom: 36,
              }}
            >
              <p
                style={{
                  fontSize: 12,
                  color: '#777',
                  marginBottom: 8,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Bezorgadres
              </p>
              <p style={{ fontSize: 14, color: '#555' }}>
                {form.firstName} {form.lastName}
              </p>
              <p style={{ fontSize: 14, color: '#555' }}>{form.address}</p>
              <p style={{ fontSize: 14, color: '#555' }}>
                {form.postalCode} {form.city}
              </p>
            </div>
            <Link
              href="/"
              style={{
                display: 'inline-block',
                background: '#0a0a0a',
                color: '#c9a84c',
                fontSize: 11,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                fontWeight: 700,
                padding: '16px 36px',
              }}
            >
              Terug naar home
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Dark header with steps */}
      <div
        style={{
          background: '#0a0a0a',
          paddingTop: 106,
          paddingBottom: 56,
          paddingLeft: 40,
          paddingRight: 40,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <GeomPattern opacity={0.07} />
        <div className="max-w-[1280px] mx-auto relative z-10">
          <p
            style={{
              fontSize: 10,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#c9a84c',
              fontWeight: 600,
              marginBottom: 12,
            }}
          >
            Afronden
          </p>
          <h1
            className="font-display text-white"
            style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 28 }}
          >
            Bestelling afronden
          </h1>
          {/* Steps */}
          <div className="flex items-center">
            {stepLabels.map((label, i) => {
              const n = (i + 1) as Step;
              const active = step === n;
              const done = step > n;
              return (
                <div key={label} className="flex items-center">
                  <div className="flex items-center" style={{ gap: 10 }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 600,
                        transition: 'all 0.2s',
                        background: done || active ? '#c9a84c' : 'rgba(255,255,255,0.1)',
                        color: done || active ? '#0a0a0a' : 'rgba(255,255,255,0.35)',
                        border: done || active ? 'none' : '1px solid rgba(255,255,255,0.15)',
                      }}
                    >
                      {done ? '✓' : n}
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        color: done || active ? '#fff' : 'rgba(255,255,255,0.35)',
                      }}
                    >
                      {label}
                    </span>
                  </div>
                  {i < stepLabels.length - 1 && (
                    <span
                      style={{
                        width: 40,
                        height: 1,
                        background: 'rgba(255,255,255,0.15)',
                        margin: '0 16px',
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ background: '#FAF7F2', padding: '48px 40px 96px' }}>
        <div
          className="max-w-[1280px] mx-auto"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: 48,
            alignItems: 'start',
          }}
        >
          {/* Main form */}
          <div style={{ background: '#fff', border: '1px solid #F0EBE3', padding: 40 }}>
            {step === 1 && (
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
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <InputField
                      label="E-mail"
                      type="email"
                      value={form.email}
                      onChange={(v) => update('email', v)}
                    />
                    <InputField
                      label="Telefoon"
                      type="tel"
                      value={form.phone}
                      onChange={(v) => update('phone', v)}
                      required={false}
                    />
                  </div>
                  <InputField
                    label="Adres"
                    value={form.address}
                    onChange={(v) => update('address', v)}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 20 }}>
                    <InputField
                      label="Postcode"
                      value={form.postalCode}
                      onChange={(v) => update('postalCode', v)}
                    />
                    <InputField
                      label="Stad"
                      value={form.city}
                      onChange={(v) => update('city', v)}
                    />
                  </div>
                  <div className="flex" style={{ gap: 12, marginTop: 8 }}>
                    <button
                      onClick={() => setStep(2)}
                      disabled={
                        !form.firstName ||
                        !form.lastName ||
                        !form.email ||
                        !form.address ||
                        !form.postalCode ||
                        !form.city
                      }
                      style={{
                        flex: 1,
                        background: '#0a0a0a',
                        color: '#c9a84c',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: 12,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        padding: 16,
                        transition: 'opacity 0.2s',
                        opacity:
                          !form.firstName ||
                          !form.lastName ||
                          !form.email ||
                          !form.address ||
                          !form.postalCode ||
                          !form.city
                            ? 0.4
                            : 1,
                      }}
                    >
                      Doorgaan naar betaling →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2
                  className="font-display"
                  style={{ fontSize: 24, fontWeight: 600, color: '#0a0a0a', marginBottom: 8 }}
                >
                  Betaalmethode
                </h2>
                <p style={{ fontSize: 13, color: '#aaa', marginBottom: 28 }}>
                  Bezorging naar: {form.address}, {form.postalCode} {form.city}
                </p>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}
                >
                  {[
                    { id: 'ideal', label: 'iDEAL' },
                    { id: 'card', label: 'Creditcard / Debitcard' },
                    { id: 'paypal', label: 'PayPal' },
                    { id: 'klarna', label: 'Klarna achteraf betalen' },
                  ].map(({ id, label }) => (
                    <label
                      key={id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 14,
                        padding: '16px 20px',
                        cursor: 'pointer',
                        border: `1px solid ${form.payment === id ? '#c9a84c' : '#E8E0D5'}`,
                        background: form.payment === id ? '#FAF7F2' : '#fff',
                        transition: 'all 0.2s',
                      }}
                    >
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          border: `2px solid ${form.payment === id ? '#c9a84c' : '#ccc'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {form.payment === id && (
                          <div
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              background: '#c9a84c',
                            }}
                          />
                        )}
                      </div>
                      <span style={{ fontSize: 14, color: '#0a0a0a' }}>{label}</span>
                      <input
                        type="radio"
                        name="payment"
                        value={id}
                        checked={form.payment === id}
                        onChange={() => update('payment', id)}
                        style={{ display: 'none' }}
                      />
                    </label>
                  ))}
                </div>
                <div
                  style={{
                    background: '#FAF7F2',
                    border: '1px solid rgba(201,168,76,0.2)',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginBottom: 28,
                  }}
                >
                  <span>🔒</span>
                  <span style={{ fontSize: 12, color: '#777' }}>
                    Alle betalingen worden beveiligd verwerkt via SSL-encryptie.
                  </span>
                </div>
                <div className="flex" style={{ gap: 12 }}>
                  <button
                    onClick={() => setStep(1)}
                    style={{
                      background: 'transparent',
                      color: '#999',
                      border: '1px solid #E8E0D5',
                      cursor: 'pointer',
                      fontSize: 11,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      padding: '16px 24px',
                    }}
                  >
                    ← Terug
                  </button>
                  <button
                    onClick={() => {
                      void handlePlaceOrder();
                    }}
                    disabled={submitting}
                    style={{
                      flex: 1,
                      background: submitting ? '#555' : '#0a0a0a',
                      color: '#c9a84c',
                      border: 'none',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      fontSize: 11,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      padding: 16,
                      transition: 'background 0.2s',
                    }}
                  >
                    {submitting
                      ? 'Verwerken...'
                      : `Bestelling plaatsen — ${formatPrice(grandTotal)}`}
                  </button>
                </div>
                {error && <p style={{ fontSize: 13, color: '#c0392b', marginTop: 12 }}>{error}</p>}
              </div>
            )}
          </div>

          {/* Order summary sidebar */}
          <div
            style={{
              background: '#fff',
              border: '1px solid #F0EBE3',
              padding: 28,
              position: 'sticky',
              top: 106,
            }}
          >
            <h3
              className="font-display"
              style={{ fontSize: 20, fontWeight: 600, color: '#0a0a0a', marginBottom: 24 }}
            >
              Jouw bestelling
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex items-center" style={{ gap: 16 }}>
                  <div
                    style={{
                      width: 56,
                      height: 68,
                      background: '#EDE8DF',
                      flexShrink: 0,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    ) : null}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 500, color: '#0a0a0a', marginBottom: 2 }}>
                      {product.name}
                    </p>
                    <p style={{ fontSize: 11, color: '#aaa' }}>Aantal: {quantity}</p>
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#0a0a0a' }}>
                    {formatPrice(parseFloat(product.price) * quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ borderTop: '1px solid #F0EBE3', paddingTop: 16 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                  fontSize: 13,
                  color: '#777',
                }}
              >
                <span>Subtotaal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 16,
                  fontSize: 13,
                  color: '#777',
                }}
              >
                <span>Verzending</span>
                <span style={{ color: shipping === 0 ? '#4CAF78' : '#0a0a0a' }}>
                  {shipping === 0 ? 'Gratis' : formatPrice(shipping)}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #F0EBE3',
                  paddingTop: 16,
                }}
              >
                <span
                  className="font-display"
                  style={{ fontSize: 20, fontWeight: 700, color: '#0a0a0a' }}
                >
                  Totaal
                </span>
                <span
                  className="font-display"
                  style={{ fontSize: 20, fontWeight: 700, color: '#c9a84c' }}
                >
                  {formatPrice(grandTotal)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
