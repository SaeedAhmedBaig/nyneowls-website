import { Reveal } from "@/components/primitives/Reveal";

export function DataTable({ head, rows }: { head: string[]; rows: string[][] }) {
  return (
    <Reveal className="on-alt overflow-x-auto border border-line bg-paper">
      <table className="w-full border-collapse text-[13.5px]">
        <thead>
          <tr>
            {head.map((h) => (
              <th
                key={h}
                scope="col"
                className="min-w-[120px] border-b border-line px-[14px] py-3 text-left align-top text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground min-[761px]:min-w-[140px] min-[761px]:px-5 min-[761px]:py-4"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="[&:last-child>*]:border-b-0">
              {r.map((c, j) => {
                const cls =
                  "min-w-[120px] border-b border-line px-[14px] py-3 text-left align-top leading-[1.6] min-[761px]:min-w-[140px] min-[761px]:px-5 min-[761px]:py-4";
                return j === 0 ? (
                  <th key={j} scope="row" className={`${cls} font-bold text-ink`}>
                    {c}
                  </th>
                ) : (
                  <td key={j} className={`${cls} text-muted-foreground`}>
                    {c}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Reveal>
  );
}