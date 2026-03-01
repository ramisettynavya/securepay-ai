import type { RiskStatus } from "../types";

export function getRiskColor(status: RiskStatus): string {
  switch (status) {
    case "Safe":
      return "#22c55e";
    case "Caution":
      return "#f59e0b";
    case "Scam":
      return "#ef4444";
    default:
      return "#94a3b8";
  }
}

export function getRiskBgClass(status: RiskStatus): string {
  switch (status) {
    case "Safe":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
    case "Caution":
      return "bg-amber-500/10 text-amber-400 border-amber-500/20";
    case "Scam":
      return "bg-red-500/10 text-red-400 border-red-500/20";
    default:
      return "bg-slate-500/10 text-slate-400 border-slate-500/20";
  }
}
