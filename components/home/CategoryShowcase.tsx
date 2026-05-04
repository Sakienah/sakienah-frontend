import Link from 'next/link';
import { GeomPattern } from '@/components/ui/GeomPattern';

/**
 * Toont de drie hoofdcategorieën als visuele kaarten met achtergrondafbeeldingen,
 * gradient overlay, zoom-effect op hover, Arabic watermarks, en gouden accenten.
 */
export function CategoryShowcase() {
  const categories = [
    {
      slug: 'gebedskleed',
      name: 'Gebedskleden',
      description: 'Comfortabele gebedskleden voor dagelijks gebruik',
      arabic: 'صلاة',
      image: '/brand_assets/categories/gebedkleed.webp',
    },
    {
      slug: 'koran-accessoires',
      name: 'Koran Accessoires',
      description: 'Rehals, boekensteunen en meer',
      arabic: 'قرآن',
      image: '/brand_assets/categories/korantafel.webp',
    },
    {
      slug: 'deals',
      name: 'Deals',
      description: 'Voordelige combinaties met korting',
      arabic: 'عرض',
      image: '/brand_assets/categories/deals.webp',
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-[#FAF7F2]"
      style={{
        padding: 'clamp(40px, 8vw, 80px) clamp(1rem, 5vw, 2.5rem)',
      }}
    >
      <GeomPattern flip />

      {/* Hover-effecten — zoom background + border glow + arabic watermark fade */}
      <style>{`
        .cat-card:hover .cat-bg    { transform: scale(1.1); }
        .cat-card:hover .cat-arabic { color: rgba(255,255,255,0.1) !important; transform: translate(-50%,-50%) scale(1.05); }
        .cat-card:hover .cat-corner { border-color: rgba(201,168,76,0.45) !important; }
        .cat-card:hover .cat-cta    { letter-spacing: 0.22em; }
      `}</style>

      <div className="max-w-[1280px] mx-auto relative z-10">
        {/* Koptekst */}
        <div className="text-center mb-12">
          <p
            className="uppercase font-semibold text-gold"
            style={{
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.22em',
              marginBottom: 12,
            }}
          >
            Collecties
          </p>
          <h2
            className="font-display font-semibold"
            style={{
              fontSize: 'var(--text-h2)',
              color: '#0a0a0a',
              letterSpacing: '-0.02em',
            }}
          >
            Ontdek onze collecties
          </h2>
        </div>

        {/* Categoriekaarten */}
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/shop?category=${cat.slug}`} className="no-underline">
              <div
                className="cat-card relative overflow-hidden cursor-pointer"
                style={{
                  minHeight: 'clamp(400px, 52vw, 520px)',
                  border: '1px solid rgba(201,168,76,0.12)',
                  transition: 'transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease',
                }}
              >
                {/* Achtergrondafbeelding — zoomt in op hover via .cat-card:hover .cat-bg */}
                <div
                  className="cat-bg absolute inset-0"
                  style={{
                    backgroundImage: `url(${cat.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.7s ease-out',
                  }}
                />

                {/* Gradient overlay — transparant boven, donker onder */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.75) 100%)',
                  }}
                />

                {/* Arabic watermark — subtiel op de achtergrond */}
                <span
                  className="cat-arabic font-arabic select-none pointer-events-none absolute hidden sm:block"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    fontSize: 'clamp(3rem, 7vw, 6rem)',
                    color: 'rgba(255, 255, 255, 0.53)',
                    lineHeight: 1,
                    direction: 'rtl',
                    transition: 'color 0.4s, transform 0.7s',
                  }}
                >
                  {cat.arabic}
                </span>

                {/* Content — onderin de kaart */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center text-center"
                  style={{
                    padding: 'clamp(24px, 5vw, 40px) clamp(16px, 3vw, 28px) clamp(24px, 5vw, 36px)',
                  }}
                >
                  <h3
                    className="font-display font-semibold text-white"
                    style={{
                      fontSize: 'clamp(18px, 2.2vw, 24px)',
                      marginBottom: 6,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {cat.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 'clamp(11px, 1.2vw, 13px)',
                      color: 'rgba(255,255,255,0.65)',
                      lineHeight: 1.55,
                      marginBottom: 14,
                      maxWidth: 220,
                    }}
                  >
                    {cat.description}
                  </p>
                  <span
                    className="cat-cta uppercase font-bold text-gold"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.15em',
                      transition: 'letter-spacing 0.3s',
                    }}
                  >
                    Bekijk collectie
                  </span>
                </div>

                {/* 4 gouden hoekdecoraties */}
                <span
                  className="cat-corner absolute top-0 left-0 z-10"
                  style={{
                    width: 28,
                    height: 28,
                    borderLeft: '1px solid rgba(201,168,76,0.2)',
                    borderTop: '1px solid rgba(201,168,76,0.2)',
                    transition: 'border-color 0.4s',
                  }}
                />
                <span
                  className="cat-corner absolute top-0 right-0 z-10"
                  style={{
                    width: 28,
                    height: 28,
                    borderRight: '1px solid rgba(201,168,76,0.2)',
                    borderTop: '1px solid rgba(201,168,76,0.2)',
                    transition: 'border-color 0.4s',
                  }}
                />
                <span
                  className="cat-corner absolute bottom-0 left-0 z-10"
                  style={{
                    width: 28,
                    height: 28,
                    borderLeft: '1px solid rgba(201,168,76,0.2)',
                    borderBottom: '1px solid rgba(201,168,76,0.2)',
                    transition: 'border-color 0.4s',
                  }}
                />
                <span
                  className="cat-corner absolute bottom-0 right-0 z-10"
                  style={{
                    width: 28,
                    height: 28,
                    borderRight: '1px solid rgba(201,168,76,0.2)',
                    borderBottom: '1px solid rgba(201,168,76,0.2)',
                    transition: 'border-color 0.4s',
                  }}
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
