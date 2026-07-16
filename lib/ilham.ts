export const VIBES = [
  { id: "minimal", label: "Minimal" },
  { id: "editorial", label: "Editoryal" },
  { id: "bold", label: "Cesur" },
  { id: "product", label: "Ürün" },
] as const;

export const SEKTORLER = [
  { id: "egitim", label: "Eğitim" },
  { id: "klinik", label: "Klinik" },
  { id: "restoran", label: "Restoran" },
  { id: "kurumsal", label: "Kurumsal" },
  { id: "eticaret", label: "E-ticaret" },
] as const;

export type VibeId = (typeof VIBES)[number]["id"];
export type SektorId = (typeof SEKTORLER)[number]["id"];

export type IlhamEntry = {
  id: string;
  name: string;
  url: string;
  vibes: readonly VibeId[];
  sektorler: readonly SektorId[];
  /** 1–2 sentences: what to notice / steal in a client meeting */
  note: string;
  /** Optional path under /public, e.g. "/ilham/linear.webp" */
  image?: string;
};

export const ilhamEntries: readonly IlhamEntry[] = [
  {
    id: "linear",
    name: "Linear",
    url: "https://linear.app",
    vibes: ["minimal", "product"],
    sektorler: ["kurumsal"],
    note: "Boşluk, tipografi ve hız duygusu. Sade ürün sitelerinde “az ama net” dil için iyi referans.",
  },
  {
    id: "stripe",
    name: "Stripe",
    url: "https://stripe.com",
    vibes: ["minimal", "product"],
    sektorler: ["kurumsal", "eticaret"],
    note: "Kurumsal güven + ürün anlatımı. Karmaşık hizmeti okunaklı bloklara ayırma örnekleri.",
  },
  {
    id: "masterclass",
    name: "MasterClass",
    url: "https://www.masterclass.com",
    vibes: ["editorial", "bold"],
    sektorler: ["egitim"],
    note: "Büyük görsel, güçlü başlık, ders/ürün kartları. Eğitim ve kurs markaları için sahne duygusu.",
  },
  {
    id: "brilliant",
    name: "Brilliant",
    url: "https://brilliant.org",
    vibes: ["minimal", "product"],
    sektorler: ["egitim"],
    note: "Öğrenme ürününü sade ve oyunsu anlatma. Kurs / ders platformlarında netlik ve motivasyon dengesi.",
  },
  {
    id: "duolingo",
    name: "Duolingo",
    url: "https://www.duolingo.com",
    vibes: ["bold", "product"],
    sektorler: ["egitim"],
    note: "Dil ve kurs markalarında samimi, enerjik dil. Renk + karakter + net CTA — okul sitelerinden farklı bir sıcaklık.",
  },
  {
    id: "rca",
    name: "Royal College of Art",
    url: "https://www.rca.ac.uk",
    vibes: ["editorial", "minimal"],
    sektorler: ["egitim"],
    note: "Prestijli okul anlatımı: tipografi, galeri ritmi, program sayfaları. Kurumsal eğitim sitelerinde ‘ciddi ama canlı’ ton.",
  },
  {
    id: "codecademy",
    name: "Codecademy",
    url: "https://www.codecademy.com",
    vibes: ["product", "minimal"],
    sektorler: ["egitim"],
    note: "Kurs kataloğu, yol haritası ve kayıt funnelları. Çok programlı eğitim kurumlarında gezinmeyi sadeleştirme örneği.",
  },
  {
    id: "outlier",
    name: "Outlier",
    url: "https://www.outlier.org",
    vibes: ["bold", "editorial"],
    sektorler: ["egitim"],
    note: "Modern üniversite / online diploma pazarlaması. Büyük tip, kısa vaat, programı ‘ürün’ gibi satma.",
  },
  {
    id: "nord-anglia",
    name: "Nord Anglia Education",
    url: "https://www.nordangliaeducation.com",
    vibes: ["editorial", "minimal"],
    sektorler: ["egitim", "kurumsal"],
    note: "Uluslararası okul ağı dili: güven, kampüs, veli/öğrenci yolları. Kolektif eğitim markalarında kurumsal iskelet.",
  },
  {
    id: "withers",
    name: "Withers Worldwide",
    url: "https://www.withersworldwide.com",
    vibes: ["editorial", "minimal"],
    sektorler: ["kurumsal"],
    note: "Hukuk / profesyonel hizmet: sakin tipografi, güçlü hiyerarşi. Ciddi sektörlerde güven veren sadelik.",
  },
  {
    id: "resy",
    name: "Resy",
    url: "https://resy.com",
    vibes: ["bold", "product"],
    sektorler: ["restoran"],
    note: "Yemek / rezervasyon dilinde fotoğraf + net CTA. Restoran ve cafe sitelerinde temponun nasıl kurulacağı.",
  },
  {
    id: "one-medical",
    name: "One Medical",
    url: "https://www.onemedical.com",
    vibes: ["minimal", "product"],
    sektorler: ["klinik"],
    note: "Klinik / sağlık: yumuşak ama temiz yüzey, hizmet kartları, randevu çağrısı. Güven ve sakinlik dengesi.",
  },
] as const;

export function vibeLabel(id: VibeId): string {
  return VIBES.find((v) => v.id === id)?.label ?? id;
}

export function sektorLabel(id: SektorId): string {
  return SEKTORLER.find((s) => s.id === id)?.label ?? id;
}
