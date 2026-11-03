import { Blend, Scale, Hourglass, ShieldCheck, type LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { eyebrow, sectionHeading, sectionWrap } from '@/lib/styles';

const PRINCIPLES: { icon: LucideIcon; title: string; body: string; tag: string }[] = [
  {
    icon: Scale,
    title: 'Equal by design',
    body: 'Every city keeps a precise 1:1 balance between men and women.',
    tag: 'Exactly 1:1 in every city',
  },
  {
    icon: Hourglass,
    title: 'Quality over quantity',
    body: 'Three to five carefully curated introductions, every morning at 8 AM.',
    tag: 'Delivered at 8:00 AM',
  },
  {
    icon: Blend,
    title: 'Compatibility beyond appearance',
    body: 'Values, emotional availability, communication, relationship intentions, and lifestyle.',
    tag: 'Beyond photos alone',
  },
  {
    icon: ShieldCheck,
    title: 'Verified community',
    body: 'Aadhaar verification through DigiLocker and thoughtful community standards.',
    tag: 'Aadhaar via DigiLocker',
  },
];

export function PhilosophySection() {
  return (
    <section id="philosophy" className="scroll-mt-20 bg-lotus-ivory py-20 sm:py-24">
      <div className={sectionWrap}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className={eyebrow}>Our philosophy</p>
            <h2 className={`${sectionHeading} mt-5`}>
              Dating was never supposed to feel like a <em className="italic text-kumkum-600">numbers game.</em>
            </h2>
          </Reveal>
          <Reveal delay={150} className="lg:col-span-4 lg:col-start-9">
            <p className="text-base leading-[1.75] text-lotus-plum sm:text-lg">
              Endless swiping creates noise. Inboxes fill up and conversations lose intention. We believe the right introduction matters more than a thousand random matches.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {PRINCIPLES.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <li key={principle.title} className="h-full">
                <Reveal delay={index * 100} className="h-full">
                  <article className="group flex h-full flex-col rounded-3xl border border-lotus-blush/70 bg-lotus-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-lotus-muted/60 hover:shadow-[0_28px_50px_-30px_rgba(114,84,93,0.45)] sm:p-8">
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-lotus-petal text-lotus-mauve transition-transform duration-500 group-hover:scale-110">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="font-serif text-2xl italic text-lotus-muted" aria-hidden="true">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="mt-8 font-serif text-2xl font-normal leading-tight text-lotus-brown">{principle.title}</h3>
                    <p className="mt-4 flex-1 text-[15px] leading-[1.7] text-lotus-plum">{principle.body}</p>

                    <p className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-lotus-ivory px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-kumkum-600">
                      <span className="h-1 w-1 rounded-full bg-saffron-400" aria-hidden="true" />
                      {principle.tag}
                    </p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
