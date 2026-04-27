import { GeomPattern } from '@/components/ui/GeomPattern';
import type { Step } from './types';

const STEP_LABELS = ['Gegevens', 'Betaling', 'Bevestiging'];

type Props = {
  step: Step;
  allDone?: boolean;
};

export function CheckoutHeader({ step, allDone = false }: Props) {
  return (
    <div
      style={{
        background: '#0a0a0a',
        paddingTop: 106,
        paddingBottom: 56,
        paddingLeft: 40,
        paddingRight: 40,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GeomPattern opacity={0.07} id="geom-checkout-header" />
      <div className="max-w-[1280px] mx-auto relative z-10">
        <p
          style={{
            fontSize: 10,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#c9a84c',
            fontWeight: 600,
            marginBottom: 12,
          }}
        >
          Afronden
        </p>
        <h1
          className="font-display text-white"
          style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-0.02em', marginBottom: 28 }}
        >
          Bestelling afronden
        </h1>
        <div className="flex items-center">
          {STEP_LABELS.map((label, i) => {
            const n = (i + 1) as Step;
            const active = !allDone && step === n;
            const done = allDone || step > n;
            return (
              <div key={label} className="flex items-center">
                <div className="flex items-center" style={{ gap: 10 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 12,
                      fontWeight: 600,
                      transition: 'all 0.2s',
                      background: done || active ? '#c9a84c' : 'rgba(255,255,255,0.1)',
                      color: done || active ? '#0a0a0a' : 'rgba(255,255,255,0.35)',
                      border: done || active ? 'none' : '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    {done ? '✓' : n}
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      fontWeight: 500,
                      color: done || active ? '#fff' : 'rgba(255,255,255,0.35)',
                    }}
                  >
                    {label}
                  </span>
                </div>
                {i < STEP_LABELS.length - 1 && (
                  <span
                    style={{
                      width: 40,
                      height: 1,
                      background: 'rgba(255,255,255,0.15)',
                      margin: '0 16px',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
