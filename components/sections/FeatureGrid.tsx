import Image from 'next/image';
import { SectionTitle } from '../ui/SectionTitle';

const leftFeatures = [
  {
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
];

const rightFeatures = [
  {
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
  align,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  align: 'left' | 'right';
}) {
  return (
    <div
      className={`flex items-start gap-4 ${align === 'right' ? 'flex-row-reverse text-right' : ''}`}
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
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          title="Waarom Sakienah"
          subtitle="Elk detail is doordacht om jouw gebedsmoment zo comfortabel mogelijk te maken."
        />
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-center">
          {/* Left features */}
          <div className="flex flex-col gap-10">
            {leftFeatures.map((f) => (
              <FeatureItem key={f.title} {...f} align="left" />
            ))}
          </div>

          {/* Center product image */}
          <div className="hidden md:flex items-center justify-center px-8">
            <div className="bg-zinc-50 rounded-2xl overflow-hidden">
              <Image
                src="/images/aa.avif"
                alt="Sakienah product"
                width={224}
                height={300}
                className="object-cover rounded-2xl"
              />
            </div>
          </div>

          {/* Right features */}
          <div className="flex flex-col gap-10">
            {rightFeatures.map((f) => (
              <FeatureItem key={f.title} {...f} align="right" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
