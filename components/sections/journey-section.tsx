'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { BalanceVisual, ChatVisual, CompatibilityVisual, PicksVisual } from '@/components/sections/journey-visuals';
import { eyebrow, sectionHeading, sectionWrap } from '@/lib/styles';

const STEPS = [
  {
    label: 'Join',
    title: 'Join a balanced community',
    body: 'Each city pool keeps an exact 1:1 balance. When one side fills, newcomers join a rotating queue until balance is restored.',
    Visual: BalanceVisual,
  },
  {
    label: 'Pick',
    title: 'Receive your daily curated picks',
    body: 'At 8:00 AM, receive three to five carefully selected profiles based on meaningful compatibility. No endless swiping.',
    Visual: PicksVisual,
  },
  {
    label: 'Understand',
    title: 'Discover why you match',
    body: 'See how you line up on shared values, emotional availability, communication, relationship intentions, and lifestyle.',
    Visual: CompatibilityVisual,
  },
  {
    label: 'Start',
    title: 'Begin with intention',
    body: 'Answer a five-question icebreaker before direct conversation unlocks. Chats happen in focused 72-hour windows.',
    Visual: ChatVisual,
  },
];

export function JourneySection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const step = STEPS[activeIndex];
  const Visual = step.Visual;

  const selectTab = (index: number) => {
    setActiveIndex(index);
    tabRefs.current[index]?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowRight') selectTab((index + 1) % STEPS.length);
    if (event.key === 'ArrowLeft') selectTab((index - 1 + STEPS.length) % STEPS.length);
  };

  return (
    <section id="journey" className="scroll-mt-20 bg-lotus-white py-20 sm:py-24">
      <div className={sectionWrap}>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className={eyebrow}>How EqualSpace works</p>
            <h2 className={`${sectionHeading} mt-5`}>
              A better way to <em className="italic text-kumkum-600">meet someone.</em>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-lotus-mauve">
            Illustrative previews of the beta app. Tap each step to explore.
          </p>
        </div>

        <div role="tablist" aria-label="How EqualSpace works" className="-mx-6 mt-12 flex gap-3 overflow-x-auto px-6 pb-2 sm:-mx-10 sm:px-10 lg:mx-0 lg:px-0">
          {STEPS.map((item, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={item.label}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                id={`journey-tab-${index}`}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="journey-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={`flex shrink-0 items-center gap-3 rounded-full border px-5 py-3 text-sm transition-all duration-500 ${
                  selected
                    ? 'border-lotus-brown bg-lotus-brown text-lotus-white'
                    : 'border-lotus-muted/60 bg-lotus-ivory text-lotus-plum hover:border-lotus-mauve hover:text-lotus-brown'
                }`}
              >
                <span className="font-serif italic">0{index + 1}</span>
                <span className="font-semibold uppercase tracking-[0.14em] text-[11px]">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div
          id="journey-panel"
          role="tabpanel"
          aria-labelledby={`journey-tab-${activeIndex}`}
          key={activeIndex}
          className="mt-8 grid animate-fade-up gap-10 rounded-[32px] border border-lotus-blush/70 bg-lotus-ivory p-8 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-14"
        >
          <div className="flex flex-col justify-center lg:col-span-5">
            <h3 className="font-serif text-3xl leading-tight text-lotus-brown sm:text-4xl">{step.title}</h3>
            <p className="mt-5 text-base leading-[1.75] text-lotus-plum">{step.body}</p>
          </div>
          <div className="flex min-h-[340px] items-center rounded-[24px] bg-lotus-white p-6 shadow-[0_24px_50px_-36px_rgba(114,84,93,0.4)] sm:p-8 lg:col-span-7">
            <div className="w-full">
              <Visual />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
