const values = [
  {
    arabic: 'اسلامی',
    title: 'Islamitisch gecureerd',
    desc: 'Elk product zorgvuldig geselecteerd met aandacht voor islamitische waarden en kwaliteit.',
  },
  {
    arabic: 'جودة',
    title: 'Premium kwaliteit',
    desc: 'Duurzame materialen en vakmanschap — producten gemaakt om generaties mee te gaan.',
  },
  {
    arabic: 'هدية',
    title: 'Perfect cadeau',
    desc: 'Voor Ramadan, Eid of gewoon zomaar — elk product mooi verpakt en klaar om te geven.',
  },
];

export function ValueProposition() {
  return (
    <section style={{ background: '#fff', padding: '96px 0' }}>
      <div className="max-w-[1280px] mx-auto" style={{ padding: '0 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p
            style={{
              fontSize: 10,
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
            style={{ fontSize: 44, fontWeight: 600, color: '#0a0a0a', letterSpacing: '-0.02em' }}
          >
            Kwaliteit met intentie
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32 }}>
          {values.map(({ arabic, title, desc }) => (
            <div
              key={title}
              style={{
                border: '1px solid rgba(201,168,76,0.18)',
                padding: '48px 36px',
                textAlign: 'center',
                background: '#FAF7F2',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                className="font-arabic select-none absolute"
                style={{
                  fontSize: 80,
                  color: '#c9a84c',
                  opacity: 0.06,
                  top: 10,
                  right: 10,
                  direction: 'rtl',
                  lineHeight: 1,
                }}
              >
                {arabic}
              </div>
              <div
                className="flex items-center justify-center"
                style={{ gap: 10, marginBottom: 24 }}
              >
                <span style={{ width: 24, height: 1, background: '#c9a84c', opacity: 0.5 }} />
                <span
                  style={{
                    width: 6,
                    height: 6,
                    background: '#c9a84c',
                    opacity: 0.7,
                    transform: 'rotate(45deg)',
                  }}
                />
                <span style={{ width: 24, height: 1, background: '#c9a84c', opacity: 0.5 }} />
              </div>
              <h3
                className="font-display"
                style={{ fontSize: 22, fontWeight: 600, color: '#0a0a0a', marginBottom: 14 }}
              >
                {title}
              </h3>
              <p style={{ fontSize: 14, color: '#777', lineHeight: 1.75 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
