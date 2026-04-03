---
name: add-route
description: Hono + Zod OpenAPI で新しいAPIルートを追加する。スキーマ定義・createRoute・app.openapi登録・generate:apiまで一連の流れを案内する。
argument-hint: "[HTTPメソッド] [パス] [概要]  例: post /users ユーザー作成"
disable-model-invocation: true
---

# APIルート追加スキル

$ARGUMENTS のルートを追加します。

## 手順

### 1. 既存コードの確認
`backend/src/index.ts` を読んで、既存のルート・スキーマ定義を把握する。

### 2. スキーマ定義
リクエスト・レスポンスの Zod スキーマを定義する。

```typescript
import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi'

// リクエストスキーマ
const CreateUserSchema = z
  .object({
    name: z.string().min(1).max(100).openapi({ example: '山田太郎' }),
    email: z.string().email().openapi({ example: 'yamada@example.com' }),
  })
  .openapi('CreateUser')

// レスポンススキーマ
const UserSchema = z
  .object({
    id: z.string().openapi({ example: 'user_01j...' }),
    name: z.string().openapi({ example: '山田太郎' }),
    email: z.string().openapi({ example: 'yamada@example.com' }),
  })
  .openapi('User')

// 共通エラースキーマ（既存のものがあればそれを使う）
const ErrorSchema = z
  .object({
    message: z.string().openapi({ example: 'Bad Request' }),
  })
  .openapi('Error')
```

### 3. createRoute でルート定義
```typescript
const createUserRoute = createRoute({
  method: 'post',
  path: '/users',
  tags: ['users'],
  summary: 'ユーザー作成',
  request: {
    body: {
      content: { 'application/json': { schema: CreateUserSchema } },
    },
  },
  responses: {
    201: {
      content: { 'application/json': { schema: UserSchema } },
      description: '作成されたユーザー',
    },
    400: {
      content: { 'application/json': { schema: ErrorSchema } },
      description: 'バリデーションエラー',
    },
  },
})
```

### 4. app.openapi でハンドラ登録
```typescript
app.openapi(createUserRoute, (c) => {
  const body = c.req.valid('json')
  // 実装
  return c.json({ id: 'user_01j...', ...body }, 201)
})
```

### 5. パスパラメータがある場合
```typescript
const ParamsSchema = z.object({
  id: z.string().openapi({
    param: { name: 'id', in: 'path' },
    example: 'user_01j...',
  }),
})

const route = createRoute({
  method: 'get',
  path: '/users/{id}',   // ← {id} 形式（:id ではない）
  request: { params: ParamsSchema },
  // ...
})

app.openapi(route, (c) => {
  const { id } = c.req.valid('param')
  // ...
})
```

## チェックリスト
- [ ] スキーマに `.openapi()` で説明・例が付いているか
- [ ] パスが `/docs` のScalar UIで表示されるか（`bun run dev` で確認）
- [ ] `bun run check` でエラーがないか
- [ ] `/generate-api` でAPIクライアントを再生成したか
