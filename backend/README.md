# backend

Hono + Zod OpenAPI + Cloudflare Workers によるバックエンド。

## 技術スタック

- **Hono** — Cloudflare Workers向けWebフレームワーク
- **@hono/zod-openapi** — ZodスキーマからOpenAPI仕様書を自動生成
- **@scalar/hono-api-reference** — APIドキュメントUI

## 開発サーバー起動

```bash
bun run dev
```

- API: http://localhost:8787
- APIドキュメント（Scalar UI）: http://localhost:8787/docs
- OpenAPI仕様書（JSON）: http://localhost:8787/openapi.json

## ルート追加の流れ

1. `src/index.ts`（または `src/routes/` 配下）にZodスキーマとルートを定義
2. ルートを `app.openapi()` で登録
3. ルートディレクトリに分割した場合は `app.route()` で接続
4. `bun run generate:api`（ルートから実行）でAPIクライアントを再生成

```typescript
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'

const UserSchema = z.object({
  id: z.string().openapi({ example: '123' }),
  name: z.string().openapi({ example: '山田太郎' }),
}).openapi('User')

const route = createRoute({
  method: 'get',
  path: '/users/{id}',
  request: {
    params: z.object({ id: z.string().openapi({ param: { name: 'id', in: 'path' } }) }),
  },
  responses: {
    200: {
      content: { 'application/json': { schema: UserSchema } },
      description: 'ユーザー情報',
    },
  },
})

app.openapi(route, (c) => {
  const { id } = c.req.valid('param')
  return c.json({ id, name: '山田太郎' })
})
```

## デプロイ

```bash
bun run deploy
```

## Cloudflare Bindings の型生成

```bash
bun run cf-typegen
```

`wrangler.jsonc` の設定（KV・R2・D1など）から `CloudflareBindings` 型を生成する。
生成後は `new OpenAPIHono<{ Bindings: CloudflareBindings }>()` で型付けできる。
