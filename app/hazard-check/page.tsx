"use client";
import { useState } from "react";
import { CardShell } from "@/components/CardShell";
import type { HazardResult } from "@/lib/types";

export default function HazardCheckPage() {
  const [result, setResult] = useState<HazardResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setResult(null);
    const res = await fetch("/api/hazard-check", { method: "POST", body: formData });
    const data = await res.json();
    setLoading(false);
    if (data.result) setResult(data.result);
    else alert(data.error ?? "解析に失敗しました。");
  }

  return (
    <main className="mx-auto max-w-4xl space-y-4 px-4 py-8">
      <CardShell>
        <h2 className="text-2xl font-bold">危険物チェック</h2>
        <p className="mt-2 rounded-lg bg-peaches p-3 text-sm">
          園児の顔、名札、個人情報が写らない写真を使用してください。本機能は一次スクリーニング支援であり、安全性を断定するものではありません。
        </p>
        <form action={handleSubmit} className="mt-4 space-y-3">
          <input required type="file" name="image" accept="image/*" className="w-full rounded-lg border p-2" />
          <input name="roomName" placeholder="部屋名（例：2歳児クラス）" className="w-full rounded-lg border p-2" />
          <textarea name="memo" placeholder="補足メモ" className="w-full rounded-lg border p-2" rows={3} />
          <button className="rounded-xl bg-orange-300 px-5 py-2 font-semibold hover:opacity-80" disabled={loading}>
            {loading ? "解析中..." : "解析開始"}
          </button>
        </form>
      </CardShell>

      {result && (
        <>
          <CardShell>
            <h3 className="font-bold">総合コメント</h3>
            <p className="mt-2">{result.summary}</p>
          </CardShell>

          {result.items.map((item, idx) => (
            <CardShell key={idx}>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-lg font-semibold">{item.title}</h4>
                <span className="rounded-full bg-sky-100 px-3 py-1 text-xs">危険度：{item.riskLevel}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {item.riskTypes.map((tag) => (
                  <span key={tag} className="rounded bg-mintsoft px-2 py-1 text-xs">{tag}</span>
                ))}
              </div>
              <p className="mt-3 text-sm">根拠: {item.visibleReason}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 text-sm">
                <div>
                  <p className="font-semibold">確認ポイント</p>
                  <ul className="list-disc pl-5">{item.checkPoints.map((c) => <li key={c}>{c}</li>)}</ul>
                </div>
                <div>
                  <p className="font-semibold">推奨アクション</p>
                  <ul className="list-disc pl-5">{item.actions.map((a) => <li key={a}>{a}</li>)}</ul>
                </div>
              </div>
              <p className="mt-3 text-sm">専門家確認メモ: {item.expertCheck}</p>
            </CardShell>
          ))}

          <CardShell>
            <p className="text-xs text-slate-600">{result.disclaimer}</p>
          </CardShell>
        </>
      )}
    </main>
  );
}
