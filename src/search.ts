import { getAccessToken, loadConfig } from "./config";

interface SearchOptions {
  term: string;
  limit?: number;
  page?: number;
  sortBy?: string;
  sortDirection?: string;
}

export async function search(opts: SearchOptions) {
  const token = await getAccessToken();
  const config = await loadConfig();
  const tz = config.timezone || "America/New_York";

  const params = new URLSearchParams({
    term: opts.term,
    limit: String(opts.limit ?? 25),
    page: String(opts.page ?? 1),
    timezone: tz,
  });

  if (opts.sortBy) params.set("sort_by", opts.sortBy);
  if (opts.sortDirection) params.set("sort_direction", opts.sortDirection);

  const res = await fetch(`https://search.clay.earth/search?${params}`, {
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
  });

  if (!res.ok) {
    console.error(`Search failed: ${res.status} ${res.statusText}`);
    process.exit(1);
  }

  return res.json();
}
