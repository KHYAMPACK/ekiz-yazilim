/** Her işletmeye uygun genel kontrol listesi (müşteriye özel değil) */

export const universalChecklist: {
  section: string;
  items: string[];
}[] = [
  {
    section: "Erişim & başlangıç",
    items: [
      "Domain, hosting ve DNS erişimi not edildi",
      "Değişiklik öncesi site yedeği alındı",
      "Google hesabı / Search Console erişimi",
      "Google İşletme Profili sahipliği doğrulandı",
      "Analytics erişimi doğrulandı",
      "Search Console’da indeksli sayfa sayısı not edildi",
    ],
  },
  {
    section: "Website temelleri",
    items: [
      "Ana sayfada teklif tek cümlede net",
      "Mobil uyumlu ve hızlı sayfalar",
      "Mümkünse insan beklemeden işlem başlatan ana buton",
      "İletişim yolları belirgin (telefon, form, sohbet)",
      "Gizlilik / yasal temel metinler var",
    ],
  },
  {
    section: "Teknik SEO",
    items: [
      "Her önemli sayfada ayrı başlık ve açıklama",
      "Anlaşılır adresler (URL)",
      "XML site haritası gönderildi",
      "robots.txt doğru",
      "HTTPS açık",
      "Gerektiğinde canonical etiketleri",
      "İşletme tipine uygun yapılandırılmış veri",
      "Mobilde yavaşlık hissi yok (Core Web Vitals gözlemi)",
    ],
  },
  {
    section: "Yerel SEO",
    items: [
      "Google İşletme Profili dolu (kategori, saat, fotoğraf, hizmet)",
      "İsim-adres-telefon her yerde aynı",
      "Yorum isteme ve yanıtlama düzeni",
      "Bing Places güncel",
      "Hizmet bölgesi doğru tanımlı",
    ],
  },
  {
    section: "İçerik",
    items: [
      "Müşterinin arama dilinden kelime planı",
      "Ana hizmetler için sayfalar",
      "Gerçek sorulardan SSS",
      "Nasıl çalışır? netliği",
      "Sahte / ince şehir spam sayfası yok",
    ],
  },
  {
    section: "Ölçüm",
    items: [
      "Search Console bağlı",
      "Analytics bağlı",
      "Önemli dönüşümler ölçülüyor (ara / WhatsApp / form)",
      "Aylık arama / lead gözden geçirme alışkanlığı",
    ],
  },
];
