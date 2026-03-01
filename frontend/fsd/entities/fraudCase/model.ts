import type {
  FraudCase,
  ScamTypeDistribution,
  RiskCategoryDistribution,
  CaseStatsData,
  FraudTrend,
} from "../../shared/types";

export const fraudCasesOverMonths: FraudCase[] = [
  { id: "1", month: "Jan", cases: 120, scamCases: 45 },
  { id: "2", month: "Feb", cases: 150, scamCases: 62 },
  { id: "3", month: "Mar", cases: 180, scamCases: 78 },
  { id: "4", month: "Apr", cases: 210, scamCases: 95 },
  { id: "5", month: "May", cases: 195, scamCases: 88 },
  { id: "6", month: "Jun", cases: 240, scamCases: 110 },
  { id: "7", month: "Jul", cases: 280, scamCases: 132 },
  { id: "8", month: "Aug", cases: 260, scamCases: 120 },
  { id: "9", month: "Sep", cases: 310, scamCases: 148 },
  { id: "10", month: "Oct", cases: 290, scamCases: 135 },
  { id: "11", month: "Nov", cases: 340, scamCases: 162 },
  { id: "12", month: "Dec", cases: 380, scamCases: 185 },
];

export const scamTypeDistribution: ScamTypeDistribution[] = [
  { type: "UPI Fraud", count: 420 },
  { type: "SMS Phishing", count: 310 },
  { type: "Fake Bank Alert", count: 280 },
  { type: "Phishing Link", count: 190 },
];

export const riskCategoryDistribution: RiskCategoryDistribution[] = [
  { category: "Safe", count: 1840 },
  { category: "Caution", count: 720 },
  { category: "Scam", count: 1360 },
];

export const caseStats: CaseStatsData = {
  totalCases: 3920,
  totalScamCases: 1360,
  averageRiskScore: 64,
  preventionRate: 89.2,
};

export const fraudTrends: FraudTrend[] = [
  {
    title: "UPI Fraud Surge",
    description: "UPI fraud increased by 22% this month compared to last month",
    change: 22,
    direction: "up",
  },
  {
    title: "SMS Phishing Decline",
    description: "SMS phishing attempts decreased by 8% due to improved filters",
    change: 8,
    direction: "down",
  },
  {
    title: "Urgent Payment Requests",
    description:
      "High-risk messages mostly contain urgent payment requests and fake deadlines",
    change: 15,
    direction: "up",
  },
  {
    title: "Fake Bank Alerts Rising",
    description:
      "Fake bank alert scams increased by 18% targeting mobile banking users",
    change: 18,
    direction: "up",
  },
];
