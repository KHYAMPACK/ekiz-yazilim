import type { ClientAudit } from "@/lib/gorunurluk/types";

/**
 * Şahika Öncü Minikler + Lider Çocuklar — keşif / durum raporu.
 * Kaynak: GBP ekran görüntüleri, Instagram, sahikaoncuminikler.com (2016),
 * Lider IG linki 404. Kapasite ~200 (teyit). Rakip listesi henüz yok.
 */
export const sahikaOncuMiniklerAudit: ClientAudit = {
  id: "sahika-oncu-minikler",
  meta: {
    preparedBy: "Ekiz Yazılım",
    preparedFor: "Şahika Öncü Minikler Kreş / Lider Çocuklar Anaokulu",
    businessType: "Kreş + anaokulu (iki kampüs, ortak sahiplik)",
    date: "Temmuz 2026",
    websiteUrl: "https://www.sahikaoncuminikler.com",
    language: "Türkçe",
    phone: "0258 374 04 20 / 0553 704 04 20 / 0507 245 37 46",
    email: "info@sahikaoncuminikler.com",
    city: "Denizli / Yenişehir (Merkezefendi)",
  },
  executive: {
    headline:
      "Okul güçlü ve yerelde biliniyor; dijital yüz 2016’da kalmış, Google kartları yarım.",
    summary:
      "Şahika Öncü Minikler ve Lider Çocuklar aynı hat üzerinden Yenişehir’de güçlü bir konumda. Kayıt büyük ölçüde tavsiye ve walk-in ile geliyor. Öncü’nün sitesi açılıyor ama © 2016 ve eski clipart dönemi; Lider Instagram linki 404. İki Google İşletme Profili’nde de web sitesi yok; Lider’de iş saatleri eksik; yorumlar 3–4 adet. Önce Google + kırık linkleri toparlamak, sonra siteyi okul kadar güvenilir göstermek — reklamdan önce.",
    overallScore: 38,
    topPriorities: [
      "Lider Instagram’daki 404 site linkini kaldırmak / doğrusuna çevirmek",
      "İki Google profiline site + saatleri tamamlamak (GBP temizliği)",
      "Modern, mobil site: net CTA (ara / WhatsApp / kayıt ilgisi)",
      "İki markayı ebeveyn için net anlatmak (tek kampüs dili veya iki net okul)",
    ],
  },
  categories: [
    {
      id: "conversion",
      title: "Kayıt / iletişim & CTA",
      score: 28,
      blurb:
        "Ebeveyn siteye veya Instagram’a gelince ne yapmalı? Ara, yaz, ziyaret randevusu — net ve tek tık olmalı.",
      rubric:
        "80+: net CTA + WhatsApp/ara + kayıt formu. 40–: eski site, kırık link, CTA yok.",
      findings: [
        {
          id: "c1",
          title: "Lider Instagram linki 404",
          severity: "critical",
          summary:
            "@denizli_lidercocuklar_anaokulu bio linki denizlilidercocuklaranaokulu.com adresine gidiyor ve 404 dönüyor. Takipçi ~1.200; her tıklamada güven kaybı.",
          recommendation:
            "Linki hemen kaldırın veya çalışan Öncü / yeni site URL’sine bağlayın. Görüşmeye kadar bu tek başına yapılabilir.",
          evidence: [
            "Kaynak: Instagram bio — denizli_lidercocuklar_anaokulu",
            "Doğrulama: URL 404",
          ],
        },
        {
          id: "c2",
          title: "Öncü sitesinde modern CTA yok",
          severity: "high",
          summary:
            "sahikaoncuminikler.com bilgilendiriyor ama “hemen ara / WhatsApp / kayıt formu” akışı yok. Çok metin, az aksiyon.",
          recommendation:
            "Yeni sitede sticky veya net: Ara · WhatsApp · Okulu gez / bilgi al. Mobilde birincil aksiyon telefon/WhatsApp.",
          evidence: ["Kaynak: ana sayfa — eski tek sayfa düzeni"],
        },
        {
          id: "c3",
          title: "İletişim kanalları dağınık",
          severity: "medium",
          summary:
            "Üç telefon + ortak e-posta + iki Instagram. Ebeveyn hangi numarayı, hangi okulu arayacağını karıştırabilir.",
          recommendation:
            "Birincil hattı seçin; sitede ve Google’da aynı NAP. İkinci okul için net etiket (Öncü / Lider).",
          evidence: [
            "0258 / 0553 / 0507 aynı görünürlükte",
            "info@sahikaoncuminikler.com",
          ],
        },
      ],
      checklist: [
        {
          id: "cv1",
          label: "Lider IG bio linki çalışıyor (404 yok)",
          done: false,
        },
        {
          id: "cv2",
          label: "Ana CTA: Ara / WhatsApp / bilgi formu",
          done: false,
        },
        {
          id: "cv3",
          label: "Birincil telefon her kanalda aynı",
          done: false,
        },
        {
          id: "cv4",
          label: "İletişim bilgisi sitede ve Google’da görünür",
          done: true,
          note: "Sitede var; Google kartlarına site bağlı değil",
        },
      ],
    },
    {
      id: "seo",
      title: "Google’da organik görünürlük",
      score: 30,
      blurb:
        "Kreş / anaokulu Denizli aramalarında site ve içerik yapısı rank için temel. Tek eski sayfa yetmez.",
      rubric:
        "80+: yerel sayfalar + title/description + GSC. 40–: 2016 tek sayfa, ölçüm belirsiz.",
      findings: [
        {
          id: "s1",
          title: "Site 2016 altyapısı — arama için zayıf zemin",
          severity: "high",
          summary:
            "Telif © 2016, Süper Bilişim dönemi. Muhtemel sabit genişlik / zayıf mobil. Modern Core Web Vitals ve net başlık hiyerarşisi beklenmez.",
          recommendation:
            "Next.js (veya benzeri) ile yeni site: sitemap, robots, sayfa başlıkları, mobil-first.",
          evidence: [
            "Kaynak: footer © Copyright 2016",
            "Kaynak: Süper Bilişim imzası",
          ],
        },
        {
          id: "s2",
          title: "Yerel niyet sayfaları yok",
          severity: "high",
          summary:
            "“Kreş Denizli”, “Yenişehir anaokulu”, yaş grupları için ayrı, sade sayfalar yok. Tek sayfada her şey.",
          recommendation:
            "Hafif SEO: 4–8 sayfa — ana, Öncü, Lider (veya kampüs), program/yaş, iletişim. Anahtar ifadeler doğal dilde.",
          evidence: ["Kaynak: tek domain / tek sayfa yapısı"],
        },
        {
          id: "s3",
          title: "İki marka, bir site dili",
          severity: "medium",
          summary:
            "Lider’in kendi domain linki ölü; Öncü domain ayakta. Arama ve marka tutarlılığı zayıf.",
          recommendation:
            "Tek domain altında iki okul net bölümler veya bilinçli tek marka stratejisi — görüşmede karar.",
        },
      ],
      checklist: [
        { id: "se1", label: "Benzersiz title / description (ana + okul)", done: false },
        { id: "se2", label: "XML sitemap + Search Console", done: false },
        {
          id: "se3",
          label: "Yerel kelime planı (kreş / anaokulu / Yenişehir)",
          done: false,
        },
        { id: "se4", label: "İç linkler (okul ↔ iletişim ↔ program)", done: false },
      ],
    },
    {
      id: "local",
      title: "Yerel / harita / yorum",
      score: 34,
      blurb:
        "Tavsiye ve konum güçlü; Google kartı ebeveynin son kontrol noktası. İki profil de yarım.",
      rubric:
        "80+: dolu GBP, site linki, saatler, yorum süreci. 40–: eksik alanlar, az yorum.",
      findings: [
        {
          id: "l1",
          title: "Öncü GBP: web sitesi yok",
          severity: "critical",
          summary:
            "Şahika öncü minikler kreş kartında “Web sitesi ekle” görünüyor. Site varken Google’a bağlı değil — yerel pakette kaçan fırsat.",
          recommendation:
            "GBP’ye https://www.sahikaoncuminikler.com (veya yeni URL) ekleyin. Erişim yoksa sahiplik doğrulaması yapılacak.",
          evidence: [
            "Kaynak: Google — Şahika öncü minikler kreş",
            "5,0 · 4 yorum · Yenişehir 48. Sk. No 34",
          ],
        },
        {
          id: "l2",
          title: "Lider GBP: site yok + iş saatleri eksik",
          severity: "critical",
          summary:
            "Denizli Lider Çocuklar Anaokulu kartında site ve iş saatleri eksik. Kapalı görünen / saatsiz kart güven kırar.",
          recommendation:
            "Saatleri Öncü ile uyumlu doldurun (ör. 07:30–18:30 teyit). Site linki ekleyin.",
          evidence: [
            "Kaynak: Google — Denizli Lider Çocuklar Anaokulu",
            "5,0 · 3 yorum · 55. Sk. No:4",
            "Eksik: İş saatleri ekle, Web sitesi ekle",
          ],
        },
        {
          id: "l3",
          title: "Yorum hacmi çok düşük",
          severity: "high",
          summary:
            "4 + 3 yorum. Puan 5,0 ama sosyal kanıt zayıf; rakipler daha fazla yorumla öne geçebilir.",
          recommendation:
            "Memnun velilerden nazik, düzenli yorum isteği (abartısız). Ayrı bir “yorum kampanyası” değil, süreç.",
          evidence: ["Öncü: 4 yorum", "Lider: 3 yorum"],
        },
        {
          id: "l4",
          title: "NAP / telefon tutarlılığı teyit edilmeli",
          severity: "medium",
          summary:
            "Aynı 0507 hattı iki kartta. Üç numara sitede. Karışıklık riski.",
          recommendation:
            "Tek birincil telefon seçip site, IG, GBP, kartvizitte kilitleyin.",
        },
      ],
      checklist: [
        {
          id: "lo1",
          label: "Öncü GBP: site + saatler + kategori tamam",
          done: false,
        },
        {
          id: "lo2",
          label: "Lider GBP: site + saatler tamam",
          done: false,
        },
        { id: "lo3", label: "NAP her kanalda aynı", done: false },
        {
          id: "lo4",
          label: "Yorum isteme süreci (ayda birkaç veli)",
          done: false,
        },
        {
          id: "lo5",
          label: "GBP erişim / sahiplik net",
          done: false,
          note: "Görüşmede teyit",
        },
      ],
    },
    {
      id: "technical",
      title: "Teknik altyapı",
      score: 36,
      blurb: "Domain ayakta; Lider URL ölü. Yeni site ile kontrol ve ölçüm şart.",
      rubric:
        "80+: HTTPS, hızlı mobil, sitemap, dönüşüm event’leri. 40–: eski stack / kırık URL.",
      findings: [
        {
          id: "t1",
          title: "Öncü domain çalışıyor, stack eski",
          severity: "high",
          summary:
            "sahikaoncuminikler.com yanıt veriyor; tasarım ve yapı 2016. Mobil deneyim ve hız riski yüksek.",
          recommendation:
            "Yeni siteyi modern stack’te kurup domain’i oraya yönlendirin. Eski siteyi arşiv / redirect.",
          evidence: ["Canlı: sahikaoncuminikler.com"],
        },
        {
          id: "t2",
          title: "Lider domain yolu 404",
          severity: "critical",
          summary:
            "Instagram’daki Lider web yolu 404. Teknik borç + itibar.",
          recommendation:
            "DNS/hosting durumunu kontrol; ya düzelt ya IG’den kaldır. Tercihen tek sağlıklı site.",
          evidence: ["Doğrulama: 404"],
        },
        {
          id: "t3",
          title: "Ölçüm / event’ler yok (varsayılan)",
          severity: "medium",
          summary:
            "Eski sitede GA4 / arama konsolu / tıklama event’leri beklenmez.",
          recommendation:
            "Yeni sitede: sayfa görüntüleme, Ara tıklama, WhatsApp tıklama.",
        },
      ],
      checklist: [
        { id: "te1", label: "HTTPS + domain sizin kontrolünüzde", done: false },
        { id: "te2", label: "Mobil hız kabul edilebilir", done: false },
        { id: "te3", label: "robots / sitemap", done: false },
        { id: "te4", label: "Ara / WhatsApp tıklama ölçümü", done: false },
        {
          id: "te5",
          label: "Lider kırık URL temizlendi",
          done: false,
        },
      ],
    },
    {
      id: "content",
      title: "İçerik & güven",
      score: 48,
      blurb:
        "Anlatacak gerçek hikâye var (program, organik, saatler, küçük grup). Sunum eski; fotoğraf ve güven sinyali zayıf.",
      rubric:
        "80+: güncel foto, sade dil, veli yorumları sitede. 40–: clipart, uzun blok metin.",
      findings: [
        {
          id: "co1",
          title: "İçerik zengin, paketleme zayıf",
          severity: "medium",
          summary:
            "Sitede yaş grupları, 07:30–18:30, organik beslenme, küçük grup (max 15) gibi güçlü mesajlar var. Clipart + karışık fontlar mesajı eziyor.",
          recommendation:
            "Metinleri sadeleştirip yeni sitede bölümleyin. Gerçek okul fotoğrafları (izinli) öne çıksın.",
          evidence: [
            "Kaynak: hakkımızda / eğitim programı metinleri",
            "Slogan: butik kreş / yaş odaklı iddia",
          ],
        },
        {
          id: "co2",
          title: "Güven: yorumlar sitede yok, Google’da az",
          severity: "high",
          summary:
            "5,0 puan var ama 3–4 yorum. Sitede veli / referans bölümü modern formatta yok.",
          recommendation:
            "Seçilmiş veli alıntıları + Google yorumlarına link. İzinli fotoğraflarla “okul günü” hissi.",
        },
        {
          id: "co3",
          title: "İki okul anlatımı bulanık",
          severity: "medium",
          summary:
            "IG’de Lider hesabı “Öncüminikler Kreş Kampüsü” diyor; site Öncü odaklı. Ebeveyn “hangi bina?” diye kalabilir.",
          recommendation:
            "Tek sayfada iki adres net harita/sekme veya iki net okul sayfası.",
        },
      ],
      checklist: [
        {
          id: "cn1",
          label: "Güncel, izinli okul fotoğrafları sitede",
          done: false,
        },
        {
          id: "cn2",
          label: "Program / yaş / saatler sade kartlar",
          done: false,
          note: "Ham metin mevcut",
        },
        { id: "cn3", label: "Veli / güven bölümü", done: false },
        {
          id: "cn4",
          label: "Öncü vs Lider ebeveyne net",
          done: false,
        },
      ],
    },
  ],
  roadmap: [
    {
      phase: "01",
      title: "Hemen (0–2 hafta) — GBP + kırık link",
      items: [
        "Lider Instagram 404 linkini kaldır / düzelt",
        "İki Google İşletme: site URL + saatler + birincil telefon",
        "GBP erişim / sahiplik netleştir",
        "NAP listesini tek sayfada kilitle (site, IG, Google)",
      ],
    },
    {
      phase: "02",
      title: "Site (2–6 hafta) — güven veren yüz",
      items: [
        "Mobil-first yeni site (kampüs veya iki okul net)",
        "CTA: Ara / WhatsApp / bilgi formu",
        "Mevcut güçlü metinleri sade taşı",
        "Fotoğraf + harita + iletişim",
      ],
    },
    {
      phase: "03",
      title: "Hafif SEO + yorum (sürekli)",
      items: [
        "Search Console + temel yerel sayfalar",
        "Google kartlarını siteye bağla",
        "Düzenli veli yorum süreci",
        "Ölçüm: ara / WhatsApp tıklamaları",
      ],
    },
  ],
};
