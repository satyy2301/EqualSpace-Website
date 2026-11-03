import Image from 'next/image';

const ROHAN_PHOTO = 'https://images.pexels.com/photos/7288892/pexels-photo-7288892.jpeg?auto=compress&cs=tinysrgb&w=700';
const ANANYA_PHOTO = 'https://images.pexels.com/photos/10485148/pexels-photo-10485148.jpeg?auto=compress&cs=tinysrgb&w=500';

function ScreenHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between px-5 pt-4 pb-3">
      <span className="font-serif text-lg italic text-lotus-brown">EqualSpace</span>
      <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-lotus-mauve">{label}</span>
    </div>
  );
}

export function ProfileScreen() {
  const interests = ['Classical music', 'Cooking', 'Film', 'Trekking'];
  return (
    <div className="flex h-full flex-col">
      <ScreenHeader label="Member profile" />
      <div className="relative h-44 mx-4 overflow-hidden rounded-[18px]">
        <Image src={ROHAN_PHOTO} alt="Rohan, smiling outdoors" fill sizes="240px" className="object-cover" />
      </div>
      <div className="flex-1 space-y-4 px-5 pt-5">
        <div>
          <p className="font-serif text-2xl text-lotus-brown">Rohan, 32</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-lotus-mauve">Mumbai</p>
        </div>
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
  ];
  return (
    <div className="flex h-full flex-col">
      <ScreenHeader label="Compatibility" />
      <div className="flex-1 space-y-6 px-5 pt-4">
        <div>
          <p className="font-serif text-2xl text-lotus-brown">Overview</p>
          <p className="mt-1 text-[10px] leading-relaxed text-lotus-mauve">Illustrative example to explore alignment</p>
        </div>
        <ul className="space-y-4">
          {dimensions.map((item) => (
            <li key={item.label}>
              <div className="flex justify-between text-[11px] text-lotus-plum">
                <span>{item.label}</span>
                <span className="font-semibold">{item.value}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-saffron-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-saffron-400 to-kumkum-500"
                  style={{ width: `${item.value}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function IntroductionScreen() {
  return (
    <div className="flex h-full flex-col">
      <ScreenHeader label="Introduction" />
      <div className="flex-1 px-5 pt-4">
        <div className="relative mx-auto h-44 w-full">
          <div className="absolute left-0 top-4 h-36 w-[58%] overflow-hidden rounded-[16px] shadow-lg ring-4 ring-lotus-white">
            <Image src={ANANYA_PHOTO} alt="Ananya, portrait" fill sizes="120px" className="object-cover" />
          </div>
          <div className="absolute right-0 top-0 h-40 w-[58%] overflow-hidden rounded-[16px] shadow-lg ring-4 ring-lotus-white">
            <Image src={ROHAN_PHOTO} alt="Rohan, portrait" fill sizes="120px" className="object-cover" />
          </div>
        </div>
        <p className="mt-6 text-center font-serif text-xl italic text-lotus-brown">Ananya & Rohan</p>
        <p className="mt-3 text-center text-[12px] leading-relaxed text-lotus-plum">
          You both value slow mornings and share a love of classical music. A thoughtful place to begin.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-1.5">
          {['Classical music', 'Slow mornings'].map((item) => (
            <span key={item} className="rounded-full border border-saffron-400/60 px-2.5 py-1 text-[10px] text-lotus-plum">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ConversationScreen() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-lotus-blush/70 px-5 py-4">
        <div className="relative h-9 w-9 overflow-hidden rounded-full">
          <Image src={ROHAN_PHOTO} alt="Rohan" fill sizes="36px" className="object-cover" />
        </div>
        <div>
          <p className="font-serif text-base text-lotus-brown">Rohan</p>
          <p className="text-[9px] uppercase tracking-[0.18em] text-lotus-mauve">Matched 2 days ago</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 px-5 py-5 text-[12px]">
        <div className="max-w-[80%] self-start rounded-2xl rounded-bl-md bg-lotus-petal px-3.5 py-2.5 leading-relaxed text-lotus-brown">
          Your note about the blue lanes of Jodhpur made my whole week.
        </div>
        <div className="max-w-[80%] self-end rounded-2xl rounded-br-md bg-kumkum-600 px-3.5 py-2.5 leading-relaxed text-lotus-white">
          Which one was your favorite?
        </div>
        <div className="max-w-[85%] self-start rounded-2xl rounded-bl-md bg-lotus-petal px-3.5 py-2.5 leading-relaxed text-lotus-brown">
          The one near the clock tower, at sunset. I still think about it.
        </div>
        <div className="mt-auto rounded-2xl border border-saffron-400/50 bg-lotus-white px-4 py-3">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-lotus-mauve">Conversation prompt</p>
          <p className="mt-1 font-serif text-[13px] italic text-lotus-brown">What does a perfect slow Sunday look like to you?</p>
        </div>
      </div>
    </div>
  );
}
