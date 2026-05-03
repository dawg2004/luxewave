"use client";
import { useState } from "react";
import { CardShell } from "@/components/CardShell";

export default function ScenarioPage() {
  const [result, setResult] = useState<string>("");
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <CardShell>
        <h2 className="text-2xl font-bold">避難訓練シナリオ生成</h2>
        <form
          className="mt-4 grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const age = fd.get("age");
            const children = fd.get("children");
            const teachers = fd.get("teachers");
            const disaster = fd.get("disaster");
            const place = fd.get("place");
            const time = fd.get("time");
            setResult(`訓練テーマ: ${disaster}時の落ち着いた一次避難\n\n先生の役割分担: リーダー1名、点呼担当1名、誘導担当${Math.max(Number(teachers)-2,1)}名\n\n園児への声かけ: 「先生の近くで、ゆっくり移動しようね」\n\n訓練の流れ:\n1) 合図\n2) ${age}クラス(${children}名)を整列\n3) ${place}へ移動\n4) 点呼\n\n注意点: 午睡・食事中など${time}に合わせた動線確認\n\n振り返り項目: 移動時間、声かけの明瞭さ、取り残し防止\n\n保護者向け報告文: 本日、${disaster}を想定し、${place}への避難訓練を実施しました。`);
          }}
        >
          <input name="age" placeholder="年齢クラス" className="rounded border p-2" required />
          <input name="children" placeholder="園児数" className="rounded border p-2" required />
          <input name="teachers" placeholder="先生人数" className="rounded border p-2" required />
          <input name="disaster" placeholder="災害種別" className="rounded border p-2" required />
          <input name="place" placeholder="避難場所" className="rounded border p-2" required />
          <input name="time" placeholder="訓練時間" className="rounded border p-2" required />
          <button className="rounded-xl bg-orange-300 px-4 py-2 font-semibold">生成</button>
        </form>
      </CardShell>
      {result && <CardShell><pre className="whitespace-pre-wrap text-sm">{result}</pre></CardShell>}
    </main>
  );
}
