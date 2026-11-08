'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Coins, ListChecks, ShieldCheck, type LucideIcon } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { Mark } from '@/components/ui/mark';
import { RegistrationForm } from '@/components/ui/registration-form';
import { ctaPrimary, ctaSecondary, eyebrow } from '@/lib/styles';

const STEP_COUNT = 4;
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';

const FACTS = [
  { value: '1:1', label: 'City balance', detail: 'Equal slots for women and men. No side is flooded.' },
  { value: '3–5', label: 'Morning introductions', detail: 'At 8:00 AM. Chosen for you — no swipe pile.' },
  { value: '5', label: 'Chats, maximum', detail: 'A hard cap so every conversation gets a real reply.' },
];

const BEATS = [
  {
    label: 'Join',
    title: 'You join your city',
    body: 'Each city keeps the same number of women and men. If one side is full, you wait until a place opens.',
  },
  {
    label: 'Morning',
    title: 'A few people arrive at 8:00',
    body: 'You get 3 to 5 profiles, chosen for personality, values, and what you are looking for. There is no list to swipe.',
  },
  {
    label: 'Start',
    title: 'Five questions, then a chat',
    body: 'You both answer the same 5 questions before you can message. New people stop arriving once you have 5 chats.',
  },
];

const TRUST: { icon: LucideIcon; title: string; body: ReactNode }[] = [
  {
    icon: ShieldCheck,
    title: 'Aadhaar verification',
    body: (
      <>
        You verify with <Mark>Aadhaar</Mark> through <Mark>DigiLocker</Mark> before you enter the city list.
      </>
    ),
  },
  {
    icon: Coins,
    title: 'A small slot fee',
    body: (
      <>
        The fee keeps <Mark>bots</Mark> and time-wasters out. You see the amount before you pay.
      </>
    ),
  },
  {
    icon: ListChecks,
    title: 'Five-question icebreaker',
    body: (
      <>
        Both of you answer <Mark>5 questions</Mark> before direct conversation unlocks.
      </>
    ),
  },
];

function useInert(active: boolean) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) ref.current.inert = !active;
  }, [active]);
  return ref;
}

function isFieldTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'SELECT' || tag === 'TEXTAREA' || target.isContentEditable;
}

