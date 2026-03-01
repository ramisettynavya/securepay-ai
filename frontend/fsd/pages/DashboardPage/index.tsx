"use client";

import { CaseStats } from "../../widgets/CaseStats";
import { FraudLineChart, ScamBarChart, RiskPieChart } from "../../widgets/FraudChart";
import { FraudTrends } from "../../widgets/FraudTrends";
import {
  fraudCasesOverMonths,
  scamTypeDistribution,
  riskCategoryDistribution,
  caseStats,
  fraudTrends,
} from "../../entities/fraudCase/model";
import { BarChart3 } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-[#3b82f6]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#3b82f6]">
            Analytics
          </span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Fraud Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          Comprehensive fraud analytics and insights from our detection engine.
        </p>
      </div>

      <div className="space-y-6">
        <CaseStats data={caseStats} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <FraudLineChart data={fraudCasesOverMonths} />
          <ScamBarChart data={scamTypeDistribution} />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <RiskPieChart data={riskCategoryDistribution} />
          <FraudTrends trends={fraudTrends} />
        </div>
      </div>
    </div>
  );
}
