import { TrendingUp, TrendingDown } from "lucide-react";
import type { FraudTrend } from "../../shared/types";

interface FraudTrendsProps {
  trends: FraudTrend[];
}

export function FraudTrends({ trends }: FraudTrendsProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="mb-4 text-base font-semibold text-foreground">
        Fraud Trends Analysis
      </h3>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {trends.map((trend, i) => (
          <div
            key={i}
            className="rounded-lg border border-border bg-[#0a0e1a] p-4 transition-colors hover:border-[#3b82f6]/30"
          >
            <div className="mb-2 flex items-center justify-between">
              <h4 className="text-sm font-semibold text-foreground">{trend.title}</h4>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  trend.direction === "up"
                    ? "bg-red-500/10 text-red-400"
                    : "bg-emerald-500/10 text-emerald-400"
                }`}
              >
                {trend.direction === "up" ? (
                  <TrendingUp className="h-3.5 w-3.5" />
                ) : (
                  <TrendingDown className="h-3.5 w-3.5" />
                )}
                {trend.change}%
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {trend.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
