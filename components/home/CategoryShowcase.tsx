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
      description: 'Handgemaakte gebedskleden van premium kwaliteit',
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

      <style>{`
        .cat-card { transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.5s ease; }
        .cat-card:hover { transform: translateY(-8px); box-shadow: 0 32px 64px rgba(0,0,0,0.15); }
        .cat-card:hover .cat-bg { transform: scale(1.12); }
        .cat-card:hover .cat-arabic { color: rgba(255,255,255,0.12) !important; transform: translate(-50%,-50%) scale(1.1); }
        .cat-card:hover .cat-corner { opacity: 1 !important; }
        .cat-card:hover .cat-cta { letter-spacing: 0.22em; color: #d4af37; }
        .cat-card:hover .cat-glow { opacity: 1; }
        .cat-card:hover .cat-image-overlay { opacity: 0.4; }
        
        .cat-corner { opacity: 0.5; transition: opacity 0.4s; }
        .cat-glow { opacity: 0; transition: opacity 0.5s; }
        .cat-cta { transition: letter-spacing 0.3s, color 0.3s; }
        .cat-bg { transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1); }
        .cat-arabic { transition: color 0.5s, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1); }
        .cat-image-overlay { transition: opacity 0.5s; }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .cat-shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.15) 50%, transparent 100%);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
          pointer-events: none;
        }
      `}</style>

      <div className="max-w-[1280px] mx-auto relative z-10">
        <div className="text-center mb-14">
          <span
            className="inline-block font-arabic text-gold mb-3"
            style={{ fontSize: 28, direction: 'rtl', opacity: 0.7 }}
          >
            اكتشف
          </span>
          <p
            className="uppercase font-semibold text-gold"
            style={{
              fontSize: 'var(--text-xs)',
              letterSpacing: '0.22em',
              marginBottom: 10,
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
          <div
            className="mx-auto mt-4"
            style={{
              width: 60,
              height: 2,
              background: 'linear-gradient(90deg, transparent, #c9a84c, transparent)',
            }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <Link key={cat.slug} href={`/shop?category=${cat.slug}`} className="no-underline group">
              <div
                className="cat-card relative overflow-hidden cat-shimmer"
                style={{
                  minHeight: 'clamp(420px, 55vw, 560px)',
                  border: '1px solid rgba(201,168,76,0.2)',
                }}
              >
                <div
                  className="cat-bg absolute inset-0"
                  style={{
                    backgroundImage: `url(${cat.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />

                <div
                  className="cat-image-overlay absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)',
                  }}
                />

                <div
                  className="cat-glow absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 70%)',
                    boxShadow: 'inset 0 0 80px rgba(201,168,76,0.05)',
                  }}
                />

                <span
                  className="cat-arabic font-arabic select-none pointer-events-none absolute hidden md:block"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%,-50%)',
                    fontSize: 'clamp(4rem, 10vw, 8rem)',
                    color: 'rgba(255, 255, 255, 0.4)',
                    lineHeight: 1,
                    direction: 'rtl',
                  }}
                >
                  {cat.arabic}
                </span>

                <div
                  className="absolute bottom-0 left-0 right-0 z-10 text-center"
                  style={{
                    padding: 'clamp(28px, 5vw, 48px) clamp(20px, 4vw, 36px)',
                  }}
                >
                  <div
                    className="inline-block mb-4"
                    style={{
                      width: 1,
                      height: 30,
                      background: 'linear-gradient(180deg, rgba(201,168,76,0.8), transparent)',
                    }}
                  />

                  <h3
                    className="font-display text-white"
                    style={{
                      fontSize: 'clamp(22px, 2.5vw, 28px)',
                      fontWeight: 600,
                      marginBottom: 8,
                      letterSpacing: '-0.01em',
                      textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                    }}
                  >
                    {cat.name}
                  </h3>

                  <p
                    style={{
                      fontSize: 'clamp(12px, 1.3vw, 14px)',
                      color: 'rgba(255,255,255,0.75)',
                      lineHeight: 1.6,
                      marginBottom: 20,
                      maxWidth: 240,
                      margin: '0 auto 20px',
                    }}
                  >
                    {cat.description}
                  </p>

                  <span
                    className="cat-cta uppercase font-bold text-gold"
                    style={{
                      fontSize: 10,
                      letterSpacing: '0.15em',
                      display: 'inline-block',
                    }}
                  >
                    Bekijk collectie →
                  </span>
                </div>

                <span
                  className="cat-corner absolute"
                  style={{
                    top: 16,
                    left: 16,
                    width: 32,
                    height: 32,
                    borderLeft: '2px solid #c9a84c',
                    borderTop: '2px solid #c9a84c',
                  }}
                />
                <span
                  className="cat-corner absolute"
                  style={{
                    top: 16,
                    right: 16,
                    width: 32,
                    height: 32,
                    borderRight: '2px solid #c9a84c',
                    borderTop: '2px solid #c9a84c',
                  }}
                />
                <span
                  className="cat-corner absolute"
                  style={{
                    bottom: 16,
                    left: 16,
                    width: 32,
                    height: 32,
                    borderLeft: '2px solid #c9a84c',
                    borderBottom: '2px solid #c9a84c',
                  }}
                />
                <span
                  className="cat-corner absolute"
                  style={{
                    bottom: 16,
                    right: 16,
                    width: 32,
                    height: 32,
                    borderRight: '2px solid #c9a84c',
                    borderBottom: '2px solid #c9a84c',
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
