'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Sunrise, Layers } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { eyebrow, sectionHeading, sectionWrap } from '@/lib/styles';

const MORNING_PICKS = [
  {
    name: 'Ananya',
    age: 29,
    city: 'Bengaluru',
    image: 'https://images.pexels.com/photos/10485148/pexels-photo-10485148.jpeg?auto=compress&cs=tinysrgb&w=200',
    reason: 'You both value slow mornings and share a love of classical music.',
  },
  {
    name: 'Rohan',
    age: 32,
    city: 'Mumbai',
    image: 'https://images.pexels.com/photos/7288892/pexels-photo-7288892.jpeg?auto=compress&cs=tinysrgb&w=200',
    reason: 'Aligned on relationship intentions and a shared love of long walks.',
  },
  {
    name: 'Meera',
    age: 30,
    city: 'Jaipur',
    image: 'https://images.pexels.com/photos/15482742/pexels-photo-15482742.jpeg?auto=compress&cs=tinysrgb&w=200',
    reason: 'Similar communication pace and a shared appetite for films and art.',
  },
];

const SURFACED_MATCHES = 12;

function PicksColumn() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="flex h-full flex-col rounded-[32px] border border-lotus-blush/80 bg-lotus-white p-8 sm:p-10">
      <div className="flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-saffron-100">
          <Sunrise className="h-5 w-5 text-kumkum-600" aria-hidden="true" />
        </span>
        <span className="rounded-full bg-lotus-petal px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-lotus-plum">
          Delivered 8:00 AM
        </span>
      </div>
      <h3 className="mt-8 font-serif text-3xl leading-tight text-lotus-brown">Your daily curated picks</h3>
      <p className="mt-4 text-base leading-[1.75] text-lotus-plum">
        Every morning, discover three to five people who are genuinely compatible with you.
      </p>

      <ul className="mt-8 space-y-3">
        {MORNING_PICKS.map((pick, index) => {
          const open = index === openIndex;
          return (
            <li key={pick.name} className="overflow-hidden rounded-2xl border border-lotus-blush/70 bg-lotus-ivory">
              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? -1 : index)}
                className="flex w-full items-center gap-4 px-4 py-3 text-left transition-colors duration-300 hover:bg-lotus-petal/60"
              >
                <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-lotus-white">
                  <Image src={pick.image} alt={`${pick.name}, sample profile`} fill sizes="44px" className="object-cover" />
                </span>
                <span className="flex-1">
                  <span className="block font-serif text-lg text-lotus-brown">
                    {pick.name}, {pick.age}
                  </span>
                  <span className="block text-[10px] uppercase tracking-[0.16em] text-lotus-mauve">{pick.city}</span>
                </span>
              </button>
              <div
                className={`grid transition-all duration-500 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <p className="overflow-hidden px-4 text-sm leading-relaxed text-lotus-plum">
                  <span className="block pb-4">Why you match: {pick.reason}</span>
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ThoughtlineColumn() {
  const [surfaced, setSurfaced] = useState(false);

  return (
    <div className="flex h-full flex-col rounded-[32px] bg-lotus-petal p-8 sm:p-10">
      <div className="flex items-center justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lotus-white">
          <Layers className="h-5 w-5 text-kumkum-600" aria-hidden="true" />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-lotus-mauve">Anonymous feed</span>
      </div>
      <h3 className="mt-8 font-serif text-3xl leading-tight text-lotus-brown">Thoughtline, a quiet text feed</h3>
      <p className="mt-4 text-base leading-[1.75] text-lotus-plum">
        Text-first posts with no public comments. When a post gains traction, only the best matches see it.
      </p>

      <article className="mt-8 rounded-2xl bg-lotus-white p-6 shadow-[0_20px_40px_-30px_rgba(114,84,93,0.4)]">
        <p className="text-[10px] uppercase tracking-[0.16em] text-lotus-mauve">Member, 30s · Pune</p>
        <p className="mt-3 font-serif text-xl italic leading-snug text-lotus-brown">
          What does a good disagreement look like to you?
        </p>
        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-saffron-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-saffron-400 to-kumkum-500 transition-[width] duration-1000 ease-out"
            style={{ width: surfaced ? '100%' : '38%' }}
          />
        </div>
        <p className="mt-2 text-[11px] text-lotus-mauve">{surfaced ? 'Traction reached' : 'Gaining traction'}</p>
      </article>

      <div className="mt-6 rounded-2xl border border-lotus-blush bg-lotus-white/70 p-5">
        <div className="grid grid-cols-6 gap-2" aria-hidden="true">
          {Array.from({ length: SURFACED_MATCHES }, (_, index) => (
            <span
              key={index}
              className={`aspect-square rounded-full transition-all duration-700 ${surfaced ? 'bg-kumkum-500 scale-100 opacity-100' : 'bg-lotus-blush scale-75 opacity-60'}`}
              style={{ transitionDelay: `${index * 60}ms` }}
            />
          ))}
        </div>
        <p className="mt-4 text-sm leading-relaxed text-lotus-plum">
          {surfaced
            ? 'The compatibility filter surfaces only the 10 to 12 best matches to its author.'
            : 'Once a post gains traction, the compatibility filter selects its best matches.'}
        </p>
        <button
          type="button"
          onClick={() => setSurfaced((value) => !value)}
          aria-pressed={surfaced}
          className="mt-4 rounded-full border border-lotus-muted/60 px-4 py-2 text-xs font-semibold text-lotus-brown transition-colors duration-300 hover:bg-lotus-petal"
        >
          {surfaced ? 'Reset the demo' : 'Simulate traction'}
        </button>
      </div>
    </div>
  );
}

export function MatchingSection() {
  return (
    <section id="matching" className="scroll-mt-20 bg-lotus-ivory py-20 sm:py-24">
      <div className={sectionWrap}>
        <div className="max-w-3xl">
          <p className={eyebrow}>Two ways to connect</p>
          <h2 className={`${sectionHeading} mt-5`}>
            Two ways to find your <em className="italic text-kumkum-600">people.</em>
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal className="h-full">
            <PicksColumn />
          </Reveal>
          <Reveal delay={150} className="h-full">
            <ThoughtlineColumn />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
