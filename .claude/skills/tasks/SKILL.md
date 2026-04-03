---
name: tasks
description: 仕様書からタスクリストを生成して docs/tasks/ に保存する。/spec で仕様書を作成した後に呼び出す。
argument-hint: "[機能名 or 仕様書ファイルパス]"
disable-model-invocation: true
---

# タスクリスト生成スキル

$ARGUMENTS のタスクリストを生成してください。

## 手順

1. 対応する仕様書 `docs/specs/<feature>.md` を読む
2. 実装タスクを以下のフェーズに分けて整理する
3. `docs/tasks/<feature>.md` に保存する
4. 各タスクに優先度・依存関係を明記する

## タスクリストテンプレート

```markdown
# [機能名] 実装タスク

仕様書: [docs/specs/<feature>.md](../specs/<feature>.md)
作成日: [今日の日付]

## フェーズ1: スキーマ設計・バックエンド実装
- [ ] `backend/src/routes/<feature>.ts` にZod OpenAPIスキーマとルートを定義
- [ ] `backend/src/index.ts` にルーターを登録
- [ ] Scalar UI（`/doc`）でエンドポイントが表示されることを確認

## フェーズ2: APIクライアント生成
- [ ] `bun run generate:api` でOpenAPI仕様書を生成
- [ ] `frontend/src/api/` の生成ファイルを確認（型が期待通りか）

## フェーズ3: フロントエンド実装
- [ ] Tanstack Queryのhooksを使ってデータ取得・更新を実装
- [ ] shadcn/ui + Tailwind CSS でUIコンポーネントを実装
- [ ] ローディング・エラー状態を実装

## フェーズ4: 品質確認
- [ ] `bun run check` でエラーなし
- [ ] 動作確認（ローカル）
- [ ] コードレビュー（`@"code-reviewer (agent)"`）
```

タスクは1つずつ独立して実行できる粒度に分割してください。
