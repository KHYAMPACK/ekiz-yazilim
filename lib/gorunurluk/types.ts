export type Severity = "critical" | "high" | "medium" | "low" | "ok";

export type ChecklistItem = {
  id: string;
  label: string;
  done: boolean;
  note?: string;
};

export type Finding = {
  id: string;
  title: string;
  severity: Severity;
  summary: string;
  recommendation: string;
  /** Kaynak / gözlem notları — raporu teknik hissettirir */
  evidence?: string[];
};

export type AuditCategory = {
  id: string;
  title: string;
  score: number;
  blurb: string;
  /** 80 vs 40 ne demek — tutarlı el puanı için */
  rubric?: string;
  findings: Finding[];
  checklist: ChecklistItem[];
};

export type AuditRoadmapItem = {
  phase: string;
  title: string;
  items: string[];
};

export type ClientAudit = {
  /** Kısa kimlik — dosya adı ile aynı tutun (örn. fmx) */
  id: string;
  meta: {
    preparedBy: string;
    preparedFor: string;
    businessType: string;
    date: string;
    websiteUrl: string;
    language: string;
    contactName?: string;
    phone?: string;
    email?: string;
    city?: string;
  };
  executive: {
    headline: string;
    summary: string;
    overallScore: number;
    topPriorities: string[];
  };
  categories: AuditCategory[];
  roadmap: AuditRoadmapItem[];
};

export function scoreLabel(score: number): string {
  if (score >= 80) return "Güçlü";
  if (score >= 60) return "Orta";
  if (score >= 40) return "Zayıf";
  return "Kritik";
}

export function severityLabel(severity: Severity): string {
  switch (severity) {
    case "critical":
      return "Kritik";
    case "high":
      return "Yüksek";
    case "medium":
      return "Orta";
    case "low":
      return "Düşük";
    case "ok":
      return "Tamam";
  }
}
