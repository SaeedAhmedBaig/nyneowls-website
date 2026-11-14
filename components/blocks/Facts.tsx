import { CountUp } from "@/components/primitives/CountUp";
import { Reveal } from "@/components/primitives/Reveal";

export function Facts({ items }: { items: { value: number; label: string }[] }) {
  return (
    <Reveal className="grid grid-cols-1 gap-px border border-line bg-line min-[761px]:grid-cols-3">
      {items.map((f) => (
        <div key={f.label} className="bg-paper px-4 py-[22px]">
          <div className="text-[clamp(34px,4.4vw,56px)] font-bold leading-none tracking-[-0.05em]">
            <CountUp to={f.value} />
          </div>
          <span className="mt-2 block text-[11px] text-muted-foreground">{f.label}</span>
        </div>
      ))}
    </Reveal>
  );
}