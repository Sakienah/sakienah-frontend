import Link from 'next/link';

const SHOP_LINKS = [
  { href: '/shop', label: 'Alle producten' },
  { href: '/shop?category=gebed', label: 'Gebedsbenodigdheden' },
  { href: '/shop?category=koran', label: 'Koran Accessoires' },
];

const INFO_LINKS = [
  { href: '/about', label: 'Over ons' },
  { href: '/contact', label: 'Contact' },
  { href: '/shop', label: 'Retourbeleid' },
];

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-[72px] pb-9">
      <div className="max-w-[1280px] mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-14">
          {/* Brand */}
          <div>
            <div className="font-display text-2xl font-semibold text-gold mb-2">Sakienah</div>
            <div className="font-arabic text-[22px] text-gold/60 mb-4" style={{ direction: 'rtl' }}>
              سكينة
            </div>
            <p className="text-[13px] text-white/45 leading-[1.8] max-w-[260px]">
              Premium islamitische producten geselecteerd met zorg en intentie.
            </p>
          </div>

          {/* Shop */}
          <div>
            <div className="text-[10px] tracking-[0.18em] uppercase text-gold mb-5">Shop</div>
            <ul className="space-y-2.5">
              {SHOP_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[13px] text-white/45 hover:text-gold transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <div className="text-[10px] tracking-[0.18em] uppercase text-gold mb-5">Info</div>
            <ul className="space-y-2.5">
              {INFO_LINKS.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-[13px] text-white/45 hover:text-gold transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <div className="text-[10px] tracking-[0.18em] uppercase text-gold mb-5">Contact</div>
            <div className="text-[13px] text-white/45 leading-[2.2]">
              <div>info@sakienah.nl</div>
              <div>+31 6 00 000 000</div>
              <div className="mt-2">Ma–Vr: 09:00–17:00</div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.07] pt-7 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-white/25">© 2026 Sakienah. Alle rechten voorbehouden.</p>
          <div className="flex gap-6">
            {['Privacy', 'Algemene Voorwaarden', 'Cookies'].map((t) => (
              <span
                key={t}
                className="text-[12px] text-white/25 cursor-pointer hover:text-white/50 transition-colors"
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
