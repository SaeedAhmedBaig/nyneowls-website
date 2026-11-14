import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { topics } from "@/content/contact";

const tracks = topics.filter((t) => ["hire", "collaborate", "partner"].includes(t.value));

export function WorkAside() {
  return (
    <div className="w-full max-w-[560px] min-[901px]:ml-auto" aria-label="Ways to work with us">
      <div className="mb-3 flex justify-between gap-3 text-[9px] font-bold tracking-[0.11em] text-muted-foreground">
        <span>THREE WAYS IN</span>
        <span>PICK ONE</span>
      </div>
      <div className="border border-line bg-paper">
        {tracks.map((t, i) => (
          <Link
            key={t.value}
            href={`/work-with-us?topic=${t.value}#form`}
            data-v
            className="group flex items-center justify-between gap-4 border-b border-line px-6 py-5 transition-colors last:border-0 hover:bg-card"
          >
            <span className="flex items-start gap-4">
              <span className="pt-1 text-[10px] font-bold tracking-[0.12em] text-nyne-text">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <b className="block text-base font-semibold tracking-[-0.02em] transition-colors group-hover:text-nyne-text">
                  {t.label}
                </b>
                <span className="mt-1 block text-[13px] leading-[1.5] text-muted-foreground">{t.hint}</span>
              </span>
            </span>
            <ArrowUpRight
              className="size-4 shrink-0 text-muted-foreground transition-[transform,color] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-nyne-text"
              aria-hidden
            />
          </Link>
        ))}
      </div>
    </div>
  );
}