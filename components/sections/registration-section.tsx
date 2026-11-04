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
    <section id="early-access" className={`${darkSectionBase} py-32 sm:py-40`}>
      <div className={darkSectionOverlay} aria-hidden="true" />
      <div className={`${sectionWrap} grid gap-16 lg:grid-cols-12 lg:gap-10`}>
        <Reveal className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
          <p className={darkEyebrow}>Your invitation awaits</p>
          <h2 className={`${darkSectionHeading} mt-6`}>
            Some connections are worth <em className="italic text-lotus-rose">waiting for.</em>
          </h2>
          <p className={`${darkSectionBody} mt-6 max-w-md`}>
            Be among the first to experience a more intentional way of finding love.
          </p>
          <div className="relative mt-12 hidden aspect-[4/5] max-w-sm overflow-hidden rounded-[200px_200px_28px_28px] shadow-[0_40px_80px_-44px_rgba(0,0,0,0.45)] ring-1 ring-white/15 lg:block">
            <Image
              src="https://images.pexels.com/photos/15692311/pexels-photo-15692311.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Pink lotus flowers blooming across a calm pond"
              fill
              sizes="380px"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={150} className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-[32px] bg-lotus-white p-8 shadow-[0_40px_90px_-50px_rgba(0,0,0,0.5)] ring-1 ring-white/20 sm:p-12">
            <RegistrationForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
