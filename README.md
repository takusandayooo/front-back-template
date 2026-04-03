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
