'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

function formatPrice(amount: number) {
  return `€ ${amount.toFixed(2).replace('.', ',')}`;
}

type Props = {
  onClose: () => void;
};

export function CartPreview({ onClose }: Props) {
  const { items, totalItems, totalPrice, removeItem, updateQuantity } = useCart();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-3 w-80 bg-white border border-zinc-100 shadow-xl rounded-2xl overflow-hidden z-50"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
        <span className="font-display text-base font-semibold text-black">
          Winkelmandje{' '}
          {totalItems > 0 && <span className="text-zinc-400 font-normal">({totalItems})</span>}
        </span>
        <button onClick={onClose} className="text-zinc-400 hover:text-black transition-colors">
          <X size={16} />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <ShoppingBag size={32} className="text-zinc-200 mb-3" />
          <p className="text-sm text-zinc-400">Je winkelmandje is leeg</p>
        </div>
      ) : (
        <>
          <ul className="divide-y divide-zinc-50 max-h-72 overflow-y-auto">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex gap-3 px-5 py-4">
                <div className="w-14 h-14 rounded-lg bg-[#FAF7F2] flex-shrink-0 overflow-hidden relative">
                  {product.images[0] ? (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  ) : (
                    <div className="w-full h-full" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-black truncate">{product.name}</p>
                  <p className="text-xs text-[#B8975A] font-semibold mt-0.5">
                    {formatPrice(parseFloat(product.price))}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-5 h-5 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-500 hover:border-black hover:text-black transition-colors"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="text-xs font-medium w-4 text-center">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-5 h-5 flex items-center justify-center rounded-full border border-zinc-200 text-zinc-500 hover:border-black hover:text-black transition-colors"
                    >
                      <Plus size={10} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(product.id)}
                  className="text-zinc-300 hover:text-black transition-colors self-start mt-0.5"
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>

          <div className="px-5 py-4 border-t border-zinc-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs tracking-widest uppercase text-zinc-400">Subtotaal</span>
              <span className="text-sm font-semibold text-black">{formatPrice(totalPrice)}</span>
            </div>
            <a
              href="/checkout"
              className="block w-full bg-black text-white text-xs tracking-widest uppercase text-center py-3 rounded-xl hover:bg-zinc-800 transition-colors"
            >
              Afrekenen
            </a>
            <a
              href="/cart"
              className="block w-full text-xs tracking-widest uppercase text-center py-2 mt-2 text-zinc-400 hover:text-black transition-colors"
            >
              Bekijk winkelmandje
            </a>
          </div>
        </>
      )}
    </div>
  );
}
