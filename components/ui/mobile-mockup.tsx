import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function MobileMockup({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'relative aspect-[9/18.5] w-[248px] rounded-[44px] bg-lotus-white p-2.5 shadow-[0_50px_90px_-40px_rgba(114,84,93,0.55)] ring-1 ring-lotus-champagne',
        className,
      )}
    >
      <div className="relative h-full overflow-hidden rounded-[36px] bg-lotus-ivory">
        <div className="absolute left-1/2 top-2.5 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-lotus-brown/90" aria-hidden="true" />
        <div className="h-full pt-9">{children}</div>
      </div>
    </div>
  );
}
