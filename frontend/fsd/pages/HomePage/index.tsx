import Link from "next/link";
import {
  Shield,
  ArrowRight,
  Zap,
  Brain,
  Lock,
  BarChart3,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Detection",
    description:
      "Advanced machine learning algorithms trained on millions of fraud patterns to identify scams in real-time.",
  },
  {
    icon: Zap,
    title: "Instant Analysis",
    description:
      "Get immediate threat assessment of suspicious UPI and SMS messages with detailed risk breakdowns.",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "Your messages are analyzed locally and never stored. Complete privacy with zero data retention.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Comprehensive fraud analytics with visual charts, trends, and insights into emerging scam patterns.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center px-6 pb-20 pt-24 text-center">
        {/* Glow effect */}
        <div className="pointer-events-none absolute top-0 left-1/2 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-[#3b82f6]/5 blur-3xl" />

        <div className="relative">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3b82f6]/20 bg-[#3b82f6]/10 px-4 py-1.5 text-xs font-semibold text-[#3b82f6]">
            <Shield className="h-3.5 w-3.5" />
            AI-Powered Fraud Prevention
          </span>

          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl">
            Detect UPI &amp; SMS Scams{" "}
            <span className="text-[#3b82f6]">Before They Strike</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            SecurePay AI uses cutting-edge artificial intelligence to analyze suspicious
            messages, detect fraud patterns, and protect you from financial scams in
            real-time.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/analyze"
              className="inline-flex items-center gap-2 rounded-lg bg-[#3b82f6] px-6 py-3 text-sm font-semibold text-[#ffffff] transition-opacity hover:opacity-90"
            >
              Analyze Message
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-border"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="border-y border-border bg-card/50 px-6 py-12">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { value: "99.2%", label: "Detection Accuracy" },
            { value: "50M+", label: "Messages Analyzed" },
            { value: "<100ms", label: "Analysis Time" },
            { value: "89%", label: "Fraud Prevented" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-[#3b82f6] md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 text-center">
          <h2 className="text-balance text-3xl font-bold text-foreground">
            Why SecurePay AI?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-pretty text-muted-foreground">
            Built with state-of-the-art technology to keep your finances secure.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-[#3b82f6]/30"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-[#3b82f6]/10">
                  <Icon className="h-5 w-5 text-[#3b82f6]" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-card/50 px-6 py-20 text-center">
        <h2 className="text-balance text-3xl font-bold text-foreground">
          Ready to Secure Your Transactions?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-pretty text-muted-foreground">
          Start analyzing suspicious messages now and protect yourself from financial
          fraud.
        </p>
        <Link
          href="/analyze"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#3b82f6] px-8 py-3 text-sm font-semibold text-[#ffffff] transition-opacity hover:opacity-90"
        >
          Get Started Free
          <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </div>
  );
}
