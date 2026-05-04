'use client';

import { createContext, useContext, useState, useCallback, useRef } from 'react';

/**
 * Een eenvoudige toast-melding die getoond wordt na een conversie-actie
 * zoals het toevoegen van een product aan de winkelwagen of favorieten.
 */
export type ToastData = {
  id: number;
  message: string;
  type: 'success' | 'info';
  /** Productnaam voor in de meldingstekst */
  productName?: string;
  /** Afbeeldings-URL voor thumbnail in de toast */
  productImage?: string;
};

type ToastContextValue = {
  toasts: ToastData[];
  /** Toon een succesvolle 'toegevoegd aan winkelwagen'-melding */
  showAddedToast: (productName: string, productImage?: string) => void;
  /** Toon een favorieten-toast */
  showWishlistToast: (productName: string, added: boolean) => void;
  removeToast: (id: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

let nextId = 0;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const addToast = useCallback(
    (data: Omit<ToastData, 'id'>) => {
      const id = ++nextId;
      setToasts((prev) => [...prev.slice(-2), { ...data, id }]); // Max 3 tegelijk
      const timer = setTimeout(() => removeToast(id), 3500);
      timersRef.current.set(id, timer);
    },
    [removeToast],
  );

  const showAddedToast = useCallback(
    (productName: string, productImage?: string) => {
      addToast({
        message: `"${productName}" is toegevoegd aan je winkelwagen`,
        type: 'success',
        productName,
        productImage,
      });
    },
    [addToast],
  );

  const showWishlistToast = useCallback(
    (productName: string, added: boolean) => {
      addToast({
        message: added
          ? `"${productName}" toegevoegd aan favorieten`
          : `"${productName}" verwijderd uit favorieten`,
        type: 'info',
        productName,
      });
    },
    [addToast],
  );

  return (
    <ToastContext.Provider value={{ toasts, showAddedToast, showWishlistToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
}
