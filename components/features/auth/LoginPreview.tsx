'use client';

import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

type Props = {
  onClose: () => void;
};

export function LoginPreview({ onClose }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
      className="absolute right-0 top-full mt-3 w-72 bg-white border border-zinc-100 shadow-xl rounded-2xl overflow-hidden z-50"
    >
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100">
        <span className="font-display text-base font-semibold text-black">Inloggen</span>
        <button onClick={onClose} className="text-zinc-400 hover:text-black transition-colors">
          <X size={16} />
        </button>
      </div>

      <form onSubmit={(e) => e.preventDefault()} className="px-5 py-5 flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] tracking-widest uppercase text-zinc-400">E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jouw@email.nl"
            className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm text-black placeholder-zinc-300 focus:outline-none focus:border-black transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] tracking-widest uppercase text-zinc-400">Wachtwoord</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-zinc-200 rounded-lg px-3 py-2 text-sm text-black placeholder-zinc-300 focus:outline-none focus:border-black transition-colors"
          />
        </div>
        <a
          href="/forgot-password"
          className="text-[10px] tracking-wide text-zinc-400 hover:text-black transition-colors self-end -mt-1"
        >
          Wachtwoord vergeten?
        </a>
        <button
          type="submit"
          className="w-full bg-black text-white text-xs tracking-widest uppercase py-3 rounded-xl hover:bg-zinc-800 transition-colors mt-1"
        >
          Inloggen
        </button>
        <p className="text-xs text-center text-zinc-400 mt-1">
          Nog geen account?{' '}
          <a
            href="/register"
            className="text-black underline underline-offset-2 hover:text-zinc-600 transition-colors"
          >
            Registreer
          </a>
        </p>
      </form>
    </div>
  );
}
