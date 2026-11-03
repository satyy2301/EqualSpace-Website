'use client';

import { useEffect, useRef } from 'react';
import { LotusCanvas } from '@/components/ui/lotus-canvas';
import { useScrollProgress } from '@/hooks/use-scroll-progress';
import { eyebrow, sectionHeading, sectionWrap } from '@/lib/styles';

const STEPS = [
  { title: 'Discover', body: 'Allow yourself to meet someone new.' },
  { title: 'Understand', body: 'Find the things that make a connection meaningful.' },
  { title: 'Grow', body: 'Give a genuine connection the space to develop.' },
];

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

export function LotusSection() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const openness = Math.min(1, Math.max(0, (progress - BLOOM_START) / BLOOM_RANGE));
  const openRef = useRef(0);
  const stepLocal = Math.min(1, Math.max(0, (progress - BLOOM_START) / (BLOOM_RANGE * 1.1)));
  const activeStep = stepLocal < 0.33 ? 0 : stepLocal < 0.66 ? 1 : 2;

  useEffect(() => {
    openRef.current = openness;
  }, [openness]);

  return (
    <section ref={ref} id="lotus" className="relative h-[200vh] bg-gradient-to-b from-lotus-ivory via-lotus-petal/50 to-lotus-ivory">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className={`${sectionWrap} grid w-full items-center gap-12 lg:grid-cols-12`}>
          <div className="relative mx-auto flex aspect-square w-full max-w-[460px] items-center justify-center lg:col-span-6">
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

          <div className="lg:col-span-5 lg:col-start-8">
            <p className={eyebrow}>The art of letting love bloom</p>
            <h2 className={`${sectionHeading} mt-6`}>
              Beautiful things take the <em className="italic text-lotus-plum">space</em> they need.
            </h2>

            <ol className="mt-12 space-y-8">
              {STEPS.map((step, index) => {
                const active = index <= activeStep;
                return (
                  <li
                    key={step.title}
                    className={`flex gap-6 border-l pl-6 transition-all duration-700 ${
                      index === activeStep ? 'border-lotus-mauve' : 'border-lotus-blush'
                    }`}
                  >
                    <span
                      className={`font-serif text-2xl italic transition-colors duration-700 ${
                        active ? 'text-lotus-rose' : 'text-lotus-muted'
                      }`}
                      aria-hidden="true"
                    >
                      0{index + 1}
                    </span>
                    <div>
                      <p
                        className={`text-[12px] font-semibold uppercase tracking-[0.28em] transition-colors duration-700 ${
                          active ? 'text-lotus-brown' : 'text-lotus-mauve'
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="mt-2 font-serif text-2xl leading-snug text-lotus-plum">{step.body}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
