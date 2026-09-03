import { TASKS_A, TASKS_B } from "@/lib/websitesi";

function Row({
  items,
  reverse,
}: {
  items: readonly string[];
  reverse?: boolean;
}) {
  return (
    <div className="web-marquee overflow-hidden">
      <div
        className={`web-marquee__track py-4 sm:py-5 ${reverse ? "web-marquee__track--reverse" : ""}`}
      >
        {[0, 1].map((copy) => (
          <p
            key={copy}
            className="flex items-center text-lg font-medium tracking-tight text-ice sm:text-2xl"
            aria-hidden={copy === 1}
          >
            {items.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center">
                <span className="px-4 whitespace-nowrap sm:px-6">{item}</span>
                <span className="text-ice/35" aria-hidden>
                  /
                </span>
              </span>
            ))}
          </p>
        ))}
      </div>
    </div>
  );
}

export default function WebTaskMarquee() {
  return (
    <section
      className="border-b border-black bg-black"
      aria-label="Yayına alırken üstlendiğimiz işler"
    >
      <div className="mx-auto w-full max-w-6xl px-4 pt-10 pb-4 sm:px-6 sm:pt-12">
        <p className="text-xs font-medium tracking-[0.2em] uppercase text-ice/70">
          Kapsam
        </p>
        <h2 className="mt-2 max-w-xl text-2xl font-medium tracking-tight text-white sm:text-3xl">
          Yayına Alırken Gereken İşleri Biz Tamamlarız.
        </h2>
      </div>
      <div className="border-t border-white/15">
        <Row items={TASKS_A} />
      </div>
      <div className="border-t border-white/10">
        <Row items={TASKS_B} reverse />
      </div>
    </section>
  );
}
