---
name: commit
description: 変更内容を分析してConventional Commit形式の日本語コミットメッセージを作成する。コミット前に自動でBiomeチェックを実行する。
disable-model-invocation: true
allowed-tools: Bash(git *), Bash(bun run check), Bash(bun run format)
---

# コミット作成スキル

以下の手順でコミットを作成してください：

1. `bun run check` を実行。エラーがあれば `bun run format` で修正してからもう一度確認 `bun run check:fix` を実行してエラーが解消されたことを確認します
2. `git diff --staged` で staged の変更内容を確認
3. `git status` で未ステージのファイルを確認
4. 変更内容を分析して Conventional Commit 形式のメッセージを生成
5. `git commit` でコミット

## Conventional Commit 形式（日本語）

```
<type>: <日本語の説明>

[オプション: 詳細説明]
```

### type の選択
- `feat`: 新機能追加
- `fix`: バグ修正
- `refactor`: リファクタリング（機能変更なし）
- `style`: コードスタイルのみの変更（フォーマット等）
- `docs`: ドキュメントのみの変更
- `chore`: ビルド・設定ファイルの変更
- `perf`: パフォーマンス改善
- `test`: テストの追加・修正

### 例
```
feat: ユーザー一覧APIとUIを追加

- Zod OpenAPIでGET /usersエンドポイントを実装
- orvalでAPIクライアントを再生成
- Tanstack QueryのuseGetUsersを使った一覧画面を追加
```

## 注意事項
- コミットメッセージは日本語で書く
- 1つのコミットは1つの論理的な変更にまとめる
- 未ステージのファイルがある場合はユーザーに確認してから追加する
