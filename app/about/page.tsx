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
      <main className="min-h-screen">
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
          <GeomPattern opacity={0.07} />
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
        <div style={{ background: '#fff', padding: '96px 40px' }}>
          <div className="max-w-[1280px] mx-auto">
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
                  Elk product wordt zorgvuldig geselecteerd: van gebedskleding en Koranstandaarden
                  tot geurige abaya&apos;s en islamitische kunst. Wij geloven dat schoonheid en
                  geloof hand in hand gaan.
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
          <GeomPattern opacity={0.05} />
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
              {values.map(({ arabic, name, desc }) => (
                <div
                  key={name}
                  style={{
                    background: '#fff',
                    border: '1px solid rgba(201,168,76,0.15)',
                    padding: '36px 28px',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    className="font-arabic select-none absolute"
                    style={{
                      fontSize: 40,
                      color: '#c9a84c',
                      opacity: 0.85,
                      top: 16,
                      right: 16,
                      direction: 'rtl',
                      lineHeight: 1,
                    }}
                  >
                    {arabic}
                  </div>
                  <h3
                    className="font-display"
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      color: '#0a0a0a',
                      marginBottom: 10,
                      marginTop: 32,
                    }}
                  >
                    {name}
                  </h3>
                  <p style={{ fontSize: 13, color: '#888', lineHeight: 1.7 }}>{desc}</p>
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
          <GeomPattern opacity={0.06} />
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
