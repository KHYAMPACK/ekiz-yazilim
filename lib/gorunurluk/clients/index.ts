import { fmxAudit } from "@/lib/gorunurluk/clients/fmx";
import { sahikaOncuMiniklerAudit } from "@/lib/gorunurluk/clients/sahika-oncu-minikler";
import { templateAudit } from "@/lib/gorunurluk/clients/sablon";
import type { ClientAudit } from "@/lib/gorunurluk/types";

/**
 * Kayıtlı müşteri raporları.
 * Yeni işletme: dosya ekle → buraya yaz → /raporlar/[id]
 */
export const clients: Record<string, ClientAudit> = {
  fmx: fmxAudit,
  "sahika-oncu-minikler": sahikaOncuMiniklerAudit,
  sablon: templateAudit,
};

export function getClient(id: string): ClientAudit | null {
  return clients[id] ?? null;
}

export function listClientIds(): string[] {
  return Object.keys(clients);
}
