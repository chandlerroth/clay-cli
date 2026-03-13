Default to using Bun instead of Node.js.

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun install` instead of `npm install`
- Use `bun run <script>` instead of `npm run <script>`
- Bun automatically loads .env, so don't use dotenv.

## Project

This is a CLI tool for searching Clay.earth (personal CRM) contacts via their undocumented API.

### Auth Flow

- Clay uses Clerk for auth, then issues its own JWTs
- **Access token**: ~9 min lifespan
- **Refresh token**: ~30 day lifespan
- Refresh endpoint: `POST https://api.clay.earth/api/token/refresh/` with body `{"refresh": "<token>"}`
- The refresh token is stored in `~/.clay-cli/config.json`

### Search API

Base URL: `https://search.clay.earth/search`

Query params: `term`, `limit`, `page`, `sort_by` (firstName, lastName), `sort_direction` (asc, desc), `timezone`

See `docs/search-query-language.md` for the full query language reference.
