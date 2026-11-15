import { STATUS, STATUS_ORDER, type Status } from "@/lib/status";

export function StatusChip({ status }: { status: Status }) {
  const step = STATUS_ORDER.indexOf(status) + 1;
  return (
    <span
      title={STATUS[status].meaning}
      className="inline-flex items-center gap-2.5 border border-line px-2.5 py-[5px] text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground"
    >
      <span aria-hidden className="flex gap-[3px]">
        {STATUS_ORDER.map((s, i) => (
          <span key={s} className={`size-1.5 ${i < step ? "bg-nyne" : "bg-line"}`} />
        ))}
      </span>
      <span className="sr-only">Status, step {step} of {STATUS_ORDER.length}: </span>
      {STATUS[status].label}
    </span>
  );
}