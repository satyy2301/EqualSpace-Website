'use client';

import { useEffect, useRef } from 'react';

const PEARLS = [
  { top: '14%', left: '46%', size: 14, depth: 90 },
  { top: '62%', left: '38%', size: 9, depth: 140 },
  { top: '78%', left: '70%', size: 18, depth: 60 },
  { top: '30%', left: '92%', size: 10, depth: 120 },
  { top: '8%', left: '28%', size: 7, depth: 170 },
];

export function HeroBackdrop() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    const handlePointerMove = (event: PointerEvent) => {
      const scene = sceneRef.current;
      if (!scene) return;
      scene.style.setProperty('--tilt-x', String((event.clientY / window.innerHeight) * 2 - 1));
      scene.style.setProperty('--tilt-y', String((event.clientX / window.innerWidth) * 2 - 1));
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [perspective:1400px]" aria-hidden="true">
      <div
        ref={sceneRef}
        className="absolute inset-0 transition-transform duration-[900ms] ease-out [transform-style:preserve-3d]"
        style={{
          transform:
            'rotateX(calc(var(--tilt-x, 0) * 5deg)) rotateY(calc(var(--tilt-y, 0) * -7deg))',
        }}
      >
        <div className="absolute -right-[10%] -top-[14%] h-[44rem] w-[44rem] [transform:translateZ(-160px)]">
          <div className="motion-safe:animate-float-slow h-full w-full rounded-full bg-[radial-gradient(circle_at_32%_28%,_#FFFFFF_0%,_#FCE8ED_34%,_#F4CBD7_62%,_#E8A9BD_100%)] opacity-80 shadow-[inset_-40px_-60px_120px_rgba(213,160,169,0.45),0_60px_120px_-40px_rgba(114,84,93,0.35)]" />
        </div>

        <div className="absolute -bottom-[8%] -left-[6%] h-[30rem] w-[30rem] [transform:translateZ(80px)]">
          <div className="motion-safe:animate-float-slow h-full w-full rounded-full border border-white/70 bg-gradient-to-br from-white/75 via-lotus-petal/45 to-lotus-blush/30 shadow-[inset_0_0_60px_rgba(255,255,255,0.8),0_40px_80px_-30px_rgba(114,84,93,0.3)]" style={{ animationDelay: '-3s' }} />
        </div>

        <div className="absolute left-[38%] top-[18%] h-[26rem] w-[26rem] [transform:translateZ(30px)]">
          <div className="absolute inset-0 rounded-full border border-lotus-mauve/25 [transform:rotateX(74deg)_rotateZ(14deg)]" />
          <div className="absolute inset-[8%] rounded-full border border-kumkum-500/15 [transform:rotateX(70deg)_rotateZ(-18deg)]" />
        </div>

        <div className="absolute left-[16%] top-[44%] h-[20rem] w-[14rem] [transform:translateZ(110px)]">
          <div
            className="motion-safe:animate-float-slow h-full w-full bg-gradient-to-br from-lotus-white/90 via-lotus-blush/60 to-lotus-rose/40 opacity-80 shadow-[0_30px_60px_-20px_rgba(114,84,93,0.35)] [border-radius:0_100%_0_100%] [transform:rotate(-18deg)]"
            style={{ animationDelay: '-6s' }}
          />
        </div>

        <div className="absolute right-[22%] bottom-[12%] h-[16rem] w-[11rem] [transform:translateZ(150px)]">
          <div
            className="motion-safe:animate-float-slow h-full w-full bg-gradient-to-tr from-lotus-petal/90 via-lotus-ivory/70 to-saffron-100/60 opacity-75 shadow-[0_24px_48px_-18px_rgba(114,84,93,0.3)] [border-radius:100%_0_100%_0] [transform:rotate(24deg)]"
            style={{ animationDelay: '-9s' }}
          />
        </div>

        {PEARLS.map((pearl, index) => (
          <div
            key={index}
            className="absolute [transform:translateZ(var(--depth))]"
            style={{ top: pearl.top, left: pearl.left, ['--depth' as string]: `${pearl.depth}px` }}
          >
            <span
              className="motion-safe:animate-float-slow block rounded-full bg-[radial-gradient(circle_at_35%_30%,_#FFFFFF,_#E9D8C6_60%,_#D5A0A9)] shadow-[0_6px_14px_-4px_rgba(114,84,93,0.45)]"
              style={{
                width: pearl.size * 4,
                height: pearl.size * 4,
                animationDelay: `${-index * 1.7}s`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
