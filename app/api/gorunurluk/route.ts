import { NextResponse } from "next/server";
import { normalizePhone } from "@/lib/intake";
import { site } from "@/lib/site";

type Body = {
  brand?: string;
  website?: string;
  city?: string;
  phone?: string;
  oneLiner?: string;
  goal?: string;
  gbp?: string;
  competitors?: string;
  problem?: string;
};

function trim(value: string | undefined, max: number) {
  return (value ?? "").trim().slice(0, max);
}

async function sendLeadEmail(fields: Record<string, string>) {
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const subject = `Görünürlük talebi — ${fields.brand}`;
  const text = Object.entries(fields)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");

  if (resendKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM ?? "Ekiz Yazılım <onboarding@resend.dev>",
        to: [to],
        subject,
        text,
      }),
    });
    if (!res.ok) return { ok: false as const };
    return { ok: true as const };
  }

  const formspreeId =
    process.env.FORMSPREE_ID ?? process.env.NEXT_PUBLIC_FORMSPREE_ID;
  if (formspreeId) {
    const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...fields,
        _subject: subject,
      }),
    });
    if (!res.ok) return { ok: false as const };
    return { ok: true as const };
  }

  // Dev / no mail provider: accept so local testing works
  console.info("[gorunurluk lead]", text);
  return { ok: true as const, skipped: true as const };
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const brand = trim(body.brand, 120);
  const website = trim(body.website, 200);
  const city = trim(body.city, 120);
  const oneLiner = trim(body.oneLiner, 200);
  const goal = trim(body.goal, 120);
  const gbp = trim(body.gbp, 200);
  const competitors = trim(body.competitors, 300);
  const problem = trim(body.problem, 500);

  if (!brand || !website || !city || !oneLiner || !goal) {
    return NextResponse.json(
      { error: "Zorunlu alanları doldurun." },
      { status: 400 },
    );
  }

  const phone = normalizePhone(trim(body.phone, 40));
  if (!phone.ok) {
    return NextResponse.json({ error: phone.reason }, { status: 400 });
  }

  const mailed = await sendLeadEmail({
    brand,
    website,
    city,
    phone: phone.display,
    oneLiner,
    goal,
    gbp,
    competitors,
    problem,
  });

  if (!mailed.ok) {
    return NextResponse.json(
      { error: "Gönderilemedi. Lütfen iletişim formundan yazın." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
