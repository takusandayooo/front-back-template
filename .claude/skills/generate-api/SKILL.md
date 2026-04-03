---
name: generate-api
description: バックエンドのスキーマ変更後にOpenAPI仕様書を生成し、orvalでフロントエンドのAPIクライアントを再生成する。ルート追加・スキーマ変更のたびに実行する。
disable-model-invocation: true
allowed-tools: Bash(bun run *), Bash(cd *), Bash(git diff *)
---

# APIクライアント再生成スキル

バックエンドのスキーマ変更をフロントエンドに反映します。

## 実行手順

### 1. OpenAPI仕様書の生成 + orvalでAPIクライアント生成
```bash
bun run generate:api
```

このコマンドで以下が順番に実行されます：
1. `common/generate/generate-openapi.ts` → `common/openapi.json` を生成
2. `orval` → `frontend/src/api/` にAPIクライアント（Tanstack Query hooks）を生成

### 2. 差分を確認
```bash
git diff frontend/src/api/
```

追加されたhooks・変更された型を確認して、フロントエンドへの影響を把握する。

### 3. フロントエンドの型エラーを確認
```bash
bun run check
```

スキーマ変更によって既存のフロントエンドコードに型エラーが発生していないか確認する。

## 生成されるもの

| ファイル | 内容 |
|---|---|
| `common/openapi.json` | バックエンドのOpenAPI仕様書 |
| `frontend/src/api/generated.ts` | 型定義・APIクライアント |
| `frontend/src/api/generated.msw.ts` | MSWモック（設定している場合） |

## よくある問題

**`bun run generate:api` でエラーが出る**
→ バックエンドの開発サーバーが起動していない場合がある。`cd backend && bun run dev` を先に起動してから実行する（スキーマをサーバー経由で取得している場合）。

**生成後に `frontend/src/api/` で型エラーが出る**
→ レスポンス型が変わった場合、該当のコンポーネントを修正する。`git diff frontend/src/api/` で何が変わったかを確認してから対応する。

**差分がない**
→ バックエンドのスキーマが変更されていない、または既に最新の状態。問題なし。

## 注意
`frontend/src/api/` 配下のファイルは **直接編集しない**。次回 `generate:api` を実行すると上書きされる。
