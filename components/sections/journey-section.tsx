'use client';

import { useRef, useState, type KeyboardEvent } from 'react';
import { BalanceVisual, ChatVisual, CompatibilityVisual, PicksVisual } from '@/components/sections/journey-visuals';
import { Mark } from '@/components/ui/mark';
import { eyebrow, sectionHeading, sectionWrap } from '@/lib/styles';

const STEPS = [
  {
    label: 'Join',
    title: 'You join your city',
    body: (
      <>
        Each city keeps the same number of women and men. If one side is full, you wait until a place opens. You are not added to a crowd. When you create your profile, you also add your birth date, birth time, and birth place, and you take a short <Mark>MBTI</Mark> test. From that, EqualSpace uses your <Mark>sun, moon, and rising signs</Mark>, your <Mark>life-path number</Mark>, and your <Mark>MBTI</Mark> type to help choose your matches.
      </>
    ),
    Visual: BalanceVisual,
  },
  {
    label: 'Pick',
    title: 'A few people arrive each morning',
    body: (
      <>
        At 8:00 you get <Mark>3 to 5</Mark> profiles. They are chosen for personality, values, and what you are looking for. There is no long list to swipe.
      </>
    ),
    Visual: PicksVisual,
  },
  {
    label: 'Understand',
    title: 'You can see why you were introduced',
    body: (
      <>
        For each person you see where you line up: values, how you communicate, the kind of relationship you want, and how you live. That includes your <Mark>MBTI</Mark> type, your <Mark>sun, moon, and rising signs</Mark>, and your <Mark>life-path number</Mark>. It is there to explain the match. It is not a score.
      </>
    ),
    Visual: CompatibilityVisual,
  },
  {
    label: 'Start',
    title: 'Five questions, then a chat',
    body: (
      <>
        You both answer the same <Mark>5 questions</Mark> before you can message. They cover your weekend energy, how fast you reply, how you handle stress, what you like to talk about, and when you would want to meet. You are active for <Mark>72 hours</Mark>, then away for <Mark>14 days</Mark>. New people stop arriving once you have <Mark>5 chats</Mark>.
      </>
    ),
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
              A better way to <span className="text-kumkum-600">meet someone.</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-lotus-mauve">
            Sample screens. The app is not open yet. Tap a step to see it.
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
                <span className="text-lg font-medium">0{index + 1}</span>
                <span className="text-[15px] font-medium">{item.label}</span>
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
            <h3 className="text-2xl font-medium leading-snug text-lotus-brown sm:text-3xl">{step.title}</h3>
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
