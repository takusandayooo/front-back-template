# frontend

Vite + React + TypeScript + Tanstack Query によるフロントエンド。

## 技術スタック

- **Vite** — 高速なビルドツール・開発サーバー
- **React + TypeScript** — UIフレームワーク
- **Tanstack Query** — サーバーステート管理・データフェッチ
- **shadcn/ui** — Radix UIベースのコンポーネントライブラリ
- **Tailwind CSS** — ユーティリティファーストCSS

## 開発サーバー起動

```bash
bun run dev
```

http://localhost:5173 で起動する。

## APIクライアントの使い方

`src/api/` 配下はorvalで自動生成されたファイル。**直接編集しない。**

バックエンドのスキーマが変わったらルートで `bun run generate:api` を実行して再生成する。

```typescript
// 生成されたhooksをそのまま使う
import { useGetUsersId } from '@/api/generated'

function UserDetail({ id }: { id: string }) {
  const { data, isLoading } = useGetUsersId(id)

  if (isLoading) return <div>読み込み中...</div>
  return <div>{data?.name}</div>
}
```

## shadcn/ui コンポーネントの追加

```bash
bunx shadcn@canary add button card input
```

追加されたコンポーネントは `src/components/ui/` に配置される。

## ビルド

```bash
bun run build
```

## ディレクトリ構成

```
frontend/src/
  api/           # orval自動生成（編集しない）
  components/
    ui/          # shadcn/ui（編集しない）
  lib/
    utils.ts     # cn() ヘルパー等
```
