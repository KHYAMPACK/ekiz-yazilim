/**
 * Görüşme sonrası / iç kullanım: raporu doldurmadan önce toplanacak bilgiler.
 * Public form `/gorunurluk` daha kısa tutulur.
 */

export type IntakeField = {
  id: string;
  label: string;
  why: string;
  required: boolean;
  example?: string;
};

export type IntakeSection = {
  id: string;
  title: string;
  fields: IntakeField[];
};

export const businessIntake: IntakeSection[] = [
  {
    id: "kimlik",
    title: "İşletme kimliği",
    fields: [
      {
        id: "legal_name",
        label: "Resmi / ticari unvan",
        why: "Sitede ve Google’da aynı isim kullanılacak.",
        required: true,
      },
      {
        id: "brand_name",
        label: "Müşterinin bildiği kısa marka adı",
        why: "Başlık ve logo metni için.",
        required: true,
      },
      {
        id: "one_liner",
        label: "Tek cümlede ne yapıyorsunuz? (farkınız ne?)",
        why: "Ana sayfa mesajı ve SEO’nun kalbi.",
        required: true,
      },
      {
        id: "cities",
        label: "Hizmet verdiğiniz şehir / bölgeler",
        why: "Yerel Google ve hizmet alanı sayfaları için.",
        required: true,
      },
    ],
  },
  {
    id: "iletisim",
    title: "İletişim (NAP)",
    fields: [
      {
        id: "phone",
        label: "Ana telefon (tek format)",
        why: "Site = Google = kartvizit aynı olmalı.",
        required: true,
      },
      {
        id: "email",
        label: "Ana e-posta",
        why: "İletişim ve formlar.",
        required: true,
      },
      {
        id: "address",
        label: "Açık adres (veya sadece hizmet alanı)",
        why: "Google İşletme Profili ve güven.",
        required: true,
      },
      {
        id: "hours",
        label: "Çalışma saatleri / 7-24 destek var mı?",
        why: "Google profili ve müşteri beklentisi.",
        required: false,
      },
      {
        id: "whatsapp",
        label: "WhatsApp numarası (varsa)",
        why: "Hızlı CTA.",
        required: false,
      },
    ],
  },
  {
    id: "dijital",
    title: "Mevcut dijital varlık",
    fields: [
      {
        id: "website",
        label: "Mevcut website adresi",
        why: "Denetimin konusu.",
        required: true,
      },
      {
        id: "domain_owner",
        label: "Domain kimin hesabında? (erişim var mı?)",
        why: "Yayın ve yönlendirme için şart.",
        required: true,
      },
      {
        id: "gbp",
        label: "Google İşletme Profili var mı? Linki?",
        why: "Yerel SEO’nun en kritik parçası.",
        required: true,
      },
      {
        id: "analytics",
        label: "Analytics / Search Console erişimi?",
        why: "Ölçüm kurulumu.",
        required: false,
      },
      {
        id: "indexed_pages",
        label: "Search Console’da kaç sayfa indeksli? (yaklaşık)",
        why: "Google’da gerçekten var mısınız kontrolü.",
        required: false,
      },
    ],
  },
  {
    id: "is",
    title: "İş modeli & satış",
    fields: [
      {
        id: "ideal_customer",
        label: "Ideal müşteri kim? (B2B / bireysel)",
        why: "Metin ve hedef kelimeler.",
        required: true,
      },
      {
        id: "how_quote",
        label: "Şu an fiyat / teklif / randevu nasıl alınıyor?",
        why: "Manuel süreç = dönüşüm sorunu tespiti.",
        required: true,
      },
      {
        id: "top_services",
        label: "En çok satılan 3–5 hizmet",
        why: "Hizmet sayfaları ve menü.",
        required: true,
      },
      {
        id: "competitors",
        label: "Rakipler (2–5 site veya marka)",
        why: "Karşılaştırma ve kelime seçimi.",
        required: false,
      },
      {
        id: "search_phrases",
        label: "Müşteriler Google’da ne yazıyor sanıyorsunuz?",
        why: "SEO kelime haritası.",
        required: false,
      },
    ],
  },
];

export const clientFileInstructions = `
1. lib/gorunurluk/clients/ altına yeni dosya: ornek-isletme.ts
2. ClientAudit tipini doldurun (fmx.ts örneğine bakın)
3. lib/gorunurluk/clients/index.ts içine kaydedin
4. .env.local içinde REPORT_ACCESS_TOKEN ayarlayın
5. /raporlar/ornek-isletme?t=TOKEN ile açın → PDF İndir
`.trim();
