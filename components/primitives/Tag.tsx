export function Tag({ children, red = false }: { children: React.ReactNode; red?: boolean }) {
  return (
    <span
      className={`inline-block border px-2 py-[5px] text-[10px] font-bold uppercase tracking-[0.1em] ${
        red ? "border-nyne text-nyne-text" : "border-line text-muted-foreground"
      }`}
    >
      {children}
    </span>
  );
}