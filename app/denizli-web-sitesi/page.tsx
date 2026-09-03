import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import WebFaq from "@/components/websitesi/WebFaq";
import WebHero from "@/components/websitesi/WebHero";
import WebPains from "@/components/websitesi/WebPains";
import WebPillars from "@/components/websitesi/WebPillars";
import WebPlan from "@/components/websitesi/WebPlan";
import WebProcess from "@/components/websitesi/WebProcess";
import WebProgress from "@/components/websitesi/WebProgress";
import WebScheduleSection from "@/components/websitesi/WebScheduleSection";
import WebTaskMarquee from "@/components/websitesi/WebTaskMarquee";
import WebTrust from "@/components/websitesi/WebTrust";
import WebWhy from "@/components/websitesi/WebWhy";
import { seo } from "@/lib/seo";
import { site, whatsappHref } from "@/lib/site";
import { FAQS, WEB_PATH, WEB_WA } from "@/lib/websitesi";

const pageUrl = `${seo.siteUrl}${WEB_PATH}`;

export const metadata: Metadata = {
  title: "Denizli Web Sitesi | Keşiften Yayına Kurumsal Site",
  description:
    "Denizli’de kreş, okul, ofis ve yerel işletmeler için özel web sitesi. Hazır şablon değil — keşiften yayına tek muhatap, yazılı teklif.",
  keywords: [
    "Denizli web sitesi",
    "Denizli kurumsal site",
    "küçük işletme web sitesi Denizli",
    "kreş web sitesi Denizli",
    "web sitesi yaptırmak Denizli",
    "Ekiz Yazılım",
  ],
  alternates: { canonical: WEB_PATH },
  openGraph: {
    title: "Denizli Web Sitesi | Keşiften Yayına Kurumsal Site",
    description:
      "Denizli’de işletmenize özel web sitesi. Keşiften yayına kadar süreci biz yürütürüz.",
    url: pageUrl,
    siteName: site.name,
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Denizli Web Sitesi | Keşiften Yayına Kurumsal Site",
    description:
      "Denizli’de işletmenize özel web sitesi. Keşiften yayına kadar süreci biz yürütürüz.",
  },
};

function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: "Denizli Web Sitesi | Keşiften Yayına Kurumsal Site",
        description:
          "Denizli’de kreş, okul, ofis ve yerel işletmeler için özel web sitesi kurulumu.",
        isPartOf: { "@id": `${seo.siteUrl}/#website` },
        about: { "@id": `${pageUrl}#service` },
        inLanguage: "tr-TR",
      },
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: "Denizli web sitesi — keşiften yayına",
        serviceType: "Kurumsal web sitesi kurulumu",
        description:
          "Denizli’deki işletmeler için özel tasarım web sitesi: keşif, yazılı teklif, kurulum ve yayın.",
        provider: {
          "@type": "Organization",
          name: site.name,
          url: seo.siteUrl,
          email: site.email,
          telephone: site.phone ? `+${site.phone}` : undefined,
        },
        areaServed: {
          "@type": "City",
          name: "Denizli",
        },
        audience: {
          "@type": "Audience",
          audienceType: "Yerel işletmeler",
        },
        url: pageUrl,
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: FAQS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Ana sayfa",
            item: seo.siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Denizli web sitesi",
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

export default function DenizliWebSitesiPage() {
  const wa = whatsappHref(WEB_WA);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
      />
      <WebProgress />
      <SiteHeader />
      <main>
        <WebHero wa={wa} />
        <WebTaskMarquee />
        <WebPains />
        <WebProcess />
        <WebPillars />
        <WebPlan />
        <WebWhy />
        <WebTrust />
        <WebFaq />
        <WebScheduleSection />
      </main>
      <SiteFooter />
    </>
  );
}
