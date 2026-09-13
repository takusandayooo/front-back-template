import type { AppType } from "backend/src/index";
import { hc } from "hono/client";

// 開発時は Vite の proxy を通し、デプロイ時は VITE_API_BASE_URL を指定する。
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? "/";

export const api = hc<AppType>(apiBaseUrl);
