'use client';

import Link from 'next/link';
import type { CheckoutMode } from './types';

type Props = {
  onContinue: (mode: CheckoutMode) => void;
};

const optionStyle: React.CSSProperties = {
  border: '1px solid #E8E0D5',
  background: '#fff',
  padding: '24px 28px',
  cursor: 'pointer',
  transition: 'border-color 0.2s, background 0.2s',
  textAlign: 'left',
  width: '100%',
};

export function StepGateway({ onContinue }: Props) {
  return (
    <div>
      <h2
        className="font-display"
        style={{ fontSize: 24, fontWeight: 600, color: '#0a0a0a', marginBottom: 8 }}
      >
        Hoe wil je afrekenen?
      </h2>
      <p style={{ fontSize: 13, color: '#aaa', marginBottom: 28 }}>
        Kies een optie om verder te gaan.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Link href="/login?from=/checkout" style={{ textDecoration: 'none' }}>
          <button style={optionStyle}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#0a0a0a', margin: '0 0 4px' }}>
              Inloggen
            </p>
            <p style={{ fontSize: 12, color: '#888', margin: 0 }}>
              Gebruik je bestaande account voor sneller afrekenen.
            </p>
          </button>
        </Link>

        <Link href="/register?from=/checkout" style={{ textDecoration: 'none' }}>
          <button style={optionStyle}>
            <p style={{ fontSize: 13, fontWeight: 700, color: '#0a0a0a', margin: '0 0 4px' }}>
              Account aanmaken
            </p>
            <p style={{ fontSize: 12, color: '#888', margin: 0 }}>
              Bewaar je bestellingen en bestel sneller de volgende keer.
            </p>
          </button>
        </Link>

        <button style={optionStyle} onClick={() => onContinue('guest')}>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#0a0a0a', margin: '0 0 4px' }}>
            Doorgaan als gast
          </p>
          <p style={{ fontSize: 12, color: '#888', margin: 0 }}>
            Bestellen zonder account. Je ontvangt een bevestigingsmail.
          </p>
        </button>
      </div>
    </div>
  );
}
