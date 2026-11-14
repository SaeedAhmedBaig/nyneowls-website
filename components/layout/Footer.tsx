import Link from "next/link";
import { Logo } from "@/components/primitives/Logo";
import { companyNav, COPYRIGHT_YEAR, divisions, EMAIL, legalNav } from "@/lib/site";

function Col({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <h4 className="mb-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        {title}
      </h4>
      {items.map((i) => (
        <Link
          key={i.href}
          href={i.href}
          className="block py-1.5 text-[13px] font-medium transition-colors hover:text-nyne-text"
        >
          {i.label}
        </Link>
      ))}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line pb-6 pt-[52px]">
      <div className="wrap">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-[340px] text-[13px] leading-[1.7] text-muted-foreground">
              Design it. Build it. Tell it. A creative and technology company
              working across brand design, digital goods, software and original comics.
            </p>
          </div>
          <Col title="Divisions" items={divisions} />
          <div>
            <Col title="Company" items={companyNav} />
            <a
              href={`mailto:${EMAIL}`}
              className="block py-1.5 text-[13px] font-medium transition-colors hover:text-nyne-text"
            >
              {EMAIL}
            </a>
          </div>
          <Col title="Legal" items={legalNav} />
        </div>
        <div className="mt-11 flex flex-wrap justify-between gap-4 border-t border-line pt-5 text-[9px] font-bold tracking-[0.1em] text-muted-foreground">
          <span>DESIGN IT. BUILD IT. TELL IT.</span>
          <span>© {COPYRIGHT_YEAR} NYNE OWLS</span>
        </div>
      </div>
    </footer>
  );
}