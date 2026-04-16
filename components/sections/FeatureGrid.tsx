import { SectionTitle } from '../ui/SectionTitle';

const features = [
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

export function FeatureGrid() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <SectionTitle
          title="Waarom Sakienah"
          subtitle="Elk detail is doordacht om jouw gebedsmoment zo comfortabel mogelijk te maken."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex flex-col gap-4 p-6 border border-zinc-100 rounded-xl hover:border-gold/40 hover:shadow-sm transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                {f.icon}
              </div>
              <h3 className="font-display text-lg font-semibold text-black">{f.title}</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
