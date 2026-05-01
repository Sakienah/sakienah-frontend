import { GeomPattern } from '@/components/ui/GeomPattern';

const values = [
  {
    arabic: 'اسلامی',
    title: 'Islamitisch gecureerd',
    sub: 'Gecureerd',
    desc: 'Elk product zorgvuldig geselecteerd met aandacht voor islamitische waarden en kwaliteit.',
    num: '01',
  },
  {
    arabic: 'جودة',
    title: 'Premium kwaliteit',
    sub: 'Kwaliteit',
    desc: 'Duurzame materialen en vakmanschap — producten gemaakt om generaties mee te gaan.',
    num: '02',
  },
  {
    arabic: 'هدية',
    title: 'Perfect cadeau',
    sub: 'Cadeau',
    desc: 'Het ideale cadeau voor Ramadan, Eid of gewoon zomaar — geef iemand iets waarvoor jij ook nog een beloning kunt ontvangen.',
    num: '03',
  },
];

export function ValueProposition() {
  return (
    <section
      className="py-16 lg:py-24"
      style={{ background: '#FAF7F2', position: 'relative', overflow: 'hidden' }}
    >
      <GeomPattern flip />
      <style>{`
        .waarde-card-home {
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
        .waarde-card-home:hover {
          box-shadow: 0 8px 48px rgba(201,168,76,0.14), 0 2px 8px rgba(0,0,0,0.06);
          transform: translateY(-3px);
        }
        .waarde-card-home::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent 0%, #c9a84c 30%, #e8d090 50%, #c9a84c 70%, transparent 100%);
        }
        .wch-corner-tl, .wch-corner-tr, .wch-corner-bl, .wch-corner-br {
          position: absolute;
          width: 16px; height: 16px;
        }
        .wch-corner-tl { top: 10px; left: 10px; border-top: 1px solid rgba(201,168,76,0.5); border-left: 1px solid rgba(201,168,76,0.5); }
        .wch-corner-tr { top: 10px; right: 10px; border-top: 1px solid rgba(201,168,76,0.5); border-right: 1px solid rgba(201,168,76,0.5); }
        .wch-corner-bl { bottom: 10px; left: 10px; border-bottom: 1px solid rgba(201,168,76,0.5); border-left: 1px solid rgba(201,168,76,0.5); }
        .wch-corner-br { bottom: 10px; right: 10px; border-bottom: 1px solid rgba(201,168,76,0.5); border-right: 1px solid rgba(201,168,76,0.5); }
      `}</style>
      <div className="max-w-[1280px] mx-auto px-4 md:px-10">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <p
            style={{
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#c9a84c',
              fontWeight: 600,
              marginBottom: 14,
            }}
          >
            Waarom Sakienah
          </p>
          <h2
            className="font-display"
            style={{
              fontSize: 'var(--text-h2)',
              fontWeight: 600,
              color: '#0a0a0a',
              letterSpacing: '-0.02em',
            }}
          >
            Kwaliteit met intentie
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map(({ arabic, title, sub, desc, num }) => (
            <div key={title} className="waarde-card-home">
              <div className="wch-corner-tl" />
              <div className="wch-corner-tr" />
              <div className="wch-corner-bl" />
              <div className="wch-corner-br" />

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
                {num}
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
                  fontSize: 'var(--text-lg)',
                  fontWeight: 600,
                  color: '#0a0a0a',
                  letterSpacing: '-0.01em',
                  marginBottom: 5,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {title}
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
                {sub}
              </p>

              {/* Description */}
              <p
                style={{
                  fontSize: 'var(--text-sm)',
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
    </section>
  );
}
