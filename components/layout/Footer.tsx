'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="text-white" style={{ background: '#0a0a0a', padding: '72px 0 36px' }}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 md:gap-12 mb-14">
          <div>
            <div className="font-display font-semibold text-gold mb-2" style={{ fontSize: 24 }}>
              Sakienah
            </div>
            <div
              className="font-arabic mb-4"
              style={{ fontSize: 22, color: '#c9a84c', opacity: 0.6, direction: 'rtl' }}
            >
              سكينة
            </div>
            <p
              style={{
                fontFamily: 'inherit',
                fontSize: 13,
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.8,
                maxWidth: 260,
              }}
            >
              Premium islamitische producten geselecteerd met zorg en intentie.
            </p>
          </div>

          <div>
            <div
              className="text-gold uppercase mb-5"
              style={{ fontSize: 10, letterSpacing: '0.18em' }}
            >
              Shop
            </div>
            {(
              [
                ['Alle producten', '/shop'],
                ['Gebedsbenodigdheden', '/shop?category=gebedsbenodigdheden'],
                ['Koran Accessoires', '/shop?category=koran-accessoires'],
              ] as [string, string][]
            ).map(([label, href]) => (
              <div key={label} className="mb-2.5">
                <Link
                  href={href}
                  className="footer-link transition-colors"
                  style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}
                >
                  {label}
                </Link>
              </div>
            ))}
          </div>

          <div>
            <div
              className="text-gold uppercase mb-5"
              style={{ fontSize: 10, letterSpacing: '0.18em' }}
            >
              Info
            </div>
            {(
              [
                ['Over ons', '/about'],
                ['Contact', '/contact'],
                ['Retourbeleid', '/'],
              ] as [string, string][]
            ).map(([label, href]) => (
              <div key={label} className="mb-2.5">
                <Link
                  href={href}
                  className="footer-link transition-colors"
                  style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}
                >
                  {label}
                </Link>
              </div>
            ))}
          </div>

          <div>
            <div
              className="text-gold uppercase mb-5"
              style={{ fontSize: 10, letterSpacing: '0.18em' }}
            >
              Contact
            </div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', lineHeight: 2.2 }}>
              <div>info@sakienah.nl</div>
              <div>+31 6 00 000 000</div>
              <div className="mt-2">Ma–Vr: 09:00–17:00</div>
            </div>
          </div>
        </div>

        <div
          className="flex justify-between items-center flex-wrap gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 28 }}
        >
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}>
            © 2026 Sakienah. Alle rechten voorbehouden.
          </p>
          <div className="flex flex-wrap" style={{ gap: 24 }}>
            {['Privacy', 'Algemene Voorwaarden', 'Cookies'].map((t) => (
              <span
                key={t}
                className="cursor-pointer"
                style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)' }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
