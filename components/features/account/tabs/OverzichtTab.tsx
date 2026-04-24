'use client';

import { useAuth } from '@/contexts/AuthContext';
import { formatPrice, formatDate } from '@/lib/utils';
import type { OrderSummary } from '@/lib/api';
import type { Tab } from '../shared';
import { statusColor, statusLabel } from '../shared';

type Props = {
  onTab: (t: Tab) => void;
  orders: OrderSummary[];
};

export function OverzichtTab({ onTab, orders }: Props) {
  const { user } = useAuth();
  const totaalBesteed = orders.reduce((s, o) => s + Number(o.total), 0);
  const latest = orders[0];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10">
        {[
          {
            arabic: 'الطلبات',
            label: 'Bestellingen',
            value: orders.length,
            sub: 'Totaal geplaatst',
          },
          {
            arabic: 'الإنفاق',
            label: 'Totaal besteed',
            value: formatPrice(totaalBesteed),
            sub: 'Alle bestellingen',
          },
          { arabic: 'المكافأة', label: 'Loyaliteitspunten', value: '247', sub: 'Te verzilveren' },
        ].map(({ arabic, label, value, sub }) => (
          <div
            key={label}
            className="bg-white border border-[#F0EBE3] px-8 py-7 relative overflow-hidden"
          >
            <div
              className="font-arabic absolute top-1.5 right-2.5 text-[#c9a84c] pointer-events-none select-none leading-none"
              style={{ fontSize: 56, opacity: 0.07, direction: 'rtl' }}
            >
              {arabic}
            </div>
            <div className="font-sans text-[10px] tracking-[0.15em] uppercase text-[#aaa] mb-2">
              {label}
            </div>
            <div className="font-display text-[32px] font-bold text-[#0a0a0a] mb-1">{value}</div>
            <div className="font-sans text-[11px] text-[#c9a84c]">{sub}</div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#F0EBE3] p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-display text-[22px] font-semibold text-[#0a0a0a]">
            Laatste bestelling
          </h3>
          <button
            onClick={() => onTab('bestellingen')}
            className="font-sans text-[11px] text-[#c9a84c] tracking-[0.1em] uppercase hover:underline"
          >
            Alles bekijken →
          </button>
        </div>
        {latest ? (
          <div className="flex flex-wrap justify-between items-center gap-3 py-4">
            <div>
              <span className="font-sans text-[13px] font-semibold text-[#0a0a0a]">
                #{latest.orderNumber}
              </span>
              <span className="font-sans text-[12px] text-[#aaa] ml-3.5">
                {formatDate(latest.createdAt)}
              </span>
            </div>
            <div className="font-sans text-[12px] text-[#666]">
              {latest.items.map((i) => i.product.name).join(', ')}
            </div>
            <div className="flex items-center gap-5">
              <span className="font-sans text-[14px] font-bold text-[#c9a84c]">
                {formatPrice(latest.total)}
              </span>
              <span
                className="font-sans text-[10px] tracking-[0.12em] uppercase font-semibold px-3 py-1"
                style={{
                  background: `${statusColor(latest.status)}18`,
                  color: statusColor(latest.status),
                }}
              >
                {statusLabel(latest.status)}
              </span>
            </div>
          </div>
        ) : (
          <p className="font-sans text-[13px] text-[#aaa] py-4">Nog geen bestellingen geplaatst.</p>
        )}
      </div>

      {user && (
        <div className="mt-5 bg-white border border-[#F0EBE3] px-8 py-6">
          <p className="font-sans text-[12px] text-[#aaa]">
            Ingelogd als <span className="text-[#0a0a0a] font-medium">{user.email}</span>
          </p>
        </div>
      )}
    </div>
  );
}
