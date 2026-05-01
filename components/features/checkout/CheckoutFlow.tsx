'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GeomPattern } from '@/components/ui/GeomPattern';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import {
  postCheckout,
  postGuestCheckout,
  validateCoupon,
  getAddress,
  type OrderResponse,
  type CouponValidationResult,
} from '@/lib/api';
import { type Step, type CheckoutMode, type FormData, defaultForm } from './types';
import { CheckoutHeader } from './CheckoutHeader';
import { OrderSummary } from './OrderSummary';
import { StepGateway } from './StepGateway';
import { StepInfo } from './StepInfo';
import { StepPayment } from './StepPayment';
import { StepConfirmation } from './StepConfirmation';

export function CheckoutFlow() {
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<Step>(user ? 1 : 0);
  const [mode, setMode] = useState<CheckoutMode>(user ? 'account' : 'guest');
  const [form, setForm] = useState<FormData>(defaultForm);
  const [placed, setPlaced] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<OrderResponse | null>(null);
  const [coupon, setCoupon] = useState<CouponValidationResult | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const [firstName = '', ...rest] = user.naam.split(' ');
    const lastName = rest.join(' ');
    setForm((f) => ({ ...f, firstName, lastName, email: user.email }));
    void getAddress().then((addr) => {
      if (!addr) return;
      setForm((f) => ({
        ...f,
        address: addr.street,
        postalCode: addr.postalCode,
        city: addr.city,
      }));
    });
  }, [user]);

  useEffect(() => {
    if (user) return;
    try {
      const raw = localStorage.getItem('sakienah_guest_address');
      if (!raw) return;
      const parsed: unknown = JSON.parse(raw);
      if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return;
      const record = parsed as Record<string, unknown>;
      const safeFields: (keyof FormData)[] = [
        'firstName',
        'lastName',
        'email',
        'phone',
        'address',
        'postalCode',
        'city',
      ];
      const safe: Partial<FormData> = {};
      for (const key of safeFields) {
        if (typeof record[key] === 'string') safe[key] = record[key] as string;
      }
      setForm((f) => ({ ...f, ...safe }));
    } catch {
      // localStorage onbeschikbaar of ongeldige JSON
    }
  }, [user]);

  const discountAmount = coupon?.discountAmount ?? 0;
  const discountedSubtotal = totalPrice - discountAmount;
  const shipping = discountedSubtotal >= 50 ? 0 : 4.95;
  const grandTotal = discountedSubtotal + shipping;

  function update(field: keyof FormData, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleApplyCoupon() {
    const email = form.email || user?.email;
    if (!couponCode.trim() || !email) return;
    setCouponLoading(true);
    setCouponError(null);
    try {
      const result = await validateCoupon(couponCode.trim(), email, totalPrice);
      setCoupon(result);
    } catch (e) {
      setCoupon(null);
      setCouponError(e instanceof Error ? e.message : 'Ongeldige kortingscode.');
    } finally {
      setCouponLoading(false);
    }
  }

  function handleRemoveCoupon() {
    setCoupon(null);
    setCouponCode('');
    setCouponError(null);
  }

  function handleGateway(selectedMode: CheckoutMode) {
    setMode(selectedMode);
    setStep(1);
  }

  async function handlePlaceOrder() {
    setSubmitting(true);
    setError(null);
    try {
      let result: OrderResponse;
      if (mode === 'guest') {
        result = await postGuestCheckout({
          email: form.email,
          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone || undefined,
          items: items.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
            selectedColor: i.selectedColor,
          })),
          address: { street: form.address, city: form.city, postalCode: form.postalCode },
          paymentMethod: form.payment,
          couponCode: coupon ? couponCode.trim() : undefined,
        });
      } else {
        result = await postCheckout({
          email: form.email,
          address: { street: form.address, city: form.city, postalCode: form.postalCode },
          paymentMethod: form.payment,
          couponCode: coupon ? couponCode.trim() : undefined,
        });
      }
      setOrder(result);
      await clearCart();
      setPlaced(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Er ging iets mis. Probeer opnieuw.');
    } finally {
      setSubmitting(false);
    }
  }

  function handleStepInfoNext() {
    if (mode === 'guest') {
      try {
        localStorage.setItem(
          'sakienah_guest_address',
          JSON.stringify({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            address: form.address,
            postalCode: form.postalCode,
            city: form.city,
          }),
        );
      } catch {
        // localStorage onbeschikbaar
      }
    }
    setStep(2);
  }

  if (items.length === 0 && !placed) {
    return (
      <>
        <div
          style={{
            background: '#0a0a0a',
            paddingTop: 106,
            paddingBottom: 56,
            paddingLeft: 'var(--px-page)',
            paddingRight: 'var(--px-page)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <GeomPattern dark />
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
            padding: '80px var(--px-page)',
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
        <StepConfirmation form={form} order={order} isGuest={mode === 'guest'} />
      </>
    );
  }

  return (
    <>
      <CheckoutHeader step={step} />
      <div
        className="px-4 md:px-10 py-12 md:py-24"
        style={{
          background: '#FAF7F2',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <GeomPattern flip />
        <div
          className={`max-w-[1280px] mx-auto relative z-10 ${step === 0 ? '' : 'grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start'}`}
        >
          <div
            style={{ background: '#fff', border: '1px solid #F0EBE3', padding: 40 }}
            className="relative overflow-hidden"
          >
            <GeomPattern opacity={0.06} id="geom-checkout-card" />
            <div className="relative z-10">
              {step === 0 && <StepGateway onContinue={handleGateway} />}
              {step === 1 && (
                <StepInfo
                  form={form}
                  update={update}
                  onNext={handleStepInfoNext}
                  isGuest={mode === 'guest'}
                />
              )}
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
          </div>
          {step !== 0 && (
            <OrderSummary
              items={items}
              totalPrice={totalPrice}
              discountAmount={discountAmount > 0 ? discountAmount : undefined}
              couponCode={coupon ? couponCode.trim() : undefined}
              shipping={shipping}
              grandTotal={grandTotal}
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={handleRemoveCoupon}
              couponInput={couponCode}
              onCouponInputChange={setCouponCode}
              couponError={couponError}
              couponLoading={couponLoading}
            />
          )}
        </div>
      </div>
    </>
  );
}
