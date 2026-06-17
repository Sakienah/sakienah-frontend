'use client';

import { Moon, Sparkles, Gift } from 'lucide-react';
import { GeomPattern } from '@/components/ui/GeomPattern';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { AnimatedFeatureCard } from '@/components/ui/animated-feature-card';

const values = [
  {
    tag: 'Gecureerd',
    title: 'Islamitisch gecureerd',
    description:
      'Elk product zorgvuldig geselecteerd met aandacht voor islamitische waarden en kwaliteit.',
    icon: Moon,
    color: 'gold' as const,
  },
  {
    tag: 'Kwaliteit',
    title: 'Premium kwaliteit',
    description:
      'Duurzame materialen en vakmanschap — producten gemaakt om generaties mee te gaan.',
    icon: Sparkles,
    color: 'charcoal' as const,
  },
  {
    tag: 'Cadeau',
    title: 'Perfect cadeau',
    description: 'Het ideale cadeau voor Ramadan, Eid of gewoon zomaar — geef iets met betekenis.',
    icon: Gift,
    color: 'cream' as const,
  },
];

export function ValueProposition() {
  return (
    <section
      style={{
        paddingTop: 'var(--section-py)',
        paddingBottom: 'var(--section-py)',
        background: '#FAF7F2',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <GeomPattern flip />
      <div className="max-w-[1200px] mx-auto px-4 md:px-10 relative z-10">
        <Reveal>
          <SectionHeader heading="Kwaliteit met intentie" />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {values.map((value, i) => (
            <Reveal key={value.title} delay={i * 0.1}>
              <AnimatedFeatureCard
                tag={value.tag}
                title={value.title}
                description={value.description}
                icon={value.icon}
                color={value.color}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
