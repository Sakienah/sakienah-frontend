'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useAuth } from './AuthContext';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart as apiClearCart,
  getFavorites,
  toggleFavorite,
  type CartItemResponse,
  type CartResponse,
} from '@/lib/api';

export type CartItem = {
  product: CartItemResponse['product'];
  quantity: number;
  selectedColor: string | null;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  loading: boolean;
  addItem: (productId: string, selectedColor?: string | null) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  wishlist: Map<string, string | null>;
  toggleWishlist: (productId: string, selectedColor?: string | null) => void;
  isWishlisted: (productId: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

type CartData = { items: CartItem[]; totalItems: number; totalPrice: number };
const emptyCartData: CartData = { items: [], totalItems: 0, totalPrice: 0 };

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [cartData, setCartData] = useState<CartData>(emptyCartData);
  const [loading, setLoading] = useState(true);

  const [wishlist, setWishlist] = useState<Map<string, string | null>>(new Map());

  function applyCart(data: CartResponse) {
    setCartData({
      items: data.items.map((i) => ({
        product: i.product,
        quantity: i.quantity,
        selectedColor: i.selectedColor,
      })),
      totalItems: data.totalItems,
      totalPrice: parseFloat(data.subtotal),
    });
  }

  useEffect(() => {
    getCart()
      .then(applyCart)
      .finally(() => setLoading(false));
    if (user) {
      getFavorites()
        .then((items) => setWishlist(new Map(items.map((f) => [f.productId, f.selectedColor]))))
        .catch(() => setWishlist(new Map()));
    } else {
      void Promise.resolve().then(() => setWishlist(new Map()));
    }
  }, [user]);

  const addItem = useCallback(async (productId: string, selectedColor?: string | null) => {
    const data = await addToCart(productId, 1, selectedColor);
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

  const toggleWishlist = useCallback(
    (productId: string, selectedColor?: string | null) => {
      if (!user) return;
      // Optimistic update
      setWishlist((prev) => {
        const next = new Map(prev);
        if (next.has(productId)) next.delete(productId);
        else next.set(productId, selectedColor ?? null);
        return next;
      });
      void toggleFavorite(productId, selectedColor)
        .then((items) => setWishlist(new Map(items.map((f) => [f.productId, f.selectedColor]))))
        .catch(() => {
          // Revert on error
          setWishlist((prev) => {
            const next = new Map(prev);
            if (next.has(productId)) next.delete(productId);
            else next.set(productId, selectedColor ?? null);
            return next;
          });
        });
    },
    [user],
  );

  const isWishlisted = useCallback((productId: string) => wishlist.has(productId), [wishlist]);

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
