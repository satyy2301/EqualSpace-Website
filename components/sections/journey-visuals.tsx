'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';

const PICKS = [
  {
    name: 'Ananya',
    age: 29,
    city: 'Bengaluru',
    image: 'https://images.pexels.com/photos/10485148/pexels-photo-10485148.jpeg?auto=compress&cs=tinysrgb&w=500',
    interests: ['Classical music', 'Slow mornings'],
  },
  {
    name: 'Rohan',
    age: 32,
    city: 'Mumbai',
    image: 'https://images.pexels.com/photos/7288892/pexels-photo-7288892.jpeg?auto=compress&cs=tinysrgb&w=500',
    interests: ['Trekking', 'Cooking'],
  },
  {
    name: 'Meera',
    age: 30,
    city: 'Jaipur',
    image: 'https://images.pexels.com/photos/15482742/pexels-photo-15482742.jpeg?auto=compress&cs=tinysrgb&w=500',
    interests: ['Film', 'Art'],
  },
];

const DIMENSIONS = [
  { label: 'Shared values', value: 86 },
  { label: 'Emotional availability', value: 74 },
  { label: 'Communication', value: 81 },
  { label: 'Relationship intentions', value: 90 },
  { label: 'Lifestyle', value: 69 },
];

const QUESTIONS = [
  'What does a slow Sunday look like for you?',
  'Which value is non-negotiable in your life?',
  'How do you like to be reassured?',
  'What kind of conversation energises you?',
  'What are you hoping to build this year?',
];

const WINDOW_MS = 72 * 60 * 60 * 1000;

function formatRemaining(ms: number) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds].map((part) => String(part).padStart(2, '0')).join(':');
}

function QueueSide({ label, count }: { label: string; count: number }) {
  return (
    <div>
      <p className="text-sm font-medium text-lotus-mauve">{label}</p>
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {Array.from({ length: count }, (_, index) => (
          <span key={index} className="aspect-square rounded-full bg-lotus-petal ring-1 ring-lotus-blush" aria-hidden="true" />
        ))}
      </div>
      <p className="mt-3 text-sm text-lotus-plum">{count} members</p>
    </div>
  );
}

export function BalanceVisual() {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-8">
      <QueueSide label="Women" count={6} />
      <div className="flex flex-col items-center gap-3">
        <span className="font-serif text-4xl text-lotus-brown">1:1</span>
        <span className="rounded-full bg-saffron-100 px-3 py-1 text-xs font-medium text-lotus-plum">
          Balanced
        </span>
      </div>
      <QueueSide label="Men" count={6} />
    </div>
  );
}

export function PicksVisual() {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative h-[300px] w-full max-w-[260px]">
        {PICKS.map((pick, position) => {
          const offset = (position - index + PICKS.length) % PICKS.length;
          if (offset > 1) return null;
          return (
            <article
              key={pick.name}
              className="absolute inset-0 overflow-hidden rounded-[28px] bg-lotus-white shadow-[0_30px_60px_-30px_rgba(114,84,93,0.45)] ring-1 ring-saffron-400/30 transition-all duration-700 ease-out"
              style={{
                transform: `translateY(${offset * 14}px) scale(${1 - offset * 0.05})`,
                zIndex: PICKS.length - offset,
                opacity: 1 - offset * 0.35,
              }}
            >
              <div className="relative h-[60%]">
                <Image src={pick.image} alt={`${pick.name}, sample profile`} fill sizes="260px" className="object-cover" />
              </div>
              <div className="p-5">
                <p className="font-serif text-2xl text-lotus-brown">
                  {pick.name}, {pick.age}
                </p>
                <p className="mt-1 text-xs font-medium text-lotus-mauve">{pick.city}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {pick.interests.map((interest) => (
                    <span key={interest} className="rounded-full bg-saffron-100 px-2.5 py-1 text-[10px] text-lotus-plum">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      <div className="flex w-full max-w-[260px] items-center justify-between">
        <p className="text-xs text-lotus-plum">
          {index + 1} of {PICKS.length} sample profiles
        </p>
        <button
          type="button"
          onClick={() => setIndex((current) => (current + 1) % PICKS.length)}
          className="inline-flex items-center gap-1 rounded-full border border-lotus-muted/60 px-4 py-2 text-xs font-semibold text-lotus-brown transition-colors duration-300 hover:bg-lotus-petal"
        >
          Next profile
          <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

export function CompatibilityVisual() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <ul className="space-y-4">
        {DIMENSIONS.map((dimension, index) => (
          <li key={dimension.label}>
            <div className="flex justify-between text-sm text-lotus-plum">
              <span>{dimension.label}</span>
              <span className="font-semibold text-lotus-brown">{dimension.value}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-saffron-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-saffron-400 to-kumkum-500 transition-[width] duration-1000 ease-out"
                style={{ width: ready ? `${dimension.value}%` : '0%', transitionDelay: `${index * 120}ms` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div>
        <p className="text-xs font-medium text-lotus-mauve">Shared interests</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {['Classical music', 'Slow mornings'].map((interest) => (
            <span key={interest} className="rounded-full border border-saffron-400/60 px-3 py-1.5 text-xs text-lotus-plum">
              {interest}
            </span>
          ))}
        </div>
      </div>
      <p className="text-[11px] leading-relaxed text-lotus-mauve">
        Illustrative example. These percentages help explore alignment and are not a scientific prediction of compatibility.
      </p>
    </div>
  );
}

export function ChatVisual() {
  const [remaining, setRemaining] = useState(WINDOW_MS);

  useEffect(() => {
    const end = Date.now() + WINDOW_MS;
    const timer = setInterval(() => setRemaining(Math.max(0, end - Date.now())), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between rounded-2xl bg-lotus-petal px-5 py-4">
        <div>
          <p className="text-xs font-medium text-lotus-mauve">Focus window</p>
          <p className="mt-1 font-serif text-2xl tabular-nums text-lotus-brown">{formatRemaining(remaining)}</p>
        </div>
        <p className="max-w-[9rem] text-right text-[11px] leading-snug text-lotus-plum">Followed by a mandatory cooling period</p>
      </div>
      <p className="text-xs font-medium text-lotus-mauve">Five-question icebreaker</p>
      <ol className="space-y-2.5">
        {QUESTIONS.map((question, index) => (
          <li key={question} className="flex gap-3 rounded-xl border border-lotus-blush/70 bg-lotus-white px-4 py-3 text-sm text-lotus-brown">
            <span className="font-medium text-kumkum-600">{index + 1}</span>
            <span className="leading-snug">{question}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
