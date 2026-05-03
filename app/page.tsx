import Link from "next/link";
import { CardShell } from "@/components/CardShell";

const buttons = [
  { label: "危険物チェック", href: "/hazard-check" },
  { label: "避難訓練シナリオ", href: "/scenario" },
  { label: "保護者連絡文", href: "/guardian-message" }
];

export default function Home() {
  return (
    <main className="mx-auto min-h-screen max-w-3xl px-4 py-10">
      <CardShell>
        <h1 className="text-3xl font-bold text-slate-800">まもりあそび for 園</h1>
        <p className="mt-3 text-lg">先生の安全点検・訓練準備・保護者連絡を、やさしくサポート</p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {buttons.map((btn) => (
            <Link
              key={btn.href}
              href={btn.href}
              className="rounded-xl bg-mintsoft p-4 text-center font-semibold transition hover:opacity-80"
            >
              {btn.label}
            </Link>
          ))}
        </div>
      </CardShell>
    </main>
  );
}
