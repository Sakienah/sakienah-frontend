'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GeomPattern } from '@/components/ui/GeomPattern';
import { useAuth } from '@/contexts/AuthContext';
import { getOrderById } from '@/lib/api';
import type { OrderSummary } from '@/lib/api';

const STATUS_STEPS = [
  { key: 'PENDING', label: 'Ontvangen' },
  { key: 'CONFIRMED', label: 'Bevestigd' },
  { key: 'PROCESSING', label: 'Verwerking' },
  { key: 'SHIPPED', label: 'Onderweg' },
  { key: 'DELIVERED', label: 'Bezorgd' },
];

const CANCELLED_STATUSES = new Set(['CANCELLED', 'REFUNDED']);

function ColorBadge({ label, hex }: { label: string; hex: string | null }) {
  return (
    <span className="inline-flex items-center" style={{ gap: 5, marginTop: 3 }}>
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: hex ?? '#888',
          display: 'inline-block',
          flexShrink: 0,
        }}
      />
      <span className="font-sans" style={{ fontSize: 11, color: '#aaa' }}>
        {label}
      </span>
    </span>
  );
}

function statusColor(s: string) {
  if (s === 'DELIVERED') return '#4CAF78';
  if (s === 'SHIPPED') return '#c9a84c';
  if (s === 'CANCELLED' || s === 'REFUNDED') return '#C62828';
  return '#888';
}

function statusLabel(s: string) {
  const map: Record<string, string> = {
    PENDING: 'In behandeling',
    CONFIRMED: 'Bevestigd',
    PROCESSING: 'Verwerking',
    SHIPPED: 'Onderweg',
    DELIVERED: 'Bezorgd',
    CANCELLED: 'Geannuleerd',
    REFUNDED: 'Terugbetaald',
  };
  return map[s] ?? s;
}

