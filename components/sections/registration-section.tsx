import Image from 'next/image';
import { Reveal } from '@/components/ui/reveal';
import { RegistrationForm } from '@/components/ui/registration-form';
import {
  darkEyebrow,
  darkSectionBase,
  darkSectionBody,
  darkSectionHeading,
  darkSectionOverlay,
  sectionWrap,
} from '@/lib/styles';

export function RegistrationSection() {
  return (
    <section id="early-access" className={`${darkSectionBase} py-24 sm:py-32 lg:py-28`}>
      <div className={darkSectionOverlay} aria-hidden="true" />
      <div className={`${sectionWrap} flex flex-col gap-16 lg:flex-row lg:items-stretch lg:gap-10`}>
        <Reveal className="flex min-h-0 flex-col lg:w-[42%] lg:max-w-xl lg:shrink-0">
          <p className={darkEyebrow}>Your invitation awaits</p>
          <h2 className={`${darkSectionHeading} mt-6`}>
            Some connections are worth <span className="text-lotus-rose">waiting for.</span>
          </h2>
          <p className={`${darkSectionBody} mt-6 max-w-md`}>
            Be among the first in. A calmer way to meet someone who wants the same thing you do.
          </p>
          <div className="relative mt-8 hidden min-h-[10rem] flex-1 overflow-hidden rounded-[200px_200px_28px_28px] shadow-[0_40px_80px_-44px_rgba(0,0,0,0.45)] ring-1 ring-white/15 lg:block">
            <Image
              src="https://images.pexels.com/photos/15692311/pexels-photo-15692311.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Pink lotus flowers blooming across a calm pond"
              fill
              sizes="(min-width: 1024px) 420px, 100vw"
              className="object-cover object-center"
            />
          </div>
        </Reveal>

        <Reveal delay={150} className="min-w-0 lg:flex-1">
          <div className="h-full rounded-[32px] bg-lotus-white p-8 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.5)] ring-1 ring-white/20 sm:p-12">
            <RegistrationForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
