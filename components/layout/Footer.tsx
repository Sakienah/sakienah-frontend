export function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-100 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-display text-lg font-semibold text-black">Sakienah</span>
        <nav className="flex gap-8">
          {['Over ons', 'Contact', 'Privacy'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs tracking-widest uppercase text-black/50 hover:text-black transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>
        <p className="text-xs text-black/40">© 2026 Sakienah. Alle rechten voorbehouden.</p>
      </div>
    </footer>
  );
}
