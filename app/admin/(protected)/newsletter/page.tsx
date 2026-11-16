import { connection } from "next/server";
import { getAdminNewsletterSubscribers } from "@backend/blog/data";

export const metadata = { title: "Newsletter subscribers | Nyne Owls" };

export default async function NewsletterAdminPage() {
  await connection();
  const subscribers = await getAdminNewsletterSubscribers();
  const counts = {
    active: subscribers.filter((subscriber) => subscriber.status === "active").length,
    pending: subscribers.filter((subscriber) => subscriber.status === "pending").length,
    unsubscribed: subscribers.filter((subscriber) => subscriber.status === "unsubscribed").length,
  };
  const formatDate = (value: string | null) =>
    value ? new Intl.DateTimeFormat("en-GB", { dateStyle: "medium" }).format(new Date(value)) : "—";

  return (
    <section className="wrap py-[clamp(44px,7vw,80px)]">
      <div className="mb-9">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-nyne-text">Journal CMS</p>
        <h1 className="text-[clamp(34px,6vw,56px)] font-bold leading-[1.05] tracking-[-0.045em]">Newsletter subscribers</h1>
        <p className="mt-3 text-sm text-muted-foreground">Consent status and subscription dates. Newsletter campaigns are not sent from this dashboard.</p>
      </div>
      <dl className="mb-8 grid gap-3 min-[561px]:grid-cols-3">
        {[
          ["Confirmed", counts.active],
          ["Awaiting confirmation", counts.pending],
          ["Unsubscribed", counts.unsubscribed],
        ].map(([label, count]) => (
          <div key={label} className="border border-line bg-card p-5">
            <dt className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{label}</dt>
            <dd className="mt-2 text-3xl font-bold tracking-[-0.04em]">{count}</dd>
          </div>
        ))}
      </dl>
      <div className="overflow-x-auto border border-line">
        <table className="w-full min-w-[700px] text-left text-sm">
          <thead className="bg-card text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            <tr>
              <th scope="col" className="px-4 py-3">Email</th>
              <th scope="col" className="px-4 py-3">Status</th>
              <th scope="col" className="px-4 py-3">Source</th>
              <th scope="col" className="px-4 py-3">Consented</th>
              <th scope="col" className="px-4 py-3">Confirmed</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((subscriber) => (
              <tr key={subscriber.id} className="border-t border-line">
                <th scope="row" className="px-4 py-4 font-medium">{subscriber.email}</th>
                <td className="px-4 py-4">{subscriber.status}</td>
                <td className="px-4 py-4 text-muted-foreground">{subscriber.consent_source}</td>
                <td className="px-4 py-4 text-muted-foreground">{formatDate(subscriber.consented_at)}</td>
                <td className="px-4 py-4 text-muted-foreground">{formatDate(subscriber.confirmed_at)}</td>
              </tr>
            ))}
            {!subscribers.length && (
              <tr><td colSpan={5} className="px-4 py-12 text-center text-sm text-muted-foreground">No newsletter signups yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Showing the latest 200 addresses.</p>
    </section>
  );
}
