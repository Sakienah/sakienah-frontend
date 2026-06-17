'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { StepConfirmation } from '@/components/features/checkout/StepConfirmation';
import { type FormData, defaultForm } from '@/components/features/checkout/types';
import type { OrderResponse } from '@/lib/api';
import type { CartItem } from '@/contexts/CartContext';

type SuccessState = {
  order: OrderResponse | null;
  form: FormData;
  items: CartItem[];
  isGuest: boolean;
};

function loadSuccessState(): SuccessState {
  if (typeof window === 'undefined') {
    return { order: null, form: defaultForm, items: [], isGuest: false };
  }

  let order: OrderResponse | null = null;
  let form: FormData = defaultForm;
  let items: CartItem[] = [];

  try {
    const orderRaw = localStorage.getItem('sakienah_checkout_order');
    if (orderRaw) order = JSON.parse(orderRaw) as OrderResponse;
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

  const isGuest = !!localStorage.getItem('sakienah_guest_token');

  // Clean up stored checkout data after successful display
  localStorage.removeItem('sakienah_checkout_order');
  localStorage.removeItem('sakienah_checkout_form');
  localStorage.removeItem('sakienah_checkout_items');
  localStorage.removeItem('sakienah_guest_token');

  return { order, form, items, isGuest };
}

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('order');
  const [state] = useState<SuccessState>(() => loadSuccessState());

  if (!orderId) {
    // no-op: orderId is only used for analytics/debugging in this view
  }

  return (
    <StepConfirmation
      form={state.form}
      order={state.order}
      items={state.items}
      isGuest={state.isGuest}
    />
  );
}
