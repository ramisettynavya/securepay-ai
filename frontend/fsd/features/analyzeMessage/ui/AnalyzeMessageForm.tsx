"use client";

import { useState } from "react";
import type { AnalysisResult } from "../../../shared/types";
import { RiskCard } from "../../../widgets/RiskCard";
import { Loader2, Search, ShieldAlert, Image as ImageIcon } from "lucide-react";

export function AnalyzeMessageForm() {

const [message, setMessage] = useState("");
const [result, setResult] = useState<AnalysisResult | null>(null);
const [loading, setLoading] = useState(false);
const [image, setImage] = useState<File | null>(null);
const [ocrText, setOcrText] = useState<string>("");

// TEXT ANALYSIS
async function handleAnalyze() {


if (!message.trim()) return;

setLoading(true);
setResult(null);
setOcrText("");

try {

  const res = await fetch(
    "https://securepay-backend-urpg.onrender.com/analyze",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: message })
    }
  );

  const data = await res.json();

  setResult({
    riskScore: data.riskScore,
    status: data.status,
    reasons: ["AI model prediction"]
  });

} catch (err) {
  console.log(err);
}

setLoading(false);


}

// IMAGE ANALYSIS
async function handleImageAnalyze() {


if (!image) return;

setLoading(true);
setResult(null);

const formData = new FormData();
formData.append("file", image);

try {

  const res = await fetch(
    "https://securepay-backend-urpg.onrender.com/analyze-image",
    {
      method: "POST",
      body: formData
    }
  );

  const data = await res.json();

  setResult({
    riskScore: data.riskScore,
    status: data.status,
    reasons: ["OCR + AI model prediction"]
  });

  setOcrText(data.extracted_text || "");

} catch (err) {
  console.log(err);
}

setLoading(false);


}

return ( <div className="space-y-6">

```
  <div className="rounded-xl border border-border bg-card p-6">

    <div className="mb-4 flex items-center gap-2">
      <ShieldAlert className="h-5 w-5 text-[#3b82f6]" />
      <h2 className="text-lg font-semibold text-foreground">
        Message Analysis
      </h2>
    </div>

    <p className="mb-4 text-sm text-muted-foreground">
      Paste a suspicious SMS or upload a screenshot to detect scams.
    </p>

    {/* TEXT INPUT */}

    <textarea
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Paste suspicious SMS or UPI message..."
      className="w-full rounded-lg border border-border bg-[#0a0e1a] px-4 py-3 text-sm text-foreground"
      rows={5}
    />

    <button
      onClick={handleAnalyze}
      disabled={loading || !message.trim()}
      className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white"
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

    {/* IMAGE UPLOAD */}

    <div className="mt-6">

      <label className="text-sm font-medium">
        Upload Screenshot
      </label>

      <div className="mt-2 rounded-lg border border-green-500 bg-[#0a0e1a] p-3">

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

      </div>

      <button
        onClick={handleImageAnalyze}
        disabled={loading || !image}
        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-2 text-white"
      >
        <ImageIcon className="h-4 w-4" />
        Analyze Screenshot
      </button>

    </div>

  </div>

  {/* RESULT */}

  {result && (
    <RiskCard
      riskScore={result.riskScore}
      status={result.status}
      reasons={result.reasons}
    />
  )}

  {/* OCR TEXT */}

  {ocrText && (
    <div className="text-xs text-muted-foreground">
      <strong>Extracted Text:</strong>
      <p className="mt-1 whitespace-pre-line">{ocrText}</p>
    </div>
  )}

</div>


);
}
