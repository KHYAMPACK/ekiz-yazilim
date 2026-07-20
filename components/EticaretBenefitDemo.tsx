"use client";

import { useEffect, useState } from "react";

/**
 * Fayda: marka adresi + sipariş akışı — iş yükü azalır hissi.
 */
export default function EticaretBenefitDemo() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStep(2);
      return;
    }

    let cancelled = false;
    let t = 0;

    async function loop() {
      while (!cancelled) {
        for (let s = 0; s <= 2; s++) {
          if (cancelled) return;
          setStep(s);
          await new Promise<void>((r) => {
            t = window.setTimeout(r, s === 2 ? 2200 : 1600);
          });
        }
      }
    }

    void loop();
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div className="benefit-demo" aria-hidden="true" data-step={step}>
      <div className="benefit-demo__chrome">
        <span className="benefit-demo__dot" />
        <span className="benefit-demo__dot" />
        <span className="benefit-demo__dot" />
        <span className="benefit-demo__url">sizinmarka.com</span>
      </div>

      <div className="benefit-demo__stage">
        <div className="benefit-demo__rail">
          <div className={`benefit-demo__node ${step >= 0 ? "is-on" : ""}`}>
            <span>Vitrin</span>
          </div>
          <div className={`benefit-demo__node ${step >= 1 ? "is-on" : ""}`}>
            <span>Sepet</span>
          </div>
          <div className={`benefit-demo__node ${step >= 2 ? "is-on" : ""}`}>
            <span>Sipariş</span>
          </div>
        </div>

        <div className="benefit-demo__cards">
          <div className={`benefit-demo__card ${step === 0 ? "is-active" : ""}`}>
            <div className="benefit-demo__swatch" />
            <p>Ürün net</p>
          </div>
          <div className={`benefit-demo__card ${step === 1 ? "is-active" : ""}`}>
            <p className="benefit-demo__cart-count">2 ürün</p>
            <p>Sepette</p>
          </div>
          <div className={`benefit-demo__card ${step === 2 ? "is-active" : ""}`}>
            <span className="benefit-demo__check" />
            <p>Sizde</p>
          </div>
        </div>

        <p className="benefit-demo__caption">
          {step === 0 && "Müşteri ürünü görür"}
          {step === 1 && "Sepete ekler, öder"}
          {step === 2 && "Siz siparişi alırsınız"}
        </p>
      </div>
    </div>
  );
}
