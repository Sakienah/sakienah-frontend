'use client';

import { useState, useCallback } from 'react';

export function useDiscountCode(code: string) {
  const [copied, setCopied] = useState(false);

  const copyCode = useCallback(async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return { copied, copyCode };
}
