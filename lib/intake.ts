/**
 * Hero intake classifier.
 * Replace `classifyIntake` body with Gemini later — keep this signature.
 */

export type IntakeClass =
  | { isProblem: true }
  | { isProblem: false; reason: string };

/** Normalize TR mobiles to +90 … display / E.164 digits. */
export function normalizePhone(raw: string): {
  ok: true;
  digits: string;
  display: string;
} | { ok: false; reason: string } {
  const digits = raw.replace(/\D/g, "");
  let national = digits;

  if (national.startsWith("90") && national.length === 12) {
    national = national.slice(2);
  } else if (national.startsWith("0") && national.length === 11) {
    national = national.slice(1);
  }

  // TR mobile: 5XXXXXXXXX
  if (!/^5\d{9}$/.test(national)) {
    return {
      ok: false,
      reason: "Geçerli bir cep telefonu girin (ör. 05XX XXX XX XX).",
    };
  }

  const e164 = `90${national}`;
  const display = `+90 ${national.slice(0, 3)} ${national.slice(3, 6)} ${national.slice(6, 8)} ${national.slice(8)}`;
  return { ok: true, digits: e164, display };
}

/** Temporarily always accepts — re-enable checks when Gemini is wired. */
export function classifyIntake(_raw: string): IntakeClass {
  return { isProblem: true };
}
