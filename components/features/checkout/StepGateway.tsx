'use client';

import Link from 'next/link';
import type { CheckoutMode } from './types';

type Props = {
  onContinue: (mode: CheckoutMode) => void;
};

/**
 * Gateway-stap bij checkout: de klant kiest of hij inlogt, een account aanmaakt,
 * of als gast verder gaat. De gast-optie is visueel prominenter voor minimale frictie.
 */
export function StepGateway({ onContinue }: Props) {
  return (
    <div>
      <div className="mb-8">
        <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-[#c9a84c] font-semibold mb-2.5">
          Afrekenen
        </p>
        <h2
          className="font-display text-[26px] font-semibold text-[#0a0a0a]"
          style={{ letterSpacing: '-0.01em' }}
        >
          Hoe wil je afrekenen?
        </h2>
        <p style={{ fontSize: 13, color: '#aaa', marginTop: 8 }}>
          Kies hoe je wilt bestellen. Je bestelling is altijd veilig en beveiligd.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {/* Accountopties — kleiner, secundair */}
        <div style={{ display: 'flex', gap: 8 }}>
          <Link href="/login?from=/checkout" className="flex-1 no-underline">
            <div className="w-full bg-white border border-[#E8E0D5] px-5 py-4 text-center transition-all hover:border-[#c9a84c] hover:bg-[#FAF7F2] cursor-pointer">
              <p className="font-sans text-[11px] tracking-[0.1em] uppercase font-semibold text-[#0a0a0a] mb-1">
                Inloggen
              </p>
              <p className="font-sans text-[11px] text-[#aaa]">Bestaande klant</p>
            </div>
          </Link>

          <Link href="/register?from=/checkout" className="flex-1 no-underline">
            <div className="w-full bg-white border border-[#E8E0D5] px-5 py-4 text-center transition-all hover:border-[#c9a84c] hover:bg-[#FAF7F2] cursor-pointer">
              <p className="font-sans text-[11px] tracking-[0.1em] uppercase font-semibold text-[#0a0a0a] mb-1">
                Account aanmaken
              </p>
              <p className="font-sans text-[11px] text-[#aaa]">Sneller volgende keer</p>
            </div>
          </Link>
        </div>

        {/* "Of" scheiding */}
        <div className="flex items-center" style={{ gap: 14, padding: '8px 0' }}>
          <div style={{ flex: 1, height: 1, background: '#F0EBE3' }} />
          <span
            style={{
              fontSize: 11,
              color: '#ccc',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            of
          </span>
          <div style={{ flex: 1, height: 1, background: '#F0EBE3' }} />
        </div>

        {/* Gast-checkout — prominenter met gouden accent */}
        <button
          onClick={() => onContinue('guest')}
          style={{
            width: '100%',
            background: '#FAF7F2',
            border: '2px solid #c9a84c',
            padding: '18px 24px',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
            position: 'relative',
          }}
          className="hover:bg-[#F5EAE0]"
        >
          {/* Aanbevolen badge */}
          <span
            style={{
              position: 'absolute',
              top: -10,
              right: 20,
              background: '#c9a84c',
              color: '#0a0a0a',
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              padding: '3px 10px',
            }}
          >
            Snelste optie
          </span>
          <p
            style={{
              fontSize: 12,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 700,
              color: '#0a0a0a',
              marginBottom: 4,
            }}
          >
            Doorgaan als gast
          </p>
          <p style={{ fontSize: 12, color: '#888' }}>
            Bestellen zonder account. Je ontvangt een bevestigingsmail.
          </p>
        </button>
      </div>
    </div>
  );
}
