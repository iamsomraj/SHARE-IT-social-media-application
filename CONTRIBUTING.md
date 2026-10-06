# Contributing to SHARE-IT

Thanks for your interest in improving SHARE-IT! Bug reports, feature ideas and
pull requests are all welcome.

## Getting set up

1. Fork and clone the repository.
2. Use Node.js 22.21+ (`nvm use` reads `.nvmrc`).
3. Follow [Getting Started](./README.md#-getting-started) to configure
   `server/.env` and `client/.env`, run migrations and seed sample data.

Any PostgreSQL database works for local development. For example:

```bash
docker run -d --name shareit-pg -e POSTGRES_PASSWORD=dev -e POSTGRES_DB=shareit -p 5432:5432 postgres:18-alpine
# DATABASE_URL=postgresql://postgres:dev@localhost:5432/shareit
```

## Making changes

- Create a branch from `main`, e.g. `fix/feed-pagination` or `feat/comments`.
- Keep changes focused. Unrelated refactors are easier to review as
  separate pull requests.
- Server changes that touch the schema need a migration:
  `npm run migrate:make <name>` inside `server/`.
- New environment variables go in the matching `.env.example` and the README.

## Before you open a pull request

Run these in each app you changed (`server/` and/or `client/`):

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
```

CI runs the same checks on every pull request.

## Commit messages

We use [Conventional Commits](https://www.conventionalcommits.org/):
`feat: …`, `fix: …`, `refactor(server): …`, `docs: …`, `chore: …`.

## Pull requests

- Fill in the pull request template and link related issues.
- Include before/after screenshots for UI changes.
- Each merge to `main` deploys to production on Vercel. Pull requests get
  preview deployments automatically.

## Code of conduct

By participating you agree to follow our [Code of Conduct](./CODE_OF_CONDUCT.md).
