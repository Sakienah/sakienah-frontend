const items = [
  { icon: '🚚', title: 'Gratis verzending', subtitle: 'v.a. € 50' },
  { icon: '↩', title: '30 dagen retour', subtitle: 'Geen gedoe' },
  { icon: '🔒', title: 'Veilig betalen', subtitle: 'iDEAL & meer' },
  { icon: '⭐', title: 'Premium garantie', subtitle: 'Op elk product' },
];

export function TrustBar() {
  return (
    <section className="bg-white py-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map(({ icon, title, subtitle }) => (
            <div key={title} className="flex flex-col items-center text-center gap-2">
              <span className="text-2xl">{icon}</span>
              <p className="text-white text-xs font-semibold tracking-wide font-sans">{title}</p>
              <p className="text-gold text-[10px] tracking-widest uppercase font-sans">
                {subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
