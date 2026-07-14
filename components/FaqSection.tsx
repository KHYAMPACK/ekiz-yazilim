const faqs = [
  {
    q: "Fiyat nasıl belirleniyor?",
    a: "Kapsama göre. Önce ihtiyacı netleştirir, sonra sabit veya net aralıklı bir teklif yazarız. Gizli kalem yok.",
  },
  {
    q: "Ne kadar sürer?",
    a: "Basit bir tanıtım / landing sitesi genelde kısa sürede çıkar. E-ticaret ve özel yazılım işin büyüklüğüne göre planlanır; süre teklifte yazar.",
  },
  {
    q: "E-ticarete sıfırdan mı başlıyorsunuz?",
    a: "Evet. Denizli’de ürün satan işletmeler için e-ticaret başlangıcını sade tutuyoruz: ürün vitrini, sipariş/ödeme düzeni ve ilk yayına net bir yol.",
  },
  {
    q: "Hosting ve alan adı sizde mi?",
    a: "İsterseniz kurulumunu biz yaparız; hesaplar ve mülkiyet sizde kalır. Nasıl ilerleyeceğimizi baştan konuşuruz.",
  },
  {
    q: "Yayından sonra destek var mı?",
    a: "Evet. Küçük düzeltmeler ve sorular için yanınızdayız. Daha büyük eklemeler ayrı konuşulur.",
  },
  {
    q: "Denizli dışına iş alıyor musunuz?",
    a: "Önceliğimiz Denizli’deki küçük işletmeler. Uzaktan da çalışabiliriz; odak şimdilik yerelde.",
  },
] as const;

export default function FaqSection() {
  return (
    <section
      id="sss"
      className="border-b border-black bg-white"
      aria-labelledby="sss-title"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 max-w-xl">
          <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
            SSS
          </p>
          <h2
            id="sss-title"
            className="text-3xl font-medium tracking-tight text-black sm:text-4xl"
          >
            Sık sorulanlar
          </h2>
        </div>

        <ul className="divide-y divide-black border-y border-black">
          {faqs.map((item) => (
            <li
              key={item.q}
              className="grid min-w-0 gap-3 py-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] sm:gap-10"
            >
              <h3 className="text-base font-medium tracking-tight text-black sm:text-lg">
                {item.q}
              </h3>
              <p className="min-w-0 text-base leading-relaxed text-black/65">
                {item.a}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
