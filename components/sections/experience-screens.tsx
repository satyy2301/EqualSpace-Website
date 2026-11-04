import type { ReactNode } from 'react';
import Image from 'next/image';
import { Heart, ShieldCheck } from 'lucide-react';

const ROHAN_PHOTO = 'https://images.pexels.com/photos/7288892/pexels-photo-7288892.jpeg?auto=compress&cs=tinysrgb&w=700';
const ANANYA_PHOTO = 'https://images.pexels.com/photos/10485148/pexels-photo-10485148.jpeg?auto=compress&cs=tinysrgb&w=500';

function ScreenHeader({ label }: { label: string }) {
  return (
    <div className="flex shrink-0 items-center justify-between border-b border-lotus-blush/50 px-5 pt-4 pb-3">
      <span className="font-serif text-lg italic text-lotus-brown">EqualSpace</span>
      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-lotus-mauve">{label}</span>
    </div>
  );
}

function MockFooter({ children }: { children: ReactNode }) {
  return (
    <div className="mt-auto shrink-0 border-t border-lotus-blush/60 bg-lotus-white/80 px-5 py-3">{children}</div>
  );
}

export function ProfileScreen() {
  const interests = ['Classical music', 'Cooking', 'Film', 'Trekking'];
  const values = ['Honest communication', 'Slow pace', 'Shared curiosity'];
  return (
    <div className="flex h-full min-h-0 flex-col">
      <ScreenHeader label="Member profile" />
      <div className="relative mx-4 mt-4 h-[11.5rem] shrink-0 overflow-hidden rounded-[18px]">
        <Image src={ROHAN_PHOTO} alt="Rohan, smiling outdoors" fill sizes="280px" className="object-cover" />
      </div>
      <div className="flex min-h-0 flex-1 flex-col space-y-3.5 px-5 pt-4">
        <div>
          <p className="font-serif text-2xl text-lotus-brown">Rohan, 32</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-lotus-mauve">Mumbai</p>
        </div>
        <p className="flex items-center gap-1.5 text-[10px] font-medium text-lotus-plum">
          <ShieldCheck className="h-3.5 w-3.5 text-kumkum-600" aria-hidden="true" />
          Verified via DigiLocker
        </p>
        <p className="text-[12px] leading-relaxed text-lotus-plum">
          Slow Sunday mornings, long walks, and honest conversations over good chai.
        </p>
        <div className="flex flex-wrap gap-1.5">
          {interests.map((interest) => (
            <span key={interest} className="rounded-full bg-saffron-100 px-2.5 py-1 text-[10px] text-lotus-plum">
              {interest}
            </span>
          ))}
        </div>
        <div className="rounded-2xl border border-saffron-400/50 bg-lotus-white px-4 py-3">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-lotus-mauve">Looking for</p>
          <p className="mt-1 font-serif text-base text-lotus-brown">A serious relationship</p>
        </div>
        <ul className="space-y-2 rounded-2xl bg-lotus-petal/80 px-4 py-3">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-lotus-mauve">Values snapshot</p>
          {values.map((value) => (
            <li key={value} className="flex items-center gap-2 text-[11px] text-lotus-plum">
              <span className="h-1 w-1 rounded-full bg-saffron-400" aria-hidden="true" />
              {value}
            </li>
          ))}
        </ul>
        <MockFooter>
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-lotus-mauve">Before you chat</p>
          <p className="mt-1 font-serif text-[13px] italic text-lotus-brown">Answer 5 icebreaker questions to unlock messaging.</p>
        </MockFooter>
      </div>
    </div>
  );
}

