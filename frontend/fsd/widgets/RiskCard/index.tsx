"use client";

import { useEffect, useState } from "react";
import type { RiskStatus } from "../../shared/types";
import { getRiskColor, getRiskBgClass } from "../../shared/lib/utils";
import { AlertTriangle, CheckCircle, ShieldAlert } from "lucide-react";

interface RiskCardProps {
  riskScore: number;
  status: RiskStatus;
  reasons: string[];
}

function CircularProgress({ score, status }: { score: number; status: RiskStatus }) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const color = getRiskColor(status);
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedScore / 100) * circumference;

  useEffect(() => {
    let frame: number;
    let current = 0;
    const step = () => {
      current += 1;
      if (current <= score) {
        setAnimatedScore(current);
        frame = requestAnimationFrame(step);
      }
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  return (
    <div className="relative flex items-center justify-center">
      <svg width="160" height="160" className="-rotate-90">
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="#1e293b"
          strokeWidth="10"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-300"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-bold text-foreground">{animatedScore}</span>
        <span className="text-xs text-muted-foreground">Risk Score</span>
      </div>
    </div>
  );
}

function StatusIcon({ status }: { status: RiskStatus }) {
  switch (status) {
    case "Safe":
      return <CheckCircle className="h-5 w-5" />;
    case "Caution":
      return <AlertTriangle className="h-5 w-5" />;
    case "Scam":
      return <ShieldAlert className="h-5 w-5" />;
  }
}

export function RiskCard({ riskScore, status, reasons }: RiskCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        <CircularProgress score={riskScore} status={status} />

        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-semibold ${getRiskBgClass(status)}`}
            >
              <StatusIcon status={status} />
              {status}
            </span>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Detection Reasons
            </h3>
            <ul className="space-y-2">
              {reasons.map((reason, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: getRiskColor(status) }}
                  />
                  {reason}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
