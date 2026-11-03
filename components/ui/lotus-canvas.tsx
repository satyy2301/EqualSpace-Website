'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import { LotusFlower } from '@/components/ui/lotus-flower';

const LotusScene = dynamic(() => import('@/components/ui/lotus-scene').then((mod) => mod.LotusScene), {
  ssr: false,
  loading: () => null,
});

export function LotusCanvas({
  openRef,
  fallbackOpenness,
  className = '',
}: {
  openRef: MutableRefObject<number>;
  fallbackOpenness: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webgl, setWebgl] = useState<'checking' | 'supported' | 'unsupported'>('checking');
  const [visible, setVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const probe = document.createElement('canvas');
    setWebgl(probe.getContext('webgl2') || probe.getContext('webgl') ? 'supported' : 'unsupported');
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    setCompact(window.matchMedia('(max-width: 767px)').matches);

    const container = containerRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`} aria-hidden="true">
      {webgl === 'supported' && (
        <LotusScene
          openRef={openRef}
          reducedMotion={reducedMotion}
          compact={compact}
          frameloop={visible ? 'always' : 'demand'}
        />
      )}
      {webgl === 'unsupported' && <LotusFlower openness={fallbackOpenness} className="h-full w-full" />}
    </div>
  );
}
