const PETALS = [
  { angle: -58, scale: 0.72, delay: 0.1 },
  { angle: 58, scale: 0.72, delay: 0.1 },
  { angle: -30, scale: 0.88, delay: 0.25 },
  { angle: 30, scale: 0.88, delay: 0.25 },
  { angle: 0, scale: 1, delay: 0.4 },
];

export function LotusFlower({
  openness,
  className = '',
}: {
  openness: number;
  className?: string;
}) {
  const clamped = Math.min(1, Math.max(0, openness));

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role="img"
      aria-label="A lotus flower opening petal by petal"
    >
      <defs>
        <linearGradient id="lotus-petal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFDFC" />
          <stop offset="55%" stopColor="#FCE8ED" />
          <stop offset="100%" stopColor="#F4CBD7" />
        </linearGradient>
      </defs>
      {PETALS.map((petal) => {
        const local = Math.min(1, Math.max(0, (clamped - petal.delay) / 0.5));
        const eased = 1 - Math.pow(1 - local, 3);
        return (
          <g key={petal.angle} transform={`rotate(${petal.angle} 50 84)`}>
            <path
              d="M50 84 C 34 66, 30 40, 50 12 C 70 40, 66 66, 50 84 Z"
              fill="url(#lotus-petal)"
              stroke="#D5A0A9"
              strokeWidth="0.6"
              strokeOpacity={0.7}
              style={{
                transformBox: 'view-box',
                transformOrigin: '50px 84px',
                transform: `scale(${(0.15 + eased * 0.85) * petal.scale})`,
                opacity: 0.35 + eased * 0.65,
                transition: 'transform 900ms cubic-bezier(0.22, 1, 0.36, 1), opacity 900ms ease-out',
              }}
            />
          </g>
        );
      })}
      <circle cx="50" cy="84" r="4" fill="#E9D8C6" stroke="#D5A0A9" strokeWidth="0.5" />
      <path d="M22 88 Q50 96 78 88" fill="none" stroke="#D5A0A9" strokeWidth="0.6" strokeOpacity={0.6} />
    </svg>
  );
}
