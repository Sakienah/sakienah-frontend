'use client';

import Link from 'next/link';
import { formatPrice, formatDate } from '@/lib/utils';
import type { OrderSummary } from '@/lib/api';
import { statusColor, statusLabel } from '../shared';

export function BestellingenTab({ orders }: { orders: OrderSummary[] }) {
  return (
    <div className="bg-white border border-[#F0EBE3]">
      <div className="px-8 py-7 border-b border-[#F0EBE3]">
        <h2 className="font-display text-[24px] font-semibold text-[#0a0a0a]">Mijn bestellingen</h2>
      </div>
      {orders.length === 0 ? (
        <div className="px-8 py-12 text-center">
          <p className="font-sans text-[13px] text-[#aaa]">
            Je hebt nog geen bestellingen geplaatst.
          </p>
          <Link
            href="/shop"
            className="inline-block mt-5 font-sans text-[11px] tracking-[0.18em] uppercase font-bold px-7 py-3.5"
            style={{ background: '#0a0a0a', color: '#c9a84c' }}
          >
            Naar de winkel →
          </Link>
        </div>
      ) : (
        orders.map((o, i) => (
          <div
            key={o.id}
            className="px-8 py-6"
            style={{ borderBottom: i < orders.length - 1 ? '1px solid #F8F4EF' : 'none' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-5 items-center">
              <div>
                <div className="font-sans text-[13px] font-semibold text-[#0a0a0a] mb-1">
                  #{o.orderNumber}
                </div>
                <div className="font-sans text-[12px] text-[#aaa]">{formatDate(o.createdAt)}</div>
              </div>
              <div className="font-sans text-[12px] text-[#555] leading-relaxed">
                {o.items
                  .map((item) =>
                    item.selectedColor
                      ? `${item.product.name} (${item.selectedColor === 'bruin' ? 'Bruin' : item.selectedColor === 'rood' ? 'Rood' : item.selectedColor})`
                      : item.product.name,
                  )
                  .join(', ')}
              </div>
              <div className="font-sans text-[16px] font-bold text-[#c9a84c]">
                {formatPrice(o.total)}
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="font-sans text-[10px] tracking-[0.12em] uppercase font-semibold px-3.5 py-1.5 whitespace-nowrap"
                  style={{ background: `${statusColor(o.status)}18`, color: statusColor(o.status) }}
                >
                  {statusLabel(o.status)}
                </span>
                <Link
                  href={`/account/orders/${o.id}`}
                  className="font-sans text-[10px] tracking-[0.1em] uppercase px-3.5 py-1.5 border border-[#E8E0D5] text-[#888] whitespace-nowrap hover:border-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
