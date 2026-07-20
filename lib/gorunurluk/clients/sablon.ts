import type { ClientAudit } from "@/lib/gorunurluk/types";

/** Boş şablon — yeni müşteri için kopyalayın ve doldurun. */
export const templateAudit: ClientAudit = {
  id: "sablon",
  meta: {
    preparedBy: "Ekiz Yazılım",
    preparedFor: "İşletme Adı",
    businessType: "Örn. klinik / restoran / lojistik",
    date: "Ay Yıl",
    websiteUrl: "https://",
    language: "Türkçe",
  },
  executive: {
    headline: "Tek cümlelik teşhis buraya.",
    summary: "2–4 cümlelik özet: ne iyi, ne bozuluyor, önce ne yapılacak.",
    overallScore: 50,
    topPriorities: [
      "Öncelik 1",
      "Öncelik 2",
      "Öncelik 3",
      "Öncelik 4",
    ],
  },
  categories: [
    {
      id: "conversion",
      title: "Satışa çevirme & CTA",
      score: 50,
      blurb: "Ziyaretçi ne yapmalı, ne kadar hızlı?",
      rubric:
        "80+: tek net CTA ve beklemesiz aksiyon. 40–: form/çağrıya bağımlı, mesaj belirsiz.",
      findings: [
        {
          id: "c1",
          title: "Bulgu başlığı",
          severity: "high",
          summary: "Sorun nedir?",
          recommendation: "Ne yapacağız?",
          evidence: ["Kaynak: ana sayfa / hero"],
        },
      ],
      checklist: [
        { id: "cv1", label: "Tek cümlelik değer önerisi ana sayfada", done: false },
        { id: "cv2", label: "Ana CTA net (fiyat / randevu / WhatsApp)", done: false },
        { id: "cv3", label: "İletişim yolları belirgin", done: false },
      ],
    },
    {
      id: "seo",
      title: "Google’da organik görünürlük",
      score: 50,
      blurb: "Arama niyetine uygun sayfalar ve ölçüm var mı?",
      rubric:
        "80+: hizmet sayfaları + kelime planı + GSC. 40–: tek sayfa, ölçüm yok.",
      findings: [
        {
          id: "s1",
          title: "Bulgu başlığı",
          severity: "high",
          summary: "Sorun nedir?",
          recommendation: "Ne yapacağız?",
        },
      ],
      checklist: [
        { id: "se1", label: "Benzersiz title / description", done: false },
        { id: "se2", label: "XML sitemap + Search Console", done: false },
        { id: "se3", label: "Kelime planı (8–15 ifade)", done: false },
        { id: "se4", label: "İç linkler", done: false },
      ],
    },
    {
      id: "local",
      title: "Yerel / harita / yorum",
      score: 50,
      blurb: "Haritada ve yerel aramada bulunuyor musunuz?",
      rubric:
        "80+: dolu GBP, NAP tutarlı, yorum süreci. 40–: profil yok / eksik.",
      findings: [
        {
          id: "l1",
          title: "Bulgu başlığı",
          severity: "high",
          summary: "Sorun nedir?",
          recommendation: "Ne yapacağız?",
        },
      ],
      checklist: [
        { id: "lo1", label: "Google İşletme Profili tamam", done: false },
        { id: "lo2", label: "NAP her kanalda aynı", done: false },
        { id: "lo3", label: "Yorum isteme süreci", done: false },
        { id: "lo4", label: "LocalBusiness şema", done: false },
      ],
    },
    {
      id: "technical",
      title: "Teknik altyapı",
      score: 50,
      blurb: "Hız, HTTPS, kontrol ve ölçüm olayları.",
      rubric:
        "80+: HTTPS, hızlı mobil, sitemap/robots, dönüşüm event’leri. 40–: yavaş / kontrol dışı stack.",
      findings: [
        {
          id: "t1",
          title: "Bulgu başlığı",
          severity: "medium",
          summary: "Sorun nedir?",
          recommendation: "Ne yapacağız?",
        },
      ],
      checklist: [
        { id: "te1", label: "HTTPS + domain erişimi", done: false },
        { id: "te2", label: "Mobil hız kabul edilebilir", done: false },
        { id: "te3", label: "robots / sitemap", done: false },
        { id: "te4", label: "Ara / WhatsApp / form event’leri", done: false },
      ],
    },
    {
      id: "content",
      title: "İçerik & güven",
      score: 50,
      blurb: "Derinlik, SSS, kanıt ve yasal metinler.",
      rubric:
        "80+: hizmet sayfaları, SSS, gerçek foto, KVKK. 40–: ince metin, stok görsel.",
      findings: [
        {
          id: "co1",
          title: "Bulgu başlığı",
          severity: "medium",
          summary: "Sorun nedir?",
          recommendation: "Ne yapacağız?",
        },
      ],
      checklist: [
        { id: "cn1", label: "Ana hizmet sayfaları", done: false },
        { id: "cn2", label: "SSS yayında", done: false },
        { id: "cn3", label: "KVKK / gizlilik", done: false },
        { id: "cn4", label: "Gerçek fotoğraflar / kanıt", done: false },
      ],
    },
  ],
  roadmap: [
    {
      phase: "1–2. hafta",
      title: "Temel",
      items: ["Madde 1", "Madde 2", "Madde 3"],
    },
    {
      phase: "3–4. hafta",
      title: "Ürün",
      items: ["Madde 1", "Madde 2"],
    },
    {
      phase: "2. ay",
      title: "Büyüme",
      items: ["Madde 1", "Madde 2"],
    },
  ],
};
