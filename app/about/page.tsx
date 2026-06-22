import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GeomPattern } from '@/components/ui/GeomPattern';
import { Reveal } from '@/components/ui/Reveal';
import { AnimatedFeatureCard } from '@/components/ui/animated-feature-card';
import Image from 'next/image';

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
            paddingTop: 'clamp(120px, 20vw, 146px)',
            paddingBottom: 'clamp(1rem, 5vw, 1.5rem)',
            paddingLeft: 'clamp(1rem, 5vw, 2.5rem)',
            paddingRight: 'clamp(1rem, 5vw, 2.5rem)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <GeomPattern dark />
          <div className="max-w-[1280px] mx-auto relative z-10 text-center">
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
              Ons verhaal
            </p>
            <h1
              className="font-display text-white"
              style={{
                fontSize: 'clamp(2rem, 6vw, 3.25rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                lineHeight: 1.15,
              }}
            >
              Over Sakienah
            </h1>
            <p
              className="font-arabic"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
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
          className="py-16 md:py-24"
          style={{
            background: '#fff',
            paddingLeft: 'clamp(1rem, 5vw, 2.5rem)',
            paddingRight: 'clamp(1rem, 5vw, 2.5rem)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <GeomPattern flip />
          <div className="max-w-[1280px] mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <p
                  style={{
                    fontSize: 'var(--text-xs)',
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
                <Image
                  src="/brand_assets/categories/overons.webp"
                  alt="Over Sakienah"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 20,
                    border: '1px solid rgba(201,168,76,0.2)',
                    zIndex: 10,
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div
          className="px-4 md:px-10 py-16 md:py-20"
          style={{
            background: '#FAF7F2',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <GeomPattern flip />
          <div className="max-w-[1280px] mx-auto relative z-10">
            <Reveal>
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
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {values.map(({ arabic, name, desc }, i) => (
                <Reveal key={name} delay={i * 0.1}>
                  <AnimatedFeatureCard
                    tag={`0${i + 1}`}
                    title={name}
                    description={desc}
                    arabic={arabic}
                    color={(['gold', 'charcoal', 'cream', 'gold'] as const)[i]}
                  />
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* Quranic verse */}
        <div
          style={{
            background: '#0a0a0a',
            paddingLeft: 'var(--px-page)',
            paddingRight: 'var(--px-page)',
            paddingTop: 80,
            paddingBottom: 80,
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
