'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GeomPattern } from '@/components/ui/GeomPattern';
import { useAuth } from '@/contexts/AuthContext';
import { getOrders } from '@/lib/api';
import type { OrderSummary } from '@/lib/api';
import { type Tab, TABS } from './shared';
import { OverzichtTab } from './tabs/OverzichtTab';
import { BestellingenTab } from './tabs/BestellingenTab';
import { GegevensTab } from './tabs/GegevensTab';
import { AdresTab } from './tabs/AdresTab';
import { WachtwoordTab } from './tabs/WachtwoordTab';

export function AccountDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<Tab>('overzicht');
  const [orders, setOrders] = useState<OrderSummary[]>([]);

  useEffect(() => {
    if (user) {
      getOrders()
        .then(setOrders)
        .catch(() => {});
    }
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen pt-[106px] bg-[#FAF7F2] flex items-center justify-center px-6 relative overflow-hidden">
        <GeomPattern />
        <div className="text-center bg-white border border-[#F0EBE3] p-[60px] max-w-[420px] w-full relative z-10">
          <div className="font-arabic text-[40px] text-[#c9a84c] mb-4" style={{ direction: 'rtl' }}>
            مرحباً
          </div>
          <h2 className="font-display text-[26px] text-[#0a0a0a] mb-3">
            Log in om je account te bekijken
          </h2>
          <p className="font-sans text-[13px] text-[#aaa] mb-8">
            Bekijk je bestellingen, pas je gegevens aan en meer.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/login"
              className="font-sans text-[11px] tracking-[0.18em] uppercase font-bold px-7 py-3.5 bg-[#0a0a0a] text-[#c9a84c]"
            >
              Inloggen
            </Link>
            <Link
              href="/register"
              className="font-sans text-[11px] tracking-[0.15em] uppercase px-7 py-3.5 border border-[#E8E0D5] text-[#0a0a0a] hover:border-[#0a0a0a] transition-colors"
            >
              Registreren
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const voornaam = user.naam.split(' ')[0];

  return (
    <div className="pt-[106px]">
      {/* Header */}
      <div className="bg-[#0a0a0a] px-10 py-14 relative overflow-hidden">
        <GeomPattern dark />
        <div className="max-w-[1200px] mx-auto relative z-10 flex items-center justify-between flex-wrap gap-5">
          <div>
            <p className="font-sans text-[10px] tracking-[0.22em] uppercase text-[#c9a84c] font-semibold mb-2.5">
              Mijn account
            </p>
            <h1
              className="font-display text-[40px] font-semibold text-white"
              style={{ letterSpacing: '-0.02em' }}
            >
              Welkom, {voornaam}
            </h1>
            <div
              className="font-arabic text-[18px] text-[#c9a84c] mt-1.5"
              style={{ direction: 'rtl', opacity: 0.7 }}
            >
              أهلاً وسهلاً
            </div>
          </div>
          <button
            onClick={async () => {
              await logout();
              router.push('/');
            }}
            className="font-sans text-[10px] tracking-[0.15em] uppercase px-5 py-2.5 border transition-colors"
            style={{ color: 'rgba(255,255,255,0.45)', borderColor: 'rgba(255,255,255,0.15)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            }}
          >
            Uitloggen
          </button>
        </div>
      </div>

      {/* Tabs + content */}
      <div className="bg-[#FAF7F2] px-10 pb-20 relative overflow-hidden">
        <GeomPattern flip />
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="flex gap-0 border-b border-[#E8E0D5] mb-10 overflow-x-auto">
            {TABS.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className="font-sans text-[11px] tracking-[0.12em] uppercase px-7 py-5 border-b-2 whitespace-nowrap transition-all -mb-px"
                style={{
                  borderBottomColor: tab === id ? '#c9a84c' : 'transparent',
                  color: tab === id ? '#0a0a0a' : '#aaa',
                  fontWeight: tab === id ? 600 : 400,
                  background: 'none',
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === 'overzicht' && <OverzichtTab onTab={setTab} orders={orders} />}
          {tab === 'bestellingen' && <BestellingenTab orders={orders} />}
          {tab === 'gegevens' && <GegevensTab />}
          {tab === 'adres' && <AdresTab />}
          {tab === 'wachtwoord' && <WachtwoordTab />}
        </div>
      </div>
    </div>
  );
}
