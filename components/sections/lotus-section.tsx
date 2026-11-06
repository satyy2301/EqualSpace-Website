'use client';

import { useEffect, useRef, useState } from 'react';
import { LotusCanvas } from '@/components/ui/lotus-canvas';
import { useScrollProgress } from '@/hooks/use-scroll-progress';
import { Mark } from '@/components/ui/mark';
import { eyebrow, sectionHeading, sectionWrap } from '@/lib/styles';

const STEPS = [
  {
    title: 'A few people, each morning',
    body: (
      <>
        At 8:00 you get <Mark>3 to 5</Mark> profiles. No swiping through a crowd.
      </>
    ),
  },
  {
    title: 'Five questions, then a chat',
    body: (
      <>
        You both answer the same <Mark>5 questions</Mark> before the conversation unlocks.
      </>
    ),
  },
  { title: 'Room to actually talk', body: 'You can keep up to 5 chats. Each one gets a focused window, then a pause.' },
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

const OPENNESS_BY_STEP = [0, 0.5, 1];

export function LotusSection() {
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const [pinned, setPinned] = useState<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pinProgress = useRef<number | null>(null);
  const scrollOpenness = Math.min(1, Math.max(0, (progress - BLOOM_START) / BLOOM_RANGE));
  const openness = reducedMotion ? 1 : pinned !== null ? pinned : scrollOpenness;
  const openRef = useRef(0);
  const stepLocal = Math.min(1, Math.max(0, (progress - BLOOM_START) / (BLOOM_RANGE * 1.1)));
  const scrollStep = stepLocal < 0.33 ? 0 : stepLocal < 0.66 ? 1 : 2;
  const pinnedStep = pinned === null ? null : OPENNESS_BY_STEP.indexOf(pinned);
  const activeStep = reducedMotion ? STEPS.length - 1 : pinnedStep ?? scrollStep;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReducedMotion(media.matches);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    if (pinProgress.current === null) return;
    if (Math.abs(progress - pinProgress.current) > 0.02) {
      pinProgress.current = null;
      setPinned(null);
    }
  }, [progress]);

  useEffect(() => {
    openRef.current = openness;
  }, [openness]);

  const selectStep = (index: number) => {
    pinProgress.current = progress;
    setPinned(OPENNESS_BY_STEP[index]);
  };

  return (
    <section ref={ref} id="lotus" className="relative h-[140vh] bg-gradient-to-b from-lotus-ivory via-lotus-petal/50 to-lotus-ivory">
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
            <p className={eyebrow}>How a match opens</p>
            <h2 className={`${sectionHeading} mt-6`}>
              A connection opens in <span className="text-lotus-plum">three steps.</span>
            </h2>

            <ol className="mt-12 space-y-4">
              {STEPS.map((step, index) => {
                const active = reducedMotion || index <= activeStep;
                const selected = index === activeStep;
                return (
                  <li key={step.title}>
                    <button
                      type="button"
                      onClick={() => selectStep(index)}
                      aria-pressed={selected}
                      className={`flex w-full gap-6 border-l py-2 pl-6 text-left transition-all duration-700 ${
                        selected ? 'border-lotus-mauve' : 'border-lotus-blush'
                      }`}
                    >
                      <span
                        className={`text-lg font-medium transition-colors duration-700 ${
                          active ? 'text-lotus-rose' : 'text-lotus-muted'
                        }`}
                        aria-hidden="true"
                      >
                        0{index + 1}
                      </span>
                      <span>
                        <span
                          className={`block text-lg font-medium transition-colors duration-700 ${
                            active ? 'text-lotus-brown' : 'text-lotus-mauve'
                          }`}
                        >
                          {step.title}
                        </span>
                        <span className="mt-1 block text-base leading-relaxed text-lotus-plum">{step.body}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
            <p className="mt-8 text-base leading-relaxed text-lotus-plum">
              You can also post an anonymous thought. Nobody comments in public. A like is a private offer to start the same three steps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
