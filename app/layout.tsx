import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "まもりあそび for 園",
  description: "先生の安全点検・訓練準備・保護者連絡を、やさしくサポート"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