export function StepFlow() {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(media.matches);
    apply();
    media.addEventListener('change', apply);
    return () => media.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (isFieldTarget(event.target)) return;
      const tag = event.target instanceof HTMLElement ? event.target.tagName : '';
      if (event.key === 'Enter' && (tag === 'BUTTON' || tag === 'A')) return;
      if ((event.key === 'ArrowRight' || event.key === 'Enter') && index < STEP_COUNT - 1) {
        event.preventDefault();
        setIndex((current) => current + 1);
      }
      if (event.key === 'ArrowLeft' && index > 0) {
        event.preventDefault();
        setIndex((current) => current - 1);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [index]);

  const go = (next: number) => setIndex(Math.min(STEP_COUNT - 1, Math.max(0, next)));

  const motion = reduced ? 'none' : `transform 600ms ${EASE}, opacity 600ms ${EASE}`;

  return (
    <div className="relative flex h-[100dvh] flex-col overflow-hidden bg-lotus-ivory text-lotus-brown">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_8%,_#FBEBC9_0%,_transparent_50%),radial-gradient(ellipse_at_8%_92%,_#F4CBD7_0%,_transparent_45%)]"
        aria-hidden="true"
      />
      <div className="jaali-bg pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />

      <header className="relative z-20 flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <button type="button" onClick={() => go(0)} aria-label="EqualSpace home" className="shrink-0">
          <Logo />
        </button>

        <p className="text-[15px] font-medium tabular-nums text-lotus-plum" aria-live="polite">
          {index + 1} of {STEP_COUNT}
        </p>

        <button type="button" onClick={() => go(STEP_COUNT - 1)} className={`${ctaPrimary} px-5 py-2.5 text-sm sm:px-6`}>
          Join
        </button>
      </header>

      <div className="relative z-10 min-h-0 flex-1 overflow-hidden">
        <div
          className="flex h-full"
          style={{
            transform: `translate3d(-${index * 100}%, 0, 0)`,
            transition: motion,
          }}
        >
          <StepPanel active={index === 0} reduced={reduced} label="The promise">
            <p className={`${eyebrow} inline-flex items-center gap-3 rounded-full border border-lotus-muted/60 bg-lotus-white/80 px-4 py-2`}>
              <span className="h-1.5 w-1.5 rounded-full bg-saffron-400" aria-hidden="true" />
              City lists are filling
            </p>
            <h1 className="mt-6 font-serif text-[clamp(2.6rem,6vw,5.25rem)] font-medium leading-[1.02] tracking-[-0.015em] text-lotus-brown">
              Meet people chosen <span className="italic text-kumkum-600">for you.</span>
            </h1>
            <dl className="mt-8 grid grid-cols-3 gap-3 sm:mt-10 sm:gap-8">
              {FACTS.map((item) => (
                <div key={item.label} className="border-t-2 border-lotus-muted/60 pt-4">
                  <dd className="font-serif text-3xl leading-none text-lotus-brown/90 sm:text-5xl">{item.value}</dd>
                  <dt className="mt-2 text-sm font-medium text-lotus-brown/85 sm:text-[15px]">{item.label}</dt>
                  <dd className="mt-2 hidden text-sm leading-snug text-lotus-plum sm:block">{item.detail}</dd>
                </div>
              ))}
            </dl>
          </StepPanel>

          <StepPanel active={index === 1} reduced={reduced} label="How it works">
            <p className={eyebrow}>How EqualSpace works</p>
            <h2 className="mt-4 font-serif text-[clamp(2.1rem,4.5vw,3.75rem)] font-medium leading-[1.1] text-lotus-brown">
              A small number of people, <span className="italic text-kumkum-600">on purpose.</span>
            </h2>
            <ol className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-5">
              {BEATS.map((beat, beatIndex) => (
                <li key={beat.label} className="rounded-[24px] bg-lotus-white/80 p-4 ring-1 ring-lotus-blush/70 sm:p-5">
                  <p className="text-sm font-medium text-kumkum-600">
                    {beatIndex + 1}. {beat.label}
                  </p>
                  <p className="mt-2 font-serif text-2xl leading-tight text-lotus-brown">{beat.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-lotus-plum">{beat.body}</p>
                </li>
              ))}
            </ol>
          </StepPanel>

          <StepPanel active={index === 2} reduced={reduced} label="Trust">
            <p className={eyebrow}>Before you meet</p>
            <h2 className="mt-4 max-w-2xl font-serif text-[clamp(2.1rem,4.5vw,3.75rem)] font-medium leading-[1.1] text-lotus-brown">
              Real people, a slower <span className="italic text-kumkum-600">pace.</span>
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5">
              {TRUST.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.title} className="rounded-[24px] bg-lotus-white/80 p-5 ring-1 ring-lotus-blush/70">
                    <Icon className="h-5 w-5 text-kumkum-600" strokeWidth={1.6} aria-hidden="true" />
                    <p className="mt-3 font-serif text-2xl leading-tight text-lotus-brown">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-lotus-plum">{item.body}</p>
                  </li>
                );
              })}
            </ul>
          </StepPanel>

          <SignupPanel active={index === 3} reduced={reduced} />
        </div>
      </div>

      <footer className="relative z-20 flex items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <button
          type="button"
          onClick={() => go(index - 1)}
          className={`${ctaSecondary} px-6 py-3 ${index === 0 ? 'invisible' : ''}`}
          tabIndex={index === 0 ? -1 : 0}
        >
          Back
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Sections">
          {Array.from({ length: STEP_COUNT }, (_, step) => (
            <button
              key={step}
              type="button"
              role="tab"
              aria-selected={step === index}
              aria-label={`Step ${step + 1} of ${STEP_COUNT}`}
              onClick={() => go(step)}
              className={`h-2 rounded-full transition-all duration-500 ${
                step === index ? 'w-8 bg-kumkum-600' : 'w-2 bg-lotus-muted/80 hover:bg-lotus-plum'
              }`}
            />
          ))}
        </div>

        {index < STEP_COUNT - 1 ? (
          <button type="button" onClick={() => go(index + 1)} className={`${ctaPrimary} px-6 py-3`}>
            {index === 2 ? 'Join your city' : 'Next'}
          </button>
        ) : (
          <span className="invisible px-6 py-3" aria-hidden="true">
            Next
          </span>
        )}
      </footer>
    </div>
  );
}

function SignupPanel({ active, reduced }: { active: boolean; reduced: boolean }) {
  const ref = useInert(active);
  return (
    <section
      ref={ref}
      className="h-full w-full shrink-0 overflow-y-auto px-5 py-2 sm:px-10"
      aria-hidden={!active}
      style={{ opacity: active ? 1 : 0, transition: reduced ? 'none' : `opacity 600ms ${EASE}` }}
    >
      <div className="mx-auto w-full max-w-xl pb-6">
        <h2 className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.1] text-lotus-brown">
          Some connections are worth <span className="italic text-kumkum-600">waiting for.</span>
        </h2>
        <p className="mt-3 text-base text-lotus-plum">Be among the first in.</p>
        <div className="mt-6 rounded-[28px] bg-lotus-white p-6 shadow-[0_40px_90px_-50px_rgba(114,84,93,0.45)] ring-1 ring-lotus-blush/70 sm:p-8">
          <RegistrationForm />
        </div>
      </div>
    </section>
  );
}

function StepPanel({
  active,
  reduced,
  label,
  children,
}: {
  active: boolean;
  reduced: boolean;
  label: string;
  children: ReactNode;
}) {
  const ref = useInert(active);
  return (
    <section
      ref={ref}
      aria-label={label}
      aria-hidden={!active}
      className="flex h-full w-full shrink-0 items-center overflow-hidden px-5 sm:px-10"
    >
      <div
        className="mx-auto w-full max-w-5xl"
        style={{
          opacity: active ? 1 : 0,
          transition: reduced ? 'none' : `opacity 600ms ${EASE}`,
        }}
      >
        {children}
      </div>
    </section>
  );
}
