import { GeomPattern } from '@/components/ui/GeomPattern';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';

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
      style={{
        paddingTop: 'var(--section-py)',
        paddingBottom: 'var(--section-py)',
        background: '#FAF7F2',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GeomPattern flip />
      <div className="max-w-[1100px] mx-auto px-4 md:px-10">
        <Reveal>
          <SectionHeader heading="Kwaliteit met intentie" />
        </Reveal>

        <div>
          {values.map((value, i) => {
            const reversed = i % 2 === 1;
            return (
              <Reveal key={value.title} delay={i * 0.08}>
                <div
                  className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 py-12 ${reversed ? 'md:flex-row-reverse' : ''}`}
                  style={{
                    borderTop: i > 0 ? '1px solid rgba(201,168,76,0.18)' : undefined,
                  }}
                >
                  <div
                    className="font-arabic select-none flex-shrink-0"
                    style={{
                      fontSize: 'clamp(5rem, 11vw, 8rem)',
                      color: '#c9a84c',
                      opacity: 0.18,
                      direction: 'rtl',
                      lineHeight: 1,
                      width: 'clamp(160px, 22vw, 220px)',
                      textAlign: 'center',
                    }}
                  >
                    {value.arabic}
                  </div>

                  <div
                    className={`flex-1 ${reversed ? 'md:text-right' : ''} text-center md:text-left`}
                  >
                    <div
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: '0.25em',
                        color: 'rgba(201,168,76,0.6)',
                        marginBottom: 10,
                      }}
                    >
                      {value.num} &middot; {value.sub.toUpperCase()}
                    </div>
                    <h3
                      className="font-display"
                      style={{
                        fontSize: 'var(--text-lg)',
                        fontWeight: 600,
                        color: '#0a0a0a',
                        letterSpacing: '-0.01em',
                        marginBottom: 10,
                      }}
                    >
                      {value.title}
                    </h3>
                    <p
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: '#777',
                        lineHeight: 1.8,
                        maxWidth: 440,
                        margin: reversed ? '0 0 0 auto' : '0 auto 0 0',
                      }}
                    >
                      {value.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
