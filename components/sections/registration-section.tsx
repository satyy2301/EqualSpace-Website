import { Reveal } from '@/components/ui/reveal';
import { RegistrationForm } from '@/components/ui/registration-form';
import { LotusBloom } from '@/components/sections/lotus-section';
import { sectionHeading, sectionWrap } from '@/lib/styles';

const VOICES = [
  {
    quote: "I'm tired of small talk. I want conversations that start with what actually matters to someone.",
    name: 'Ananya',
    age: 28,
    city: 'Bengaluru',
  },
  {
    quote: 'It already feels intentional — like someone thought about pace, not just volume.',
    name: 'Rohan',
    age: 31,
    city: 'Mumbai',
  },
  {
    quote: "Leading with values and verification first? That's how I actually want to meet someone.",
    name: 'Meera',
    age: 27,
    city: 'Delhi',
  },
];

export function RegistrationSection() {
  return (
    <section aria-labelledby="invite-heading" className="bg-lotus-ivory">
      <LotusBloom />

      <div id="early-access" className="scroll-mt-20 pb-24 pt-16 sm:pb-32 sm:pt-20">
        <div className={sectionWrap}>
          <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:divide-x lg:divide-lotus-blush/80">
            {VOICES.map((voice, index) => (
              <li key={`${voice.name}-${voice.city}`} className="lg:px-8 first:lg:pl-0 last:lg:pr-0">
                <Reveal delay={index * 80}>
                  <p className="text-lg leading-snug text-lotus-brown">&ldquo;{voice.quote}&rdquo;</p>
                  <p className="mt-2 text-[15px] font-medium text-lotus-mauve">
                    {voice.name} · {voice.age} · {voice.city}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-lotus-mauve">
            Illustrative placeholders, not real member reviews.
          </p>

          <div className="mt-14 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <Reveal className="lg:col-span-5">
              <h2 id="invite-heading" className={sectionHeading}>
                Some connections are worth <span className="text-kumkum-600">waiting for.</span>
              </h2>
              <p className="mt-5 max-w-md text-lg leading-[1.7] text-lotus-plum">Be among the first in.</p>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-7">
              <div className="rounded-[32px] bg-lotus-white p-8 shadow-[0_40px_90px_-50px_rgba(114,84,93,0.45)] ring-1 ring-lotus-blush/70 sm:p-12">
                <RegistrationForm />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
