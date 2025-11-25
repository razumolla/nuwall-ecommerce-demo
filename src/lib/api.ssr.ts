import type { PiWallProduct, PiWallProductsResponse } from "@/types";

const PIWALL_API_BASE_URL =
  process.env.PIWALL_API_BASE_URL ?? "https://piwall.app";

const PIWALL_JWT = process.env.PIWALL_JWT_GRANDEUR;

export async function getGrandeurProductsSSR(
  limit = 20,
  offset = 0
): Promise<PiWallProduct[]> {
  if (!PIWALL_JWT) {
    console.warn("PIWALL_JWT_GRANDEUR is not set");
    return [];
  }

  // 👇 Build the exact endpoint: /api/piwall/products
  const url = new URL("/api/piwall/products", PIWALL_API_BASE_URL);
  url.searchParams.set("view_mode", "lite");
  url.searchParams.set("goods_only", "true");
  url.searchParams.set("purchased_collections_only", "true");
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));

  // (optional) log to verify during dev
  if (process.env.NODE_ENV === "development") {
    console.log("[getGrandeurProducts] Fetching:", url.toString());
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
    console.error(
      "Failed to fetch PiWall products:",
      res.status,
      res.statusText,
      text
    );
    return [];
  }

  const json = (await res.json()) as PiWallProductsResponse;

  if (json.status !== "success") {
    console.error("PiWall API returned non-success status:", json.status);
    return [];
  }

  return json.data;
}
