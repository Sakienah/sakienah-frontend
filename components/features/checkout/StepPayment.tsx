import { formatPrice } from '@/lib/utils';
import type { FormData } from './types';

const PAYMENT_OPTIONS = [
  { id: 'ideal', label: 'iDEAL' },
  { id: 'card', label: 'Creditcard / Debitcard' },
  { id: 'paypal', label: 'PayPal' },
  { id: 'klarna', label: 'Klarna achteraf betalen' },
];

type Props = {
  form: FormData;
  update: (field: keyof FormData, value: string) => void;
  onBack: () => void;
  onPlaceOrder: () => void;
  submitting: boolean;
  error: string | null;
  grandTotal: number;
};

export function StepPayment({
  form,
  update,
  onBack,
  onPlaceOrder,
  submitting,
  error,
  grandTotal,
}: Props) {
  return (
    <div>
      <h2
        className="font-display"
        style={{ fontSize: 24, fontWeight: 600, color: '#0a0a0a', marginBottom: 8 }}
      >
        Betaalmethode
      </h2>
      <p style={{ fontSize: 13, color: '#aaa', marginBottom: 28 }}>
        Bezorging naar: {form.address}, {form.postalCode} {form.city}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {PAYMENT_OPTIONS.map(({ id, label }) => (
          <label
            key={id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '16px 20px',
              cursor: 'pointer',
              border: `1px solid ${form.payment === id ? '#c9a84c' : '#E8E0D5'}`,
              background: form.payment === id ? '#FAF7F2' : '#fff',
              transition: 'all 0.2s',
            }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                border: `2px solid ${form.payment === id ? '#c9a84c' : '#ccc'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              {form.payment === id && (
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#c9a84c' }} />
              )}
            </div>
            <span style={{ fontSize: 14, color: '#0a0a0a' }}>{label}</span>
            <input
              type="radio"
              name="payment"
              value={id}
              checked={form.payment === id}
              onChange={() => update('payment', id)}
              style={{ display: 'none' }}
            />
          </label>
        ))}
      </div>

      <div
        style={{
          background: '#FAF7F2',
          border: '1px solid rgba(201,168,76,0.2)',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 28,
        }}
      >
        <span>🔒</span>
        <span style={{ fontSize: 12, color: '#777' }}>
          Alle betalingen worden beveiligd verwerkt via SSL-encryptie.
        </span>
      </div>

      <div className="flex" style={{ gap: 12 }}>
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            color: '#999',
            border: '1px solid #E8E0D5',
            cursor: 'pointer',
            fontSize: 11,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            padding: '16px 24px',
          }}
        >
          ← Terug
        </button>
        <button
          onClick={onPlaceOrder}
          disabled={submitting}
          style={{
            flex: 1,
            background: submitting ? '#555' : '#0a0a0a',
            color: '#c9a84c',
            border: 'none',
            cursor: submitting ? 'not-allowed' : 'pointer',
            fontSize: 11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 700,
            padding: 16,
            transition: 'background 0.2s',
          }}
        >
          {submitting ? 'Verwerken...' : `Bestelling plaatsen — ${formatPrice(grandTotal)}`}
        </button>
      </div>
      {error && <p style={{ fontSize: 13, color: '#c0392b', marginTop: 12 }}>{error}</p>}
    </div>
  );
}
