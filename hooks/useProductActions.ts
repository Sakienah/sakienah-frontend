'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

export function useProductActions(productId: string) {
  const [added, setAdded] = useState(false);
  const { addItem, toggleWishlist, isWishlisted } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleAddToCart = useCallback(async () => {
    if (!user) {
      router.push('/login');
      return;
    }
    await addItem(productId);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }, [user, router, addItem, productId]);

  const handleToggleWishlist = useCallback(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    toggleWishlist(productId);
  }, [user, router, toggleWishlist, productId]);

  return {
    added,
    wishlisted: isWishlisted(productId),
    handleAddToCart,
    handleToggleWishlist,
  };
}
