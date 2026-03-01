"use client";

import { useState } from "react";
import { simulateAnalysis } from "../../../entities/riskScore/model";
import type { AnalysisResult } from "../../../shared/types";
import { RiskCard } from "../../../widgets/RiskCard";
import { Loader2, Search, ShieldAlert } from "lucide-react";

export function AnalyzeMessageForm() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    if (!message.trim()) return;
    setLoading(true);
    setResult(null);
    const analysis = await simulateAnalysis(message);
    setResult(analysis);
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card p-6">
        <div className="mb-4 flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-[#3b82f6]" />
          <h2 className="text-lg font-semibold text-foreground">
            Message Analysis
          </h2>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          Paste a suspicious SMS or UPI message below and our AI engine will analyze it
          for potential scam indicators.
        </p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Paste your suspicious SMS or UPI message here..."
          className="w-full resize-none rounded-lg border border-border bg-[#0a0e1a] px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-[#3b82f6] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]"
          rows={5}
        />
        <button
          onClick={handleAnalyze}
          disabled={loading || !message.trim()}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#3b82f6] px-6 py-2.5 text-sm font-semibold text-[#ffffff] transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Search className="h-4 w-4" />
              Analyze Message
            </>
          )}
        </button>
      </div>

      {result && <RiskCard riskScore={result.riskScore} status={result.status} reasons={result.reasons} />}
    </div>
  );
}
