'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { StepConfirmation } from '@/components/features/checkout/StepConfirmation';
import { type FormData, defaultForm } from '@/components/features/checkout/types';
import { getOrderSummary, type OrderSummary } from '@/lib/api';
import type { CartItem } from '@/contexts/CartContext';

type SuccessState = {
  order: OrderSummary | null;
  form: FormData;
  items: CartItem[];
  isGuest: boolean;
  guestToken: string | null;
};

function loadFallbackState(): SuccessState {
  if (typeof window === 'undefined') {
    return { order: null, form: defaultForm, items: [], isGuest: false, guestToken: null };
  }

  let order: OrderSummary | null = null;
  let form: FormData = defaultForm;
  let items: CartItem[] = [];

  try {
    const orderRaw = localStorage.getItem('sakienah_checkout_order');
    if (orderRaw) order = JSON.parse(orderRaw) as OrderSummary;
  } catch {
    // ignore
  }

  try {
    const formRaw = localStorage.getItem('sakienah_checkout_form');
    if (formRaw) form = JSON.parse(formRaw) as FormData;
  } catch {
    // ignore
  }

  try {
    const itemsRaw = localStorage.getItem('sakienah_checkout_items');
    if (itemsRaw) items = JSON.parse(itemsRaw) as CartItem[];
  } catch {
    // ignore
  }

  const guestToken = localStorage.getItem('sakienah_guest_token');

  return { order, form, items, isGuest: !!guestToken, guestToken };
}

function clearCheckoutStorage() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('sakienah_checkout_order');
  localStorage.removeItem('sakienah_checkout_form');
  localStorage.removeItem('sakienah_checkout_items');
  localStorage.removeItem('sakienah_guest_token');
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('order');

  const [fallback] = useState<SuccessState>(() => loadFallbackState());
  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [loading, setLoading] = useState(!!orderId);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      clearCheckoutStorage();
      return;
    }

    let cancelled = false;

    getOrderSummary(orderId, fallback.guestToken ?? undefined)
      .then((result) => {
        if (cancelled) return;

        if (result.paymentStatus === 'PAID' || result.status === 'CONFIRMED') {
          setOrder(result);
          clearCheckoutStorage();
        } else if (result.status === 'CANCELLED' || result.paymentStatus === 'FAILED') {
          router.replace(`/payment/failed?order=${orderId}`);
          return;
        } else {
          router.replace(`/payment/pending?order=${orderId}`);
          return;
        }
      })
      .catch((e) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : 'Status kon niet worden opgehaald.');
        clearCheckoutStorage();
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [orderId, router, fallback.guestToken]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
        <p className="text-[#777]">Betaling controleren...</p>
      </div>
    );
  }

  if (error && !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2] px-6">
        <div className="bg-white border border-[#F0EBE3] p-10 max-w-md w-full text-center">
          <h1 className="text-xl font-semibold text-[#0a0a0a] mb-4">Fout opgetreden</h1>
          <p className="text-[#777] text-sm mb-6">{error}</p>
          <Link
            href="/"
            className="inline-block bg-[#0a0a0a] text-[#c9a84c] uppercase font-bold text-[11px] tracking-[0.18em] px-8 py-4"
          >
            Terug naar home
          </Link>
        </div>
      </div>
    );
  }

  const address = order?.address ?? null;
  const fullName = order?.customer
    ? `${order.customer.firstName} ${order.customer.lastName}`
    : order?.guestFirstName
      ? order.guestFirstName
      : `${fallback.form.firstName ?? ''} ${fallback.form.lastName ?? ''}`.trim() || undefined;

  const email = order?.guestEmail ?? order?.customer?.email ?? fallback.form.email ?? undefined;

  return (
    <StepConfirmation
      form={fallback.form}
      order={order}
      items={order?.items ?? fallback.items}
      isGuest={fallback.isGuest}
      email={email}
      fullName={fullName}
      address={address}
    />
  );
}
