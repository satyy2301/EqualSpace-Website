import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { ctaPrimary, eyebrow, sectionHeading, sectionWrap } from '@/lib/styles';

const TESTIMONIALS = [
  'I want to meet someone who asks better questions than "what do you do for fun?"',
  'Finally, a place that feels considered rather than crowded.',
  'Starting with values instead of endless photos is exactly the change I was looking for.',
];

export function CommunitySection() {
  return (
    <section id="community" className="scroll-mt-20 overflow-hidden bg-lotus-white py-20 sm:py-24">
      <div className={sectionWrap}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className={eyebrow}>Community</p>
            <h2 className={`${sectionHeading} mt-5`}>
              Good things begin with the <em className="italic text-kumkum-600">right</em> people.
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="grid grid-cols-2 gap-4 sm:gap-6 lg:col-span-7">
            <div className="relative row-span-2 aspect-[3/4] overflow-hidden rounded-[200px_200px_24px_24px] shadow-[0_30px_60px_-36px_rgba(114,84,93,0.5)]">
              <Image
                src="https://images.pexels.com/photos/6200777/pexels-photo-6200777.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="A young South Asian man with a beard, relaxed and confident outdoors"
                fill
                sizes="(min-width: 1024px) 28vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] shadow-[0_30px_60px_-36px_rgba(114,84,93,0.5)]">
              <Image
                src="https://images.pexels.com/photos/4312847/pexels-photo-4312847.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Two friends laughing together, cheerful and relaxed"
                fill
                sizes="(min-width: 1024px) 24vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] shadow-[0_30px_60px_-36px_rgba(114,84,93,0.5)]">
              <Image
                src="https://images.pexels.com/photos/39910762/pexels-photo-39910762.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Friends in an animated conversation over tea indoors"
                fill
                sizes="(min-width: 1024px) 24vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={150} className="flex flex-col justify-center rounded-[32px] bg-lotus-petal p-8 sm:p-10 lg:col-span-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-lotus-mauve">Founding member invitation</p>
            <h3 className="mt-5 font-serif text-3xl font-medium leading-tight text-lotus-brown sm:text-4xl">
              Be part of the <em className="italic text-kumkum-600">first</em> circle.
            </h3>
            <p className="mt-5 text-base leading-[1.75] text-lotus-plum">
              Early access members will hear from us first as EqualSpace takes shape, and will have a voice in what comes next.
            </p>
            <a href="#early-access" className={`${ctaPrimary} group mt-8 self-start`}>
              Reserve my early access
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1.5" aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-6 border-t border-lotus-blush pt-10 md:grid-cols-3 md:gap-8">
          {TESTIMONIALS.map((quote, index) => (
            <li key={quote}>
              <Reveal delay={index * 120}>
                <p className="font-serif text-xl italic leading-snug text-lotus-brown">&ldquo;{quote}&rdquo;</p>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-xs leading-relaxed text-lotus-mauve">
          The quotes above are illustrative placeholders, not real member reviews.
        </p>
      </div>
    </section>
  );
}
