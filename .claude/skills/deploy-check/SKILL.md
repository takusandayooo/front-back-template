---
name: deploy-check
description: Cloudflare Workers へのデプロイ前チェックリストを実行する。デプロイ前に必ず実行すること。
disable-model-invocation: true
allowed-tools: Bash(bun run *), Bash(cd *), Bash(git *)
---

# デプロイ前チェックスキル

Cloudflare Workers へのデプロイ前に以下のチェックを順番に実行してください：

## チェックリスト

### 1. コードの品質チェック
```bash
bun run check
```
エラーがある場合は `bun run format` で自動修正してから再確認。

### 2. APIクライアントの整合性確認
```bash
bun run generate:api
```
バックエンドのスキーマ変更がフロントエンドの生成ファイルに反映されているか確認。
生成後に `git diff frontend/src/api/` で差分がないことを確認（差分がある場合はコミット漏れ）。

### 3. バックエンドビルドチェック
```bash
cd backend && bun run build
```
Cloudflare Workers 向けのビルドが通ることを確認。

### 4. フロントエンドビルドチェック
```bash
cd frontend && bun run build
```
型エラー・ビルドエラーがないことを確認。

### 5. Git の状態確認
```bash
git status
git log --oneline -5
```
- 未コミットの変更がないか確認
- `generate:api` の生成ファイルもコミットされているか確認

## チェック結果の報告

以下の形式で結果を報告してください：

```
## デプロイ前チェック結果

✅ Biome check: OK
✅ generate:api: 差分なし（フロントと一致）
✅ Backend build: OK
✅ Frontend build: OK
✅ Git status: クリーン

→ デプロイ可能です。`cd backend && bun run deploy` を実行してください。
```

または：

```
## デプロイ前チェック結果

❌ generate:api: 差分あり
  frontend/src/api/generated.ts が古い状態です。
  → `bun run generate:api` を実行してコミットしてください。

❌ Backend build: エラーあり
  [エラー内容]

→ 上記を修正してから再チェックしてください。
```
