const StarIcon = () => (
  <svg className="w-3 h-3 fill-gold" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const products = [
  { name: 'Premium Gebedskleed', price: '€ 49,95', rating: 5, reviews: 124, badge: 'Best Seller' },
  { name: 'Koran Standaard Walnoot', price: '€ 39,95', rating: 5, reviews: 87, badge: 'Nieuw' },
  { name: 'Gebedsset Cadeau Box', price: '€ 79,95', rating: 5, reviews: 63, badge: null },
  { name: 'Islamitische Wanddecoratie', price: '€ 24,95', rating: 4, reviews: 45, badge: null },
  { name: 'Gebedskralen Premium', price: '€ 19,95', rating: 5, reviews: 98, badge: 'Best Seller' },
  { name: 'Jubbah Heren — Wit', price: '€ 59,95', rating: 5, reviews: 72, badge: null },
];

export function BestsellersSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[10px] tracking-[0.24em] uppercase text-gold font-semibold mb-2">
              Collectie
            </p>
            <h2 className="font-display text-4xl font-semibold text-black">Meest Gekocht</h2>
          </div>
          <a
            href="/shop"
            className="text-xs tracking-widest uppercase text-zinc-400 hover:text-gold transition-colors hidden md:block"
          >
            Bekijk alles →
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {products.map((product) => (
            <div key={product.name} className="group cursor-pointer">
              <div className="relative bg-[#FAF7F2] rounded-xl aspect-[3/4] mb-4 overflow-hidden">
                {product.badge && (
                  <span className="absolute top-3 left-3 z-10 bg-black text-gold text-[9px] tracking-widest uppercase px-2.5 py-1">
                    {product.badge}
                  </span>
                )}
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-zinc-300 text-xs font-sans">Productfoto</span>
                </div>
                <button className="absolute bottom-0 left-0 right-0 bg-black text-gold text-[10px] tracking-widest uppercase py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                  + Voeg toe
                </button>
              </div>
              <div className="flex items-center gap-1 mb-1">
                {Array.from({ length: product.rating }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
                {Array.from({ length: 5 - product.rating }).map((_, i) => (
                  <svg
                    key={i}
                    className="w-3 h-3 fill-zinc-200"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-[10px] text-zinc-400 ml-1">({product.reviews})</span>
              </div>
              <p className="text-sm text-black font-medium mb-0.5">{product.name}</p>
              <p className="text-sm text-gold font-semibold">{product.price}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a
            href="/shop"
            className="text-xs tracking-widest uppercase text-zinc-400 hover:text-gold transition-colors"
          >
            Bekijk alles →
          </a>
        </div>
      </div>
    </section>
  );
}
