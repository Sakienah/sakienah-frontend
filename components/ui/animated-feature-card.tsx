'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface AnimatedFeatureCardProps {
  className?: string;
  tag: string;
  title: React.ReactNode;
  description?: string;
  icon: LucideIcon;
  color: 'gold' | 'cream' | 'charcoal';
}

const colorVariants = {
  gold: {
    '--feature-color': '#c9a84c',
    '--feature-color-light': 'rgba(201,168,76,0.22)',
    '--feature-color-soft': 'rgba(201,168,76,0.12)',
    '--feature-text': '#0a0a0a',
    '--feature-bg': '#ffffff',
    '--feature-card-bg': '#ffffff',
  },
  cream: {
    '--feature-color': '#0a0a0a',
    '--feature-color-light': 'rgba(201,168,76,0.28)',
    '--feature-color-soft': 'rgba(250,247,242,0.95)',
    '--feature-text': '#0a0a0a',
    '--feature-bg': '#FAF7F2',
    '--feature-card-bg': '#FAF7F2',
  },
  charcoal: {
    '--feature-color': '#c9a84c',
    '--feature-color-light': 'rgba(201,168,76,0.30)',
    '--feature-color-soft': 'rgba(255,255,255,0.10)',
    '--feature-text': '#ffffff',
    '--feature-bg': '#0a0a0a',
    '--feature-card-bg': '#0a0a0a',
  },
};

const AnimatedFeatureCard = React.forwardRef<HTMLDivElement, AnimatedFeatureCardProps>(
  ({ className, tag, title, description, icon: Icon, color }, ref) => {
    const cardStyle = colorVariants[color] as React.CSSProperties;

    return (
      <motion.div
        ref={ref}
        style={{ ...cardStyle, backgroundColor: 'var(--feature-card-bg)' }}
        className={cn(
          'relative flex h-[380px] w-full flex-col justify-end overflow-hidden rounded-2xl border border-[rgba(201,168,76,0.18)] p-6 shadow-sm',
          className,
        )}
        whileHover="hover"
        initial="initial"
        variants={{
          initial: { y: 0 },
          hover: { y: -12 },
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      >
        {/* Background wash */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background: `radial-gradient(circle at 50% 25%, var(--feature-color-light) 0%, transparent 65%)`,
          }}
        />

        {/* Subtle geometric pattern overlay */}
        <div
          className="absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L60 30L30 60L0 30L30 0z' fill='none' stroke='%23c9a84c' stroke-width='1'/%3E%3C/svg%3E")`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Large floating icon */}
        <motion.div
          className="absolute inset-x-0 top-0 z-10 flex items-center justify-center pt-10"
          variants={{
            initial: { scale: 1, y: 0 },
            hover: { scale: 1.15, y: -18 },
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <div
            className="flex h-44 w-44 items-center justify-center rounded-full border-2"
            style={{
              backgroundColor: 'var(--feature-color-soft)',
              borderColor: 'var(--feature-color-light)',
              color: 'var(--feature-color)',
              boxShadow: '0 20px 60px -20px var(--feature-color-light)',
            }}
          >
            <Icon size={80} strokeWidth={1} />
          </div>
        </motion.div>

        {/* Bottom content card */}
        <div
          className="relative z-20 rounded-xl border p-5 backdrop-blur-md"
          style={{
            backgroundColor: 'var(--feature-bg)',
            borderColor: 'var(--feature-color-light)',
            color: 'var(--feature-text)',
          }}
        >
          <span
            className="mb-2 inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]"
            style={{
              backgroundColor: 'var(--feature-color-soft)',
              color: 'var(--feature-color)',
            }}
          >
            {tag}
          </span>
          <h3
            className="font-display mb-2"
            style={{
              fontSize: '1.35rem',
              fontWeight: 600,
              lineHeight: 1.2,
              color: 'var(--feature-text)',
            }}
          >
            {title}
          </h3>
          {description && (
            <p
              className="text-sm leading-relaxed"
              style={{ color: color === 'charcoal' ? 'rgba(255,255,255,0.7)' : '#777' }}
            >
              {description}
            </p>
          )}
        </div>
      </motion.div>
    );
  },
);

AnimatedFeatureCard.displayName = 'AnimatedFeatureCard';

export { AnimatedFeatureCard };
