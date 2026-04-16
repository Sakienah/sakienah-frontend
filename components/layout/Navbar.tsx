'use client';

import { useState, useEffect } from 'react';
import { Button } from '../ui/Button';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <span className="font-display text-xl font-semibold text-black">Sakienah</span>
        <nav className="hidden md:flex gap-8">
          {['Over ons', 'Product', 'Contact'].map((link) => (
            <a
              key={link}
              href="#"
              className="text-xs tracking-widest uppercase text-black/70 hover:text-black transition-colors"
            >
              {link}
            </a>
          ))}
        </nav>
        <Button variant="primary" className="text-xs py-2">
          Bestel nu
        </Button>
      </div>
    </header>
  );
}
