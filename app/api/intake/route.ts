import { NextResponse } from "next/server";
import { classifyIntake, normalizePhone } from "@/lib/intake";
import { site } from "@/lib/site";

type Body = {
  mesaj?: string;
  telefon?: string;
  answers?: Record<string, string>;
  /** "classify" (default) | "complete" — complete requires phone + sends email */
  step?: "classify" | "complete";
};

const ANSWER_LABELS: Record<string, string> = {
  dijital: "Dijitale hazır",
  online: "Online görünürlük",
};

async function sendIntakeEmail(
  mesaj: string,
  telefonDisplay: string,
  answers?: Record<string, string>,
) {
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;
  const answerBlock =
    answers && Object.keys(answers).length > 0
      ? `\n\n${Object.entries(answers)
          .map(([k, v]) => `${ANSWER_LABELS[k] ?? k}: ${v}`)
          .join("\n")}`
      : "";
  const text = `Telefon: ${telefonDisplay}\n\n${mesaj}${answerBlock}`;

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
        subject: "Ekiz Yazılım — ana sayfa talebi",
        text,
      }),
    });

    if (!res.ok) {
      return { ok: false as const };
    }
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
        phone: telefonDisplay,
        message: mesaj,
        _subject: "Ekiz Yazılım — ana sayfa talebi",
      }),
    });
    if (!res.ok) return { ok: false as const };
    return { ok: true as const };
  }

  return { ok: true as const, skipped: true as const };
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const mesaj = body.mesaj?.trim() ?? "";
  const step = body.step ?? "classify";

  if (!mesaj) {
    return NextResponse.json({ error: "Mesaj gerekli." }, { status: 400 });
  }

  if (mesaj.length > 500) {
    return NextResponse.json(
      { error: "Mesaj çok uzun. Lütfen kısaltın." },
      { status: 400 },
    );
  }

  const verdict = classifyIntake(mesaj);
  if (!verdict.isProblem) {
    return NextResponse.json({
      ok: false,
      isProblem: false,
      reason: verdict.reason,
    });
  }

  if (step === "classify") {
    return NextResponse.json({ ok: true, isProblem: true });
  }

  const phone = normalizePhone(body.telefon?.trim() ?? "");
  if (!phone.ok) {
    return NextResponse.json({ error: phone.reason }, { status: 400 });
  }

  const mailed = await sendIntakeEmail(mesaj, phone.display, body.answers);
  if (!mailed.ok) {
    return NextResponse.json(
      { error: "Gönderilemedi. Lütfen iletişim formundan yazın." },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    isProblem: true,
  });
}
