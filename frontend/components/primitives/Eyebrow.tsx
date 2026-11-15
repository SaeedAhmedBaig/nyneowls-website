export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`mb-6 flex items-center gap-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground ${className}`}
    >
      <span aria-hidden className="size-[7px] shrink-0 rounded-full bg-nyne" />
      {children}
    </div>
  );
}