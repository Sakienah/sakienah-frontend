import { GeomPattern } from '@/components/ui/GeomPattern';

export function CTABanner() {
  return (
    <section
      className="py-16 lg:py-20"
      style={{
        background: '#0a0a0a',
        paddingLeft: 'clamp(1.5rem, 5vw, 2.5rem)',
        paddingRight: 'clamp(1.5rem, 5vw, 2.5rem)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GeomPattern dark />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <div
          className="font-arabic"
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
            color: '#c9a84c',
            direction: 'rtl',
            marginBottom: 16,
            lineHeight: 1.4,
          }}
        >
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </div>
        <div className="flex items-center justify-center" style={{ gap: 16, marginBottom: 12 }}>
          <span style={{ width: 60, height: 1, background: 'rgba(201,168,76,0.3)' }} />
          <span
            style={{
              width: 6,
              height: 6,
              background: '#c9a84c',
              opacity: 0.5,
              transform: 'rotate(45deg)',
            }}
          />
          <span style={{ width: 60, height: 1, background: 'rgba(201,168,76,0.3)' }} />
        </div>
        <p
          style={{
            fontSize: 'var(--text-sm)',
            color: 'rgb(255, 255, 255)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          In naam van Allah, de Barmhartige, de Genadevolle
        </p>
      </div>
    </section>
  );
}
