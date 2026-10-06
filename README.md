# SHARE-IT: full-stack social media app (Nuxt 4 + Express 5)

[![CI](https://github.com/iamsomraj/SHARE-IT-social-media-application/actions/workflows/ci.yml/badge.svg)](https://github.com/iamsomraj/SHARE-IT-social-media-application/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Live demo](https://img.shields.io/badge/demo-share--it--social.vercel.app-black?logo=vercel)](https://share-it-social.vercel.app/)
![Nuxt](https://img.shields.io/badge/Nuxt-4-00DC82?logo=nuxt.js&logoColor=white)
![Vue](https://img.shields.io/badge/Vue-3-4FC08D?logo=vue.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-4169E1?logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)

![SHARE-IT login screen](./SHARE_IT.png)

**SHARE-IT** is an open-source social media application. Users write posts,
like them, follow people, search for users and add posts to their story. The
frontend uses **Nuxt 4, Vue 3, Pinia and Tailwind CSS 4**; the REST API uses
**Express 5, Objection.js/Knex and PostgreSQL**. Both are written in strict
TypeScript and deploy to **Vercel**.

## 🚀 Features

- **Authentication**: registration and login with JWT; passwords hashed with salted scrypt
- **Posts**: create posts and like/unlike them
- **Stories**: add any post to your story
- **Social graph**: follow and unfollow people; follower/following counts
- **Personalized feed**: your posts plus posts from people you follow
- **People search**: find users by name or email
- **Dark mode**: theme toggle that remembers your choice
- **Responsive**: mobile and desktop layouts

## 🔗 Links

- **Live Demo**: [share-it-social.vercel.app](https://share-it-social.vercel.app/)
- **Demo login**: `sheldon@example.com` / `123456` (sample data, may be reset)
- **Video Overview**: [Watch Demo](https://youtu.be/gM3WxzEyJSU)
- **Changelog**: [CHANGELOG.md](./CHANGELOG.md). Read it when upgrading from 2.x (env vars and auth changed)
- **Contributing**: [CONTRIBUTING.md](./CONTRIBUTING.md) · **Security**: [SECURITY.md](./SECURITY.md) · **Code of Conduct**: [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)

## 🛠️ Tech Stack

### Frontend

- **Nuxt 4** - Vue.js framework (SSR for public pages, client-rendered app pages)
- **Vue 3** - Progressive JavaScript framework
- **Pinia** - State management
- **Tailwind CSS 4** - Utility-first CSS framework (via `@tailwindcss/vite`)
- **TypeScript** - Type-safe JavaScript

### Backend

- **Express 5** - Web framework with native async error handling
- **TypeScript** - Strict type checking
- **PostgreSQL** (Neon) - Relational database
- **Objection.js + Knex.js** - ORM, query builder and migrations
- **Zod 4** - Request and environment validation
- **JWT** - Stateless authentication; passwords hashed with salted `scrypt`
- **Helmet + CORS** - Security headers and an origin allowlist

## 🚀 Getting Started

### Prerequisites

- Node.js 22.21+ (`nvm use` picks it up from `.nvmrc`)
- A PostgreSQL database (e.g. [Neon](https://neon.tech))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/iamsomraj/SHARE-IT-social-media-application.git
   cd SHARE-IT-social-media-application
   ```

2. **Environment configuration**

   Create `server/.env` (see `server/.env.example`):

   ```env
   NODE_ENV=development
   PORT=4500
   DATABASE_URL=postgresql://user:password@host/db?sslmode=require
   JWT_SECRET=at-least-32-characters   # openssl rand -hex 32
   JWT_EXPIRATION_DURATION=7d
   CLIENT_ORIGINS=http://localhost:3000 # comma-separated, `*` wildcard supported
   ```

   Create `client/.env` (see `client/.env.example`):

   ```env
   NUXT_PUBLIC_API_BASE=http://localhost:4500/api/v1
   ```

3. **Install, migrate and seed**

   ```bash
   cd server && npm install
   npm run migrate:latest
   npm run seed            # optional sample data (password for all users: 123456)

   cd ../client && npm install
   ```

4. **Run**

   ```bash
   cd server && npm run dev   # http://localhost:4500
   cd client && npm run dev   # http://localhost:3000
   ```

## 🔧 Scripts

### Server

```bash
npm run dev               # Start with hot reload (tsx)
npm run build             # Compile TypeScript to dist/
npm start                 # Run the compiled server
npm run migrate:latest    # Apply migrations
npm run migrate:rollback  # Roll back all migrations
npm run migrate:make name # Create a migration
npm run seed              # Replace all data with sample data
npm run db:reset          # Rollback + migrate + seed
npm run typecheck | lint | format
```

### Client

```bash
npm run dev | build | preview
npm run typecheck | lint | format
```

## 📁 Project Structure

```text
├── client/                 # Nuxt 4 frontend
│   ├── app/
│   │   ├── assets/css/     # Tailwind entry stylesheet
│   │   ├── components/     # Vue components
│   │   ├── layouts/        # default, guest
│   │   ├── middleware/     # Route guards
│   │   ├── pages/          # File-based routing
│   │   ├── plugins/        # Session restore (client only)
│   │   ├── stores/         # Pinia stores
│   │   ├── types/          # Shared TypeScript types
│   │   └── utils/          # API client, constants, helpers
│   ├── public/             # Static assets (favicon)
│   └── nuxt.config.ts
└── server/                 # Express 5 API
    ├── src/
    │   ├── app.ts          # Express app (Vercel entrypoint)
    │   ├── server.ts       # Local HTTP server
    │   ├── config/         # Env validation, database
    │   ├── controllers/    # Route handlers
    │   ├── middlewares/    # Auth, errors
    │   ├── migrations/     # Knex migrations
    │   ├── models/         # Objection models
    │   ├── routes/         # Route definitions
    │   ├── schemas/        # Zod schemas + validation middleware
    │   ├── seeds/          # Sample data seeder
    │   ├── services/       # Business logic
    │   └── utils/          # Constants, crypto/JWT helpers, errors
    └── knexfile.ts
```

## 🔌 API

Base URL: `http://localhost:4500/api/v1` (production: `https://share-it-social-api.vercel.app/api/v1`).
All responses use the envelope `{ state, message, data }`. 🔒 = requires `Authorization: Bearer <token>`.

| Method | Path | Description |
| --- | --- | --- |
| POST | `/persons/` | Register |
| POST | `/persons/auth` | Log in |
| GET 🔒 | `/persons/` | Current user |
| GET 🔒 | `/persons/:uuid` | Profile with posts |
| GET 🔒 | `/persons/people?page=&limit=` | People list |
| POST 🔒 | `/persons/search` | Search by name or email |
| POST 🔒 | `/persons/follow/:uuid` | Follow |
| POST 🔒 | `/persons/unfollow/:uuid` | Unfollow |
| POST 🔒 | `/posts/create` | Create post |
| GET 🔒 | `/posts/feed` | Own and followed users' posts |
| GET 🔒 | `/posts/stories` | Posts added to own story |
| GET 🔒 | `/posts/:uuid` | Single post |
| POST 🔒 | `/posts/like/:uuid` · `/posts/unlike/:uuid` | Like / unlike |
| POST 🔒 | `/posts/add-story/:uuid` · `/posts/remove-story/:uuid` | Add / remove story |
| POST | `/auth/` | Verify that a token belongs to a user |

Health: `GET /` and `GET /health`.

## ☁️ Deployment (Vercel)

The repo deploys as two Vercel projects:

| Project | Root directory | Notes |
| --- | --- | --- |
| `share-it-social` | `client` | Nuxt preset. Env: `NUXT_PUBLIC_API_BASE` |
| `share-it-social-api` | `server` | Express preset (`src/app.ts`). Env: `DATABASE_URL`, `JWT_SECRET`, `JWT_EXPIRATION_DURATION`, `CLIENT_ORIGINS`, `NODE_ENV` |

Run migrations against the production database from your machine (`npm run migrate:latest`) before deploying schema-dependent changes.

## 📄 License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

## 🤝 Contributing

Contributions, issues and feature requests are welcome. Read the
[contributing guide](./CONTRIBUTING.md) to get started, and report security
issues privately as described in [SECURITY.md](./SECURITY.md).

## 📧 Contact

**Somraj Mukherjee** - <iamsomraj@gmail.com>

Project Link: [https://github.com/iamsomraj/SHARE-IT-social-media-application](https://github.com/iamsomraj/SHARE-IT-social-media-application)

---

**Made with ❤️ by [Somraj Mukherjee](https://github.com/iamsomraj)**
