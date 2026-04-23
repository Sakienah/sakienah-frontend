'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart as apiClearCart,
  type CartItemResponse,
  type CartResponse,
} from '@/lib/api';

export type CartItem = {
  product: CartItemResponse['product'];
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  loading: boolean;
  addItem: (productId: string) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  wishlist: Set<string>;
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

type CartData = { items: CartItem[]; totalItems: number; totalPrice: number };
const emptyCartData: CartData = { items: [], totalItems: 0, totalPrice: 0 };

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [cartData, setCartData] = useState<CartData>(emptyCartData);
  const [loading, setLoading] = useState(true);

  const [wishlist, setWishlist] = useState<Set<string>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const saved = localStorage.getItem('wishlist');
      return saved ? new Set<string>(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  function applyCart(data: CartResponse) {
    setCartData({
      items: data.items.map((i) => ({ product: i.product, quantity: i.quantity })),
      totalItems: data.totalItems,
      totalPrice: parseFloat(data.subtotal),
    });
  }

  useEffect(() => {
    if (authLoading) return;
    getCart()
      .then(applyCart)
      .finally(() => setLoading(false));
  }, [user, authLoading]);

  const addItem = useCallback(async (productId: string) => {
    const data = await addToCart(productId);
    applyCart(data);
  }, []);

  const removeItem = useCallback(async (productId: string) => {
    const data = await removeCartItem(productId);
    applyCart(data);
  }, []);

  const updateQuantity = useCallback(async (productId: string, quantity: number) => {
    const data = await updateCartItem(productId, quantity);
    applyCart(data);
  }, []);

  const clearCart = useCallback(async () => {
    const data = await apiClearCart();
    applyCart(data);
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
      } else {
        next.add(productId);
      }
      return next;
    });
  }, []);

  const isWishlisted = useCallback((productId: string) => wishlist.has(productId), [wishlist]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify([...wishlist]));
  }, [wishlist]);

  return (
    <CartContext.Provider
      value={{
        ...cartData,
        loading,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        isWishlisted,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
