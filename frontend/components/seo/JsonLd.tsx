import { webPageSchema } from "@/lib/schema";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function PageStructuredData({
  name,
  description,
  path,
  type,
}: Parameters<typeof webPageSchema>[0]) {
  return <JsonLd data={webPageSchema({ name, description, path, type })} />;
}