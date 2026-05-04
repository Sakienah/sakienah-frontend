import { formatPrice } from '@/lib/utils';
import type { FormData } from './types';

const PAYMENT_OPTIONS = [
  { id: 'ideal', label: 'iDEAL', icon: '🏦', desc: 'Direct betalen via je eigen bank' },
  { id: 'card', label: 'Creditcard / Debitcard', icon: '💳', desc: 'Visa, Mastercard, Amex' },
  { id: 'paypal', label: 'PayPal', icon: '🅿️', desc: 'Betaal met je PayPal account' },
  { id: 'klarna', label: 'Klarna achteraf betalen', icon: '📦', desc: 'Betaal na ontvangst' },
];

type Props = {
  form: FormData;
  update: (field: keyof FormData, value: string) => void;
  onBack: () => void;
  onPlaceOrder: () => void;
  submitting: boolean;
  error: string | null;
  grandTotal: number;
  formValid: boolean;
};

export function StepPayment({
  form,
  update,
  onBack,
  onPlaceOrder,
  submitting,
  error,
  grandTotal,
  formValid,
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
        {PAYMENT_OPTIONS.map(({ id, label, icon, desc }) => (
          <label
            key={id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '16px 20px',
              cursor: 'pointer',
              border: `2px solid ${form.payment === id ? '#c9a84c' : '#E8E0D5'}`,
              background: form.payment === id ? '#FAF7F2' : '#fff',
              transition: 'all 0.2s',
            }}
          >
            {/* Radio button — aangepaste styling met gouden accent */}
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
            {/* Betaalmethode icoon + label + omschrijving */}
            <span style={{ fontSize: 18, flexShrink: 0 }}>{icon}</span>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: 13, color: '#0a0a0a', fontWeight: 500 }}>{label}</span>
              <p style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>{desc}</p>
            </div>
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

      {/* Beveiligingsbadge — vertrouwen bij de betalingsstap */}
      <div
        style={{
          background: '#F0FBF4',
          border: '1px solid #D4EDDA',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 28,
        }}
      >
        <span style={{ fontSize: 16 }}>🔒</span>
        <div>
          <p style={{ fontSize: 12, color: '#2d7a4f', fontWeight: 600, marginBottom: 2 }}>
            Veilig betalen
          </p>
          <p style={{ fontSize: 11, color: '#666' }}>
            Je betaling wordt beveiligd verwerkt via SSL-encryptie. Wij slaan geen betalingsgegevens
            op.
          </p>
        </div>
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
          disabled={submitting || !formValid}
          style={{
            flex: 1,
            background: submitting ? '#555' : !formValid ? '#C8C1B8' : '#0a0a0a',
            color: !formValid ? '#fff' : '#c9a84c',
            border: 'none',
            cursor: !formValid || submitting ? 'not-allowed' : 'pointer',
            fontSize: 11,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 700,
            padding: 16,
            transition: 'background 0.2s',
          }}
        >
          {submitting
            ? 'Verwerken...'
            : !formValid
              ? 'Vul eerst je gegevens in'
              : `Bestelling plaatsen — ${formatPrice(grandTotal)}`}
        </button>
      </div>
      {error && <p style={{ fontSize: 13, color: '#c0392b', marginTop: 12 }}>{error}</p>}
    </div>
  );
}
