import { cn } from '@/lib/utils';

export function MandalaDivider({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center justify-center gap-5', className)} aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-saffron-400/70 sm:w-28" />
      <svg viewBox="0 0 48 48" className="h-10 w-10 shrink-0" fill="none">
        <g stroke="#E9A23B" strokeWidth="1" strokeOpacity="0.9">
          {Array.from({ length: 8 }).map((_, index) => (
            <ellipse
              key={index}
              cx="24"
              cy="13"
              rx="4.5"
              ry="11"
              transform={`rotate(${index * 45} 24 24)`}
            />
          ))}
        </g>
        <circle cx="24" cy="24" r="6" fill="#A8443A" />
        <circle cx="24" cy="24" r="2" fill="#FBEBC9" />
        <circle cx="24" cy="24" r="22" stroke="#A8443A" strokeOpacity="0.35" strokeWidth="0.75" strokeDasharray="1.5 3" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-saffron-400/70 sm:w-28" />
    </div>
  );
}