function paymentLabel(s: string) {
  const map: Record<string, string> = {
    PENDING: 'Nog niet betaald',
    PAID: 'Betaald',
    FAILED: 'Mislukt',
    REFUNDED: 'Terugbetaald',
  };
  return map[s] ?? s;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('nl-NL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function formatPrice(val: string | number) {
  return `€ ${Number(val).toFixed(2).replace('.', ',')}`;
}

function StatusTimeline({ status }: { status: string }) {
  if (CANCELLED_STATUSES.has(status)) {
    return (
      <div
        className="px-5 py-4 font-sans text-[13px] font-semibold"
        style={{ background: '#FFF3F3', color: '#C62828', border: '1px solid #FCCACA' }}
      >
        {statusLabel(status)}
      </div>
    );
  }

  const currentIndex = STATUS_STEPS.findIndex((s) => s.key === status);

  return (
    <div className="hidden md:block">
      <div className="flex items-start gap-0 w-full">
        {STATUS_STEPS.map((step, i) => {
          const done = i <= currentIndex;
          const active = i === currentIndex;
          return (
            <div key={step.key} className="flex-1 flex flex-col items-center">
              <div className="flex items-center w-full">
                {i > 0 && (
                  <div
                    className="flex-1 h-[2px]"
                    style={{ background: done ? '#c9a84c' : '#E8E0D5' }}
                  />
                )}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    background: done ? '#c9a84c' : '#F0EBE3',
                    border: active ? '2px solid #0a0a0a' : 'none',
                  }}
                >
                  {done && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6l3 3 5-5"
                        stroke={active ? '#0a0a0a' : '#fff'}
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                {i < STATUS_STEPS.length - 1 && (
                  <div
                    className="flex-1 h-[2px]"
                    style={{ background: i < currentIndex ? '#c9a84c' : '#E8E0D5' }}
                  />
                )}
              </div>
              <div
                className="mt-2 font-sans text-[10px] tracking-[0.1em] uppercase text-center"
                style={{ color: done ? '#0a0a0a' : '#bbb', fontWeight: active ? 600 : 400 }}
              >
                {step.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StatusStepsMobile({ status }: { status: string }) {
  const currentIndex = STATUS_STEPS.findIndex((s) => s.key === status);
  return (
    <div className="md:hidden">
      <div className="flex items-center w-full px-1">
        {STATUS_STEPS.map((step, i) => {
          const done = i <= currentIndex;
          const active = i === currentIndex;
          const lineDone = i < currentIndex;
          const isFirst = i === 0;
          const isLast = i === STATUS_STEPS.length - 1;

          return (
            <div key={step.key} className="flex items-center flex-1">
              {/* Left line - only show for steps after the first */}
              {!isFirst && (
                <div
                  className="flex-1 h-[2px]"
                  style={{ background: lineDone ? '#c9a84c' : '#E8E0D5' }}
                />
              )}
              {/* Circle */}
              <div
                className="w-4 h-4 rounded-full flex-shrink-0 transition-all"
                style={{
                  background: done ? '#c9a84c' : '#F0EBE3',
                  border: active ? '2px solid #0a0a0a' : 'none',
                }}
              />
              {/* Right line - only show for steps before the last */}
              {!isLast && (
                <div
                  className="flex-1 h-[2px]"
                  style={{ background: i < currentIndex ? '#c9a84c' : '#E8E0D5' }}
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="flex w-full mt-1.5 px-1">
        {STATUS_STEPS.map((step, i) => {
          const done = i <= currentIndex;
          const active = i === currentIndex;
          return (
            <div key={step.key} className="flex-1 text-center" style={{ padding: '0 2px' }}>
              <span
                className="font-sans uppercase"
                style={{
                  color: done ? '#0a0a0a' : '#bbb',
                  fontWeight: active ? 600 : 400,
                  fontSize: 7,
                  letterSpacing: '0.08em',
                  display: 'inline-block',
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function OrderDetail({ orderId }: { orderId: string }) {
  const { user } = useAuth();
  const router = useRouter();
  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [fetchDone, setFetchDone] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
    if (!user) return;
    getOrderById(orderId)
      .then(setOrder)
      .catch((e: unknown) => {
        setError(e instanceof Error ? e.message : 'Bestelling kon niet worden geladen.');
      })
      .finally(() => setFetchDone(true));
  }, [orderId, user]);

  const loading = !user || (!!user && !fetchDone);

  if (loading) {
    return (
      <div className="min-h-screen pt-[106px] bg-[#FAF7F2] flex items-center justify-center relative overflow-hidden">
        <GeomPattern />
        <div className="font-arabic text-[48px] text-[#c9a84c] opacity-40 relative z-10">سكينة</div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen pt-[106px] bg-[#FAF7F2] flex items-center justify-center px-6 relative overflow-hidden">
        <GeomPattern />
        <div className="text-center bg-white border border-[#F0EBE3] p-[60px] max-w-[420px] w-full relative z-10">
          <h2 className="font-display text-[24px] text-[#0a0a0a] mb-3">Bestelling niet gevonden</h2>
          <p className="font-sans text-[13px] text-[#aaa] mb-8">
            {error || 'Deze bestelling bestaat niet of je hebt er geen toegang toe.'}
          </p>
          <Link
            href="/account"
            className="inline-block font-sans text-[11px] tracking-[0.18em] uppercase font-bold px-7 py-3.5 bg-[#0a0a0a] text-[#c9a84c]"
          >
            Terug naar account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[106px] bg-[#FAF7F2] min-h-screen relative overflow-hidden">
      <GeomPattern />
      {/* Header */}
      <div
        className="bg-[#0a0a0a] relative overflow-hidden"
        style={{ padding: 'clamp(1.5rem, 5vw, 2.5rem) clamp(1rem, 5vw, 2.5rem)' }}
      >
        <GeomPattern dark />
        <div className="max-w-[900px] mx-auto flex items-center justify-between flex-wrap gap-4">
          <div>
            <Link
              href="/account"
              className="font-sans tracking-[0.15em] uppercase text-[#c9a84c] opacity-70 hover:opacity-100 transition-opacity"
              style={{ fontSize: 'var(--text-xs)' }}
            >
              ← Mijn account
            </Link>
            <h1
              className="font-display font-semibold text-white mt-2"
              style={{
                letterSpacing: '-0.02em',
                fontSize: 'clamp(1.5rem, 5vw, 2rem)',
              }}
            >
              Bestelling #{order.orderNumber}
            </h1>
            <p className="font-sans text-[#aaa] mt-1" style={{ fontSize: 'var(--text-sm)' }}>
              {formatDate(order.createdAt)}
            </p>
          </div>
          <button
            onClick={() => window.print()}
            className="font-sans text-[10px] tracking-[0.15em] uppercase px-5 py-2.5 border transition-colors print:hidden"
            style={{ color: 'rgba(255,255,255,0.55)', borderColor: 'rgba(255,255,255,0.2)' }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = '#fff';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.5)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.55)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.2)';
            }}
          >
            Factuur afdrukken
          </button>
        </div>
      </div>

      <div className="max-w-[900px] mx-auto px-10 py-12 flex flex-col gap-8 relative z-10">
        {/* Statustimelijn */}
        <div className="bg-white border border-[#F0EBE3] p-8">
          <div className="flex items-center justify-between mb-7 flex-wrap gap-3">
            <h2 className="font-display text-[20px] font-semibold text-[#0a0a0a]">Bestelstatus</h2>
            <span
              className="font-sans text-[10px] tracking-[0.12em] uppercase font-semibold px-3.5 py-1.5"
              style={{
                background: `${statusColor(order.status)}18`,
                color: statusColor(order.status),
              }}
            >
              {statusLabel(order.status)}
            </span>
          </div>
          <StatusTimeline status={order.status} />
          <StatusStepsMobile status={order.status} />
        </div>

        {/* Producten */}
        <div className="bg-white border border-[#F0EBE3]">
          <div className="px-8 py-6 border-b border-[#F0EBE3]">
            <h2 className="font-display text-[20px] font-semibold text-[#0a0a0a]">Producten</h2>
          </div>
          {order.items.map((item, i) => (
            <div
              key={item.productId}
              className="px-8 py-5 flex items-center gap-5"
              style={{ borderBottom: i < order.items.length - 1 ? '1px solid #F8F4EF' : 'none' }}
            >
              {item.product.images[0] && (
                <Image
                  src={item.product.images[0]}
                  alt={item.product.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover flex-shrink-0"
                  style={{ border: '1px solid #F0EBE3' }}
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="font-sans text-[14px] font-semibold text-[#0a0a0a] truncate">
                  {item.product.name}
                </div>
                {item.variantLabel && (
                  <ColorBadge label={item.variantLabel} hex={item.selectedColor} />
                )}
                <div className="font-sans text-[12px] text-[#aaa] mt-0.5">
                  {item.quantity} × {formatPrice(item.unitPrice)}
                </div>
              </div>
              <div className="font-sans text-[15px] font-bold text-[#c9a84c] flex-shrink-0">
                {formatPrice(item.total)}
              </div>
            </div>
          ))}
        </div>

        {/* Totalen + adres + betaalstatus */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Totaaloverzicht */}
          <div className="bg-white border border-[#F0EBE3] p-8">
            <h2 className="font-display text-[20px] font-semibold text-[#0a0a0a] mb-6">
              Overzicht
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex justify-between font-sans text-[13px] text-[#555]">
                <span>Subtotaal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between font-sans text-[13px] text-[#555]">
                <span>Verzendkosten</span>
                <span>
                  {Number(order.shippingCost) === 0 ? 'Gratis' : formatPrice(order.shippingCost)}
                </span>
              </div>
              <div
                className="flex justify-between font-sans text-[15px] font-bold text-[#0a0a0a] pt-3 mt-1"
                style={{ borderTop: '1px solid #F0EBE3' }}
              >
                <span>Totaal</span>
                <span className="text-[#c9a84c]">{formatPrice(order.total)}</span>
              </div>
              <div className="flex justify-between font-sans text-[12px] text-[#aaa] mt-1">
                <span>Betaalstatus</span>
                <span
                  style={{
                    color: order.paymentStatus === 'PAID' ? '#4CAF78' : '#888',
                    fontWeight: 600,
                  }}
                >
                  {paymentLabel(order.paymentStatus)}
                </span>
              </div>
            </div>
          </div>

          {/* Leveringsadres */}
          <div className="bg-white border border-[#F0EBE3] p-8">
            <h2 className="font-display text-[20px] font-semibold text-[#0a0a0a] mb-6">
              Bezorgadres
            </h2>
            {order.address ? (
              <div className="font-sans text-[13px] text-[#555] leading-relaxed">
                <div>{order.address.street}</div>
                <div>
                  {order.address.postalCode} {order.address.city}
                </div>
                <div>{order.address.country}</div>
              </div>
            ) : (
              <p className="font-sans text-[13px] text-[#aaa]">Geen adres beschikbaar.</p>
            )}
          </div>
        </div>

        {/* Notities */}
        {order.notes && (
          <div className="bg-white border border-[#F0EBE3] p-8">
            <h2 className="font-display text-[18px] font-semibold text-[#0a0a0a] mb-3">Notities</h2>
            <p className="font-sans text-[13px] text-[#555] leading-relaxed">{order.notes}</p>
          </div>
        )}
      </div>

      {/* Print-only header */}
      <style>{`
        @media print {
          .print\\:hidden { display: none !important; }
          body { background: white; }
        }
      `}</style>
    </div>
  );
}
