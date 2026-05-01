import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GeomPattern } from '@/components/ui/GeomPattern';

const values = [
  {
    arabic: 'إيمان',
    name: 'Imaan',
    desc: 'Elk product is geselecteerd met het geloof als fundament.',
  },
  { arabic: 'إخلاص', name: 'Ikhlaas', desc: 'Eerlijkheid en oprechtheid in alles wat we doen.' },
  { arabic: 'جودة', name: 'Jawda', desc: 'Alleen producten van de hoogste kwaliteit.' },
  { arabic: 'أمانة', name: 'Amana', desc: 'Vertrouwen als basis van elke klantrelatie.' },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        {/* Dark hero */}
        <div
          style={{
            background: '#0a0a0a',
            paddingTop: 146,
            paddingBottom: 24,
            paddingLeft: 40,
            paddingRight: 40,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <GeomPattern dark />
          <div className="max-w-[1280px] mx-auto relative z-10 text-center">
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
              Ons verhaal
            </p>
            <h1
              className="font-display text-white"
              style={{ fontSize: 52, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15 }}
            >
              Over Sakienah
            </h1>
            <p
              className="font-arabic"
              style={{
                fontSize: 32,
                color: '#c9a84c',
                opacity: 0.6,
                marginTop: 12,
                direction: 'rtl',
              }}
            >
              سكينة
            </p>
          </div>
        </div>

        {/* Story */}
        <div
          style={{
            background: '#fff',
            padding: '96px 40px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <GeomPattern flip />
          <div className="max-w-[1280px] mx-auto relative z-10">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 64,
                alignItems: 'center',
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#c9a84c',
                    fontWeight: 600,
                    marginBottom: 16,
                  }}
                >
                  Wie wij zijn
                </p>
                <h2
                  className="font-display"
                  style={{
                    fontSize: 38,
                    fontWeight: 600,
                    color: '#0a0a0a',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                    marginBottom: 24,
                  }}
                >
                  Rust en kwaliteit voor
                  <br />
                  jouw{' '}
                  <span style={{ color: '#c9a84c', fontStyle: 'italic' }}>islamitische leven</span>
                </h2>
                <p style={{ fontSize: 15, color: '#666', lineHeight: 1.9, marginBottom: 20 }}>
                  Sakienah — Arabisch voor rust en kalmte — is geboren uit een verlangen naar
                  producten die zowel kwalitatief als spiritueel waardevol zijn. Wij cureren een
                  collectie die de islamitische levensstijl verrijkt.
                </p>
                <p style={{ fontSize: 15, color: '#666', lineHeight: 1.9, marginBottom: 40 }}>
                  Sakienah biedt vergemakkelijking aan voor onze zoete aanbiddingen. We willen
                  kwalitatief producten leveren om het verrichten van aanbidding nog comfortabeler
                  te maken.
                </p>
                {/* Signature */}
                <div className="flex items-center" style={{ gap: 16 }}>
                  <span style={{ width: 40, height: 1, background: '#c9a84c', opacity: 0.5 }} />
                  <span className="font-arabic" style={{ fontSize: 22, color: '#c9a84c' }}>
                    بارك الله فيكم
                  </span>
                  <span style={{ width: 40, height: 1, background: '#c9a84c', opacity: 0.5 }} />
                </div>
              </div>
              <div
                style={{
                  aspectRatio: '4/5',
                  background: '#EDE8DF',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 20,
                    border: '1px solid rgba(201,168,76,0.2)',
                    zIndex: 10,
                    pointerEvents: 'none',
                  }}
                />
                <div className="w-full h-full flex items-center justify-center">
                  <p
                    className="font-arabic select-none"
                    style={{ fontSize: 80, color: '#c9a84c', opacity: 0.2, direction: 'rtl' }}
                  >
                    سكينة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div
          style={{
            background: '#FAF7F2',
            padding: '80px 40px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <GeomPattern flip />
          <style>{`
            .waarde-card-about {
              background: #fff;
              border: 1px solid rgba(201,168,76,0.22);
              padding: 48px 32px 44px;
              text-align: center;
              position: relative;
              overflow: hidden;
              display: flex;
              flex-direction: column;
              align-items: center;
              box-shadow: 0 2px 24px rgba(201,168,76,0.07), 0 1px 4px rgba(0,0,0,0.04);
              transition: box-shadow 0.3s, transform 0.3s;
            }
            .waarde-card-about:hover {
              box-shadow: 0 8px 48px rgba(201,168,76,0.14), 0 2px 8px rgba(0,0,0,0.06);
              transform: translateY(-3px);
            }
            .waarde-card-about::before {
              content: '';
              position: absolute;
              top: 0; left: 0; right: 0; height: 2px;
              background: linear-gradient(90deg, transparent 0%, #c9a84c 30%, #e8d090 50%, #c9a84c 70%, transparent 100%);
            }
            .wca-corner-tl, .wca-corner-tr, .wca-corner-bl, .wca-corner-br {
              position: absolute;
              width: 16px; height: 16px;
            }
            .wca-corner-tl { top: 10px; left: 10px; border-top: 1px solid rgba(201,168,76,0.5); border-left: 1px solid rgba(201,168,76,0.5); }
            .wca-corner-tr { top: 10px; right: 10px; border-top: 1px solid rgba(201,168,76,0.5); border-right: 1px solid rgba(201,168,76,0.5); }
            .wca-corner-bl { bottom: 10px; left: 10px; border-bottom: 1px solid rgba(201,168,76,0.5); border-left: 1px solid rgba(201,168,76,0.5); }
            .wca-corner-br { bottom: 10px; right: 10px; border-bottom: 1px solid rgba(201,168,76,0.5); border-right: 1px solid rgba(201,168,76,0.5); }
          `}</style>
          <div className="max-w-[1280px] mx-auto relative z-10">
            <div style={{ textAlign: 'center', marginBottom: 56 }}>
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
                Onze waarden
              </p>
              <h2
                className="font-display"
                style={{
                  fontSize: 38,
                  fontWeight: 600,
                  color: '#0a0a0a',
                  letterSpacing: '-0.02em',
                }}
              >
                Waar wij voor staan
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
              {values.map(({ arabic, name, desc }, i) => (
                <div key={name} className="waarde-card-about">
                  <div className="wca-corner-tl" />
                  <div className="wca-corner-tr" />
                  <div className="wca-corner-bl" />
                  <div className="wca-corner-br" />

                  {/* Number */}
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      letterSpacing: '0.25em',
                      color: 'rgba(201,168,76,0.45)',
                      marginBottom: 20,
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>

                  {/* Decorative dots */}
                  <div
                    style={{
                      display: 'flex',
                      gap: 5,
                      marginBottom: 16,
                      position: 'relative',
                      zIndex: 1,
                      alignItems: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: 3,
                        height: 3,
                        borderRadius: '50%',
                        background: 'rgba(201,168,76,0.25)',
                      }}
                    />
                    <div
                      style={{
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        background: 'rgba(201,168,76,0.45)',
                      }}
                    />
                    <div
                      style={{
                        width: 3,
                        height: 3,
                        borderRadius: '50%',
                        background: 'rgba(201,168,76,0.25)',
                      }}
                    />
                  </div>

                  {/* Arabic calligraphy */}
                  <div
                    className="font-arabic select-none"
                    style={{
                      fontSize: 58,
                      color: '#c9a84c',
                      direction: 'rtl',
                      lineHeight: 1,
                      marginBottom: 2,
                      position: 'relative',
                      zIndex: 1,
                      opacity: 0.2,
                    }}
                  >
                    {arabic}
                  </div>

                  {/* Ornamental divider */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      margin: '18px 0 14px',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    <div
                      style={{
                        width: 24,
                        height: 1,
                        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5))',
                      }}
                    />
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        background: '#c9a84c',
                        opacity: 0.6,
                        transform: 'rotate(45deg)',
                        flexShrink: 0,
                      }}
                    />
                    <div
                      style={{
                        width: 24,
                        height: 1,
                        background: 'linear-gradient(90deg, rgba(201,168,76,0.5), transparent)',
                      }}
                    />
                  </div>

                  {/* Title */}
                  <h3
                    className="font-display"
                    style={{
                      fontSize: 22,
                      fontWeight: 600,
                      color: '#0a0a0a',
                      letterSpacing: '-0.01em',
                      marginBottom: 5,
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {name}
                  </h3>

                  {/* Sub label */}
                  <p
                    style={{
                      fontSize: 9,
                      letterSpacing: '0.24em',
                      textTransform: 'uppercase',
                      color: '#c9a84c',
                      fontWeight: 600,
                      marginBottom: 20,
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {name}
                  </p>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: 13,
                      color: '#888',
                      lineHeight: 1.82,
                      position: 'relative',
                      zIndex: 1,
                    }}
                  >
                    {desc}
                  </p>

                  {/* Warm radial glow */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: -20,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '80%',
                      height: 60,
                      background:
                        'radial-gradient(ellipse at center bottom, rgba(201,168,76,0.06) 0%, transparent 70%)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quranic verse */}
        <div
          style={{
            background: '#0a0a0a',
            padding: '80px 40px',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <GeomPattern dark flip />
          <div className="max-w-[720px] mx-auto relative z-10">
            <p
              className="font-arabic"
              style={{
                fontSize: 28,
                color: 'rgba(201,168,76,0.8)',
                lineHeight: 2,
                marginBottom: 24,
                direction: 'rtl',
              }}
            >
              وَمَا أُمِرُوا إِلَّا لِيَعْبُدُوا اللَّهَ مُخْلِصِينَ
            </p>
            <div className="flex items-center justify-center" style={{ gap: 16, marginBottom: 16 }}>
              <span style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.3)' }} />
              <span
                style={{
                  width: 5,
                  height: 5,
                  background: '#c9a84c',
                  opacity: 0.5,
                  transform: 'rotate(45deg)',
                }}
              />
              <span style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.3)' }} />
            </div>
            <p
              style={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.96)', letterSpacing: '0.08em' }}
            >
              Al-Bayyinah 98:5
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
