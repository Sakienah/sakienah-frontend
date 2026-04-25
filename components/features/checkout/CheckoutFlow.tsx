'use client';

import { useState } from 'react';
import Link from 'next/link';
import { GeomPattern } from '@/components/ui/GeomPattern';
import { useCart } from '@/contexts/CartContext';
import { postCheckout, type OrderResponse } from '@/lib/api';
import { type Step, type FormData, defaultForm } from './types';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { StepInfo } from './StepInfo';
import { StepPayment } from './StepPayment';
import { StepConfirmation } from './StepConfirmation';

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
        email: form.email,
        address: { street: form.address, city: form.city, postalCode: form.postalCode },
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
              style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-0.02em' }}
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
        <CheckoutHeader step={3} allDone />
        <StepConfirmation form={form} order={order} />
      </>
    );
  }

  return (
    <>
      <CheckoutHeader step={step} />
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
          <div style={{ background: '#fff', border: '1px solid #F0EBE3', padding: 40 }}>
            {step === 1 && <StepInfo form={form} update={update} onNext={() => setStep(2)} />}
            {step === 2 && (
              <StepPayment
                form={form}
                update={update}
                onBack={() => setStep(1)}
                onPlaceOrder={() => void handlePlaceOrder()}
                submitting={submitting}
                error={error}
                grandTotal={grandTotal}
              />
            )}
          </div>
          <OrderSummary
            items={items}
            totalPrice={totalPrice}
            shipping={shipping}
            grandTotal={grandTotal}
          />
        </div>
      </div>
    </>
  );
}
