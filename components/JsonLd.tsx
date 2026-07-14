import { localBusinessJsonLd } from "@/lib/seo";

export default function JsonLd() {
  const data = localBusinessJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
