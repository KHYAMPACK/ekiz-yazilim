/**
 * Generates a print-ready PDF for Şahika Öncü Minikler görünürlük raporu.
 * Usage: node scripts/generate-sahika-pdf.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { launch } from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "docs");
const htmlPath = join(outDir, "sahika-oncu-minikler-gorunurluk-raporu.html");
const pdfPath = join(outDir, "sahika-oncu-minikler-gorunurluk-raporu.pdf");

const ICE = "#bfd5eb";
const BLACK = "#0a0a0a";

const audit = {
  meta: {
    preparedBy: "Ekiz Yazılım",
    preparedFor: "Şahika Öncü Minikler Kreş / Lider Çocuklar Anaokulu",
    businessType: "Kreş + anaokulu (iki kampüs, ortak sahiplik)",
    date: "Temmuz 2026",
    websiteUrl: "https://www.sahikaoncuminikler.com",
    city: "Denizli / Yenişehir (Merkezefendi)",
    phone: "0258 374 04 20 / 0553 704 04 20 / 0507 245 37 46",
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
      title: "Kayıt / iletişim & CTA",
      score: 28,
      blurb:
        "Ebeveyn siteye veya Instagram’a gelince ne yapmalı? Ara, yaz, ziyaret randevusu — net ve tek tık olmalı.",
      rubric:
        "80+: net CTA + WhatsApp/ara + kayıt formu. 40–: eski site, kırık link, CTA yok.",
      findings: [
        {
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
          title: "Öncü sitesinde modern CTA yok",
          severity: "high",
          summary:
            "sahikaoncuminikler.com bilgilendiriyor ama “hemen ara / WhatsApp / kayıt formu” akışı yok. Çok metin, az aksiyon.",
          recommendation:
            "Yeni sitede sticky veya net: Ara · WhatsApp · Okulu gez / bilgi al. Mobilde birincil aksiyon telefon/WhatsApp.",
          evidence: ["Kaynak: ana sayfa — eski tek sayfa düzeni"],
        },
        {
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
        { label: "Lider IG bio linki çalışıyor (404 yok)", done: false },
        { label: "Ana CTA: Ara / WhatsApp / bilgi formu", done: false },
        { label: "Birincil telefon her kanalda aynı", done: false },
        {
          label: "İletişim bilgisi sitede ve Google’da görünür",
          done: true,
          note: "Sitede var; Google kartlarına site bağlı değil",
        },
      ],
    },
    {
      title: "Google’da organik görünürlük",
      score: 30,
      blurb:
        "Kreş / anaokulu Denizli aramalarında site ve içerik yapısı rank için temel. Tek eski sayfa yetmez.",
      rubric:
        "80+: yerel sayfalar + title/description + GSC. 40–: 2016 tek sayfa, ölçüm belirsiz.",
      findings: [
        {
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
          title: "Yerel niyet sayfaları yok",
          severity: "high",
          summary:
            "“Kreş Denizli”, “Yenişehir anaokulu”, yaş grupları için ayrı, sade sayfalar yok. Tek sayfada her şey.",
          recommendation:
            "Hafif SEO: 4–8 sayfa — ana, Öncü, Lider (veya kampüs), program/yaş, iletişim. Anahtar ifadeler doğal dilde.",
          evidence: ["Kaynak: tek domain / tek sayfa yapısı"],
        },
        {
          title: "İki marka, bir site dili",
          severity: "medium",
          summary:
            "Lider’in kendi domain linki ölü; Öncü domain ayakta. Arama ve marka tutarlılığı zayıf.",
          recommendation:
            "Tek domain altında iki okul net bölümler veya bilinçli tek marka stratejisi — görüşmede karar.",
          evidence: [],
        },
      ],
      checklist: [
        { label: "Benzersiz title / description (ana + okul)", done: false },
        { label: "XML sitemap + Search Console", done: false },
        {
          label: "Yerel kelime planı (kreş / anaokulu / Yenişehir)",
          done: false,
        },
        { label: "İç linkler (okul ↔ iletişim ↔ program)", done: false },
      ],
    },
    {
      title: "Yerel / harita / yorum",
      score: 34,
      blurb:
        "Tavsiye ve konum güçlü; Google kartı ebeveynin son kontrol noktası. İki profil de yarım.",
      rubric:
        "80+: dolu GBP, site linki, saatler, yorum süreci. 40–: eksik alanlar, az yorum.",
      findings: [
        {
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
          title: "Yorum hacmi çok düşük",
          severity: "high",
          summary:
            "4 + 3 yorum. Puan 5,0 ama sosyal kanıt zayıf; rakipler daha fazla yorumla öne geçebilir.",
          recommendation:
            "Memnun velilerden nazik, düzenli yorum isteği (abartısız). Ayrı bir “yorum kampanyası” değil, süreç.",
          evidence: ["Öncü: 4 yorum", "Lider: 3 yorum"],
        },
        {
          title: "NAP / telefon tutarlılığı teyit edilmeli",
          severity: "medium",
          summary:
            "Aynı 0507 hattı iki kartta. Üç numara sitede. Karışıklık riski.",
          recommendation:
            "Tek birincil telefon seçip site, IG, GBP, kartvizitte kilitleyin.",
          evidence: [],
        },
      ],
      checklist: [
        { label: "Öncü GBP: site + saatler + kategori tamam", done: false },
        { label: "Lider GBP: site + saatler tamam", done: false },
        { label: "NAP her kanalda aynı", done: false },
        { label: "Yorum isteme süreci (ayda birkaç veli)", done: false },
        {
          label: "GBP erişim / sahiplik net",
          done: false,
          note: "Görüşmede teyit",
        },
      ],
    },
    {
      title: "Teknik altyapı",
      score: 36,
      blurb: "Domain ayakta; Lider URL ölü. Yeni site ile kontrol ve ölçüm şart.",
      rubric:
        "80+: HTTPS, hızlı mobil, sitemap, dönüşüm event’leri. 40–: eski stack / kırık URL.",
      findings: [
        {
          title: "Öncü domain çalışıyor, stack eski",
          severity: "high",
          summary:
            "sahikaoncuminikler.com yanıt veriyor; tasarım ve yapı 2016. Mobil deneyim ve hız riski yüksek.",
          recommendation:
            "Yeni siteyi modern stack’te kurup domain’i oraya yönlendirin. Eski siteyi arşiv / redirect.",
          evidence: ["Canlı: sahikaoncuminikler.com"],
        },
        {
          title: "Lider domain yolu 404",
          severity: "critical",
          summary: "Instagram’daki Lider web yolu 404. Teknik borç + itibar.",
          recommendation:
            "DNS/hosting durumunu kontrol; ya düzelt ya IG’den kaldır. Tercihen tek sağlıklı site.",
          evidence: ["Doğrulama: 404"],
        },
        {
          title: "Ölçüm / event’ler yok (varsayılan)",
          severity: "medium",
          summary:
            "Eski sitede GA4 / arama konsolu / tıklama event’leri beklenmez.",
          recommendation:
            "Yeni sitede: sayfa görüntüleme, Ara tıklama, WhatsApp tıklama.",
          evidence: [],
        },
      ],
      checklist: [
        { label: "HTTPS + domain sizin kontrolünüzde", done: false },
        { label: "Mobil hız kabul edilebilir", done: false },
        { label: "robots / sitemap", done: false },
        { label: "Ara / WhatsApp tıklama ölçümü", done: false },
        { label: "Lider kırık URL temizlendi", done: false },
      ],
    },
    {
      title: "İçerik & güven",
      score: 48,
      blurb:
        "Anlatacak gerçek hikâye var (program, organik, saatler, küçük grup). Sunum eski; fotoğraf ve güven sinyali zayıf.",
      rubric:
        "80+: güncel foto, sade dil, veli yorumları sitede. 40–: clipart, uzun blok metin.",
      findings: [
        {
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
          title: "Güven: yorumlar sitede yok, Google’da az",
          severity: "high",
          summary:
            "5,0 puan var ama 3–4 yorum. Sitede veli / referans bölümü modern formatta yok.",
          recommendation:
            "Seçilmiş veli alıntıları + Google yorumlarına link. İzinli fotoğraflarla “okul günü” hissi.",
          evidence: [],
        },
        {
          title: "İki okul anlatımı bulanık",
          severity: "medium",
          summary:
            "IG’de Lider hesabı “Öncüminikler Kreş Kampüsü” diyor; site Öncü odaklı. Ebeveyn “hangi bina?” diye kalabilir.",
          recommendation:
            "Tek sayfada iki adres net harita/sekme veya iki net okul sayfası.",
          evidence: [],
        },
      ],
      checklist: [
        { label: "Güncel, izinli okul fotoğrafları sitede", done: false },
        {
          label: "Program / yaş / saatler sade kartlar",
          done: false,
          note: "Ham metin mevcut",
        },
        { label: "Veli / güven bölümü", done: false },
        { label: "Öncü vs Lider ebeveyne net", done: false },
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

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function scoreLabel(score) {
  if (score >= 80) return "Güçlü";
  if (score >= 60) return "Orta";
  if (score >= 40) return "Zayıf";
  return "Kritik";
}

function severityLabel(s) {
  return (
    {
      critical: "Kritik",
      high: "Yüksek",
      medium: "Orta",
      low: "Düşük",
      ok: "Tamam",
    }[s] || s
  );
}

function severityClass(s) {
  return (
    {
      critical: "sev-critical",
      high: "sev-high",
      medium: "sev-medium",
      low: "sev-low",
      ok: "sev-ok",
    }[s] || "sev-medium"
  );
}

function metaCard(label, value) {
  return `<div class="meta"><p class="eyebrow">${esc(label)}</p><p class="meta-v">${esc(value)}</p></div>`;
}

function findingHtml(f) {
  const evidence =
    f.evidence && f.evidence.length
      ? `<ul class="evidence">${f.evidence.map((e) => `<li>${esc(e)}</li>`).join("")}</ul>`
      : "";
  return `<article class="card keep">
    <div class="card-head">
      <span class="badge ${severityClass(f.severity)}">${esc(severityLabel(f.severity))}</span>
      <h3>${esc(f.title)}</h3>
    </div>
    <p class="body">${esc(f.summary)}</p>
    ${evidence}
    <p class="rec"><strong>Ne yapacağız:</strong> ${esc(f.recommendation)}</p>
  </article>`;
}

function checklistHtml(items) {
  const done = items.filter((i) => i.done).length;
  return `<div class="card keep checklist">
    <div class="check-head">
      <h4>Yapılacaklar</h4>
      <span>${done}/${items.length} tamam</span>
    </div>
    <ul>
      ${items
        .map(
          (i) => `<li class="${i.done ? "done" : ""}">
        <span class="box">${i.done ? "✓" : ""}</span>
        <span>${esc(i.label)}${i.note ? `<small>${esc(i.note)}</small>` : ""}</span>
      </li>`,
        )
        .join("")}
    </ul>
  </div>`;
}

function categoryHtml(cat, i) {
  return `<section class="category ${i === 0 ? "break-before" : "break-before"}">
    <div class="cat-head keep">
      <div>
        <p class="eyebrow">Bölüm</p>
        <h2>${esc(cat.title)}</h2>
        <p class="body">${esc(cat.blurb)}</p>
        <p class="rubric"><strong>Puan ölçütü:</strong> ${esc(cat.rubric)}</p>
      </div>
      <div class="score-box">
        <p class="eyebrow">Puan</p>
        <p class="score-num">${cat.score}</p>
      </div>
    </div>
    <div class="cat-body">
      ${cat.findings.map(findingHtml).join("")}
      ${checklistHtml(cat.checklist)}
    </div>
  </section>`;
}

const ringOffset = 339.292 - (audit.executive.overallScore / 100) * 339.292;

const html = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8" />
<title>Görünürlük Raporu — ${esc(audit.meta.preparedFor)}</title>
<style>
  @page { size: A4; margin: 14mm; }
  * { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
    color: ${BLACK};
    background: #fff;
    font-size: 11.5pt;
    line-height: 1.45;
  }
  .eyebrow {
    margin: 0;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(10,10,10,0.45);
  }
  h1 { margin: 12px 0 0; font-size: 22pt; font-weight: 500; line-height: 1.15; letter-spacing: -0.02em; }
  h2 { margin: 6px 0 0; font-size: 18pt; font-weight: 500; letter-spacing: -0.02em; }
  h3 { margin: 0; font-size: 13pt; font-weight: 500; }
  h4 { margin: 0; font-size: 12pt; font-weight: 500; }
  .body { margin: 8px 0 0; color: rgba(10,10,10,0.65); font-size: 10.5pt; }
  .cover {
    border: 1px solid ${BLACK};
    background: #fff;
  }
  .cover-top {
    display: grid;
    grid-template-columns: 1.35fr auto;
    gap: 24px;
    padding: 28px;
    background: color-mix(in srgb, ${ICE} 22%, white);
    border-bottom: 1px solid ${BLACK};
  }
  .ring-wrap {
    border: 1px solid ${BLACK};
    background: #fff;
    padding: 18px 22px;
    text-align: center;
    align-self: center;
  }
  .ring { width: 120px; height: 120px; margin: 0 auto; position: relative; }
  .ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
  .ring-label {
    position: absolute; inset: 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
  }
  .ring-label strong { font-size: 28pt; font-weight: 500; line-height: 1; }
  .ring-label span { font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(10,10,10,0.55); margin-top: 4px; }
  .ring-cap { margin: 10px 0 0; font-size: 9.5pt; color: rgba(10,10,10,0.55); max-width: 11rem; }
  .metas {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    margin-top: 18px;
  }
  .meta {
    border: 1px solid ${BLACK};
    background: #fff;
    padding: 10px 12px;
  }
  .meta-v { margin: 4px 0 0; font-weight: 500; font-size: 10.5pt; }
  .priorities {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    background: ${BLACK};
    border-top: 1px solid ${BLACK};
  }
  .prio { background: #fff; padding: 12px 14px; }
  .prio p:last-child { margin: 6px 0 0; font-size: 10pt; }
  .category { margin-top: 18px; }
  .break-before { break-before: page; page-break-before: always; }
  .keep { break-inside: avoid; page-break-inside: avoid; }
  .cat-head {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 16px;
    border: 1px solid ${BLACK};
    padding: 18px 20px;
    margin-bottom: 12px;
    background: #fff;
  }
  .rubric {
    margin: 10px 0 0;
    padding: 8px 10px;
    border-left: 3px solid ${ICE};
    background: color-mix(in srgb, ${ICE} 28%, white);
    font-size: 9.5pt;
    color: rgba(10,10,10,0.7);
  }
  .score-box {
    border: 1px solid ${BLACK};
    background: color-mix(in srgb, ${ICE} 45%, white);
    padding: 12px 16px;
    text-align: right;
    align-self: start;
  }
  .score-num { margin: 4px 0 0; font-size: 28pt; font-weight: 500; line-height: 1; }
  .cat-body { display: flex; flex-direction: column; gap: 10px; }
  .card {
    border: 1px solid ${BLACK};
    background: color-mix(in srgb, ${ICE} 14%, white);
    padding: 14px 16px;
  }
  .card-head { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
  .badge {
    display: inline-block;
    border: 1px solid ${BLACK};
    padding: 2px 8px;
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  .sev-critical { background: ${BLACK}; color: #fff; }
  .sev-high { background: rgba(10,10,10,0.8); color: #fff; }
  .sev-medium { background: color-mix(in srgb, ${ICE} 65%, white); color: ${BLACK}; }
  .sev-low { background: #fff; color: rgba(10,10,10,0.7); border-color: rgba(10,10,10,0.3); }
  .sev-ok { background: ${ICE}; color: ${BLACK}; }
  .evidence {
    margin: 10px 0 0;
    padding: 8px 12px;
    border: 1px solid rgba(10,10,10,0.15);
    background: #fff;
    list-style: none;
  }
  .evidence li { font-size: 9.5pt; color: rgba(10,10,10,0.55); margin: 2px 0; }
  .rec {
    margin: 12px 0 0;
    padding-left: 10px;
    border-left: 2px solid ${BLACK};
    font-size: 10.5pt;
  }
  .checklist { background: #fff; }
  .check-head { display: flex; justify-content: space-between; align-items: end; margin-bottom: 10px; }
  .check-head span { font-size: 9.5pt; color: rgba(10,10,10,0.55); }
  .checklist ul { list-style: none; margin: 0; padding: 0; }
  .checklist li { display: flex; gap: 10px; align-items: flex-start; padding: 6px 0; font-size: 10.5pt; }
  .checklist li.done { color: rgba(10,10,10,0.45); text-decoration: line-through; }
  .checklist .box {
    width: 16px; height: 16px; border: 1px solid ${BLACK};
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 10px; flex-shrink: 0; margin-top: 2px;
  }
  .checklist li.done .box { background: ${BLACK}; color: #fff; text-decoration: none; }
  .checklist small { display: block; margin-top: 2px; font-size: 9pt; color: rgba(10,10,10,0.45); text-decoration: none; }
  .roadmap {
    break-before: page;
    page-break-before: always;
    background: ${BLACK};
    color: #fff;
    padding: 24px;
    border: 1px solid ${BLACK};
  }
  .roadmap .eyebrow { color: ${ICE}; }
  .roadmap h2 { color: #fff; }
  .roadmap .body { color: rgba(255,255,255,0.65); }
  .phases { display: grid; grid-template-columns: 1fr; gap: 10px; margin-top: 18px; }
  .phase {
    border: 1px solid rgba(255,255,255,0.25);
    padding: 14px 16px;
    break-inside: avoid;
  }
  .phase .eyebrow { color: ${ICE}; }
  .phase h3 { margin-top: 6px; font-size: 14pt; }
  .phase ul { margin: 10px 0 0; padding: 0; list-style: none; }
  .phase li {
    display: flex; gap: 8px; font-size: 10.5pt;
    color: rgba(255,255,255,0.8); margin: 4px 0;
  }
  .phase li::before {
    content: "";
    width: 6px; height: 6px; background: ${ICE};
    margin-top: 7px; flex-shrink: 0;
  }
  .footer-note {
    margin-top: 16px;
    font-size: 9pt;
    color: rgba(10,10,10,0.45);
    text-align: center;
  }
</style>
</head>
<body>
  <section class="cover keep">
    <div class="cover-top">
      <div>
        <p class="eyebrow">Hazırlanan işletme · ${esc(audit.meta.preparedFor)}</p>
        <h1>${esc(audit.executive.headline)}</h1>
        <p class="body">${esc(audit.executive.summary)}</p>
        <div class="metas">
          ${metaCard("İşletme türü", audit.meta.businessType)}
          ${metaCard("Website", audit.meta.websiteUrl)}
          ${metaCard("Şehir", audit.meta.city)}
          ${metaCard("Telefon", audit.meta.phone)}
          ${metaCard("Hazırlayan", audit.meta.preparedBy)}
          ${metaCard("Tarih", audit.meta.date)}
        </div>
      </div>
      <div class="ring-wrap keep">
        <div class="ring">
          <svg viewBox="0 0 128 128" aria-hidden="true">
            <circle cx="64" cy="64" r="54" fill="none" stroke="rgba(10,10,10,0.15)" stroke-width="10"/>
            <circle cx="64" cy="64" r="54" fill="none" stroke="${BLACK}" stroke-width="10"
              stroke-linecap="square" stroke-dasharray="339.292" stroke-dashoffset="${ringOffset}"/>
          </svg>
          <div class="ring-label">
            <strong>${audit.executive.overallScore}</strong>
            <span>${esc(scoreLabel(audit.executive.overallScore))}</span>
          </div>
        </div>
        <p class="ring-cap">Genel görünürlük puanı (0–100)</p>
      </div>
    </div>
    <div class="priorities">
      ${audit.executive.topPriorities
        .map(
          (p, i) => `<div class="prio keep">
          <p class="eyebrow">Öncelik 0${i + 1}</p>
          <p>${esc(p)}</p>
        </div>`,
        )
        .join("")}
    </div>
  </section>

  ${audit.categories.map(categoryHtml).join("\n")}

  <section class="roadmap">
    <p class="eyebrow">Çalışma planı</p>
    <h2>Birlikte neyi sırayla yapacağız?</h2>
    <p class="body">Reklam sonra. Önce site kontrol altına alınır, darboğazlar kalkar, Google’da ücretsiz görünürlük temeli kurulur.</p>
    <div class="phases">
      ${audit.roadmap
        .map(
          (ph) => `<article class="phase keep">
          <p class="eyebrow">${esc(ph.phase)}</p>
          <h3>${esc(ph.title)}</h3>
          <ul>${ph.items.map((it) => `<li>${esc(it)}</li>`).join("")}</ul>
        </article>`,
        )
        .join("")}
    </div>
  </section>

  <p class="footer-note">${esc(audit.meta.preparedFor)} · ${esc(audit.meta.preparedBy)} görünürlük raporu · ${esc(audit.meta.date)}</p>
</body>
</html>`;

mkdirSync(outDir, { recursive: true });
writeFileSync(htmlPath, html, "utf8");
console.log("HTML:", htmlPath);

const browser = await launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});
try {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(htmlPath).href, {
    waitUntil: "networkidle0",
  });
  await page.pdf({
    path: pdfPath,
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: "12mm", right: "12mm", bottom: "12mm", left: "12mm" },
  });
  console.log("PDF:", pdfPath);
} finally {
  await browser.close();
}
