import { FileWarning, ShieldCheck, BarChart3, TrendingUp } from "lucide-react";
import type { CaseStatsData } from "../../shared/types";

interface CaseStatsProps {
  data: CaseStatsData;
}

const statConfigs = [
  {
    key: "totalCases" as const,
    label: "Total Cases",
    icon: BarChart3,
    format: (v: number) => v.toLocaleString(),
    color: "#3b82f6",
  },
  {
    key: "totalScamCases" as const,
    label: "Total Scam Cases",
    icon: FileWarning,
    format: (v: number) => v.toLocaleString(),
    color: "#ef4444",
  },
  {
    key: "averageRiskScore" as const,
    label: "Avg Risk Score",
    icon: TrendingUp,
    format: (v: number) => `${v}%`,
    color: "#f59e0b",
  },
  {
    key: "preventionRate" as const,
    label: "Prevention Rate",
    icon: ShieldCheck,
    format: (v: number) => `${v}%`,
    color: "#22c55e",
  },
];

export function CaseStats({ data }: CaseStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {statConfigs.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.key}
            className="rounded-xl border border-border bg-card p-5 transition-colors hover:border-[#3b82f6]/30"
          >
            <div className="mb-3 flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <Icon className="h-5 w-5" style={{ color: stat.color }} />
              </div>
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {stat.format(data[stat.key])}
            </p>
          </div>
        );
      })}
    </div>
  );
}
