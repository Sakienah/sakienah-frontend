const categories = [
  {
    name: 'Gebedskleding',
    description: 'Jubbahs, abayas & sets',
    href: '/categorie/gebedskleding',
    dark: true,
  },
  {
    name: 'Koran Accessoires',
    description: 'Tafels, houders & covers',
    href: '/categorie/koran-accessoires',
    dark: false,
  },
  {
    name: 'Islamitisch Decor',
    description: 'Wanddecoratie & kalligrafie',
    href: '/categorie/decor',
    dark: false,
  },
  {
    name: 'Cadeau Sets',
    description: 'Ramadan & Eid geschenken',
    href: '/categorie/cadeau-sets',
    dark: true,
  },
];

export function CategoryPreview() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <p className="text-[10px] tracking-[0.24em] uppercase text-gold font-semibold mb-2">
            Collectie
          </p>
          <h2 className="font-display text-4xl font-semibold text-black">Ontdek de categorieën</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {categories.map(({ name, description, href, dark }) => (
            <a
              key={name}
              href={href}
              className={`group relative rounded-2xl overflow-hidden min-h-[180px] md:min-h-[240px] flex flex-col justify-end p-6 md:p-8 transition-transform duration-300 hover:scale-[1.01] ${
                dark ? 'bg-black' : 'bg-[#FAF7F2]'
              }`}
            >
              <div
                className={`absolute inset-0 flex items-center justify-center text-6xl opacity-5 select-none ${dark ? 'text-gold' : 'text-black'}`}
              >
                ✦
              </div>
              <p
                className={`text-[10px] tracking-[0.2em] uppercase font-semibold mb-1 font-sans ${dark ? 'text-gold' : 'text-gold'}`}
              >
                {name}
              </p>
              <p className={`text-sm font-sans ${dark ? 'text-zinc-400' : 'text-zinc-500'}`}>
                {description}{' '}
                <span className="group-hover:ml-1 transition-all duration-200">→</span>
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
