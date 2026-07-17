/** İlham — guided website-direction chooser */

export type ProfileId =
  | "sade"
  | "cesur"
  | "editorial"
  | "urun";

export type TraitId = ProfileId;

export type PreviewKind =
  | "calm"
  | "energetic"
  | "spacious"
  | "dense"
  | "geometric"
  | "expressive"
  | "neutral"
  | "colorful"
  | "trust"
  | "explain"
  | "leads"
  | "showcase";

export type ChooserOption = {
  id: string;
  label: string;
  description: string;
  preview: PreviewKind;
  /** Weighted scores toward result profiles */
  scores: Partial<Record<TraitId, number>>;
};

export type ChooserQuestion = {
  id: string;
  title: string;
  prompt: string;
  options: readonly ChooserOption[];
};

export type ResultProfile = {
  id: ProfileId;
  title: string;
  summary: string;
  implications: readonly [string, string, string];
};

export const RESULT_PROFILES: readonly ResultProfile[] = [
  {
    id: "sade",
    title: "Sade ve Güven Veren",
    summary:
      "Siteniz sakin, net ve profesyonel bir ilk izlenim vermeli. Az öğe, bol boşluk, okunaklı tipografi — ziyaretçi ne yaptığınızı hemen anlar.",
    implications: [
      "Düzen: tek odak alanı, geniş boşluk, kısa bölümler.",
      "Görünüm: nötr veya yumuşak renkler, sade tipografi.",
      "İçerik: net vaat + tek güçlü iletişim çağrısı.",
    ],
  },
  {
    id: "cesur",
    title: "Cesur ve Dinamik",
    summary:
      "Siteniz dikkat çekmeli ve enerji vermeli. Güçlü kontrast, belirgin başlıklar ve hareket hissi — markanızın canlı tarafı öne çıkar.",
    implications: [
      "Düzen: büyük başlıklar, güçlü görsel bloklar, net ritim.",
      "Görünüm: yüksek kontrast, cesur renk vurguları.",
      "İçerik: kısa, vurucu cümleler + belirgin CTA.",
    ],
  },
  {
    id: "editorial",
    title: "Editoryal ve Anlatı Odaklı",
    summary:
      "Siteniz bir hikâye gibi okunmalı. Tipografi, görsel ritim ve uzun soluklu anlatım — markanızın karakteri metin ve kompozisyonla gelir.",
    implications: [
      "Düzen: dergi benzeri akış, büyük tipografi, görsel molalar.",
      "Görünüm: karakterli fontlar, ölçülü ama seçici renk.",
      "İçerik: anlatı + bölüm başlıkları; CTA hikâyenin doğal devamı.",
    ],
  },
  {
    id: "urun",
    title: "Ürün / Hizmet Odaklı",
    summary:
      "Siteniz ne sunduğunuzu net göstermeli. Kartlar, paketler veya vitrin düzeni — ziyaretçi seçenekleri tarar ve bir sonraki adıma geçer.",
    implications: [
      "Düzen: hizmet/ürün kartları, karşılaştırılabilir bloklar.",
      "Görünüm: temiz ızgara, tutarlı kart dili, belirgin fiyat/özellik.",
      "İçerik: fayda listeleri + her blokta aksiyon (incele / talep et).",
    ],
  },
] as const;

