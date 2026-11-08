import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { ctaPrimary, eyebrow, sectionHeading, sectionWrap } from '@/lib/styles';

type Voice = { quote: string; name: string; age: number; city: string };

const VOICES: Voice[] = [
  {
    quote:
      "I'm tired of small talk. I want conversations that start with what actually matters to someone.",
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

const FOUNDING_PERKS = [
  'First invites as we open city by city',
  'A voice in what we build next',
  'An intentionally small founding cohort',
];

function CommunityVoices() {
  return (
    <>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:divide-x lg:divide-lotus-blush/80">
        {VOICES.map((voice, index) => (
          <li key={`${voice.name}-${voice.city}`} className="lg:px-6 first:lg:pl-0 last:lg:pr-0">
            <Reveal delay={index * 100}>
              <p className="text-lg leading-snug text-lotus-brown">
                &ldquo;{voice.quote}&rdquo;
              </p>
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
    </>
  );
}

export function CommunitySection() {
  return (
    <section id="community" className="scroll-mt-20 overflow-hidden bg-lotus-white py-16 sm:py-20">
      <div className={sectionWrap}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className={eyebrow}>Community</p>
            <h2 className={`${sectionHeading} mt-5`}>
              Good things begin with the <span className="text-kumkum-600">right</span> people.
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-[1.75] text-lotus-plum">
              People who show up verified, answer before they chat, and prefer depth over noise.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-12">
            <div className="rounded-[32px] bg-lotus-petal p-8 sm:p-10 lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-10">
              <div className="flex h-full flex-col items-center justify-center text-center lg:px-6 lg:py-4">
                <p className="text-[15px] font-medium text-lotus-mauve">
                  Founding member invitation
                </p>
                <h3 className="mt-5 max-w-md font-serif text-4xl font-medium leading-[1.12] text-lotus-brown sm:text-5xl">
                  Be part of the <span className="text-kumkum-600">first</span> circle.
                </h3>
                <p className="mt-5 max-w-md text-[17px] font-medium leading-[1.65] text-lotus-plum">
                  Early access members will hear from us first as EqualSpace takes shape, and will have a voice in what
                  comes next.
                </p>
                <ul className="mt-7 w-full max-w-md space-y-3.5">
                  {FOUNDING_PERKS.map((perk) => (
                    <li
                      key={perk}
                      className="flex items-center justify-center gap-3 text-base font-medium leading-snug text-lotus-plum"
                    >
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-saffron-400" aria-hidden="true" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <p className="mt-7 text-sm font-medium text-lotus-mauve">Takes a minute — full form in the next section.</p>
                <a href="#early-access" className={`${ctaPrimary} group mt-6`}>
                  Sign up below
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5"
                    aria-hidden="true"
                  />
                </a>
              </div>
              <div className="relative mt-8 aspect-[4/5] w-full overflow-hidden rounded-[24px] shadow-[0_30px_60px_-36px_rgba(114,84,93,0.5)] lg:mt-0">
                <Image
                  src="https://images.pexels.com/photos/39910762/pexels-photo-39910762.jpeg?auto=compress&cs=tinysrgb&w=900"
                  alt="Friends in an animated conversation over tea indoors"
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-6">
          <Reveal className="shrink-0">
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[11rem] overflow-hidden rounded-[200px_200px_24px_24px] shadow-[0_30px_60px_-36px_rgba(114,84,93,0.5)] sm:max-w-[12.5rem] lg:mx-0 lg:w-[14rem] lg:max-w-none">
              <Image
                src="https://images.pexels.com/photos/6200777/pexels-photo-6200777.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="A young South Asian man with a beard, relaxed and confident outdoors"
                fill
                sizes="(min-width: 1024px) 14rem, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={150} className="min-w-0 flex-1">
            <div className="rounded-[32px] bg-lotus-petal p-6 sm:p-8">
              <CommunityVoices />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
