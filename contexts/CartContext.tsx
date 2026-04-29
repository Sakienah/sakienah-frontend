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
import type { BundleSelection } from '@/types';

export type CartItem = {
  product: CartItemResponse['product'];
  variant: CartItemResponse['variant'];
  quantity: number;
  variantId: string | null;
  selectedColor: string | null;
  bundleSelections: BundleSelection[] | null;
};

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  loading: boolean;
  addItem: (
    productId: string,
    selectedColor?: string | null,
    variantId?: string,
    colorValue?: string,
    bundleSelections?: BundleSelection[],
  ) => Promise<void>;
  removeItem: (
    productId: string,
    selectedColor?: string | null,
    variantId?: string | null,
  ) => Promise<void>;
  updateQuantity: (
    productId: string,
    quantity: number,
    variantId?: string | null,
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

  const items: CartItem[] = localItems.flatMap((item, i) =>
    products[i]
      ? [
          {
            product: products[i]!,
            variant: null as CartItem['variant'],
            quantity: item.quantity,
            variantId: item.variantId,
            selectedColor: item.selectedColor,
            bundleSelections: item.bundleSelections ?? null,
          } satisfies CartItem,
        ]
      : [],
  );

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + Number(i.product.price) * i.quantity, 0);
  return { items, totalItems, totalPrice };
}

function applyCartResponse(data: CartResponse): CartData {
  return {
    items: data.items.map((i) => ({
      product: i.product,
      variant: i.variant,
      quantity: i.quantity,
      variantId: i.variantId,
      selectedColor: i.selectedColor,
      bundleSelections: i.bundleSelections ?? null,
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
          if (wasLoggedOut) {
            const localItems = getLocalCart();
            if (localItems.length > 0) {
              await Promise.all(
                localItems.map((item) =>
                  addToCart(
                    item.productId,
                    item.quantity,
                    item.variantId,
                    item.selectedColor,
                  ).catch(() => null),
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
    async (
      productId: string,
      selectedColor?: string | null,
      variantId?: string,
      colorValue?: string,
      bundleSelections?: BundleSelection[],
    ) => {
      const resolvedColor = colorValue ?? selectedColor ?? null;
      const resolvedVariantId = variantId ?? null;
      if (!user) {
        addToLocalCart(productId, 1, resolvedVariantId, resolvedColor, bundleSelections);
        setCartData(await resolveLocalCart());
      } else {
        setCartData(
          applyCartResponse(
            await addToCart(productId, 1, resolvedVariantId, resolvedColor, bundleSelections),
          ),
        );
      }
    },
    [user],
  );

  const removeItem = useCallback(
    async (productId: string, selectedColor?: string | null, variantId?: string | null) => {
      if (!user) {
        removeFromLocalCart(productId, variantId ?? null, selectedColor ?? null);
        setCartData(await resolveLocalCart());
      } else {
        setCartData(applyCartResponse(await removeCartItem(productId, variantId, selectedColor)));
      }
    },
    [user],
  );

  const updateQuantity = useCallback(
    async (
      productId: string,
      quantity: number,
      variantId?: string | null,
      selectedColor?: string | null,
    ) => {
      if (!user) {
        updateLocalCart(productId, quantity, variantId ?? null, selectedColor ?? null);
        setCartData(await resolveLocalCart());
      } else {
        setCartData(
          applyCartResponse(await updateCartItem(productId, quantity, variantId, selectedColor)),
        );
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
