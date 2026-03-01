export type RiskStatus = "Safe" | "Caution" | "Scam";

export interface AnalysisResult {
  riskScore: number;
  status: RiskStatus;
  reasons: string[];
}

export interface FraudCase {
  id: string;
  month: string;
  cases: number;
  scamCases: number;
}

export interface ScamTypeDistribution {
  type: string;
  count: number;
}

export interface RiskCategoryDistribution {
  category: RiskStatus;
  count: number;
}

export interface CaseStatsData {
  totalCases: number;
  totalScamCases: number;
  averageRiskScore: number;
  preventionRate: number;
}

export interface FraudTrend {
  title: string;
  description: string;
  change: number;
  direction: "up" | "down";
}
