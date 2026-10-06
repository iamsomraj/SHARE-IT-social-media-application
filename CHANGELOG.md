# Changelog

## 3.0.0 — 2026-10-06

Dependency upgrade, security hardening and refactor. No UI/UX redesign: colors,
fonts and text sizes are unchanged. The Tailwind 4 upgrade causes a few pixels of
spacing differences, and colors render through Tailwind 4's `oklch` palette.

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
- Node.js **22.21+** is required (Nuxt 4.6). Vercel uses the latest 22.x.
- **Browser support** follows Tailwind CSS 4: Safari 16.4+, Chrome 111+,
  Firefox 128+.

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
- Tailwind CSS 4 through the official `@tailwindcss/vite` plugin; config moved
  from `tailwind.config.js` into `app/assets/css/main.css`. Migrated with the
  official upgrade tool (`break-words` → `wrap-break-word`, `flex-grow` →
  `grow`). The upgrade guide's v3-compatible defaults are kept for border color,
  placeholder color and the button cursor.
- Nuxt DevTools 4 (pinned via `overrides`), which drops the vulnerable
  `simple-git` dependency of DevTools 3.
- Stores share one typed API helper; error toasts show the API's message
  (e.g. "Wrong Credentials!") instead of a raw fetch error.
- Session restored in a client plugin; authenticated pages render client-side,
  fixing a redirect bounce on hard refresh / direct links.
- `checkAuth` fixed (it read a field the API never returns).
- Favicon moved to `public/` (it returned 404 under Nuxt 4).
- Removed ~1,200 lines of unused types and helpers.

### SEO & repository

- Open Graph / Twitter card tags with a 1200×630 preview image, `theme-color`,
  `robots.txt` and `sitemap.xml`; signed-in pages send `X-Robots-Tag: noindex`.
- GitHub Actions CI (typecheck, lint, format, build for both apps), Dependabot,
  issue/PR templates, `CONTRIBUTING.md`, `SECURITY.md`, `CODE_OF_CONDUCT.md`.

### Known advisories

`npm audit` in `client/` reports 13 entries, all from two packages inside Nitro
(Nuxt's server engine, latest 2.13.4) that have **no patched release**:

- `braces`: stack exhaustion on deeply nested glob patterns, reached via
  `globby` → `fast-glob` → `micromatch`. It only receives the project's own
  build-time glob patterns.
- `node-forge`: RSA signature verification flaw, reached via `listhen`, which
  only generates a self-signed certificate for `nuxt dev --https`.

Neither package handles user input in the deployed app. Re-check once Nitro
publishes updated dependencies.
