# まもりあそび for 園 (MVP)

保育園・幼稚園の先生向けの減災AIチャットボットMVPです。

## 技術構成
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- OpenAI Responses API
- Vercelデプロイ想定

## セットアップ
1. 依存関係のインストール
```bash
npm install
```
2. 環境変数設定
```bash
cp .env.example .env.local
```
`.env.local` に `OPENAI_API_KEY` を設定

3. 起動
```bash
npm run dev
```

## 主な機能
- トップ画面（3メニュー）
- 危険物チェック（画像アップロード + OpenAI解析）
- 避難訓練シナリオ生成
- 保護者連絡文テンプレート生成（コピー機能）

## API仕様（危険物チェック）
`POST /api/hazard-check` に multipart/form-data を送信。
- image: 必須
- roomName: 任意
- memo: 任意

返却はJSON:
- summary
- items
- disclaimer

## Supabase追加用TODO
- [ ] 画像を Supabase Storage に保存
- [ ] 解析結果JSONを Supabase DB に保存
- [ ] 園ごとの履歴一覧・検索機能
- [ ] 認証（園アカウント）
- [ ] 保護者連絡文の履歴保存と再編集

## Vercelデプロイ
- Vercelプロジェクト作成
- 環境変数 `OPENAI_API_KEY` を設定
- main ブランチ連携でデプロイ
