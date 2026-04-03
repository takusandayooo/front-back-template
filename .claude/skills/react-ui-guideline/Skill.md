---
name: react-ui-guideline
description: shadcn/ui と Tailwind CSS を使った React UI 実装のガイドライン。コンポーネント作成・UI修正など、React の UI 実装全般で使う。「コンポーネント作って」「UIを直して」「shadcn」「Tailwind」「画面を作って」などのキーワードで自動起動。
---

# React UI 実装ガイドライン

## 技術スタック

- **フレームワーク**: React（関数コンポーネント + Hooks）
- **コンポーネントライブラリ**: shadcn/ui（Radix UI ベースのコピペ型コンポーネント）
- **スタイリング**: Tailwind CSS v4
- **データ取得**: Tanstack Query（orval生成のhooksを使う）

---

## 原則 1: Tailwind の標準値を使う

px 値は必ず Tailwind クラスに変換する。任意値（`w-[123px]`）は最終手段。

**角丸**
```
24px → rounded-3xl　12px → rounded-xl　8px → rounded-lg　4px → rounded
```

**余白（gap / padding / margin）**
```
32px → 8　16px → 4　8px → 2　4px → 1
例: gap-8, p-4, mx-2
```

**フォントサイズ**
```
24px → text-2xl　20px → text-xl　16px → text-base　14px → text-sm　12px → text-xs
```

**色はセマンティックトークンを使う**
```
bg-background / bg-primary / bg-muted
text-foreground / text-muted-foreground / text-primary
border-border / border-input
```

不透明度: `bg-white/75`、`text-black/50`

---

## 原則 2: shadcn/ui コンポーネントを優先する

カスタム実装の前に shadcn/ui に同等のものがないか必ず確認する。

**よく使うコンポーネント**

| コンポーネント | 用途 |
|---|---|
| `Button` | variant: `default` / `outline` / `ghost` / `destructive` |
| `Input` | テキスト入力。高さは `h-10` または `h-12` で統一 |
| `Card` / `CardHeader` / `CardContent` | 関連情報のグループ化 |
| `Dialog` | モーダル |
| `Select` / `Checkbox` / `Switch` | フォームコントロール |
| `Badge` | ステータス・ラベル表示 |
| `Separator` | 区切り線 |

**コンポーネントの追加方法**

shadcn MCP が使える場合（推奨）: 「button と card を追加して」と指示するだけ

手動の場合:
```bash
cd frontend && bunx shadcn@canary add button card input
```

インストール先: `frontend/src/components/ui/`

---

## 原則 3: Tanstack Query で API データを扱う

orval が生成したhooksをそのまま使う。直接 `fetch` や `axios` を呼ばない。

```tsx
// orval生成のhooksを使う例
import { useGetUsers, useCreateUser } from "@/api/generated";

function UserList() {
  const { data, isLoading } = useGetUsers();
  const { mutate: createUser } = useCreateUser();

  if (isLoading) return <Loader2 className="animate-spin" />;

  return (
    <div>
      {data?.map((user) => <div key={user.id}>{user.name}</div>)}
    </div>
  );
}
```

---

## 実装フロー

1. **分析**: 必要なコンポーネントを洗い出し、shadcn/ui で賄えるか確認
2. **変換**: デザインの px 値を Tailwind クラスに変換、色はセマンティックトークンへ
3. **実装**: orval生成のhooks + shadcn/ui コンポーネント + Tailwind ユーティリティで組み立て
4. **レスポンシブ**: モバイルファーストで `md:` / `lg:` プレフィックスを追加

**実装例**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ContactForm({ className }: { className?: string }) {
  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader>
        <CardTitle className="text-2xl">お問い合わせ</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="お名前" className="h-12" />
        <Input type="email" placeholder="メールアドレス" className="h-12" />
        <Button className="w-full">送信する</Button>
      </CardContent>
    </Card>
  );
}
```

---

## やること・やらないこと

**✅ やること**
- Tailwind 標準クラスを使う
- shadcn/ui で済むものはカスタム実装しない
- orval生成のhooksを使ってデータ取得する
- モバイルファーストのレスポンシブ設計
- TypeScript で型を付ける
- クラスの結合には `cn()` ヘルパーを使う

**❌ やらないこと**
- インラインスタイルや不必要な任意値（`w-[123px]`）
- `frontend/src/api/` の生成ファイルを手動で編集する
- shadcn/ui があるのに独自コンポーネントを作る
- スタイルアプローチを混在させる（Tailwind + CSS Modules など）

---

## よく使うパターン

**レスポンシブグリッド**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
```

**ローディング状態**
```tsx
<Button disabled={isLoading}>
  {isLoading ? <Loader2 className="animate-spin" /> : "送信"}
</Button>
```

**条件付きスタイル**
```tsx
<div className={cn("rounded-xl p-4", isActive && "bg-primary text-primary-foreground")}>
```

---

## ディレクトリ構成

```
frontend/src/
  api/           # orval が自動生成（編集しない）
  components/ui/ # shadcn/ui（自動生成・基本的に編集しない）
  components/    # プロジェクト固有のコンポーネント
  lib/utils.ts   # cn() ヘルパー
```
