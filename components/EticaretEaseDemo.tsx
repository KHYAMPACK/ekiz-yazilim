"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  { from: "Ayşe", body: "M var mı? Adres: …" },
  { from: "Can", body: "Ödemeyi nasıl yapayım?" },
  { from: "Elif", body: "S beden kaldı mı?" },
] as const;

const ORDERS = [
  { id: "#104", meta: "Beden M · Ödendi", status: "Hazır" },
  { id: "#105", meta: "Beden S · Ödendi", status: "Kargo" },
  { id: "#106", meta: "Beden L · Ödendi", status: "Yeni" },
] as const;

/**
 * Ne kolaylaşır: mesaj karmaşası → sipariş paneli.
 */
export default function EticaretEaseDemo() {
  const [phase, setPhase] = useState<"chaos" | "clear">("chaos");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("clear");
      return;
    }

    let cancelled = false;
    let t = 0;

    async function loop() {
      while (!cancelled) {
        setPhase("chaos");
        await new Promise<void>((r) => {
          t = window.setTimeout(r, 2200);
        });
        if (cancelled) break;
        setPhase("clear");
        await new Promise<void>((r) => {
          t = window.setTimeout(r, 2800);
        });
      }
    }

    void loop();
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div className="ease-demo" aria-hidden="true" data-phase={phase}>
      <div className="ease-demo__chrome">
        <span className="ease-demo__label">
          {phase === "chaos" ? "WhatsApp · Instagram" : "Sipariş paneli"}
        </span>
      </div>

      <div className="ease-demo__stage">
        <div className="ease-demo__chaos">
          {MESSAGES.map((m, i) => (
            <div
              key={m.from}
              className={`ease-demo__bubble ease-demo__bubble--${i}`}
            >
              <p className="ease-demo__from">{m.from}</p>
              <p className="ease-demo__body">{m.body}</p>
            </div>
          ))}
          <p className="ease-demo__warn">Siparişler mesajlarda dağılır</p>
        </div>

        <div className="ease-demo__clear">
          <p className="ease-demo__panel-title">Bugünkü siparişler</p>
          <ul className="ease-demo__orders">
            {ORDERS.map((o) => (
              <li key={o.id} className="ease-demo__order">
                <div>
                  <p className="ease-demo__order-id">{o.id}</p>
                  <p className="ease-demo__order-meta">{o.meta}</p>
                </div>
                <span className="ease-demo__status">{o.status}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
