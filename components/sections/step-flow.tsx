'use client';

import { useEffect, useRef, useState, type ComponentType, type ReactNode } from 'react';
import Image from 'next/image';
import { BatteryLow, Bot, Coins, ShieldCheck, Sunrise, type LucideIcon } from 'lucide-react';
import { BalanceVisual, ChatVisual } from '@/components/sections/journey-visuals';
import { Logo } from '@/components/ui/logo';
import { LotusCanvas } from '@/components/ui/lotus-canvas';
import { Mark } from '@/components/ui/mark';
import { ProfilePreview } from '@/components/ui/profile-preview';
import { RegistrationForm } from '@/components/ui/registration-form';
import { ctaPrimary, ctaSecondary, eyebrow } from '@/lib/styles';

const STEP_COUNT = 4;
const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)';
const OPENNESS = [0.18, 0.45, 0.72, 1];

const BEATS: {
  label: string;
  title: string;
  body: string;
  Visual: ComponentType<{ compact?: boolean }>;
}[] = [
  {
    label: 'Join',
    title: 'You join your city',
    body: 'Each city keeps the same number of women and men. If one side is full, you wait until a place opens.',
    Visual: BalanceVisual,
  },
  {
    label: 'Morning',
    title: 'A few people arrive at 8:00',
    body: 'You get 3 to 5 profiles, chosen for personality, values, and what you are looking for.',
    Visual: MorningArrival,
  },
  {
    label: 'Start',
    title: 'Five questions, then a chat',
    body: 'You both answer the same 5 questions before you can message. You are active for 72 hours, then away for two weeks. New people stop once you have 5 chats.',
    Visual: ChatVisual,
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
    icon: Bot,
    title: 'A quiet AI wingman',
    body: 'If your pace clashes, you see a warning before the chat opens. It does not cancel the match.',
  },
];

