import Link from 'next/link';
import { Logo } from '@/components/ui/logo';
import { eyebrow, sectionWrap } from '@/lib/styles';

export function LegalDocument({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <main className="min-h-screen bg-lotus-ivory py-16 sm:py-24">
      <div className={`${sectionWrap} max-w-3xl`}>
        <Link href="/" aria-label="Back to EqualSpace home" className="inline-block">
          <Logo />
        </Link>
        <p className={`${eyebrow} mt-20`}>Legal</p>
        <h1 className="mt-6 font-serif text-5xl font-medium leading-[1.1] text-lotus-brown sm:text-6xl">{title}</h1>
        <p className="mt-8 text-lg leading-[1.75] text-lotus-plum">{intro}</p>
        <div className="mt-14 space-y-10">
          {sections.map((section) => (
            <section key={section.heading} className="border-t border-lotus-blush pt-8">
              <h2 className="text-2xl font-medium text-lotus-brown">{section.heading}</h2>
              <p className="mt-4 text-base leading-[1.8] text-lotus-plum">{section.body}</p>
            </section>
          ))}
        </div>
        <Link href="/" className="mt-16 inline-block text-[15px] font-medium text-lotus-plum underline underline-offset-4 hover:text-lotus-mauve">
          Return to EqualSpace
        </Link>
      </div>
    </main>
  );
}
