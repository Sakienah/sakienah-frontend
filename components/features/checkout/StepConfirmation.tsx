import Link from 'next/link';
import type { FormData } from './types';
import type { OrderResponse } from '@/lib/api';

type Props = {
  form: FormData;
  order: OrderResponse | null;
  isGuest?: boolean;
};

export function StepConfirmation({ form, order, isGuest }: Props) {
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
          Beste {form.firstName || 'klant'},<br />
          Je bestelling is ontvangen. Je ontvangt een bevestiging op{' '}
          {form.email || 'jouw e-mailadres'}.
        </p>
        <p style={{ fontSize: 13, color: '#aaa', marginBottom: 8 }}>
          Verwachte levertijd: 2–4 werkdagen
        </p>
        {order && (
          <p style={{ fontSize: 12, color: '#aaa', marginBottom: 36 }}>
            Bestelnummer: <strong style={{ color: '#555' }}>{order.orderNumber}</strong>
          </p>
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
          <p style={{ fontSize: 14, color: '#555' }}>
            {form.firstName} {form.lastName}
          </p>
          <p style={{ fontSize: 14, color: '#555' }}>{form.address}</p>
          <p style={{ fontSize: 14, color: '#555' }}>
            {form.postalCode} {form.city}
          </p>
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
              href={`/registreer?email=${encodeURIComponent(form.email)}`}
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
