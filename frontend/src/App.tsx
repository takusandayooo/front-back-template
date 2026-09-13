import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";

function UserCard({ userId }: { userId: string }) {
  const { data, isPending, isError } = useQuery({
    queryKey: ["users", userId],
    queryFn: async () => {
      const response = await api.users[":id"].$get({
        param: { id: userId },
      });

      if (!response.ok) {
        throw new Error("ユーザーの取得に失敗しました。");
      }

      return response.json();
    },
  });

  if (isPending) {
    return (
      <Card className="w-full max-w-md animate-pulse">
        <CardHeader>
          <div className="h-5 w-24 rounded bg-muted" />
          <div className="h-4 w-32 rounded bg-muted" />
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-3/4 rounded bg-muted" />
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="w-full max-w-md border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">エラー</CardTitle>
          <CardDescription>ユーザーの取得に失敗しました。</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {data.name}
          <Badge variant="secondary">User</Badge>
        </CardTitle>
        <CardDescription className="font-mono text-xs">
          ID: {data.id}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">
          年齢:{" "}
          <span className="text-foreground font-semibold">
            {Math.floor(data.age)} 歳
          </span>
        </p>
      </CardContent>
    </Card>
  );
}

export function HomePage() {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (inputValue.trim()) {
      void navigate({
        to: "/users/$userId",
        params: { userId: inputValue.trim() },
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Car Booking API</h1>
        <p className="text-muted-foreground">ユーザーIDを入力して情報を取得</p>
      </div>

      <div className="flex w-full max-w-md gap-2">
        <Input
          placeholder="ユーザーIDを入力..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button onClick={handleSearch} disabled={!inputValue.trim()}>
          検索
        </Button>
      </div>
    </div>
  );
}

export function UserPage() {
  const { userId } = useParams({ from: "/users/$userId" });

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-8 p-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Car Booking API</h1>
        <p className="text-muted-foreground">Hono RPC で取得したユーザー情報</p>
      </div>

      <UserCard userId={userId} />

      <Link
        to="/"
        className="text-muted-foreground text-sm underline underline-offset-4 hover:text-foreground"
      >
        別のユーザーを検索
      </Link>
    </div>
  );
}
