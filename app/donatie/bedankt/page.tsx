import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GeomPattern } from '@/components/ui/GeomPattern';

export default function DonatiesBedanktPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div
          style={{
            background: '#0a0a0a',
            paddingTop: 'clamp(140px, 20vw, 180px)',
            paddingBottom: 'clamp(80px, 12vw, 120px)',
            paddingLeft: 'clamp(1rem, 5vw, 2.5rem)',
            paddingRight: 'clamp(1rem, 5vw, 2.5rem)',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center',
            minHeight: '70svh',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <GeomPattern dark />
          <div className="max-w-[640px] mx-auto relative z-10 w-full">
            {/* Arabisch */}
            <p
              className="font-arabic"
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                color: 'rgba(201,168,76,0.7)',
                direction: 'rtl',
                marginBottom: 32,
              }}
            >
              جَزَاكُمُ اللَّهُ خَيْرًا
            </p>

            {/* Heading */}
            <h1
              className="font-display text-white"
              style={{
                fontSize: 'clamp(1.75rem, 5vw, 3rem)',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                marginBottom: 20,
              }}
            >
              Jazaakallah khairan
              <br />
              <span style={{ color: '#c9a84c' }}>voor jouw donatie</span>
            </h1>

            <p
              style={{
                fontSize: 15,
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 1.9,
                marginBottom: 12,
                maxWidth: 480,
                margin: '0 auto 12px',
              }}
            >
              Jouw bijdrage is succesvol ontvangen en gaat direct naar Sakienah. Moge Allah het van
              jou accepteren en het een sadaqa jariya voor je maken.
            </p>

            <p
              style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.35)',
                marginBottom: 48,
              }}
            >
              Je ontvangt een bevestiging via Mollie.
            </p>

            {/* Scheiding */}
            <div className="flex items-center justify-center" style={{ gap: 16, marginBottom: 48 }}>
              <span style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.3)' }} />
              <span
                style={{
                  width: 5,
                  height: 5,
                  background: '#c9a84c',
                  opacity: 0.4,
                  transform: 'rotate(45deg)',
                }}
              />
              <span style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.3)' }} />
            </div>

            {/* CTA's */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/shop"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 28px',
                  background: '#c9a84c',
                  color: '#0a0a0a',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Bekijk onze collectie
              </Link>
              <Link
                href="/about"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '14px 28px',
                  border: '1px solid rgba(201,168,76,0.3)',
                  color: 'rgba(201,168,76,0.8)',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                }}
              >
                Terug naar over ons
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
