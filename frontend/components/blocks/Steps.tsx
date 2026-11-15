import { Reveal } from "@/components/primitives/Reveal";

export type StepItem = { title: string; text: string };

const cols = {
  2: "min-[561px]:grid-cols-2",
  3: "min-[561px]:grid-cols-2 min-[1101px]:grid-cols-3",
  4: "min-[561px]:grid-cols-2 min-[1101px]:grid-cols-4",
  5: "min-[561px]:grid-cols-2 min-[1101px]:grid-cols-5",
  6: "min-[561px]:grid-cols-2 min-[1101px]:grid-cols-6",
} as const;

export function Steps({ items, cols: n = 3 }: { items: StepItem[]; cols?: 2 | 3 | 4 | 5 | 6 }) {
  return (
    <Reveal className={`grid grid-cols-1 border-t border-line ${cols[n]}`}>
      {items.map((s, i) => (
        <div key={s.title} className="border-b border-line py-6 pr-5">
          <span className="mb-3 block text-[10px] font-bold tracking-[0.12em] text-nyne-text">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mb-2 text-lg font-bold tracking-[-0.03em]">{s.title}</h3>
          <p className="max-w-[340px] text-[13px] leading-[1.65] text-muted-foreground">{s.text}</p>
        </div>
      ))}
    </Reveal>
  );
}