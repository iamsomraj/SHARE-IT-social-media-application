# Changelog

## 3.0.0 — 2026-10-06

Dependency upgrade, security hardening and refactor. **No UI/UX changes**: the
compiled CSS and rendered pages match 2.1.0.

### ⚠️ Breaking changes / upgrade notes

- **New database.** The app now runs on a fresh Neon Postgres database. Apply
  the schema with `npm run migrate:latest` (and `npm run seed` for sample data).
  A new migration adds unique constraints and indexes.
- **Passwords use salted `scrypt`.** Hashes from 2.x (PBKDF2 with a global
  `SALT`) cannot be verified, so 2.x accounts must re-register. `SALT` is gone.
- **New JWT secret.** Tokens issued by 2.x are rejected; users log in again.
  `JWT_SECRET` must be at least 32 characters.
- **Environment variables changed:**

  | App | Removed | Added / changed |
  | --- | --- | --- |
  | server | `SALT`, `PRODUCTION_CLIENT_ORIGIN`, `DEVELOPMENT_CLIENT_ORIGIN` | `CLIENT_ORIGINS` (comma-separated, `*` wildcard) |
  | client | `DEV_API`, `PROD_API`, `NODE_ENV` | `NUXT_PUBLIC_API_BASE` (includes `/api/v1`) |

- **`server/dist` is no longer committed.** Vercel builds the API with its
  Express preset (`src/app.ts`); the pre-commit build hook and
  `server/api/index.js` were removed.
- **Server scripts renamed:** `migrate-latest` → `migrate:latest`,
  `migrate-rollback` → `migrate:rollback`, `data-import` → `db:reset`;
  `seed` added.
- Node.js **22.x** is required.

### Server

- Express 5 (native async errors), Zod 4, latest Knex/Objection/pg/jsonwebtoken;
  `npm audit`: 0 vulnerabilities.
- Removed joi, colors, express-async-handler, dotenv (uses
  `process.loadEnvFile`), ts-node, nodemon, pre-commit, tsc-alias.
- Environment validated once at startup with Zod.
- `POST /auth` now verifies the token. Before, it only checked that the UUID existed.
- Search escapes `%`/`_`; CORS restricted to configured origins; `helmet` added;
  internal error details hidden in production; JSON body limit 100 kB.
- Like/story/follow/post writes run in transactions; follow stats recomputed in
  one upsert.
- `GET /posts/:uuid` returns 404 (was 500) for an unknown post.
- Seeder creates stats for every seeded user (previously only three).

### Client

- Nuxt 4.6, Pinia 4, TypeScript 6, @nuxt/eslint; removed unused `@nuxt/ui`,
  `moment`, `@nuxt/typescript-build`, `@tailwindcss/line-clamp`.
- Stores share one typed API helper; error toasts show the API's message
  (e.g. "Wrong Credentials!") instead of a raw fetch error.
- Session restored in a client plugin; authenticated pages render client-side,
  fixing a redirect bounce on hard refresh / direct links.
- `checkAuth` fixed (it read a field the API never returns).
- Favicon moved to `public/` (it returned 404 under Nuxt 4).
- Removed ~1,200 lines of unused types and helpers.

### Known advisories

`npm audit` in `client/` still reports advisories in **build-time tooling**:
`braces` (via Tailwind 3 / nitropack globbing) and `node-forge` (via the dev
server's `listhen`). No patched versions exist upstream, and neither package
ships in the deployed runtime. The fixable ones (`simple-git`,
`postcss-selector-parser`) are pinned via `overrides`.
