import { AnalyzeMessageForm } from "../../features/analyzeMessage/ui/AnalyzeMessageForm";
import { Shield } from "lucide-react";

export default function AnalyzePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <Shield className="h-5 w-5 text-[#3b82f6]" />
          <span className="text-xs font-semibold uppercase tracking-wider text-[#3b82f6]">
            Scam Detection Engine
          </span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Analyze a Message</h1>
        <p className="mt-2 text-muted-foreground">
          Paste any suspicious UPI or SMS message to check for fraud indicators using our
          AI-powered detection engine.
        </p>
      </div>

      <AnalyzeMessageForm />

      <div className="mt-8 rounded-xl border border-border bg-card p-5">
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          Sample Messages to Try
        </h3>
        <div className="space-y-2">
          {[
            "URGENT: Your UPI account has been compromised. Click here immediately to verify: http://fake-bank.com/verify",
            "Your bank OTP is 482910. Do not share with anyone.",
            "Congratulations! You won Rs.50,000. Transfer Rs.500 processing fee via UPI to claim now. Offer expires immediately!",
          ].map((sample, i) => (
            <p
              key={i}
              className="rounded-lg border border-border bg-[#0a0e1a] px-4 py-2.5 text-xs leading-relaxed text-muted-foreground"
            >
              {sample}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
