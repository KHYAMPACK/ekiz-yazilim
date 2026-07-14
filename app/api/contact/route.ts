import { NextResponse } from "next/server";
import { site } from "@/lib/site";

type Body = {
  ad?: string;
  email?: string;
  mesaj?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const ad = body.ad?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const mesaj = body.mesaj?.trim() ?? "";

  if (!ad || !email || !mesaj) {
    return NextResponse.json(
      { error: "Lütfen tüm alanları doldurun." },
      { status: 400 },
    );
  }

  const formspreeId = process.env.FORMSPREE_ID ?? process.env.NEXT_PUBLIC_FORMSPREE_ID;
  if (formspreeId) {
    const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: ad,
        email,
        message: mesaj,
        _subject: `Ekiz Yazılım — ${ad}`,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Gönderilemedi. Lütfen e-posta ile yazın." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM ?? "Ekiz Yazılım <onboarding@resend.dev>",
        to: [process.env.CONTACT_TO_EMAIL ?? site.email],
        reply_to: email,
        subject: `Ekiz Yazılım iletişim — ${ad}`,
        text: `Ad: ${ad}\nE-posta: ${email}\n\n${mesaj}`,
      }),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Gönderilemedi. Lütfen e-posta ile yazın." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  }

  // No provider configured — client can fall back to mailto
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(
    `Ekiz Yazılım — ${ad}`,
  )}&body=${encodeURIComponent(`Ad: ${ad}\nE-posta: ${email}\n\n${mesaj}`)}`;

  return NextResponse.json({ ok: true, mailto });
}
