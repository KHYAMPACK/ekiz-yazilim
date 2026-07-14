/** Public site facts — fill WhatsApp / socials when you have them */
export const site = {
  name: "Ekiz Yazılım",
  city: "Denizli",
  email: "ekizmert3@gmail.com",
  /** Digits only with country code */
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP ?? "905515998156",
  responseTime: "24 saat içinde dönüş",
  linkedin: "",
  instagram: "",
  description:
    "Denizli’deki küçük işletmeler için web sitesi, e-ticaret ve sade yazılım çözümleri.",
} as const;

export function whatsappHref(prefill?: string) {
  if (!site.whatsapp) return null;
  const base = `https://wa.me/${site.whatsapp}`;
  if (!prefill) return base;
  return `${base}?text=${encodeURIComponent(prefill)}`;
}
