'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Product, ProductVariant } from '@/types';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';

export function useProductCard(product: Product) {
  const [added, setAdded] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { addItem, toggleWishlist: ctxToggleWishlist, isWishlisted } = useCart();
  const { user } = useAuth();
  const { showAddedToast } = useToast();
  const router = useRouter();

  const wishlisted = isWishlisted(product.id);
  const isBundle = (product.bundleItems ?? []).length > 0;
  const hasVariants = !isBundle && product.variants.length > 0;
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const discountPct = product.comparePrice
    ? Math.round((1 - parseFloat(product.price) / parseFloat(product.comparePrice)) * 100)
    : null;
  const isBestseller = !isOutOfStock && discountPct === null && product.category?.slug !== 'deals';

  const variantImages = selectedVariant?.images.length ? selectedVariant.images : product.images;
  const images = variantImages.length > 0 ? variantImages : product.images;
  const currentImage = images[currentImageIndex] ?? product.images[0];

  const variantOutOfStock = selectedVariant?.stock === 0;
  const canAdd = hasVariants ? selectedVariant !== null && !variantOutOfStock : !isOutOfStock;

  function selectVariant(variant: ProductVariant) {
    setSelectedVariant(variant);
    setCurrentImageIndex(0);
  }

  function navigateImage(dir: number) {
    setCurrentImageIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return images.length - 1;
      if (next >= images.length) return 0;
      return next;
    });
  }

  async function addToCart() {
    if (!canAdd || isOutOfStock) return;
    await addItem(
      product.id,
      selectedVariant?.colorName ?? null,
      selectedVariant?.id,
      selectedVariant?.colorHex ?? undefined,
    );
    setAdded(true);
    showAddedToast(product.name, currentImage);
    setTimeout(() => setAdded(false), 1500);
  }

  function toggleWishlist() {
    if (!user) {
      router.push('/login');
      return;
    }
    ctxToggleWishlist(product.id, selectedVariant?.colorName ?? null);
  }

  return {
    isBundle,
    hasVariants,
    isOutOfStock,
    isLowStock,
    discountPct,
    isBestseller,
    images,
    currentImage,
    currentImageIndex,
    selectedVariant,
    variantOutOfStock,
    canAdd,
    wishlisted,
    added,
    selectVariant,
    navigateImage,
    addToCart,
    toggleWishlist,
  };
}

export type ProductCardState = ReturnType<typeof useProductCard>;
