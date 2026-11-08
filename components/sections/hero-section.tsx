import Image from 'next/image';
import { ProfilePreview } from '@/components/ui/profile-preview';
import { HeroBackdrop } from '@/components/ui/hero-backdrop';
import { TiltCard } from '@/components/ui/tilt-card';
import { Mark } from '@/components/ui/mark';
import { ctaPrimary, ctaSecondary, eyebrow } from '@/lib/styles';

const HEADLINE = [
  { text: 'Meet', emphasis: false },
  { text: 'people', emphasis: false },
  { text: 'on', emphasis: false },
  { text: 'equal', emphasis: true },
  { text: 'footing,', emphasis: true },
  { text: 'finally.', emphasis: false },
];

const INDICATORS = [
  { value: '1:1', label: 'City balance', detail: 'Equal slots for women and men. No side is flooded.' },
  { value: '3–5', label: 'Morning introductions', detail: 'At 8:00 AM. Chosen for you — no swipe pile.' },
  { value: '5', label: 'Chats, maximum', detail: 'A hard cap so every conversation gets a real reply.' },
];

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-[radial-gradient(ellipse_at_85%_8%,_#FBEBC9_0%,_transparent_50%),radial-gradient(ellipse_at_8%_92%,_#F4CBD7_0%,_transparent_45%)] pb-16 pt-28 sm:pt-32"
    >
      <div className="jaali-bg absolute inset-0 -z-20 opacity-70" aria-hidden="true" />
      <HeroBackdrop />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 sm:px-10 lg:grid-cols-12 lg:gap-10 lg:px-16">
        <div className="relative z-10 lg:col-span-6">
          <p
            className={`${eyebrow} animate-fade-in inline-flex items-center gap-3 rounded-full border border-lotus-muted/60 bg-lotus-white/80 px-4 py-2`}
            style={{ animationDelay: '200ms' }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-saffron-400" aria-hidden="true" />
            City lists are filling
          </p>

          <h1 className="mt-8 font-serif text-[clamp(3.25rem,7vw,6.5rem)] font-medium leading-[1.02] tracking-[-0.015em] text-lotus-brown">
            {HEADLINE.map((word, index) => (
              <span key={word.text} className="mr-[0.22em] inline-block overflow-hidden align-bottom pb-[0.08em]">
                <span
                  className={`inline-block animate-word-up ${word.emphasis ? 'italic text-kumkum-600' : ''}`}
                  style={{ animationDelay: `${350 + index * 140}ms` }}
                >
                  {word.text}
                </span>
              </span>
            ))}
          </h1>

          <p
            className="mt-8 max-w-xl animate-fade-up text-lg leading-[1.7] text-lotus-plum sm:text-xl"
            style={{ animationDelay: '1100ms' }}
          >
            A few introductions each morning — or share a thought and let someone find you. Partnership, marriage, or taking it slow. Every city stays a strict <Mark>1:1</Mark>, women and men.
          </p>

          <div className="mt-10 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '1350ms' }}>
            <a href="#early-access" className={ctaPrimary}>
              Reserve my early access
            </a>
            <a href="#journey" className={ctaSecondary}>
              See how it works
            </a>
          </div>
        </div>

        <TiltCard className="relative mx-auto h-[440px] w-full max-w-[520px] sm:h-[520px] lg:col-span-6 lg:h-[560px]">
          <div
            className="absolute right-0 top-0 h-[78%] w-[56%] animate-clip-reveal overflow-hidden rounded-[200px_200px_28px_28px] shadow-[0_40px_80px_-40px_rgba(114,84,93,0.55)]"
            style={{ animationDelay: '250ms' }}
          >
            <Image
              src="https://images.pexels.com/photos/14316189/pexels-photo-14316189.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop"
              alt="A stylish Indian couple in colorful traditional outfits, smiling outdoors"
              fill
              priority
              sizes="(min-width: 1024px) 30vw, 56vw"
              className="object-cover"
            />
          </div>

          <div
            className="absolute bottom-0 left-0 h-[56%] w-[46%] animate-clip-reveal overflow-hidden rounded-[160px_160px_24px_24px] border-[6px] border-lotus-ivory shadow-[0_30px_60px_-30px_rgba(114,84,93,0.5)]"
            style={{ animationDelay: '600ms' }}
          >
            <Image
              src="https://images.pexels.com/photos/15482742/pexels-photo-15482742.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
              alt="A young woman in a bold colorful turban, confident and stylish"
              fill
              sizes="(min-width: 1024px) 22vw, 46vw"
              className="object-cover"
            />
          </div>

          <div
            className="absolute left-1/2 top-1/2 z-30 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 animate-fade-up flex-col items-center justify-center rounded-full bg-lotus-white shadow-[0_24px_48px_-20px_rgba(114,84,93,0.45)] ring-1 ring-saffron-400/60"
            style={{ animationDelay: '1000ms' }}
          >
            <span className="font-serif text-3xl leading-none text-kumkum-600">1:1</span>
            <span className="mt-1 text-xs font-medium text-lotus-mauve">Balanced</span>
          </div>

          <div className="absolute bottom-[4%] right-[2%] z-20 hidden animate-fade-up sm:block" style={{ animationDelay: '1500ms' }}>
            <div className="motion-safe:animate-float-slow">
              <ProfilePreview name="Ananya" age={29} city="Bengaluru" image="https://images.pexels.com/photos/10485148/pexels-photo-10485148.jpeg?auto=compress&cs=tinysrgb&w=500" />
            </div>
          </div>

        </TiltCard>
      </div>

      <dl className="relative z-10 mx-auto mt-16 grid max-w-7xl grid-cols-3 gap-6 px-6 sm:gap-8 sm:px-10 lg:mt-20 lg:px-16">
        {INDICATORS.map((item) => (
          <div key={item.label} className="border-t-2 border-lotus-muted/60 pt-6">
            <dd className="font-serif text-[3.25rem] font-normal tabular-nums lining-nums leading-none tracking-[0.06em] text-lotus-brown/90 sm:text-[3.75rem]">
              {item.value}
            </dd>
            <dt className="mt-3 text-[15px] font-medium text-lotus-brown/85">
              {item.label}
            </dt>
            <dd className="mt-3 max-w-xs text-[15px] font-medium leading-snug text-lotus-plum sm:text-base sm:leading-relaxed">
              {item.detail}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
