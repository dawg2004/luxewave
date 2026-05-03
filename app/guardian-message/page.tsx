"use client";
import { useState } from "react";
import { CardShell } from "@/components/CardShell";

const templates: Record<string, string> = {
  "避難訓練報告": "本日、避難訓練を実施しました。園児は先生の誘導で落ち着いて行動できました。ご家庭でも避難時の声かけをご確認ください。",
  "台風接近時のお知らせ": "台風接近に伴い、最新気象情報を確認しながら安全を最優先に対応します。登降園対応は園からの連絡をご確認ください。",
  "地震発生後の安否連絡": "先ほどの地震後、園児と職員の安全を確認しました。施設点検を行い、必要な続報は順次お知らせします。",
  "引き渡し訓練案内": "引き渡し訓練を実施します。連絡手順と引き取り者情報の再確認にご協力をお願いします。"
};

export default function GuardianMessagePage() {
  const [selected, setSelected] = useState(Object.keys(templates)[0]);
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 space-y-4">
      <CardShell>
        <h2 className="text-2xl font-bold">保護者連絡文生成</h2>
        <select value={selected} onChange={(e)=>setSelected(e.target.value)} className="mt-4 w-full rounded border p-2">
          {Object.keys(templates).map((k) => <option key={k}>{k}</option>)}
        </select>
      </CardShell>
      <CardShell>
        <p className="text-sm">{templates[selected]}</p>
        <button onClick={()=>navigator.clipboard.writeText(templates[selected])} className="mt-3 rounded bg-mintsoft px-3 py-2 text-sm font-semibold">コピー</button>
      </CardShell>
    </main>
  );
}
