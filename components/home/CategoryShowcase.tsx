import Link from 'next/link';
import { GeomPattern } from '@/components/ui/GeomPattern';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';

const categories = [
  {
    slug: 'gebedskleed',
    name: 'Gebedskleden',
    description: 'Handgemaakte gebedskleden van premium kwaliteit',
    arabic: 'صلاة',
    image: '/brand_assets/categories/gebedkleed.webp',
    large: true,
  },
  {
    slug: 'koran-accessoires',
    name: 'Koran Accessoires',
    description: 'Rehals, boekensteunen en meer',
    arabic: 'قرآن',
    image: '/brand_assets/categories/korantafel.webp',
    large: false,
  },
  {
    slug: 'deals',
    name: 'Deals',
    description: 'Voordelige combinaties met korting',
    arabic: 'عرض',
    image: '/brand_assets/categories/deals.webp',
    large: false,
  },
];

export function CategoryShowcase() {
  return (
    <section
      className="relative overflow-hidden bg-[#FAF7F2]"
      style={{
        paddingTop: 'var(--section-py)',
        paddingBottom: 'var(--section-py)',
        paddingLeft: 'clamp(1rem, 5vw, 2.5rem)',
        paddingRight: 'clamp(1rem, 5vw, 2.5rem)',
      }}
    >
      <GeomPattern flip />

      <style>{`
        .cat-card { transition: transform 0.5s var(--ease-out-strong), box-shadow 0.5s ease; }
        @media (hover: hover) and (pointer: fine) {
          .cat-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-floating); }
          .cat-card:hover .cat-bg { transform: scale(1.08); }
          .cat-card:hover .cat-frame { opacity: 1; }
          .cat-card:hover .cat-cta { letter-spacing: 0.22em; color: #d4af37; }
          .cat-card:hover .cat-image-overlay { opacity: 0.45; }
        }
        .cat-frame { opacity: 0; transition: opacity 0.4s; }
        .cat-bg { transition: transform 0.8s var(--ease-out-strong); }
        .cat-image-overlay { transition: opacity 0.5s; }
      `}</style>

      <div className="max-w-[1280px] mx-auto relative z-10">
        <Reveal>
          <SectionHeader eyebrow="Collecties" heading="Ontdek onze collecties" />
        </Reveal>

        <div
          className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6"
          style={{ minHeight: 'clamp(480px, 60vw, 620px)' }}
        >
          <Reveal className="h-full">
            <CategoryCard cat={categories[0]} tall />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 h-full">
            <Reveal delay={0.08} className="h-full">
              <CategoryCard cat={categories[1]} />
            </Reveal>
            <Reveal delay={0.16} className="h-full">
              <CategoryCard cat={categories[2]} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ cat, tall = false }: { cat: (typeof categories)[number]; tall?: boolean }) {
  return (
    <Link href={`/shop?category=${cat.slug}`} className="no-underline group block h-full">
      <div
        className="cat-card relative overflow-hidden h-full"
        style={{ minHeight: tall ? 'clamp(480px, 60vw, 620px)' : 'clamp(220px, 28vw, 300px)' }}
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
            background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.7) 100%)',
          }}
        />

        <span
          className="font-arabic select-none pointer-events-none absolute hidden md:block"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,-50%)',
            fontSize: tall ? 'clamp(4rem, 9vw, 7.5rem)' : 'clamp(2.5rem, 5vw, 4rem)',
            color: 'rgba(255, 255, 255, 0.35)',
            lineHeight: 1,
            direction: 'rtl',
          }}
        >
          {cat.arabic}
        </span>

        {/* Gold frame, revealed on hover only */}
        <div
          className="cat-frame absolute"
          style={{ inset: 10, border: '1px solid rgba(201,168,76,0.6)', pointerEvents: 'none' }}
        />

        <div
          className="absolute bottom-0 left-0 right-0 z-10 text-center"
          style={{ padding: tall ? 'clamp(28px, 5vw, 48px) clamp(20px, 4vw, 36px)' : '24px 20px' }}
        >
          <h3
            className="font-display text-white"
            style={{
              fontSize: tall ? 'clamp(22px, 2.5vw, 28px)' : 'clamp(18px, 2vw, 22px)',
              fontWeight: 600,
              marginBottom: 6,
              letterSpacing: '-0.01em',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            {cat.name}
          </h3>

          {tall && (
            <p
              style={{
                fontSize: 'clamp(12px, 1.3vw, 14px)',
                color: 'rgba(255,255,255,0.75)',
                lineHeight: 1.6,
                marginBottom: 16,
                maxWidth: 240,
                margin: '0 auto 16px',
              }}
            >
              {cat.description}
            </p>
          )}

          <span
            className="cat-cta uppercase font-bold text-gold"
            style={{
              fontSize: 10,
              letterSpacing: '0.15em',
              display: 'inline-block',
              transition: 'letter-spacing 0.3s, color 0.3s',
            }}
          >
            Bekijk collectie →
          </span>
        </div>
      </div>
    </Link>
  );
}
