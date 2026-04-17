const StarIcon = () => (
  <svg className="w-3 h-3 fill-gold" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const reviews = [
  {
    text: 'Prachtige kwaliteit. Mijn man was erg blij met het cadeau — de verpakking alleen al was geweldig.',
    author: 'Fatima M.',
    product: 'Gebedsset Cadeau Box',
  },
  {
    text: 'Snel geleverd en precies zoals beschreven. Eindelijk een winkel die echt begrijpt wat wij zoeken.',
    author: 'Ahmed K.',
    product: 'Koran Standaard Walnoot',
  },
  {
    text: 'Eindelijk een islamitische winkel met premium producten. Zal zeker vaker bestellen bij Sakienah.',
    author: 'Youssef B.',
    product: 'Premium Gebedskleed',
  },
];

export function SocialProof() {
  return (
    <section className="py-20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.24em] uppercase text-gold font-semibold mb-2">
            Reviews
          </p>
          <h2 className="font-display text-4xl font-semibold text-black">Wat klanten zeggen</h2>
          <div className="flex items-center justify-center gap-1 mt-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <StarIcon key={i} />
            ))}
            <span className="text-xs text-zinc-400 ml-2 font-sans">
              4.9 gemiddeld · 500+ reviews
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map(({ text, author, product }) => (
            <div key={author} className="bg-white border border-gold/15 rounded-2xl p-7">
              <div className="flex gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <StarIcon key={i} />
                ))}
              </div>
              <p className="text-zinc-600 text-sm leading-relaxed font-sans mb-5">
                &ldquo;{text}&rdquo;
              </p>
              <div className="border-t border-zinc-100 pt-4">
                <p className="text-xs font-semibold text-black">{author}</p>
                <p className="text-[10px] text-gold tracking-wide mt-0.5">{product}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
