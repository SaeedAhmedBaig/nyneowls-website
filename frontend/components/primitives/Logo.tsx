import Link from "next/link";

// Placeholder mark. Replace the "NO" box with the real logo SVG from /public.
export function Logo() {
  return (
    <Link
      href="/"
      aria-label="Nyne Owls home"
      className="flex items-center gap-[11px] whitespace-nowrap text-[25px] font-extrabold tracking-[-0.07em]"
    >
      <span
        aria-hidden
        className="grid size-9 place-items-center bg-ink text-[11px] tracking-[-0.05em] text-onink"
      >
        NO
      </span>
      <b className="font-extrabold">
        nyne<span className="text-nyne">owls</span>
      </b>
    </Link>
  );
}