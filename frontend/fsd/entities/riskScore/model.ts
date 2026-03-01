import type { AnalysisResult } from "../../shared/types";

export function simulateAnalysis(message: string): Promise<AnalysisResult> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowerMessage = message.toLowerCase();
      const hasSuspiciousLink =
        lowerMessage.includes("http") ||
        lowerMessage.includes("click here") ||
        lowerMessage.includes("link");
      const hasUrgency =
        lowerMessage.includes("urgent") ||
        lowerMessage.includes("immediately") ||
        lowerMessage.includes("now") ||
        lowerMessage.includes("expire");
      const hasFinancial =
        lowerMessage.includes("upi") ||
        lowerMessage.includes("bank") ||
        lowerMessage.includes("payment") ||
        lowerMessage.includes("transfer") ||
        lowerMessage.includes("otp");
      const hasUnknownSender =
        lowerMessage.includes("unknown") ||
        lowerMessage.includes("+91") ||
        lowerMessage.length > 50;

      const reasons: string[] = [];
      let score = 15;

      if (hasSuspiciousLink) {
        reasons.push("Suspicious link detected");
        score += 25;
      }
      if (hasUrgency) {
        reasons.push("Urgency keywords found");
        score += 20;
      }
      if (hasFinancial) {
        reasons.push("Financial terms detected");
        score += 22;
      }
      if (hasUnknownSender) {
        reasons.push("Unknown sender pattern");
        score += 15;
      }

      if (reasons.length === 0) {
        reasons.push("No suspicious patterns found");
      }

      score = Math.min(score, 98);

      let status: AnalysisResult["status"];
      if (score >= 70) status = "Scam";
      else if (score >= 40) status = "Caution";
      else status = "Safe";

      resolve({ riskScore: score, status, reasons });
    }, 1500);
  });
}
