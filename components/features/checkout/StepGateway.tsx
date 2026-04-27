'use client';

import Link from 'next/link';
import type { CheckoutMode } from './types';

type Props = {
  onContinue: (mode: CheckoutMode) => void;
};

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
      </div>

      <div className="flex flex-col gap-3">
        <Link href="/login?from=/checkout" className="block no-underline">
          <button className="w-full bg-white border border-[#E8E0D5] px-6 py-5 text-left transition-colors hover:border-[#c9a84c] hover:bg-[#FAF7F2] cursor-pointer">
            <p className="font-sans text-[11px] tracking-[0.13em] uppercase font-bold text-[#0a0a0a] mb-1.5">
              Inloggen
            </p>
            <p className="font-sans text-[12px] text-[#888]">
              Gebruik je bestaande account voor sneller afrekenen.
            </p>
          </button>
        </Link>

        <Link href="/register?from=/checkout" className="block no-underline">
          <button className="w-full bg-white border border-[#E8E0D5] px-6 py-5 text-left transition-colors hover:border-[#c9a84c] hover:bg-[#FAF7F2] cursor-pointer">
            <p className="font-sans text-[11px] tracking-[0.13em] uppercase font-bold text-[#0a0a0a] mb-1.5">
              Account aanmaken
            </p>
            <p className="font-sans text-[12px] text-[#888]">
              Bewaar je bestellingen en bestel sneller de volgende keer.
            </p>
          </button>
        </Link>

        <div className="pt-1 border-t border-[#F0EBE3]" />

        <button
          onClick={() => onContinue('guest')}
          className="w-full bg-white border border-[#E8E0D5] px-6 py-5 text-left transition-colors hover:border-[#c9a84c] hover:bg-[#FAF7F2] cursor-pointer"
        >
          <p className="font-sans text-[11px] tracking-[0.13em] uppercase font-bold text-[#0a0a0a] mb-1.5">
            Doorgaan als gast
          </p>
          <p className="font-sans text-[12px] text-[#888]">
            Bestellen zonder account. Je ontvangt een bevestigingsmail.
          </p>
        </button>
      </div>
    </div>
  );
}
