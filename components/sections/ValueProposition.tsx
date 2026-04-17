const GEOMETRIC_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23c9a84c' stroke-width='0.4' opacity='0.22'%3E%3Cpath d='M30 5 L55 30 L30 55 L5 30 Z'/%3E%3Cpath d='M30 15 L45 30 L30 45 L15 30 Z'/%3E%3C/g%3E%3C/svg%3E")`;

const values = [
  {
    icon: '🌙',
    title: 'Islamitisch gecureerd',
    description:
      'Elk product zorgvuldig geselecteerd met aandacht voor islamitische waarden en kwaliteit.',
  },
  {
    icon: '✦',
    title: 'Premium kwaliteit',
    description:
      'Duurzame materialen en vakmanschap — producten gemaakt om generaties mee te gaan.',
  },
  {
    icon: '🎁',
    title: 'Perfect cadeau',
    description:
      'Voor Ramadan, Eid of gewoon zomaar — elk product mooi verpakt en klaar om te geven.',
  },
];

export function ValueProposition() {
  return (
    <section
      className="py-20 bg-[#FAF7F2]"
      style={{ backgroundImage: GEOMETRIC_PATTERN, backgroundSize: '60px 60px' }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-[10px] tracking-[0.24em] uppercase text-gold font-semibold mb-3">
            Waarom Sakienah
          </p>
          <h2 className="font-display text-4xl font-semibold text-black">Kwaliteit met intentie</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {values.map(({ icon, title, description }) => (
            <div
              key={title}
              className="bg-white/70 backdrop-blur-sm border border-gold/15 rounded-2xl px-8 py-10 text-center"
            >
              <div className="text-3xl mb-5">{icon}</div>
              <div className="flex items-center gap-2 justify-center mb-3">
                <span className="w-5 h-px bg-gold opacity-60" />
                <span
                  className="w-[5px] h-[5px] bg-gold opacity-80"
                  style={{ transform: 'rotate(45deg)' }}
                />
                <span className="w-5 h-px bg-gold opacity-60" />
              </div>
              <h3 className="font-display text-xl font-semibold text-black mb-3">{title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed font-sans">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
