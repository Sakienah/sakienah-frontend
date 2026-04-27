import Image from 'next/image';
import { GeomPattern } from '@/components/ui/GeomPattern';
import { SectionTitle } from '../ui/SectionTitle';

const features = [
  {
    position: 'top' as const,
    title: 'Ergonomische rugsteun',
    description: 'Speciaal ontworpen voor langdurig gebed — geen pijnlijke rug meer.',
    icon: (
      <svg
        className="w-6 h-6 text-gold"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 3v18M5 8h14M5 16h14"
        />
      </svg>
    ),
  },
  {
    position: 'left' as const,
    title: 'Stabiele Koran-standaard',
    description: 'Houd je Koran op de perfecte leeshoogte, stabiel en elegant.',
    icon: (
      <svg
        className="w-6 h-6 text-gold"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    position: 'right' as const,
    title: 'Premium materiaal',
    description: 'Hoogwaardige stoffen die zachtheid en duurzaamheid combineren.',
    icon: (
      <svg
        className="w-6 h-6 text-gold"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
  {
    position: 'bottom' as const,
    title: 'Compact & draagbaar',
    description: 'Neemt weinig ruimte in — thuis of onderweg altijd bij je.',
    icon: (
      <svg
        className="w-6 h-6 text-gold"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
];

function FeatureItem({
  title,
  description,
  icon,
  position,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  position: 'top' | 'left' | 'right' | 'bottom';
}) {
  const isRight = position === 'right';
  const isCentered = position === 'top' || position === 'bottom';

  return (
    <div
      className={`flex items-center gap-4 bg-[#FAF7F2] border border-gold/15 rounded-2xl px-5 py-6 shadow-sm relative z-[2] ${
        isRight ? 'flex-row' : isCentered ? 'flex-col text-center' : 'flex-row-reverse text-right'
      }`}
    >
      <div className="w-10 h-10 shrink-0 rounded-full bg-gold/10 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="font-display font-semibold text-black text-base">{title}</h3>
        <p className="text-sm text-zinc-500 leading-relaxed mt-1">{description}</p>
      </div>
    </div>
  );
}

export function FeatureGrid() {
  const top = features.find((f) => f.position === 'top')!;
  const left = features.find((f) => f.position === 'left')!;
  const right = features.find((f) => f.position === 'right')!;
  const bottom = features.find((f) => f.position === 'bottom')!;

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <GeomPattern />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <SectionTitle
          title="Waarom Sakienah"
          subtitle="Elk detail is doordacht om jouw gebedsmoment zo comfortabel mogelijk te maken."
        />

        {/* Desktop: cross layout with SVG oval */}
        <div className="hidden md:block">
          <div className="relative mx-auto" style={{ width: 760, height: 680 }}>
            {/* SVG ellipse — behind everything */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 860 580"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <ellipse
                cx="430"
                cy="290"
                rx="360"
                ry="250"
                fill="none"
                stroke="#C9A96E"
                strokeWidth="1.5"
                strokeDasharray="8,5"
                opacity="0.5"
              />
            </svg>

            {/* Top card */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-52">
              <FeatureItem {...top} />
            </div>

            {/* Left card */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-52">
              <FeatureItem {...left} />
            </div>

            {/* Centre image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1]">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/aa.avif"
                  alt="Sakienah product"
                  width={160}
                  height={210}
                  className="object-cover rounded-2xl"
                />
              </div>
            </div>

            {/* Right card */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-52">
              <FeatureItem {...right} />
            </div>

            {/* Bottom card */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-52">
              <FeatureItem {...bottom} />
            </div>
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="md:hidden flex flex-col items-center gap-4 mt-8">
          <div className="w-full max-w-sm">
            <FeatureItem {...top} />
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/images/aa.avif"
              alt="Sakienah product"
              width={160}
              height={210}
              className="object-cover rounded-2xl"
            />
          </div>
          <div className="w-full max-w-sm">
            <FeatureItem {...left} />
          </div>
          <div className="w-full max-w-sm">
            <FeatureItem {...right} />
          </div>
          <div className="w-full max-w-sm">
            <FeatureItem {...bottom} />
          </div>
        </div>
      </div>
    </section>
  );
}
