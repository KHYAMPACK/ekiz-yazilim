"use client";

import { useEffect, useRef } from "react";

/**
 * Looping shop demo: browse → select → cart → pay.
 * Cursor targets real element positions inside the stage.
 */
export default function ShopFlowDemo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const addBtnRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const payBtnRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const cursor = cursorRef.current;
    if (!stage || !cursor) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (badgeRef.current) badgeRef.current.style.opacity = "1";
      return;
    }

    let cancelled = false;
    let timer = 0;

    function pointOf(el: HTMLElement | null) {
      if (!stage || !el) return { x: 20, y: 40 };
      const s = stage.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      return {
        x: r.left - s.left + r.width * 0.55,
        y: r.top - s.top + r.height * 0.55,
      };
    }

    function moveCursor(x: number, y: number, ms: number) {
      if (!cursor) return Promise.resolve();
      const anim = cursor.animate(
        [
          {
            left: cursor.style.left || "20px",
            top: cursor.style.top || "40px",
          },
          { left: `${x}px`, top: `${y}px` },
        ],
        { duration: ms, easing: "cubic-bezier(0.4, 0.05, 0.3, 1)", fill: "forwards" },
      );
      return anim.finished.then(() => {
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
      });
    }

    function clickPulse() {
      if (!cursor) return Promise.resolve();
      return cursor
        .animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(0.86)" },
            { transform: "scale(1)" },
          ],
          { duration: 220, easing: "ease-out" },
        )
        .finished.catch(() => undefined);
    }

    function setVisible(el: HTMLElement | null, on: boolean) {
      if (!el) return;
      el.style.opacity = on ? "1" : "0";
      el.style.transform = on ? "translateY(0)" : "translateY(8px)";
    }

    function sleep(ms: number) {
      return new Promise<void>((resolve) => {
        timer = window.setTimeout(resolve, ms);
      });
    }

    async function loop() {
      while (!cancelled) {
        const card = cardRef.current;
        const addBtn = addBtnRef.current;
        const cart = cartRef.current;
        const pay = payBtnRef.current;

        setVisible(checkoutRef.current, false);
        setVisible(successRef.current, false);
        if (gridRef.current) {
          gridRef.current.style.opacity = "1";
        }
        if (badgeRef.current) {
          badgeRef.current.style.opacity = "0";
          badgeRef.current.style.transform = "scale(0.6)";
        }
        if (card) card.style.borderColor = "rgba(0,0,0,0.2)";
        if (addBtn) {
          addBtn.style.background = "#fff";
          addBtn.style.color = "#000";
        }

        const p0 = pointOf(card);
        await moveCursor(p0.x - 30, p0.y - 40, 500);
        await sleep(200);
        await moveCursor(p0.x, p0.y - 20, 450);
        if (card) card.style.borderColor = "#000";
        await sleep(250);

        const pAdd = pointOf(addBtn);
        await moveCursor(pAdd.x, pAdd.y, 400);
        await clickPulse();
        if (addBtn) {
          addBtn.style.background = "#000";
          addBtn.style.color = "#fff";
        }
        if (badgeRef.current) {
          badgeRef.current.style.opacity = "1";
          badgeRef.current.style.transform = "scale(1)";
        }
        await sleep(350);

        const pCart = pointOf(cart);
        await moveCursor(pCart.x, pCart.y, 500);
        await clickPulse();
        if (gridRef.current) gridRef.current.style.opacity = "0";
        setVisible(checkoutRef.current, true);
        await sleep(400);

        const pPay = pointOf(pay);
        await moveCursor(pPay.x, pPay.y, 450);
        await clickPulse();
        setVisible(checkoutRef.current, false);
        setVisible(successRef.current, true);
        await sleep(900);

        setVisible(successRef.current, false);
        await sleep(200);
      }
    }

    void loop();

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      cursor.getAnimations().forEach((a) => a.cancel());
    };
  }, []);

  return (
    <div className="shop-demo" aria-hidden="true">
      <div className="shop-demo__chrome">
        <span className="shop-demo__dot" />
        <span className="shop-demo__dot" />
        <span className="shop-demo__dot" />
        <span className="shop-demo__url">magaza.ornek</span>
      </div>

      <div ref={stageRef} className="shop-demo__stage">
        <div ref={gridRef} className="shop-demo__grid">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              ref={i === 1 ? cardRef : undefined}
              className={`shop-demo__card shop-demo__card--${i}`}
            >
              <div className="shop-demo__swatch" />
              <div className="shop-demo__line shop-demo__line--title" />
              <div className="shop-demo__line shop-demo__line--price" />
              <div
                ref={i === 1 ? addBtnRef : undefined}
                className="shop-demo__btn"
              >
                Sepete ekle
              </div>
            </div>
          ))}
        </div>

        <div ref={cartRef} className="shop-demo__cart">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M6 6h15l-1.5 9h-12z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="miter"
            />
            <circle cx="9" cy="20" r="1.2" fill="currentColor" />
            <circle cx="17" cy="20" r="1.2" fill="currentColor" />
            <path d="M6 6L5 3H2" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          <span ref={badgeRef} className="shop-demo__badge">
            1
          </span>
        </div>

        <div ref={checkoutRef} className="shop-demo__checkout">
          <p className="shop-demo__checkout-label">Ödeme</p>
          <div className="shop-demo__line shop-demo__line--wide" />
          <div className="shop-demo__line shop-demo__line--mid" />
          <div ref={payBtnRef} className="shop-demo__pay">
            Ödemeyi tamamla
          </div>
        </div>

        <div ref={successRef} className="shop-demo__success">
          <span className="shop-demo__check" />
          <p>Sipariş alındı</p>
        </div>

        <div
          ref={cursorRef}
          className="shop-demo__cursor"
          style={{ left: 24, top: 48 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M5 3l14 8.5-6.2 1.6L10.5 21 5 3z"
              fill="#000"
              stroke="#fff"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
