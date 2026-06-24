'use client';

import { useState } from 'react';
import { GeomPattern } from '@/components/ui/GeomPattern';

const PRESETS = [5, 15, 30];

export function DonationSection() {
  const [selected, setSelected] = useState<number | null>(15);
  const [custom, setCustom] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [inputFocused, setInputFocused] = useState(false);

  const activeAmount = custom ? parseFloat(custom) : selected;

  async function handleDonate() {
    if (!activeAmount || activeAmount < 1) {
      setError('Voer een geldig bedrag in (minimaal €1).');
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/proxy/donations/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: activeAmount }),
      });
      if (!res.ok) throw new Error('Betaling kon niet worden aangemaakt.');
      const { checkoutUrl } = await res.json();
      window.location.href = checkoutUrl;
    } catch {
      setError('Er is iets misgegaan. Probeer het opnieuw.');
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        background: '#FAF7F2',
        paddingLeft: 'clamp(1rem, 5vw, 2.5rem)',
        paddingRight: 'clamp(1rem, 5vw, 2.5rem)',
        paddingTop: 'clamp(64px, 8vw, 96px)',
        paddingBottom: 'clamp(64px, 8vw, 96px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GeomPattern />

      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: tekst */}
          <div>
            <h2
              className="font-display"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                color: '#0a0a0a',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              Draag bij aan
              <br />
              <span style={{ color: '#c9a84c' }}>onze missie</span>
            </h2>
            <p style={{ fontSize: 15, color: '#666', lineHeight: 1.9, marginBottom: 16 }}>
              Met jouw bijdrage helpen we moslims toegang te geven tot kwalitatieve producten voor
              hun ibadah. Elke donatie, groot of klein, maakt een verschil.
            </p>
            <p style={{ fontSize: 15, color: '#666', lineHeight: 1.9 }}>
              De donatie gaat direct naar Sakienah en wordt ingezet om de webshop te verbeteren,
              nieuwe producten te cureren en de gemeenschap te ondersteunen.
            </p>
            <div className="flex items-center mt-8" style={{ gap: 16 }}>
              <span style={{ width: 40, height: 1, background: '#c9a84c', opacity: 0.5 }} />
              <span className="font-arabic" style={{ fontSize: 20, color: '#c9a84c' }}>
                جَزَاكُمُ اللَّهُ خَيْرًا
              </span>
              <span style={{ width: 40, height: 1, background: '#c9a84c', opacity: 0.5 }} />
            </div>
          </div>

          {/* Right: donatie-widget */}
          <div
            style={{
              background: '#fff',
              border: '1px solid #EDE6DA',
              boxShadow: '0 24px 60px -24px rgba(10,8,4,0.18)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Gouden accentlijn bovenaan */}
            <div
              aria-hidden
              style={{
                height: 3,
                background: 'linear-gradient(90deg, #c9a84c 0%, #e3c878 50%, #c9a84c 100%)',
              }}
            />

            <div style={{ padding: 'clamp(28px, 4vw, 44px)' }}>
              {/* Header — label + groot bedrag */}
              <div className="flex items-end justify-between" style={{ marginBottom: 28 }}>
                <div>
                  <p
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#c9a84c',
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    Eenmalige donatie
                  </p>
                  <p style={{ fontSize: 13, color: '#999' }}>Jouw bijdrage</p>
                </div>
                <div
                  className="font-display"
                  style={{
                    fontSize: 'clamp(2.25rem, 5vw, 3rem)',
                    color: '#0a0a0a',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  €{activeAmount && activeAmount >= 1 ? activeAmount.toFixed(0) : '—'}
                </div>
              </div>

              {/* Preset bedragen */}
              <div className="grid grid-cols-3 gap-2.5" style={{ marginBottom: 12 }}>
                {PRESETS.map((amount) => {
                  const isActive = !custom && selected === amount;
                  const isHovered = hovered === amount && !isActive;
                  return (
                    <button
                      key={amount}
                      type="button"
                      onMouseEnter={() => setHovered(amount)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => {
                        setSelected(amount);
                        setCustom('');
                        setError(null);
                      }}
                      style={{
                        padding: '15px 8px',
                        background: isActive ? '#0a0a0a' : '#fff',
                        color: isActive ? '#c9a84c' : '#0a0a0a',
                        border: `1.5px solid ${
                          isActive ? '#0a0a0a' : isHovered ? '#c9a84c' : '#EDE6DA'
                        }`,
                        fontSize: 15,
                        fontWeight: 600,
                        cursor: 'pointer',
                        letterSpacing: '0.02em',
                        transition: 'all 0.2s cubic-bezier(0.23, 1, 0.32, 1)',
                      }}
                    >
                      €{amount}
                    </button>
                  );
                })}
              </div>

              {/* Eigen bedrag */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  border: `1.5px solid ${custom || inputFocused ? '#0a0a0a' : '#EDE6DA'}`,
                  marginBottom: 24,
                  transition: 'border-color 0.2s',
                }}
              >
                <span
                  style={{
                    paddingLeft: 16,
                    paddingRight: 4,
                    fontSize: 15,
                    fontWeight: 600,
                    color: custom ? '#0a0a0a' : '#bbb',
                    transition: 'color 0.2s',
                    flexShrink: 0,
                  }}
                >
                  €
                </span>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  inputMode="decimal"
                  placeholder="Ander bedrag"
                  value={custom}
                  onFocus={() => setInputFocused(true)}
                  onBlur={() => setInputFocused(false)}
                  onChange={(e) => {
                    setCustom(e.target.value);
                    setSelected(null);
                    setError(null);
                  }}
                  style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    padding: '14px 16px 14px 4px',
                    fontSize: 15,
                    color: '#0a0a0a',
                    background: 'transparent',
                  }}
                />
              </div>

              {/* Error */}
              {error && <p style={{ fontSize: 12, color: '#c0392b', marginBottom: 16 }}>{error}</p>}

              {/* Doneer-knop */}
              <button
                type="button"
                onClick={handleDonate}
                disabled={loading || !activeAmount || (activeAmount ?? 0) < 1}
                className="group"
                style={{
                  width: '100%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  padding: '17px 24px',
                  background: loading || !activeAmount || activeAmount < 1 ? '#d8cdb4' : '#0a0a0a',
                  color: loading || !activeAmount || activeAmount < 1 ? '#fff' : '#c9a84c',
                  border: 'none',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  cursor: loading || !activeAmount || activeAmount < 1 ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {loading ? (
                  'Doorsturen naar betaling…'
                ) : (
                  <>
                    Doneer
                    {activeAmount && activeAmount >= 1 ? ` €${activeAmount.toFixed(2)}` : ''}
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>

              {/* Trust + betaalmethodes */}
              <div className="flex items-center justify-center" style={{ gap: 8, marginTop: 18 }}>
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#bbb"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <p style={{ fontSize: 11, color: '#aaa', letterSpacing: '0.02em' }}>
                  Veilig betalen via Mollie — iDEAL, creditcard, Bancontact
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
