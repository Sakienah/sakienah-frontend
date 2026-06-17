import Link from 'next/link';
import Image from 'next/image';
import type { FormData } from './types';
import type { OrderResponse, OrderSummary, OrderItem } from '@/lib/api';
import type { CartItem } from '@/contexts/CartContext';

type DisplayItem = {
  product: { name: string; images: string[]; price?: string };
  quantity: number;
  variant?: { colorName?: string | null } | null;
  selectedColor?: string | null;
  variantLabel?: string | null;
};

type Props = {
  form?: FormData;
  order?: OrderResponse | OrderSummary | null;
  items?: CartItem[] | OrderItem[] | DisplayItem[];
  isGuest?: boolean;
  email?: string;
  fullName?: string;
  address?: OrderSummary['address'];
};

function normalizeItems(items?: CartItem[] | OrderItem[] | DisplayItem[]): DisplayItem[] {
  if (!items) return [];
  return items.map((item) => {
    const cartItem = item as CartItem;
    const orderItem = item as OrderItem;
    return {
      product: {
        name: cartItem.product?.name ?? orderItem.product?.name ?? '',
        images: cartItem.product?.images ?? orderItem.product?.images ?? [],
        price: cartItem.product?.price ?? orderItem.unitPrice ?? undefined,
      },
      quantity: cartItem.quantity ?? orderItem.quantity ?? 1,
      variant: cartItem.variant ? { colorName: cartItem.variant.colorName } : null,
      selectedColor: cartItem.selectedColor ?? orderItem.selectedColor ?? null,
      variantLabel: orderItem.variantLabel ?? null,
    };
  });
}

export function StepConfirmation({ form, order, items, isGuest, email, fullName, address }: Props) {
  const displayItems = normalizeItems(items);
  const displayEmail = email ?? form?.email ?? '';
  const displayName =
    fullName ?? (`${form?.firstName ?? ''} ${form?.lastName ?? ''}`.trim() || 'klant');
  const displayAddress = address ?? null;
  return (
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
        <div className="font-arabic" style={{ fontSize: 48, color: '#c9a84c', marginBottom: 16 }}>
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
          Beste {displayName},<br />
          Je bestelling is ontvangen. Je ontvangt een bevestiging op{' '}
          {displayEmail || 'jouw e-mailadres'}.
        </p>
        <p style={{ fontSize: 13, color: '#aaa', marginBottom: 8 }}>
          Verwachte levertijd: 2–4 werkdagen
        </p>
        {order && (
          <p style={{ fontSize: 12, color: '#aaa', marginBottom: 24 }}>
            Bestelnummer: <strong style={{ color: '#555' }}>{order.orderNumber}</strong>
          </p>
        )}

        {displayItems.length > 0 && (
          <div
            style={{
              background: '#FAF7F2',
              border: '1px solid #F0EBE3',
              padding: '20px 24px',
              textAlign: 'left',
              marginBottom: 24,
            }}
          >
            <p
              style={{
                fontSize: 12,
                color: '#777',
                marginBottom: 12,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              Bestelde producten
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {displayItems.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  {item.product.images[0] && (
                    <div
                      style={{
                        position: 'relative',
                        width: 48,
                        height: 48,
                        borderRadius: 4,
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                  )}
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, color: '#0a0a0a', fontWeight: 500 }}>
                      {item.product.name}
                    </p>
                    <p style={{ fontSize: 12, color: '#777' }}>
                      {(item.variantLabel ?? item.variant?.colorName)
                        ? `${item.variantLabel ?? item.variant?.colorName} · `
                        : ''}
                      {item.quantity}x
                    </p>
                  </div>
                  <p style={{ fontSize: 13, color: '#555', fontWeight: 500 }}>
                    €{Number(item.product.price ?? 0).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            <div
              style={{
                borderTop: '1px solid #E8E3DA',
                marginTop: 16,
                paddingTop: 16,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: 13, color: '#777' }}>Totaal</span>
              <span style={{ fontSize: 14, color: '#0a0a0a', fontWeight: 600 }}>
                €{Number(order?.total ?? 0).toFixed(2)}
              </span>
            </div>
          </div>
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
          <p style={{ fontSize: 14, color: '#555' }}>{displayName}</p>
          <p style={{ fontSize: 14, color: '#555' }}>
            {displayAddress?.street ?? form?.address}
            {displayAddress?.houseNumber || form?.houseNumber
              ? ` ${displayAddress?.houseNumber ?? form?.houseNumber}`
              : ''}
          </p>
          <p style={{ fontSize: 14, color: '#555' }}>
            {displayAddress?.postalCode ?? form?.postalCode} {displayAddress?.city ?? form?.city}
          </p>
          {(displayAddress?.country || form?.country) && (
            <p style={{ fontSize: 14, color: '#555' }}>
              {(displayAddress?.country ?? form?.country) === 'NL'
                ? 'Nederland'
                : (displayAddress?.country ?? form?.country) === 'BE'
                  ? 'België'
                  : (displayAddress?.country ?? form?.country)}
            </p>
          )}
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
        {isGuest && (
          <div
            style={{
              marginTop: 24,
              background: '#FAF7F2',
              border: '1px solid rgba(201,168,76,0.3)',
              padding: '20px 24px',
              textAlign: 'left',
            }}
          >
            <p
              style={{
                fontSize: 13,
                color: '#0a0a0a',
                fontWeight: 600,
                marginBottom: 6,
              }}
            >
              Sla je adres op voor de volgende bestelling
            </p>
            <p style={{ fontSize: 12, color: '#777', marginBottom: 14, lineHeight: 1.7 }}>
              Maak een gratis account aan en hoef je je adres nooit meer in te vullen.
            </p>
            <Link
              href={`/registreer?email=${encodeURIComponent(displayEmail || '')}`}
              style={{
                display: 'inline-block',
                background: '#0a0a0a',
                color: '#c9a84c',
                fontSize: 11,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                fontWeight: 700,
                padding: '12px 28px',
                textDecoration: 'none',
              }}
            >
              Account aanmaken →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
