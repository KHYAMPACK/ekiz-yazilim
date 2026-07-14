function DemoFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-6 w-full border border-black bg-white text-black"
      style={{ aspectRatio: "10 / 7" }}
    >
      <svg
        viewBox="0 0 200 140"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        className="block h-full w-full"
        aria-hidden="true"
      >
        {children}
      </svg>
    </div>
  );
}

function DemoLanding() {
  return (
    <DemoFrame>
      <rect x="8" y="8" width="184" height="124" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="28" x2="192" y2="28" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="30" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="42" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="20" y="40" width="160" height="48" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <line x1="36" y1="56" x2="100" y2="56" stroke="currentColor" strokeWidth="1.2" />
      <line x1="36" y1="66" x2="84" y2="66" stroke="currentColor" strokeWidth="1.2" />
      <rect x="36" y="74" width="36" height="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="20" y="98" width="48" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="76" y="98" width="48" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="132" y="98" width="48" height="22" fill="none" stroke="currentColor" strokeWidth="1.2" />
    </DemoFrame>
  );
}

function DemoEcommerce() {
  return (
    <DemoFrame>
      <rect x="8" y="8" width="184" height="124" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="28" x2="192" y2="28" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="18" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="30" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="42" cy="18" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="150" y="14" width="28" height="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
      {[0, 1, 2].map((i) => {
        const x = 20 + i * 56;
        return (
          <g key={i}>
            <rect
              x={x}
              y="40"
              width="48"
              height="52"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <line
              x1={x + 8}
              y1="100"
              x2={x + 40}
              y2="100"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <line
              x1={x + 8}
              y1="108"
              x2={x + 32}
              y2="108"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <rect
              x={x + 8}
              y="114"
              width="32"
              height="10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </g>
        );
      })}
    </DemoFrame>
  );
}

function DemoSoftware() {
  return (
    <DemoFrame>
      <rect x="8" y="8" width="184" height="124" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <rect x="8" y="8" width="44" height="124" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16" y1="28" x2="44" y2="28" stroke="currentColor" strokeWidth="1.2" />
      <line x1="16" y1="40" x2="40" y2="40" stroke="currentColor" strokeWidth="1.2" />
      <line x1="16" y1="52" x2="42" y2="52" stroke="currentColor" strokeWidth="1.2" />
      <line x1="16" y1="64" x2="36" y2="64" stroke="currentColor" strokeWidth="1.2" />
      <rect x="64" y="20" width="112" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="64" y="56" width="52" height="64" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="124" y="56" width="52" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <rect x="124" y="92" width="52" height="28" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <line x1="76" y1="108" x2="76" y2="88" stroke="currentColor" strokeWidth="3" />
      <line x1="88" y1="108" x2="88" y2="72" stroke="currentColor" strokeWidth="3" />
      <line x1="100" y1="108" x2="100" y2="80" stroke="currentColor" strokeWidth="3" />
    </DemoFrame>
  );
}

const services = [
  {
    title: "Web sitesi / landing",
    body: "Ne sattığınızı veya ne yaptığınızı net anlatan sade sayfalar.",
    Demo: DemoLanding,
  },
  {
    title: "E-ticaret",
    body: "Ürün satışı ve kendi markanızla online vitrin — butikten atölyeye.",
    Demo: DemoEcommerce,
  },
  {
    title: "Özel çözüm",
    body: "İşinize göre uyarlanmış yazılım. Karmaşık paketler değil, gereken kadar.",
    Demo: DemoSoftware,
  },
] as const;

export default function AboutSection() {
  return (
    <section
      id="hakkimizda"
      className="border-b border-black bg-white"
      aria-labelledby="hakkimizda-title"
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
          <div>
            <p className="mb-3 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
              Hakkımızda
            </p>
            <h2
              id="hakkimizda-title"
              className="text-3xl font-medium tracking-tight text-black sm:text-4xl"
            >
              Denizli’deki küçük işletmeler için dijitalleşme.
            </h2>
          </div>
          <div className="space-y-4 text-base leading-relaxed text-black/75 sm:text-lg">
            <p>
              Büyük şirketlere hitap eden, abartılı ve karmaşık işler peşinde
              değiliz. Ekiz Yazılım olarak odak noktamız net: Denizli’de
              dijitalleşmeye yeni başlayan veya markasını online büyütmek
              isteyen küçük işletmeler.
            </p>
            <p>
              Butik gibi ürün satan işletmeler için e-ticaret, vitrin veya
              tanıtım için sade web siteleri, ihtiyaca özel yazılım çözümleri —
              hepsini sizin yerinize uçtan uca ele alıyoruz. Süslü değil, işe
              yarayan işler.
            </p>
            <p className="border-l-2 border-ice pl-4 text-black">
              Siz işinize bakın. Dijital tarafı biz toparlarız.
            </p>
          </div>
        </div>

        <div className="mt-16 grid gap-0 border border-black sm:mt-20 sm:grid-cols-3">
          <div className="border-b border-black p-6 sm:border-b-0 sm:border-r">
            <p className="mb-2 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
              Kime?
            </p>
            <p className="text-base leading-relaxed text-black/75">
              Denizli’deki esnaf, atölye, butik ve yerel markalar. Online satışa
              geçmek veya kendine ait bir marka sayfası isteyenler. Büyük bütçe
              değil, düzgün bir dijital başlangıç arayanlar.
            </p>
          </div>
          <div className="border-b border-black p-6 sm:border-b-0 sm:border-r">
            <p className="mb-2 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
              Nasıl?
            </p>
            <p className="text-base leading-relaxed text-black/75">
              Keşiften yayına kadar: ihtiyaç, tasarım, geliştirme, yayına alma
              ve sonrası. Tek muhatap, net süreç.
            </p>
          </div>
          <div className="p-6">
            <p className="mb-2 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
              Nerede?
            </p>
            <p className="text-base leading-relaxed text-black/75">
              Şimdilik Denizli. Yerel işletmeleri önce burada güçlendiriyoruz;
              adım adım büyürüz.
            </p>
          </div>
        </div>

        <div className="mt-16 sm:mt-20">
          <p className="mb-6 text-xs font-medium tracking-[0.2em] uppercase text-black/45">
            Ne yapıyoruz?
          </p>
          <ul className="grid gap-10 border-t border-black pt-8 sm:grid-cols-3 sm:gap-0">
            {services.map(({ title, body, Demo }, index) => (
              <li
                key={title}
                className={`text-black sm:px-6 ${
                  index < services.length - 1
                    ? "sm:border-r sm:border-black"
                    : ""
                }`}
              >
                <h3 className="text-lg font-medium tracking-tight text-black">
                  {title}
                </h3>
                <p className="mt-2 min-h-14 text-base leading-relaxed text-black/65">
                  {body}
                </p>
                <Demo />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
