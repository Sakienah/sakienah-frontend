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
        paddingTop: 'clamp(120px, 20vw, 106px)',
        paddingBottom: 'clamp(40px, 8vw, 56px)',
        paddingLeft: 'clamp(1rem, 5vw, 2.5rem)',
        paddingRight: 'clamp(1rem, 5vw, 2.5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GeomPattern dark id="geom-checkout-header" />
      <div className="max-w-[1280px] mx-auto relative z-10">
        <p
          style={{
            fontSize: 'var(--text-xs)',
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
          style={{
            fontSize: 'clamp(2rem, 6vw, 2.75rem)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
            marginBottom: 28,
          }}
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
                      fontSize: 'var(--text-xs)',
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
