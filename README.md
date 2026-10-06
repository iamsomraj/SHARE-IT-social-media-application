![SHARE-IT](./SHARE_IT.png)


# SHARE-IT

A modern, full-stack social media platform built with Nuxt 4 and Express. Connect, share, and engage with your community through posts, stories, and real-time interactions. This application showcases the power of TypeScript, Vue 3, and a robust backend architecture using Express.js and PostgreSQL.

## 🚀 Features

- **Authentication**: Secure user registration and login
- **Content Creation**: Create and share posts and stories
- **Social Features**: Like, follow, and interact with other users
- **Personalized Feed**: View content from followed users
- **User Discovery**: Search and connect with new users
- **Real-time Updates**: Dynamic content updates

## 🔗 Links

- **Live Demo**: [share-it-social.vercel.app](https://share-it-social.vercel.app/)
- **Video Overview**: [Watch Demo](https://youtu.be/gM3WxzEyJSU)
- **Changelog**: [CHANGELOG.md](./CHANGELOG.md). Read it when upgrading from 2.x (env vars and auth changed)

## 🛠️ Tech Stack

### Frontend

- **Nuxt 4** - Vue.js framework (SSR for public pages, client-rendered app pages)
- **Vue 3** - Progressive JavaScript framework
- **Pinia** - State management
- **Tailwind CSS 3** - Utility-first CSS framework
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

- Node.js 22 (see `.nvmrc`)
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
│   │   ├── components/     # Vue components
│   │   ├── layouts/        # default, guest
│   │   ├── middleware/     # Route guards
│   │   ├── pages/          # File-based routing
│   │   ├── plugins/        # Session restore (client only)
│   │   ├── stores/         # Pinia stores
│   │   ├── types/          # Shared TypeScript types
│   │   └── utils/          # API client, constants, helpers
│   ├── public/             # Static assets (favicon)
│   ├── nuxt.config.ts
│   └── tailwind.config.ts
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

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/iamsomraj/SHARE-IT-social-media-application/issues).

## 📧 Contact

**Somraj Mukherjee** - <iamsomraj@gmail.com>

Project Link: [https://github.com/iamsomraj/SHARE-IT-social-media-application](https://github.com/iamsomraj/SHARE-IT-social-media-application)

---

**Made with ❤️ by [Somraj Mukherjee](https://github.com/iamsomraj)**
