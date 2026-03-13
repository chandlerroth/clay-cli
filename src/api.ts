import { getAccessToken, loadConfig } from "./config";

const API_BASE = "https://api.clay.earth/api/v1";

async function apiRequest(path: string, options: RequestInit = {}) {
  const token = await getAccessToken();
  const config = await loadConfig();
  const tz = config.timezone || "America/New_York";
  const separator = path.includes("?") ? "&" : "?";

  const res = await fetch(`${API_BASE}${path}${separator}timezone=${encodeURIComponent(tz)}`, {
    ...options,
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) {
    console.error(`API error: ${res.status} ${res.statusText}`);
    const body = await res.text();
    if (body) console.error(body);
    process.exit(1);
  }

  return res.json();
}

export async function createNote(contactId: string, content: string) {
  return apiRequest(`/network/contacts/${contactId}/notes`, {
    method: "POST",
    body: JSON.stringify({ content, reminder: null }),
  });
}