export const CHOOSER_QUESTIONS: readonly ChooserQuestion[] = [
  {
    id: "impression",
    title: "İlk izlenim",
    prompt: "Ziyaretçi sitenizi açınca nasıl hissetmeli?",
    options: [
      {
        id: "calm",
        label: "Sakin ve güven veren",
        description: "Profesyonel, dengeli, acele etmeyen bir karşılama.",
        preview: "calm",
        scores: { sade: 3, editorial: 1 },
      },
      {
        id: "energetic",
        label: "Enerjik ve dikkat çekici",
        description: "Canlı, modern, “buradayız” diyen bir giriş.",
        preview: "energetic",
        scores: { cesur: 3, urun: 1 },
      },
    ],
  },
  {
    id: "density",
    title: "İçerik yoğunluğu",
    prompt: "Sayfada bilgi nasıl görünmeli?",
    options: [
      {
        id: "spacious",
        label: "Ferahl ve odaklı",
        description: "Az metin, bol boşluk — tek mesaj net kalsın.",
        preview: "spacious",
        scores: { sade: 3, cesur: 1 },
      },
      {
        id: "dense",
        label: "Zengin ve bilgilendirici",
        description: "Daha fazla içerik, bölümler ve detay yan yana.",
        preview: "dense",
        scores: { editorial: 2, urun: 2 },
      },
    ],
  },
  {
    id: "character",
    title: "Görsel karakter",
    prompt: "Tasarım dili nasıl dursun?",
    options: [
      {
        id: "geometric",
        label: "Temiz ve geometrik",
        description: "Düz çizgiler, düzenli ızgara, sade formlar.",
        preview: "geometric",
        scores: { sade: 2, urun: 2 },
      },
      {
        id: "expressive",
        label: "İfadeli ve editoryal",
        description: "Tipografi ve kompozisyon markayı konuşturur.",
        preview: "expressive",
        scores: { editorial: 3, cesur: 1 },
      },
    ],
  },
  {
    id: "color",
    title: "Renk yönü",
    prompt: "Renkler ne kadar öne çıksın?",
    options: [
      {
        id: "neutral",
        label: "Ölçülü ve nötr",
        description: "Siyah, beyaz, gri veya yumuşak tonlar ağırlıkta.",
        preview: "neutral",
        scores: { sade: 3, editorial: 1 },
      },
      {
        id: "colorful",
        label: "Renkli ve ayırt edici",
        description: "Marka rengi görünür; sayfa daha canlı durur.",
        preview: "colorful",
        scores: { cesur: 3, urun: 1 },
      },
    ],
  },
  {
    id: "job",
    title: "Asıl iş",
    prompt: "Sitenin bir numaralı görevi ne olsun?",
    options: [
      {
        id: "trust",
        label: "Güven oluşturmak",
        description: "Ciddiyet, referans hissi, sakin ikna.",
        preview: "trust",
        scores: { sade: 3, editorial: 1 },
      },
      {
        id: "explain",
        label: "Hizmetleri anlatmak",
        description: "Ne yaptığınızı net ve okunaklı anlatmak.",
        preview: "explain",
        scores: { editorial: 2, urun: 2 },
      },
      {
        id: "leads",
        label: "Talep / iletişim almak",
        description: "Form, WhatsApp, randevu — aksiyon ön planda.",
        preview: "leads",
        scores: { cesur: 2, urun: 2 },
      },
      {
        id: "showcase",
        label: "İş / ürün göstermek",
        description: "Vitrin, galeri veya paketler öne çıkar.",
        preview: "showcase",
        scores: { urun: 3, editorial: 1 },
      },
    ],
  },
] as const;

export type Answers = Record<string, string>;

const PROFILE_ORDER: readonly ProfileId[] = [
  "sade",
  "cesur",
  "editorial",
  "urun",
];

/** Deterministic scoring with stable tie-break (PROFILE_ORDER). */
export function calculateResult(answers: Answers): ResultProfile {
  const totals: Record<ProfileId, number> = {
    sade: 0,
    cesur: 0,
    editorial: 0,
    urun: 0,
  };

  for (const question of CHOOSER_QUESTIONS) {
    const optionId = answers[question.id];
    if (!optionId) continue;
    const option = question.options.find((o) => o.id === optionId);
    if (!option) continue;
    for (const [trait, weight] of Object.entries(option.scores)) {
      const id = trait as ProfileId;
      totals[id] += weight ?? 0;
    }
  }

  let best: ProfileId = PROFILE_ORDER[0];
  let bestScore = -1;
  for (const id of PROFILE_ORDER) {
    if (totals[id] > bestScore) {
      bestScore = totals[id];
      best = id;
    }
  }

  return RESULT_PROFILES.find((p) => p.id === best) ?? RESULT_PROFILES[0];
}

export function selectionLabels(answers: Answers): { question: string; choice: string }[] {
  return CHOOSER_QUESTIONS.map((q) => {
    const opt = q.options.find((o) => o.id === answers[q.id]);
    return {
      question: q.title,
      choice: opt?.label ?? "—",
    };
  });
}

export function buildWhatsAppMessage(
  profile: ResultProfile,
  answers: Answers,
): string {
  const lines = selectionLabels(answers).map(
    (s) => `• ${s.question}: ${s.choice}`,
  );
  return [
    "Merhaba, İlham yön seçiciden geldim.",
    "",
    `Önerilen yön: ${profile.title}`,
    "",
    "Seçimlerim:",
    ...lines,
    "",
    "Bu doğrultuda konuşmak istiyorum.",
  ].join("\n");
}
