# セットアップガイド

## 開発方針

**スキーマ駆動開発** — バックエンドのZod型定義からOpenAPI仕様書を自動生成し、そこからフロントエンドのAPIクライアントを自動生成することで、型安全なフルスタック開発を実現する。

```
backend/
  src/
    routes/    ← Zod でスキーマ定義 & ルート実装
frontend/
  src/
    api/       ← orval が自動生成するAPIクライアント
common/
  generate/   ← OpenAPI仕様書生成スクリプト
```

---

## セットアップ手順

### 1. bun Workspace の設定

フロントエンドとバックエンドを1つのリポジトリで管理する。

ルートの `package.json`:

```json
{
  "workspaces": ["backend", "frontend"],
  "devDependencies": {
    "@biomejs/biome": "latest"
  },
  "scripts": {
    "generate:api": "bun run common/generate/generate-openapi.ts && bun run orval"
  }
}
```

- `workspaces` にフロントエンド・バックエンドのディレクトリを指定することで、`bun install` 一発で両方の依存関係がインストールされる
- biome（リンター/フォーマッター）もルートで一元管理すると便利

### 2. バックエンド（Hono）のセットアップ

Cloudflare Workers 向けのテンプレートでプロジェクトを作成する。

```bash
bun create hono@latest backend --template cloudflare-workers
```

> 参考: [Hono 公式ドキュメント](https://hono.dev/docs/guides/create-hono)

### 3. OpenAPI（Zod OpenAPI）のセットアップ

ZodのスキーマからOpenAPI仕様書を生成するために、`@hono/zod-openapi` を使用する。

> 通常の `hono` + `zod` だけではOpenAPI仕様書を自動生成できない。
> `@hono/zod-openapi` を使うことで、Zodスキーマの定義がそのままOpenAPIのスキーマになる。
> 参考: [Zod OpenAPI サンプル](https://hono.dev/examples/zod-openapi)

```bash
bun add @hono/zod-openapi
```

ルート定義の例:

```ts
import { createRoute, z } from "@hono/zod-openapi";

const route = createRoute({
  method: "get",
  path: "/users/{id}",
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      content: { "application/json": { schema: UserSchema } },
      description: "ユーザー情報を返す",
    },
  },
});
```

APIドキュメントのUIが必要な場合は Scalar もインストールする:

```bash
bun add @scalar/hono-api-reference
```

### 4. フロントエンド（Vite）のセットアップ

```bash
bun create vite frontend --template react-ts
```

- `--template react-ts` で React + TypeScript のプロジェクトが即座に作成される

### 5. orval による APIクライアントの自動生成

バックエンドのOpenAPI仕様書からフロントエンド向けのAPIクライアントを自動生成する。

```bash
bun add -d orval
```

`orval.config.ts` の設定例:

```ts
import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: "./common/openapi.json",       // 生成したOpenAPI仕様書のパス
    output: {
      target: "./frontend/src/api/generated.ts",
      client: "react-query",              // Tanstack Query向けのクライアントを生成
      override: {
        mutator: {
          path: "./frontend/src/lib/axios.ts",  // カスタムfetcherを使う場合
          name: "customInstance",
        },
      },
    },
  },
});
```

OpenAPI仕様書を生成するスクリプト [`common/generate/generate-openapi.ts`](./common/generate/generate-openapi.ts) をバックエンドのルーター定義から書き出すように実装する。

APIクライアントの生成コマンド:

```bash
bun run generate:api  # OpenAPI仕様書の生成 → orval でクライアント生成 を一括実行
```

### 6. Tanstack Query によるデータ取得の実装

生成したAPIクライアントをTanstack Queryと組み合わせてデータの取得・更新を行う。

必要なパッケージ:

```bash
bun add @tanstack/react-query axios
```

orval が `react-query` モードで生成したクライアントは、そのまま `useQuery` / `useMutation` のカスタムフックとして使える:

```ts
// orval が自動生成するコード（例）
export const useGetUsers = () =>
  useQuery({ queryKey: ["users"], queryFn: () => getUsers() });
```

以下のプロンプトをClaude Codeに渡すと実装してくれる:

```
こちらのモックを用いてTanstack Queryを使った簡単なフロントエンドを作成してください。
TailwindCSSとshadcnを使って実装してください。
```
