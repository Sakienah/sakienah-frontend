'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Heart, User } from 'lucide-react';
import { AnnouncementBar } from './AnnouncementBar';
import { CartPreview } from '@/components/ui/CartPreview';
import { LoginPreview } from '@/components/ui/LoginPreview';
import { useCart } from '@/contexts/CartContext';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { totalItems } = useCart();

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
        <div className="flex items-center gap-4">
          <button
            aria-label="Favorieten"
            className="text-black/70 hover:text-black transition-colors"
          >
            <Heart size={20} />
          </button>
          <div className="relative flex items-center">
            <button
              aria-label="Winkelmandje"
              onClick={() => setCartOpen((v) => !v)}
              className="relative text-black/70 hover:text-black transition-colors"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-black text-white text-[9px] font-bold rounded-full flex items-center justify-center leading-none">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </button>
            {cartOpen && <CartPreview onClose={() => setCartOpen(false)} />}
          </div>
          <div className="relative flex items-center">
            <button
              aria-label="Inloggen"
              onClick={() => setLoginOpen((v) => !v)}
              className="text-black/70 hover:text-black transition-colors"
            >
              <User size={20} />
            </button>
            {loginOpen && <LoginPreview onClose={() => setLoginOpen(false)} />}
          </div>
        </div>
      </div>
      <AnnouncementBar />
    </header>
  );
}
