'use client';

import { useEffect, useRef, useState } from 'react';
import { LotusCanvas } from '@/components/ui/lotus-canvas';
import { useScrollProgress } from '@/hooks/use-scroll-progress';

const PARTICLES = [
  { top: '12%', left: '8%', size: 6, delay: '0s' },
  { top: '24%', left: '88%', size: 4, delay: '-2s' },
  { top: '58%', left: '6%', size: 5, delay: '-4s' },
  { top: '72%', left: '82%', size: 7, delay: '-1s' },
  { top: '42%', left: '94%', size: 3, delay: '-3s' },
  { top: '88%', left: '30%', size: 4, delay: '-5s' },
];

const BLOOM_START = 0.26;
const BLOOM_RANGE = 0.42;

export function LotusBloom() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const [reducedMotion, setReducedMotion] = useState(false);
  const scrollOpenness = Math.min(1, Math.max(0, (progress - BLOOM_START) / BLOOM_RANGE));
  const openness = reducedMotion ? 1 : scrollOpenness;
  const openRef = useRef(0);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReducedMotion(media.matches);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    openRef.current = openness;
  }, [openness]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative h-[140vh] bg-gradient-to-b from-lotus-ivory via-lotus-petal/50 to-lotus-ivory"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        <div className="relative mx-auto flex aspect-square w-full max-w-[560px] items-center justify-center px-6">
          <div
            className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,_#FFFDFC_0%,_#FCE8ED_45%,_transparent_70%)] blur-2xl transition-opacity duration-700"
            style={{ opacity: 0.35 + openness * 0.65 }}
            aria-hidden="true"
          />
          <div className="absolute inset-[18%] rounded-full border border-lotus-muted/40" aria-hidden="true" />
          <LotusCanvas
            openRef={openRef}
            fallbackOpenness={openness}
            className="relative z-10 h-full w-full drop-shadow-[0_30px_40px_rgba(114,84,93,0.18)]"
          />
          {PARTICLES.map((particle, index) => (
            <span
              key={index}
              aria-hidden="true"
              className="absolute animate-float-slow rounded-full bg-lotus-rose/70"
              style={{
                top: particle.top,
                left: particle.left,
                width: particle.size,
                height: particle.size,
                animationDelay: particle.delay,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
