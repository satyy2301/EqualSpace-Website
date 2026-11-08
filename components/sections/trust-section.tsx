'use client';

import { useState } from 'react';
import { BatteryLow, Bot, Clock, Coins, ListChecks, MessagesSquare, ShieldCheck, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { Mark } from '@/components/ui/mark';
import { Reveal } from '@/components/ui/reveal';
import {
  darkEyebrow,
  darkGlassCard,
  darkSectionBase,
  darkSectionBodySm,
  darkSectionHeading,
  darkSectionOverlay,
  sectionWrap,
} from '@/lib/styles';

const FEATURES: { icon: LucideIcon; title: ReactNode; body: ReactNode }[] = [
  {
    icon: ShieldCheck,
    title: 'Aadhaar verification',
    body: (
      <>
        You verify with <Mark onDark>Aadhaar</Mark> through <Mark onDark>DigiLocker</Mark> and pay the fee before you enter the city list. The amount is explained before anyone pays.
      </>
    ),
  },
  {
    icon: Coins,
    title: 'A small slot fee',
    body: (
      <>
        The fee keeps <Mark onDark>bots</Mark> and time-wasters out. You see the amount before you pay.
      </>
    ),
  },
  {
    icon: ListChecks,
    title: 'Five-question icebreaker',
    body: (
      <>
        Both of you answer <Mark onDark>5 questions</Mark> before direct conversation unlocks.
      </>
    ),
  },
  {
    icon: Clock,
    title: '72-hour focus windows',
    body: (
      <>
        You are active for <Mark onDark>72 hours</Mark>, then away for <Mark onDark>14 days</Mark>.
      </>
    ),
  },
  {
    icon: MessagesSquare,
    title: 'Five active chats, maximum',
    body: (
      <>
        A hard limit of <Mark onDark>5 chats</Mark> so every conversation gets genuine attention.
      </>
    ),
  },
  {
    icon: Bot,
    title: 'A quiet AI wingman',
    body: 'A pacing clash shows a warning before the chat opens. It does not cancel the match.',
  },
];

const BOUNDARIES = ['Slow replies preferred', 'Low battery today', 'Open to a call'];

function VerificationShield() {
  return (
    <div className="relative mx-auto flex flex-col items-center [perspective:900px]">
      <div className="relative flex h-56 w-56 items-center justify-center sm:h-64 sm:w-64">
        <div className="absolute inset-6 rounded-full bg-lotus-rose/20 blur-3xl" aria-hidden="true" />
        <div className="relative flex h-44 w-44 items-center justify-center rounded-[44px] bg-lotus-white shadow-[0_40px_60px_-30px_rgba(114,84,93,0.5)] ring-1 ring-saffron-400/50 transition-transform duration-700 ease-out [transform-style:preserve-3d] hover:[transform:rotateY(18deg)_rotateX(-8deg)]">
          <ShieldCheck className="h-16 w-16 text-kumkum-600" strokeWidth={1.25} aria-hidden="true" />
        </div>
      </div>
      <p className="mt-1 whitespace-nowrap rounded-full border border-white/25 bg-white/15 px-5 py-2 text-center text-[13px] font-medium leading-none tracking-wide text-lotus-white backdrop-blur-sm sm:text-sm">
        Verified with <Mark onDark>Aadhaar</Mark>
        <span className="mx-2 text-white/40" aria-hidden="true">
          ·
        </span>
        <Mark onDark>DigiLocker</Mark>
      </p>
    </div>
  );
}

function LivingBoundaries() {
  const [active, setActive] = useState<string[]>([BOUNDARIES[0]]);

  const toggle = (boundary: string) => {
    setActive((current) =>
      current.includes(boundary) ? current.filter((item) => item !== boundary) : [...current, boundary],
    );
  };

  return (
    <div className={`${darkGlassCard} p-8 sm:p-10`}>
      <div className="flex items-center gap-3">
        <BatteryLow className="h-5 w-5 text-saffron-100" aria-hidden="true" />
        <p className={darkEyebrow}>Living boundaries</p>
      </div>
      <h3 className="mt-5 text-xl font-medium leading-snug text-lotus-white">Share your energy, in real time.</h3>
      <div className="mt-6 flex flex-wrap gap-2.5">
        {BOUNDARIES.map((boundary) => {
          const selected = active.includes(boundary);
          return (
            <button
              key={boundary}
              type="button"
              aria-pressed={selected}
              onClick={() => toggle(boundary)}
              className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                selected
                  ? 'border-saffron-400/50 bg-saffron-400/30 text-lotus-white'
                  : 'border-white/20 bg-white/5 text-lotus-blush hover:border-white/35'
              }`}
            >
              {boundary}
            </button>
          );
        })}
      </div>
      <p className="mt-6 text-sm leading-relaxed text-lotus-blush/90">
        {active.length > 0
          ? `Visible to your matches: ${active.join(', ')}.`
          : 'Tap a boundary to let your matches know how you are feeling today.'}
      </p>
    </div>
  );
}

export function TrustSection() {
  return (
    <section id="trust" className={`${darkSectionBase} py-20 sm:py-24`}>
      <div className={darkSectionOverlay} aria-hidden="true" />
      <div className={sectionWrap}>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            <VerificationShield />
            <p className={`${darkEyebrow} mt-10 text-center lg:text-left`}>Trust and boundaries</p>
            <h2 className={`${darkSectionHeading} mt-5 text-center lg:text-left`}>
              Designed for people, <span className="text-lotus-rose">not endless engagement.</span>
            </h2>
            <p className={`${darkSectionBodySm} mt-6 text-center lg:text-left`}>
              Every member is verified with their Aadhaar identity, so you know exactly who you are meeting. Our safeguards keep conversations focused, paced, and respectful.
            </p>
          </Reveal>

          <div className="space-y-8 lg:col-span-6 lg:col-start-7">
            <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
              {FEATURES.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <li key={index}>
                    <Reveal delay={index * 80}>
                      <div className="flex gap-4 border-t border-white/10 pt-6">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-saffron-400/20">
                          <Icon className="h-4 w-4 text-saffron-100" aria-hidden="true" />
                        </span>
                        <div>
                          <h3 className="text-lg font-medium leading-snug text-lotus-white">{feature.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-lotus-blush/90">{feature.body}</p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ul>

            <Reveal delay={200}>
              <LivingBoundaries />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