export function CompatibilityScreen() {
  const dimensions = [
    { label: 'Shared values', value: 86 },
    { label: 'Communication', value: 78 },
    { label: 'Lifestyle', value: 72 },
    { label: 'Relationship goals', value: 90 },
    { label: 'Common interests', value: 64 },
    { label: 'Pace & energy', value: 81 },
  ];
  return (
    <div className="flex h-full min-h-0 flex-col">
      <ScreenHeader label="Compatibility" />
      <div className="flex min-h-0 flex-1 flex-col px-5 pt-4">
        <div>
          <p className="font-serif text-2xl text-lotus-brown">Overview</p>
          <p className="mt-1 text-[10px] leading-relaxed text-lotus-mauve">Illustrative example to explore alignment</p>
        </div>
        <ul className="mt-5 flex-1 space-y-3.5 overflow-y-auto pb-3">
          {dimensions.map((item) => (
            <li key={item.label}>
              <div className="flex justify-between text-[11px] text-lotus-plum">
                <span>{item.label}</span>
                <span className="font-semibold">{item.value}%</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full bg-saffron-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-saffron-400 to-kumkum-500"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
        <MockFooter>
          <p className="font-serif text-[15px] text-lotus-brown">Strong fit on relationship goals</p>
          <p className="mt-1 text-[11px] leading-relaxed text-lotus-plum">
            Context to help you decide—not a score to chase.
          </p>
        </MockFooter>
      </div>
    </div>
  );
}

export function IntroductionScreen() {
  const reasons = ['Both prefer slow mornings', 'Shared love of classical music', 'Aligned on long-term intentions'];
  return (
    <div className="flex h-full min-h-0 flex-col">
      <ScreenHeader label="Introduction" />
      <div className="flex min-h-0 flex-1 flex-col px-5 pt-4">
        <div className="relative mx-auto h-[11rem] w-full shrink-0">
          <div className="absolute left-0 top-5 h-[9.5rem] w-[58%] overflow-hidden rounded-[16px] shadow-lg ring-4 ring-lotus-white">
            <Image src={ANANYA_PHOTO} alt="Ananya, portrait" fill sizes="140px" className="object-cover" />
          </div>
          <div className="absolute right-0 top-0 h-[10.5rem] w-[58%] overflow-hidden rounded-[16px] shadow-lg ring-4 ring-lotus-white">
            <Image src={ROHAN_PHOTO} alt="Rohan, portrait" fill sizes="140px" className="object-cover" />
          </div>
        </div>
        <p className="mt-5 text-center font-serif text-xl italic text-lotus-brown">Ananya & Rohan</p>
        <p className="mt-2 text-center text-[12px] leading-relaxed text-lotus-plum">
          You both value slow mornings and share a love of classical music. A thoughtful place to begin.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-1.5">
          {['Classical music', 'Slow mornings'].map((item) => (
            <span key={item} className="rounded-full border border-saffron-400/60 px-2.5 py-1 text-[10px] text-lotus-plum">
              {item}
            </span>
          ))}
        </div>
        <ul className="mt-5 space-y-2 rounded-2xl bg-lotus-petal/90 px-4 py-3">
          <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-lotus-mauve">Why you were introduced</p>
          {reasons.map((reason) => (
            <li key={reason} className="text-[11px] leading-snug text-lotus-plum">
              {reason}
            </li>
          ))}
        </ul>
        <MockFooter>
          <div className="flex flex-col gap-2">
            <span className="rounded-full bg-kumkum-600 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.14em] text-lotus-white">
              Start with icebreakers
            </span>
            <span className="rounded-full border border-lotus-muted/60 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-lotus-plum">
              Save for later
            </span>
          </div>
        </MockFooter>
      </div>
    </div>
  );
}

export function ConversationScreen() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex shrink-0 items-center gap-3 border-b border-lotus-blush/70 px-5 py-4">
        <div className="relative h-9 w-9 overflow-hidden rounded-full">
          <Image src={ROHAN_PHOTO} alt="Rohan" fill sizes="36px" className="object-cover" />
        </div>
        <div>
          <p className="font-serif text-base text-lotus-brown">Rohan</p>
          <p className="text-[9px] uppercase tracking-[0.18em] text-lotus-mauve">Matched 2 days ago</p>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-5 py-4 text-[12px]">
        <p className="text-center text-[9px] uppercase tracking-[0.2em] text-lotus-mauve">Today</p>
        <div className="max-w-[80%] self-start rounded-2xl rounded-bl-md bg-lotus-petal px-3.5 py-2.5 leading-relaxed text-lotus-brown">
          Your note about the blue lanes of Jodhpur made my whole week.
        </div>
        <div className="max-w-[80%] self-end rounded-2xl rounded-br-md bg-kumkum-600 px-3.5 py-2.5 leading-relaxed text-lotus-white">
          Which one was your favorite?
        </div>
        <div className="max-w-[85%] self-start rounded-2xl rounded-bl-md bg-lotus-petal px-3.5 py-2.5 leading-relaxed text-lotus-brown">
          The one near the clock tower, at sunset. I still think about it.
        </div>
        <div className="max-w-[78%] self-end rounded-2xl rounded-br-md bg-kumkum-600 px-3.5 py-2.5 leading-relaxed text-lotus-white">
          That sounds perfect. I would love to hear more sometime.
        </div>
        <div className="max-w-[82%] self-start rounded-2xl rounded-bl-md bg-lotus-petal px-3.5 py-2.5 leading-relaxed text-lotus-brown">
          Maybe over chai this weekend, if the city slows down enough for us.
        </div>
        <div className="rounded-2xl border border-saffron-400/50 bg-lotus-white px-4 py-3">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-lotus-mauve">Conversation prompt</p>
          <p className="mt-1 font-serif text-[13px] italic text-lotus-brown">What does a perfect slow Sunday look like to you?</p>
        </div>
      </div>
      <div className="shrink-0 border-t border-lotus-blush/60 px-5 py-3">
        <div className="rounded-full border border-lotus-blush bg-lotus-white px-4 py-2.5 text-[11px] text-lotus-mauve">
          Write a thoughtful reply…
        </div>
      </div>
    </div>
  );
}

const FEED_POSTS = [
  {
    meta: 'Member · 30s · Pune',
    thought: 'What does a good disagreement look like to you?',
    traction: 38,
    tractionLabel: 'Gaining traction',
    featured: true,
  },
  {
    meta: 'Member · 20s · Bengaluru',
    thought: 'I miss conversations that do not rush to a verdict.',
    traction: 12,
    tractionLabel: 'New today',
    featured: false,
  },
  {
    meta: 'Member · 30s · Delhi',
    thought: 'The best dates start with a question, not a résumé.',
    traction: 24,
    tractionLabel: 'Steady resonance',
    featured: false,
  },
] as const;

export function ThoughtlineScreen() {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <ScreenHeader label="Thoughtline" />
      <p className="shrink-0 px-5 pb-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-lotus-mauve">
        Anonymous · no public comments
      </p>
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 pb-3">
        {FEED_POSTS.map((post) => (
          <article
            key={post.thought}
            className={`rounded-2xl border px-4 py-3.5 ${
              post.featured
                ? 'border-lotus-blush/80 bg-lotus-white shadow-[0_12px_28px_-22px_rgba(114,84,93,0.45)]'
                : 'border-lotus-blush/50 bg-lotus-white/80'
            }`}
          >
            <p className="text-[10px] uppercase tracking-[0.14em] text-lotus-mauve">{post.meta}</p>
            <p className="mt-2 font-serif text-[15px] italic leading-snug text-lotus-brown">{post.thought}</p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-saffron-100">
              <div
                className="h-full rounded-full bg-gradient-to-r from-saffron-400 to-kumkum-500"
                style={{ width: `${post.traction}%` }}
              />
            </div>
            <p className="mt-1.5 text-[10px] text-lotus-mauve">{post.tractionLabel}</p>
            {post.featured ? (
              <div className="mt-3 flex items-center gap-2 border-t border-lotus-blush/60 pt-3 text-[10px] text-lotus-plum">
                <Heart className="h-3.5 w-3.5 fill-kumkum-500 text-kumkum-500" aria-hidden="true" />
                <span>Like sends a private match offer</span>
              </div>
            ) : null}
          </article>
        ))}
      </div>
      <div className="shrink-0 border-t border-lotus-blush/60 bg-lotus-white/90 px-4 py-3">
        <p className="rounded-2xl border border-dashed border-lotus-muted/70 bg-lotus-ivory px-4 py-3 text-[11px] text-lotus-mauve">
          Share a thought — your name stays private
        </p>
      </div>
    </div>
  );
}
