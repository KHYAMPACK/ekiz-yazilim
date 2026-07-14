import { phoneDisplay, site } from "@/lib/site";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://ekizyazilim.com";

export const seo = {
  siteUrl,
  title: `${site.name} | Denizli yazılım, web sitesi ve e-ticaret`,
  description:
    "Denizli’de küçük işletmeler için web sitesi, e-ticaret başlangıç ve sade yazılım çözümleri. Net kapsam, hızlı iletişim.",
  keywords: [
    "Denizli yazılım",
    "Denizli web sitesi",
    "Denizli e-ticaret",
    "e-ticaret başlangıç Denizli",
    "küçük işletme web sitesi Denizli",
    "yazılım firması Denizli",
    "Ekiz Yazılım",
  ],
} as const;

const faqItems = [
  {
    q: "Fiyat nasıl belirleniyor?",
    a: "Kapsama göre. Önce ihtiyacı netleştirir, sonra sabit veya net aralıklı bir teklif yazarız. Gizli kalem yok.",
  },
  {
    q: "Ne kadar sürer?",
    a: "Basit bir tanıtım / landing sitesi genelde kısa sürede çıkar. E-ticaret ve özel yazılım işin büyüklüğüne göre planlanır; süre teklifte yazar.",
  },
  {
    q: "E-ticarete sıfırdan mı başlıyorsunuz?",
    a: "Evet. Denizli’de ürün satan işletmeler için e-ticaret başlangıcını sade tutuyoruz: ürün vitrini, sipariş/ödeme düzeni ve ilk yayına net bir yol.",
  },
  {
    q: "Hosting ve alan adı sizde mi?",
    a: "İsterseniz kurulumunu biz yaparız; hesaplar ve mülkiyet sizde kalır. Nasıl ilerleyeceğimizi baştan konuşuruz.",
  },
  {
    q: "Yayından sonra destek var mı?",
    a: "Evet. Küçük düzeltmeler ve sorular için yanınızdayız. Daha büyük eklemeler ayrı konuşulur.",
  },
  {
    q: "Denizli dışına iş alıyor musunuz?",
    a: "Önceliğimiz Denizli’deki küçük işletmeler. Uzaktan da çalışabiliriz; odak şimdilik yerelde.",
  },
] as const;

/** Organization + LocalBusiness + FAQ JSON-LD for Google */
export function localBusinessJsonLd() {
  const telephone = site.phone ? `+${site.phone}` : undefined;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${seo.siteUrl}/#organization`,
        name: site.name,
        url: seo.siteUrl,
        email: site.email,
        telephone,
        logo: {
          "@type": "ImageObject",
          url: `${seo.siteUrl}/logo/logo_light.png`,
          width: 512,
          height: 512,
        },
        image: `${seo.siteUrl}/logo/logo_lightwtext.png`,
        areaServed: {
          "@type": "City",
          name: site.city,
        },
        sameAs: [site.linkedin, site.instagram].filter(Boolean),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${seo.siteUrl}/#localbusiness`,
        name: site.name,
        description: seo.description,
        url: seo.siteUrl,
        email: site.email,
        telephone,
        image: `${seo.siteUrl}/logo/logo_lightwtext.png`,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressCountry: "TR",
        },
        areaServed: {
          "@type": "City",
          name: site.city,
        },
        parentOrganization: {
          "@id": `${seo.siteUrl}/#organization`,
        },
        knowsAbout: [
          "Web sitesi geliştirme",
          "E-ticaret",
          "Küçük işletme yazılımı",
          "Denizli dijital dönüşüm",
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${seo.siteUrl}/#website`,
        url: seo.siteUrl,
        name: site.name,
        description: seo.description,
        publisher: { "@id": `${seo.siteUrl}/#organization` },
        inLanguage: "tr-TR",
      },
      {
        "@type": "FAQPage",
        "@id": `${seo.siteUrl}/#faq`,
        mainEntity: faqItems.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };
}

export function contactPhoneLabel() {
  return phoneDisplay();
}
