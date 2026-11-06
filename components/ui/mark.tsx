export function Mark({ children, onDark = false }: { children: React.ReactNode; onDark?: boolean }) {
  return <span className={onDark ? 'font-semibold text-lotus-rose' : 'font-semibold text-kumkum-600'}>{children}</span>;
}
