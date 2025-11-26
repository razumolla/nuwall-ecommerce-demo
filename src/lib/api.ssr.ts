import type { PiWallProduct, PiWallProductsResponse } from "@/types";

const PIWALL_API_BASE_URL =
  process.env.PIWALL_API_BASE_URL ?? "https://piwall.app";

const PIWALL_JWT = process.env.PIWALL_JWT_GRANDEUR;

// generic helper for PiWall SSR calls
async function piwallFetchSSR<T = unknown>(
  path: string,
  params: Record<string, string | number> = {}
): Promise<T> {
  if (!PIWALL_JWT) {
    throw new Error("PIWALL_JWT_GRANDEUR is not set");
  }

  const url = new URL(path, PIWALL_API_BASE_URL);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  if (process.env.NODE_ENV === "development") {
    console.log("[piwallFetchSSR] Fetching:", url.toString());
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${PIWALL_JWT}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("[piwallFetchSSR] Failed:", res.status, res.statusText, text);
    throw new Error(`PiWall SSR request failed: ${res.status}`);
  }

  return (await res.json()) as T;
}

// specific: Grandeur products (SSR)
export async function getGrandeurProductsSSR(
  limit = 20,
  offset = 0
): Promise<PiWallProduct[]> {
  const json = await piwallFetchSSR<PiWallProductsResponse>(
    "/api/piwall/products",
    {
      view_mode: "lite",
      goods_only: "true",
      purchased_collections_only: "true",
      limit,
      offset,
    }
  );

  if (json.status !== "success" || !Array.isArray(json.data)) {
    console.error("[getGrandeurProductsSSR] Non-success status:", json.status);
    return [];
  }

  return json.data;
}
