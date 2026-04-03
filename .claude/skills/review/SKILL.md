---
name: review
description: 直近の変更をコードレビューする。コミット前やPR作成前に呼び出す。
disable-model-invocation: true
context: fork
agent: code-reviewer
---

直近の変更をレビューしてください。

`git diff HEAD` で変更内容を確認し、以下の観点でレビューしてください：

1. **Cloudflare Workers 互換性** - Node.js ネイティブAPI使用、Edge Runtime 非対応ライブラリ
2. **Zod OpenAPI スキーマ** - `createRoute` の使用・`.openapi()` の記述・フロントとの型一致
3. **orval 生成コード** - `frontend/src/api/` を手動編集していないか・再生成漏れがないか
4. **型安全性** - `as any` の乱用、Tanstack QueryのqueryKeyの管理
5. **セキュリティ** - 認証漏れ、APIキーのハードコード、CORS設定

レビュー結果は 🔴 Critical / 🟡 Warning / 🟢 Suggestion の優先度で分類して日本語で報告してください。
