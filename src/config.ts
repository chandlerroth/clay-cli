import { homedir } from "os";
import { join } from "path";

const CONFIG_DIR = join(homedir(), ".clay-cli");
const CONFIG_FILE = join(CONFIG_DIR, "config.json");

interface Config {
  refresh_token: string;
  access_token?: string;
  access_token_exp?: number;
  timezone?: string;
}

export async function loadConfig(): Promise<Config> {
  const file = Bun.file(CONFIG_FILE);
  if (!(await file.exists())) {
    console.error(
      "No config found. Run `clay auth <refresh_token>` to set up."
    );
    process.exit(1);
  }
  return file.json();
}

export async function saveConfig(config: Config): Promise<void> {
  const { mkdirSync } = await import("fs");
  mkdirSync(CONFIG_DIR, { recursive: true });
  await Bun.write(CONFIG_FILE, JSON.stringify(config, null, 2) + "\n");
}

export async function getAccessToken(): Promise<string> {
  const config = await loadConfig();
  const now = Math.floor(Date.now() / 1000);

  // Reuse if still valid (with 60s buffer)
  if (config.access_token && config.access_token_exp && config.access_token_exp - now > 60) {
    return config.access_token;
  }

  // Refresh
  const res = await fetch("https://api.clay.earth/api/token/refresh/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ refresh: config.refresh_token }),
  });

  if (!res.ok) {
    console.error("Token refresh failed. Run `clay auth <refresh_token>` with a new token.");
    process.exit(1);
  }

  const data = (await res.json()) as { access: string; refresh: string };

  // Decode exp from JWT payload
  const payload = JSON.parse(atob(data.access.split(".")[1]));

  await saveConfig({
    ...config,
    refresh_token: data.refresh,
    access_token: data.access,
    access_token_exp: payload.exp,
  });

  return data.access;
}
