import Image from 'next/image';

export function ProfilePreview({
  name,
  age,
  city,
  image,
  className = '',
}: {
  name: string;
  age: number;
  city: string;
  image: string;
  className?: string;
}) {
  return (
    <figure
      className={`w-52 rounded-[22px] bg-lotus-white/95 p-2.5 shadow-[0_28px_60px_-30px_rgba(114,84,93,0.5)] ring-1 ring-lotus-blush/80 ${className}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[16px]">
        <Image
          src={image}
          alt={`Profile preview of ${name}, ${age}`}
          fill
          sizes="208px"
          className="object-cover"
        />
      </div>
      <figcaption className="px-1.5 pb-1 pt-3">
        <p className="font-serif text-xl font-medium leading-tight text-lotus-brown">
          {name}, {age}
        </p>
        <p className="mt-0.5 text-[11px] uppercase tracking-[0.18em] text-lotus-mauve">{city}</p>
      </figcaption>
    </figure>
  );
}