const BOUNDARIES = ['Slow replies preferred', 'Low battery today', 'Open to a call'];

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
  const openRef = useRef(OPENNESS[0]);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => setReduced(motion.matches);
    apply();
    motion.addEventListener('change', apply);
    return () => motion.removeEventListener('change', apply);
  }, []);

  useEffect(() => {
    const target = OPENNESS[index];
    if (reduced) {
      openRef.current = target;
      return;
    }
    const start = openRef.current;
    const began = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - began) / 600);
      const eased = 1 - (1 - t) ** 3;
      openRef.current = start + (target - start) * eased;
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [index, reduced]);

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
  const signingUp = index === STEP_COUNT - 1;

  return (
    <div className="relative flex h-[100dvh] flex-col overflow-hidden bg-lotus-ivory text-lotus-brown">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_85%_8%,_#FBEBC9_0%,_transparent_50%),radial-gradient(ellipse_at_8%_92%,_#F4CBD7_0%,_transparent_45%)]"
        aria-hidden="true"
      />
      <div className="jaali-bg pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />

      <div
        className={`pointer-events-none absolute z-[5] ${
          signingUp
            ? 'left-1/2 top-[4.5rem] h-24 w-24 -translate-x-1/2 lg:left-[7%] lg:top-1/2 lg:h-[380px] lg:w-[380px] lg:-translate-x-0 lg:-translate-y-1/2'
            : 'right-3 top-[4.5rem] h-16 w-16 lg:right-8 lg:top-1/2 lg:h-72 lg:w-72 lg:-translate-y-1/2'
        }`}
        style={{ transition: reduced ? 'none' : `all 600ms ${EASE}` }}
        aria-hidden="true"
      >
        <LotusCanvas openRef={openRef} fallbackOpenness={OPENNESS[index]} className="h-full w-full" />
      </div>

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
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)`, transition: motion }}
        >
          <StepPanel active={index === 0} reduced={reduced} label="The promise" clearLotus>
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-10">
              <div className="pr-16 lg:pr-0">
                <p className={`${eyebrow} inline-flex items-center gap-3 rounded-full border border-lotus-muted/60 bg-lotus-white/80 px-4 py-2`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-saffron-400" aria-hidden="true" />
                  City lists are filling
                </p>
                <h1 className="mt-4 font-serif text-[clamp(2.4rem,5.5vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.015em] text-lotus-brown lg:mt-6">
                  Meet people chosen <span className="italic text-kumkum-600">for you.</span>
                </h1>
                <p className="mt-4 max-w-md text-base leading-relaxed text-lotus-plum sm:text-lg">
                  Two ways in. A few introductions each morning, or a thought you post and let someone find you.
                </p>
                <p className="mt-3 max-w-md text-base leading-relaxed text-lotus-plum">
                  For adults in India who want partnership, marriage, or a slower start. There is no pile to swipe.
                </p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {['Partnership', 'Marriage', 'Taking it slow'].map((intention) => (
                    <li
                      key={intention}
                      className="rounded-full border border-lotus-muted/70 bg-lotus-white/80 px-3 py-1.5 text-sm font-medium text-lotus-plum"
                    >
                      {intention}
                    </li>
                  ))}
                </ul>
              </div>
              <HeroCollage />
            </div>
          </StepPanel>

          <StepPanel active={index === 1} reduced={reduced} label="How it works" clearLotus>
            <div className="pr-16 lg:pr-0">
              <p className={eyebrow}>How EqualSpace works</p>
              <h2 className="mt-3 max-w-xl font-serif text-[clamp(1.85rem,4vw,3.25rem)] font-medium leading-[1.1] text-lotus-brown">
                A small number of people, <span className="italic text-kumkum-600">on purpose.</span>
              </h2>
            </div>
            <ol className="mt-5 flex gap-3 overflow-x-auto pb-1 lg:mt-8 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible">
              {BEATS.map((beat, beatIndex) => {
                const Visual = beat.Visual;
                return (
                  <li key={beat.label} className="w-[82%] shrink-0 rounded-[24px] bg-lotus-white/85 p-3 ring-1 ring-lotus-blush/70 sm:p-4 lg:w-auto">
                    <p className="text-xs font-medium text-kumkum-600 sm:text-sm">
                      {beatIndex + 1}. {beat.label}
                    </p>
                    <p className="mt-1 font-serif text-lg leading-tight text-lotus-brown sm:text-2xl">{beat.title}</p>
                    <p className="mt-1 text-xs leading-snug text-lotus-plum sm:text-sm sm:leading-relaxed">{beat.body}</p>
                    <div className="mt-3 flex min-h-[6.5rem] items-center justify-center lg:min-h-[8.5rem]">
                      <div className="w-full">
                        <Visual compact />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </StepPanel>

          <StepPanel active={index === 2} reduced={reduced} label="Trust" clearLotus>
            <div className="pr-16 lg:pr-0">
              <p className={eyebrow}>Before you meet</p>
              <h2 className="mt-3 max-w-2xl font-serif text-[clamp(1.85rem,4vw,3.25rem)] font-medium leading-[1.1] text-lotus-brown">
                Real people, a slower <span className="italic text-kumkum-600">pace.</span>
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-lotus-plum sm:text-base">
                You know who is on the other side, and you can say how you want the conversation to go.
              </p>
            </div>
            <ul className="mt-5 flex gap-3 overflow-x-auto pb-1 lg:mt-6 lg:grid lg:grid-cols-3 lg:gap-4 lg:overflow-visible">
              {TRUST.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.title} className="w-[78%] shrink-0 rounded-[24px] bg-lotus-white/85 p-4 ring-1 ring-lotus-blush/70 lg:w-auto">
                    <Icon className="h-5 w-5 text-kumkum-600" strokeWidth={1.6} aria-hidden="true" />
                    <p className="mt-3 font-serif text-xl leading-tight text-lotus-brown">{item.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-lotus-plum">{item.body}</p>
                  </li>
                );
              })}
            </ul>
            <BoundaryPicker />
          </StepPanel>

          <SignupPanel active={signingUp} reduced={reduced} />
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

function BoundaryPicker() {
  const [active, setActive] = useState<string[]>([BOUNDARIES[0]]);

  const toggle = (boundary: string) => {
    setActive((current) =>
      current.includes(boundary) ? current.filter((item) => item !== boundary) : [...current, boundary],
    );
  };

  return (
    <div className="mt-3 rounded-[24px] bg-lotus-white/85 p-4 ring-1 ring-lotus-blush/70 sm:p-5">
      <div className="flex items-center gap-3">
        <BatteryLow className="h-5 w-5 text-kumkum-600" strokeWidth={1.6} aria-hidden="true" />
        <p className="font-serif text-xl leading-tight text-lotus-brown">Say how you are today</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {BOUNDARIES.map((boundary) => {
          const selected = active.includes(boundary);
          return (
            <button
              key={boundary}
              type="button"
              aria-pressed={selected}
              onClick={() => toggle(boundary)}
              className={`rounded-full border px-3 py-1.5 text-sm transition-colors duration-300 ${
                selected
                  ? 'border-kumkum-600 bg-kumkum-600 text-lotus-white'
                  : 'border-lotus-muted/70 bg-lotus-ivory text-lotus-plum hover:border-lotus-plum'
              }`}
            >
              {boundary}
            </button>
          );
        })}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-lotus-plum">
        {active.length > 0
          ? `Visible to your matches: ${active.join(', ')}.`
          : 'Tap a boundary to let your matches know how you are feeling today.'}
      </p>
    </div>
  );
}

function MorningArrival(_props: { compact?: boolean }) {
  const cards = [
    { rotate: '-11deg', shift: '-46px', tone: 'bg-lotus-petal', front: false },
    { rotate: '11deg', shift: '46px', tone: 'bg-saffron-100', front: false },
    { rotate: '0deg', shift: '0px', tone: 'bg-lotus-white', front: true },
  ];

  return (
    <div className="mx-auto flex w-full max-w-[240px] flex-col items-center">
      <div className="relative h-28 w-full">
        <div className="absolute left-1/2 top-4 h-20 w-20 -translate-x-1/2 rounded-full bg-saffron-100/80 blur-xl" aria-hidden="true" />
        {cards.map((card) => (
          <div
            key={card.shift}
            className={`absolute left-1/2 top-1 flex h-[92px] w-[68px] -translate-x-1/2 flex-col items-center justify-center rounded-[18px] shadow-[0_16px_30px_-18px_rgba(114,84,93,0.55)] ring-1 ring-lotus-blush ${card.tone}`}
            style={{ transform: `translateX(calc(-50% + ${card.shift})) rotate(${card.rotate})` }}
          >
            {card.front ? (
              <>
                <Sunrise className="h-4 w-4 text-kumkum-600" strokeWidth={1.6} aria-hidden="true" />
                <p className="mt-1 font-serif text-2xl leading-none text-lotus-brown">8:00</p>
                <p className="mt-1 text-[10px] font-medium text-lotus-mauve">Chosen</p>
              </>
            ) : (
              <span className="h-8 w-8 rounded-full bg-lotus-white/70 ring-1 ring-lotus-blush" aria-hidden="true" />
            )}
          </div>
        ))}
      </div>
      <p className="mt-1 text-sm font-medium text-lotus-plum">3–5 people, every morning</p>
    </div>
  );
}

function HeroCollage() {
  return (
    <div className="relative mx-auto h-36 w-full max-w-sm sm:h-52 lg:h-80 lg:max-w-none">
      <div className="absolute right-0 top-0 h-[82%] w-[58%] overflow-hidden rounded-[100px_100px_18px_18px] shadow-[0_24px_50px_-28px_rgba(114,84,93,0.55)] sm:h-[78%] sm:w-[56%] sm:rounded-[140px_140px_22px_22px]">
        <Image
          src="https://images.pexels.com/photos/14316189/pexels-photo-14316189.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop"
          alt="A stylish Indian couple in colorful traditional outfits, smiling outdoors"
          fill
          priority
          sizes="(min-width: 1024px) 280px, 50vw"
          className="object-cover"
        />
      </div>
      <div className="absolute bottom-0 left-0 hidden h-[54%] w-[44%] overflow-hidden rounded-[100px_100px_18px_18px] border-4 border-lotus-ivory shadow-[0_20px_40px_-24px_rgba(114,84,93,0.5)] sm:block">
        <Image
          src="https://images.pexels.com/photos/15482742/pexels-photo-15482742.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
          alt="A young woman in a bold colorful turban, confident and stylish"
          fill
          sizes="(min-width: 1024px) 200px, 40vw"
          className="object-cover"
        />
      </div>
      <div className="absolute left-1/2 top-1/2 z-10 hidden h-16 w-16 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-lotus-white shadow-[0_16px_32px_-16px_rgba(114,84,93,0.45)] ring-1 ring-saffron-400/60 sm:flex">
        <span className="font-serif text-xl leading-none text-kumkum-600">1:1</span>
        <span className="mt-0.5 text-[10px] font-medium text-lotus-mauve">Balanced</span>
      </div>
      <div className="absolute bottom-0 left-0 z-20 origin-bottom-left scale-[0.62] sm:left-auto sm:right-[2%] sm:origin-bottom-right sm:scale-75 lg:scale-[0.82]">
        <ProfilePreview
          name="Ananya"
          age={29}
          city="Bengaluru"
          image="https://images.pexels.com/photos/10485148/pexels-photo-10485148.jpeg?auto=compress&cs=tinysrgb&w=500"
        />
      </div>
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
      <div className="mx-auto w-full max-w-xl pb-6 pt-24 lg:ml-auto lg:mr-[6%] lg:max-w-lg lg:pt-2">
        <h2 className="font-serif text-[clamp(1.85rem,4vw,3rem)] font-medium leading-[1.1] text-lotus-brown">
          Some connections are worth <span className="italic text-kumkum-600">waiting for.</span>
        </h2>
        <p className="mt-3 text-base text-lotus-plum">Be among the first in.</p>
        <ul className="mt-4 space-y-2 text-sm leading-relaxed text-lotus-plum">
          <li>The app is not open yet. This form is how you get on the invite list.</li>
          <li>One email holds one place, in the order you joined.</li>
          <li>Reserving a spot costs nothing.</li>
        </ul>
        <div className="mt-5 rounded-[28px] bg-lotus-white p-5 shadow-[0_40px_90px_-50px_rgba(114,84,93,0.45)] ring-1 ring-lotus-blush/70 sm:p-8">
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
  clearLotus,
  children,
}: {
  active: boolean;
  reduced: boolean;
  label: string;
  clearLotus?: boolean;
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
        className={`mx-auto w-full max-w-6xl ${clearLotus ? 'lg:pr-64' : ''}`}
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
