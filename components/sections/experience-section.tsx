'use client';

import { useState } from 'react';
import { MobileMockup } from '@/components/ui/mobile-mockup';
import { TiltCard } from '@/components/ui/tilt-card';
import { useScrollProgress } from '@/hooks/use-scroll-progress';
import { eyebrow, sectionHeading, sectionWrap } from '@/lib/styles';
import {
  CompatibilityScreen,
  ConversationScreen,
  IntroductionScreen,
  ProfileScreen,
  ThoughtlineScreen,
} from '@/components/sections/experience-screens';

const SCREENS = [
  {
    id: 'profile',
    label: 'Member profile',
    description: 'Real substance first: a short introduction, personal interests, and what they are looking for.',
    Screen: ProfileScreen,
  },
  {
    id: 'compatibility',
    label: 'Compatibility overview',
    description: 'See how values, communication, and goals line up, shown as gentle context rather than a score.',
    Screen: CompatibilityScreen,
  },
  {
    id: 'introduction',
    label: 'Curated introduction',
    description: 'A considered introduction with a clear reason to talk, based on what you genuinely share.',
    Screen: IntroductionScreen,
  },
  {
    id: 'conversation',
    label: 'Conversation',
    description: 'A calm, distraction-free chat with prompts that start meaningful conversations.',
    Screen: ConversationScreen,
  },
  {
    id: 'thoughtline',
    label: 'Thoughtline text feed',
    description:
      'Anonymous thoughts with no public comments—when someone resonates, a like becomes a quiet match offer.',
    Screen: ThoughtlineScreen,
  },
];

export function ExperienceSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, progress } = useScrollProgress<HTMLElement>();
  const ActiveScreen = SCREENS[activeIndex].Screen;
  const parallaxOffset = (0.5 - progress) * 70;

  return (
    <section
      id="experience"
      ref={ref}
      className="relative scroll-mt-20 overflow-hidden bg-[radial-gradient(ellipse_at_top_left,_#FCE8ED_0%,_transparent_60%)] bg-lotus-ivory pt-28 pb-14 sm:pt-32 sm:pb-16"
    >
      <div className={`${sectionWrap} grid items-stretch gap-16 lg:grid-cols-12 lg:gap-10`}>
        <div className="flex flex-col lg:col-span-5">
          <p className={eyebrow}>The experience</p>
          <h2 className={`${sectionHeading} mt-6`}>
            Meet the experience, <em className="italic text-lotus-plum">not another swipe.</em>
          </h2>
          <p className="mt-6 max-w-md text-base leading-[1.75] text-lotus-plum">
            Previews only. The app is not open yet. These show the product we are inviting people into.
          </p>

          <div role="tablist" aria-label="App previews" className="mt-12 space-y-1.5">
            {SCREENS.map((screen, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={screen.id}
                  id={`tab-${screen.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="experience-panel"
                  onClick={() => setActiveIndex(index)}
                  className={`group flex w-full items-start gap-5 rounded-2xl border px-5 py-3.5 text-left transition-all duration-500 ${
                    selected
                      ? 'border-lotus-muted/70 bg-lotus-white shadow-[0_18px_40px_-30px_rgba(114,84,93,0.5)]'
                      : 'border-transparent hover:border-lotus-blush hover:bg-lotus-white/60'
                  }`}
                >
                  <span
                    className={`font-serif text-xl italic transition-colors duration-500 ${
                      selected ? 'text-lotus-plum' : 'text-lotus-mauve'
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">
                    <span className="block font-serif text-xl text-lotus-brown">{screen.label}</span>
                    <span
                      className={`mt-1 block overflow-hidden text-sm leading-relaxed text-lotus-plum transition-all duration-500 ${
                        selected ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      {screen.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative flex min-h-0 flex-col items-center lg:col-span-6 lg:col-start-7 lg:justify-center">
          <div
            className="absolute -left-4 top-10 h-72 w-72 rounded-full bg-lotus-blush/50 blur-3xl sm:left-8 lg:top-1/2 lg:-translate-y-1/2"
            aria-hidden="true"
          />
          <div
            className="relative flex h-full min-h-0 w-full max-w-[380px] flex-col transition-transform duration-700 ease-out"
            style={{ transform: `translate3d(0, ${parallaxOffset}px, 0)` }}
          >
            <div
              id="experience-panel"
              role="tabpanel"
              aria-labelledby={`tab-${SCREENS[activeIndex].id}`}
              key={SCREENS[activeIndex].id}
              className="animate-fade-up flex min-h-[420px] flex-1 items-center justify-center sm:min-h-[480px] lg:min-h-0"
            >
              <TiltCard max={5} className="flex h-full max-h-full w-full items-center justify-center">
                <MobileMockup className="h-full max-h-full w-auto max-w-[min(100%,340px)]">
                  <ActiveScreen />
                </MobileMockup>
              </TiltCard>
            </div>
            <p className="mt-5 shrink-0 text-center text-[11px] uppercase tracking-[0.22em] text-lotus-mauve sm:mt-6">
              Preview of the app
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
