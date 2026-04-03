# front-back-template

Hono + Zod OpenAPI + Vite + React + Tanstack Query によるスキーマ駆動開発のテンプレート。

バックエンドのZodスキーマ定義からOpenAPI仕様書を自動生成し、orvalでフロントエンドのAPIクライアントを自動生成することで、型安全なフルスタック開発を実現する。

## 技術スタック

| | 技術 |
|---|---|
| バックエンド | Hono + Zod OpenAPI + Cloudflare Workers |
| フロントエンド | Vite + React + TypeScript + Tanstack Query |
| UI | shadcn/ui + Tailwind CSS |
| API生成 | orval |
| Linter/Formatter | Biome |
| パッケージマネージャー | bun (Workspace) |

## ディレクトリ構成

```
front-back-template/
  backend/          # Hono + Cloudflare Workers
  frontend/         # Vite + React
  common/
    generate/       # OpenAPI仕様書生成スクリプト
    openapi.json    # 生成されたOpenAPI仕様書
  orval.config.ts   # APIクライアント生成設定
```

## セットアップ

```bash
bun install
```

## 開発

```bash
# バックエンド起動（http://localhost:8787）
cd backend && bun run dev

# フロントエンド起動（http://localhost:5173）
cd frontend && bun run dev
```

APIドキュメント（Scalar UI）: http://localhost:8787/docs

## APIクライアントの再生成

バックエンドのスキーマを変更したら実行する。

```bash
bun run generate:api
```

`frontend/src/api/` にTanstack Query対応のAPIクライアントが生成される。

## デプロイ

```bash
cd backend && bun run deploy
```

## 詳細なセットアップ手順

[Setup.md](./Setup.md) を参照。
