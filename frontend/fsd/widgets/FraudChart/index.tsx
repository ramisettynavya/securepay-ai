"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type {
  FraudCase,
  ScamTypeDistribution,
  RiskCategoryDistribution,
} from "../../shared/types";

const PIE_COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

interface FraudLineChartProps {
  data: FraudCase[];
}

export function FraudLineChart({ data }: FraudLineChartProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="mb-4 text-base font-semibold text-foreground">
        Fraud Cases Over Months
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} />
          <YAxis stroke="#94a3b8" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "1px solid #1e293b",
              borderRadius: "8px",
              color: "#e8ecf4",
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="cases"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: "#3b82f6", r: 4 }}
            name="Total Cases"
          />
          <Line
            type="monotone"
            dataKey="scamCases"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ fill: "#ef4444", r: 4 }}
            name="Scam Cases"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

interface ScamBarChartProps {
  data: ScamTypeDistribution[];
}

export function ScamBarChart({ data }: ScamBarChartProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="mb-4 text-base font-semibold text-foreground">
        Scam Type Distribution
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
          <XAxis dataKey="type" stroke="#94a3b8" fontSize={11} />
          <YAxis stroke="#94a3b8" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "1px solid #1e293b",
              borderRadius: "8px",
              color: "#e8ecf4",
            }}
          />
          <Bar dataKey="count" radius={[6, 6, 0, 0]} name="Cases">
            <Cell fill="#3b82f6" />
            <Cell fill="#ef4444" />
            <Cell fill="#f59e0b" />
            <Cell fill="#8b5cf6" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

interface RiskPieChartProps {
  data: RiskCategoryDistribution[];
}

export function RiskPieChart({ data }: RiskPieChartProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="mb-4 text-base font-semibold text-foreground">
        Risk Category Distribution
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={55}
            strokeWidth={0}
            label={({ category, percent }) =>
              `${category} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#111827",
              border: "1px solid #1e293b",
              borderRadius: "8px",
              color: "#e8ecf4",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
