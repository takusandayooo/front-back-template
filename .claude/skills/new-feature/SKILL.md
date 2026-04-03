---
name: new-feature
description: スキーマ駆動開発で新機能を実装する。Zodスキーマ設計→APIクライアント生成→UI実装→レビューの全フローを案内する。
argument-hint: "[機能名] [概要]"
disable-model-invocation: true
---

# 新機能実装スキル（スキーマ駆動開発）

$ARGUMENTS を実装します。以下のフローで進めます。

## フロー

### Step 1: 仕様書作成
`@"spec-writer (agent)"` を呼び出して仕様書を作成します。

仕様書のパス: `docs/specs/<feature>.md`

**ユーザーへ**: 仕様書の内容を確認して、OKであれば「進めて」と言ってください。

---

### Step 2: タスクリスト生成
仕様書承認後、タスクリストを生成します。

タスクリストのパス: `docs/tasks/<feature>.md`

---

### Step 3: スキーマ設計・バックエンド実装
`@"schema-designer (agent)"` を呼び出して Zod OpenAPI スキーマとルートを実装します。

- `backend/src/routes/<feature>.ts` にルートを追加
- `backend/src/index.ts` にルーターを登録

---

### Step 4: APIクライアント生成
```bash
bun run generate:api
```
OpenAPI仕様書を生成し、orval で `frontend/src/api/` にAPIクライアントを自動生成します。

---

### Step 5: フロントエンド実装
生成されたAPIクライアント（Tanstack Queryのhooks）を使ってUIを実装します。
- Tanstack Query の `useQuery` / `useMutation` でデータ取得・更新
- shadcn/ui + Tailwind CSS でUIを組み立て

各タスク完了後：
- `bun run check` でエラーがないことを確認
- 問題なければ `/commit` でコミット

---

### Step 6: コードレビュー
`@"code-reviewer (agent)"` でレビューを実施します。

---

### Step 7: デプロイ前確認
`/deploy-check` で本番投入前の最終チェックを行います。

---

**開始します。まず既存コードを調査して仕様書を作成します。**
