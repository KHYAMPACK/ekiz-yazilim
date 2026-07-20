import type { ClientAudit } from "@/lib/gorunurluk/types";

/**
 * FMX Global Express Logistics — örnek müşteri raporu.
 * Eksik / teyit edilemeyenler: Google İşletme Profili durumu, Search Console,
 * gerçek takip API’si, fiyat algoritması, yorum sayısı, domain erişimi.
 */
export const fmxAudit: ClientAudit = {
  id: "fmx",
  meta: {
    preparedBy: "Ekiz Yazılım",
    preparedFor: "FMX Global Express Logistics",
    businessType: "Uluslararası kargo / express lojistik (aracı + operasyon)",
    date: "Temmuz 2026",
    websiteUrl: "https://fmxglobalexpress.com",
    language: "Türkçe",
    contactName: "Mustafa ÖDEMİŞ",
    phone: "0 535 8 333 666",
    email: "info@fmxglobalexpress.com",
    city: "Denizli / Merkezefendi",
  },
  executive: {
    headline: "Site kurumsal duruyor; satış ve Google hâlâ manuel ve zayıf.",
    summary:
      "FMX’in mevcut tek sayfalık sitesi temiz görünüyor: hizmetler, 4 adımlı süreç, gönderi takip kutusu ve iletişim bilgileri var. Asıl sorun: ana aksiyon hâlâ “form doldurun, operasyon ekibi dönsün”. Anlaşmalı taşıyıcılarla daha uygun fiyat avantajı sitede net yazılmıyor. Google’da yükselmek için de tek sayfa + eksik yerel SEO temeli yetmez. Önce siteyi kontrol altına alıp anlık fiyat ve gerçek takip eklemek, sonra Google İşletme Profili ve içerik — reklamdan önce.",
    overallScore: 44,
    topPriorities: [
      "Manuel teklif yerine anlık Fiyat Hesabı (web)",
      "Google İşletme Profilini tamamlayıp yorum toplamak",
      "Next.js ile yeni site: sitemap, robots, ölçüm",
      "Değer önerisini net yazmak: anlaşmalı / daha uygun gönderi",
    ],
  },
  categories: [
    {
      id: "conversion",
      title: "Satışa çevirme & CTA",
      score: 32,
      blurb:
        "Ziyaretçi fiyatı hemen görmeli. FMX’te hero’daki Hızlı Teklif Formu operasyon cevabına bağlı — bu hem yavaş hem kayıp satış.",
      rubric:
        "80+: anlık fiyat / net CTA. 40–: elle cevaplanan form, belirsiz değer önerisi.",
      findings: [
        {
          id: "c1",
          title: "Ana CTA = elle cevaplanan teklif formu",
          severity: "critical",
          summary:
            "Form: ad, telefon, nereden, nereye, gönderi türü, kg/desi. Metin açıkça operasyon ekibinin döneceğini söylüyor. Müşteri beklerken rakibe gider.",
          recommendation:
            "Hero’da Fiyat Hesabı koyun. Algoritma gelince anlık sonuç; özel sevkiyatlarda form yedek kalsın.",
          evidence: [
            "Kaynak: ana sayfa hero — Hızlı Teklif Formu",
            "Metin: operasyon ekibi dönecek ifadesi",
          ],
        },
        {
          id: "c2",
          title: "Middleman avantajı anlatılmıyor",
          severity: "high",
          summary:
            "Metinler “hızlı, güvenilir, zamanında” ve genel express dili. Anlaşmalı FedEx / taşıyıcı fiyatı avantajı görünmüyor — asıl satış sebebi bu.",
          recommendation:
            "Ana cümle: anlaşmalı kargo ile daha uygun yurt dışı / kurumsal gönderi. FedEx adını yalnızca sözleşme izin veriyorsa kullanın.",
          evidence: ["Kaynak: ana sayfa başlık / hizmet metinleri"],
        },
        {
          id: "c3",
          title: "Teklif Al / Hızlı Teklif / form aynı kapı",
          severity: "medium",
          summary:
            "Menü, turuncu buton ve hero formu aynı manuel yola çıkıyor. Takip var ama fiyat yok.",
          recommendation:
            "Ana: Fiyat Hesapla. İkincil: Gönderi Takip + Ara / WhatsApp.",
          evidence: ["Kaynak: menü + hero CTA’lar"],
        },
      ],
      checklist: [
        { id: "cv1", label: "Tek cümlelik değer önerisi ana sayfada", done: false },
        { id: "cv2", label: "Anlık Fiyat Hesabı yayında", done: false },
        {
          id: "cv3",
          label: "Gönderi Takip gerçekten çalışıyor",
          done: false,
          note: "UI var; backend teyit edilecek",
        },
        { id: "cv4", label: "İstatistik / güven kutuları görünür", done: true },
      ],
    },
    {
      id: "seo",
      title: "Google’da organik görünürlük",
      score: 36,
      blurb:
        "Tek URL ile “ucuz kargo Denizli”, “yurt dışı express”, takip ve kurumsal lojistik aynı anda zor rank alır.",
      rubric:
        "80+: ayrı hizmet sayfaları + kelime planı + GSC. 40–: tek sayfa, arama dili zayıf.",
      findings: [
        {
          id: "s1",
          title: "Tek sayfa tavanı",
          severity: "high",
          summary:
            "Mevcut site scroll ile bölümlenen tek sayfa. Google her niyet için ayrı güçlü sayfa sever.",
          recommendation:
            "Ana sayfa kalsın; /fiyat-hesapla, /gonderi-takip, hizmet sayfaları ayrı route olsun.",
          evidence: ["Kaynak: site yapısı — tek URL / hash bölümler"],
        },
        {
          id: "s2",
          title: "Arama dili zayıf",
          severity: "high",
          summary:
            "Başlıklar kurumsal (“dünyanın her noktasına…”). Müşteri “ucuz yurt dışı kargo”, “numune gönderimi”, “Denizli kargo” yazar.",
          recommendation:
            "8–15 gerçek arama ifadesi çıkarın; sayfa başlıklarını buna göre yazın.",
          evidence: ["Kaynak: sayfa başlıkları / H1 dili"],
        },
        {
          id: "s3",
          title: "Ölçüm kurulumu teyit edilmedi",
          severity: "medium",
          summary:
            "Search Console / Analytics erişimi henüz net değil. Olmadan hangi kelimeden geldiğiniz kör.",
          recommendation:
            "Yeni sitede ilk günden GSC + GA4; fiyat ve takip olaylarını ölçün.",
          evidence: ["Görüşme: GSC / GA erişimi teyit edilmedi"],
        },
      ],
      checklist: [
        { id: "se1", label: "Önemli sayfalarda benzersiz title / description", done: false },
        { id: "se2", label: "XML sitemap + Search Console", done: false },
        { id: "se3", label: "robots.txt kontrolümüzde", done: false },
        { id: "se4", label: "Denizli + yurt dışı kelime planı", done: false },
        { id: "se5", label: "Sayfalar arası iç linkler", done: false },
      ],
    },
    {
      id: "local",
      title: "Yerel / harita / yorum",
      score: 42,
      blurb:
        "Adres Denizli / Merkezefendi net — iyi. Google İşletme Profili ve yorum durumu teyit edilmeli; yerel paketin anahtarı bu.",
      rubric:
        "80+: dolu GBP + yorum süreci + NAP tutarlı. 40–: profil durumu bilinmiyor.",
      findings: [
        {
          id: "l1",
          title: "Google İşletme Profili durumu bilinmiyor",
          severity: "critical",
          summary:
            "Haritada çıkmak için dolu profil, doğru kategori, fotoğraf ve yorum şart. Şu an sahiplik / doluluk teyit edilmedi.",
          recommendation:
            "Profili bulun veya oluşturun, doğrulayın, fotoğraf + hizmet alanı + yorum süreci başlatın.",
          evidence: ["Görüşme: GBP sahipliği / doluluk teyit edilmedi"],
        },
        {
          id: "l2",
          title: "NAP sitede tutarlı görünüyor",
          severity: "ok",
          summary:
            "Telefon, e-posta, Mustafa ÖDEMİŞ ve Merkezefendi adresi sitede net. Sosyal medya / dizinlerle karşılaştırılmalı.",
          recommendation:
            "Instagram, kartvizit, Google’da aynı formatı kilitleyin.",
          evidence: ["Kaynak: site iletişim bölümü"],
        },
      ],
      checklist: [
        { id: "lo1", label: "Google İşletme Profili tamam", done: false },
        { id: "lo2", label: "NAP her kanalda aynı", done: false },
        { id: "lo3", label: "Yorum isteme süreci işliyor", done: false },
        { id: "lo4", label: "Bing Places", done: false },
        { id: "lo5", label: "LocalBusiness şema işaretlemesi", done: false },
      ],
    },
    {
      id: "technical",
      title: "Teknik altyapı",
      score: 40,
      blurb:
        "Redesign ile sitemap, robots, hız ve özellikler (fiyat, takip) sizin kontrolünüze geçecek — Vercel + Next.js hedefi doğru.",
      rubric:
        "80+: HTTPS, hızlı mobil, sitemap/robots, dönüşüm event’leri. 40–: kontrol dışı / entegrasyon belirsiz.",
      findings: [
        {
          id: "t1",
          title: "Mevcut stack tam kontrolde değil",
          severity: "high",
          summary:
            "Tek sayfa şablon hissi; SEO teknikleri ve yeni ürünleri (fiyat motoru) eklemek mevcut yapıda zor.",
          recommendation:
            "Next.js + Vercel; domain erişimi müşteri hesabında, sizin deploy yetkiniz olsun.",
          evidence: ["Kaynak: mevcut site hissi / şablon yapısı"],
        },
        {
          id: "t2",
          title: "Takip UI var, entegrasyon belirsiz",
          severity: "medium",
          summary:
            "“Takip numaranızı girin” kutusu mevcut. Gerçek kargo API / panel bağlı mı bilinmiyor.",
          recommendation:
            "Takip kaynağını netleştirin; yoksa sahte umut yaratmayın — önce gerçek bağlayın.",
          evidence: ["Kaynak: gönderi takip kutusu UI"],
        },
        {
          id: "t3",
          title: "Mobil hız / Core Web Vitals gözlemi yapılmadı",
          severity: "medium",
          summary:
            "Rapor buraya kadar görsel inceleme; PageSpeed / CWV sayıları henüz alınmadı.",
          recommendation:
            "Yayın öncesi mobil PageSpeed bakın; ağır görselleri sıkıştırın.",
          evidence: ["Not: otomatik tarama yok — görüşmede ölçülecek"],
        },
      ],
      checklist: [
        { id: "te1", label: "HTTPS + domain erişimi", done: false },
        { id: "te2", label: "Next.js Vercel’de yayında", done: false },
        { id: "te3", label: "404 / kırık link kontrolü", done: false },
        { id: "te4", label: "Görsel optimizasyonu / mobil hız", done: false },
        { id: "te5", label: "Fiyat + takip + form event’leri", done: false },
      ],
    },
    {
      id: "content",
      title: "İçerik & güven",
      score: 52,
      blurb:
        "Hizmet kartları, süreç adımları ve istatistikler var — iskelet iyi. Derinlik, SSS ve kanıt fotoğrafları zayıf.",
      rubric:
        "80+: derin hizmet sayfaları, SSS, gerçek foto, teyitli rakamlar. 40–: kart seviyesi metin.",
      findings: [
        {
          id: "co1",
          title: "Hizmetler kart seviyesinde",
          severity: "medium",
          summary:
            "Yurt dışı express, acil gönderi, numune, kurumsal lojistik vb. var ama her biri kısa paragraf.",
          recommendation:
            "En çok satan 3–5 hizmeti ayrıntılı sayfaya çevirin.",
          evidence: ["Kaynak: hizmet kartları bölümü"],
        },
        {
          id: "co2",
          title: "İstatistikler doğrulanmalı",
          severity: "medium",
          summary:
            "12.500+ aylık teslimat, 350+ kurumsal, 81 il, 220+ ülke noktası iddia ediliyor. Yanlışsa güven kaybı.",
          recommendation:
            "Mustafa ile rakamları teyit edin; abartıyı düşürün veya kanıtlayın.",
          evidence: ["Kaynak: site istatistik kutuları"],
        },
        {
          id: "co3",
          title: "SSS yok",
          severity: "low",
          summary:
            "Desi, evrak, süre, kapıda alım gibi sorular sitede cevapsız.",
          recommendation:
            "Operasyondan 8–12 gerçek soru toplayıp SSS ekleyin.",
          evidence: ["Kaynak: sitede SSS bölümü yok"],
        },
      ],
      checklist: [
        { id: "cn1", label: "4 adımlı süreç bölümü", done: true },
        { id: "cn2", label: "SSS yayında", done: false },
        { id: "cn3", label: "KVKK / gizlilik", done: false },
        { id: "cn4", label: "Gerçek operasyon fotoğrafları", done: false },
        { id: "cn5", label: "Site istatistikleri teyit edildi", done: false },
      ],
    },
  ],
  roadmap: [
    {
      phase: "1–2. hafta",
      title: "Temel",
      items: [
        "FMX yeni site iskeleti (Next.js + Vercel)",
        "Değer önerisi + NAP + iletişim",
        "robots / sitemap / Search Console / Analytics",
        "Google İşletme Profili tamamla",
      ],
    },
    {
      phase: "3–4. hafta",
      title: "Ürün",
      items: [
        "Fiyat Hesabı (algoritma bağlanınca)",
        "Gönderi Takip (gerçek kaynak)",
        "Mobil düzen + WhatsApp CTA",
        "Yorum toplama başladı",
      ],
    },
    {
      phase: "2. ay",
      title: "Büyüme",
      items: [
        "Hizmet / SSS sayfaları",
        "Denizli + hedef kelime içerikleri",
        "NAP / dizin temizliği",
        "Sonra: mobil app, online ödeme",
      ],
    },
  ],
};
