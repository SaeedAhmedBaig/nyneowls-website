import Link from "next/link";

/* Shared frame: every hero visual has the same width and alignment. */
const frame = "w-full max-w-[560px] min-[901px]:ml-auto";

function Label({ left, right }: { left: string; right?: string }) {
  return (
    <div className="mb-3 flex justify-between gap-3 text-[9px] font-bold tracking-[0.11em] text-muted-foreground">
      <span>{left}</span>
      {right && <span>{right}</span>}
    </div>
  );
}

export function StudioAside() {
  const rows = [
    ["Engagements", "Fixed scope · Retainer · Hourly"],
    ["Starts with", "A short project brief"],
    ["Then", "Discovery call and proposal"],
    ["Works with", "Businesses worldwide"],
  ];
  return (
    <div className={frame} aria-label="Studio at a glance">
      <Label left="STUDIO AT A GLANCE" right="01" />
      <div className="border border-line bg-paper">
        {rows.map(([k, v]) => (
          <div
            key={k}
            data-v
            className="flex items-baseline justify-between gap-6 border-b border-line px-6 py-5 text-[13px] last:border-0"
          >
            <span className="text-muted-foreground">{k}</span>
            <b className="text-right font-semibold">{v}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProductStatus() {
  const rows = [
    { name: "Point of Sale", status: "Developed", on: true },
    { name: "CRM", status: "In development" },
    { name: "Future products", status: "Not announced" },
  ];
  return (
    <div className={frame} aria-label="Product status">
      <Label left="PRODUCT STATUS" right="UPDATED AS WE SHIP" />
      <div className="border border-white/10 bg-dark text-white">
        <div className="flex gap-1.5 border-b border-white/10 px-4 py-3.5">
          <u className="size-2 rounded-full bg-nyne" />
          <u className="size-2 rounded-full bg-white/20" />
          <u className="size-2 rounded-full bg-white/20" />
        </div>
        <div className="grid gap-3 p-6">
          {rows.map((r) => (
            <div
              key={r.name}
              data-v
              className={`flex items-center justify-between gap-4 px-5 py-[18px] ${r.on ? "bg-nyne" : "bg-white/5"}`}
            >
              <span className="text-[13px] font-semibold">{r.name}</span>
              <small className={`text-[9px] font-bold uppercase tracking-[0.1em] ${r.on ? "text-white" : "text-white/60"}`}>
                {r.status}
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SeriesCover() {
  return (
    <div className={`${frame} min-[901px]:max-w-[420px]`}>
      <Label left="FIRST SERIES" right="IN DEVELOPMENT" />
      <div
        data-v
        role="img"
        aria-label="Placeholder cover for the first original series"
        className="relative flex min-h-[300px] flex-col justify-between overflow-hidden bg-dark p-6 text-white min-[901px]:aspect-[3/4]"
      >
        <span aria-hidden className="absolute right-0 top-0 aspect-square w-[36%] bg-nyne" />
        <span aria-hidden className="absolute left-6 top-[34%] aspect-square w-[30%] rounded-full border-2 border-white/30" />
        <small className="relative max-w-[55%] text-[10px] font-bold leading-[1.5] tracking-[0.12em]">
          NYNE OWLS STORIES &amp; COMICS
        </small>
        <b className="relative text-[clamp(30px,3.4vw,44px)] leading-none tracking-[-0.05em]">
          Title to be<br />announced.
        </b>
      </div>
    </div>
  );
}

export function AboutAside() {
  const rows = [
    ["01", "Studio", "Design that gives your ideas a clear identity and direction.", "Taking enquiries"],
    ["02", "Products", "Practical software for the way businesses work.", "POS pilot demos in preparation"],
    ["03", "Originals", "Original worlds, characters and stories.", "In development"],
  ];
  return (
    <div className={frame} aria-label="Our three practice areas">
      <Label left="ONE COMPANY, THREE PRACTICE AREAS" right="NYNE OWLS" />
      <div className="border border-line bg-paper">
        {rows.map(([n, name, desc, status]) => (
          <div
            key={n}
            data-v
            className="grid grid-cols-[32px_1fr] items-start gap-x-3 gap-y-2 border-b border-line px-6 py-5 last:border-0 min-[561px]:grid-cols-[32px_1fr_auto]"
          >
            <span className="pt-1 text-[10px] font-bold tracking-[0.12em] text-nyne-text">{n}</span>
            <div>
              <b className="block text-base font-semibold tracking-[-0.02em]">{name}</b>
              <p className="mt-1 text-[13px] leading-[1.55] text-muted-foreground">{desc}</p>
            </div>
            <span className="col-start-2 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground min-[561px]:col-start-3 min-[561px]:pt-1">
              {status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ContactAside() {
  const routes = [
    ["Design project", "Studio", "/studio#brief"],
    ["Software demo", "Products", "/products#demo"],
    ["Story release updates", "Originals", "/originals#follow"],
  ];
  return (
    <div className={frame} aria-label="Where your message goes">
      <Label left="WHERE YOUR MESSAGE GOES" right="03 ROUTES" />
      <div className="border border-line bg-paper">
        {routes.map(([label, division, href]) => (
          <Link
            key={href}
            href={href}
            data-v
            className="group flex items-center justify-between gap-4 border-b border-line px-6 py-5 transition-colors hover:bg-card"
          >
            <span>
              <b className="block text-base font-semibold tracking-[-0.02em] transition-colors group-hover:text-nyne-text">
                {label}
              </b>
              <span className="mt-1 block text-[12px] text-muted-foreground">{division}</span>
            </span>
            <span aria-hidden className="text-lg transition-transform group-hover:translate-x-1">↗</span>
          </Link>
        ))}
        <div data-v className="px-6 py-5 text-[13px] text-muted-foreground">
          Or email <b className="font-semibold text-ink">hello@nyneowls.com</b>
        </div>
      </div>
    </div>
  );
}

export function StoriesAside() {
  const rows = [
    ["Format", "Original comics, read online"],
    ["Built for", "Phones first, then tablet and desktop"],
    ["Release plan", "Announced once confirmed"],
    ["Updates", "One email per release, no more"],
  ];
  return (
    <div className={frame} aria-label="What to expect">
      <Label left="WHAT TO EXPECT" right="IN DEVELOPMENT" />
      <div className="border border-line bg-paper">
        {rows.map(([k, v]) => (
          <div
            key={k}
            data-v
            className="flex items-baseline justify-between gap-6 border-b border-line px-6 py-5 text-[13px] last:border-0"
          >
            <span className="text-muted-foreground">{k}</span>
            <b className="text-right font-semibold">{v}</b>
          </div>
        ))}
      </div>
    </div>
  );
}