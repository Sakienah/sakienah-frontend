import Link from 'next/link';
import { GeomPattern } from '@/components/ui/GeomPattern';

/**
 * Toont de drie hoofdcategorieën als visuele kaarten op de homepage,
 * zodat bezoekers snel naar relevante producten kunnen navigeren.
 */
export function CategoryShowcase() {
  const categories = [
    {
      slug: 'gebedskleed',
      name: 'Gebedskleden',
      description: 'Comfortabele gebedskleden voor dagelijks gebruik',
      icon: '🕌',
    },
    {
      slug: 'koran-accessoires',
      name: 'Koran Accessoires',
      description: 'Rehals, boekensteunen en meer',
      icon: '📖',
    },
    {
      slug: 'deals',
      name: 'Deals',
      description: 'Voordelige combinaties met korting',
      icon: '✨',
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
                className="text-center cursor-pointer relative overflow-hidden bg-white transition-transform transition-shadow duration-300 hover:-translate-y-1.5 hover:shadow-lg"
                style={{
                  border: '1px solid #F0EBE3',
                  padding: '32px 24px',
                }}
              >
                {/* Categorie-icoon */}
                <span className="block mb-4" style={{ fontSize: 40 }}>
                  {cat.icon}
                </span>
                <h3
                  className="font-display font-semibold"
                  style={{ fontSize: 20, color: '#0a0a0a', marginBottom: 8 }}
                >
                  {cat.name}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: '#888',
                    lineHeight: 1.6,
                    marginBottom: 16,
                  }}
                >
                  {cat.description}
                </p>
                <span
                  className="uppercase font-bold text-gold"
                  style={{
                    fontSize: 10,
                    letterSpacing: '0.15em',
                  }}
                >
                  Bekijk collectie →
                </span>

                {/* Decoratief gouden hoekje */}
                <span
                  className="absolute top-0 right-0"
                  style={{
                    width: 32,
                    height: 32,
                    borderRight: '1px solid rgba(201,168,76,0.2)',
                    borderTop: '1px solid rgba(201,168,76,0.2)',
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
