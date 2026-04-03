import { writeFileSync } from "node:fs";
import app from "../../backend/src";

// Hono の :param 形式を OpenAPI 標準の {param} 形式に変換
function fixPathParams(obj: unknown): unknown {
  if (typeof obj === "string") {
    return obj.replace(/:([a-zA-Z_][a-zA-Z0-9_]*)/g, "{$1}");
  }
  if (Array.isArray(obj)) {
    return obj.map(fixPathParams);
  }
  if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([k, v]) => [
        fixPathParams(k),
        fixPathParams(v),
      ]),
    );
  }
  return obj;
}

async function generateOpenAPI() {
  try {
    const request = new Request("http://localhost/openapi.json", {
      method: "GET",
    });

    const response = await app.fetch(request);
    const openapi = await response.json();

    // :param → {param} に変換してからファイルに保存
    const fixed = fixPathParams(openapi);
    writeFileSync("openapi.json", JSON.stringify(fixed, null, 2));

    console.log("✓ OpenAPI schema generated: openapi.json");
  } catch (error) {
    console.error("Error generating OpenAPI schema:", error);
    process.exit(1);
  }
}

generateOpenAPI();
