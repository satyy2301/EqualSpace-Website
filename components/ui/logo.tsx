import { Flower2 } from 'lucide-react';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-lotus-muted/70 bg-lotus-white text-lotus-plum">
        <Flower2 className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
      </span>
      <span className="font-serif text-2xl font-medium tracking-[0.02em] text-lotus-brown">
        Equal<span className="italic font-normal text-lotus-plum">Space</span>
      </span>
    </span>
  );
}
