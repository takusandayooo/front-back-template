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

## 開発環境（Dev Container）

このプロジェクトは Dev Container に対応しています。

### 必要なもの

- Docker
- Visual Studio Code
- [Dev Containers 拡張機能](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

### 起動方法

1. VS Code でこのプロジェクトを開く
2. コマンドパレット（Ctrl+Shift+P）から `Dev Containers: Open Folder in Container` を実行
3. 自動的に環境が構築され、必要な拡張機能がインストールされます

### 自動インストール

Dev Container では以下が自動でセットアップされます：

- **Bun** - パッケージマネージャー
- **Node.js 22** - ランタイム
- **拡張機能**:
  - Biome - Linter/Formatter
  - GitHub Copilot Chat
  - Tailwind CSS IntelliSense
  - Todo Tree

### ポートフォワーディング

以下のポートは自動的にフォワードされます：

- `3000` - 予約済み
- `8787` - バックエンド開発サーバー

## セットアップ

```bash
mise install
bun install
```

`mise.toml` で Node.js 24.21.0 と Bun 1.4.2 を固定している。`mise run dev`、`mise run build`、
`mise run check`、`mise run generate-api` を使用すると、チームで同じ実行環境を利用できる。

`bun install` 時に Lefthook が有効化される。commit 前は staged files に Biome を実行し、push 前は
バックエンド型チェック、フロントエンドビルド、OpenAPI / Orval生成物の差分確認を実行する。

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

## Hono RPC と MSW モック

フロントエンドの実 API 呼び出しは Hono RPC（`hc<AppType>`）を使用する。`AppType` は
バックエンドのルート定義から公開されるため、パス・リクエスト・レスポンスの型を直接共有できる。

OpenAPI の生成、Scalar のドキュメント、Orval 生成の MSW ハンドラは維持している。モックを
有効にすると Hono RPC の HTTP リクエストを MSW が横取りするため、バックエンドを起動せずに
フロントエンドを開発できる。

```bash
# 実 API を使う（別ターミナルで backend を起動）
cd frontend && bun run dev

# Orval 生成 MSW を使う
cd frontend && VITE_ENABLE_MSW=true bun run dev
```

`VITE_API_BASE_URL` を指定すると、デプロイ先など Vite proxy を利用できない環境の API URL を設定できる。

## Cloudflare Vite Plugin と TanStack Router

フロントエンドは Cloudflare Vite Plugin を使い、Vite の HMR と Workers Runtime を統合している。
`wrangler.jsonc` の SPA fallback により、TanStack Router のクライアントサイドルーティングも開発・本番で同じように動作する。

ルート定義は `frontend/src/router.tsx` にあり、`/` と `/users/$userId` をサンプルとして含む。UI は shadcn/ui を標準採用している。

## デプロイ

```bash
cd backend && bun run deploy
```

## 詳細なセットアップ手順

[Setup.md](./Setup.md) を参照。
