'use client';

import { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart as apiClearCart,
  getFavorites,
  toggleFavorite,
  getProductById,
  type CartItemResponse,
  type CartResponse,
} from '@/lib/api';
import {
  getLocalCart,
  addToLocalCart,
  updateLocalCart,
  removeFromLocalCart,
  clearLocalCart,
} from '@/lib/local-cart';

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
  removeItem: (productId: string, selectedColor?: string | null) => Promise<void>;
  updateQuantity: (
    productId: string,
    quantity: number,
    selectedColor?: string | null,
  ) => Promise<void>;
  clearCart: () => Promise<void>;
  wishlist: Map<string, string | null>;
  toggleWishlist: (productId: string, selectedColor?: string | null) => void;
  isWishlisted: (productId: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

type CartData = { items: CartItem[]; totalItems: number; totalPrice: number };
const emptyCartData: CartData = { items: [], totalItems: 0, totalPrice: 0 };

async function resolveLocalCart(): Promise<CartData> {
  const localItems = getLocalCart();
  if (localItems.length === 0) return emptyCartData;

  const products = await Promise.all(
    localItems.map((item) => getProductById(item.productId).catch(() => null)),
  );

  const items: CartItem[] = localItems
    .map((item, i) =>
      products[i]
        ? { product: products[i]!, quantity: item.quantity, selectedColor: item.selectedColor }
        : null,
    )
    .filter((x): x is CartItem => x !== null);

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + Number(i.product.price) * i.quantity, 0);
  return { items, totalItems, totalPrice };
}

function applyCartResponse(data: CartResponse): CartData {
  return {
    items: data.items.map((i) => ({
      product: i.product,
      quantity: i.quantity,
      selectedColor: i.selectedColor,
    })),
    totalItems: data.totalItems,
    totalPrice: parseFloat(data.subtotal),
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [cartData, setCartData] = useState<CartData>(emptyCartData);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<Map<string, string | null>>(new Map());
  const prevUserRef = useRef(user);

  useEffect(() => {
    const wasLoggedOut = prevUserRef.current === null;
    prevUserRef.current = user;

    async function loadCart() {
      setLoading(true);
      try {
        if (!user) {
          setCartData(await resolveLocalCart());
        } else {
          // Merge any local cart from before login
          if (wasLoggedOut) {
            const localItems = getLocalCart();
            if (localItems.length > 0) {
              await Promise.all(
                localItems.map((item) =>
                  addToCart(item.productId, item.quantity, item.selectedColor).catch(() => null),
                ),
              );
              clearLocalCart();
            }
          }
          setCartData(applyCartResponse(await getCart()));
        }
      } finally {
        setLoading(false);
      }
    }

    void loadCart();

    if (user) {
      getFavorites()
        .then((items) => setWishlist(new Map(items.map((f) => [f.productId, f.selectedColor]))))
        .catch(() => setWishlist(new Map()));
    } else {
      setWishlist(new Map());
    }
  }, [user]);

  const addItem = useCallback(
    async (productId: string, selectedColor?: string | null) => {
      if (!user) {
        addToLocalCart(productId, 1, selectedColor ?? null);
        setCartData(await resolveLocalCart());
      } else {
        setCartData(applyCartResponse(await addToCart(productId, 1, selectedColor)));
      }
    },
    [user],
  );

  const removeItem = useCallback(
    async (productId: string, selectedColor?: string | null) => {
      if (!user) {
        removeFromLocalCart(productId, selectedColor ?? null);
        setCartData(await resolveLocalCart());
      } else {
        setCartData(applyCartResponse(await removeCartItem(productId, selectedColor)));
      }
    },
    [user],
  );

  const updateQuantity = useCallback(
    async (productId: string, quantity: number, selectedColor?: string | null) => {
      if (!user) {
        updateLocalCart(productId, quantity, selectedColor ?? null);
        setCartData(await resolveLocalCart());
      } else {
        setCartData(applyCartResponse(await updateCartItem(productId, quantity, selectedColor)));
      }
    },
    [user],
  );

  const clearCart = useCallback(async () => {
    if (!user) {
      clearLocalCart();
      setCartData(emptyCartData);
    } else {
      setCartData(applyCartResponse(await apiClearCart()));
    }
  }, [user]);

  const toggleWishlist = useCallback(
    (productId: string, selectedColor?: string | null) => {
      if (!user) return;
      setWishlist((prev) => {
        const next = new Map(prev);
        if (next.has(productId)) next.delete(productId);
        else next.set(productId, selectedColor ?? null);
        return next;
      });
      void toggleFavorite(productId, selectedColor)
        .then((items) => setWishlist(new Map(items.map((f) => [f.productId, f.selectedColor]))))
        .catch(() => {
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
