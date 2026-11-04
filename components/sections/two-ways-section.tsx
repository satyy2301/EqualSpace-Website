import { Leaf, MessageSquareHeart, Sparkles, type LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/ui/reveal';
import { darkSectionBase, darkSectionOverlay, sectionWrap } from '@/lib/styles';

const MATCH_POINTS = [
  'Matched on personality type and deep values',
  'A 5-question icebreaker before you ever chat',
  'Delivered fresh every morning, no swiping',
];

const FEED_POINTS = [
  'Post a thought, idea, or photo anonymously',
  'No public comments, ever',
  'A like is a private Match Offer',
];

function FeatureCard({
  icon: Icon,
  label,
  title,
  body,
  points,
  highlight = false,
}: {
  icon: LucideIcon;
  label: string;
  title: string;
  body: string;
  points: string[];
  highlight?: boolean;
}) {
  return (
    <article
      className={`group flex h-full flex-col rounded-[32px] border p-8 backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-1 sm:p-10 ${
        highlight
          ? 'border-saffron-400/50 bg-white/[0.06] shadow-[0_30px_80px_-40px_rgba(233,162,59,0.45)]'
          : 'border-lotus-rose/25 bg-white/[0.04] shadow-[0_30px_80px_-40px_rgba(232,169,189,0.35)]'
      }`}
    >
      <div className="flex items-center gap-4">
        <span
          className={`flex h-12 w-12 items-center justify-center rounded-full ${
            highlight ? 'bg-saffron-400/20 text-saffron-100' : 'bg-lotus-rose/20 text-lotus-blush'
          }`}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <p className={`text-[11px] font-semibold uppercase tracking-[0.24em] ${highlight ? 'text-saffron-100' : 'text-lotus-blush'}`}>
          {label}
        </p>
      </div>

      <h3 className="mt-8 font-serif text-3xl font-medium leading-[1.15] text-lotus-white sm:text-4xl">{title}</h3>
      <p className="mt-5 text-base leading-[1.75] text-lotus-blush/90">{body}</p>

      <ul className="mt-8 space-y-3 border-t border-white/10 pt-8">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-3 text-[15px] leading-relaxed text-lotus-white">
            <span
              className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${highlight ? 'bg-saffron-400' : 'bg-lotus-rose'}`}
              aria-hidden="true"
            />
            {point}
          </li>
        ))}
      </ul>
    </article>
  );
}

export function TwoWaysSection() {
  return (
    <section id="two-ways" className={`${darkSectionBase} py-28 sm:py-36`}>
      <div className={darkSectionOverlay} aria-hidden="true" />
      <div className={`${sectionWrap}`}>
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-saffron-100">Two ways to connect</p>
          <h2 className="mt-6 font-serif text-4xl font-medium leading-[1.12] text-lotus-white sm:text-5xl lg:text-6xl">
            Find your match, or let your <em className="italic text-lotus-rose">thoughts</em> find you.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-[1.7] text-lotus-blush/90">
            Choose the pace that feels right. Both paths lead to people who share your values.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <Reveal delay={100}>
            <FeatureCard
              icon={Sparkles}
              label="Feature 1: The Daily Match Engine"
              title="3 to 5 handpicked profiles every morning."
              body="No endless swiping. Each morning you get a small, carefully chosen set of people, matched on personality, values, and what you are truly looking for."
              points={MATCH_POINTS}
            />
          </Reveal>
          <Reveal delay={250}>
            <FeatureCard
              icon={MessageSquareHeart}
              label="Feature 2: The Thoughtline Feed"
              title="Share thoughts. No public comments. Pure resonance."
              body="Post an anonymous thought, idea, or photo and let it speak for you. Nobody can argue in the comments. When someone likes your post, it becomes a quiet, private invitation to connect."
              points={FEED_POINTS}
              highlight
            />
          </Reveal>
        </div>

        <Reveal delay={350}>
          <div className="mx-auto mt-10 flex max-w-3xl flex-col items-start gap-5 rounded-[28px] border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-saffron-400/15 text-saffron-100">
              <Leaf className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-serif text-2xl font-medium text-lotus-white">Overwhelm protection</p>
              <p className="mt-2 text-[15px] leading-relaxed text-lotus-blush/90">
                Popular posts are filtered so authors only see their top 10 to 12 compatible matches. Your inbox stays calm, and nothing feels like a crowd.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
