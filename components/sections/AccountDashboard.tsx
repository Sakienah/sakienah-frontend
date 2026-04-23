'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GeomPattern } from '@/components/ui/GeomPattern';
import { useAuth } from '@/contexts/AuthContext';
import { updateProfile, changePassword, getOrders, getAddress, saveAddress } from '@/lib/api';
import type { OrderSummary } from '@/lib/api';

const inputClass =
  'w-full bg-[#FAF7F2] border border-[#E8E0D5] text-[#0a0a0a] text-sm px-4 py-3.5 outline-none focus:border-[#c9a84c] transition-colors';
const labelClass = 'block font-sans text-[10px] tracking-[0.13em] uppercase text-[#888] mb-2';

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

type Tab = 'overzicht' | 'bestellingen' | 'gegevens' | 'adres' | 'wachtwoord';

function OverzichtTab({ onTab, orders }: { onTab: (t: Tab) => void; orders: OrderSummary[] }) {
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

function BestellingenTab({ orders }: { orders: OrderSummary[] }) {
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
              <div className="font-sans text-[12px] text-[#555] leading-relaxed sm:col-span-1">
                {o.items.map((item) => item.product.name).join(', ')}
              </div>
              <div className="font-sans text-[16px] font-bold text-[#c9a84c]">
                {formatPrice(o.total)}
              </div>
              <div className="flex items-center gap-3">
                <span
                  className="font-sans text-[10px] tracking-[0.12em] uppercase font-semibold px-3.5 py-1.5 whitespace-nowrap"
                  style={{
                    background: `${statusColor(o.status)}18`,
                    color: statusColor(o.status),
                  }}
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

function GegevensTab() {
  const { user, updateUser } = useAuth();
  const naamDelen = (user?.naam ?? '').split(' ');
  const [form, setForm] = useState({
    voornaam: naamDelen[0] ?? '',
    achternaam: naamDelen.slice(1).join(' ') ?? '',
    email: user?.email ?? '',
    telefoon: user?.telefoon ?? '',
  });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const updated = await updateProfile(form);
      updateUser(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Opslaan mislukt.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-[#F0EBE3] p-10 max-w-[640px]">
      <h2 className="font-display text-[24px] font-semibold text-[#0a0a0a] mb-8">
        Persoonlijke gegevens
      </h2>
      {saved && (
        <div className="bg-[#F0FBF4] border border-[#4CAF78] px-4 py-3 font-sans text-[13px] text-[#2E7D50] mb-6">
          ✓ Gegevens opgeslagen!
        </div>
      )}
      {error && (
        <div className="bg-[#FFF3F3] border border-[#FCCACA] px-4 py-3 font-sans text-[13px] text-[#C62828] mb-6">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Voornaam</label>
            <input
              value={form.voornaam}
              onChange={(e) => setForm((f) => ({ ...f, voornaam: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Achternaam</label>
            <input
              value={form.achternaam}
              onChange={(e) => setForm((f) => ({ ...f, achternaam: e.target.value }))}
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>E-mailadres</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Telefoonnummer (optioneel)</label>
          <input
            value={form.telefoon}
            onChange={(e) => setForm((f) => ({ ...f, telefoon: e.target.value }))}
            placeholder="+31 6 00 000 000"
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="font-sans text-[11px] tracking-[0.18em] uppercase font-bold px-8 py-4 self-start mt-2 transition-all disabled:cursor-wait"
          style={{ background: '#0a0a0a', color: '#c9a84c' }}
        >
          {loading ? 'Opslaan...' : 'Opslaan'}
        </button>
      </form>
    </div>
  );
}

function AdresTab() {
  const [form, setForm] = useState({ street: '', postalCode: '', city: '', country: 'Nederland' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getAddress()
      .then((addr) => {
        if (addr) {
          setForm({
            street: addr.street,
            postalCode: addr.postalCode,
            city: addr.city,
            country: addr.country,
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      await saveAddress(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Opslaan mislukt.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white border border-[#F0EBE3] p-10 max-w-[640px] flex items-center justify-center py-20">
        <div className="font-arabic text-[32px] text-[#c9a84c] opacity-40">سكينة</div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#F0EBE3] p-10 max-w-[640px]">
      <h2 className="font-display text-[24px] font-semibold text-[#0a0a0a] mb-8">Bezorgadres</h2>
      {saved && (
        <div className="bg-[#F0FBF4] border border-[#4CAF78] px-4 py-3 font-sans text-[13px] text-[#2E7D50] mb-6">
          ✓ Adres opgeslagen!
        </div>
      )}
      {error && (
        <div className="bg-[#FFF3F3] border border-[#FCCACA] px-4 py-3 font-sans text-[13px] text-[#C62828] mb-6">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className={labelClass}>Straat + huisnummer</label>
          <input
            value={form.street}
            onChange={(e) => setForm((f) => ({ ...f, street: e.target.value }))}
            placeholder="Hoofdstraat 12"
            className={inputClass}
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className={labelClass}>Postcode</label>
            <input
              value={form.postalCode}
              onChange={(e) => setForm((f) => ({ ...f, postalCode: e.target.value }))}
              placeholder="1234 AB"
              className={inputClass}
            />
          </div>
          <div className="col-span-2">
            <label className={labelClass}>Stad</label>
            <input
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              placeholder="Amsterdam"
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Land</label>
          <select
            value={form.country}
            onChange={(e) => setForm((f) => ({ ...f, country: e.target.value }))}
            className={`${inputClass} appearance-none`}
          >
            {['Nederland', 'België', 'Duitsland', 'Frankrijk', 'Verenigd Koninkrijk'].map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="font-sans text-[11px] tracking-[0.18em] uppercase font-bold px-8 py-4 self-start mt-2 disabled:cursor-wait transition-all"
          style={{ background: '#0a0a0a', color: '#c9a84c' }}
        >
          {saving ? 'Opslaan...' : 'Adres opslaan'}
        </button>
      </form>
    </div>
  );
}

function WachtwoordTab() {
  const [form, setForm] = useState({ huidig: '', nieuw: '', bevestig: '' });
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.huidig) {
      setError('Vul je huidige wachtwoord in.');
      return;
    }
    if (form.nieuw.length < 6) {
      setError('Nieuw wachtwoord moet min. 6 tekens zijn.');
      return;
    }
    if (form.nieuw !== form.bevestig) {
      setError('Wachtwoorden komen niet overeen.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await changePassword(form.huidig, form.nieuw);
      setForm({ huidig: '', nieuw: '', bevestig: '' });
      setSaved(true);
      setTimeout(() => setSaved(false), 2200);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wijzigen mislukt.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-[#F0EBE3] p-10 max-w-[480px]">
      <h2 className="font-display text-[24px] font-semibold text-[#0a0a0a] mb-8">
        Wachtwoord wijzigen
      </h2>
      {saved && (
        <div className="bg-[#F0FBF4] border border-[#4CAF78] px-4 py-3 font-sans text-[13px] text-[#2E7D50] mb-6">
          ✓ Wachtwoord gewijzigd!
        </div>
      )}
      {error && (
        <div className="bg-[#FFF3F3] border border-[#FCCACA] px-4 py-3 font-sans text-[13px] text-[#C62828] mb-6">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {[
          { key: 'huidig', label: 'Huidig wachtwoord', placeholder: '••••••••' },
          { key: 'nieuw', label: 'Nieuw wachtwoord', placeholder: 'Min. 6 tekens' },
          { key: 'bevestig', label: 'Bevestig nieuw wachtwoord', placeholder: '••••••••' },
        ].map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className={labelClass}>{label}</label>
            <input
              type="password"
              value={form[key as keyof typeof form]}
              onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
              placeholder={placeholder}
              className={inputClass}
            />
          </div>
        ))}
        <button
          type="submit"
          disabled={loading}
          className="font-sans text-[11px] tracking-[0.18em] uppercase font-bold px-8 py-4 self-start mt-2 disabled:cursor-wait transition-all"
          style={{ background: '#0a0a0a', color: '#c9a84c' }}
        >
          {loading ? 'Wijzigen...' : 'Wachtwoord wijzigen'}
        </button>
      </form>
    </div>
  );
}

const TABS: { id: Tab; label: string }[] = [
  { id: 'overzicht', label: 'Overzicht' },
  { id: 'bestellingen', label: 'Bestellingen' },
  { id: 'gegevens', label: 'Mijn gegevens' },
  { id: 'adres', label: 'Adres' },
  { id: 'wachtwoord', label: 'Wachtwoord' },
];

export function AccountDashboard() {
  const { user, loading, logout } = useAuth();
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

  if (loading) {
    return (
      <div className="min-h-screen pt-[106px] bg-[#FAF7F2] flex items-center justify-center">
        <div className="font-arabic text-[48px] text-[#c9a84c] opacity-40">سكينة</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-[106px] bg-[#FAF7F2] flex items-center justify-center px-6">
        <div className="text-center bg-white border border-[#F0EBE3] p-[60px] max-w-[420px] w-full">
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
      <div className="bg-[#0a0a0a] px-10 py-14 relative overflow-hidden">
        <GeomPattern opacity={0.07} />
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
              (e.currentTarget as HTMLButtonElement).style.color = '#fff';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.4)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.45)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.15)';
            }}
          >
            Uitloggen
          </button>
        </div>
      </div>

      <div className="bg-[#FAF7F2] px-10 pb-20">
        <div className="max-w-[1200px] mx-auto">
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
