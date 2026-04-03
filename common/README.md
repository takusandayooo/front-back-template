# common

バックエンドとフロントエンドで共有するスクリプト・設定を管理するディレクトリ。

## 役割

- バックエンドのHonoルーターからOpenAPI仕様書（`openapi.json`）を書き出す
- `orval.config.ts`（ルート）の設定に従って、フロントエンドのAPIクライアントを生成する

## ディレクトリ構成

```
common/
  generate/
    generate-openapi.ts   # OpenAPI仕様書生成スクリプト
  openapi.json            # 生成されたOpenAPI仕様書（自動生成・編集しない）
```

## APIクライアント生成

ルートの `package.json` に定義されたコマンドで実行する。

```bash
# リポジトリルートから実行
bun run generate:api
```

内部では以下の順番で実行される：

1. `common/generate/generate-openapi.ts` — バックエンドのルーターから `common/openapi.json` を生成
2. `orval` — `common/openapi.json` を読んで `frontend/src/api/` にAPIクライアントを生成

## 注意

`common/openapi.json` および `frontend/src/api/` 配下のファイルは自動生成物のため、直接編集しない。
バックエンドのスキーマを変更した場合は必ず `bun run generate:api` を再実行する。
